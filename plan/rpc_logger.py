#!/usr/bin/env python3
"""
RPC Logger for Model Council API Capture

This script helps capture and document the actual API calls Perplexity makes
when using Model Council. Use this once Pro tier access is available.

Usage:
------
1. Open Perplexity in Chrome with DevTools Network tab open
2. Execute a Model Council query
3. Find the relevant request(s) in Network tab
4. Right-click -> Copy -> Copy as cURL (bash)
5. Run this script and paste the cURL command

Or, export HAR file:
1. Right-click Network tab -> Save all as HAR with content
2. Run: python rpc_logger.py --har path/to/file.har

Output:
-------
Saves structured JSON to plan/rpc_captures/
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent / "rpc_captures"


def parse_curl(curl_command: str) -> dict:
    """Parse a cURL command into structured data.

    Args:
        curl_command: The cURL command string (from Chrome DevTools)

    Returns:
        Dictionary with url, method, headers, body
    """
    result = {
        "url": "",
        "method": "GET",
        "headers": {},
        "body": None,
        "captured_at": datetime.now().isoformat(),
    }

    # Extract URL
    url_match = re.search(r"curl\s+'([^']+)'", curl_command)
    if url_match:
        result["url"] = url_match.group(1)

    # Check for method
    if "-X POST" in curl_command or "--data" in curl_command:
        result["method"] = "POST"

    # Extract headers
    header_pattern = re.compile(r"-H\s+'([^:]+):\s*([^']*)'")
    for match in header_pattern.finditer(curl_command):
        header_name = match.group(1)
        header_value = match.group(2)
        result["headers"][header_name] = header_value

    # Extract body
    body_match = re.search(r"--data-raw\s+'([^']*)'", curl_command)
    if body_match:
        body_str = body_match.group(1)
        try:
            result["body"] = json.loads(body_str)
        except json.JSONDecodeError:
            result["body"] = body_str

    return result


def parse_har(har_path: str, filter_pattern: str | None = None) -> list[dict]:
    """Parse a HAR file and extract relevant requests.

    Args:
        har_path: Path to HAR file
        filter_pattern: Optional regex to filter URLs

    Returns:
        List of request dictionaries
    """
    with open(har_path) as f:
        har_data = json.load(f)

    requests = []
    entries = har_data.get("log", {}).get("entries", [])

    for entry in entries:
        request = entry.get("request", {})
        url = request.get("url", "")

        # Filter if pattern provided
        if filter_pattern and not re.search(filter_pattern, url):
            continue

        # Skip non-Perplexity requests
        if "perplexity.ai" not in url:
            continue

        # Parse headers
        headers = {}
        for h in request.get("headers", []):
            headers[h["name"]] = h["value"]

        # Parse body
        body = None
        post_data = request.get("postData", {})
        if post_data:
            body_text = post_data.get("text", "")
            try:
                body = json.loads(body_text)
            except json.JSONDecodeError:
                body = body_text

        # Parse response
        response = entry.get("response", {})
        response_data = None
        content = response.get("content", {})
        if content:
            resp_text = content.get("text", "")
            try:
                response_data = json.loads(resp_text)
            except json.JSONDecodeError:
                response_data = resp_text

        requests.append({
            "url": url,
            "method": request.get("method", "GET"),
            "headers": headers,
            "body": body,
            "response": {
                "status": response.get("status"),
                "headers": {h["name"]: h["value"] for h in response.get("headers", [])},
                "body": response_data,
            },
            "timing": entry.get("time"),
            "captured_at": entry.get("startedDateTime"),
        })

    return requests


def save_capture(name: str, data: dict | list) -> Path:
    """Save captured RPC data to file.

    Args:
        name: Name for the capture (will be sanitized)
        data: Data to save

    Returns:
        Path to saved file
    """
    OUTPUT_DIR.mkdir(exist_ok=True)

    # Sanitize filename
    safe_name = re.sub(r"[^a-zA-Z0-9_-]", "_", name)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{safe_name}_{timestamp}.json"

    output_path = OUTPUT_DIR / filename
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2, default=str)

    return output_path


def analyze_council_request(data: dict) -> dict:
    """Analyze a captured request to identify council-specific patterns.

    Args:
        data: Parsed request data

    Returns:
        Analysis results
    """
    analysis = {
        "is_council": False,
        "models_detected": [],
        "endpoint_type": "unknown",
        "notable_fields": [],
    }

    url = data.get("url", "")
    body = data.get("body", {})

    # Check URL patterns
    if "council" in url.lower():
        analysis["is_council"] = True
        analysis["endpoint_type"] = "dedicated_council_endpoint"

    # Check body for council indicators
    if isinstance(body, dict):
        params = body.get("params", {})

        # Look for model-related fields
        for key in ["models", "council_models", "model_preference", "model_list"]:
            if key in params:
                analysis["notable_fields"].append(f"params.{key}")
                value = params[key]
                if isinstance(value, list):
                    analysis["models_detected"] = value
                elif isinstance(value, str) and "council" in value.lower():
                    analysis["is_council"] = True

        # Look for council mode
        for key in ["mode", "query_mode"]:
            if key in params:
                value = params[key]
                if "council" in str(value).lower():
                    analysis["is_council"] = True
                    analysis["notable_fields"].append(f"params.{key}={value}")

    return analysis


def interactive_curl_capture():
    """Interactive mode to capture cURL commands."""
    print("=" * 60)
    print("Perplexity Model Council RPC Logger")
    print("=" * 60)
    print()
    print("Instructions:")
    print("1. Open Chrome DevTools (F12) -> Network tab")
    print("2. Execute a Model Council query on perplexity.ai")
    print("3. Find the API request (usually POST to /query or similar)")
    print("4. Right-click -> Copy -> Copy as cURL (bash)")
    print("5. Paste below and press Enter twice")
    print()
    print("Paste cURL command (press Enter twice when done):")
    print("-" * 40)

    lines = []
    while True:
        try:
            line = input()
            if line:
                lines.append(line)
            else:
                if lines:
                    break
        except EOFError:
            break

    if not lines:
        print("No input received.")
        return

    curl_command = " ".join(lines)

    # Parse the cURL
    parsed = parse_curl(curl_command)
    print()
    print("=" * 60)
    print("Parsed Request:")
    print("=" * 60)
    print(f"URL: {parsed['url']}")
    print(f"Method: {parsed['method']}")
    print(f"Headers: {len(parsed['headers'])} headers")
    print()

    if parsed["body"]:
        print("Body:")
        print(json.dumps(parsed["body"], indent=2)[:1000])
        if len(json.dumps(parsed["body"])) > 1000:
            print("... (truncated)")

    # Analyze for council patterns
    analysis = analyze_council_request(parsed)
    print()
    print("=" * 60)
    print("Analysis:")
    print("=" * 60)
    print(f"Is Council Request: {analysis['is_council']}")
    print(f"Endpoint Type: {analysis['endpoint_type']}")
    print(f"Models Detected: {analysis['models_detected']}")
    print(f"Notable Fields: {analysis['notable_fields']}")

    # Save
    print()
    name = input("Enter a name for this capture (or press Enter for 'council_capture'): ")
    if not name:
        name = "council_capture"

    output_path = save_capture(name, {
        "request": parsed,
        "analysis": analysis,
    })
    print(f"Saved to: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Capture and analyze Perplexity Model Council API calls"
    )
    parser.add_argument(
        "--har",
        help="Path to HAR file to parse",
    )
    parser.add_argument(
        "--filter",
        help="Regex pattern to filter URLs",
        default=None,
    )
    parser.add_argument(
        "--curl",
        help="cURL command to parse (or use interactive mode)",
        default=None,
    )
    parser.add_argument(
        "--output",
        help="Output name for the capture",
        default="council_capture",
    )

    args = parser.parse_args()

    if args.har:
        # HAR file mode
        print(f"Parsing HAR file: {args.har}")
        requests = parse_har(args.har, args.filter)
        print(f"Found {len(requests)} Perplexity requests")

        # Analyze each for council patterns
        council_requests = []
        for req in requests:
            analysis = analyze_council_request(req)
            if analysis["is_council"] or "council" in req["url"].lower():
                council_requests.append({
                    "request": req,
                    "analysis": analysis,
                })

        if council_requests:
            print(f"Found {len(council_requests)} potential council requests")
            output_path = save_capture(args.output, council_requests)
            print(f"Saved to: {output_path}")
        else:
            print("No council requests found. Saving all requests for manual review.")
            output_path = save_capture(f"{args.output}_all", requests)
            print(f"Saved to: {output_path}")

    elif args.curl:
        # Direct cURL mode
        parsed = parse_curl(args.curl)
        analysis = analyze_council_request(parsed)
        output_path = save_capture(args.output, {
            "request": parsed,
            "analysis": analysis,
        })
        print(f"Saved to: {output_path}")

    else:
        # Interactive mode
        interactive_curl_capture()


if __name__ == "__main__":
    main()
