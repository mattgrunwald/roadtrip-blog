# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Travel blog for a 2023 roadtrip (roadtrip.dog), built with Next.js (app router), Contentlayer2, and Tailwind CSS 4. Content is authored as MDX files and Contentlayer turns them into typed data at build time.

## Commands

- `pnpm run dev` — start dev server
- `pnpm run build` — production build (`next build --webpack`)
- `pnpm run lint` — oxlint (config in `.oxlintrc.json`)
- `pnpm run format` / `pnpm run format:check` — oxfmt (config in `.oxfmtrc.json`)
- `pnpm test` — run Vitest (`node` environment, globals on — see `vitest.config.mts`; for pure util functions only, no jsdom)
- Run a single test file: `npx vitest run util/imagePlacement/imagePlacement.spec.ts`
- Run tests matching a name: `npx vitest run -t "name pattern"`

Pre-commit (via husky + lint-staged) runs oxfmt, oxlint, and `vitest related --run` on staged `.ts/.tsx/.js/.jsx` files — don't bypass with `--no-verify`.

## Content model (Contentlayer)

`contentlayer.config.ts` defines the two document types that drive the whole site:

- **`Post`** — sourced from `content/posts/*.mdx`. Fields: `day` (number), `date`, `markers` (list of map pin coordinates for `TripMap`), `highlight` (boolean). Posts are named by day number (`content/posts/1.mdx` … `30.mdx`), plus special posts `home.mdx` and `epilogue.mdx`.
  - Computed field `galleryImages` calls `convertImages(doc.day)` (in `util/contentlayer-helpers/index.ts`), which reads `public/images/day/<day>/` at build time, generates blurred base64 previews with `sharp`, and derives image `Size` (Normal/Tall/Wide) from aspect ratio.
  - Computed field `path` is `posts/<day>` — used everywhere to look up a post via `allPosts.find(...)`.
- **`AboutPage`** — sourced from `content/about/*.mdx` (e.g. `site.mdx`, `van.mdx`). Computed `headings` field (via `util/headings.ts`) auto-generates a table of contents from MDX headings when `toc: true`.

Generated types/data land in `.contentlayer/generated` and are imported as `contentlayer/generated` (aliased in `tsconfig.json`). This directory is build output — regenerate by running `dev`/`build`, don't hand-edit it.

### Image naming convention

Files in `public/images/day/<day>/` are ordered and captioned by filename: a numeric/alpha prefix sets sort order, and the rest becomes alt text via `parseAltText` in `util/contentlayer-helpers/index.ts` (regex `^(\d|[a-z])+_(.+)\.`). Example: `1_desert_rock.jpg` sorts first and gets alt text "desert rock". Underscores become spaces.

## Gallery layout algorithm

`util/imagePlacement/imagePlacement.ts` implements a masonry-style bin-packing algorithm (`fitToGrid`) that places images of different sizes (Normal/Tall/Wide, from `util/types.ts`) into a fixed-column grid without gaps, processing images in order and back-filling free grid cells row by row. This is pure/testable logic — see `imagePlacement.spec.ts` for behavior reference before modifying it.

## Routing

- `/` (`app/page.tsx`) — renders the `posts/home` post.
- `/day/[day]` (`app/day/[day]/page.tsx`) — one route per day post; `generateStaticParams` statically generates all days from `allPosts`. Handles prev/next day navigation and links to `/epilogue` after day 30.
- `/epilogue`, `/pictures`, `/about/[name]` — additional routes, each resolving a document from `allPosts`/`allAboutPages` by `path`.

MDX bodies are rendered via `useMDXComponent` (`next-contentlayer2/hooks`) with custom component overrides (`components/mdx/Image.tsx`, `components/mdx/ContentLink.tsx`) passed in per-route.

## Styling conventions

Accent color and shared Tailwind class strings are centralized in `util/consts.ts` (e.g. `ACCENT_TEXT_CLASS`, `ACCENT_BORDER_CLASS`) — reuse these rather than hardcoding red-600/red-400 classes. Dark mode is class-based (`next-themes`, `attribute="class"`).
