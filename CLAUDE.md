# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Linktry is a personal Linktree-style landing page built with Next.js 12 (Pages Router), React 17, TypeScript, and Tailwind CSS. It displays social/profile links as cards in a masonry layout alongside a sidebar with user info.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint via `next lint`
- `npm run format` — Prettier formatting

## Architecture

**Single-page app** — only one route (`src/pages/index.tsx`) with two main sections: `Sidebar` (left) and `CardsLayout` (right, masonry grid of link cards).

**Data-driven cards** — all card content lives in `src/data.ts` as an `ICardData[]` array. Each entry has a `type` field that determines rendering via `CardsSelect` (switch on type: `tweet`, `instagramCard`, `youtube`, or default `BaseCardWithProps`).

**Configuration files:**
- `src/constants/userConfig.ts` — personal info (name, avatar, bio, location)
- `src/constants/socialLinks.ts` — social platform links used by the sidebar
- `src/data.ts` — card data for the main content grid

**Key patterns:**
- Card types: base cards (`src/components/core/Cards/Base/`) vs embed cards (`src/components/core/Embeds/`) for Twitter, Instagram, YouTube
- State management: Zustand store (`src/store/imgModalStore.ts`) for image modal
- Styling: Tailwind CSS + Radix UI Themes + Chakra UI (mixed — Radix wraps the app in `_app.tsx`)
- Types defined in `src/types/index.d.ts` (`ICardData`, `IBaseCardProps`)

**To add a new link card:** add an entry to `src/data.ts`. For a new card *type*, add a case in `CardsSelect.tsx` and create the corresponding component.
