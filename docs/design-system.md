# TRCE — Design System

> This document describes the design tokens and components identified in the repository, then establishes usage guidelines to ensure a consistent user interface. Values marked as recommendations have not necessarily been implemented yet.

## 1. Visual Principles

The product should feel like a developer tool: precise, readable, information-dense without being cluttered, and focused on diagnostics. The existing interface uses a light foundation, a turquoise/green brand color, Inter typography, and understated components.

Guiding principles:

- Prioritize the readability of data and interface states.
- Provide stable and predictable navigation.
- Use a level of information density suited to tables and technical views.
- Use colors to convey meaning, not merely for decoration.
- Maintain consistent components and states across all pages.
- Ensure responsive layouts without sacrificing important information.

## 2. Brand Identity

### 2.1 Logo

The SVG logo variants are available in:

- `inertia/images/trce-logo.svg`;
- `inertia/images/trce-logo-small.svg`;
- `trce-logo-v3.svg` at the repository root.

The logo primarily uses turquoise `#00786f`, its accent color `#44aca2`, and a dark wordmark `#1a0a2e`. Use the existing SVG files rather than recreating the logo with CSS or text.

Guidelines:

- Use the full version in the expanded sidebar and on authentication screens.
- Use the compact version in the collapsed sidebar.
- Preserve proportions and contrast.
- Do not recolor the logo dynamically without an approved brand variant.

## 3. Colors

### 3.1 Currently Defined Tokens

The values below come from `inertia/css/app.css`. The OKLCH values are the source of truth for the implementation.

| CSS Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.148 0.004 228.8)` | Global background |
| `--foreground` | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` | Primary text |
| `--card` | `oklch(1 0 0)` | `oklch(0.218 0.008 223.9)` | Card surface |
| `--primary` | `oklch(0.511 0.096 186.391)` | `oklch(0.437 0.078 188.216)` | Primary action / accent |
| `--primary-foreground` | `oklch(0.984 0.014 180.72)` | `oklch(0.984 0.014 180.72)` | Text on primary |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Secondary surface |
| `--muted` | `oklch(0.963 0.002 197.1)` | `oklch(0.275 0.011 216.9)` | Subtle surface |
| `--muted-foreground` | `oklch(0.56 0.021 213.5)` | `oklch(0.723 0.014 214.4)` | Secondary text |
| `--accent` | `oklch(0.511 0.096 186.391)` | `oklch(0.437 0.078 188.216)` | Interactive accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Destructive actions / states |
| `--border` | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 10%)` | Borders |
| `--input` | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 15%)` | Input outlines |
| `--ring` | `oklch(0.723 0.014 214.4)` | `oklch(0.56 0.021 213.5)` | Focus indicator |

The sidebar tokens (`--sidebar*`) and the five chart tokens (`--chart-1` through `--chart-5`) are also defined in the stylesheet. Chart colors currently use a neutral range rather than a business-specific categorical palette.

### 3.2 Status Colors — Guidelines to Follow

UI components should rely on semantic colors combined with textual labels. The colors below describe the intended meaning; they do not replace the CSS tokens already available.

| Status | Meaning | Recommended presentation |
|---|---|---|
| Success | Operation completed successfully | Green + "Success" label |
| Warning | Attention required, action still possible | Amber + explanation |
| Error | Failure or blocking action | Red + cause / corrective action |
| Info | Neutral information | Blue or subtle accent + label |
| Pending | Processing in progress | Neutral gray/blue + progress indicator |
| Disabled | Feature unavailable | Reduced contrast without disappearing |

Never communicate a status through color alone: always add text, an icon, or another accessible indication.

## 4. Typography

### Existing Implementation

- Font family: **Inter Variable**, imported through `@fontsource-variable/inter`.
- `--font-sans` uses Inter Variable.
- `--font-heading` currently references `--font-sans`.
- Buttons use `text-sm` and `font-medium`.

### Recommended Type Scale

| Usage | Suggested size | Weight |
|---|---:|---|
| Page title H1 | 28–32 px | 600–700 |
| Section heading H2 | 20–24 px | 600 |
| Card heading H3 | 16–18 px | 600 |
| Body text | 14–16 px | 400 |
| Field label | 13–14 px | 500 |
| Metadata / helper text | 12–13 px | 400 |
| Code, IDs, tokens | Monospace font | 400–500 |

This scale is a design system recommendation. It should be implemented through shared typography classes or components to avoid arbitrary font sizes across individual pages.

## 5. Spacing, Dimensions, and Shapes

### Existing Implementation

- Base radius: `--radius: 0.625rem` (10 px).
- Derived radii: `sm = 0.6 × radius`, `md = 0.8 × radius`, `lg = radius`, `xl = 1.4 × radius`, etc.
- Default button height: Tailwind `h-9` (36 px), `sm` size: 32 px, `lg` size: 40 px.
- Default icon button size: 36 × 36 px.

### Recommendations

Use a spacing scale based on 4 px: 4, 8, 12, 16, 24, 32, 40, and 48 px. Reserve larger spacing values for separating page sections or defining page margins.

| Element | Recommendation |
|---|---|
| Standard input | Height: 36–40 px |
| Standard button | 36 px, already implemented |
| Prominent button | 40 px |
| Input/button radius | Existing `md` / `lg` radius |
| Card | 16–24 px padding depending on information density |
| Spacing between fields | 12–16 px |
| Spacing between sections | 24–32 px |
| Form content width | Maximum 400–480 px |

## 6. Component Library

Local components are grouped under `inertia/components/ui`. They should be preferred over introducing a new dependency or creating isolated styles.

| Available component | Intended usage |
|---|---|
| `Button` | Primary, secondary, subtle, destructive, and link actions |
| `Card` | Grouping related information |
| `Alert` | Persistent contextual message |
| `Avatar` | User or team member identity |
| `Breadcrumb` | Navigation context |
| `Dialog` | Confirmations and short forms |
| `DropdownMenu` | Secondary actions and user menu |
| `Empty` | Empty state with an explanation and relevant action |
| `Field`, `Label`, `Input` | Consistent and accessible forms |
| `PasswordInput` | Password entry with controllable visibility |
| `Item` | List row or item |
| `PageHeader` | Page title and associated actions |
| `Separator` | Visual separation |
| `Sheet` | Side panel, especially on mobile |
| `Sidebar` | Main navigation |
| `Skeleton` | Loading placeholder |
| `Tooltip` | Short supplementary information |
| `Typography` | Shared typography styles |
| `Messages` | Form message presentation |

The UI foundation combines Base UI React, `class-variance-authority`, Tailwind CSS, and Lucide React. The `components.json` file configures the `base-vega` style and CSS variables.

## 7. Page Structure

### 7.1 Authenticated Application

The `inertia/layouts/default.tsx` layout assembles:

1. A navigation sidebar.
2. A header with a sidebar toggle and breadcrumbs.
3. A content area.
4. Toast notifications through Sonner.

The current navigation includes Replays, Teams, and Users. Profile is available from the user menu.

### 7.2 Authentication

The login, forgotten password, and password change pages use a separate layout without a sidebar. The logo is centered, and the content is displayed within a narrow column.

### 7.3 Business Page Template — Recommended

```text
Page
├── PageHeader
│   ├── Title + short description
│   └── Primary action (if authorized)
├── Filter / search bar (if needed)
├── Main content
│   ├── Skeleton while loading
│   ├── Empty state with next action if no data
│   ├── List / table / cards when data is available
│   └── Alert if persistent information needs to be displayed
└── Pagination / result information
```

A page must maintain a consistent reading order and must not hide loading errors behind a simple empty state.

## 8. Interaction Guidelines

### Buttons

- Use only one dominant primary action per area.
- Reserve `destructive` for deletions or irreversible actions.
- Use `outline`, `secondary`, or `ghost` for secondary actions.
- Icon-only buttons must have an accessible name (`aria-label`).
- Actions in progress must disable the control or display a loading state.

### Forms

- Every field must have a visible label.
- Help text and error messages must be associated with the relevant field.
- Errors must be explained in understandable terms and indicate how to fix them.
- Important validations must also be enforced on the server side.
- Sensitive values must never be pre-filled or unnecessarily returned.

### Technical Tables and Lists — Recommendation

For future replay and API key pages:

- Align numbers and durations consistently.
- Use a monospace font for technical identifiers.
- Visually truncate long strings while providing access to their complete values.
- Keep filters persistent in the URL when this improves shareability.
- Provide empty, error, loading, and no-results states.
- Avoid placing destructive actions directly in a row without confirmation.

## 9. Accessibility

Goal: aim for WCAG 2.2 AA compliance across the main user journeys.

- Full keyboard navigation and a consistent focus order.
- Visible focus indicators that are not hidden behind overlays.
- Sufficient contrast between text, backgrounds, and meaningful borders.
- Explicit labels and proper `label` / input associations.
- Dialogs with correctly trapped and restored focus, and keyboard dismissal.
- Decorative icons hidden from screen readers; standalone icons must have accessible names.
- Statuses communicated through more than color alone.
- Respect `prefers-reduced-motion`.
- Never use a placeholder as the only field label.

## 10. Responsive Design and Information Density

- Desktop: persistent sidebar, content that makes effective use of available width, and full tables.
- Tablet: reduce secondary columns while keeping filters and primary actions accessible.
- Mobile: use the sidebar as a sheet, keep actions accessible, and convert lists into cards when tables become unreadable.
- Very long technical values should be truncated or locally scrollable; avoid global horizontal scrolling.

## 11. Dark Mode

The `.dark` tokens are defined in `app.css`, but the repository does not yet show a user-facing selector or preference persistence. Dark mode is therefore **prepared at the CSS level**, but its user-facing workflow has not been confirmed.

Before announcing this feature as available, implement:

- A preference mechanism (system / light / dark).
- Persistence of that preference.
- Verification of every component and UI state.
- Contrast tests in both light and dark modes.

## 12. Design System Governance

- Add a shared UI component before duplicating its styling across multiple pages.
- Use semantic tokens rather than arbitrary colors.
- Every new component variant must be justified by a recurring use case.
- Verify focus, hover, disabled, loading, error, empty, and responsive states.
- Update this document whenever a token or pattern is modified.
