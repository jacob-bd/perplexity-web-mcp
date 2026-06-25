"""Custom exceptions."""

from __future__ import annotations


__all__: list[str] = [
    "AuthenticationError",
    "FileUploadError",
    "FileValidationError",
    "HTTPError",
    "PerplexityError",
    "RateLimitError",
    "ResearchClarifyingQuestionsError",
    "ResponseParsingError",
    "StreamingError",
]


class PerplexityError(Exception):
    """Base exception for all Perplexity-related errors."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(message)


class HTTPError(PerplexityError):
    """Raised when an HTTP request fails."""

    def __init__(
        self,
        message: str,
        status_code: int | None = None,
        url: str | None = None,
        response_body: str | None = None,
    ) -> None:
        self.status_code = status_code
        self.url = url
        self.response_body = response_body[:500] if response_body and len(response_body) > 500 else response_body
        super().__init__(message)

    def __repr__(self) -> str:
        return f"HTTPError(status={self.status_code}, url={self.url!r}, message={self.message!r})"


class AuthenticationError(HTTPError):
    """Raised when Perplexity returns HTTP 403."""

    def __init__(
        self,
        message: str | None = None,
        url: str | None = None,
        response_body: str | None = None,
    ) -> None:
        super().__init__(
            message or "Access forbidden (403). Session token may be invalid, expired, or blocked by network policy.",
            status_code=403,
            url=url,
            response_body=response_body,
        )


class RateLimitError(HTTPError):
    """Raised when rate limit is exceeded (HTTP 429)."""

    def __init__(
        self,
        message: str | None = None,
        url: str | None = None,
        response_body: str | None = None,
    ) -> None:
        super().__init__(
            message or "Rate limit exceeded (429). Please wait before retrying.",
            status_code=429,
            url=url,
            response_body=response_body,
        )


class FileUploadError(PerplexityError):
    """Raised when file upload fails."""

    def __init__(self, file_path: str, reason: str) -> None:
        self.file_path = file_path
        super().__init__(f"Upload failed for '{file_path}': {reason}")


class FileValidationError(PerplexityError):
    """Raised when file validation fails."""

    def __init__(self, file_path: str, reason: str) -> None:
        self.file_path = file_path
        super().__init__(f"File validation failed for '{file_path}': {reason}")


class ResearchClarifyingQuestionsError(PerplexityError):
    """Raised when Research mode requires clarifying questions."""

    def __init__(self, questions: list[str]) -> None:
        self.questions = questions
        questions_text = "\n".join(f"  - {q}" for q in questions) if questions else "  (none)"
        super().__init__(
            f"Research mode requires clarification:\n{questions_text}\nPlease rephrase your query to be more specific."
        )


class ResponseParsingError(PerplexityError):
    """Raised when the API response cannot be parsed."""

    def __init__(self, message: str, raw_data: str | None = None) -> None:
        self.raw_data = raw_data
        super().__init__(f"Failed to parse API response: {message}")


class StreamingError(PerplexityError):
    """Raised when an error occurs during streaming."""

    def __init__(self, message: str) -> None:
        super().__init__(f"Streaming error: {message}")
