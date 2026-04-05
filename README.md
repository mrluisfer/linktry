<div align="center">

# Linktry

A customizable Linktree clone built with Next.js, TypeScript & Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-12-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A personal landing page to showcase all your social links, embedded content, and online presence in one place — with support for Twitter embeds, Instagram posts, YouTube videos, and more.

</div>

---

<div align="center">
🥈 Second-place winner on the EDTeam platform, which featured more than 50 developers from the LATAM community in a contest to build the best Linktree clone using React. Check out the original challenge and my submission here:
<a href="https://ed.team/comunidad/crea-una-app-en-react-y-gana-un-mes-premium-en-edteam" target="_blank" rel="noopener noreferrer">
Build an app with React and win a month of EDteam Premium
</a>
</div>

## Features

- **Data-driven cards** — add links by editing a single file (`src/data.ts`), no component changes needed
- **Social media embeds** — native embeds for Twitter/X posts, Instagram cards, and YouTube videos
- **Responsive layout** — sidebar + masonry card grid that adapts from mobile to desktop
- **Dark mode** — built-in dark mode support via Tailwind CSS
- **Animated transitions** — smooth card animations powered by Framer Motion
- **Customizable profile** — avatar, bio, social links, all configurable from constants files

## Tech Stack

| Layer      | Technology                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 12](https://nextjs.org/) (Pages Router)                                                                                                                    |
| Language   | [TypeScript](https://www.typescriptlang.org/)                                                                                                                       |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) + [Radix UI Themes](https://www.radix-ui.com/)                                                                             |
| State      | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                                            |
| Animations | [Framer Motion](https://www.framer.com/motion/)                                                                                                                     |
| Embeds     | [react-social-media-embed](https://github.com/nicholasareed/react-social-media-embed) / [react-twitter-embed](https://github.com/saurabhnemade/react-twitter-embed) |

## Getting Started

### Prerequisites

- Node.js >= 16
- npm

### Installation

```bash
git clone https://github.com/mrLuisFer/linktry.git
cd linktry
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── pages/             # Next.js pages (single route: index)
├── components/
│   ├── core/
│   │   ├── Cards/     # Base card components and skeleton loaders
│   │   └── Embeds/    # Twitter, Instagram, YouTube embed components
│   └── home/
│       ├── CardsLayout/  # Masonry grid + card type selector
│       └── Sidebar/      # Profile sidebar (header, avatar, footer)
├── constants/
│   ├── userConfig.ts  # Personal info (name, avatar, bio)
│   └── socialLinks.ts # Social platform links for sidebar
├── data.ts            # Card data array — main content source
├── store/             # Zustand stores
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## Customization

### 1. Update your profile

Edit `src/constants/userConfig.ts` with your personal information:

```ts
export const userConfig = {
  avatar: '/assets/avatar.jpg',
  firstName: 'Your Name',
  username: 'yourUsername'
  // ...
}
```

### 2. Update sidebar social links

Edit `src/constants/socialLinks.ts` to add or modify sidebar links.

### 3. Add link cards

Add entries to `src/data.ts`. Each card needs at minimum:

```ts
{
  id: generateId(),
  type: 'github',       // card type
  url: 'https://...',   // destination URL
  title: 'My GitHub',   // card title
}
```

**Available card types:** any string for base cards (rendered with `BaseCardWithProps`), or use `tweet`, `instagramCard`, `youtube` for embedded content.

### 4. Add a new card type

1. Create a component in `src/components/core/Embeds/`
2. Add a case in `src/components/home/CardsLayout/CardsSelect.tsx`

## Available Scripts

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start development server  |
| `npm run build`  | Create production build   |
| `npm start`      | Start production server   |
| `npm run lint`   | Run ESLint                |
| `npm run format` | Format code with Prettier |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes with a descriptive message
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  Made by <a href="https://github.com/mrLuisFer">Luis Alvarez</a>
</div>
