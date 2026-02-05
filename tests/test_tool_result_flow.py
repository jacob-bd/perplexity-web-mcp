"""End-to-end tests for complete tool calling cycles with result injection.

Tests verify the full tool calling flow:
1. User query with tools array -> API returns tool_use block
2. User sends tool_result -> API injects result into prompt and continues

Includes tests for streaming, non-streaming, multiple results, errors,
validation, and confidence filtering.
"""

import asyncio
import json
import unittest
from unittest.mock import MagicMock, patch

from perplexity_web_mcp.api.server import MessagesRequest, MessageParam
import perplexity_web_mcp.api.server as server_module


class TestToolResultFlow(unittest.TestCase):
    """Test complete end-to-end tool calling cycles."""

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
    @patch('perplexity_web_mcp.api.server.build_prompt_with_tools')
    def test_full_tool_calling_cycle(self, mock_prompt_builder, mock_parse, mock_client, mock_to_thread):
        """Test complete tool calling cycle: query -> tool_use -> tool_result -> continuation."""
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # TURN 1: User query with tools -> API returns tool_use block
        # ============================================================

        # Mock Perplexity response for turn 1
        mock_conversation_1 = MagicMock()
        mock_conversation_1.answer = "I'll search for that. ```python\nsearch('Python tutorials')\n```"
        mock_conversation_1.search_results = []
        mock_conversation_1.ask = MagicMock(return_value=None)

        mock_client_instance_1 = MagicMock()
        mock_client_instance_1.create_conversation.return_value = mock_conversation_1
        mock_client_instance_1.close = MagicMock()

        # Mock parse_response for turn 1 to return tool call
        mock_parse.return_value = {
            "strategy": "python_ast",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python tutorials"}}],
            "confidence": 0.9
        }

        # Mock build_prompt_with_tools for turn 1 (no tool results yet)
        mock_prompt_builder.return_value = "Tool-injected prompt: Find Python tutorials"

        mock_client.return_value = mock_client_instance_1

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Turn 1 request
        request_turn_1 = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Find Python tutorials")],
            tools=[{
                "name": "search",
                "description": "Search the web",
                "input_schema": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"]
                }
            }]
        )

        # Execute turn 1
        async def run_turn_1():
            return await create_message(mock_request, request_turn_1)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result_turn_1 = loop.run_until_complete(run_turn_1())

            # Verify turn 1 response has tool_use block
            self.assertEqual(result_turn_1["stop_reason"], "tool_use")
            self.assertEqual(len(result_turn_1["content"]), 2)  # text + tool_use

            # Verify tool_use block structure
            tool_use_block = result_turn_1["content"][1]
            self.assertEqual(tool_use_block["type"], "tool_use")
            self.assertEqual(tool_use_block["name"], "search")
            self.assertIn("toolu_", tool_use_block["id"])
            self.assertEqual(tool_use_block["input"], {"query": "Python tutorials"})

            tool_use_id = tool_use_block["id"]

            # TURN 2: User sends tool_result -> API injects and continues
            # ============================================================

            # Mock Perplexity response for turn 2
            mock_conversation_2 = MagicMock()
            mock_conversation_2.answer = "Based on the search results, here are the top Python tutorials..."
            mock_conversation_2.search_results = []
            mock_conversation_2.ask = MagicMock(return_value=None)

            mock_client_instance_2 = MagicMock()
            mock_client_instance_2.create_conversation.return_value = mock_conversation_2
            mock_client_instance_2.close = MagicMock()

            # Mock parse_response for turn 2 (no tool calls in continuation)
            mock_parse.return_value = {
                "strategy": "none",
                "tool_calls": [],
                "confidence": 0.0
            }

            # Mock build_prompt_with_tools for turn 2 WITH tool results
            mock_prompt_builder.return_value = "Tool-injected prompt with results: Summarize the tutorials"

            mock_client.return_value = mock_client_instance_2

            # Turn 2 request with tool_result
            request_turn_2 = MessagesRequest(
                model="claude-sonnet-4-5",
                max_tokens=1000,
                messages=[
                    MessageParam(role="user", content="Find Python tutorials"),
                    MessageParam(
                        role="assistant",
                        content=[tool_use_block]  # Include the tool_use from turn 1
                    ),
                    MessageParam(
                        role="user",
                        content=[{
                            "type": "tool_result",
                            "tool_use_id": tool_use_id,
                            "content": "Found 10 comprehensive Python tutorials covering basics to advanced topics",
                            "is_error": False
                        }]
                    ),
                    MessageParam(role="user", content="Summarize the tutorials")
                ],
                tools=[{
                    "name": "search",
                    "description": "Search the web",
                    "input_schema": {
                        "type": "object",
                        "properties": {"query": {"type": "string"}},
                        "required": ["query"]
                    }
                }]
            )

            # Execute turn 2
            async def run_turn_2():
                return await create_message(mock_request, request_turn_2)

            result_turn_2 = loop.run_until_complete(run_turn_2())

            # Verify turn 2 response is text-only (no more tool calls)
            self.assertEqual(result_turn_2["stop_reason"], "end_turn")
            self.assertEqual(len(result_turn_2["content"]), 1)
            self.assertEqual(result_turn_2["content"][0]["type"], "text")
            self.assertIn("Based on the search results", result_turn_2["content"][0]["text"])

            # Verify build_prompt_with_tools was called with tool_results in turn 2
            # Get the last call (turn 2)
            last_call = mock_prompt_builder.call_args_list[-1]
            kwargs = last_call[1] if len(last_call) > 1 else {}
            self.assertIn("tool_results", kwargs)
            tool_results = kwargs["tool_results"]
            self.assertIsNotNone(tool_results)
            self.assertIn(tool_use_id, tool_results)

            # Verify tool result content and error flag
            result_tuple = tool_results[tool_use_id]
            self.assertEqual(result_tuple[0], "Found 10 comprehensive Python tutorials covering basics to advanced topics")
            self.assertEqual(result_tuple[1], False)

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    @patch('perplexity_web_mcp.api.server.build_prompt_with_tools')
    def test_multiple_tool_results_injection(self, mock_prompt_builder, mock_parse, mock_client, mock_to_thread):
        """Test injection of multiple tool results into prompt."""
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity response
        mock_conversation = MagicMock()
        mock_conversation.answer = "Based on all the tool results, here's the summary"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock parse_response (no tool calls in response)
        mock_parse.return_value = {
            "strategy": "none",
            "tool_calls": [],
            "confidence": 0.0
        }

        # Mock build_prompt_with_tools
        mock_prompt_builder.return_value = "Prompt with 3 tool results"

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with multiple tool results
        request_body = MessagesRequest(
            model="gpt-5.2",
            max_tokens=1000,
            messages=[
                MessageParam(role="user", content="Search for Python, Java, and Go"),
                MessageParam(
                    role="assistant",
                    content=[
                        {"type": "tool_use", "id": "toolu_1", "name": "search", "input": {"query": "Python"}},
                        {"type": "tool_use", "id": "toolu_2", "name": "search", "input": {"query": "Java"}},
                        {"type": "tool_use", "id": "toolu_3", "name": "search", "input": {"query": "Go"}}
                    ]
                ),
                MessageParam(
                    role="user",
                    content=[
                        {"type": "tool_result", "tool_use_id": "toolu_1", "content": "Python is great"},
                        {"type": "tool_result", "tool_use_id": "toolu_2", "content": "Java is robust"},
                        {"type": "tool_result", "tool_use_id": "toolu_3", "content": "Go is fast"}
                    ]
                ),
                MessageParam(role="user", content="Compare them")
            ],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Execute
        async def run_test():
            return await create_message(mock_request, request_body)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify build_prompt_with_tools received all 3 tool results
            call_kwargs = mock_prompt_builder.call_args[1]
            tool_results = call_kwargs["tool_results"]

            self.assertEqual(len(tool_results), 3)
            self.assertIn("toolu_1", tool_results)
            self.assertIn("toolu_2", tool_results)
            self.assertIn("toolu_3", tool_results)

            self.assertEqual(tool_results["toolu_1"][0], "Python is great")
            self.assertEqual(tool_results["toolu_2"][0], "Java is robust")
            self.assertEqual(tool_results["toolu_3"][0], "Go is fast")

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    @patch('perplexity_web_mcp.api.server.build_prompt_with_tools')
    def test_error_tool_result_formatting(self, mock_prompt_builder, mock_parse, mock_client, mock_to_thread):
        """Test that error tool results are properly formatted with is_error flag."""
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity response
        mock_conversation = MagicMock()
        mock_conversation.answer = "The search failed, but here's what I can tell you anyway..."
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock parse_response (no tool calls)
        mock_parse.return_value = {
            "strategy": "none",
            "tool_calls": [],
            "confidence": 0.0
        }

        # Mock build_prompt_with_tools
        mock_prompt_builder.return_value = "Prompt with error result"

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with error tool result
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[
                MessageParam(role="user", content="Search for info"),
                MessageParam(
                    role="assistant",
                    content=[{"type": "tool_use", "id": "toolu_err", "name": "search", "input": {"query": "info"}}]
                ),
                MessageParam(
                    role="user",
                    content=[{
                        "type": "tool_result",
                        "tool_use_id": "toolu_err",
                        "content": "Connection timeout: Could not reach search API",
                        "is_error": True
                    }]
                ),
                MessageParam(role="user", content="What happened?")
            ],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Execute
        async def run_test():
            return await create_message(mock_request, request_body)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify error flag was passed to prompt builder
            call_kwargs = mock_prompt_builder.call_args[1]
            tool_results = call_kwargs["tool_results"]

            self.assertIn("toolu_err", tool_results)
            content, is_error = tool_results["toolu_err"]
            self.assertEqual(content, "Connection timeout: Could not reach search API")
            self.assertTrue(is_error)

        finally:
            loop.close()

    def test_tool_result_without_prior_tool_use(self):
        """Test that orphaned tool_result without matching tool_use returns 400 error."""
        from perplexity_web_mcp.api.server import create_message
        from fastapi import HTTPException

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with tool_result but no prior tool_use
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[
                MessageParam(
                    role="user",
                    content=[{
                        "type": "tool_result",
                        "tool_use_id": "toolu_orphan",
                        "content": "Some result"
                    }]
                )
            ]
        )

        # Execute and expect HTTPException
        async def run_test():
            with self.assertRaises(HTTPException) as context:
                await create_message(mock_request, request_body)

            # Verify 400 status and error message
            self.assertEqual(context.exception.status_code, 400)
            self.assertIn("Invalid tool pairing", str(context.exception.detail))
            self.assertIn("toolu_orphan", str(context.exception.detail))

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop.run_until_complete(run_test())
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_low_confidence_tool_calls_filtered(self, mock_parse, mock_client, mock_to_thread):
        """Test that low-confidence tool calls (< 0.7) are filtered and not returned."""
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity response with tool-like content
        mock_conversation = MagicMock()
        mock_conversation.answer = "You could use `search('Python')` to find that information"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock parse_response to return LOW confidence (inline_code strategy = 0.5)
        mock_parse.return_value = {
            "strategy": "inline_code",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
            "confidence": 0.5  # Below 0.7 threshold
        }

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with tools
        request_body = MessagesRequest(
            model="gpt-5.2",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Tell me about Python")],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Execute
        async def run_test():
            return await create_message(mock_request, request_body)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify response has NO tool_use blocks (filtered by threshold)
            self.assertEqual(result["stop_reason"], "end_turn")
            self.assertEqual(len(result["content"]), 1)
            self.assertEqual(result["content"][0]["type"], "text")
            # Response should be text-only despite parser finding tool calls
            self.assertIn("search", result["content"][0]["text"])

        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    @patch('perplexity_web_mcp.api.server.build_prompt_with_tools')
    def test_streaming_with_tool_results(self, mock_prompt_builder, mock_parse, mock_client, mock_to_thread):
        """Test streaming mode with tool result injection."""
        from perplexity_web_mcp.api.server import create_message

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock Perplexity for streaming response
        mock_conversation = MagicMock()
        mock_conversation.answer = None
        mock_conversation.search_results = []

        # Simulate streaming responses
        streaming_responses = [
            MagicMock(answer="Based"),
            MagicMock(answer="Based on"),
            MagicMock(answer="Based on the"),
            MagicMock(answer="Based on the search results")
        ]

        def mock_ask(query, stream=False):
            if stream:
                for resp in streaming_responses:
                    yield resp
            else:
                mock_conversation.answer = "Based on the search results"
                return None

        mock_conversation.ask = mock_ask

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock parse_response (no tool calls in streaming response)
        mock_parse.return_value = {
            "strategy": "none",
            "tool_calls": [],
            "confidence": 0.0
        }

        # Mock build_prompt_with_tools
        mock_prompt_builder.return_value = "Streaming prompt with tool results"

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Request with streaming and tool results
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            stream=True,  # Enable streaming
            messages=[
                MessageParam(role="user", content="Search Python"),
                MessageParam(
                    role="assistant",
                    content=[{"type": "tool_use", "id": "toolu_stream", "name": "search", "input": {"query": "Python"}}]
                ),
                MessageParam(
                    role="user",
                    content=[{
                        "type": "tool_result",
                        "tool_use_id": "toolu_stream",
                        "content": "Python is a programming language"
                    }]
                ),
                MessageParam(role="user", content="Summarize")
            ],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Execute streaming request
        async def run_test():
            response = await create_message(mock_request, request_body)
            return response

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            response = loop.run_until_complete(run_test())

            # Verify it's a streaming response
            from fastapi.responses import StreamingResponse
            self.assertIsInstance(response, StreamingResponse)

            # Verify build_prompt_with_tools was called with tool_results
            call_kwargs = mock_prompt_builder.call_args[1]
            tool_results = call_kwargs["tool_results"]
            self.assertIsNotNone(tool_results)
            self.assertIn("toolu_stream", tool_results)

        finally:
            loop.close()


if __name__ == "__main__":
    unittest.main()
