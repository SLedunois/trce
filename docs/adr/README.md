# Architecture Decision Records (ADR)

ADRs preserve foundational decisions and the reasons behind them. They prevent an agent or contributor from reintroducing an option that was already rejected or turning an assumption into a rule without validation.

Create a clearly named, numbered file, for example `0001-team-isolation.md`, using [`0000-template.md`](0000-template.md).

Create an ADR when a decision permanently changes:

- domain boundaries or application structure;
- the data model or a migration strategy;
- a public API contract or ingestion format;
- authentication, authorization, or isolation;
- storage, a queue, a worker, a dependency, or an infrastructure component;
- availability, retention, or security guarantees.

Do not create an ADR for a local implementation detail, a rename, or a fix with no architectural impact.
