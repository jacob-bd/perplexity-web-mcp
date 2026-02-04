"""Session management with conversation priming.

Implements conversation priming + caching to:
1. Prime new conversations with distilled system prompt + tool instructions
2. Cache conversations by system prompt hash
3. Reuse primed conversations for subsequent requests
4. Handle session expiration and cleanup

This combined with tool_calling.py gives us the full hybrid approach.
"""

from __future__ import annotations

import hashlib
import logging
import time
from dataclasses import dataclass, field
from threading import Lock
from typing import Any

from perplexity_web_mcp import Perplexity, ConversationConfig
from perplexity_web_mcp.enums import CitationMode
from perplexity_web_mcp.models import Model


# =============================================================================
# System Prompt Distillation
# =============================================================================

# Distilled Claude Code behavioral instructions
CLAUDE_CODE_DISTILLED = """You are a coding assistant. Be concise and direct. Use markdown for code.
Focus only on what's requested. Don't over-engineer or add unnecessary features.
When asked to perform an action, do it - don't just explain how."""

# Patterns to detect Claude Code's system prompt
CLAUDE_CODE_MARKERS = [
    "Claude Code",
    "software engineering tasks",
    "CLI tool that helps users",
    "agentic coding tool",
]


def distill_system_prompt(system_prompt: str | None) -> str:
    """Distill a system prompt to its essential behavioral instructions.
    
    For Claude Code's massive system prompt, returns a condensed version.
    For other prompts, extracts key behavioral patterns.
    
    Args:
        system_prompt: Full system prompt text (can be very long)
        
    Returns:
        Condensed behavioral instructions (~200-500 chars)
    """
    if not system_prompt:
        return CLAUDE_CODE_DISTILLED  # Default to coding assistant behavior
    
    # Detect Claude Code's system prompt
    prompt_lower = system_prompt.lower()
    if any(marker.lower() in prompt_lower for marker in CLAUDE_CODE_MARKERS):
        return CLAUDE_CODE_DISTILLED
    
    # For other system prompts, try to extract key instructions
    # Look for common patterns
    lines = system_prompt.split('\n')
    key_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Look for behavioral instructions
        if any(pattern in line.lower() for pattern in [
            'you are', 'you must', 'always', 'never', 'be ', 'don\'t', 'do not',
            'important', 'critical', 'rule', 'focus on', 'prioritize'
        ]):
            if len(line) < 200:  # Skip very long lines
                key_lines.append(line)
        
        # Limit extraction
        if len(key_lines) >= 10:
            break
    
    if key_lines:
        distilled = '\n'.join(key_lines[:5])  # Take top 5
        if len(distilled) > 500:
            distilled = distilled[:500] + '...'
        return distilled
    
    # Fallback: take first 300 chars
    return system_prompt[:300] + ('...' if len(system_prompt) > 300 else '')


def hash_system_prompt(system_prompt: str | None) -> str:
    """Create a hash of the system prompt for session identification.
    
    Args:
        system_prompt: The system prompt text
        
    Returns:
        Short hash string for cache key
    """
    if not system_prompt:
        return "default"
    
    # Use first 1000 chars for hashing (enough to differentiate, not too slow)
    content = system_prompt[:1000]
    return hashlib.sha256(content.encode()).hexdigest()[:16]


# =============================================================================
# Session Data
# =============================================================================

@dataclass
class Session:
    """A primed conversation session."""
    
    conversation: Any  # Perplexity Conversation object
    system_hash: str
    model: Model
    created_at: float = field(default_factory=time.time)
    last_used: float = field(default_factory=time.time)
    request_count: int = 0
    is_primed: bool = False
    in_use: bool = False  # Track if currently being used
    
    def touch(self):
        """Update last used timestamp."""
        self.last_used = time.time()
        self.request_count += 1
    
    def acquire(self) -> bool:
        """Try to acquire this session. Returns True if successful."""
        if not self.in_use:
            self.in_use = True
            self.touch()
            return True
        return False
    
    def release(self):
        """Release this session for reuse."""
        self.in_use = False
    
    @property
    def age_seconds(self) -> float:
        """Session age in seconds."""
        return time.time() - self.created_at
    
    @property
    def idle_seconds(self) -> float:
        """Time since last use in seconds."""
        return time.time() - self.last_used


# =============================================================================
# Conversation Manager
# =============================================================================

class ConversationManager:
    """Manages primed conversation sessions with pooling for concurrency.
    
    Features:
    - Creates and primes new conversations with system prompt + tool instructions
    - Pools sessions by system prompt hash to handle concurrent requests
    - Tracks which sessions are in-use vs available
    - Automatically expires idle sessions
    """
    
    def __init__(
        self,
        client: Perplexity,
        max_sessions: int = 100,
        max_sessions_per_pool: int = 10,
        session_timeout_seconds: float = 1800,  # 30 minutes
    ):
        """Initialize the conversation manager.
        
        Args:
            client: Perplexity client instance
            max_sessions: Maximum total number of cached sessions
            max_sessions_per_pool: Maximum sessions per system prompt hash
            session_timeout_seconds: Expire sessions after this idle time
        """
        self.client = client
        self.max_sessions = max_sessions
        self.max_sessions_per_pool = max_sessions_per_pool
        self.session_timeout = session_timeout_seconds
        # Pool of sessions per key
        self._session_pools: dict[str, list[Session]] = {}
        self._lock = Lock()
    
    def _cleanup_expired(self):
        """Remove expired sessions (call with lock held)."""
        for key in list(self._session_pools.keys()):
            pool = self._session_pools[key]
            # Remove expired idle sessions
            self._session_pools[key] = [
                s for s in pool
                if s.in_use or s.idle_seconds <= self.session_timeout
            ]
            # Remove empty pools
            if not self._session_pools[key]:
                del self._session_pools[key]
        
        # Enforce max total sessions
        total = sum(len(p) for p in self._session_pools.values())
        if total > self.max_sessions:
            # Collect all idle sessions and remove oldest
            all_sessions = [
                (key, i, s)
                for key, pool in self._session_pools.items()
                for i, s in enumerate(pool)
                if not s.in_use
            ]
            all_sessions.sort(key=lambda x: x[2].last_used)
            
            to_remove = total - self.max_sessions
            for key, idx, _ in all_sessions[:to_remove]:
                if key in self._session_pools and idx < len(self._session_pools[key]):
                    del self._session_pools[key][idx]
    
    def _get_session_key(self, system_hash: str, model: Model) -> str:
        """Create a unique session key from system hash and model."""
        return f"{system_hash}:{model.identifier}"
    
    def get_or_create_session(
        self,
        model: Model,
        system_prompt: str | None = None,
        tools: list[dict[str, Any]] | None = None,
    ) -> tuple[Session, bool]:
        """Get an available session or create a new one.
        
        Uses a pool of sessions to handle concurrent requests. If all sessions
        for a given system prompt are in-use, creates a new one (up to limit).
        
        Args:
            model: The Perplexity model to use
            system_prompt: Optional system prompt (will be distilled)
            tools: Optional tool definitions (for priming context)
            
        Returns:
            Tuple of (session, is_new) where is_new indicates if session was just created
        """
        system_hash = hash_system_prompt(system_prompt)
        session_key = self._get_session_key(system_hash, model)
        
        with self._lock:
            self._cleanup_expired()
            
            # Get or create pool for this key
            if session_key not in self._session_pools:
                self._session_pools[session_key] = []
            
            pool = self._session_pools[session_key]
            
            # Try to find an available session in the pool
            for session in pool:
                if session.acquire():
                    logging.debug(f"Acquired session from pool {session_key[:8]}... (request #{session.request_count})")
                    return session, False
            
            # No available sessions - create new one if under limit
            if len(pool) < self.max_sessions_per_pool:
                conversation = self.client.create_conversation(
                    ConversationConfig(
                        model=model,
                        citation_mode=CitationMode.CLEAN,
                    )
                )
                
                session = Session(
                    conversation=conversation,
                    system_hash=system_hash,
                    model=model,
                )
                session.acquire()  # Mark as in-use immediately
                pool.append(session)
                logging.debug(f"Created new session for pool {session_key[:8]}... (pool size: {len(pool)})")
                
                return session, True
            
            # Pool is full and all sessions busy - wait for one (should rarely happen)
            # For now, create a temporary session that won't be pooled
            logging.warning(f"Pool {session_key[:8]}... is full ({len(pool)} sessions), creating overflow session")
            conversation = self.client.create_conversation(
                ConversationConfig(
                    model=model,
                    citation_mode=CitationMode.CLEAN,
                )
            )
            
            session = Session(
                conversation=conversation,
                system_hash=system_hash,
                model=model,
            )
            session.acquire()
            # Don't add to pool - it's overflow
            return session, True
    
    def release_session(self, session: Session):
        """Release a session back to the pool for reuse."""
        session.release()
        logging.debug(f"Released session (hash: {session.system_hash[:8]}...)")
    
    def prime_session(
        self,
        session: Session,
        system_prompt: str | None,
        tools: list[dict[str, Any]] | None,
    ) -> str | None:
        """Prime a new session with context.
        
        Sends an initial message to establish context, then discards the response.
        
        Args:
            session: The session to prime
            system_prompt: Original system prompt
            tools: Tool definitions
            
        Returns:
            Priming response (for debugging) or None if already primed
        """
        if session.is_primed:
            return None
        
        # Build priming message
        distilled = distill_system_prompt(system_prompt)
        
        priming_parts = [
            "CONTEXT INITIALIZATION",
            "=" * 40,
            "",
            "Behavioral Guidelines:",
            distilled,
            "",
        ]
        
        if tools:
            # Include tool awareness in priming
            tool_names = [t.get("name", "unknown") for t in tools[:10]]  # First 10 tools
            priming_parts.extend([
                "Available Tools:",
                ", ".join(tool_names),
                "",
                "When I ask you to perform actions, use the appropriate tools.",
                "",
            ])
        
        priming_parts.extend([
            "=" * 40,
            "Acknowledge this context with a brief 'Ready.' response.",
        ])
        
        priming_message = "\n".join(priming_parts)
        
        # Send priming message
        try:
            session.conversation.ask(priming_message)
            session.is_primed = True
            logging.info(f"Session primed successfully (hash: {session.system_hash[:8]}...)")
            return session.conversation.answer
        except Exception as e:
            logging.error(f"Failed to prime session: {e}")
            return None
    
    def clear_pool(self, system_prompt: str | None, model: Model):
        """Clear a specific session pool.
        
        Args:
            system_prompt: The system prompt
            model: The model
        """
        system_hash = hash_system_prompt(system_prompt)
        session_key = self._get_session_key(system_hash, model)
        
        with self._lock:
            if session_key in self._session_pools:
                del self._session_pools[session_key]
                logging.debug(f"Cleared pool {session_key[:8]}...")
    
    def clear_all(self):
        """Clear all cached sessions."""
        with self._lock:
            total = sum(len(p) for p in self._session_pools.values())
            self._session_pools.clear()
            logging.info(f"Cleared {total} sessions")
    
    @property
    def session_count(self) -> int:
        """Total number of pooled sessions."""
        with self._lock:
            return sum(len(p) for p in self._session_pools.values())
    
    def get_stats(self) -> dict[str, Any]:
        """Get session pool statistics."""
        with self._lock:
            all_sessions = [s for pool in self._session_pools.values() for s in pool]
            
            if not all_sessions:
                return {
                    "total_sessions": 0,
                    "sessions_in_use": 0,
                    "sessions_available": 0,
                    "total_requests": 0,
                    "pools": 0,
                }
            
            total_requests = sum(s.request_count for s in all_sessions)
            in_use = sum(1 for s in all_sessions if s.in_use)
            
            return {
                "total_sessions": len(all_sessions),
                "sessions_in_use": in_use,
                "sessions_available": len(all_sessions) - in_use,
                "total_requests": total_requests,
                "pools": len(self._session_pools),
                "max_sessions": self.max_sessions,
                "max_sessions_per_pool": self.max_sessions_per_pool,
            }
