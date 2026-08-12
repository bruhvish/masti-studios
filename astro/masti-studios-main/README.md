# Masti Studios — Astro + React

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:4321).

## Project structure

```
src/
  components/       React components (Nav, Hero, Services, Marquee, ReelTeaser, CTA, Footer, WorkFilter)
  layouts/
    BaseLayout.astro  shared <head>, fonts, meta tags
  pages/
    index.astro       homepage
    work.astro        portfolio page (Fashion / F&B / Automobile / Real Estate filter)
  styles/
    global.css        all design tokens + component styles
  siteConfig.ts        Google Form link, Instagram handle, contact email — edit here
```

## Before you launch

- Open `src/siteConfig.ts` and swap `GOOGLE_FORM_URL` for your real Google Form link.
- The site currently has `noindex, nofollow` set in `BaseLayout.astro` so it won't show up in
  search engines. Remove that `<meta>` tag when you're ready to be publicly searchable.
- Portfolio project entries (client names, thumbnails) live in
  `src/components/WorkFilter.tsx` — replace the placeholder `PROJECTS` array with real work.

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

This outputs a static site into `dist/`, deployable to Netlify, Vercel, Cloudflare Pages, or
any static host — drag the `dist/` folder in, or connect the repo for automatic deploys.

## Note

This project was hand-written and hasn't been build-tested in this environment (no internet
access in the sandbox that generated it). Run `npm install && npm run dev` locally to confirm
everything compiles — if you hit an error, paste it back and I'll fix it.
