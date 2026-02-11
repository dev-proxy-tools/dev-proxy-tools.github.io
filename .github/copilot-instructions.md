# Dev Proxy Website — Copilot Instructions

## Project Overview

Static marketing/docs website for [Dev Proxy](https://github.com/dotnet/dev-proxy) (an API simulator). Built with **Astro 5**, **Tailwind CSS v4**, and **TypeScript**. Deployed to `https://devproxy.net`.

## Architecture

- **Astro content collections** drive both content areas:
  - `src/content/blog/` — Markdown blog posts with YAML frontmatter (title, description, date, author, tags)
  - `src/content/samples/` — **Auto-generated** from `pnp/proxy-samples` GitHub repo. Never edit these manually.
- **Collection schemas** defined in `src/content.config.ts` using Zod
- **Single shared layout** at `src/layouts/Layout.astro` (nav, footer, dark/light theme toggle, SEO meta)
- **Pages** use file-based routing with `[slug].astro` dynamic routes for blog and samples
- **One reusable component**: `src/components/SampleGallery.astro` (client-side search over data attributes)

## Content Pipeline

### Samples (auto-generated — do not hand-edit)

`npm run fetch-samples` (runs `scripts/fetch-samples.ts`) shallow-clones `pnp/proxy-samples`, reads each sample's `assets/sample.json`, converts to Markdown with YAML frontmatter, rewrites relative image paths to raw GitHub URLs, and writes to `src/content/samples/`. This runs automatically before `dev` and `build`.

### Blog posts

Blog posts live in `src/content/blog/`. Required frontmatter:

```yaml
---
title: "Post title"
description: "Short description for cards and SEO"
date: 2025-09-23
author: "Author Name"
tags: ["release"]
---
```

The `scripts/import-blog-posts.ts` is a one-time migration script (imports from a local backup dir). Not part of regular workflow.

## Styling Conventions

- **Tailwind CSS v4** via Vite plugin (not PostCSS). Config in `astro.config.mjs`.
- **CSS custom properties** for theming — defined in `src/styles/global.css` under `:root` (light) and `.dark` (dark). Use `var(--bg-primary)`, `var(--text-muted)`, `var(--border-primary)`, etc. in inline styles.
- **Purple brand palette**: `--color-purple-400/500/600` and Tailwind's `text-purple-400`, `bg-purple-600`, etc.
- Rich text rendered via `.prose-content` class (custom typography styles in `global.css`, not `@tailwindcss/typography`)
- Inline `style` attributes with CSS variables for theme-aware colors; Tailwind classes for layout/spacing/transitions

## Key Patterns

- **`import.meta.env.BASE_URL`** — Always use this for internal links (configured as `/` in `astro.config.mjs`). Example: `` href={`${import.meta.env.BASE_URL}blog/`} ``
- **Slug handling** — Collection entry IDs include `.md` extension. Strip it for URLs: `post.id.replace(/\.md$/, '')`
- **Dark mode** — Applied via `.dark` class on `<html>`. Toggled client-side with `localStorage.setItem('theme', ...)`. Inline script in Layout prevents flash.
- **Animations** — Hero uses CSS `@keyframes` with staggered `animation-delay`. Sections use `IntersectionObserver` adding `.visible` class for scroll-triggered reveals.
- **Date formatting** — Use `en-GB` locale: `date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })`

## Pull Requests

When submitting a PR, always include a screenshot of the affected page(s) showing the visual result of the change. This is a website — reviewers need to evaluate the visual impact quickly.

## Development

```bash
npm install        # Install dependencies
npm run dev        # Fetch samples + start dev server (localhost:4321)
npm run build      # Fetch samples + production build to ./dist/
npm run preview    # Preview production build locally
```

`npm run dev` and `npm run build` both run `fetch-samples` first, which requires `git` on PATH and network access.

## File Structure Quick Reference

| Path | Purpose |
|------|---------|
| `src/content.config.ts` | Zod schemas for blog + samples collections |
| `src/layouts/Layout.astro` | Shared shell: nav, theme toggle, footer |
| `src/pages/index.astro` | Marketing homepage |
| `src/pages/blog/index.astro` | Blog listing (latest featured, grid for rest) |
| `src/pages/blog/[slug].astro` | Individual blog post with reading time |
| `src/pages/samples/index.astro` | Sample gallery with client-side search |
| `src/pages/samples/[slug].astro` | Individual sample detail page |
| `src/styles/global.css` | Theme variables, Tailwind import, `.prose-content` |
| `scripts/fetch-samples.ts` | Pulls samples from GitHub at build time |
