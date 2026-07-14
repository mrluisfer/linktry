# Linktry — Bento profile

A modular, high-performance **Bento-style link-in-bio**, built with **SvelteKit + Svelte 5 + Tailwind CSS 4**.
Profile on the left, an advanced **masonry** board of cards on the right — inspired by [Bento.me](https://bento.me) (now part of Linktry) and a SvelteKit port of my React version, [`bento-me`](https://github.com/mrluisfer/bento-me).

![SvelteKit](https://img.shields.io/badge/SvelteKit-2-ff3e00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5%20runes-ff3e00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **Data-driven** — the entire page is described by a single typed `AppContent` object. Adding a card or a section is a pure data edit; no component changes.
- **True masonry** — pure CSS multi-column layout (no JS measuring loop, no reflow on resize), profile pinned on the left.
- **Live data** — GitHub followers, contribution calendar and repository stars fetched client-side, with graceful fallbacks.
- **First-class SEO** — dynamic meta + Open Graph + Twitter cards + schema.org JSON-LD (`ProfilePage` → `Person` with `sameAs`), `sitemap.xml`, `robots.txt`, all **prerendered** to static HTML.
- **Light / dark theme** — CSS-variable tokens with an anti-FOUC bootstrap and a toggle that persists to `localStorage`.
- **Motion, done right** — reveal-on-scroll powered by a single shared `IntersectionObserver` (GPU-only transforms), respecting `prefers-reduced-motion`.
- **Accessible & responsive** — semantic markup, focus-visible states, `aria-label`s, and layouts tuned for mobile, tablet and desktop.
- **Zero UI dependencies** — inline SVG icon registry and a tiny `cn` helper keep the bundle lean.

## 🧱 Tech stack

| Area      | Choice                                             |
| --------- | -------------------------------------------------- |
| Framework | SvelteKit 2, Svelte 5 (runes)                      |
| Language  | TypeScript (strict)                                |
| Styling   | Tailwind CSS 4 + CSS custom properties             |
| Build     | Vite                                               |
| Tooling   | ESLint, Prettier, `svelte-check`                   |
| Deploy    | `@sveltejs/adapter-auto` (Vercel / Netlify / Node) |

## 🚀 Getting started

Requires **Node.js 18+**.

```sh
# install dependencies
npm install

# start the dev server (add --open to launch the browser)
npm run dev

# type-check · lint · format
npm run check
npm run lint
npm run format

# production build + local preview
npm run build
npm run preview
```

## 📁 Project structure

```
src/
├─ lib/
│  ├─ types.ts                # Domain contract (data ≠ rendering)
│  ├─ config.ts               # Site config: canonical URL, handles, repo URL
│  ├─ seo.ts                  # buildSeo(content) → meta + JSON-LD graph
│  ├─ theme.svelte.ts         # Global light/dark state (rune class)
│  ├─ data/                   # ← single source of truth
│  │  ├─ profile.ts           #   left column
│  │  ├─ sections.ts          #   cards (social · work · projects)
│  │  └─ index.ts
│  ├─ actions/reveal.ts       # Shared IntersectionObserver reveal action
│  ├─ utils/                  # cn · formatCount
│  └─ components/
│     ├─ Seo.svelte
│     ├─ icons/               # Icon.svelte + inline SVG registry
│     ├─ profile/             # ProfilePanel · Avatar · ProfileDetail · buttons
│     ├─ cards/               # CardRenderer → LinkCard · YoutubeEmbedCard · …
│     └─ bento/               # BentoBoard → Section → Masonry
├─ routes/
│  ├─ +page.svelte            # Composition: profile (left) + masonry (right)
│  ├─ +page.ts                # export const prerender = true
│  ├─ layout.css              # Design tokens + card/reveal primitives
│  └─ sitemap.xml/+server.ts  # Prerendered sitemap
└─ static/                    # profile.webp, card images, robots.txt
```

## 🏗️ Architecture

Everything renders from one typed object, so **data and presentation stay fully decoupled**:

```
content (AppContent)
├─ profile   → ProfilePanel        (left, sticky on desktop)
└─ sections  → BentoBoard
              └─ Section → Masonry → CardRenderer → LinkCard / YoutubeEmbedCard
```

`CardRenderer` is the single dispatch point that switches on `card.type` — adding a new
kind of card means one new branch plus one component, nothing else.

## 🎨 Customization

### Add a card

Drop an object into the relevant section in `src/lib/data/sections.ts`:

```ts
{
  id: 'my-project',
  type: 'link',
  platform: 'My Project',
  username: 'my-project.com',
  url: 'https://my-project.com',
  icon: 'portfolio',                 // key from the icon registry
  title: 'My Project',
  subtitle: 'One punchy line about it.',
  images: ['/images/projects/my-project.webp'],
  singleImageMode: true,
  actionLabel: 'Open project',
  style: { accent: '#6366f1' }       // drives badge, CTA and hover glow
}
```

- `style.gradient: ['#from', '#to']` for a two-stop accent.
- `style.foreground: '#18181b'` for light accents that need dark text.
- `style.variant: 'compact'` for a small square tile.

### Add an icon

Register inline SVG markup in `src/lib/components/icons/icons.ts` (`stroke: true` for
lucide-style glyphs, omit it for filled brand marks) and add the key to
`CardIconKey` in `src/lib/types.ts`.

### Theme colors

All colors are CSS custom properties in `src/routes/layout.css`, defined per
`[data-theme]` — change them in one place for both light and dark.

## 🔍 SEO

`buildSeo(content)` derives all metadata from the same data that renders the page, so
it can never drift out of sync:

- `<title>`, description, keywords, canonical, robots.
- Open Graph (`profile`) + Twitter cards, with absolute image URLs.
- schema.org JSON-LD `@graph`: `WebSite` → `ProfilePage` → `Person` (with `sameAs`
  linking every social identity) + each project as a `CreativeWork`.
- Prerendered `/sitemap.xml` and `robots.txt`.

> After deploying, set your production domain in `src/lib/config.ts` (`site.url`) —
> canonical URLs, Open Graph and the sitemap all derive from it.

## ☁️ Deploy

The project uses `@sveltejs/adapter-auto`, which detects Vercel, Netlify, Cloudflare
and others automatically. For a specific target, swap in the matching
[adapter](https://svelte.dev/docs/kit/adapters).

## 🙌 Credits

Inspired by [Bento.me](https://bento.me) (acquired by Linktry) and ported from my React
implementation, [`bento-me`](https://github.com/mrluisfer/bento-me).
Built by [Luis Alvarez](https://mrluisfer.vercel.app/).
