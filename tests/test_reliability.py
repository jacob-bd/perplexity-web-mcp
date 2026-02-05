"""Comprehensive reliability tests for graceful degradation and observability.

Tests verify that the system:
1. Gracefully degrades when parsing fails (REL-01)
2. Tracks metrics for success/failure rates (REL-02)
3. Provides clear error messages to users (REL-03)
4. Continues operating after failures
"""

import asyncio
import json
import unittest
from unittest.mock import MagicMock, patch

from perplexity_web_mcp.api.server import MessagesRequest, MessageParam
import perplexity_web_mcp.api.server as server_module
from prometheus_client import REGISTRY


class TestReliability(unittest.TestCase):
    """Test end-to-end reliability and observability."""

    def setUp(self):
        """Set up mocks for server module globals."""
        # Initialize module-level globals that are normally set in lifespan
        self.mock_config = MagicMock()
        self.mock_config.api_key = None
        self.mock_config.session_token = "test_token"
        server_module.config = self.mock_config

        # Create semaphore
        server_module.perplexity_semaphore = asyncio.Semaphore(1)
        server_module.last_request_time = 0.0

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_complete_graceful_degradation_flow(self, mock_parse, mock_client, mock_to_thread):
        """Test complete graceful degradation when parsing fails.

        Verifies:
        - Parse error doesn't crash API
        - Returns valid Anthropic format response
        - Metrics record failure
        - Error logged with internal details
        """
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock parse_response to raise SyntaxError
        mock_parse.side_effect = SyntaxError("invalid syntax")

        # Mock Perplexity response
        mock_conversation = MagicMock()
        mock_conversation.answer = "Here's what I found about Python programming."
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with tools
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Search for Python")],
            tools=[{"name": "search", "description": "Search the web"}]
        )

        # Get initial failure metric
        initial_failures = REGISTRY.get_sample_value(
            'tool_parse_attempts_total',
            {'strategy': 'error', 'success': 'false'}
        ) or 0

        # Execute - should NOT raise HTTPException
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify response is valid Anthropic format
            self.assertIsNotNone(result)
            self.assertIn("content", result)
            self.assertIsInstance(result["content"], list)

            # Verify graceful fallback to text-only
            self.assertEqual(result["stop_reason"], "end_turn")
            self.assertEqual(len(result["content"]), 1)
            self.assertEqual(result["content"][0]["type"], "text")
            self.assertEqual(result["content"][0]["text"], "Here's what I found about Python programming.")

            # Verify metrics recorded failure
            new_failures = REGISTRY.get_sample_value(
                'tool_parse_attempts_total',
                {'strategy': 'error', 'success': 'false'}
            ) or 0
            self.assertGreater(new_failures, initial_failures,
                             "Parse failure metric should increment")

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_metrics_accumulation_across_requests(self, mock_parse, mock_client, mock_to_thread):
        """Test that metrics accumulate correctly across multiple requests.

        Verifies:
        - Success metrics increment for successful parses
        - Failure metrics increment for failed parses
        - Confidence histogram records observations
        - Tool calls detected counter tracks individual tools
        """
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Get initial metrics
        initial_python_success = REGISTRY.get_sample_value(
            'tool_parse_attempts_total',
            {'strategy': 'python_ast', 'success': 'true'}
        ) or 0
        initial_keyval_success = REGISTRY.get_sample_value(
            'tool_parse_attempts_total',
            {'strategy': 'key_value', 'success': 'true'}
        ) or 0
        initial_failures = REGISTRY.get_sample_value(
            'tool_parse_attempts_total',
            {'strategy': 'error', 'success': 'false'}
        ) or 0
        initial_confidence_count = REGISTRY.get_sample_value(
            'tool_parse_confidence_count',
            {'strategy': 'python_ast'}
        ) or 0

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            # Request 1: Successful python_ast parse
            mock_parse.return_value = {
                "strategy": "python_ast",
                "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
                "confidence": 0.9
            }
            mock_conversation = MagicMock()
            mock_conversation.answer = "Let me search for that."
            mock_conversation.search_results = []
            mock_conversation.ask = MagicMock(return_value=None)
            mock_client_instance = MagicMock()
            mock_client_instance.create_conversation.return_value = mock_conversation
            mock_client_instance.close = MagicMock()
            mock_client.return_value = mock_client_instance

            request1 = MessagesRequest(
                model="gpt-5.2",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Search Python")],
                tools=[{"name": "search", "description": "Search"}]
            )
            loop.run_until_complete(create_message(mock_request, request1))

            # Request 2: Successful key_value parse
            mock_parse.return_value = {
                "strategy": "key_value",
                "tool_calls": [{"name": "calculator", "arguments": {"expr": "2+2"}}],
                "confidence": 0.7
            }
            mock_conversation.answer = "TOOL: calculator"
            request2 = MessagesRequest(
                model="claude-sonnet-4-5",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Calculate")],
                tools=[{"name": "calculator", "description": "Calculate"}]
            )
            loop.run_until_complete(create_message(mock_request, request2))

            # Request 3: Another python_ast success
            mock_parse.return_value = {
                "strategy": "python_ast",
                "tool_calls": [{"name": "read", "arguments": {"file": "data.txt"}}],
                "confidence": 0.85
            }
            mock_conversation.answer = "Let me read that file."
            request3 = MessagesRequest(
                model="gemini-3-flash",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Read file")],
                tools=[{"name": "read", "description": "Read file"}]
            )
            loop.run_until_complete(create_message(mock_request, request3))

            # Request 4: Parse failure
            mock_parse.side_effect = ValueError("Parse error")
            mock_conversation.answer = "Here's the answer."
            request4 = MessagesRequest(
                model="gpt-5.2",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Query")],
                tools=[{"name": "search", "description": "Search"}]
            )
            loop.run_until_complete(create_message(mock_request, request4))

            # Request 5: Another parse failure
            mock_parse.side_effect = SyntaxError("invalid syntax")
            mock_conversation.answer = "Another answer."
            request5 = MessagesRequest(
                model="claude-sonnet-4-5",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Query2")],
                tools=[{"name": "search", "description": "Search"}]
            )
            loop.run_until_complete(create_message(mock_request, request5))

            # Verify metrics accumulated correctly
            new_python_success = REGISTRY.get_sample_value(
                'tool_parse_attempts_total',
                {'strategy': 'python_ast', 'success': 'true'}
            ) or 0
            new_keyval_success = REGISTRY.get_sample_value(
                'tool_parse_attempts_total',
                {'strategy': 'key_value', 'success': 'true'}
            ) or 0
            new_failures = REGISTRY.get_sample_value(
                'tool_parse_attempts_total',
                {'strategy': 'error', 'success': 'false'}
            ) or 0
            new_confidence_count = REGISTRY.get_sample_value(
                'tool_parse_confidence_count',
                {'strategy': 'python_ast'}
            ) or 0

            # Verify success counts
            self.assertEqual(new_python_success - initial_python_success, 2,
                           "Should have 2 python_ast successes")
            self.assertEqual(new_keyval_success - initial_keyval_success, 1,
                           "Should have 1 key_value success")

            # Verify failure counts
            self.assertEqual(new_failures - initial_failures, 2,
                           "Should have 2 failures")

            # Verify confidence histogram observations
            self.assertEqual(new_confidence_count - initial_confidence_count, 2,
                           "Confidence histogram should have 2 observations for python_ast")

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_low_confidence_graceful_fallback(self, mock_parse, mock_client, mock_to_thread):
        """Test graceful fallback when confidence is below 0.7 threshold.

        Verifies:
        - Low confidence results in text-only response
        - Parse attempt recorded as failure
        - Logs explain confidence threshold
        """
        from perplexity_web_mcp.api.server import create_message
        import logging

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock parse_response with low confidence
        mock_parse.return_value = {
            "strategy": "inline_code",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
            "confidence": 0.6  # Below 0.7 threshold
        }

        # Mock Perplexity response
        mock_conversation = MagicMock()
        mock_conversation.answer = "You could use `search('Python')` to find that."
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Search for Python")],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Get initial low-confidence failure metric
        initial_inline_failures = REGISTRY.get_sample_value(
            'tool_parse_attempts_total',
            {'strategy': 'inline_code', 'success': 'false'}
        ) or 0

        # Capture logs
        with self.assertLogs(level=logging.INFO) as log_context:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                result = loop.run_until_complete(create_message(mock_request, request_body))

                # Verify graceful fallback to text-only
                self.assertEqual(result["stop_reason"], "end_turn")
                self.assertEqual(len(result["content"]), 1)
                self.assertEqual(result["content"][0]["type"], "text")

                # Verify metrics show failure due to low confidence
                new_inline_failures = REGISTRY.get_sample_value(
                    'tool_parse_attempts_total',
                    {'strategy': 'inline_code', 'success': 'false'}
                ) or 0
                self.assertGreater(new_inline_failures, initial_inline_failures,
                                 "Low confidence should be recorded as failure")

                # Verify logs explain confidence threshold
                confidence_logs = [record for record in log_context.records
                                 if "confidence" in record.message.lower()]
                self.assertGreater(len(confidence_logs), 0,
                                 "Should log about confidence evaluation")

            finally:
                loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_error_message_clarity(self, mock_parse, mock_client, mock_to_thread):
        """Test that user-facing error messages are clear and actionable.

        Verifies:
        - Different exception types get appropriate messages
        - No stack traces in response content
        - Internal details logged separately
        """
        from perplexity_web_mcp.api.server import create_message
        import logging

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "Here's the response text."
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            # Test SyntaxError
            mock_parse.side_effect = SyntaxError("invalid syntax")
            request1 = MessagesRequest(
                model="claude-sonnet-4-5",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Query1")],
                tools=[{"name": "search", "description": "Search"}]
            )

            with self.assertLogs(level=logging.ERROR) as log_context:
                result1 = loop.run_until_complete(create_message(mock_request, request1))

                # Verify response has no stack trace
                response_text = result1["content"][0]["text"]
                self.assertNotIn("Traceback", response_text)
                self.assertNotIn("SyntaxError", response_text)

                # Verify internal logging includes exception type
                error_logs = [record for record in log_context.records
                            if record.levelname == "ERROR"]
                self.assertGreater(len(error_logs), 0,
                                 "Should log error at ERROR level")
                self.assertTrue(
                    any("SyntaxError" in record.message for record in error_logs),
                    "Internal logs should include exception type"
                )

            # Test JSONDecodeError
            mock_parse.side_effect = json.JSONDecodeError("Expecting value", "doc", 0)
            request2 = MessagesRequest(
                model="gpt-5.2",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Query2")],
                tools=[{"name": "search", "description": "Search"}]
            )

            with self.assertLogs(level=logging.ERROR) as log_context:
                result2 = loop.run_until_complete(create_message(mock_request, request2))

                # Verify no internal details in response
                response_text = result2["content"][0]["text"]
                self.assertNotIn("JSONDecodeError", response_text)
                self.assertNotIn("Expecting value", response_text)

                # Verify internal logging
                error_logs = [record for record in log_context.records
                            if "JSONDecodeError" in record.message]
                self.assertGreater(len(error_logs), 0,
                                 "Should log JSONDecodeError internally")

            # Test KeyError
            mock_parse.side_effect = KeyError("tool_calls")
            request3 = MessagesRequest(
                model="gemini-3-flash",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Query3")],
                tools=[{"name": "search", "description": "Search"}]
            )

            with self.assertLogs(level=logging.ERROR) as log_context:
                result3 = loop.run_until_complete(create_message(mock_request, request3))

                # Verify response is clean
                response_text = result3["content"][0]["text"]
                self.assertNotIn("KeyError", response_text)
                self.assertNotIn("tool_calls", response_text)

                # Verify internal logging
                error_logs = [record for record in log_context.records
                            if "KeyError" in record.message]
                self.assertGreater(len(error_logs), 0,
                                 "Should log KeyError internally")

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_system_continues_after_failures(self, mock_parse, mock_client, mock_to_thread):
        """Test that system continues operating normally after parse failures.

        Verifies:
        - Failed request returns valid response
        - Subsequent successful request works correctly
        - No state corruption from failure
        """
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity client
        mock_client_instance = MagicMock()
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            # Request 1: Parse failure
            mock_parse.side_effect = ValueError("Parse error")
            mock_conversation1 = MagicMock()
            mock_conversation1.answer = "Response from failed parse request."
            mock_conversation1.search_results = []
            mock_conversation1.ask = MagicMock(return_value=None)
            mock_client_instance.create_conversation.return_value = mock_conversation1

            request1 = MessagesRequest(
                model="claude-sonnet-4-5",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="First query")],
                tools=[{"name": "search", "description": "Search"}]
            )

            result1 = loop.run_until_complete(create_message(mock_request, request1))

            # Verify first request returned valid response despite failure
            self.assertIsNotNone(result1)
            self.assertEqual(result1["stop_reason"], "end_turn")
            self.assertEqual(result1["content"][0]["type"], "text")
            self.assertEqual(result1["content"][0]["text"], "Response from failed parse request.")

            # Request 2: Successful parse
            mock_parse.side_effect = None  # Clear the exception
            mock_parse.return_value = {
                "strategy": "python_ast",
                "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
                "confidence": 0.9
            }
            mock_conversation2 = MagicMock()
            mock_conversation2.answer = "Let me search for that."
            mock_conversation2.search_results = []
            mock_conversation2.ask = MagicMock(return_value=None)
            mock_client_instance.create_conversation.return_value = mock_conversation2

            request2 = MessagesRequest(
                model="gpt-5.2",
                max_tokens=1000,
                messages=[MessageParam(role="user", content="Second query")],
                tools=[{"name": "search", "description": "Search"}]
            )

            result2 = loop.run_until_complete(create_message(mock_request, request2))

            # Verify second request succeeded with tool_use
            self.assertIsNotNone(result2)
            self.assertEqual(result2["stop_reason"], "tool_use")
            self.assertEqual(len(result2["content"]), 2)  # text + tool_use
            self.assertEqual(result2["content"][0]["type"], "text")
            self.assertEqual(result2["content"][1]["type"], "tool_use")
            self.assertEqual(result2["content"][1]["name"], "search")

            # Verify no state corruption - both responses are independent
            self.assertNotEqual(result1, result2)
            self.assertNotEqual(result1["content"], result2["content"])

        finally:
            loop.close()


if __name__ == "__main__":
    unittest.main()
