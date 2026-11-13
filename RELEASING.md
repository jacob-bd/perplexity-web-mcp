# Releasing

Every release must pass a live smoke test on the exact commit being tagged. Offline tests alone are not enough.

1. Confirm authentication and quota with `pwm login --check` and `pwm usage`. Leave enough Pro Searches for the gate and one retry; the `auto` case can consume one.
2. Run `python scripts/release_check.py`. It runs Ruff, the offline test suite, and live `sonar` and `auto` queries that must return `PWM_SMOKE_OK`.
3. Bump the version in `pyproject.toml`, `uv.lock`, `desktop-extension/manifest.json`, both `SKILL.md` files, and `CHANGELOG.md`.
4. Commit the release prep and re-run `python scripts/release_check.py` on that exact commit.
5. Tag `vX.Y.Z` and push the commit and tag.
6. Watch both CI and Publish to PyPI. Confirm the GitHub release contains the wheel, source archive, and MCPB extension, and that PyPI lists the new version.

Free accounts cannot query premium models. The live gate therefore covers `sonar` and `auto`, the two paths a free session can execute. Verify the premium roster separately with `pwm models` and the catalog discovery script.
