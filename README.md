# Frontend Collection

A curated collection of frontend learning resources — websites, video tutorials, and quiz questions across HTML, CSS, SASS, JavaScript, TypeScript, Vue, React, React Native, Angular, Flutter, Git, and more.

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`) + **Vite**
- **Pinia** for state, **Vue Router 4** for routing
- **Element Plus** + **Tailwind CSS** + **SASS** for UI
- **Supabase** for auth and user profiles
- Installable as a **PWA** (`vite-plugin-pwa`)

## Getting Started

```sh
npm install
npm run dev
```

Set up `.env` from `.env.example` if you want to enable Supabase auth:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Scripts

| Command           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                             |
| `npm run build`   | Production build (strips `console.*`)                |
| `npm run preview` | Serve the production build locally                   |
| `npm run lint`    | ESLint with `--fix` (Vue + Prettier config)          |
| `npm run format`  | Prettier write across `src/`                         |

## Project Structure

```
src/
├── components/    # Shared UI (Navbar, Drawer, Auth, Quiz, AI/ImageSearch, …)
├── views/         # Route-level pages (Home, Resource, Quiz, Bookmark, …)
├── data/          # Static JSON: websites/, videos/, quiz-questions/
├── stores/        # Pinia stores (auth, quiz, user)
├── router/        # Vue Router definitions
├── util/          # getData.js — central reader for data/*.json
├── locale/        # English + Burmese dictionary
└── supabase.js    # Supabase client singleton
```

The `@/` alias maps to `./src/`.

## Recommended IDE

[VSCode](https://code.visualstudio.com/) with the [Vue (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Disable Vetur if installed.
