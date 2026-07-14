## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: prettier, eslint, tailwindcss, mcp

## Project Overview

**Linktry** is a Bento-style link-in-bio (profile left, masonry board of cards right),
built with **SvelteKit 2 + Svelte 5 runes + Tailwind CSS 4**. A SvelteKit port of the
React project [`bento-me`](https://github.com/mrluisfer/bento-me). See `README.md` for
the full write-up.

### Architecture — data-driven

The whole page renders from one typed object; **data and presentation are decoupled**.

- `src/lib/types.ts` — domain contract (`AppContent`, `CardSection`, `LinkCardItem`, …).
- `src/lib/data/` — the single source of truth: `profile.ts`, `sections.ts`, `index.ts`.
  Adding a card or section is a **pure data edit** — no component changes.
- `src/lib/components/`
  - `icons/` — `Icon.svelte` + inline SVG registry (`icons.ts`); no icon dependency.
  - `profile/` — `ProfilePanel`, `Avatar`, `ProfileDetail`, `ThemeToggle`, `RepoButton`.
  - `cards/` — `CardRenderer` dispatches on `card.type` → `LinkCard`, `YoutubeEmbedCard`,
    plus `CardImages`, `GithubCalendar`, `GithubFollowers`.
  - `bento/` — `BentoBoard → Section → Masonry` (pure **CSS multi-column** masonry).
- `src/lib/seo.ts` + `components/Seo.svelte` — metadata + schema.org JSON-LD derived from
  the same `content`; page is **prerendered** (`+page.ts`), plus `sitemap.xml` + `robots.txt`.
- `src/lib/config.ts` — site config (`site.url`, handles, repo URL); update `site.url`
  after deploy since canonical/OG/sitemap derive from it.
- `src/routes/layout.css` — design tokens as CSS custom properties per `[data-theme]`,
  card/reveal primitives.

### Conventions

- **Svelte 5 runes only** (`$props`, `$state`, `$derived`, `$effect`); no legacy syntax.
- Client-only live data (GitHub API, contribution graph) uses `$effect` + `AbortController`
  and **always** falls back gracefully — never blocks or breaks SSR/prerender.
- Reactive collections use `SvelteSet`/`SvelteState`, not plain `Set`.
- Every anchor is an external outbound link (`target="_blank"`), hence
  `svelte/no-navigation-without-resolve` is disabled in `eslint.config.js`.
- Before finishing work, run `npm run check`, `npm run lint`, and `npm run build`.

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
