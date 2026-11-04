# CONTEXT — TRCE product and technical context

This document gives agents a shared vocabulary. It does not replace the code or the detailed documentation. It should evolve as the product scope and business concepts are validated.

## 1. Product

TRCE is a web application under development. The direction described in `docs/product.md` is a platform for development teams to centralize replays and feed the platform from applications through an API key.

The current working assumption is that a replay represents a captured HTTP/API exchange that can be inspected and potentially replayed to help diagnose and reproduce behavior. **This definition is not yet a confirmed business contract.** The exact meaning of “replay,” the captured data, the ingestion format, retention rules, and the need for replay execution must be validated before finalizing the data model or API.

## 2. Business vocabulary

| Term | Working definition | Status |
|---|---|---|
| User | A human user who signs in to the TRCE interface. | Existing model |
| Admin | Global `admin` role intended for platform administration. | Existing value in `User.ROLES` |
| User / member | A user with the global `user` role. | Existing value; team permissions still need to be built |
| Team | Workspace and intended ownership / data-isolation boundary. | Existing model and table; rules are incomplete |
| Team membership | Relationship between a user and a team, represented by `users_teams`. | Existing table; relationships and authorization need to be finalized |
| Ingestion client | Application, SDK, or service that sends events to TRCE. It is a technical identity, distinct from a human User. | Target concept |
| API Key | Authentication secret for an ingestion client, linked to a team and permissions. | Not implemented |
| Replay | Record of the metadata and, subject to confirmation, data from an HTTP/API exchange. | Product concept to be confirmed; feature not implemented |
| Replay payload | Body, headers, or other captured data, which may be large and sensitive. | Target concept |
| Replay execution | Attempt to execute a replay against an authorized target. | Target concept, pending validation |
| Audit event | Event recording an administrative or security action. | Not implemented |

## 3. Current state observed in the repository

### Implemented or partially present

- Web authentication through AdonisJS sessions.
- Sign-out, password-reset flow, and forced change of a temporary password.
- Lucid models `User`, `Team`, and `PasswordResetToken`.
- Global `admin` / `user` roles.
- `users_teams` pivot table.
- Initial routes, pages, and React/Inertia components for teams, replays, users, and the profile.
- `TeamService` and `TeamPolicy` exist, but their presence does not mean that all access rules are operational.

### Incomplete or not implemented

- The `Replays`, `Users`, and `Profile` pages are foundations / placeholders.
- Team `show`, `update`, and `delete` operations are declared or partially started, but do not form a complete CRUD implementation.
- The team-creation route does not currently show a Bouncer authorization check in its controller; do not treat the existing policy as proof that the action is protected.
- Full team-membership logic and data isolation have not been finalized.
- There is no API Key model, ingestion flow, replay persistence, object storage, business-level search, or replay-execution worker yet.
- The public business API contract has not yet been finalized.

For details about the observed routes and schema, consult `docs/architecture.md`. Always verify the current branch before treating this list as up to date.

## 4. Business principles to preserve

1. **Team-first:** a team is the ownership boundary for business data. No team data may be accessed by an unauthorized user.
2. **Separate human and technical identities:** interface users and ingestion clients do not share the same identity or authentication mechanism.
3. **Privacy by default:** HTTP exchanges may contain passwords, cookies, tokens, personal data, or business secrets. Masking and exclusion must be designed into ingestion from the start.
4. **Explicit, versioned API:** if an ingestion API is created, define its contract, limits, errors, and compatibility strategy before multiplying clients.
5. **Safe replay execution:** if replay execution is confirmed, it must never become an arbitrary HTTP proxy. Execution must be isolated and network restrictions must address SSRF and side effects.
6. **Modular monolith first:** keep a single AdonisJS deployment until a workload or operational need justifies extracting a service.

## 5. Reference stack

- Runtime: Node.js 24+; TypeScript / ESM.
- Backend: AdonisJS Core 7.6.0, Lucid ORM, VineJS, Bouncer.
- Frontend: React 19, Inertia.js 2, Vite 7.
- UI: Tailwind CSS 4, local components built with Base UI, class-variance-authority, and Lucide React.
- Data: PostgreSQL by default; SQLite is also supported by the configuration.
- Email: SMTP transport; Mailpit in the local environment.
- Package management: npm; `package-lock.json` is the reference lockfile.

## 6. References

- Product overview: `docs/product.md`.
- Current and target architecture: `docs/architecture.md`.
- Design system: `docs/design-system.md`.
- Installation and development: `docs/development.md`.
- Security and operations: `docs/security-operations.md`.
- Agent operating instructions: `docs/agents/README.md`.

Initial review of this context: November 4, 2026. The current branch's code remains the source of truth for the actual implementation state.
