# Account Connector Sources

Perplexity Pro and Enterprise accounts may expose account-level connector sources such as Pitchbook, Crunchbase, CB Insights, Statista, Google Drive, or Box. These connectors are controlled by Perplexity and by the authenticated account. This package can route queries through connector source IDs when Perplexity reports them, but it does not provide connector access by itself.

## Who Can Use This

You need all of the following:

- A Perplexity account authenticated with `pwm login`.
- A Perplexity plan or workspace with connectors enabled.
- At least one connector source ID reported by Perplexity's rate-limit API.

Free accounts usually will not have private-data connectors. If no connector IDs appear, use the built-in sources: `web`, `academic`, `social`, `finance`, `all`, or `none`.

## List Connector IDs

CLI:

```bash
pwm connectors list
pwm connectors list --refresh
```

MCP:

```python
pplx_connectors(refresh=False)
```

Example output:

```text
Connector source IDs:
- pitchbook_mcp_cashmere: 3/5
- cbinsights_mcp_cashmere: 5/5
```

## Query a Connector

CLI:

```bash
pwm ask "Summarize recent funding for Stripe" -m sonar -s pitchbook_mcp_cashmere
pwm research "Private company market map for payroll APIs" -s cbinsights_mcp_cashmere
pwm council "Compare private fintech competitors" -s pitchbook_mcp_cashmere
```

MCP:

```python
pplx_smart_query(
    query="Summarize recent funding for Stripe",
    intent="standard",
    source_focus="pitchbook_mcp_cashmere",
)
```

## Trust Boundary and Local Policy

Connector queries are not equivalent to public web search. They execute with
the permissions of the Perplexity session stored by this package and may reach
private organization data, licensed datasets, Google Drive, Box, or other
account-connected systems. The query text and connector-backed results cross
the local CLI/MCP/API boundary and are processed by Perplexity and the selected
connector service.

Treat every process or AI agent that can invoke a query tool as able to request
data from every connector allowed by local policy. Prompt injection, an exposed
API compatibility server, or an overly broad MCP client permission can therefore
increase the impact of the authenticated Perplexity session.

Two environment variables provide defense-in-depth controls:

- `PWM_CONNECTORS_ENABLED=0` denies all connector-backed queries while leaving
  built-in public sources available.
- `PWM_CONNECTOR_ALLOWLIST=id_one,id_two` permits only the exact connector IDs
  listed. Setting it to an empty value denies all connectors. Discover IDs first
  with `pwm connectors list`; do not guess them.

For backward compatibility, reported connectors remain available when both
variables are unset. Organizations that require explicit opt-in should set
`PWM_CONNECTORS_ENABLED=0` globally, or set an empty allowlist and populate it
only for approved workloads.

Recommended controls:

- Use a dedicated Perplexity account or workspace with only necessary connectors.
- Keep the API and MCP servers on loopback unless authenticated and protected by TLS.
- Give agents access only to the specific query tools and connector IDs they need.
- Avoid sending secrets or unrelated private context in connector query text.
- Review connector access and quotas in Perplexity; local controls cannot override
  permissions already granted there.

## Important Behavior and Remaining Limits

- Do not guess connector IDs. Run `pwm connectors list` or `pplx_connectors()` first.
- Unknown source values fail intentionally. They do not fall back to web search.
- Connector availability, quota, and answer quality are controlled by Perplexity.
- Live verification requires an account with that connector enabled.
- Connector IDs may be account-specific and may change if Perplexity changes its web API.
- Local connector policy also applies while direct Python API payloads are built. It validates source IDs at query routing time; it is not a data-loss-prevention system and cannot inspect or redact connector results.
- This project uses an undocumented Perplexity web API, so connector semantics and backend enforcement can change without notice.

## Troubleshooting

If `pwm connectors list` says no connector source IDs were reported, the authenticated account probably does not have connectors enabled or Perplexity did not expose them through the rate-limit API.

If a connector query fails even though the ID is listed, re-run `pwm connectors list --refresh` and check whether the connector quota is exhausted. If quota remains, the connector may require a different backend payload from Perplexity's web app; open an issue with the connector ID, the command used, and the error message.
