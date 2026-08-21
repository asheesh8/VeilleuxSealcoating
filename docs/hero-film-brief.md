# Hero film brief

The homepage opens on a cinematic loop. Until that film exists the page holds
on a graded still, so the site is complete either way — dropping the film in is
a two-line change.

---

## The seed image

**`public/media/hero/veilleux-hero-plate-1920.jpg`** (1920×1080)
**`public/media/hero/veilleux-hero-plate-2560.jpg`** (2560×1440, master)

Graded from a real Veilleux job — a residential driveway photographed at night
after the seal had cured, source file `667a5c69…jpeg`. The grade deepens and
cools the asphalt, protects the warm specular column from the garage lights, and
adds a soft vignette. Nothing was added to the scene.

### Why this frame

Everything a video model needs is already in it:

| Property | Why it matters |
| --- | --- |
| Hard one-point perspective | The driveway converges on the garage, so a forward push reads instantly as depth rather than a zoom. |
| Single dominant light source | One warm garage light. No competing colour temperatures for the model to get confused by. |
| Reflective surface | The wet-cured seal mirrors the light in a vertical column. Reflections are where motion becomes obvious — this is the whole point of the shot. |
| Natural foreground element | The caution tape gives the model something to animate softly and doubles as brand colour. |
| Dark, simple edges | Trees fall off into black on both sides, so the model has little opportunity to hallucinate detail at the frame edge. |
| It is the product | A cured seal that reads like water at night *is* the sales argument. |

---

## Primary prompt — image-to-video

Use with the plate above as the input frame. Written for Runway Gen-4, Kling,
Luma Ray, Veo, or Sora; all of them respond to camera language first and scene
description second.

```text
Slow, steady dolly push forward up the freshly sealed driveway toward the lit
garage. The camera glides low and level, roughly two feet above the pavement,
advancing at a constant walking pace. The mirrored column of light on the wet
blacktop stretches and slides toward the viewer as the camera moves. Yellow
caution tape sways gently in a light breeze in the near foreground. Leaves stir
softly in the dark trees at the edges of frame. Locked horizon, no roll, no
zoom, no handheld shake. Cinematic night cinematography, anamorphic feel,
natural light only, deep blacks, film grain.
```

**Negative prompt**

```text
people, cars, headlights, text, watermarks, logos, rain, falling snow, camera
shake, whip pan, zoom, lens flare artifacts, oversaturation, colour shift,
warping pavement, morphing architecture, extra doors, extra windows
```

**Settings**

- Duration **5–8 seconds**. Longer invites drift in the garage geometry.
- Motion / camera-strength **low to medium**. This shot wants restraint; high
  motion values will warp the garage doors.
- Generate **4–6 takes** and keep the one where the garage stays rigid. That is
  the usual failure mode.
- Export **1920×1080, 24fps**.

---

## Alternate takes

Worth generating alongside the primary — any of these cuts well as a loop.

**A. Slow rise.** *Camera rises slowly and steadily from just above the driveway
surface, tilting down very slightly to hold the garage in frame. The reflected
column of light compresses as the angle steepens. Everything else still.*

**B. Lateral drift.** *Camera tracks slowly left to right, parallel to the
garage, staying low. The specular reflection slides across the wet seal as the
angle changes. Trees pass gently through the foreground.*

**C. Pull back.** *Camera retreats slowly down the driveway away from the lit
garage. The caution tape enters the lower frame and passes overhead as the
camera continues back. Steady, level, no shake.*

---

## Making it loop

Site playback is `autoplay muted loop playsinline`, so the cut point is visible.

1. Prefer the **lateral drift** or a very slow push — constant-velocity motion
   is far easier to loop than anything that accelerates.
2. If the ends do not meet, crossfade the last 12 frames into the first 12.
3. Alternatively export a **ping-pong**: forward, then reversed. On a shot this
   slow the reversal is invisible.

---

## Encoding and wiring it in

Target roughly **2–4 MB** for a 6-second 1080p loop — it is the first thing that
loads on the page.

```bash
ffmpeg -i take.mp4 -an -vf "scale=1920:-2,fps=24" \
  -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart \
  public/media/hero/veilleux-hero.mp4
```

Then flip the hero over to it:

```tsx
// src/pages/HomePage.tsx
<Hero hasFilm />
```

`Hero` already handles the rest — it holds the poster frame for anyone who has
asked their system for reduced motion, and falls back to it if the video fails
to load.

---

## If you would rather shoot it

Honestly worth considering. A gimbal walk up a driveway at dusk, shot on a phone
in 4K, will beat a generated clip and costs an evening. Same brief:

- Blue hour, roughly 20–30 minutes after sunset, garage light on.
- Gimbal at knee height, walk at a slow constant pace toward the garage.
- Shoot the pass three or four times; keep the steadiest.
- Frame so the light column runs up the centre of the driveway.
- Optional: wet the surface lightly first — a cured seal reflects best damp.
