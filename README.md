# Frontend Collection

A curated, fully client-side collection of frontend learning resources — websites, video tutorials, and quiz questions across HTML, CSS, SASS, JavaScript, TypeScript, Vue, React, React Native, Angular, Flutter, Git, and more. No backend, no sign-in, no tracking.

<img width="941" height="844" alt="image" src="https://github.com/user-attachments/assets/44ddba67-b31e-4f66-aa98-c57fd38ab2df" />

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`) + **Vite**
- **Pinia** for state, **Vue Router 4** for routing
- **Element Plus** + **Tailwind CSS** + **SASS** for UI
- Installable as a **PWA** (`vite-plugin-pwa`)

## Getting Started

```sh
npm install
npm run dev
```

That's it — no environment variables, no API keys, nothing to configure.

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
├── components/    # Shared UI (Navbar, Drawer, Quiz, AI/ImageSearch, …)
├── views/         # Route-level pages (Home, Resource, Quiz, Bookmark, …)
├── data/          # Static JSON: websites/, videos/, quiz-questions/
├── stores/        # Pinia stores (quizStore)
├── router/        # Vue Router definitions
├── util/          # getData.js — central reader for data/*.json
└── locale/        # English + Burmese dictionary
```

The `@/` alias maps to `./src/`. Bookmarks and quiz progress are persisted in `localStorage` only.

## Recommended IDE

[VSCode](https://code.visualstudio.com/) with the [Vue (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Disable Vetur if installed.

## License

MIT — see [LICENSE](LICENSE) if included, or feel free to use freely.
