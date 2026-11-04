# Agent Guide — TRCE Frontend

## 1. Stack and code locations

- React 19 and TypeScript;
- Inertia.js 2 for pages served by AdonisJS;
- Vite 7 for development and builds;
- Tailwind CSS 4;
- Base UI primitives, local components, and `class-variance-authority`;
- Lucide React for icons.

Main locations:

- `inertia/pages/`: routed pages (directories reflect product areas or user journeys);
- `inertia/components/`: reusable application components;
- `inertia/components/ui/`: shared visual primitives and components;
- `inertia/layouts/`: authenticated and authentication layouts;
- `inertia/hooks/`: shared hooks;
- `inertia/lib/`: utility functions;
- `inertia/css/app.css`: global tokens and styles.

## 2. Page composition

- A page orchestrates screen composition and its local state; it should not contain all repeated presentation logic.
- Define a props type for every page, starting from the shared types in `inertia/types.ts` and any required generated types.
- Do not import a backend Lucid model as a serialization contract for React. Define a props type suited to the data actually sent by the controller/transformer.
- Use the existing Inertia helpers (`Form`, `Link`, navigation) and route names defined in `start/routes.ts`.
- When changing a form, cover validation errors, submission state, success, and navigation back to the appropriate screen.
- Do not treat visibility checks in React as authorization: the backend must protect every route and resource.

## 3. Components and styles

- Reuse components from `inertia/components/ui/` before creating a new one.
- If a pattern is shared by several pages, extract it into a reusable component with a simple, typed API.
- Follow the variants and conventions of components built on Base UI and class-variance-authority.
- Use semantic Tailwind/CSS tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, etc.) instead of arbitrary colors.
- Do not recreate a button, modal, input, menu, toast, or alert if a local component already exists.
- Use Lucide React for icons; keep size, alignment, and meaning consistent.
- Do not rebuild the logo as text or CSS: use the existing SVG variants.
- Do not introduce a second component library or a new token system without an explicit decision.

## 4. TRCE visual identity

The interface should remain a developer tool: readable, precise, information-dense without being cluttered, and focused on diagnosis.

- Preserve the turquoise/green brand color and the Inter typeface.
- Respect the existing tokens in `inertia/css/app.css`; the OKLCH values in the CSS are the source of truth.
- Use status colors consistently and semantically; do not use color for decoration alone.
- Keep tables and technical data readable on desktop; adapt columns or switch to cards on mobile when necessary.
- Account for loading, empty, error, success, disabled, hover, and focus states.
- Respect keyboard focus states, labels, accessible attributes, and contrast.
- `.dark` tokens exist, but do not claim that theme switching is functional until the preference flow and persistence have been implemented.

The full rules and visual references are in `docs/design-system.md`.

## 5. Sensitive data

- Never store an API key, session token, or secret in `localStorage`, a URL, or durable global state.
- Do not display `Authorization` headers, cookies, or sensitive replay bodies without an explicit business rule for redaction and server-side authorization.
- Avoid sample data containing real secrets or personal data.
- Sensitive information passed to the frontend must be explicitly filtered by the server; the frontend must not attempt to hide data that has already been exposed in its props.

## 6. Frontend checks

After making changes:

- run `npm run typecheck` (it checks both the backend and Inertia TypeScript projects);
- run `npm run lint`;
- run `npm run build` for structural or Vite-related changes;
- add suitable component/utility tests or browser tests when the user behavior warrants them.

Do not remove or bypass a TypeScript error with `any`, `@ts-ignore`, or a type assertion without explaining why a more precise check is not possible.
