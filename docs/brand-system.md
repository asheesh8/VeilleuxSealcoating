# Veilleux Sealcoating — brand system

Built from scratch for Veilleux Sealcoating LLC, Essex, Vermont. Nothing here is
carried over from the previous GoHighLevel site beyond the two colours it was
already using and the owner's own words.

---

## The idea

Sealcoating sells a **finish**. The product is a surface so evenly laid that at
night it holds light like water. That is the whole brand: the finish, and the
unglamorous prep that makes the finish last.

The positioning line — **"Anyone can spray it black."** — comes straight out of
the client's own reviews. Both testimonials on the old site praise the same
thing, and it is not the sealer:

> "The attention to detail with the **edging, brushing, and crack filling before
> sealing** made the driveway look great."

> "They did a great job **prepping** the driveway."

Customers already know what separates Matt from the cheap crews. The brand just
says it out loud.

---

## Logotype

The wordmark is **drawn, not set**. Every letter in VEILLEUX is custom geometry
on a 100-unit cap-height grid with a 17-unit stem — flat-sided, slightly
condensed, no typeface licence attached to the identity. It is regenerated from
`gen_brand.py`, so the masters are reproducible rather than hand-patched.

The mark is a **split chevron**: a heavy V cut down the vertical axis, the left
limb in asphalt, the right limb in striping yellow. It reads as the V of
Veilleux, as a road narrowing, and as a freshly painted line. At 16px it is
still a V with a yellow tick.

### Files — `public/brand/`

| File | Use |
| --- | --- |
| `veilleux-mark.svg` / `-reversed` | Mark alone. Reversed is for dark grounds. |
| `veilleux-lockup-horizontal.svg` / `-reversed` | Default lockup. Trucks, invoices, email signatures. |
| `veilleux-lockup-stacked.svg` / `-reversed` | Square and vertical spaces. Shirt backs, yard signs. |
| `veilleux-favicon.svg` | Rounded tile, mark reversed out of asphalt. |
| `vermont-territory.svg` / `-reversed` | Simple territory graphic for print and email. The website uses the live `TerritoryMap` component instead. |
| `veilleux-brand-sheet.svg` | One-page summary for handoff. |

Clear space around any lockup is **the height of the mark**, on all four sides.
Minimum width for the horizontal lockup is 140px; below that use the mark alone.

Never: recolour the yellow limb, stretch the wordmark, add a stroke, add a drop
shadow, or set VEILLEUX in a substitute typeface.

---

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Void | `#05070C` | Page ground |
| Asphalt | `#0A0C10` | Primary ink, raised sections |
| Slab | `#12161D` | Panels, image placeholders |
| **Stripe** | `#F2C511` | The only accent |
| Chalk | `#E9ECF1` | Primary text on dark |
| Gravel | `#8A93A3` | Secondary text |
| Gravel dim | `#646C7A` | Tertiary, eyebrows, meta |

The old site's tokens were `#F2CB07` and `#011126` — yellow and deep navy. This
palette keeps that DNA and deepens it: the navy becomes a near-black with a blue
undertone (the actual colour of cured sealer), and the yellow shifts slightly
warmer to read as fresh line-striping paint rather than caution signage.

**The yellow is rationed.** It appears on the mark, the section rules, one button
state, active navigation, and focus rings. That restraint is most of what
separates this from a typical contractor site, where yellow is used as a fill and
stops meaning anything.

---

## Typography

| Role | Typeface | Notes |
| --- | --- | --- |
| Display | **Anton** (Regular) | All-caps condensed. Headlines only, `line-height: 0.92`. |
| Text & UI | **Inter Variable** (100–900) | Body, navigation, forms, captions. |

Both are licensed under the **SIL Open Font License 1.1** and installed from npm
via [Fontsource](https://fontsource.org) — `@fontsource/anton` and
`@fontsource-variable/inter`. Vite bundles and fingerprints them at build time.

**No font binaries are committed to this repository.** That is deliberate. An
earlier draft used Tanker and Switzer from Fontshare, which are free to download
and self-host but whose licence states that a third party must obtain their own
copy rather than receive the files from someone else — publishing those woff2
files in a public repository would have been redistribution. The OFL explicitly
permits bundling and redistribution, so the fonts now travel with the dependency
tree instead of the source tree, and anyone who clones this gets them from npm.

Anton carries the weight the headlines need and reads like road signage, which
is the right register for the trade. It is set tight and only ever in uppercase.

> The custom VEILLEUX wordmark is unaffected by any of this — it is original
> vector geometry drawn on a 100-unit grid and uses no typeface at all.

---

## The territory map

`TerritoryMap` is the one place the brand palette gives way. Vermont is drawn as
a pictorial map rather than a diagram: the Green Mountain spine set on the real
summits, a conifer forest with sugar maples turning red and gold through it, and
Lake Champlain as actual water along the west edge.

Those forest and foliage colours (`--vt-*` in `global.css`) are **scenery, not
brand colours**. They exist only inside the map. The striping yellow stays the
one thing that means Veilleux — it marks Essex, the dashed working radius, and
nothing else on the map.

Geometry is real. `src/data/territory.ts` holds Vermont's outline and all 33
towns as latitude and longitude, projected at render time, so every town lands
where it actually is. Terrain is generated by `brand/gen_terrain.py` with a
fixed seed and written to `src/data/terrain.ts` — trees are constrained to stay
inside the border, off the town markers, and clear of the legend and the two
map labels. Re-run the script to reshuffle the forest; edit the town array to
change coverage.

The design brief was that someone in Stowe or St. Albans should look at it and
see their own town, not just Essex with a pin in it.

---

## Voice

Plain, specific, and unhurried. Short declaratives. Real numbers and real
materials — "hot crack fill on anything half an inch or wider," not "premium
crack remediation solutions."

The brand is allowed to be blunt about the trade, because being blunt is the
differentiator:

> "Any contractor pushing a yearly seal is selling you a subscription, not a
> service."

What it never does: exclamation marks, "we pride ourselves on," stock-photo
enthusiasm, or claims about awards, certifications, years in business, or crew
size that have not been verified with the client.

---

## Photography

Every image on the site is a real Veilleux job, pulled from the existing site and
reprocessed from the 48MP originals — EXIF rotation corrected, resized, and
encoded to webp at two or three widths.

Rules for adding more:

1. **Shoot the edge.** The line where seal meets lawn is the proof.
2. **Shoot at night.** A cured driveway under a garage light is the single most
   persuasive image this business can produce.
3. **Shoot the same frame twice.** Before and after, from a fixed position. The
   `BeforeAfter` component is built and waiting for the first real pair.
4. No stock. The site currently claims "no stock photos" in writing.
