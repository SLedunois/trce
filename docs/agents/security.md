# Agent Guide — TRCE Security

Security is a design constraint, not a final step. Read `docs/security-operations.md` before changing authentication, authorization, APIs, captured data, or deployment.

## 1. Identity, sessions, and authentication

- Reuse the existing AdonisJS guards, sessions, middleware, and providers; do not add a second identity mechanism without a validated need.
- Explicitly protect routes with the appropriate middleware (`guest`, `auth`, `forcePasswordChange`).
- Preserve CSRF protection for browser-session-based actions.
- Never send passwords, reset tokens, session cookies, or secrets to logs, URLs, Inertia props, or error responses.
- Avoid messages that make account enumeration possible; keep password-reset responses generic.
- Do not assume that hashing the password is sufficient to secure the lifecycle of password-reset tokens. Review storage, lifetime, single use, revocation, and link validation.

## 2. Authorization and team isolation

- React pages are not a security boundary.
- Check authorization on the server for every read, create, update, delete, export, and download.
- Never trust a `team_id` sent by the user or inferred from a route parameter without checking membership.
- Load a resource within the authorized scope or explicitly compare its team with the authorized team.
- Keep the user's global role separate from future team roles.
- Write negative tests proving that a user in one team cannot read or modify resources belonging to another team.

## 3. API keys and technical clients

For any future API key implementation, follow at least these rules before production:

- generate the secret with a cryptographically secure generator;
- display the full value only once;
- store a non-reversible hash in the database, with a separate public prefix/identifier;
- associate the key with a team and minimal scopes;
- support expiration, revocation, rotation, and traceability;
- apply rate limiting appropriate to the key, team, and IP;
- keep the secret out of logs, URLs, error messages, and metrics.

An API key represents a technical client; do not implicitly reuse the web-session guard to authenticate ingestion.

## 4. Captured request / response data

Replay payloads may contain secrets and personal data. Before recording an exchange:

- define a list of headers, cookies, and fields to exclude or mask;
- set explicit limits for size and MIME types;
- restrict access to both metadata and stored bodies;
- encrypt data in transit and at rest according to the chosen architecture;
- control temporary URLs and download permissions;
- define a retention policy and effective deletion of stored objects;
- never automatically log raw payloads.

Do not introduce object storage or a processing queue before an architecture decision has been documented.

## 5. HTTP replay execution and SSRF

Replay execution is a high-risk capability and remains subject to confirmation. Never implement a simple `fetch(urlProvidedByUser)` from the server.

Before developing this flow, require a design that addresses at least:

- execution in a worker isolated from the web server;
- restrictive egress policy;
- blocking loopback, private, link-local, and metadata-service networks;
- DNS validation and revalidation after resolution and redirects;
- destination allowlisting when the use case permits it;
- timeouts, size limits, quotas, concurrency, and task cancellation;
- protection against side effects (mutating requests, payments, email delivery, etc.);
- logging of the actor, target, and result without secrets.

A standalone URL-validation check is not sufficient protection against SSRF and DNS rebinding.

## 6. Logs, errors, and configuration

- Use structured logs without sensitive data; log correlation identifiers instead of content.
- Do not return stack traces, SQL queries, local paths, environment variables, or secrets to clients.
- Keep secrets out of the repository and configuration examples; `.env.example` must contain placeholders only.
- Restrict CORS origins and permissions to the minimum required.
- Any change to CSP, cookies, sessions, HSTS, or proxy configuration must be justified and tested in the actual deployment context.

## 7. Expected verification

Every sensitive change must include tests for denied access, malformed input, masked secrets, resource limits, and relevant dependency failures. Update `docs/security-operations.md` whenever the actual state of a control changes.
