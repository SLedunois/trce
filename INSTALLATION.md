# Installing the TRCE AI Agent Instructions Pack

This archive contains only the instruction and governance files to add to the TRCE repository. It does not replace any application files or existing documents in `docs/`.

From the root of the TRCE repository, extract the archive while preserving the directory paths:

```bash
unzip trce-agent-files-root.zip -d .
```

The files included are:

- `AGENTS.md` and `CONTEXT.md` at the repository root;
- `CLAUDE.md` for Claude Code;
- `.github/copilot-instructions.md` for GitHub Copilot;
- `docs/agents/` for specialized instructions;
- `docs/adr/` for recording architecture decisions.

OpenCode can use `AGENTS.md` as repository instructions. Tools that support `AGENTS.md` can therefore share the same baseline without duplicating rules across multiple files.

After extraction, check `git status` and then commit these files. Do not overwrite an existing local version without reviewing the differences.
