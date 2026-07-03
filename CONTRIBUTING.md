# Contributing to Gym Checking

## Development model

The project uses trunk-based development. `main` is protected and must remain
stable and deployable. Normal changes are delivered through short-lived branches
and pull requests; direct pushes are reserved for explicit exceptional cases.

## Workflow

1. Update local `main` from `origin/main`.
2. Create a branch for one cohesive change.
3. Define or confirm acceptance criteria before implementation.
4. Implement the smallest complete solution, including tests and documentation.
5. Run the relevant local checks.
6. Commit using Conventional Commits.
7. Push the branch and open a draft pull request.
8. Complete the pull request template and address CI or review feedback.
9. Mark it ready, then squash merge after all requirements pass.
10. Delete the merged branch.

## Branch names

- `feature/<issue>-<description>` for functionality or product documentation.
- `fix/<issue>-<description>` for corrections.
- `chore/<description>` for tooling, dependencies and maintenance.

Examples:

```text
feature/12-weekly-calendar
fix/27-prevent-capacity-overflow
chore/configure-ci
```

When no issue exists, use a concise description without inventing an identifier.

## Commits

Use Conventional Commits and describe the outcome rather than the activity:

```text
feat: add weekly schedule draft
fix: prevent bookings above member allowance
docs: clarify administrative overrides
test: cover concurrent booking attempts
chore: configure continuous integration
```

Keep commits reviewable. A pull request may contain several useful commits, but
will normally be squash merged into one commit on `main`.

## Pull requests

A pull request should contain:

- The problem and user impact.
- The implemented change and relevant trade-offs.
- The checks and manual validation performed.
- Screenshots or recordings for visible UI changes.
- Database migrations, deployment considerations and rollback risks.
- Known limitations and deliberately deferred work.

Prefer small, independently valuable pull requests. Changes around roughly 400
functional lines deserve another look for possible decomposition, but this is a
review aid rather than a hard limit.

## Documentation

- Product behaviour belongs in `docs/product/functional-specification.md`.
- Shared domain language belongs in `docs/product/glossary.md`.
- Technical direction belongs in `docs/architecture/technical-vision.md`.
- Consequential architecture decisions belong in `docs/decisions/` as ADRs.
- Durable instructions for Codex contributors belong in `AGENTS.md`.

Do not mix an undecided technical option into the functional specification as if
it were agreed product behaviour.

## Quality expectations

- Business rules are enforced outside the client.
- Authorization and negative cases are tested.
- Booking and capacity changes are safe under concurrent requests.
- UI changes are mobile-first and accessible.
- Administrative overrides remain explicit and auditable.
- Secrets and personal data are not committed.

Canonical commands will be added here when the application toolchain is
initialized. Until then, at minimum run `git diff --check` and review the complete
diff before requesting review.
