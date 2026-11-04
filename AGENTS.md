# AI Agent Instructions — TRCE

This file is the shared entry point for coding assistants. It describes the rules that apply to any change made to this repository.

## 1. Read the context before taking action

Before starting any task:

1. Read `CONTEXT.md` to understand the product vocabulary and distinguish the current implementation from the target state.
2. Read `docs/agents/README.md`, then the guide relevant to the area being changed: `backend.md`, `frontend.md`, `security.md`, or `testing.md`.
3. Consult the relevant reference documents:
   - `docs/product.md` for product scope and user journeys;
   - `docs/architecture.md` for the current architecture and proposed changes;
   - `docs/design-system.md` for the interface;
   - `docs/development.md` for the development environment and commands;
   - `docs/security-operations.md` for security and operations.
4. Inspect the actual files involved before proposing or making a change. Do not infer the implementation from documentation alone.

## 2. Source of truth: code, documentation, and assumptions

- The code and migrations on the current branch describe what is actually implemented.
- `docs/architecture.md` deliberately distinguishes the current architecture from the target architecture. A target-state proposal is neither an existing feature nor permission to implement it without a request.
- `docs/product.md` contains product assumptions, particularly around the meaning of a replay and HTTP replay execution. Do not turn them into final contracts until the requirements have been confirmed.
- If the code and a document disagree, verify the code, report the discrepancy, and update the relevant document if the change resolves it.
- Never claim that a feature, security control, or test exists without verifying it.

## 3. Repository stack and conventions

Keep the existing stack unless there is a documented technical justification:

- Node.js `>=24` and npm (`package-lock.json` is the reference lockfile);
- AdonisJS Core `7.6.0`, Lucid ORM, VineJS, and Bouncer;
- React 19, Inertia.js 2, and Vite 7;
- Tailwind CSS 4, local components based on Base UI, `class-variance-authority`, and Lucide React;
- PostgreSQL by default; SQLite is also supported by the configuration;
- SMTP for email delivery.

Use the scripts defined in `package.json`:

```bash
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```

`npm run format` runs Prettier across the entire repository. To avoid reformatting files unrelated to the task, target the changed files whenever possible.

Do not add a dependency, external service, microservice, or new abstraction layer without a concrete need and justification. Do not change the package manager or regenerate the lockfile unless a dependency change is intentional.

## 4. Application architecture to follow

Respect the organization found in the repository:

- `start/`: routes and HTTP initialization;
- `app/controllers/`: HTTP adaptation, validation, authorization, and orchestration;
- `app/services/`: reusable business logic;
- `app/models/`: Lucid models and relationships;
- `app/policies/` and `app/abilities/`: Bouncer authorization;
- `app/validators/`: request validation with VineJS;
- `app/middleware/`: cross-cutting request handling;
- `app/transformers/`: transformation of exposed data;
- `database/migrations/`: schema changes;
- `inertia/pages/`: React pages;
- `inertia/components/`: application components and UI components;
- `inertia/layouts/`: layouts;
- `inertia/css/app.css`: global tokens and styles.

Do not spontaneously introduce the target `app/modules/` directory structure described in `docs/architecture.md`. Any structural migration must be incremental, justified, and covered by tests.

### Generated files

Do not manually modify:

- `.adonisjs/`;
- `database/schema.ts`.

The Lucid TypeScript schema is generated from migrations. Modify a migration, then use the documented Adonis/Lucid commands to regenerate the required artifacts. Do not hand-edit a generated type.

Use the TypeScript aliases already declared in `package.json` and the `tsconfig` files (`#controllers/*`, `#models/*`, `#services/*`, `#validators/*`, `#policies/*`, `#generated/*`, `~/components/*`, `@/lib/*`, etc.) instead of inventing new aliases.

## 5. Cross-cutting requirements

- Any input originating from an HTTP request must be validated on the server with VineJS.
- Every protected operation must be authorized on the server with Bouncer or an explicit equivalent mechanism. Hiding a button in React is never an access control.
- Every business resource must be read and modified within the authorized team boundary. A `team_id` supplied by the browser never proves membership.
- Every schema change must go through a migration that is reversible whenever possible.
- Operations involving multiple related records must be atomic when required by the business rules.
- Never expose secrets, passwords, cookies, tokens, API keys, sensitive HTTP bodies, or internal details in logs, Inertia props, or error messages.
- Add or update tests for successful cases, errors, and authorization denials.
- Keep the interface consistent with `docs/design-system.md` and the existing components.

## 6. Task workflow

1. Restate the expected outcome and identify the relevant business and security rules.
2. Locate the existing files, routes, models, migrations, components, and tests responsible for the behavior.
3. Propose the smallest coherent change; avoid opportunistic refactoring.
4. Implement validation, authorization, error handling, and tests as part of the same change.
5. Update documentation if behavior, architecture, conventions, or prerequisites change.
6. Run the appropriate checks and report their results accurately.

Do not claim that a command was run if it was not. If a check cannot be run, state why.

## 7. Definition of Done

A task is complete when:

- the requested behavior is implemented without expanding the scope;
- inputs are validated and server-side authorization is enforced;
- tests cover the expected behavior and sensitive cases;
- `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` pass when relevant to the change;
- migrations and documentation are up to date;
- no secret, generated artifact, or unrelated file has been added by mistake.

## 8. Architecture decisions

Any lasting decision that changes business boundaries, the data model, an API contract, a foundational dependency, or the security model must be documented in `docs/adr/` using `docs/adr/0000-template.md`.
