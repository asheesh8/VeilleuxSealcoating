#!/usr/bin/env python3
"""Generate the Veilleux Sealcoating identity system as production SVG masters.

The wordmark is drawn as custom geometry on a 100-unit cap-height grid so the
letterforms belong to the brand rather than to a licensed typeface.
"""
import os

OUT = "/Users/ashishsubedi/Desktop/ARKITECH SOLUTIONS/01-Active-Client-Work/VeilleuxSealcoating/public/brand"
os.makedirs(OUT, exist_ok=True)

ASPHALT = "#0A0C10"
PAPER   = "#F4F5F7"
STRIPE  = "#F2C511"
MUTED   = "#8A93A3"
MUTED_D = "#6B7382"

# ---------------------------------------------------------------- letterforms
# Cap height 100. Stem weight 17. Drawn flat-sided and slightly condensed.
GLYPHS = {
    "V": (62, "M0,0 L17,0 L31,70 L45,0 L62,0 L38,100 L24,100 Z"),
    "E": (52, "M0,0 L52,0 L52,17 L17,17 L17,41 L47,41 L47,58 L17,58 L17,83 L52,83 L52,100 L0,100 Z"),
    "I": (17, "M0,0 L17,0 L17,100 L0,100 Z"),
    "L": (48, "M0,0 L17,0 L17,83 L48,83 L48,100 L0,100 Z"),
    "U": (58, "M0,0 L17,0 L17,68 C17,76 22,83 29,83 C36,83 41,76 41,68 L41,0 L58,0 L58,68 "
               "C58,86 45,100 29,100 C13,100 0,86 0,68 Z"),
    "X": (60, "M0,0 L19,0 L30,32 L41,0 L60,0 L40,50 L60,100 L41,100 L30,66 L19,100 L0,100 L20,50 Z"),
    "S": (52, "M52,26 L35,26 C35,19 30,15 25,15 C19,15 16,19 16,25 C16,32 22,35 32,39 "
               "C45,44 53,51 53,68 C53,88 40,100 25,100 C10,100 0,88 0,72 L17,72 "
               "C17,80 20,85 26,85 C33,85 36,80 36,73 C36,65 30,62 20,58 C8,53 0,45 0,29 "
               "C0,12 12,0 26,0 C41,0 52,11 52,26 Z"),
    "A": (60, "M0,100 L18,100 L23,78 L37,78 L42,100 L60,100 L38,0 L22,0 Z M27,61 L30,26 L33,61 Z"),
    "C": (56, "M56,35 L39,35 C39,23 34,16 28,16 C21,16 18,24 18,50 C18,76 21,84 28,84 "
               "C34,84 39,77 39,65 L56,65 C56,86 44,100 28,100 C10,100 0,83 0,50 "
               "C0,17 10,0 28,0 C44,0 56,14 56,35 Z"),
    "O": (60, "M30,0 C48,0 60,17 60,50 C60,83 48,100 30,100 C12,100 0,83 0,50 C0,17 12,0 30,0 Z "
               "M30,16 C23,16 18,24 18,50 C18,76 23,84 30,84 C37,84 42,76 42,50 C42,24 37,16 30,16 Z"),
    "T": (54, "M0,0 L54,0 L54,17 L36,17 L36,100 L19,100 L19,17 L0,17 Z"),
    "N": (56, "M0,0 L16,0 L40,55 L40,0 L56,0 L56,100 L40,100 L16,45 L16,100 L0,100 Z"),
    "G": (58, "M58,35 L41,35 C41,23 36,16 30,16 C22,16 18,24 18,50 C18,76 22,84 30,84 "
               "C36,84 41,78 41,66 L41,60 L29,60 L29,45 L58,45 L58,100 L46,100 L45,89 "
               "C41,97 35,100 28,100 C10,100 0,83 0,50 C0,17 11,0 30,0 C46,0 58,14 58,35 Z"),
}
SPACE_W = 26


def word(letters, gap=13):
    """Return (svg_group_body, total_width) for a string of glyphs at cap height 100."""
    parts, x = [], 0
    for ch in letters:
        if ch == " ":
            x += SPACE_W + gap
            continue
        w, d = GLYPHS[ch]
        parts.append(f'<path transform="translate({x:.0f},0)" d="{d}"/>')
        x += w + gap
    return "\n      ".join(parts), (x - gap if x else 0)


WORD_BODY, WORD_W = word("VEILLEUX")


# ---------------------------------------------------------------------- mark
def mark(fg, accent):
    """Split chevron: left limb in the primary ink, right limb in striping yellow."""
    return (
        f'<path fill="{fg}" d="M8,12 L32,12 L50,64 L50,90 L42,90 Z"/>'
        f'<path fill="{accent}" d="M68,12 L92,12 L58,90 L50,90 L50,64 Z"/>'
    )


def svg(w, h, body, extra=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img"{extra}>\n{body}\n</svg>\n'
    )


def write(name, content):
    p = os.path.join(OUT, name)
    with open(p, "w") as f:
        f.write(content)
    print(f"  {name:44} {len(content):>6} B")



DESC = "SEALCOATING & PROPERTY SERVICES"


def desc_width(font_size, tracking):
    """Approximate rendered width of the uppercase descriptor, including tracking."""
    return len(DESC) * (font_size * 0.63 + tracking) - tracking


# --------------------------------------------------------------- 1. the mark
for suffix, fg in (("", ASPHALT), ("-reversed", PAPER)):
    write(f"veilleux-mark{suffix}.svg", svg(
        100, 100,
        f'  <title>Veilleux Sealcoating mark</title>\n  {mark(fg, STRIPE)}'
    ))

# ------------------------------------------------------------- 2. the favicon
write("veilleux-favicon.svg", svg(
    100, 100,
    f'  <title>Veilleux Sealcoating</title>\n'
    f'  <rect width="100" height="100" rx="20" fill="{ASPHALT}"/>\n'
    f'  <g transform="translate(50,52) scale(0.78) translate(-50,-50)">{mark(PAPER, STRIPE)}</g>'
))


# ------------------------------------------------- 3. horizontal lockup
def lockup_horizontal(fg, sub, filename):
    """Mark at left; wordmark, stripe rule, and descriptor stacked to its right."""
    S = 0.62                        # wordmark scale -> cap height 62
    ww = WORD_W * S
    mark_s = 0.86
    gap = 32
    fs, tr = 11.0, 2.2
    dw = desc_width(fs, tr)
    x_word = 100 * mark_s + gap
    block = max(ww, dw)
    W = round(x_word + block) + 2
    y_word = 12
    y_rule = y_word + 100 * S + 14
    H = round(y_rule + 4 + 20) + 6
    body = f"""  <title>Veilleux Sealcoating</title>
  <g transform="translate(0,{(H - 100 * mark_s) / 2:.1f}) scale({mark_s})">{mark(fg, STRIPE)}</g>
  <g fill="{fg}" transform="translate({x_word:.1f},{y_word}) scale({S})">
      {WORD_BODY}
  </g>
  <rect x="{x_word:.1f}" y="{y_rule:.1f}" width="{block:.1f}" height="4" fill="{STRIPE}"/>
  <text x="{x_word:.1f}" y="{y_rule + 21:.1f}" fill="{sub}" font-family="Switzer, Inter, Helvetica Neue, Arial, sans-serif"
        font-size="{fs}" font-weight="600" letter-spacing="{tr}">{DESC.replace("&", "&amp;")}</text>"""
    write(filename, svg(W, H, body))


lockup_horizontal(ASPHALT, MUTED_D, "veilleux-lockup-horizontal.svg")
lockup_horizontal(PAPER,   MUTED,   "veilleux-lockup-horizontal-reversed.svg")


# --------------------------------------------------- 4. stacked lockup
def lockup_stacked(fg, sub, filename):
    S = 0.62
    ww = WORD_W * S
    fs, tr = 11.0, 2.2
    dw = desc_width(fs, tr)
    block = max(ww, dw)
    W = round(block) + 2
    mark_s = 0.78
    y_word = 100 * mark_s + 30
    y_rule = y_word + 100 * S + 15
    H = round(y_rule + 4 + 22) + 6
    body = f"""  <title>Veilleux Sealcoating</title>
  <g transform="translate({(W - 100 * mark_s) / 2:.1f},0) scale({mark_s})">{mark(fg, STRIPE)}</g>
  <g fill="{fg}" transform="translate({(W - ww) / 2:.1f},{y_word:.1f}) scale({S})">
      {WORD_BODY}
  </g>
  <rect x="{(W - block) / 2:.1f}" y="{y_rule:.1f}" width="{block:.1f}" height="4" fill="{STRIPE}"/>
  <text x="{W / 2:.1f}" y="{y_rule + 22:.1f}" fill="{sub}" text-anchor="middle"
        font-family="Switzer, Inter, Helvetica Neue, Arial, sans-serif" font-size="{fs}" font-weight="600"
        letter-spacing="{tr}">{DESC.replace("&", "&amp;")}</text>"""
    write(filename, svg(W, H, body))


lockup_stacked(ASPHALT, MUTED_D, "veilleux-lockup-stacked.svg")
lockup_stacked(PAPER,   MUTED,   "veilleux-lockup-stacked-reversed.svg")


# ------------------------------------------- 5. Vermont + upstate NY territory
VT_PATH = ("M40,10 L214,10 L210,58 L202,110 L206,164 L192,214 L184,266 L176,312 "
           "L74,312 L74,266 L66,218 L58,194 L42,170 L34,142 L50,118 L38,90 L46,62 L30,38 Z")


def territory(fg, line, filename):
    body = f"""  <title>Veilleux Sealcoating service territory</title>
  <path d="{VT_PATH}" fill="{fg}" fill-opacity="0.09" stroke="{fg}" stroke-opacity="0.5"
        stroke-width="3" stroke-linejoin="round"/>
  <circle cx="66" cy="120" r="8" fill="{STRIPE}"/>
  <circle cx="66" cy="120" r="17" fill="none" stroke="{STRIPE}" stroke-opacity="0.4" stroke-width="2.5"/>
  <line x1="83" y1="120" x2="112" y2="120" stroke="{STRIPE}" stroke-opacity="0.55" stroke-width="2.5"/>
  <text x="120" y="125" fill="{line}" font-family="Switzer, Inter, Helvetica Neue, Arial, sans-serif"
        font-size="14" font-weight="600" letter-spacing="2.2">ESSEX, VT</text>
  <text x="128" y="238" fill="{line}" text-anchor="middle" font-family="Switzer, Inter, Helvetica Neue, Arial, sans-serif"
        font-size="12.5" font-weight="500" letter-spacing="3" opacity="0.55">VERMONT</text>"""
    write(filename, svg(248, 330, body))


territory(ASPHALT, MUTED_D, "vermont-territory.svg")
territory(PAPER,   MUTED,   "vermont-territory-reversed.svg")


# ------------------------------------------------------------ 6. brand sheet
def swatch(x, y, hexv, name, note, label_fill):
    return f"""  <rect x="{x}" y="{y}" width="150" height="96" rx="5" fill="{hexv}" stroke="#FFFFFF" stroke-opacity="0.22"/>
  <text x="{x}" y="{y + 120}" fill="{label_fill}" font-family="Switzer, Inter, Arial, sans-serif" font-size="13" font-weight="650" letter-spacing="1.6">{name}</text>
  <text x="{x}" y="{y + 139}" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12" letter-spacing="0.8">{hexv}</text>
  <text x="{x}" y="{y + 156}" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="11" opacity="0.72">{note}</text>"""


def brand_sheet():
    W, H = 1300, 1180
    S = 0.5
    rows = [
        ("#05070C", "VOID",    "Page ground"),
        ("#0A0C10", "ASPHALT", "Primary ink"),
        ("#12161D", "SLAB",    "Raised panel"),
        ("#F2C511", "STRIPE",  "Accent — use sparingly"),
        ("#E9ECF1", "CHALK",   "Primary text on dark"),
        ("#8A93A3", "GRAVEL",  "Secondary text"),
    ]
    sw = "\n".join(swatch(64 + i * 176, 408, h, n, note, PAPER) for i, (h, n, note) in enumerate(rows))
    body = f"""  <title>Veilleux Sealcoating — brand sheet</title>
  <rect width="{W}" height="{H}" fill="#05070C"/>
  <rect x="64" y="56" width="{W - 128}" height="4" fill="{STRIPE}"/>
  <text x="64" y="104" fill="{PAPER}" font-family="Switzer, Inter, Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="4">BRAND SHEET</text>
  <text x="{W - 64}" y="104" fill="{MUTED}" text-anchor="end" font-family="Switzer, Inter, Arial, sans-serif" font-size="13" letter-spacing="2">VEILLEUX SEALCOATING LLC · ESSEX, VERMONT</text>

  <g transform="translate(64,168)">{mark(PAPER, STRIPE)}</g>
  <g fill="{PAPER}" transform="translate(212,178) scale({S})">
      {WORD_BODY}
  </g>
  <rect x="212" y="238" width="{WORD_W * S:.1f}" height="4" fill="{STRIPE}"/>
  <text x="212" y="262" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="14" font-weight="500" letter-spacing="3.4">SEALCOATING &amp; PROPERTY SERVICES</text>

  <text x="64" y="352" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="3.4">PALETTE</text>
  <line x1="64" y1="368" x2="{W - 64}" y2="368" stroke="{PAPER}" stroke-opacity="0.13"/>
{sw}

  <text x="64" y="700" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="3.4">TYPOGRAPHY</text>
  <line x1="64" y1="716" x2="{W - 64}" y2="716" stroke="{PAPER}" stroke-opacity="0.13"/>
  <text x="64" y="778" fill="{PAPER}" font-family="Tanker, Impact, sans-serif" font-size="54" letter-spacing="-0.5">TANKER — DISPLAY</text>
  <text x="64" y="806" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12.5" letter-spacing="1.6">Headlines and statements. Tight tracking, sentence-length maximum.</text>
  <text x="64" y="874" fill="{PAPER}" font-family="Switzer, Inter, Arial, sans-serif" font-size="30" font-weight="600">Switzer — interface and body</text>
  <text x="64" y="902" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12.5" letter-spacing="1.6">Body copy, navigation, forms, and captions. 400 / 500 / 600 / 700.</text>
  <text x="64" y="952" fill="{STRIPE}" font-family="Switzer, Inter, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="4.4">EYEBROW — SWITZER 700, 4.4 TRACKING, UPPERCASE</text>

  <text x="64" y="1024" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="3.4">THE RULE</text>
  <line x1="64" y1="1040" x2="{W - 64}" y2="1040" stroke="{PAPER}" stroke-opacity="0.13"/>
  <rect x="64" y="1074" width="150" height="5" fill="{STRIPE}"/>
  <text x="64" y="1116" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="13" letter-spacing="0.9">A four-to-five pixel stripe is the one recurring device: section markers, active nav, focus states,</text>
  <text x="64" y="1136" fill="{MUTED}" font-family="Switzer, Inter, Arial, sans-serif" font-size="13" letter-spacing="0.9">and the underline beneath the wordmark. It is the freshly cut edge. Never use it as a fill.</text>"""
    write("veilleux-brand-sheet.svg", svg(W, H, body))


brand_sheet()
print("\nbrand system written to public/brand/")
