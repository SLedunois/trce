# TRCE Developer Guide

## 1. Prerequisites

- Node.js **24 or later** (`package.json` declares `engines.node >=24`).
- npm (the repository contains a `package-lock.json` file).
- Docker Compose to start local dependencies.
- Git.

The repository targets AdonisJS **7.6.0**. After changing the version, refer to the [upgrade guide](upgrade-adonisjs-7.6.0.md) before running `npm ci` if the lockfile has not yet been regenerated.

## 2. Local Development Setup

### 2.1 Clone and Configure the Project

```bash
npm ci
cp .env.example .env
```

Generate an application key:

```bash
node ace generate:key
```

Set the generated value as `APP_KEY` in `.env`.

### 2.2 Start Dependencies

```bash
docker compose up -d db whodb mailpit
```

Services provided by `docker-compose.yml`:

| Service | Local Port | Purpose |
|---|---:|---|
| PostgreSQL 18 (`db`) | 5432 | Database |
| WhoDB (`whodb`) | 8080 | Database exploration interface |
| Mailpit (`mailpit`) | 1025 SMTP / 8025 UI | Local email capture |

The local PostgreSQL credentials defined in Compose are `trce` / `trce`, with `trce` as the database name. They are reserved for local development and must never be reused in production.

### 2.3 Example Local Configuration

Example local configuration using PostgreSQL and Mailpit:

```dotenv
NODE_ENV=development
HOST=localhost
PORT=3333
LOG_LEVEL=debug

APP_KEY=<key-generated-with-node-ace-generate-key>
APP_URL=http://localhost:3333

DB_TYPE=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=trce
DB_PASSWORD=trce
DB_DATABASE=trce

SESSION_DRIVER=cookie

MAIL_MAILER=smtp
MAIL_FROM_NAME=TRCE local
MAIL_FROM_ADDRESS=trce@localhost
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
```

The `config/database.ts` configuration uses PostgreSQL by default (`DB_TYPE` fallback is `pg`). SQLite can be selected with `DB_TYPE=sqlite`; in that case, Lucid uses `tmp/db.sqlite3`.

The `config/session.ts` configuration defines the `cookie` and `database` stores. Although the environment validator also accepts the value `memory`, no `memory` store is declared in this configuration. Use `cookie` or `database` until this inconsistency is addressed.

### 2.4 Run Migrations and Start the Application

```bash
node ace migration:run
npm run dev
```

- Application: `http://localhost:3333`
- Mailpit: `http://localhost:8025`
- WhoDB: `http://localhost:8080`

## 3. Create an Administrator

The `generate:admin` command expects three flags:

```bash
node ace generate:admin \
  --email=admin@example.test \
  --firstname=Admin \
  --lastname=TRCE
```

It generates a random temporary password, creates a user with the `admin` role, and displays the password in the terminal. The password must be transmitted securely and changed during the first login.

> Warning: The command must be fixed so that unrecognized SQL errors are not treated as successful user creation. Do not use it as a production provisioning procedure until this issue has been addressed.

## 4. Available Commands

```bash
npm run dev        # Local development server with HMR
npm run build      # Production compilation / build
npm run start      # Start the production build
npm run test       # Japa test suites
npm run lint       # ESLint
npm run typecheck  # Backend and frontend TypeScript checks
npm run format     # Prettier formatting across the entire repository
```

Useful Adonis/Lucid commands:

```bash
node ace list
node ace migration:run
node ace migration:rollback
node ace migration:status
node ace generate:key
```

## 5. Code Organization

| Location | Responsibility |
|---|---|
| `app/controllers` | HTTP handling, input validation, orchestration |
| `app/services` | Reusable business logic |
| `app/models` | Lucid models and relationships |
| `app/policies` | Bouncer authorization policies |
| `app/validators` | VineJS schemas |
| `app/transformers` | Transforming models into data suitable for exposure |
| `app/middleware` | Cross-cutting HTTP behavior |
| `database/migrations` | Database schema changes |
| `inertia/pages` | React pages routed through Inertia |
| `inertia/components` | Application components and UI components |
| `inertia/layouts` | Authenticated and unauthenticated layouts |
| `inertia/css/app.css` | Design tokens and global styles |
| `start/routes.ts` | HTTP routes |
| `config` | Provider and service configuration |

## 6. Recommended Conventions

### Backend

- Keep controllers thin: validate input, authorize the operation, call a service, and produce a response.
- Any business rule that goes beyond a simple CRUD operation must live in a service.
- Every operation on a team-owned resource must verify team membership on the server side.
- Use VineJS for user input and API payload validation.
- Use Bouncer for explicit authorization checks; a declared policy that is never called does not protect anything.
- Use transformers/DTOs to avoid exposing Lucid models directly.
- Use database transactions and SQL constraints for multi-entity operations.

### Frontend

- Reuse components from `inertia/components/ui`.
- Keep pages focused on composition and screen state.
- Extract reusable logic into hooks or components.
- Use typed Inertia props and do not import a backend model as a screen payload type.
- Provide loading, empty, error, success, and disabled states.

### Naming Conventions

- `PascalCase` for classes and React components.
- `camelCase` for TypeScript functions, variables, and properties.
- Backend files use `snake_case.ts`, following the existing conventions.
- API routes for future public interfaces must use the `/api/v1/...` prefix.

## 7. Testing

AdonisJS is configured with Japa and three test suite locations:

- `tests/unit/**/*.spec.{ts,js`;
- `tests/functional/**/*.spec.{ts,js`;
- `tests/browser/**/*.spec.{ts,js`.

The provided repository does not yet contain business-level tests in these directories. The following should be implemented as a priority:

1. Authentication, sessions, and password changes.
2. Admin/user access to teams.
3. Isolation between two different teams.
4. API key creation, revocation, and validation.
5. Valid, invalid, oversized, and unauthorized ingestion requests.
6. Secret redaction and data retention.
7. Replay feature security, if replay execution is retained.

Authorization tests must verify denied access (403/404, depending on the chosen policy), not just successful scenarios.

## 8. Build and Release

Before each release:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

The target CI/CD pipeline should then build an immutable Docker image, scan dependencies and the image, publish the image with a versioned tag, run database migrations in a controlled step, and then deploy the application.

The provided repository does not contain an application Dockerfile or a CI/CD pipeline. The `docker-compose.yml` file is intended for development dependencies; it is not a production application deployment configuration.

## 9. Known Issues and Considerations

- Node.js 24+ is required.
- `.env.example` must declare `SESSION_DRIVER`, as the environment schema makes it mandatory.
- `SESSION_DRIVER=memory` is accepted by the schema, but the corresponding store is not configured.
- `DB_TYPE` defaults to `pg`, despite the "SQLite connection (default)" comment in `config/database.ts`.
- The Users, Profile, and Replays pages are placeholders.
- Team show/update/delete actions have not been implemented.
- The business API has not yet been declared.
