# Veilleux Sealcoating

Brand identity and marketing site for **Veilleux Sealcoating LLC** — sealcoating,
pavement repair, winter plowing, grounds maintenance, hauling, and handyman work
across Vermont and upstate New York, out of Essex, VT.

Replaces a GoHighLevel funnel page at veilleuxsealcoating.com.

---

## Getting started

```bash
npm install
npm run dev
```

Verification before deploying:

```bash
npm run lint
npm run build
```

---

## What is here

**A new identity.** Custom-drawn VEILLEUX wordmark, split-chevron mark, full
lockup family, favicon, territory graphic, and a brand sheet — all generated as
SVG masters. See [`docs/brand-system.md`](docs/brand-system.md).

**Thirteen routes.** Home, Services hub plus six service pages, Work, Process,
Questions, About, Service Area, Contact, Estimate, Thanks, Privacy, and a 404.
Pages are kept deliberately short — nothing runs much past four screens, and
each section that used to live on the home page now has its own route.

**A real service-area map.** `TerritoryMap` projects actual latitude and
longitude onto Vermont's outline, so all 33 towns land where they really are.
Hovering a town in the list highlights it on the map and vice versa.

**Real photography.** 41 images scraped from the client's existing site and
reprocessed from the 48MP originals: EXIF rotation corrected, curated, renamed,
captioned, and encoded to webp at 900 / 1600 / 2560px.

**A hero film brief.** A graded cinematic plate plus prompts to turn it into the
homepage loop. See [`docs/hero-film-brief.md`](docs/hero-film-brief.md).

---

## Project structure

```text
public/brand/          Identity masters (SVG)
public/media/hero/     Hero plate, poster, and (later) the film
public/media/work/     41 job photographs, 2–3 widths each
src/components/        Interface, motion, and layout components
src/data/site.ts       All copy, services, gallery, and contact details
src/data/territory.ts  Vermont outline and the 33 towns, as real lat/lon
src/data/faq.ts        Questions and answers
src/pages/             Route-level pages
src/styles/global.css  The complete visual system
docs/                  Brand system and hero film brief
```

All copy lives in [`src/data/site.ts`](src/data/site.ts). Editing a service
description, a caption, or a phone number means touching one file.

---

## Stack

React 19 · TypeScript · Vite 7 · wouter · lightningcss. No UI framework, no CSS
framework, no runtime CSS-in-JS. Three production dependencies.

---

## Deploying

`vercel.json` and `public/_redirects` are both present, so Vercel and Netlify
both work as-is with SPA rewrites.

The estimate form is marked up for **Netlify Forms** (`data-netlify`, honeypot,
`multipart/form-data` for the optional photo). On Vercel or anywhere else, point
the form's `action` at whatever endpoint the client ends up using — the field
names are already sensible. See `src/components/EstimateForm.tsx`.

---

## Before this goes live

- [ ] **Confirm the facts.** The hero states a 24-hour quote turnaround and the
      site says year-round service; both come from the client's own material but
      should be confirmed before publishing. Nothing on the site claims a licence
      number, insurance, years in business, or crew size, because none of that was
      verifiable from the existing site — add them once confirmed.
- [ ] **Wire up the form** to a real endpoint and test a submission end to end.
- [ ] **Service area.** The 33-town list across six counties is inferred from
      Essex plus a plausible working radius. Have Matt confirm or correct it —
      towns are one array in `src/data/territory.ts`.
- [ ] **Insurance.** The FAQ says certificates are available on request. Confirm
      that is accurate before publishing.
- [ ] **Shoot one before/after pair** from a fixed position. `BeforeAfter` is
      built and waiting; it is deliberately unused until a real pair exists.
- [ ] **Generate or shoot the hero film**, then set `<Hero hasFilm />` in
      `src/pages/HomePage.tsx`.

---

## Notes

Photography and testimonials are the client's own, taken from their existing
public site. The two reviews are reproduced verbatim.

The old logo is preserved at `brand/reference/legacy-logo.png` for reference.
