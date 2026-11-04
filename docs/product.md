# TRCE — Product Overview

> Status: **Proposed product definition**, to be validated with users and real-world use cases.

## 1. Product Positioning

The current interface presents TRCE as a space where a team can centralize its "replays" and use an API key to populate that space. The repository does not yet contain a detailed definition of what constitutes a replay.

To provide a foundation for future development, this document adopts the following assumption:

**TRCE is a platform that enables teams to capture, centralize, inspect, and replay HTTP/API exchanges**, primarily to reproduce behavior, diagnose issues, compare responses, or share scenarios between developers.

This definition is a design assumption. It must be validated before finalizing the data model, ingestion format, and exact replay execution behavior.

## 2. Problem Statement

Within a development team, reproducing an incident or API behavior may require recovering request parameters, headers, body, response, and execution context. This information is often scattered across logs, development tools, tickets, and environments.

TRCE could provide:

- A shared workspace organized by team.
- Automated ingestion from applications or tools.
- Structured storage of HTTP exchanges.
- Centralized search and inspection.
- Controlled replay execution, if this requirement is confirmed.

## 3. Users and Roles

### Platform Administrator

Manages user accounts, teams, and global platform settings. The `admin` role already exists in the current `users` model.

### Team Member

Accesses their team's data according to their permissions. The `users_teams` pivot table already exists, but the relationships and access control rules have not yet been implemented.

### Ingestion Client

An application, SDK, or service that sends data to TRCE using an API key. This client represents a technical identity, separate from a human user.

### Team Administrator — Proposed Target Role

Manages team members, API keys, retention policies, and team-specific settings. This role does not yet exist in the current data model.

## 4. Proposed Functional Scope

| Domain | Target functionality | Current repository status |
|---|---|---|
| Identity | Session-based login and logout | Implemented, corrections needed |
| Identity | Forgotten password / password reset | Implemented, security hardening needed |
| Identity | Forced temporary password change | Implemented |
| Users | User listing and administration | Placeholder page |
| Teams | Team listing | Partially implemented |
| Teams | Team creation | Implemented, authorization needs to be secured |
| Teams | Editing, deletion, and membership management | Not implemented |
| API Keys | Creation, listing, revocation, and rotation | Not implemented |
| Replays | Ingestion, storage, search, and details | Not implemented |
| Replays | Replay execution against a controlled target | Not implemented; requirement to be confirmed |
| Operations | Auditing, metrics, retention, and cleanup | Not implemented |

## 5. Target User Journeys

### 5.1 Create a Workspace

1. An administrator creates a team.
2. They provide a name and invite or associate members with the team.
3. Members can only access data belonging to their team.

### 5.2 Connect an Application

1. A team administrator creates an API key.
2. TRCE displays the secret only once.
3. The client configures the key in its runtime environment.
4. The client sends events to the ingestion endpoint.
5. TRCE authenticates the API key, identifies the associated team, validates the payload, and applies filtering rules.

### 5.3 Inspect a Replay

1. The user selects a team.
2. They filter replays by date range, HTTP method, URL, status code, or correlation ID.
3. They open a replay and inspect its metadata and authorized content.
4. They can export the replay or share a reference to it, depending on their permissions.

### 5.4 Replay an HTTP Exchange — To Be Validated

1. The user selects a replay.
2. They choose an authorized target and the parameters they want to modify.
3. TRCE executes the replay in an isolated worker.
4. TRCE stores the replay execution result and allows comparison with the original exchange.

Replay execution must never be implemented as a simple function that freely sends requests to a URL provided by the user. SSRF risks, data exfiltration, and unintended side effects must be addressed at the architecture level.

## 6. Business Entities to Consider

The following entities are proposed and have not yet been implemented, with the exception of `User` and `Team`.

- **User**: Human identity, email address, and global role.
- **Team**: Workspace and data isolation boundary.
- **TeamMember**: Association between a user and a team, including their role within that team.
- **ApiKey**: Technical identity associated with a team, including secret hash, scopes, status, expiration, and last usage.
- **Replay**: Metadata describing a captured exchange: HTTP method, normalized URL, timestamp, status code, duration, size, and correlation identifiers.
- **ReplayPayload**: Reference to stored request/response bodies and headers, ideally in object storage.
- **ReplayExecution**: Replay attempt, target, status, duration, and result.
- **AuditEvent**: Important security or administrative action.

## 7. Product Principles

1. **Team-first**: Every business data entity must explicitly belong to a team.
2. **API-first ingestion**: The ingestion interface must be documented and versioned.
3. **Privacy by default**: Secrets, personal data, and sensitive payloads must be masked or excluded by default.
4. **Traceability**: Every important operation must be correlatable and auditable.
5. **Safe replay**: Replay executions must be explicit, restricted, and isolated.
6. **Progressive disclosure**: Technical details must remain accessible without overwhelming summary views.

## 8. Business Questions to Resolve

Before stabilizing API contracts and the data schema, clarify the following points:

- Does a replay represent a single HTTP exchange, an entire session, a sequence of exchanges, or a scenario?
- Does the system capture both the request and response, or only one of them?
- Should replay execution be handled natively by TRCE or delegated to a client/agent?
- Are binary payloads supported? What is the maximum allowed size?
- What level of fidelity is required for headers, cookies, delays, and network errors?
- What are the data retention periods and data residency requirements?
- Is the product an internal single-tenant platform or a multi-tenant platform serving multiple customer organizations?
- Will guest users, custom roles, or SSO be required in the future?

## 9. Potential Success Metrics

- Average time required to find an exchange.
- Successful ingestion rate and ingestion latency.
- Captured data volume and storage consumption.
- Percentage of replay executions that produce usable results.
- Average incident diagnosis time.
- Number of active teams and ingestion clients.
