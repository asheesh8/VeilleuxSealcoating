#!/usr/bin/env python3
"""
Generate the pictorial terrain layer for the service-area map.

Peaks follow the real Green Mountain spine; trees are scattered with a seeded
RNG so the composition is stable between builds, kept inside the state border,
off Lake Champlain, and clear of the town markers.
"""
import math
import random

OUT = "/Users/ashishsubedi/Desktop/ARKITECH SOLUTIONS/01-Active-Client-Work/VeilleuxSealcoating/src/data/terrain.ts"

LON_MIN, LON_MAX = -73.52, -71.38
LAT_MIN, LAT_MAX = 42.66, 45.08
W, H = 330, 520


def project(lat, lon):
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * W
    y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H
    return x, y


VERMONT = [
    (45.01, -73.35), (45.01, -71.50), (44.80, -71.55), (44.65, -71.60),
    (44.50, -71.73), (44.40, -71.82), (44.30, -72.00), (44.20, -72.09),
    (44.10, -72.19), (43.95, -72.29), (43.80, -72.37), (43.70, -72.39),
    (43.60, -72.41), (43.50, -72.44), (43.35, -72.40), (43.20, -72.44),
    (43.05, -72.44), (42.95, -72.51), (42.85, -72.53), (42.73, -72.46),
    (42.73, -73.26), (43.00, -73.28), (43.30, -73.25), (43.55, -73.27),
    (43.62, -73.31), (43.80, -73.38), (44.00, -73.40), (44.20, -73.36),
    (44.40, -73.30), (44.55, -73.32), (44.70, -73.35), (44.85, -73.30),
]
VT_XY = [project(la, lo) for la, lo in VERMONT]

# Towns, so trees never crowd a marker.
TOWNS = [
    (44.4906, -73.0879), (44.4906, -73.1109), (44.4759, -73.2121), (44.467, -73.171),
    (44.4906, -73.1868), (44.5439, -73.1479), (44.4373, -73.079), (44.3806, -73.2276),
    (44.5023, -72.9948), (44.5306, -72.9037), (44.6142, -73.0132), (44.4034, -72.9954),
    (44.3292, -73.1104), (44.6395, -73.1104), (44.3092, -73.2593), (44.8109, -73.0832),
    (44.9184, -73.1243), (44.7237, -73.1268), (44.6656, -73.0104), (44.6448, -73.3037),
    (44.7203, -73.3009), (44.6398, -72.8798), (44.4654, -72.6845), (44.562, -72.5981),
    (44.5934, -72.6162), (44.6367, -72.6801), (44.3376, -72.7565), (44.2601, -72.5754),
    (44.197, -72.502), (44.1906, -72.8259), (44.167, -73.254), (44.1334, -73.0787),
    (44.0154, -73.1673),
]
TOWN_XY = [project(la, lo) for la, lo in TOWNS]

# Named summits along the Green Mountain spine, north to south.
# (name, lat, lon, prominence 0-1, label?)
PEAKS = [
    ("Jay Peak",       44.9242, -72.5254, 0.72, False),
    ("Belvidere",      44.7550, -72.6600, 0.55, False),
    ("Whiteface",      44.6100, -72.7300, 0.60, False),
    ("Mount Mansfield", 44.5438, -72.8143, 1.00, True),
    ("Bolton",         44.4200, -72.8600, 0.62, False),
    ("Camel's Hump",   44.3195, -72.8865, 0.90, True),
    ("Mount Ellen",    44.1550, -72.9250, 0.74, False),
    ("Lincoln Gap",    44.1000, -72.9400, 0.52, False),
    ("Bread Loaf",     43.9900, -72.9400, 0.58, False),
    ("Mount Abraham",  44.1200, -72.9500, 0.60, False),
    ("Killington",     43.6042, -72.8203, 0.82, False),
    ("Pico",           43.6600, -72.8400, 0.55, False),
    ("Okemo",          43.4020, -72.7170, 0.62, False),
    ("Stratton",       43.1130, -72.9080, 0.60, False),
    ("Glastenbury",    42.9500, -73.0300, 0.55, False),
    ("Equinox",        43.1620, -73.1120, 0.52, False),
    # eastern uplands, so the map is not one thin ridge
    ("Burke",          44.5800, -71.9000, 0.48, False),
    ("Umpire",         44.8200, -71.8500, 0.44, False),
    ("Seneca",         44.9000, -72.1500, 0.46, False),
    ("Worcester",      44.4200, -72.5600, 0.50, False),
    ("Northfield",     44.1400, -72.6600, 0.46, False),
    ("Ascutney",       43.4400, -72.4500, 0.52, False),
    # infill so the spine reads as a continuous range
    ("Hazens",         44.8400, -72.4200, 0.42, False),
    ("Sterling",       44.6300, -72.7700, 0.52, False),
    ("Hunger",         44.4700, -72.6600, 0.48, False),
    ("Lincoln",        44.0700, -72.8800, 0.50, False),
    ("Brandon Gap",    43.8300, -72.9300, 0.46, False),
    ("Pittsfield",     43.7600, -72.8300, 0.44, False),
    ("Shrewsbury",     43.5100, -72.8600, 0.48, False),
    ("Ludlow",         43.4000, -72.8300, 0.44, False),
    ("Bromley",        43.2200, -72.9400, 0.50, False),
    ("Somerset",       42.9700, -72.9500, 0.46, False),
    ("Dorset",         43.2700, -73.1000, 0.44, False),
    ("Haystack",       42.8900, -72.9100, 0.42, False),
    ("Nulhegan",       44.7400, -71.7500, 0.40, False),
    ("Willoughby",     44.7300, -72.0500, 0.46, False),
    ("Groton",         44.2400, -72.2200, 0.42, False),
]


def point_in_poly(x, y, poly):
    inside = False
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y):
            xin = (x2 - x1) * (y - y1) / (y2 - y1) + x1
            if x < xin:
                inside = not inside
    return inside


def dist_to_edge(x, y, poly):
    """Rough distance to the nearest border segment."""
    best = 1e9
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        dx, dy = x2 - x1, y2 - y1
        L = dx * dx + dy * dy
        t = 0 if L == 0 else max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / L))
        px, py = x1 + t * dx, y1 + t * dy
        best = min(best, math.hypot(x - px, y - py))
    return best


def main():
    rng = random.Random(1802)  # the area code, because why not

    peaks = []
    for name, lat, lon, prom, label in PEAKS:
        x, y = project(lat, lon)
        peaks.append({
            "name": name, "x": round(x, 1), "y": round(y, 1),
            "s": round(prom, 2), "label": label,
        })

    # --- trees -------------------------------------------------------------
    trees = []
    tries = 0
    while len(trees) < 230 and tries < 40000:
        tries += 1
        x = rng.uniform(0, W)
        y = rng.uniform(0, H)
        if not point_in_poly(x, y, VT_XY):
            continue
        # keep clear of the border so nothing pokes out
        if dist_to_edge(x, y, VT_XY) < 7:
            continue
        # keep clear of town markers
        if any(math.hypot(x - tx, y - ty) < 11 for tx, ty in TOWN_XY):
            continue
        # leave the legend block clear so its type stays legible
        if 40 <= x <= 210 and 380 <= y <= 486:
            continue
        # and the two rotated map labels
        if 96 <= x <= 126 and 236 <= y <= 350:      # GREEN MOUNTAINS
            continue
        if 8 <= x <= 34 and 150 <= y <= 250:        # LAKE CHAMPLAIN
            continue
        # and clear of the peaks
        if any(math.hypot(x - p["x"], y - p["y"]) < 9 for p in peaks):
            continue
        if any(math.hypot(x - t["x"], y - t["y"]) < 7.4 for t in trees):
            continue

        # conifers dominate the high spine and the north; maples fill the rest
        near_spine = min(abs(x - p["x"]) + abs(y - p["y"]) * 0.35 for p in peaks)
        conifer_bias = 0.84 if near_spine < 55 or y < 130 else 0.62
        kind = "fir" if rng.random() < conifer_bias else "maple"

        # a minority of the maples carry autumn colour
        tone = 0
        if kind == "maple":
            r = rng.random()
            tone = 1 if r < 0.34 else (2 if r < 0.58 else 0)

        trees.append({
            "x": round(x, 1), "y": round(y, 1), "k": kind, "t": tone,
            "sc": round(rng.uniform(0.5, 0.82), 2),
        })

    print(f"peaks {len(peaks)}  trees {len(trees)}  (from {tries} tries)")

    def fmt(d, keys):
        return "{ " + ", ".join(f"{k}: {d[k]!r}" if isinstance(d[k], str) else f"{k}: {d[k]}" for k in keys) + " }"

    lines = [
        "/**",
        " * Pictorial terrain for the service-area map — GENERATED, do not hand-edit.",
        " * Regenerate with brand/gen_terrain.py.",
        " *",
        " * Peaks sit on the real Green Mountain spine. Trees are a seeded scatter,",
        " * constrained to the state, off the border, and clear of every town marker.",
        " */",
        "",
        "export interface Peak {",
        "  name: string",
        "  x: number",
        "  y: number",
        "  /** Prominence, 0–1. Drives glyph size and whether it gets a snowcap. */",
        "  s: number",
        "  label: boolean",
        "}",
        "",
        "export interface Tree {",
        "  x: number",
        "  y: number",
        "  /** fir = conifer, maple = broadleaf */",
        "  k: 'fir' | 'maple'",
        "  /** 0 summer green, 1 maple red, 2 maple gold */",
        "  t: number",
        "  sc: number",
        "}",
        "",
        "export const peaks: Peak[] = [",
    ]
    for p in peaks:
        lines.append("  " + fmt(p, ["name", "x", "y", "s", "label"]).replace("True", "true").replace("False", "false") + ",")
    lines.append("]")
    lines.append("")
    lines.append("export const trees: Tree[] = [")
    for t in trees:
        lines.append("  " + fmt(t, ["x", "y", "k", "t", "sc"]) + ",")
    lines.append("]")
    lines.append("")

    src = "\n".join(lines)
    src = src.replace("k: 'fir'", "k: 'fir'").replace("k: 'maple'", "k: 'maple'")
    with open(OUT, "w") as f:
        f.write(src)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
