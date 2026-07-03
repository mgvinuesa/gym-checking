# Supabase MCP for Codex

The repository configures the hosted Supabase MCP server in
`.codex/config.toml` for the development project
`xvnlpoghqpazolvwngnn`.

## Security baseline

- Access is scoped to one project.
- The connection starts in read-only mode.
- Only database inspection, diagnostics, development metadata and documentation
  tools are enabled.
- Every MCP tool call requires approval.
- Credentials are obtained through Supabase OAuth and are never committed.
- Production projects and real customer data must not be connected.

Although `execute_sql` is enabled, the server URL enforces a read-only Postgres
role. Migration application, Edge Function deployment, account management,
branching and Storage tools are not enabled.

## Authenticate

The repository must be trusted by Codex before project-scoped MCP configuration
is loaded. From a regular terminal in the repository, run:

```bash
codex mcp login supabase
```

Complete the browser OAuth flow using the Supabase account that owns the
development project. Select only the organization containing Gym Checking.
Restart Codex after authentication so the installed Supabase skills and MCP
tools are loaded together.

## Verify

In a new Codex thread, request:

```text
Use Supabase MCP to list the tables and applied migrations in the configured
development project. Do not make changes.
```

Confirm that the project URL is `https://xvnlpoghqpazolvwngnn.supabase.co` and
that no unrelated Supabase project is visible.

## Enabling writes later

Write access must be a deliberate change reviewed in a pull request. Remove
`read_only=true` only for the development project, add the minimum required
write tool such as `apply_migration`, keep approval mode set to `prompt`, and
restore read-only mode after the operation when practical.
