# RPC Captures

This directory stores captured API calls from Perplexity's Model Council feature.

**IMPORTANT**: JSON files in this directory are gitignored because they may contain session tokens.

## How to Capture

### Option 1: Interactive cURL (Recommended)

```bash
python plan/rpc_logger.py
```

Then follow the prompts to paste cURL commands.

### Option 2: HAR File

1. Open Chrome DevTools -> Network tab
2. Execute Model Council queries
3. Right-click -> "Save all as HAR with content"
4. Run:

```bash
python plan/rpc_logger.py --har path/to/network.har
```

### Option 3: Direct cURL

```bash
python plan/rpc_logger.py --curl "curl 'https://...' -H ..."
```

## What to Capture

1. **Model Council Query** - The main request when executing a council query
2. **SSE Stream Events** - The streaming response events
3. **Model Selection** - Any UI requests when selecting council models

## Checklist

See `plan/PHASE_0_CHECKLIST.md` for detailed capture instructions.
