# AGENTS.md

Personal portfolio site (Leandro Jovan) built with **Vite 5 + React 18 (JSX, no TypeScript)**. Pure frontend, no backend/API, no tests, no lint/typecheck setup, not a git repo.

## Commands

- `npm run dev` — dev server, pinned to `127.0.0.1:5173` (see `vite.config.js`)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve built output

There is no test, lint, or format command — verification = `npm run build` + manual browser check.

## Architecture

- Entire app lives in **one file**: `src/App.jsx` (~630 lines). All content (projects, skills, contact info) is hardcoded data objects at the top (`projectDatabase`, `projectsList`, `skills`) — edit those to change content, don't restructure.
- `src/index.css` holds all styling as plain CSS classes (no Tailwind, no CSS modules, no component library). Class names are semantic BEM-ish (`.hero-section`, `.project-item`); match that pattern when adding UI.
- Icons come from `lucide-react`, except LinkedIn/Instagram/WhatsApp which are hand-written inline SVG components in `App.jsx` (lucide doesn't ship brand icons) — extend those inline SVGs for new social links.

## Gotchas

- **Static assets live at the repo ROOT**, not only in `public/` — `CV ATS.pdf`, `JopanHitamputih.png`, `fotogunung.jpg` exist in both places. Code references them as `/CV ATS.pdf` etc. (spaces in filenames, referenced literally). If updating an asset, replace the root copy used for serving; `public/` is the Vite-served copy.
- Root `index.html` loads Google Fonts (Bebas Neue, Inter, Space Grotesk, Space Mono) — the design depends on them; don't remove.
- Site content and UI copy are in **Indonesian (Bahasa Indonesia)**; `index.html` uses `lang="id"`. Keep new copy in Indonesian.
- `dist/` is committed in the working tree (no `.gitignore`, no git history) — it's deploy output; regenerate with `npm run build` rather than editing by hand.
