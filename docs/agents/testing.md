# Agent Guide — TRCE Testing

## 1. Test setup

The project uses Japa through `node ace test`. Test suites are declared in `adonisrc.ts`:

- unit: `tests/unit/**/*.spec.{ts,js}`;
- functional: `tests/functional/**/*.spec.{ts,js}`;
- browser: `tests/browser/**/*.spec.{ts,js}`.

`tests/bootstrap.ts` configures the Japa / AdonisJS plugins, browser client, session and authentication helpers, and runs migrations when tests start.

Always inspect the configuration and existing tests on the current branch before using a helper or suite name. Do not assume that every directory or test coverage already exists.

## 2. Which test level should you choose?

### Unit

Prefer unit tests for:

- functions and utilities that do not use the HTTP server;
- validators;
- policies and business rules;
- service methods with isolated dependencies;
- transformations and pure logic components.

### Functional

Prefer functional tests for:

- controllers and routes;
- authentication, sessions, and middleware;
- integrated validation and authorization;
- Lucid access and transactions;
- HTTP and API contracts.

### Browser

Prefer browser tests for:

- user journeys that cross React, Inertia, and the backend;
- form submission and error display;
- navigation, dialogs, and critical interactions.

Avoid testing the entire stack in every unit test. Keep tests fast and choose the level that protects the actual risk.

## 3. Conventions

- Organize files to mirror application domains/files, using the `.spec.ts` suffix.
- Use `test` from `@japa/runner` and the assertions provided by Japa.
- Use existing AdonisJS helpers and test factories when available.
- For tests requiring the database, isolate data between tests using transactions or cleanup helpers appropriate to the suite.
- Create explicit test data; avoid dependencies on execution order.
- Never use real accounts, secrets, SMTP services, or external APIs.
- Test observable behavior rather than private implementation details.

## 4. Scenarios to cover

For each business feature, consider at least:

1. successful case with an authorized user;
2. missing session or invalid authentication;
3. insufficient role;
4. attempt to access a resource belonging to another team;
5. missing, invalid, or out-of-range data;
6. duplicate / integrity conflict;
7. persistence or dependency failure when the code is expected to handle it.

Authorization tests must prove that an action is denied, not merely verify that an authorized case works.

## 5. Execution

Repository commands:

```bash
npm test
node ace test unit
node ace test functional
node ace test browser
npm run lint
npm run typecheck
npm run build
```

Before adding a dedicated npm command, check `package.json` and do not advertise a script that is not defined there.

For a localized change, run the targeted test if the runner supports it, then run the relevant full checks before finishing. `npm run build` is important for catching bundling/Vite issues that typechecking alone will not reveal.

## 6. Reporting results

In the task summary, specify:

- the commands actually executed;
- the success or failure of each command;
- the relevant suites / scenarios;
- checks that were not run and why.

Do not replace a failing test with a weaker assertion or a mock that removes the very behavior being tested. Do not say “all tests pass” if only a partial suite was run.
