# Project instructions for Codex

## Product context

Gym Checking is a mobile-first application for a gym whose opening hours and
class schedule change every week. A membership grants a number of weekly
sessions; recurring schedules are preferred automatic assignments, not fixed
appointments.

Read these documents before changing product behaviour:

- `docs/product/functional-specification.md`: agreed scope, rules and use cases.
- `docs/product/glossary.md`: domain language and UI terminology.
- `docs/architecture/technical-vision.md`: technical direction and constraints.
- `docs/decisions/`: accepted architecture decisions.

Treat confirmed functional rules separately from technical proposals and open
questions. Do not silently turn a proposal into a requirement.

## Working agreement

- Use trunk-based development with short-lived branches from an updated `main`.
- Never push directly to `main` unless the user explicitly requests an exception.
- Use `feature/<issue>-<description>`, `fix/<issue>-<description>` or
  `chore/<description>` branch names. Omit the issue only when none exists.
- Keep pull requests small, cohesive and independently verifiable.
- Open pull requests as drafts until implementation and relevant checks pass.
- Prefer squash merge so `main` contains one intentional commit per pull request.
- Do not stage, rewrite or discard unrelated user changes.

## Commits and pull requests

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:` or
  `chore:`.
- A pull request must explain the problem, changes, validation, risks and any
  follow-up work.
- Include screenshots for visible UI changes and call out database migrations.
- Resolve review conversations and required CI checks before merge.

## Engineering principles

- Prefer a modular monolith; do not introduce services without a demonstrated
  boundary and operational need.
- Keep domain rules independent from frameworks and UI concerns.
- The client must not be the authority for booking validity, capacity or weekly
  allowance.
- Make booking, movement and cancellation operations transactional.
- Make weekly publication idempotent and preserve published historical data.
- Represent administrative overrides explicitly and audit them.
- Design mobile-first while preserving an accessible desktop experience.
- Aim for WCAG 2.2 AA and never communicate state through colour alone.
- Store session start and end instants; do not assume every class lasts one hour.
- Use the gym's configured time zone for business rules.

## Change discipline

- Update the functional specification when agreed behaviour changes.
- Add an ADR for consequential technical decisions or when replacing an existing
  architectural choice.
- Add or update automated tests for every changed business rule.
- Test capacity limits, weekly allowance, authorization and concurrency at the
  server or database boundary.
- Do not add production dependencies without explaining their need and checking
  maintenance, licensing, security and bundle or runtime impact.
- Keep secrets out of source control and provide `.env.example` entries when a
  new environment variable is introduced.

## Verification

The application toolchain has not been initialized yet. Until commands are
defined, always run:

```bash
git diff --check
```

Once the project scripts exist, update this section with the canonical install,
format, lint, type-check, test and build commands. Run all checks relevant to the
changed area before requesting review and report anything that could not run.

## Definition of done

A change is complete when:

- Acceptance criteria and affected business rules are satisfied.
- Relevant tests pass, including negative and authorization cases.
- Documentation and ADRs reflect the resulting behaviour and decisions.
- The diff contains no unrelated changes or secrets.
- The pull request describes validation, risks and follow-up work.
