# Contributing

Thanks for your interest! This project is a fully client-side Vue 3 + Vite app — no backend, no API keys, nothing to set up.

## Get running locally

```sh
git clone https://github.com/kzt-kingston/fe-collection
cd fe-collection
npm install
npm run dev
```

Open the URL Vite prints (usually <http://localhost:5173>).

## Before you open a PR

- `npm run lint` — must pass.
- `npm run format` — keeps things consistent.
- `npm test` — must pass.
- `npm run build` — sanity-check the production bundle.

## Adding catalog content

Resources, videos, and quiz questions are static JSON files under [`src/data/`](src/data/).

- **A new resource or video** for an existing language: edit the matching JSON file in `src/data/websites/` or `src/data/videos/`.
- **A new language or category**: add a single entry to the `REGISTRY` array in [`src/util/getData.js`](src/util/getData.js). That one entry wires up the listing, search, and icon prefix.
- **A new quiz language**: add a JSON file under `src/data/quiz-questions/` and wire it up in [`src/stores/quizStore.js`](src/stores/quizStore.js).

## Code style

- Vue 3 Composition API, `<script setup>`.
- Tailwind for layout/utilities; Element Plus for complex widgets.
- Prefer `localStorage`-only persistence — the app has no backend by design.

## Reporting issues

Open a GitHub issue with steps to reproduce. Screenshots help.
