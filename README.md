# Healthy Recipe Finder

Healthy Recipe Finder is a small recipe discovery site built with Astro and React. It demonstrates a modern static + client-side interactive architecture: pages are rendered with Astro (server/SSG) and interactive UI pieces are written in React.

The project includes a lightweight recipe data file (`data.json`), responsive recipe cards, a detailed recipe page, a servings counter (with ingredient amount scaling), and small UI niceties such as animations and filters.

## Features

- Browse a list of healthy recipes (static data in `data.json`).
- Recipe detail pages with ingredients and step-by-step instructions.
- Servings counter that scales ingredient amounts.
- Small client-side filters and search components.
- "More recipes" section showing 3 unique random recipes excluding the current one.
- Reusable React components and a simple global store (Zustand) for state where needed.

## Technologies

- Astro (pages & server-side rendering / SSG)
- React + TypeScript for interactive components
- Tailwind CSS for styling
- Zustand for small client-side state management (servings, ingredients)
- Framer Motion (optional) for UI animations
- pnpm as the package manager

## Project layout (important files)

- `data.json` — source of recipe data (title, slug, ingredients, images, prep/cook times).
- `public/images/` — recipe images referenced by `data.json` (static public assets).
- `src/components/react/` — interactive React components (ServingsCounter, ItemsList, CardGrid, Filters, etc.).
- `src/pages/recipes/[recipe].astro` — recipe detail page (server-rendered page that passes data to client components).
- `src/stores/useRecipeStore.ts` — small Zustand store used by client components.

## Getting started (development)

Prerequisites:

- Node.js 18+ (or compatible LTS)
- pnpm (recommended). If you don't have pnpm, install via npm: `npm i -g pnpm`.

Install and run:

```bash
pnpm install
pnpm dev
```

Open the site at http://localhost:4321 (default Astro dev port). The server console (where you ran `pnpm dev`) shows server-side logs (e.g., logs printed inside `.astro` top-level script sections). Client-side console logs (from React components) appear in the browser DevTools.

Build and preview:

```bash
pnpm build
pnpm preview
```

## Notes about data and images

- The app reads recipes from `data.json`; to add or edit recipes update that file. Keep image paths relative to the `public` folder (e.g. `/images/avocado-tomato-wholegrain-toast-small.webp`).
- If your images are currently under `src/assets`, move them to `public/images/` so they are served statically by Astro.
- Ingredient normalization: the project expects numeric `amount` values and string `unit` values; `null` amounts are treated as `0` and `null` units are rendered as empty strings.

## How the servings counter works

- `ServingsCounter` is a reusable React component (controlled or uncontrolled) located at `src/components/react/ServingsCounter.tsx`.
- A small Zustand store (`src/stores/useRecipeStore.ts`) keeps `servings` and `itemsIngredient` on the client so multiple components can read/update the current selection.
- The `ItemsList` component reads `servings` from the store and multiplies ingredient amounts by the selected number of servings. If you need per-recipe servings (not global), consider keying the store by recipe slug (I can help implement this).

## Client vs Server logging (important)

- `console.log` calls inside `.astro` top-level sections execute on the server and appear in the terminal where `pnpm dev` runs.
- `console.log` calls inside React components (or in `<script>` tags rendered to the page) execute in the browser and appear in DevTools.

## Contributing

- Create a branch for your change (e.g., `feat/add-recipe`) and open a PR.
- Keep changes focused: move images using `git mv` to preserve history, update `data.json` paths, and run the site locally to verify.

## Possible improvements / TODOs

- Make the store per-recipe (store keyed by slug) so different recipe pages don't share the same servings state.
- Improve amount formatting (fractions like `1 1/2` instead of decimals).
- Add unit/internationalization handling (metric vs imperial conversions).
- Add tests for components and store behavior.

## License

This repository is provided as-is. Add a LICENSE file if you intend to open-source it.

---

If you'd like, I can also add a short usage example showing how to wire the ServingsCounter into another component or add a CONTRIBUTING.md — tell me which one you prefer.
