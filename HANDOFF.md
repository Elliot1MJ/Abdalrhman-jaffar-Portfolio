# Handoff — Abdalrhman Jaffar Portfolio

Written for: the next Claude Code session picking up this project cold.

## What this project is

Personal portfolio site for Abdalrhman Jaffar (Frontend Developer), bilingual
AR/EN with RTL support, built around a custom visual identity called
**"The Octopus"**. Rebuilt from scratch as a Next.js app — previously a
Vite/React SPA.

## Stack

- **Next.js 15.5.25** (App Router), **React 19.1.0** — deliberately pinned to
  this stable line, not Next 16, per explicit user request for
  LTS-grade stability over bleeding edge. Do not bump the major version
  without asking first.
- Tailwind CSS v4 (CSS-based config, no `tailwind.config.js`)
- shadcn/ui components, hand-built correctly on **Radix primitives +
  class-variance-authority + tailwind-merge** (`src/components/ui/*`) — not
  the cosmetic-only version that existed briefly earlier in the project
- framer-motion (via `LazyMotion`/`domAnimation` for bundle size) —
  see "Motion system" below
- npm only (not yarn) — `package-lock.json` is the source of truth
- `postcss` pinned via `overrides` in package.json to close a transitive
  CVE without bumping Next's major version — don't remove that override
  without re-checking `npm audit`

## Routing / i18n — single-URL, client-side language toggle

**This changed significantly in the latest session — read this whole
section even if you remember the old locale-segment routing.**

The site used to route through `/ar` and `/en` URL segments (both statically
generated). That's gone. The explicit reason: the user wants Google/crawlers
to index **English only**, and wants the language preference stored in
`localStorage`, not the URL — Arabic is now a pure client-side "translate
this page" toggle, not a route.

Current architecture:
- **Single flat URL structure**: `/`, `/about`, `/services`, `/projects`,
  `/projects/[slug]`, `/cv`, `/contact` — no locale prefix anywhere.
- **English is the server-rendered default.** `src/app/layout.tsx` hardcodes
  `<html lang="en" dir="ltr">` and calls `getMessages("en")` for metadata.
  Crawlers see real English text in the raw HTML with zero JS execution
  required (verified via `curl` — `<html lang="en" dir="ltr">` and English
  copy are present in the server response).
- **`src/lib/i18n/language-provider.tsx`** (new file) — mirrors
  `theme-provider.tsx`'s pattern: a `LanguageProvider` context + `useLanguage()`
  hook exposing `{ locale, dir, text, toggleLocale }`. `toggleLocale()` just
  flips React state — **no navigation, no URL change**.
  - **Important hydration-safety detail**: the provider's `useState` always
    initializes to `defaultLocale` ("en"), matching the server render exactly.
    The stored `localStorage` preference is applied in a `useEffect` that runs
    *after* mount, not in the lazy initializer. Do NOT change this to read
    `localStorage` synchronously during initial state — that was tried and
    caused a full React hydration-mismatch error (server renders "en", client's
    first paint would render "ar" before hydration reconciles, and React
    throws it away and remounts the whole tree). The one-frame flash from
    en→ar on reload for Arabic-preferring returning visitors is the accepted
    tradeoff.
  - `LANGUAGE_INIT_SCRIPT` (a raw inline `<script>` in `<head>`, injected
    via `dangerouslySetInnerHTML` next to the existing `THEME_INIT_SCRIPT`)
    only corrects the `<html lang/dir>` *attributes* before paint (safe,
    since attributes aren't part of the hydration diff) — it does NOT touch
    React state, so it doesn't reintroduce the mismatch.
- `src/lib/i18n/config.ts` — `defaultLocale` flipped from `"ar"` to `"en"`.
  `isLocale()` was deleted (no more URL segment to validate). `isRtl()` kept.
- `src/lib/i18n/messages.ts` / `get-messages.ts` — **unchanged**, still the
  full AR/EN copy catalog (`MessageCatalog` interface) and
  `getMessages(locale)` / `getProjectText(locale, ...)` lookups. These were
  already pure and framework-agnostic, so they work as-is called client-side
  from `useLanguage()`. Note: the full catalog (both languages) now ships in
  the client JS bundle, since localization happens client-side — this is
  expected and fine (no fs/network I/O involved, all static data).

### Server vs. client components after the migration

- Pages with **no `node:fs`-touching data** (`about`, `contact`, `cv`,
  `services`) are now `"use client"` components that call `useLanguage()`
  directly. `about` and `contact` import from `@/lib/data/profile` (client-safe)
  instead of `@/lib/data/portfolio` (which pulls in `node:fs` via `gallery.ts`
  and would break the client bundle).
- Pages needing `node:fs` data (`/` home, `/projects`, `/projects/[slug]`)
  **stay server components** that fetch data and pass it as props into a
  client child that does the localization:
  - `/` (`src/app/page.tsx`) → `HeroContent` (client) +
    `src/components/home/home-static-sections.tsx` (new, client) for the
    stats grid / featured-projects grid / about teaser.
  - `/projects` → `src/components/projects/projects-grid.tsx` (client) now
    owns the whole page body (heading, filters, grid) and does
    `getProjectText(locale, ...)` localization itself via `useMemo`.
  - `/projects/[slug]` → `src/components/projects/project-details.tsx` (new,
    client) receives the raw `project` object and localizes it internally.
    `generateStaticParams` dropped the locale axis — just
    `projects.map(p => ({ slug: p.slug }))` now.
- `SiteHeader`/`SiteFooter` no longer take `locale`/`text` props — both call
  `useLanguage()` internally. The header's language toggle button used to do
  `router.push()` to the sibling locale route; now it's a bare `toggleLocale()`
  context call with **zero navigation**, matching the same "static, no
  animation" treatment as the theme toggle.
- `not-found.tsx` moved to `src/app/not-found.tsx`, still hardcodes English
  (`getMessages("en")`) rather than reading context — kept simple since it's
  an error boundary.

### RTL

Still minimal: just `<html dir>` (now toggled client-side by
`LanguageProvider`) plus one CSS rule in `globals.css`
(`html[dir="rtl"] body { font-family: var(--font-ar); }`). No scattered
Tailwind `rtl:`/`ltr:` variants anywhere in the codebase.

### sitemap.ts / robots.ts

`src/app/sitemap.ts` now emits **one English URL per path** (no more
doubling across `/ar` and `/en`). `robots.ts` was already locale-agnostic,
untouched.

## Data layer

- `src/lib/data/profile.ts` — profile info, quickStats, skillGroups,
  education, values. **Client-safe** (no Node APIs) — import from here in
  any `"use client"` component.
- `src/lib/data/gallery.ts` — scans `public/images/Project_Code_Gallery/`
  with `node:fs` at build time to assemble each project's image gallery
  (mirrors the old Vite `import.meta.glob` behavior). **Server-only** —
  importing this (even transitively via `portfolio.ts`) from a
  `"use client"` component breaks the build (`node:fs` in browser bundle).
  This is *why* several pages had to stay server components in the i18n
  migration above.
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
to prevent flash-of-wrong-theme. This is the exact pattern
`language-provider.tsx` mirrors (see i18n section above) — if you touch one,
check whether the other needs the same fix.

**Important constraint from explicit user instruction:** the theme toggle
must stay **fully static** — no fade/crossfade/rotate on the icon swap, no
page-wide color transition when switching. The language toggle button
follows the same static, no-animation treatment for consistency. If asked to
"add polish" to the UI generally, do not reintroduce animation here
specifically unless the user asks again.

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
showing their action on hover. Both are now pure client-side state toggles
with no navigation (see i18n section). If asked to add more header controls,
match this same icon-button + tooltip pattern for consistency.

`--nav-height` (defined in `globals.css`, currently `4.5rem`) drives both
the header's fixed height and the homepage hero's
`min-h-[calc(100dvh-var(--nav-height))]` — if the header's internal
padding/height ever changes, update this variable too or the hero sizing
will drift.

## Container width

All page containers, the header, and the footer use `max-w-[1440px]` (raised
from an earlier `max-w-6xl`/1152px per explicit user request to widen the
site). Keep this consistent if adding new top-level sections — grep for
`max-w-[1440px]` to find the existing pattern.

## Hero section layout (`src/components/home/hero-content.tsx`)

This went through a lot of back-and-forth in the last session — the
**current state is the one to keep**: a `grid` with
`lg:grid-cols-[1.15fr_0.85fr] lg:gap-16`, text column first in DOM order
(`order-2 lg:order-1`), photo column second (`order-1 lg:order-2`,
`aspect-4/5`, `max-w-sm`, `lg:ms-auto` to hug the far edge of its column
using a logical property so it's direction-safe for RTL). Explicit `order-*`
is used instead of relying on CSS Grid's implicit RTL column reversal —
that implicit reversal was tried and produced confusing, hard-to-reason-about
results. **Do not "improve" this layout speculatively** (stretching the
image to full section height, forcing equal grid columns, swapping to flex
with manual margins, adding custom `object-position` crops) without a
concrete, specific complaint from the user about what looks wrong — several
rounds of unprompted tweaking here made things visibly worse each time
before landing back on approximately the original design. If the user reports
a hero-section visual issue, reproduce/verify it with an actual screenshot
comparison against this baseline before changing anything.

## Background treatment

`src/components/shared/code-glyph-backdrop.tsx` — faint floating code
glyphs (`<> {} => :: () []` etc., JetBrains Mono, ~4-8% opacity) rendered
site-wide, one instance per layout. Positions are **deterministically
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
- The `hreflang`/`alternates.languages` metadata that used to declare
  `/ar` and `/en` as alternate URLs was removed entirely in the i18n
  migration (there's no second crawlable URL anymore). If the user later
  wants search engines to know an Arabic version exists in some form,
  that would need new design thought — not currently a TODO, just noting
  the metadata gap exists.

## Working conventions established across sessions

- **Never push to git without being asked.** Commits are made locally only;
  the user reviews before pushing themselves.
- **Ask before big framework/toolchain or architecture decisions** (Next
  version, Radix vs. base-ui, locale-routing vs. client-side toggle, etc.)
  rather than picking silently — the user has opinions and will course-correct
  if not asked first. For the i18n migration, this meant using `EnterPlanMode`
  to research the full existing architecture and get an explicit plan approval
  before touching any files, given the scope (9+ files, routing structure
  change). Worth repeating for similarly large changes.
- The user works in Arabic (Syrian dialect) mixed with English technical
  terms; respond in kind rather than switching fully to English.
- The user is often away from the laptop and wants autonomous execution
  once direction is confirmed — but "autonomous" means "don't ask
  permission for implementation details," not "don't ask when a decision
  could go multiple genuinely different ways."
- **Don't iterate blindly on visual/layout issues without seeing the actual
  result.** When the user reports something looks wrong (spacing, sizing,
  alignment) and no browser screenshot tool is available, ask clarifying
  questions about exactly what's wrong rather than guessing-and-checking via
  the user's own screenshots one adjustment at a time — several rounds of
  speculative CSS changes to the hero section frustrated the user because
  each guess was checked only after the fact, and often made things worse.
  Prefer: read the existing/original code first, understand why a specific
  concrete symptom is happening (e.g. trace an RTL layout issue to the
  actual CSS property causing it), and make one deliberate, explained
  change rather than a sequence of trial-and-error tweaks.
- One earlier incident: a careless `rm -rf` + copy sequence while swapping
  project scaffolds destroyed the local git history temporarily. It was
  recovered from the GitHub remote (nothing had been pushed yet, so remote
  was untouched) before continuing. Lesson banked: when replacing a
  project's scaffold wholesale, isolate the new scaffold's own `.git` (or
  generate it with `--no-git` / delete before copying) before merging trees,
  and confirm `git log` looks right immediately after any bulk file
  operation that touches a repo root.

## How to verify things still work

```bash
npm install         # if node_modules is missing/stale
npx tsc --noEmit     # typecheck
npm run lint         # eslint
npm run build        # full production build — should show ~12 routes,
                     # all ○ (static) or ● (SSG), zero warnings, no /ar or
                     # /en prefixed routes anywhere
npm run dev          # local dev server
```

Manual checks for the i18n toggle specifically (no headless browser tool is
available in this environment, so these must be checked in a real browser
or via `curl`/view-source for the server-rendered parts):
- `curl -s localhost:3000/ | grep -o 'lang="[a-z]*"'` should show `lang="en"`
  with real English text in the raw HTML (confirms crawlers see English
  without executing JS).
- In-browser: toggle the language button — text should switch instantly
  with no URL change and no page navigation; `<html dir>` should flip to
  `rtl` for Arabic and the Arabic font should apply immediately via the
  `html[dir="rtl"] body` CSS rule.
- Reload after toggling to Arabic — expect a brief flash to English before
  snapping to Arabic (this is the accepted hydration-safety tradeoff
  described in the i18n section above, not a bug to fix).
- `localStorage.getItem("locale")` should persist `"ar"`/`"en"` across
  reloads and page navigations.
