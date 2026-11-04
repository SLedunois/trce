# Agent Guide — TRCE Backend

## 1. Request flow and responsibilities

Preserve the existing responsibilities:

- `start/routes.ts` declares routes and their middleware groups;
- controllers in `app/controllers/` adapt HTTP and Inertia;
- validators in `app/validators/` validate inputs with VineJS;
- policies in `app/policies/` and abilities in `app/abilities/` define Bouncer authorization;
- services in `app/services/` contain reusable business rules;
- models in `app/models/` handle Lucid persistence and relationships;
- transformers in `app/transformers/` prepare exposed data;
- `app/middleware/` contains cross-cutting HTTP concerns.

For a non-trivial business operation, aim for this flow:

`Route → middleware → controller → validation → authorization → service → model / transaction → response`.

Controllers should remain readable. They may coordinate an operation, but should not become the home of complex business rules or repeated relational queries.

## 2. Controllers and routes

- Declare routes in `start/routes.ts` and respect the existing `guest`, `auth`, and `forcePasswordChange` groups.
- Preserve route names consumed by Inertia components (`login.show`, `teams.list`, `teams.create`, etc.), or update all their usages when an intentional change is made.
- Use AdonisJS types (`HttpContext`) and existing import aliases.
- Extract only validated values from `request`; avoid `request.all()` for business operations.
- Use idiomatic AdonisJS responses: named redirects for Inertia forms, Inertia rendering for pages, and explicit JSON responses for an API.
- Do not implicitly mix web and API response conventions. The `providers/api_provider.ts` provider exists; inspect its code before extending its response envelope.
- Do not create an ingestion API route before defining its contract, authentication, limits, and error policy.

## 3. VineJS validation

- All request data must go through `request.validateUsing(...)` and a dedicated schema in `app/validators/`.
- Validate on the server even if a field is `required`, typed, or constrained in React.
- Set realistic bounds for lengths, sizes, numbers, formats, and arrays.
- Uniqueness and existence rules must account for the business scope (particularly the team) and concurrent requests; application-level validation does not replace a SQL constraint.
- Never use permissive validation that silently accepts unexpected fields containing permissions or ownership identifiers.

## 4. Services and Lucid persistence

- Put rules shared by multiple controllers or involving multiple business steps in `app/services/`.
- Inject services using the AdonisJS injection mechanism used in the repository (`@inject()` when needed).
- Services receive the required identifiers and business objects; they must not trust a `teamId` supplied by the browser without verifying the authorized context.
- Keep queries filtered as close as possible to the ownership boundary: look up a resource by both its identifier **and** the authorized team, rather than loading it globally and assuming it belongs to the requester.
- Use Lucid transactions when multiple writes must succeed or fail together.
- Use database constraints to protect integrity: foreign keys, `NOT NULL`, indexes, and appropriate unique constraints.
- Avoid N+1 queries; preload the required relationships or build a read model when it genuinely simplifies querying.
- Reuse Luxon (`DateTime`) for dates, as in the existing code.

## 5. Models and migrations

- Current models extend the generated classes from `database/schema.ts`. Inspect neighboring models before adding a model.
- Define Lucid relationships explicitly when they exist in the schema, and test them.
- Every database change must go through a new file in `database/migrations/`. Do not rewrite a migration that has already been shipped to fix the current schema.
- Provide a consistent `down()` method and check the order in which constraints are dropped.
- Do not edit `database/schema.ts`: it is generated. After a migration, verify generation and types.
- Do not assume that the `users_teams` pivot table alone constitutes a working membership system: verify the actual relationships, constraints, and policies.

## 6. Bouncer and authorization

- A policy has no effect until it is called by the execution flow.
- Add an explicit Bouncer check before every protected mutation and before reading or exporting a private resource.
- Policies should receive the actor and, when necessary, the resource concerned.
- Distinguish the global role (`admin` / `user`) from any future team-level role. Do not invent `owner`, `maintainer`, or `team_admin` without a business decision.
- Define the denial behavior explicitly (403 or 404) and apply it consistently.
- Test denials, particularly access by a member of team A to resources belonging to team B.

## 7. Future API

Before implementing a public endpoint:

1. stabilize the version, method, path, authentication, and scopes;
2. define the JSON contract and HTTP status codes;
3. define size limits, rate limits, pagination, idempotency, and timeouts;
4. specify error handling and versioning;
5. handle secrets and personal data before persistence/logging;
6. write contract and security tests.

The examples in `docs/architecture.md` are proposals. They must not be exposed as an existing API unless they have been implemented.
