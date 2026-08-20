"""Core client implementation."""

from __future__ import annotations

from mimetypes import guess_type
from os import PathLike
from pathlib import Path
from typing import TYPE_CHECKING, Any
from uuid import uuid4

from curl_cffi import CurlMime
from curl_cffi.requests import Session
from orjson import JSONDecodeError, loads


if TYPE_CHECKING:
    from collections.abc import Generator
    from re import Match

from .config import ClientConfig, ConversationConfig
from .constants import (
    API_VERSION,
    CITATION_PATTERN,
    ENDPOINT_LIST_THREADS,
    ENDPOINT_THREAD_DETAIL,
    ENDPOINT_UPLOAD,
    JSON_OBJECT_PATTERN,
    PROMPT_SOURCE,
    SEND_BACK_TEXT,
    USE_SCHEMATIZED_API,
)
from .enums import CitationMode, SourceFocus
from .exceptions import (
    FileUploadError,
    FileValidationError,
    RateLimitError,
    ResearchClarifyingQuestionsError,
    ResponseParsingError,
)
from .http import HTTPClient, get_system_ca_bundle_path
from .limits import MAX_FILE_SIZE, MAX_FILES
from .logging import configure_logging, get_logger
from .models import Model, Models
from .trace import log_trace
from .types import Response, SearchResultItem, ThreadDetail, ThreadListEntry, ThreadTurn, _FileInfo


logger = get_logger(__name__)


def _blocks_to_answer_data(blocks: Any) -> dict[str, Any]:
    answer_data: dict[str, Any] = {}

    for block in blocks or []:
        if not isinstance(block, dict):
            continue

        usage = block.get("intended_usage")
        if usage == "ask_text":
            markdown = block.get("markdown_block")
            if not isinstance(markdown, dict):
                continue

            answer = markdown.get("answer")
            if answer is not None:
                answer_data["answer"] = str(answer)

            chunks = markdown.get("chunks")
            if isinstance(chunks, list) and chunks:
                answer_data["chunks"] = chunks

        elif usage == "web_results":
            web_result = block.get("web_result_block")
            if not isinstance(web_result, dict):
                continue

            results = web_result.get("web_results")
            if isinstance(results, list) and results:
                answer_data["web_results"] = results

    return answer_data


class Perplexity:
    """Web scraper for Perplexity AI conversations."""

    __slots__ = ("_http",)

    def __init__(self, session_token: str, config: ClientConfig | None = None) -> None:
        """Initialize with session token."""

        if not session_token or not session_token.strip():
            raise ValueError("session_token cannot be empty")

        cfg = config or ClientConfig()
        configure_logging(level=cfg.logging_level, log_file=cfg.log_file)

        self._http = HTTPClient(
            session_token,
            timeout=cfg.timeout,
            impersonate=cfg.impersonate,
            max_retries=cfg.max_retries,
            retry_base_delay=cfg.retry_base_delay,
            retry_max_delay=cfg.retry_max_delay,
            retry_jitter=cfg.retry_jitter,
            requests_per_second=cfg.requests_per_second,
            rotate_fingerprint=cfg.rotate_fingerprint,
        )

        logger.info("Perplexity client initialized")

    def create_conversation(self, config: ConversationConfig | None = None) -> Conversation:
        """Create a new conversation."""

        return Conversation(self._http, config or ConversationConfig())

    def list_threads(
        self,
        limit: int = 20,
        offset: int = 0,
        search_term: str = "",
    ) -> list[ThreadListEntry]:
        """List the authenticated user's Perplexity thread history.

        Calls the internal ``/rest/thread/list_ask_threads`` endpoint.
        This is a read-only operation — no query quota is consumed.

        Args:
            limit: Maximum number of threads to return (default 20, max 100).
            offset: Number of threads to skip, for pagination.
            search_term: Optional keyword filter applied server-side.

        Returns:
            List of ThreadListEntry domain models.
        """
        payload = {
            "limit": min(limit, 100),
            "offset": offset,
            "search_term": search_term or "",
        }
        params = {"version": API_VERSION, "source": "default"}
        response = self._http.post(
            f"{ENDPOINT_LIST_THREADS}?version={API_VERSION}&source=default",
            json=payload,
        )
        data = loads(response.content)
        # The endpoint returns a list directly, or a dict with a threads key
        if isinstance(data, list):
            items = data
        else:
            items = data.get("threads") or data.get("data") or []

        result = []
        for t in items:
            if not isinstance(t, dict):
                continue
            slug = t.get("slug") or t.get("uuid") or "unknown"
            title = t.get("title") or t.get("query_str") or "(untitled)"
            model = t.get("display_model") or t.get("model") or ""
            count = t.get("query_count", 1)
            ts = str(t.get("last_query_datetime") or t.get("created_at") or "")
            preview = str(t.get("answer_preview") or t.get("first_answer") or "")
            result.append(
                ThreadListEntry(
                    slug=slug,
                    title=title,
                    query_str=str(t.get("query_str", "")),
                    answer_preview=preview,
                    display_model=model,
                    query_count=count,
                    last_query_datetime=ts,
                )
            )
        return result

    def get_thread(self, slug: str) -> ThreadDetail:
        """Fetch the full conversation history for a specific Perplexity thread.

        Calls the internal ``/rest/thread/{slug}`` endpoint.
        This is a read-only operation — no query quota is consumed.

        Args:
            slug: The thread UUID / slug.  Obtain from :meth:`list_threads`
                or from the ``[Conversation ID: ...]`` footer of any query response.

        Returns:
            ThreadDetail domain model representing the conversation history.
        """
        endpoint = f"{ENDPOINT_THREAD_DETAIL}/{slug}?version={API_VERSION}&source=default&limit=100&from_first=true"
        response = self._http.get(endpoint)
        thread_data = loads(response.content)

        entries = thread_data.get("entries") or []
        meta = thread_data.get("thread_metadata") or {}

        title = meta.get("title") or (entries[0].get("thread_title") if entries else None) or "Perplexity Thread"
        real_slug = meta.get("uuid") or meta.get("slug") or slug
        created = str(meta.get("created_at") or "")

        turns = []
        for entry in entries:
            question = str(entry.get("query_str") or "")
            model = str(entry.get("display_model") or "")
            ts = str(entry.get("created_at") or "")

            # Extract answer text
            answer_text = ""
            blocks = entry.get("blocks") or []
            if blocks:
                parts = []
                for block in blocks:
                    if isinstance(block, dict):
                        chunk = block.get("content") or block.get("text") or block.get("answer") or ""
                        if chunk:
                            parts.append(str(chunk))
                answer_text = "\n".join(parts)
            if not answer_text:
                answer_text = str(entry.get("answer") or entry.get("text") or "")

            # Extract sources
            sources = []
            for widget in entry.get("widget_data") or []:
                if isinstance(widget, dict):
                    url = str(widget.get("url") or widget.get("link") or "")
                    src_title = str(widget.get("title") or widget.get("name") or url)
                    if url:
                        sources.append(SearchResultItem(url=url, title=src_title))

            # Extract related queries
            related = []
            for rq in entry.get("related_queries") or []:
                if isinstance(rq, str):
                    related.append(rq)
                elif isinstance(rq, dict):
                    rq_text = rq.get("query") or rq.get("text") or str(rq)
                    related.append(str(rq_text))

            turns.append(
                ThreadTurn(
                    query_str=question,
                    display_model=model,
                    created_at=ts,
                    answer=answer_text.strip(),
                    sources=sources,
                    related_queries=related,
                )
            )

        return ThreadDetail(slug=real_slug, title=title, created_at=created, turns=turns)

    def close(self) -> None:
        """Close the client."""

        self._http.close()

    def __enter__(self) -> Perplexity:
        return self

    def __exit__(self, *args: Any) -> None:
        self.close()


class Conversation:
    """Manage a Perplexity conversation with query and follow-up support."""

    __slots__ = (
        "_active_model",
        "_answer",
        "_backend_uuid",
        "_chunks",
        "_citation_mode",
        "_config",
        "_http",
        "_raw_data",
        "_read_write_token",
        "_search_results",
        "_stream_generator",
        "_title",
    )

    def __init__(self, http: HTTPClient, config: ConversationConfig) -> None:
        self._http = http
        self._config = config
        self._active_model: Model | None = None
        self._citation_mode = CitationMode.DEFAULT
        self._backend_uuid: str | None = None
        self._read_write_token: str | None = None
        self._title: str | None = None
        self._answer: str | None = None
        self._chunks: list[str] = []
        self._search_results: list[SearchResultItem] = []
        self._raw_data: dict[str, Any] = {}
        self._stream_generator: Generator[Response, None, None] | None = None

    @property
    def answer(self) -> str | None:
        """Last response text."""

        return self._answer

    @property
    def title(self) -> str | None:
        """Conversation title."""

        return self._title

    @property
    def search_results(self) -> list[SearchResultItem]:
        """Search results from last response."""

        return self._search_results

    @property
    def uuid(self) -> str | None:
        """Conversation UUID."""

        return self._backend_uuid

    @property
    def read_write_token(self) -> str | None:
        """Token required for updating the conversation."""

        return self._read_write_token

    def __iter__(self) -> Generator[Response, None, None]:
        if self._stream_generator is not None:
            yield from self._stream_generator
            self._stream_generator = None

    def restore_session(self, backend_uuid: str, read_write_token: str | None = None) -> None:
        """Inject prior session state to enable follow-up queries.

        Args:
            backend_uuid: The conversation UUID from Perplexity
            read_write_token: The token required for updating the conversation
        """
        self._backend_uuid = backend_uuid
        self._read_write_token = read_write_token

    def ask(
        self,
        query: str,
        model: Model | None = None,
        files: list[str | PathLike] | None = None,
        citation_mode: CitationMode | None = None,
        stream: bool = False,
        init_query: str | None = None,
    ) -> Conversation:
        """Ask a question. Returns self for method chaining or streaming iteration.

        Args:
            query: The full query to send to the model
            model: Optional model override
            files: Optional files to attach
            citation_mode: Optional citation mode override
            stream: Whether to stream the response
            init_query: Optional shorter query for URL initialization.
                       Useful when query contains large prompt injections.
        """

        effective_model = model or self._config.model or Models.BEST
        effective_citation = citation_mode if citation_mode is not None else self._config.citation_mode
        self._citation_mode = effective_citation

        self._execute(query, effective_model, files, stream=stream, init_query=init_query)
        return self

    def _execute(
        self,
        query: str,
        model: Model,
        files: list[str | PathLike] | None,
        stream: bool = False,
        init_query: str | None = None,
    ) -> None:
        """Execute a query.

        Args:
            query: The full query to send to the model (via POST body)
            model: The model to use
            files: Optional files to attach
            stream: Whether to stream the response
            init_query: Optional shorter query for init_search URL param.
                       If not provided, uses first 500 chars of query.
                       This avoids URL length limits with large queries.
        """

        self._reset_response_state()
        self._active_model = model

        file_urls: list[str] = []
        if files:
            validated = self._validate_files(files)
            file_urls = [self._upload_file(f) for f in validated]

        payload = self._build_payload(query, model, file_urls)
        # Use truncated query for init_search to avoid URL length limits
        search_query = init_query if init_query is not None else query[:500]
        log_trace(f"[STAGE 3 - PERPLEXITY INIT SEARCH] search_query={search_query!r}")
        self._http.init_search(search_query)

        log_trace(
            f"[STAGE 3 - PERPLEXITY SSE POST] model={model.identifier} mode={model.mode} query_str_len={len(query)}"
        )
        if stream:
            self._stream_generator = self._stream(payload)
        else:
            self._complete(payload)

    def _reset_response_state(self) -> None:
        self._title = None
        self._answer = None
        self._chunks = []
        self._search_results = []
        self._raw_data = {}
        self._stream_generator = None

    def _validate_files(self, files: list[str | PathLike] | None) -> list[_FileInfo]:
        if not files:
            return []

        seen: set[str] = set()
        file_list: list[Path] = []

        for item in files:
            if item and isinstance(item, (str, PathLike)):
                path = Path(item).resolve()
                if path.as_posix() not in seen:
                    seen.add(path.as_posix())
                    file_list.append(path)

        if len(file_list) > MAX_FILES:
            raise FileValidationError(
                str(file_list[0]),
                f"Too many files: {len(file_list)}. Maximum allowed is {MAX_FILES}.",
            )

        result: list[_FileInfo] = []

        for path in file_list:
            file_path = path.as_posix()

            try:
                if not path.exists():
                    raise FileValidationError(file_path, "File not found")
                if not path.is_file():
                    raise FileValidationError(file_path, "Path is not a file")

                file_size = path.stat().st_size

                if file_size > MAX_FILE_SIZE:
                    raise FileValidationError(
                        file_path,
                        f"File exceeds 50MB limit: {file_size / (1024 * 1024):.1f}MB",
                    )
                if file_size == 0:
                    raise FileValidationError(file_path, "File is empty")

                mimetype, _ = guess_type(file_path)
                mimetype = mimetype or "application/octet-stream"

                result.append(
                    _FileInfo(
                        path=file_path,
                        size=file_size,
                        mimetype=mimetype,
                        is_image=mimetype.startswith("image/"),
                    )
                )
            except FileValidationError as error:
                raise error
            except (FileNotFoundError, PermissionError) as error:
                raise FileValidationError(file_path, f"Cannot access file: {error}") from error
            except OSError as error:
                raise FileValidationError(file_path, f"File system error: {error}") from error

        return result

    def _upload_file(self, file_info: _FileInfo) -> str:
        file_uuid = str(uuid4())

        json_data = {
            "files": {
                file_uuid: {
                    "filename": file_info.path,
                    "content_type": file_info.mimetype,
                    "source": "default",
                    "file_size": file_info.size,
                    "force_image": file_info.is_image,
                }
            }
        }

        try:
            response = self._http.post(ENDPOINT_UPLOAD, json=json_data)
            response_data = response.json()
            result = response_data.get("results", {}).get(file_uuid, {})

            s3_bucket_url = result.get("s3_bucket_url")
            s3_object_url = result.get("s3_object_url")
            fields = result.get("fields", {})

            if not s3_object_url:
                raise FileUploadError(file_info.path, "No upload URL returned")
            if not s3_bucket_url or not fields:
                raise FileUploadError(file_info.path, "Missing S3 upload credentials")

            file_path = Path(file_info.path)
            with file_path.open("rb") as f:
                file_content = f.read()

            mime = CurlMime()
            try:
                for field_name, field_value in fields.items():
                    mime.addpart(name=field_name, data=field_value)

                mime.addpart(
                    name="file",
                    content_type=file_info.mimetype,
                    filename=file_path.name,
                    data=file_content,
                )

                with Session() as s3_session:
                    upload_response = s3_session.post(s3_bucket_url, multipart=mime)
            finally:
                mime.close()

            if upload_response.status_code not in (200, 201, 204):
                raise FileUploadError(
                    file_info.path,
                    f"S3 upload failed with status {upload_response.status_code}: {upload_response.text}",
                )

            return s3_object_url
        except FileUploadError as error:
            raise error
        except Exception as error:
            raise FileUploadError(file_info.path, str(error)) from error

    def _build_payload(
        self,
        query: str,
        model: Model,
        file_urls: list[str],
    ) -> dict[str, Any]:
        cfg = self._config

        raw_source_focus = cfg.source_focus if isinstance(cfg.source_focus, list) else [cfg.source_focus]
        sources = [source.value if isinstance(source, SourceFocus) else source for source in raw_source_focus]

        client_coordinates = None
        if cfg.coordinates is not None:
            client_coordinates = {
                "location_lat": cfg.coordinates.latitude,
                "location_lng": cfg.coordinates.longitude,
                "name": "",
            }

        params: dict[str, Any] = {
            "attachments": file_urls,
            "language": cfg.language,
            "timezone": cfg.timezone,
            "client_coordinates": client_coordinates,
            "sources": sources,
            "model_preference": model.identifier,
            "mode": model.mode,
            "search_focus": cfg.search_focus.value,
            "search_recency_filter": cfg.time_range.value or None,
            "is_incognito": not cfg.save_to_library,
            "use_schematized_api": USE_SCHEMATIZED_API,
            "local_search_enabled": cfg.coordinates is not None,
            "prompt_source": PROMPT_SOURCE,
            "send_back_text_in_streaming_api": SEND_BACK_TEXT,
            "version": API_VERSION,
        }

        if self._backend_uuid is not None:
            params["last_backend_uuid"] = self._backend_uuid
            params["query_source"] = "followup"
            if self._read_write_token:
                params["read_write_token"] = self._read_write_token

        return {"params": params, "query_str": query}

    def _format_citations(self, text: str | None) -> str | None:
        if not text or self._citation_mode == CitationMode.DEFAULT:
            return text

        def replacer(m: Match[str]) -> str:
            num = m.group(1)
            if not num.isdigit():
                return m.group(0)

            if self._citation_mode == CitationMode.CLEAN:
                return ""

            idx = int(num) - 1
            if 0 <= idx < len(self._search_results):
                url = self._search_results[idx].url or ""
                if self._citation_mode == CitationMode.MARKDOWN and url:
                    return f"[{num}]({url})"

            return m.group(0)

        return CITATION_PATTERN.sub(replacer, text)

    def _parse_line(self, line: str | bytes) -> dict[str, Any] | None:
        raw_str = line.decode("utf-8", errors="replace") if isinstance(line, bytes) else str(line)
        log_trace(f"[STAGE 3 - RAW SSE LINE] {raw_str.strip()[:400]}")

        try:
            if isinstance(line, bytes) and line.startswith(b"data: "):
                return loads(line[6:])
            if isinstance(line, str) and line.startswith("data: "):
                return loads(line[6:])
        except (JSONDecodeError, UnicodeDecodeError) as error:
            logger.debug(f"Skipping malformed SSE line: {error}")
            log_trace(f"[STAGE 3 - SSE LINE DECODE ERROR] {error}")
            return None

        return None

    def _process_data(self, data: dict[str, Any]) -> None:
        """Process SSE data chunk and update conversation state."""
        if data.get("error_code") == "FREE_TIER_RATE_LIMITED":
            raise RateLimitError(
                "Perplexity Free Tier rate limit reached. Please wait for your daily quota to reset or upgrade to Pro."
            )

        if "backend_uuid" in data:
            self._backend_uuid = data["backend_uuid"]

        if "read_write_token" in data:
            self._read_write_token = data["read_write_token"]

        if data.get("thread_title"):
            self._title = data["thread_title"]

        if "text" not in data:
            answer_data = _blocks_to_answer_data(data.get("blocks"))
            if answer_data:
                self._update_state(data.get("thread_title"), answer_data)
            return None

        try:
            json_data = loads(data["text"])
        except KeyError as error:
            raise ResponseParsingError("Missing 'text' field in data", raw_data=str(data)) from error
        except JSONDecodeError as error:
            raw_text = data.get("text", "")
            logger.warning(f"Non-JSON text in SSE data: {raw_text[:200]}")
            stripped = raw_text.lstrip()
            if stripped and not stripped.startswith(("{", "[")):
                raise ResponseParsingError(raw_text) from error
            raise ResponseParsingError("Invalid JSON in 'text' field", raw_data=str(raw_text)[:500]) from error

        answer_data: dict[str, Any] = {}

        if isinstance(json_data, list):
            for item in json_data:
                step_type = item.get("step_type")

                if step_type == "RESEARCH_CLARIFYING_QUESTIONS":
                    questions = self._extract_clarifying_questions(item)
                    raise ResearchClarifyingQuestionsError(questions)

                if step_type == "FINAL":
                    raw_content = item.get("content", {})
                    answer_content = raw_content.get("answer")

                    if isinstance(answer_content, str) and JSON_OBJECT_PATTERN.match(answer_content):
                        answer_data = loads(answer_content)
                    else:
                        answer_data = raw_content

                    title = data.get("thread_title") or answer_data.get("thread_title")
                    self._update_state(title, answer_data)
                    break

        elif isinstance(json_data, dict):
            title = data.get("thread_title") or json_data.get("thread_title")
            self._update_state(title, json_data)

        else:
            raise ResponseParsingError(
                "Unexpected JSON structure in 'text' field",
                raw_data=str(json_data),
            )

    def _extract_clarifying_questions(self, item: dict[str, Any]) -> list[str]:
        """Extract clarifying questions from a RESEARCH_CLARIFYING_QUESTIONS step."""

        questions: list[str] = []
        content = item.get("content", {})

        if isinstance(content, dict):
            if "questions" in content:
                raw_questions = content["questions"]
                if isinstance(raw_questions, list):
                    questions = [str(q) for q in raw_questions if q]
            elif "clarifying_questions" in content:
                raw_questions = content["clarifying_questions"]
                if isinstance(raw_questions, list):
                    questions = [str(q) for q in raw_questions if q]
            elif not questions:
                for value in content.values():
                    if isinstance(value, str) and "?" in value:
                        questions.append(value)

        elif isinstance(content, list):
            questions = [str(q) for q in content if q]

        elif isinstance(content, str):
            questions = [content]

        return questions

    def _update_state(self, title: str | None, answer_data: dict[str, Any]) -> None:
        if title is not None:
            self._title = title

        web_results = answer_data.get("web_results", [])
        if web_results:
            self._search_results = [
                SearchResultItem(
                    title=r.get("name"),
                    snippet=r.get("snippet"),
                    url=r.get("url"),
                )
                for r in web_results
                if isinstance(r, dict)
            ]

        answer_text = answer_data.get("answer")
        if answer_text is not None:
            self._answer = self._format_citations(answer_text)

        chunks = answer_data.get("chunks", [])
        if chunks:
            formatted = [self._format_citations(chunk) for chunk in chunks if chunk is not None]
            self._chunks.extend(c for c in formatted if c is not None)
            if answer_text is None:
                self._answer = "".join(self._chunks)

        self._raw_data = answer_data

    def _build_response(self) -> Response:
        return Response(
            title=self._title,
            answer=self._answer,
            chunks=list(self._chunks),
            last_chunk=self._chunks[-1] if self._chunks else None,
            search_results=list(self._search_results),
            conversation_uuid=self._backend_uuid,
            raw_data=self._raw_data,
        )

    def _fetch_research_report(self) -> str | None:
        """Return the full Deep Research report markdown, or ``None``.

        Deep Research delivers the report as a separate, pre-signed CloudFront
        ``.md`` file referenced by a ``download_info`` field — the streamed
        answer is only the one-paragraph intro, so ``self._answer`` alone drops
        the report. Re-fetch the thread by uuid, pull the download link, and
        fetch the markdown. Notes: the bare S3 ``url`` in the ``RESEARCH_ANSWER``
        step 403s (``download_info[].url`` is the working CloudFront link), and
        the thread response nests the research steps as a JSON string under
        ``entries[].text``, so we descend into embedded JSON.
        """
        if self._active_model is not Models.DEEP_RESEARCH or not self._backend_uuid:
            return None

        def _download_url(node: Any) -> str | None:
            stack, found = [node], []
            while stack:
                item = stack.pop()
                if isinstance(item, dict):
                    info = item.get("download_info")
                    if isinstance(info, list):
                        found.extend(entry["url"] for entry in info if isinstance(entry, dict) and entry.get("url"))
                    stack.extend(item.values())
                elif isinstance(item, list):
                    stack.extend(item)
                elif isinstance(item, str) and "download_info" in item and item.lstrip()[:1] in "[{":
                    try:
                        stack.append(loads(item))
                    except JSONDecodeError:
                        pass
            return found[-1] if found else None

        endpoint = (
            f"{ENDPOINT_THREAD_DETAIL}/{self._backend_uuid}"
            f"?version={API_VERSION}&source=default&limit=100&from_first=true"
        )
        try:
            raw = self._http.get(endpoint).json()
        except Exception as exc:  # noqa: BLE001 - degrade to intro on any failure
            logger.warning("Deep Research report: thread re-fetch failed: %s", exc)
            return None

        url = _download_url(raw)
        if not url:
            logger.warning("Deep Research report: no download_info for thread %s", self._backend_uuid)
            return None

        try:
            session_kwargs: dict[str, Any] = {"impersonate": "chrome"}
            verify_bundle = get_system_ca_bundle_path()
            if verify_bundle:
                session_kwargs["verify"] = verify_bundle

            with Session(**session_kwargs) as session:
                response = session.get(url, timeout=60)
            if response.status_code == 200 and response.text.strip():
                return response.text
            logger.warning("Deep Research report: download returned HTTP %s", response.status_code)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Deep Research report: download failed: %s", exc)
        return None

    def _append_research_report(self) -> bool:
        """Append the full Deep Research report to the answer. Returns True if
        anything was appended. Appended (not replaced) so streaming consumers
        that emit suffix deltas stay monotonic."""
        report = self._fetch_research_report()
        if not report:
            return False
        intro = self._answer or ""
        self._answer = f"{intro}\n\n---\n\n{report}" if intro.strip() else report
        return True

    def _complete(self, payload: dict[str, Any]) -> None:
        gen = self._http.stream_ask(payload)
        try:
            for line in gen:
                data = self._parse_line(line)
                if data:
                    self._process_data(data)
                    if data.get("final"):
                        break
        finally:
            gen.close()

        self._append_research_report()

    def _stream(self, payload: dict[str, Any]) -> Generator[Response, None, None]:
        gen = self._http.stream_ask(payload)
        try:
            for line in gen:
                data = self._parse_line(line)
                if data:
                    self._process_data(data)
                    yield self._build_response()
                    if data.get("final"):
                        break
        finally:
            gen.close()

        if self._append_research_report():
            yield self._build_response()
