"""Integration tests for response parser within API server.

Tests verify that the response parser is correctly called and integrated
with the API server's message handling flow.
"""

import asyncio
import unittest
from unittest.mock import MagicMock, patch, AsyncMock

from perplexity_web_mcp.api.server import MessagesRequest, MessageParam
import perplexity_web_mcp.api.server as server_module


class TestAPIIntegration(unittest.TestCase):
    """Test integration of response parser with API server."""

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
    def test_parser_called_with_model_output(self, mock_parse, mock_client, mock_to_thread):
        """Test that parse_response is called with model output when tools are present."""
        from perplexity_web_mcp.api.server import create_message

        # Mock the Perplexity client and conversation
        mock_conversation = MagicMock()
        mock_conversation.answer = "I'll search for that. ```python\nsearch('Python tutorials')\n```"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread to execute synchronously
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Mock parse_response to return tool calls
        mock_parse.return_value = {
            "strategy": "python_ast",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python tutorials"}}],
            "confidence": 0.9
        }

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Find Python tutorials")],
            tools=[{
                "name": "search",
                "description": "Search the web",
                "input_schema": {"type": "object", "properties": {"query": {"type": "string"}}}
            }]
        )

        # Call the endpoint asynchronously
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())
            # Verify parse_response was called with the model's answer
            mock_parse.assert_called_with(mock_conversation.answer)
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    @patch('perplexity_web_mcp.api.server.logging')
    def test_parsing_failure_doesnt_crash(self, mock_logging, mock_parse, mock_client, mock_to_thread):
        """Test that parsing failures don't crash the API response."""
        from perplexity_web_mcp.api.server import create_message

        # Mock parse_response to raise an exception
        mock_parse.side_effect = ValueError("Parse error")

        # Mock the Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "Here's the information you requested"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Tell me about Python")],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function - should not raise an exception
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())
            # Verify the response was returned despite parse error
            self.assertIsNotNone(result)
            self.assertIn("content", result)
            # Verify warning was logged
            warning_calls = [c for c in mock_logging.warning.call_args_list
                            if "Response parsing failed" in str(c)]
            self.assertGreater(len(warning_calls), 0, "Should log parsing failure")
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    @patch('perplexity_web_mcp.api.server.logging')
    def test_successful_parsing_logs_tool_calls(self, mock_logging, mock_parse, mock_client, mock_to_thread):
        """Test that successful parsing logs tool calls at appropriate levels."""
        from perplexity_web_mcp.api.server import create_message

        # Mock parse_response to return multiple tool calls
        mock_parse.return_value = {
            "strategy": "key_value",
            "tool_calls": [
                {"name": "search", "arguments": {"query": "Python"}},
                {"name": "calculator", "arguments": {"expression": "2+2"}}
            ],
            "confidence": 0.7
        }

        # Mock the Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "SEARCH: Python\nCALCULATOR: 2+2"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="gpt-5.2",
            max_tokens=500,
            messages=[MessageParam(role="user", content="Search and calculate")],
            tools=[
                {"name": "search", "description": "Search"},
                {"name": "calculator", "description": "Calculate"}
            ]
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify INFO level log for parse summary
            info_calls = [c for c in mock_logging.info.call_args_list
                         if "Parsed 2 tool calls" in str(c)]
            self.assertGreater(len(info_calls), 0, "Should log tool call count at INFO level")

            # Verify DEBUG level logs for individual tool calls
            debug_calls = [c for c in mock_logging.debug.call_args_list
                          if "Tool call:" in str(c)]
            self.assertEqual(len(debug_calls), 2, "Should log each tool call at DEBUG level")
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_parser_not_called_without_tools(self, mock_parse, mock_client, mock_to_thread):
        """Test that parser is not called when no tools are provided."""
        from perplexity_web_mcp.api.server import create_message

        # Mock the Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "Here's the answer"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body WITHOUT tools
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Hello")],
            tools=None  # No tools
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())
            # Verify parse_response was NOT called
            mock_parse.assert_not_called()
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_tool_use_blocks_in_response(self, mock_parse, mock_client, mock_to_thread):
        """Test that tool_use content blocks are returned when confidence >= 0.7."""
        from perplexity_web_mcp.api.server import create_message

        # Mock parse_response to return tool calls with high confidence
        mock_parse.return_value = {
            "strategy": "python_ast",
            "tool_calls": [
                {"name": "search", "arguments": {"query": "Python tutorials"}},
                {"name": "calculator", "arguments": {"expression": "2+2"}}
            ],
            "confidence": 0.9
        }

        # Mock the Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "Let me search for that."
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="gpt-5.2",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Search and calculate")],
            tools=[
                {"name": "search", "description": "Search"},
                {"name": "calculator", "description": "Calculate"}
            ]
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify response structure
            self.assertEqual(result["stop_reason"], "tool_use")
            self.assertEqual(len(result["content"]), 3)  # 1 text + 2 tool_use blocks

            # Verify text block comes first
            self.assertEqual(result["content"][0]["type"], "text")
            self.assertEqual(result["content"][0]["text"], "Let me search for that.")

            # Verify tool_use blocks
            self.assertEqual(result["content"][1]["type"], "tool_use")
            self.assertEqual(result["content"][1]["name"], "search")
            self.assertIn("toolu_", result["content"][1]["id"])
            self.assertEqual(result["content"][1]["input"], {"query": "Python tutorials"})

            self.assertEqual(result["content"][2]["type"], "tool_use")
            self.assertEqual(result["content"][2]["name"], "calculator")
            self.assertIn("toolu_", result["content"][2]["id"])
            self.assertEqual(result["content"][2]["input"], {"expression": "2+2"})
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_low_confidence_returns_text_only(self, mock_parse, mock_client, mock_to_thread):
        """Test that low-confidence tool calls return text-only response."""
        from perplexity_web_mcp.api.server import create_message

        # Mock parse_response to return tool calls with LOW confidence
        mock_parse.return_value = {
            "strategy": "inline_code",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
            "confidence": 0.5  # Below threshold
        }

        # Mock the Perplexity client
        mock_conversation = MagicMock()
        mock_conversation.answer = "Here's some info about Python"
        mock_conversation.search_results = []
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="claude-sonnet-4-5",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Tell me about Python")],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify text-only response
            self.assertEqual(result["stop_reason"], "end_turn")
            self.assertEqual(len(result["content"]), 1)
            self.assertEqual(result["content"][0]["type"], "text")
            self.assertEqual(result["content"][0]["text"], "Here's some info about Python")
        finally:
            loop.close()

    @patch('perplexity_web_mcp.api.server.asyncio.to_thread')
    @patch('perplexity_web_mcp.api.server.Perplexity')
    @patch('perplexity_web_mcp.api.server.parse_response')
    def test_citations_appended_to_text_block(self, mock_parse, mock_client, mock_to_thread):
        """Test that citations are appended to the last text block, not tool_use blocks."""
        from perplexity_web_mcp.api.server import create_message

        # Mock parse_response to return tool calls
        mock_parse.return_value = {
            "strategy": "python_ast",
            "tool_calls": [{"name": "search", "arguments": {"query": "Python"}}],
            "confidence": 0.9
        }

        # Mock the Perplexity client with citations
        mock_conversation = MagicMock()
        mock_conversation.answer = "Let me search for that."
        mock_result = MagicMock()
        mock_result.url = "https://example.com"
        mock_conversation.search_results = [mock_result]
        mock_conversation.ask = MagicMock(return_value=None)

        mock_client_instance = MagicMock()
        mock_client_instance.create_conversation.return_value = mock_conversation
        mock_client_instance.close = MagicMock()
        mock_client.return_value = mock_client_instance

        # Mock asyncio.to_thread
        async def mock_thread_executor(func, *args):
            return func(*args)
        mock_to_thread.side_effect = mock_thread_executor

        # Create mock request
        mock_request = MagicMock()
        mock_request.headers = {}

        # Create request body with tools
        request_body = MessagesRequest(
            model="gpt-5.2",
            max_tokens=1000,
            messages=[MessageParam(role="user", content="Search for Python")],
            tools=[{"name": "search", "description": "Search"}]
        )

        # Call the endpoint
        async def run_test():
            result = await create_message(mock_request, request_body)
            return result

        # Run the async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            result = loop.run_until_complete(run_test())

            # Verify citations appended to text block
            self.assertEqual(result["stop_reason"], "tool_use")
            self.assertEqual(len(result["content"]), 2)  # 1 text + 1 tool_use

            # Text block should have citations
            text_block = result["content"][0]
            self.assertEqual(text_block["type"], "text")
            self.assertIn("Let me search for that.", text_block["text"])
            self.assertIn("Citations:", text_block["text"])
            self.assertIn("https://example.com", text_block["text"])

            # Tool use block should not have citations
            tool_block = result["content"][1]
            self.assertEqual(tool_block["type"], "tool_use")
            self.assertNotIn("Citations", str(tool_block.get("input", {})))
        finally:
            loop.close()


if __name__ == "__main__":
    unittest.main()