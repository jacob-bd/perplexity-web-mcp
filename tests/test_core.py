"""Comprehensive unit tests for the core module.

All tests are designed to run WITHOUT network access.
Uses mocks for HTTPClient and tmp_path for file operations.
"""

from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.config import ClientConfig, ConversationConfig
from perplexity_web_mcp.core import Conversation, Perplexity
from perplexity_web_mcp.enums import CitationMode, SearchFocus, SourceFocus, TimeRange
from perplexity_web_mcp.exceptions import (
    FileValidationError,
    RateLimitError,
    ResearchClarifyingQuestionsError,
    ResponseParsingError,
)
from perplexity_web_mcp.models import Models
from perplexity_web_mcp.types import Response, SearchResultItem


# ============================================================================
# Mock HTTPClient
# ============================================================================


class MockHTTPClient:
    """Minimal mock for Conversation tests (no network calls)."""

    def close(self) -> None:
        pass

    def init_search(self, query: str) -> None:
        pass

    def stream_ask(self, payload: dict) -> iter:
        return iter([])

    def post(self, *a: object, **kw: object) -> MagicMock:
        return MagicMock()


# ============================================================================
# 1. Perplexity Client Initialization
# ============================================================================


class TestPerplexityInit:
    """Test Perplexity client initialization."""

    def test_empty_token_raises(self) -> None:
        with pytest.raises(ValueError, match="session_token cannot be empty"):
            Perplexity("")

    def test_whitespace_only_token_raises(self) -> None:
        with pytest.raises(ValueError, match="session_token cannot be empty"):
            Perplexity("   \t\n  ")

    @patch("perplexity_web_mcp.core.HTTPClient")
    @patch("perplexity_web_mcp.core.configure_logging")
    def test_valid_token_creates_http_client(self, mock_configure: MagicMock, mock_http_class: MagicMock) -> None:
        mock_http = MagicMock()
        mock_http_class.return_value = mock_http

        client = Perplexity("valid-token-123")

        mock_http_class.assert_called_once()
        call_kw = mock_http_class.call_args[1]
        assert call_kw.get("requests_per_second") == 0.5  # from ClientConfig default
        assert client._http is mock_http

    @patch("perplexity_web_mcp.core.HTTPClient")
    @patch("perplexity_web_mcp.core.configure_logging")
    def test_client_config_passed_to_http(self, mock_configure: MagicMock, mock_http_class: MagicMock) -> None:
        config = ClientConfig(timeout=120, max_retries=5)
        Perplexity("token", config=config)

        call_kw = mock_http_class.call_args[1]
        assert call_kw["timeout"] == 120
        assert call_kw["max_retries"] == 5


# ============================================================================
# 2. _validate_files
# ============================================================================


class TestValidateFiles:
    """Test _validate_files logic using tmp_path."""

    def _conv(self, http: MockHTTPClient, config: ConversationConfig | None = None) -> Conversation:
        return Conversation(http, config or ConversationConfig())

    def test_missing_file_raises(self, tmp_path: Path) -> None:
        missing = tmp_path / "nonexistent.txt"
        conv = self._conv(MockHTTPClient())

        with pytest.raises(FileValidationError, match="File not found"):
            conv._validate_files([str(missing)])

    def test_directory_raises(self, tmp_path: Path) -> None:
        conv = self._conv(MockHTTPClient())

        with pytest.raises(FileValidationError, match="Path is not a file"):
            conv._validate_files([str(tmp_path)])

    def test_empty_file_raises(self, tmp_path: Path) -> None:
        empty = tmp_path / "empty.txt"
        empty.write_bytes(b"")
        conv = self._conv(MockHTTPClient())

        with pytest.raises(FileValidationError, match="File is empty"):
            conv._validate_files([str(empty)])

    def test_file_too_large_raises(self, tmp_path: Path) -> None:
        from perplexity_web_mcp.limits import MAX_FILE_SIZE

        big = tmp_path / "big.bin"
        big.write_bytes(b"x" * (MAX_FILE_SIZE + 1))
        conv = self._conv(MockHTTPClient())

        with pytest.raises(FileValidationError, match="exceeds 50MB"):
            conv._validate_files([str(big)])

    def test_too_many_files_raises(self, tmp_path: Path) -> None:
        from perplexity_web_mcp.limits import MAX_FILES

        files = []
        for i in range(MAX_FILES + 1):
            f = tmp_path / f"file{i}.txt"
            f.write_text("content")
            files.append(str(f))

        conv = self._conv(MockHTTPClient())
        with pytest.raises(FileValidationError, match="Too many files"):
            conv._validate_files(files)

    def test_valid_file_returns_file_info(self, tmp_path: Path) -> None:
        f = tmp_path / "valid.txt"
        f.write_text("hello world")
        conv = self._conv(MockHTTPClient())

        result = conv._validate_files([str(f)])

        assert len(result) == 1
        assert Path(result[0].path).resolve() == f.resolve()
        assert result[0].size == 11
        assert result[0].mimetype
        assert result[0].is_image is False

    def test_deduplication_by_path(self, tmp_path: Path) -> None:
        f = tmp_path / "dup.txt"
        f.write_text("content")
        conv = self._conv(MockHTTPClient())

        # Same file via str, resolve(), and Path - all resolve to same canonical path
        result = conv._validate_files([str(f), str(f.resolve()), str(Path(f))])

        assert len(result) == 1

    def test_valid_image_mimetype(self, tmp_path: Path) -> None:
        img = tmp_path / "test.png"
        img.write_bytes(b"\x89PNG\r\n\x1a\nfake")
        conv = self._conv(MockHTTPClient())

        result = conv._validate_files([str(img)])

        assert len(result) == 1
        assert result[0].is_image is True
        assert "image" in result[0].mimetype

    def test_empty_list_returns_empty(self) -> None:
        conv = self._conv(MockHTTPClient())
        assert conv._validate_files([]) == []
        assert conv._validate_files(None) == []


# ============================================================================
# 3. _build_payload
# ============================================================================


class TestBuildPayload:
    """Test _build_payload builds correct dict from config."""

    def _conv(self, config: ConversationConfig | None = None) -> Conversation:
        return Conversation(MockHTTPClient(), config or ConversationConfig())

    def test_basic_payload_structure(self) -> None:
        conv = self._conv()
        payload = conv._build_payload("hello", Models.BEST, [])

        assert "params" in payload
        assert "query_str" in payload
        assert payload["query_str"] == "hello"

        params = payload["params"]
        assert params["model_preference"] == Models.BEST.identifier
        assert params["mode"] == Models.BEST.mode
        assert params["search_focus"] == SearchFocus.WEB.value
        assert params["attachments"] == []
        assert params["language"] == "en-US"
        assert params["sources"] == [SourceFocus.WEB.value]

    def test_file_urls_in_attachments(self) -> None:
        conv = self._conv()
        urls = ["https://s3.example.com/file1.pdf", "https://s3.example.com/file2.png"]
        payload = conv._build_payload("query", Models.SONAR, urls)

        assert payload["params"]["attachments"] == urls

    def test_source_focus_list(self) -> None:
        config = ConversationConfig(source_focus=[SourceFocus.WEB, SourceFocus.ACADEMIC])
        conv = self._conv(config)
        payload = conv._build_payload("q", Models.BEST, [])

        assert payload["params"]["sources"] == ["web", "scholar"]

    def test_source_focus_accepts_connector_string(self) -> None:
        config = ConversationConfig(source_focus=["pitchbook_mcp_cashmere"])
        conv = self._conv(config)
        payload = conv._build_payload("q", Models.BEST, [])

        assert payload["params"]["sources"] == ["pitchbook_mcp_cashmere"]

    def test_followup_includes_uuid_and_token(self) -> None:
        conv = self._conv()
        conv._backend_uuid = "uuid-123"
        conv._read_write_token = "token-456"

        payload = conv._build_payload("follow-up?", Models.BEST, [])

        params = payload["params"]
        assert params["last_backend_uuid"] == "uuid-123"
        assert params["read_write_token"] == "token-456"
        assert params["query_source"] == "followup"

    def test_coordinates_in_payload(self) -> None:
        from perplexity_web_mcp.types import Coordinates

        config = ConversationConfig(coordinates=Coordinates(latitude=37.7, longitude=-122.4))
        conv = self._conv(config)
        payload = conv._build_payload("q", Models.BEST, [])

        coords = payload["params"]["client_coordinates"]
        assert coords is not None
        assert coords["location_lat"] == 37.7
        assert coords["location_lng"] == -122.4
        assert payload["params"]["local_search_enabled"] is True

    def test_time_range_in_payload(self) -> None:
        config = ConversationConfig(time_range=TimeRange.LAST_WEEK)
        conv = self._conv(config)
        payload = conv._build_payload("q", Models.BEST, [])

        assert payload["params"]["search_recency_filter"] == "WEEK"


# ============================================================================
# 4. _format_citations
# ============================================================================


class TestFormatCitations:
    """Test citation mode handling (DEFAULT, CLEAN, MARKDOWN)."""

    def _conv(self, citation_mode: CitationMode) -> Conversation:
        config = ConversationConfig(citation_mode=citation_mode)
        conv = Conversation(MockHTTPClient(), config)
        conv._citation_mode = citation_mode
        conv._search_results = [
            SearchResultItem(title="A", snippet="s1", url="https://a.com"),
            SearchResultItem(title="B", snippet="s2", url="https://b.com"),
        ]
        return conv

    def test_default_leave_text_alone(self) -> None:
        conv = self._conv(CitationMode.DEFAULT)
        text = "Some text [1] and more [2] here."
        assert conv._format_citations(text) == text

    def test_default_none_and_empty_unchanged(self) -> None:
        conv = self._conv(CitationMode.DEFAULT)
        assert conv._format_citations(None) is None
        assert conv._format_citations("") == ""

    def test_clean_removes_citations(self) -> None:
        conv = self._conv(CitationMode.CLEAN)
        result = conv._format_citations("Text [1] more [2] end.")
        assert result == "Text  more  end."

    def test_clean_removes_multiple(self) -> None:
        conv = self._conv(CitationMode.CLEAN)
        result = conv._format_citations("A[1]B[2]C[10]D")
        assert "[1]" not in result
        assert "[2]" not in result
        assert "[10]" not in result

    def test_markdown_converts_to_links(self) -> None:
        conv = self._conv(CitationMode.MARKDOWN)
        result = conv._format_citations("See [1] and [2].")
        assert result == "See [1](https://a.com) and [2](https://b.com)."

    def test_markdown_out_of_range_keeps_original(self) -> None:
        conv = self._conv(CitationMode.MARKDOWN)
        result = conv._format_citations("Cite [99]")
        assert result == "Cite [99]"  # No URL for index 98

    def test_markdown_zero_index(self) -> None:
        conv = self._conv(CitationMode.MARKDOWN)
        result = conv._format_citations("Cite [0]")  # [0] doesn't match \d{1,2} as 1-2 digits for 01-99 style
        assert "[0]" in result  # Pattern is \d{1,2}, 0 is valid - idx=-1, out of range

    def test_non_digit_in_bracket_unchanged(self) -> None:
        conv = self._conv(CitationMode.CLEAN)
        result = conv._format_citations("Text [x] here")
        assert result == "Text [x] here"


# ============================================================================
# 5. _parse_line
# ============================================================================


class TestParseLine:
    """Test SSE line parsing (bytes/str, valid/malformed JSON)."""

    def _conv(self) -> Conversation:
        return Conversation(MockHTTPClient(), ConversationConfig())

    def test_bytes_valid_json(self) -> None:
        conv = self._conv()
        line = b'data: {"key": "value"}'
        result = conv._parse_line(line)
        assert result == {"key": "value"}

    def test_str_valid_json(self) -> None:
        conv = self._conv()
        line = 'data: {"num": 42}'
        result = conv._parse_line(line)
        assert result == {"num": 42}

    def test_malformed_json_returns_none(self) -> None:
        conv = self._conv()
        line = "data: {invalid json}"
        result = conv._parse_line(line)
        assert result is None

    def test_empty_after_prefix_returns_none(self) -> None:
        conv = self._conv()
        assert conv._parse_line(b"data: ") is None
        assert conv._parse_line("data: ") is None

    def test_non_data_line_returns_none(self) -> None:
        conv = self._conv()
        assert conv._parse_line(b"event: message") is None
        assert conv._parse_line(": comment") is None
        assert conv._parse_line(b"") is None

    def test_complex_json(self) -> None:
        conv = self._conv()
        line = b'data: {"nested": {"a": 1}, "list": [1,2,3]}'
        result = conv._parse_line(line)
        assert result["nested"] == {"a": 1}
        assert result["list"] == [1, 2, 3]


# ============================================================================
# 6. _process_data
# ============================================================================


class TestProcessData:
    """Test _process_data with different SSE data structures."""

    def _conv(self) -> Conversation:
        return Conversation(MockHTTPClient(), ConversationConfig())

    def test_backend_uuid_set(self) -> None:
        conv = self._conv()
        conv._process_data({"backend_uuid": "uuid-xyz"})
        assert conv._backend_uuid == "uuid-xyz"

    def test_read_write_token_set(self) -> None:
        conv = self._conv()
        conv._process_data({"read_write_token": "rw-123"})
        assert conv._read_write_token == "rw-123"

    def test_thread_title_set(self) -> None:
        conv = self._conv()
        conv._process_data({"thread_title": "My Title"})
        assert conv._title == "My Title"

    def test_no_text_no_blocks_returns_early(self) -> None:
        conv = self._conv()
        conv._process_data({"backend_uuid": "x"})
        assert conv._answer is None
        assert conv._search_results == []

    def test_dict_text_updates_state(self) -> None:
        conv = self._conv()
        data = {
            "thread_title": "T",
            "text": '{"answer": "Hi", "web_results": [{"name":"S", "url":"u", "snippet":"s"}]}',
        }
        conv._process_data(data)

        assert conv._title == "T"
        assert conv._answer == "Hi"
        assert len(conv._search_results) == 1
        assert conv._search_results[0].title == "S"
        assert conv._search_results[0].url == "u"

    def test_list_with_final_step(self) -> None:
        conv = self._conv()
        final_content = {
            "answer": "Final answer",
            "web_results": [{"name": "R", "url": "u", "snippet": "s"}],
        }
        data = {
            "text": json.dumps([{"step_type": "FINAL", "content": final_content}]),
        }
        conv._process_data(data)

        assert conv._answer == "Final answer"
        assert len(conv._search_results) == 1
        assert conv._search_results[0].title == "R"

    def test_list_final_with_json_string_in_answer(self) -> None:
        conv = self._conv()
        # When answer is a JSON string matching JSON_OBJECT_PATTERN, it gets parsed
        inner_escaped = json.dumps({"answer": "Parsed", "thread_title": "TT"})
        data = {
            "text": json.dumps(
                [
                    {"step_type": "FINAL", "content": {"answer": inner_escaped}},
                ]
            ),
        }
        conv._process_data(data)
        assert conv._answer == "Parsed"
        assert conv._title == "TT"

    def test_research_clarifying_questions_raises(self) -> None:
        conv = self._conv()
        data = {
            "text": '[{"step_type": "RESEARCH_CLARIFYING_QUESTIONS", "content": {"questions": ["Q1?", "Q2?"]}}]',
        }

        with pytest.raises(ResearchClarifyingQuestionsError) as exc_info:
            conv._process_data(data)

        assert exc_info.value.questions == ["Q1?", "Q2?"]

    def test_free_tier_rate_limited_raises_rate_limit_error(self) -> None:
        conv = self._conv()
        data = {"error_code": "FREE_TIER_RATE_LIMITED", "status": "failed"}

        with pytest.raises(RateLimitError, match="Free Tier rate limit reached"):
            conv._process_data(data)

    def test_blocks_only_frames_update_state(self) -> None:
        conv = self._conv()
        conv._process_data({"status": "PENDING", "blocks": []})
        assert conv._answer is None
        assert conv._search_results == []

        conv._process_data(
            {
                "thread_title": "Blocks response",
                "status": "COMPLETED",
                "final": True,
                "blocks": [
                    {
                        "intended_usage": "ask_text",
                        "markdown_block": {
                            "progress": "DONE",
                            "answer": "Answer [1]",
                            "chunks": ["Answer [1]"],
                        },
                    },
                    {
                        "intended_usage": "web_results",
                        "web_result_block": {
                            "progress": "DONE",
                            "web_results": [{"name": "Source", "url": "https://example.com", "snippet": "Snippet"}],
                        },
                    },
                ],
            }
        )

        assert conv._title == "Blocks response"
        assert conv._answer == "Answer [1]"
        assert conv._chunks == ["Answer [1]"]
        assert len(conv._search_results) == 1
        assert conv._search_results[0].title == "Source"
        assert conv._search_results[0].url == "https://example.com"

    def test_blocks_only_chunks_reconstruct_answer(self) -> None:
        conv = self._conv()
        conv._process_data(
            {
                "status": "COMPLETED",
                "final": True,
                "blocks": [
                    {
                        "intended_usage": "ask_text",
                        "markdown_block": {
                            "progress": "DONE",
                            "chunks": ["Answer", " text"],
                        },
                    },
                ],
            }
        )

        assert conv.answer == "Answer text"
        assert conv._chunks == ["Answer", " text"]

    def test_blocks_only_chunks_accumulate_across_frames(self) -> None:
        conv = self._conv()
        conv._process_data(
            {
                "blocks": [
                    {
                        "intended_usage": "ask_text",
                        "markdown_block": {"chunks": ["Answer"]},
                    },
                ],
            }
        )
        conv._process_data(
            {
                "final": True,
                "blocks": [
                    {
                        "intended_usage": "ask_text",
                        "markdown_block": {"chunks": [" text"]},
                    },
                ],
            }
        )

        assert conv.answer == "Answer text"
        assert conv._chunks == ["Answer", " text"]

    def test_invalid_json_in_text_raises_response_parsing_error(self) -> None:
        conv = self._conv()
        data = {"text": "{invalid json syntax"}

        with pytest.raises(ResponseParsingError, match="Invalid JSON"):
            conv._process_data(data)

    def test_plain_text_error_in_text_surfaces_actual_message(self) -> None:
        conv = self._conv()
        data = {"text": "Error in processing query."}

        with pytest.raises(ResponseParsingError) as exc_info:
            conv._process_data(data)

        assert "Error in processing query." in str(exc_info.value)

    def test_unexpected_structure_raises(self) -> None:
        conv = self._conv()
        data = {"text": '"just a string"'}

        with pytest.raises(ResponseParsingError, match="Unexpected JSON structure"):
            conv._process_data(data)

    def test_empty_list_no_final_does_not_update(self) -> None:
        conv = self._conv()
        data = {"text": "[{}]"}
        conv._process_data(data)
        assert conv._answer is None


# ============================================================================
# 7. _build_response
# ============================================================================


class TestBuildResponse:
    """Test _build_response builds Response from state."""

    def _conv(self) -> Conversation:
        return Conversation(MockHTTPClient(), ConversationConfig())

    def test_builds_response_from_state(self) -> None:
        conv = self._conv()
        conv._title = "My Title"
        conv._answer = "Answer text"
        conv._chunks = ["chunk1", "chunk2"]
        conv._search_results = [
            SearchResultItem(title="R", snippet="s", url="u"),
        ]
        conv._backend_uuid = "uuid"
        conv._raw_data = {"answer": "Answer text"}

        resp = conv._build_response()

        assert isinstance(resp, Response)
        assert resp.title == "My Title"
        assert resp.answer == "Answer text"
        assert resp.chunks == ["chunk1", "chunk2"]
        assert resp.last_chunk == "chunk2"
        assert len(resp.search_results) == 1
        assert resp.conversation_uuid == "uuid"
        assert resp.raw_data == {"answer": "Answer text"}

    def test_empty_chunks_last_chunk_none(self) -> None:
        conv = self._conv()
        conv._chunks = []
        resp = conv._build_response()
        assert resp.last_chunk is None
