# ADR-0001: Stack for the deployment spike

- Status: accepted
- Date: 2026-07-03

## Context

The project needs to prove a low-maintenance deployment path before gym domain
development begins. The spike must validate a mobile-first web application,
managed PostgreSQL access, environment configuration, CI and preview deployments
without incurring hosting costs during validation.

The community subscription-payments example demonstrates a similar integration,
but includes Stripe, subscriptions and webhook concerns that are outside this
project's current scope.

## Decision

Use the following stack for the deployment spike:

- Next.js 16 with the App Router and React 19.
- TypeScript in strict mode.
- Node.js 24, fixed through `.nvmrc` and `package.json` engines.
- npm with a committed lockfile.
- Supabase JavaScript client and a Supabase Free project.
- Vercel connected to GitHub, using the Hobby plan for validation.
- GitHub Actions to run typecheck and production build on pull requests.

The spike uses only a Supabase publishable key with a read-only RLS policy. It
does not use a secret key, authentication, Stripe or gym domain tables.

## Alternatives considered

### Clone the subscription-payments starter

Rejected because payments, products, subscriptions and webhooks would obscure
the infrastructure questions being validated and create unnecessary maintenance.

### Build a static page without Supabase

Rejected because it would validate Vercel deployment but not the database,
environment variables or RLS boundary that the product will rely on.

### Start with a native application

Rejected for the spike because a responsive PWA-oriented web stack validates
mobile and desktop delivery with one deployment and no app-store process.

## Consequences

- The first deployment remains small and can run on free service tiers.
- Pull requests can receive Vercel preview deployments.
- Node 18 environments must activate Node 24 before installing dependencies.
- Free tiers are suitable for validation but provide no production service-level
  commitment; pricing, regions, backups and operational requirements must be
  reviewed before onboarding real users.
- Vercel and hosted Supabase remain replaceable if the spike exposes an
  unacceptable constraint.
