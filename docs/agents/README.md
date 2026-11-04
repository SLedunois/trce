# Specialized Guides for AI Agents

`AGENTS.md` contains the repository-wide rules. This directory supplements those rules with specialized instructions; it does not replace the project's technical documentation.

## Which guide should you read?

| Task type | Agent guide | Project documentation to consult |
|---|---|---|
| Route, controller, service, model, migration, API | [`backend.md`](backend.md) | [`architecture.md`](../architecture.md), [`development.md`](../development.md) |
| Page, component, form, navigation, styles | [`frontend.md`](frontend.md) | [`design-system.md`](../design-system.md) |
| Authentication, authorization, keys, captured data, replay execution | [`security.md`](security.md) | [`security-operations.md`](../security-operations.md), [`architecture.md`](../architecture.md) |
| Unit, functional, browser, or regression tests | [`testing.md`](testing.md) | `adonisrc.ts`, `tests/`, `package.json` |
| Foundational decision | [`../adr/README.md`](../adr/README.md) | [`architecture.md`](../architecture.md), [`product.md`](../product.md) |

## Recommended workflow

1. **Observe before changing anything:** check `git status`, the relevant files, routes, data model, and existing tests.
2. **Define the behavior:** distinguish confirmed business rules, documented assumptions, and purely technical details.
3. **Trace the end-to-end flow:** route → middleware → controller → policy/validator → service → model/database → Inertia or JSON response.
4. **Identify security boundaries:** user, team, resource, technical client, sensitive data, and external operations.
5. **Make the smallest necessary change:** avoid refactoring that does not directly serve the task.
6. **Test denials as well as success cases:** anonymous access, incorrect role, another team, invalid input, missing resource, and dependency failure.
7. **Update references:** documentation, design system, or ADR whenever a lasting rule changes.

## Feature-design rules

- Never implement a feature merely because it is mentioned in a “proposed target state” section.
- Do not invent an API contract, replay format, team role, or retention policy. Ask for the blocking business decision or explicitly isolate the assumption.
- Prefer a complete vertical implementation—with validation, authorization, persistence, interface, and tests—over a set of empty files with no behavior.
- Do not create a generic abstraction for a single call unless a demonstrated reuse need exists.
- Keep dependencies and deployment flows simple; do not add a microservice, queue, or object storage without an explicit decision.

## When should documentation be updated?

Update the reference documents whenever a change affects:

- behavior visible to users or a business workflow;
- a route, request contract, or response contract;
- a model, relationship, or data constraint;
- a security control or authorization boundary;
- a coding convention, dependency, or development command.

A temporary implementation note must not be presented as an architecture decision. For a lasting decision, create an ADR from `docs/adr/0000-template.md`.
