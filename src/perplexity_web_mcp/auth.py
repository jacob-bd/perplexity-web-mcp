"""Perplexity email and TOTP authentication protocol helpers."""

from __future__ import annotations

from typing import Any
from urllib.parse import parse_qs, urlparse

from curl_cffi.requests import Session

from .constants import API_BASE_URL, API_VERSION, APP_HEADERS, SESSION_COOKIE_NAME
from .http import get_system_ca_bundle_path
from .limits import REST_API_TIMEOUT


AUTH_CSRF_ENDPOINT = "/api/auth/csrf"
AUTH_OTP_REDIRECT_ENDPOINT = "/api/auth/otp-redirect-link"
AUTH_SIGNIN_ENDPOINT = "/api/auth/signin/email"
AUTH_TOTP_VERIFY_ENDPOINT = "/api/auth/totp-challenge/verify"
_REDIRECT_STATUSES = {301, 302, 303, 307, 308}


def create_auth_session() -> tuple[Session, str]:
    """Create a browser-like session and return it with a CSRF token."""
    verify_bundle = get_system_ca_bundle_path()
    session_kwargs: dict[str, Any] = {
        "impersonate": "chrome",
        "headers": {**APP_HEADERS, "Referer": API_BASE_URL, "Origin": API_BASE_URL},
        "timeout": REST_API_TIMEOUT,
    }
    if verify_bundle:
        session_kwargs["verify"] = verify_bundle
    session = Session(**session_kwargs)
    session.get(API_BASE_URL)
    response = session.get(f"{API_BASE_URL}{AUTH_CSRF_ENDPOINT}")

    if response.status_code != 200:
        raise ValueError(f"Failed to obtain CSRF token: HTTP {response.status_code}.")

    csrf = _response_json(response).get("csrfToken")
    if not csrf:
        raise ValueError("Failed to obtain CSRF token.")

    return session, str(csrf)


def request_verification_code(session: Session, csrf: str, email: str) -> None:
    """Send an email verification code using an initialized auth session."""
    response = session.post(
        f"{API_BASE_URL}{AUTH_SIGNIN_ENDPOINT}?version={API_VERSION}&source=default",
        json={
            "email": email,
            "csrfToken": csrf,
            "useNumericOtp": "true",
            "json": "true",
            "callbackUrl": f"{API_BASE_URL}/?login-source=floatingSignup",
        },
    )

    if response.status_code != 200:
        raise ValueError(f"Authentication request failed: {response.text}")


def resolve_redirect_url(session: Session, email: str, code_or_link: str) -> str:
    """Resolve an email OTP or magic link to the authentication callback URL."""
    if code_or_link.startswith("http"):
        return code_or_link

    response = session.post(
        f"{API_BASE_URL}{AUTH_OTP_REDIRECT_ENDPOINT}",
        json={
            "email": email,
            "otp": code_or_link,
            "redirectUrl": f"{API_BASE_URL}/?login-source=floatingSignup",
            "emailLoginMethod": "web-otp",
        },
    )

    if response.status_code != 200:
        raise ValueError("Invalid verification code.")

    redirect_path = _response_json(response).get("redirect")
    if not redirect_path:
        raise ValueError("No redirect URL received.")

    redirect = str(redirect_path)
    return f"{API_BASE_URL}{redirect}" if redirect.startswith("/") else redirect


def follow_auth_callback(session: Session, redirect_url: str) -> str | None:
    """Follow an auth callback, returning a challenge token when TOTP is required."""
    response = session.get(redirect_url, allow_redirects=False)
    if response.status_code not in _REDIRECT_STATUSES:
        return None

    location = response.headers.get("Location", "")
    if not location:
        raise ValueError("Authentication callback did not provide a redirect location.")
    if "error=" in location:
        raise ValueError("Verification failed. The code may be invalid or expired.")

    if "/auth/totp-challenge" in location:
        absolute_location = location if location.startswith("http") else f"{API_BASE_URL}{location}"
        challenge_token = parse_qs(urlparse(absolute_location).query).get("token", [""])[0]
        if not challenge_token:
            raise ValueError("TOTP challenge token not found in redirect.")
        return challenge_token

    session.get(location if location.startswith("http") else f"{API_BASE_URL}{location}")
    return None


def verify_totp(session: Session, challenge_token: str, totp_code: str) -> None:
    """Complete a TOTP challenge and follow its post-verification redirect."""
    if not totp_code.isdigit() or len(totp_code) != 6:
        raise ValueError("TOTP code must be a 6-digit number.")

    response = session.post(
        f"{API_BASE_URL}{AUTH_TOTP_VERIFY_ENDPOINT}?version={API_VERSION}&source=default",
        json={"token": challenge_token, "code": totp_code},
        allow_redirects=False,
    )
    data = _response_json(response)

    if response.status_code >= 400 or data.get("error"):
        detail = data.get("error") or f"HTTP {response.status_code}"
        raise ValueError(f"TOTP verification failed: {detail}")

    location = response.headers.get("Location", "") if response.status_code in _REDIRECT_STATUSES else ""
    redirect = location or str(data.get("redirect", ""))
    if redirect:
        session.get(redirect if redirect.startswith("http") else f"{API_BASE_URL}{redirect}")


def extract_session_token(session: Session) -> str:
    """Return the session token, including a token split across cookie chunks."""
    token = session.cookies.get(SESSION_COOKIE_NAME)
    if token:
        return token

    chunks = sorted(
        [
            (name, value)
            for name, value in session.cookies.items()
            if name.startswith(f"{SESSION_COOKIE_NAME}.") and name.removeprefix(f"{SESSION_COOKIE_NAME}.").isdigit()
        ],
        key=lambda item: int(item[0].removeprefix(f"{SESSION_COOKIE_NAME}.")),
    )
    if chunks:
        return "".join(value for _, value in chunks)

    raise ValueError("Authentication completed, but the session token cookie was not returned.")


def _response_json(response: Any) -> dict[str, Any]:
    """Return a JSON object from a response, or an empty object for non-JSON bodies."""
    try:
        data = response.json()
    except Exception:
        return {}
    return data if isinstance(data, dict) else {}
