# Supabase and Vercel workflow

## Platform ownership

- GitHub is the source of truth for application code and database migrations.
- Vercel Git Integration creates a preview for each pull request and deploys
  `main` to production.
- Supabase `gym-checking-dev` is the development database. MCP access must not
  be pointed at future production data.

## Environments

| Application environment | Database | Purpose |
| --- | --- | --- |
| Local development | Local Supabase when available, otherwise `gym-checking-dev` | Implementation |
| Vercel Preview | `gym-checking-dev` until isolated branches are justified | PR validation with synthetic data |
| Vercel Production | Separate production project in the future | Real users only after operational review |

Preview deployments must never receive future production database credentials.
Supabase database branching is intentionally deferred because it requires a
paid plan.

## Required Vercel variables

Configure these in Development, Preview and the temporary validation Production
environment:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Both values are public application configuration. Do not add a secret or legacy
`service_role` key to the browser application.

## Database changes

1. Create or edit a migration under `supabase/migrations`.
2. Test against local Supabase when the CLI and Docker stack are available.
3. Review grants and RLS policies explicitly.
4. Apply the reviewed migration to `gym-checking-dev`.
5. Run Supabase security and performance advisors.
6. Generate and commit TypeScript database types.
7. Push the application branch and validate the Vercel preview.

Never make an untracked schema change in the Supabase dashboard. If emergency
diagnosis requires temporary SQL, capture the final result as a migration before
the pull request is merged.

## Deployment flow

1. GitHub CI runs typecheck and a production build.
2. Vercel creates a deployment from the same commit.
3. The `Verify deployment` workflow calls `/api/health` after Vercel reports
   success.
4. Review the preview UI, health response, build logs and runtime errors.
5. Merge only when GitHub CI, Vercel and the health check pass.

For production incidents, inspect grouped runtime errors first, then deployment
build logs or scoped runtime logs. Roll back to a known-good deployment instead
of rebuilding an old commit.
