# Handoff — Abdalrhman Jaffar Portfolio

Written for: the next Claude Code session picking up this project cold.

## What this project is

Personal portfolio site for Abdalrhman Jaffar (Frontend Developer), bilingual
AR/EN with RTL support, built around a custom visual identity called
**"The Octopus"**. Rebuilt from scratch this session as a Next.js app —
previously a Vite/React SPA.

## Stack

- **Next.js 15.5.25** (App Router), **React 19.1.0** — deliberately pinned to
  this stable line, not Next 16, per explicit user request for
  LTS-grade stability over bleeding edge. Do not bump the major version
  without asking first.
- Tailwind CSS v4 (CSS-based config, no `tailwind.config.js`)
- shadcn/ui components, hand-built correctly on **Radix primitives +
  class-variance-authority + tailwind-merge** (`src/components/ui/*`) — not
  the cosmetic-only version that existed briefly earlier in the session
- framer-motion (via `LazyMotion`/`domAnimation` for bundle size) —
  see "Motion system" below
- npm only (not yarn) — `package-lock.json` is the source of truth
- `postcss` pinned via `overrides` in package.json to close a transitive
  CVE without bumping Next's major version — don't remove that override
  without re-checking `npm audit`

## Routing / i18n

Locale-segment routing: `/ar` and `/en`, both statically prerendered at
build time (`generateStaticParams` in `src/app/[locale]/layout.tsx`).
Root `/` just redirects to `/ar` (default locale).

- `src/lib/i18n/config.ts` — locale list, `isRtl()` helper
- `src/lib/i18n/messages.ts` — the full AR/EN copy catalog (typed,
  `MessageCatalog` interface) — **this is original user content, don't
  rewrite copy in here casually**
- `src/lib/i18n/get-messages.ts` — `getMessages(locale)` and
  `getProjectText(locale, ...)` (per-project AR translation overrides)

Every page is a server component reading `params.locale`, calling
`getMessages(locale)`, and rendering. RTL/LTR is set via `dir` on `<html>`
in `src/app/[locale]/layout.tsx`, which owns the real `<html>`/`<head>`
(the true root `src/app/layout.tsx` is just a passthrough).

## Data layer

- `src/lib/data/profile.ts` — profile info, quickStats, skillGroups,
  education, values. **Client-safe** (no Node APIs) — import from here in
  any `"use client"` component.
- `src/lib/data/gallery.ts` — scans `public/images/Project_Code_Gallery/`
  with `node:fs` at build time to assemble each project's image gallery
  (mirrors the old Vite `import.meta.glob` behavior). **Server-only** —
  importing this (even transitively via `portfolio.ts`) from a
  `"use client"` component breaks the build (`node:fs` in browser bundle).
- `src/lib/data/portfolio.ts` — the `projects` array (uses `gallery.ts`)
  plus re-exports everything from `profile.ts` for convenience. Server
  components can import freely from here; client components must import
  the specific data they need from `profile.ts` directly instead.

Project images live in `public/images/Project_Code_Gallery/<slug>/...` as
WebP (converted from the original PNGs — 31MB → ~5MB). The gallery loader
prefers `.avif` > `.webp` > `.jpg` > `.png` if formats are ever mixed.

## Brand identity ("Octopus")

Colors, fonts, and logo rules came from a brand kit the user supplied and
then deleted after assets were extracted (folder no longer exists, no need
to look for it). Everything needed is already wired into the codebase:

- Fonts: Space Grotesk (Latin/display), IBM Plex Sans Arabic (Arabic),
  JetBrains Mono (code/mono) — self-hosted as `.ttf` in `public/fonts/`,
  `@font-face` declared in `src/app/globals.css`
- Colors: HSL custom properties in `globals.css` (`--char`, `--iron`,
  `--spark` + `-400/-500/-600/-700` shades, `--ash`, `--fog`, `--white`),
  mapped to the shadcn semantic tokens (`--background`, `--primary`, etc.)
  for both dark (default) and `[data-theme="light"]`
- Logo: SVGs in `public/brand/` — `octopus-mark-{dark,light,spark}.svg` is
  what's used in the header (theme-aware swap); lockup/stacked/favicon
  variants exist but aren't all wired in yet

## Theme system

`src/components/providers/theme-provider.tsx` — plain React context, no
external lib. Persists to `localStorage`, sets `data-theme` attribute on
`<html>`. An inline `<script>` (`THEME_INIT_SCRIPT`) runs before hydration
to prevent flash-of-wrong-theme.

**Important constraint from explicit user instruction:** the theme toggle
must stay **fully static** — no fade/crossfade/rotate on the icon swap, no
page-wide color transition when switching. If asked to "add polish" to the
UI generally, do not reintroduce animation here specifically unless the
user asks again.

## Motion system

`src/lib/motion.ts` has shared durations/easings/stagger constants.
`src/components/shared/motion-reveal.tsx` (`<MotionReveal>`) is the
go-to wrapper for scroll-triggered fade-up reveals — used on every page
section. Respects `prefers-reduced-motion` via `useReducedMotion()`.
`MotionProvider` wraps the whole app in `LazyMotion` with `domAnimation`
features — use the `m` component (not `motion`) everywhere to get that
bundle-size benefit; importing `motion` directly defeats the purpose.

Header nav has a shared-layout animated underline (`layoutId="nav-underline"`)
under the active link, and an animated mobile menu (height/opacity).

## Header / controls

`src/components/layout/site-header.tsx`. Language switch and theme toggle
are **intentionally identical** circular icon buttons (globe icon / sun-moon
icon), each wrapped in a Radix `Tooltip` (`src/components/ui/tooltip.tsx`)
showing their action on hover. If asked to add more header controls, match
this same icon-button + tooltip pattern for consistency.

`--nav-height` (defined in `globals.css`, currently `4.5rem`) drives both
the header's fixed height and the homepage hero's
`min-h-[calc(100dvh-var(--nav-height))]` — if the header's internal
padding/height ever changes, update this variable too or the hero sizing
will drift.

## Background treatment

`src/components/shared/code-glyph-backdrop.tsx` — faint floating code
glyphs (`<> {} => :: () []` etc., JetBrains Mono, ~4-8% opacity) rendered
site-wide, one instance per locale layout. Positions are **deterministically
seeded** (a small LCG, not `Math.random()`) so server and client render
identically — do not swap this for real randomness or it'll cause a
hydration mismatch. It's `absolute inset-0` inside a `relative` wrapper
spanning the whole document (not `fixed`), so it scrolls naturally with
page content rather than staying pinned to the viewport.

## Known content quirk (intentionally left alone)

`messages.ts`'s `education` block (both AR and EN) contains "Frontend
Development / React.js, Next.js..." rather than literal academic degree
info — this looked like a bug at first glance but is real, deliberately
authored content (confirmed by checking both language versions match in
intent). Don't "fix" it by swapping in `portfolio.ts`'s `education` object
(which has the literal Bachelor's degree info) unless the user asks —
they're different things used in different places on purpose.

## What's NOT done yet / possible next steps

- Only the `octopus-mark` logo variant is wired in; lockup/stacked/
  favicon-bare/made-with-octopus variants exist in `public/brand/` but
  aren't used anywhere yet
- No tests exist anywhere in the project — user explicitly asked to work
  without tests ("اشتغل بدون tests ابدا")
- Services page, About page, Projects grid, Contact page all got
  `MotionReveal` treatment but haven't been redesigned beyond that — if
  asked to continue the "Hero got a redesign, now do X" pattern, these
  are the natural next candidates
- No image domains/remote patterns configured in `next.config.ts` (empty
  config) — fine while all images are local/static; would need updating
  if external image URLs are ever introduced
- `sitemap.ts`/`robots.ts` hardcode `SITE_URL =
  "https://abdalrhman-jaffar-portfolio.vercel.app"` — update if the
  deploy domain changes

## Working conventions this session established

- **Never push to git without being asked.** Every commit this session
  was made locally only; the user reviews before pushing themselves.
- **Ask before big framework/toolchain decisions** (Next version, Radix
  vs. base-ui, etc.) rather than picking silently — the user has opinions
  about stability/versioning and will course-correct if not asked first.
- The user works in Arabic (Syrian dialect) mixed with English technical
  terms; respond in kind rather than switching fully to English.
- The user is often away from the laptop and wants autonomous execution
  once direction is confirmed — but "autonomous" means "don't ask
  permission for implementation details," not "don't ask when a decision
  could go multiple genuinely different ways."
- One real incident this session: a careless `rm -rf` + copy sequence
  while swapping project scaffolds destroyed the local git history
  temporarily. It was recovered from the GitHub remote (nothing had been
  pushed yet, so remote was untouched) before continuing. Lesson banked:
  when replacing a project's scaffold wholesale, isolate the new
  scaffold's own `.git` (or generate it with `--no-git` / delete before
  copying) before merging trees, and confirm `git log` looks right
  immediately after any bulk file operation that touches a repo root.

## How to verify things still work

```bash
npm install         # if node_modules is missing/stale
npx tsc --noEmit     # typecheck
npm run lint         # eslint
npm run build        # full production build — should show all routes
                     # as ○ (static) or ● (SSG), zero warnings
npm run dev          # local dev server
```

All 31 routes (2 locales × ~15 pages/slugs) should build as static or SSG.
If anything shows as a dynamic/server route unexpectedly, something broke
the static generation (usually a runtime-only API used outside
`"use client"` boundaries correctly, or vice versa).
