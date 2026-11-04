# TRCE — Security and Operations

> Static assessment of the provided repository. This document describes the security controls currently visible in the codebase and the work still required. It does not constitute a certification or a dynamic security audit.

## 1. Current Security Status

| Area | Findings in the codebase | Assessment |
|---|---|---|
| Authentication | AdonisJS web guard based on sessions | Implemented |
| Password hashing | AdonisJS hashing provider, configured with Scrypt | Implemented |
| Session cookie | HttpOnly, Secure in production, SameSite Lax | Implemented |
| CSRF | Enabled for POST/PUT/PATCH/DELETE | Implemented |
| HSTS | Enabled, configured duration of 180 days | Implemented |
| X-Frame-Options | Enabled with DENY | Implemented |
| X-Content-Type-Options | Enabled | Implemented |
| CSP | Disabled | Needs attention |
| Bouncer authorization | Middleware and TeamPolicy available | Incomplete enforcement |
| Rate limiting | No rate-limiting mechanism identified in the repository | To be implemented |
| API Keys | Model and validation are missing | To be designed |
| Audit trail | No business audit logging identified | To be implemented |
| Sensitive storage | Password reset tokens stored in plaintext | Needs hardening |
| Team isolation | SQL pivot table exists, application-level logic is missing | To be implemented |
| Backup / Disaster Recovery | Not documented in the repository | To be defined |

## 2. Priority Fixes

### P0 — Before Exposing the Application to Users

1. **Enforce authorization in controllers.** `TeamPolicy` exists, but `TeamsController.create()` does not visibly perform a Bouncer authorization check. Team creation must not rely solely on hiding the button in React.
2. **Fix the logout flow.** The route is `POST /logout`; verify that the frontend action sends a POST request rather than performing a GET navigation.
3. **Fix password confirmation validation.** Explicitly verify on the server that the password and confirmation values match.
4. **Verify signed password reset URLs.** A URL is generated using the signing helper, but the controller handling the link must also validate its signature, in addition to checking the token in the database.
5. **Add rate limiting** to login, password reset requests, and future ingestion endpoints.
6. **Enable CSP progressively.** Start with Report-Only mode, collect violations, and then switch to enforcement mode once the sources required by Vite/React have been validated.
7. **Handle unexpected errors in `generate:admin`.** The command must not report success if the database insertion fails for any reason other than an email address already being in use.

### P1 — Before Opening the API

- API keys generated using a CSPRNG, stored as hashes, revocable, and scope-based.
- Authentication mechanisms separate from browser sessions.
- Strict payload validation, payload size limits, and rate limits.
- Consistent authorization checks based on `team_id`.
- Protection against data injection into logs and HTTP headers.
- Redaction of cookies, tokens, passwords, and personal data.
- Pagination and request limits to prevent resource exhaustion.
- A stable error format that does not expose stack traces or secrets.

### P2 — Before Scaling

- Administrative and security audit trail.
- Secret rotation and key lifetime policies.
- Encrypted backups, tested restoration procedures, and defined RPO/RTO objectives.
- Monitoring of the database, object storage, queues, and workers.
- Data retention management and effective payload deletion.
- Load testing and multi-tenant isolation testing.

## 3. Detailed Security Controls

### 3.1 Identity and Sessions

- Keep cookies `HttpOnly`, `Secure` in production, and configured with an appropriate `SameSite` policy.
- Enforce HTTPS everywhere; the reverse proxy must correctly forward the secure connection context to the application.
- Limit inactive sessions and invalidate sessions after password changes whenever the risk level justifies it.
- Add login attempt throttling per account and per IP address, without allowing targeted denial-of-service attacks against individual users.
- Avoid revealing whether an email address exists during the password reset process; the current generic message follows this principle.
- Store password reset tokens as hashes, enforce short expiration periods, single-use semantics, and invalidation.

### 3.2 Multi-Team Authorization

- A request must never be allowed to determine its own `team_id`.
- Load resources within the authorized team scope, or explicitly verify team membership before granting access.
- Enforce authorization on reads, exports, deletions, and payload downloads, not only on listing pages.
- Distinguish between global roles (platform administration) and team-level roles.
- Test scenarios where a user who belongs to Team A attempts to read or modify a resource belonging to Team B.

### 3.3 API Keys

- Display the secret only once and store only its hash.
- Store an identifier, prefix, name, scopes, expiration/revocation dates, and last usage timestamp.
- Never include API keys in logs, traces, URLs, or error messages.
- Immediately revoke compromised keys and record the operation in the audit trail.
- Define a key rotation policy and a procedure for responding to key compromises.

### 3.4 Replay Data

- Define redaction rules at ingestion time.
- Do not capture authentication headers or cookies by default.
- Enforce encryption in transit and at rest.
- Control downloads and temporary access URLs for object storage.
- Ensure complete deletion of metadata and stored objects when retention periods expire.
- Isolate environments and data according to team ownership.

### 3.5 Replay Execution — If Confirmed

- Use a worker process separate from the web application.
- Enforce restrictive network egress rules and SSRF filtering.
- Block loopback, private networks, link-local addresses, metadata services, and unauthorized destinations.
- Revalidate destinations after DNS resolution and redirects.
- Enforce timeouts, size limits, concurrency limits, and execution budgets.
- Require explicit confirmation for targets that may cause side effects.
- Log the target, actor, and result without recording secrets.

## 4. Operations

### 4.1 Deployment

The repository does not yet contain an application Dockerfile or a delivery pipeline. The current Compose configuration only starts PostgreSQL, WhoDB, and Mailpit.

Recommended target architecture:

- Non-root Node.js image containing production dependencies only.
- Configuration through environment variables / a secrets manager.
- TLS termination at the edge.
- Stateless web application processes.
- Database migrations executed as a controlled deployment step.
- Workers deployed separately from HTTP processes.
- Health checks that distinguish HTTP availability from critical dependency health.

### 4.2 Logs and Metrics

The following information should be collected:

- Structured application logs with a request identifier.
- HTTP error rates and latency per endpoint.
- Failed authentication rate.
- Ingestion volume and latency.
- Worker backlog and failure rates.
- Object storage size and retention progress.
- PostgreSQL connections, latency, and resource saturation.

Do not log secrets, passwords, password reset tokens, API keys, cookies, or raw request/response bodies by default.

### 4.3 Backup and Recovery

The following must be defined at the product and operations levels:

- Expected RPO and RTO.
- Consistent PostgreSQL backups and restoration tests.
- Versioning or protection against accidental deletion in object storage.
- Backup retention and encryption.
- Emergency access procedures and secret rotation.
- Periodic disaster recovery exercises.

Consistency between PostgreSQL metadata and S3 objects must be addressed: a restoration must not create references to missing payloads, or payloads without corresponding metadata.

## 5. Production Readiness Checklist

- [ ] Strong, unique `APP_KEY`, securely stored in a secrets manager.
- [ ] Database/SMTP secrets are not present in Git or container images.
- [ ] HTTPS and secure cookies verified behind the reverse proxy.
- [ ] CSP tested and then enabled.
- [ ] CORS restricted to the required origins.
- [ ] CSRF enabled on session-based routes.
- [ ] Authorization policies enforced on every business read/write operation.
- [ ] Rate limiting configured and shared across application instances.
- [ ] Cross-team access isolation tests in place.
- [ ] Password reset tokens stored as hashes and usable only once.
- [ ] Logs contain no secrets or sensitive data.
- [ ] API payload size and rate limits defined.
- [ ] Backup and restoration procedures tested.
- [ ] Health checks and operational alerts in place.
- [ ] Tests, lint, typecheck, and build executed in CI.
- [ ] Update, rollback, and database migration procedures documented.
