# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build; `vite-plugin-remove-console` strips `console.*` calls
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint with `--fix` over `.vue/.js/.jsx/.cjs/.mjs` (uses `@vue/eslint-config-prettier` via `@rushstack/eslint-patch`)
- `npm run format` — Prettier write across `src/`

There is no test runner configured. `src/util/__tests__/` exists but is empty.

## Environment

Supabase credentials are required for auth and profile features (see `.env.example`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Without these, the app builds but the auth gate in `App.vue` blocks every route except `/` and `/support-me`.

## Architecture

Vue 3 (Composition API, `<script setup>`) + Vite + Pinia + Vue Router 4. UI uses Element Plus alongside Tailwind CSS and SASS. The `@/` alias resolves to `./src/` (configured in both `vite.config.js` and `jsconfig.json`).

### Auth-gated routing

[src/App.vue](src/App.vue) is the single auth gate — not the router. Logic:

- `/` → always public (Home)
- `/support-me` → always public
- any other route → renders `<Auth />` (login screen) unless `authStore.session` is truthy

This means **adding a new public route requires editing `App.vue`**, not just [src/router/index.js](src/router/index.js). Route definitions carry no meta/guards.

Session is hydrated in `App.vue`'s `onMounted` via `authStore.initialize()`, which calls `supabase.auth.getSession()` and subscribes to `onAuthStateChange`.

### Supabase integration

[src/supabase.js](src/supabase.js) exports a singleton client. Auth state lives in [src/stores/authStore.js](src/stores/authStore.js) (email/password, GitHub OAuth, Google OAuth, sign-out, profile fetch from a `profiles` table). User-facing errors/success flow through Element Plus's `ElMessage`.

### Data layer — static JSON, not an API

The "frontend collection" content (curated websites, video tutorials, quiz questions) ships as JSON under [src/data/](src/data/):

- `data/websites/*.json` — language/topic resource lists
- `data/videos/*.json` — video tutorial lists
- `data/quiz-questions/*.json` — quiz banks per language

All reads go through [src/util/getData.js](src/util/getData.js), which:

1. Statically imports every JSON file at the top.
2. Exposes `getData(language, type)` keyed off `DATA_MAPPINGS` (with `type === "%"` returning all buckets for a language).
3. For website entries, prefixes icon paths from `ICON_PATHS` — only programming-language buckets get this treatment.
4. Exposes `searchForData(searchText)` which concatenates every bucket and filters by `title`/`description`.

**Adding a new language or category** means: drop the JSON, add an import, add an entry to `DATA_MAPPINGS` (and `ICON_PATHS` if applicable), and add the spread in `searchForData`. Forgetting any of these silently drops the data.

### Stores

Pinia stores in [src/stores/](src/stores/) — `authStore`, `quizStore`, `userStore`. All use the setup-function (composition) style: `defineStore('name', () => {...})`.

### Layout

[src/layout/index.vue](src/layout/index.vue) wraps every route with `<Navbar>` and a slot. The `MusicPlayer` view is rendered both at this layout level (as a floating overlay toggled from the navbar) and as a routed page at `/music-player`.

### Build extras

- `vite-plugin-pwa` (autoUpdate, 5 MB workbox cache cap) — the app is an installable PWA with a manifest defined inline in [vite.config.js](vite.config.js).
- `vite-plugin-remove-console` strips logs in production, so don't rely on `console.log` for production telemetry.
