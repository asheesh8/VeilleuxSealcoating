#!/usr/bin/env python3
"""Curate, orient-correct, and optimize Veilleux source photography."""
import os, sys
from PIL import Image, ImageOps
Image.MAX_IMAGE_PIXELS = None

SP  = "/private/tmp/claude-501/-Users-ashishsubedi-Desktop-ARKITECH-SOLUTIONS-01-Active-Client-Work-VeilleuxSealcoating/0ed2062d-7f5c-4bdc-8527-614eaa5ba335/scratchpad"
RAW = os.path.join(SP, "raw")
PROJ = "/Users/ashishsubedi/Desktop/ARKITECH SOLUTIONS/01-Active-Client-Work/VeilleuxSealcoating"
OUT = os.path.join(PROJ, "public/media/work")
HERO = os.path.join(PROJ, "public/media/hero")
os.makedirs(OUT, exist_ok=True); os.makedirs(HERO, exist_ok=True)

# id -> (slug, category, caption)
MAP = {
    # --- Sealcoating: full driveway results -------------------------------
    "667a2ea0a9ef86fcf3cd342c": ("seal-colonial-tape",   "sealcoating", "Fresh seal on a colonial driveway, taped and cut clean to the apron."),
    "667a58d519bb7a30ab4da511": ("seal-wooded-curve",    "sealcoating", "A wooded approach sealed edge to edge, no overspray on the shoulder."),
    "667a592401d4bdc47d94f4bf": ("seal-colonial-deep",   "sealcoating", "Two-coat finish on a residential drive in Essex."),
    "667a5ab2a9ef867701cd75a1": ("seal-sweep-wide",      "sealcoating", "A long sweeping drive, brushed and sealed in a single day."),
    "667a5ac419bb7a83de4da618": ("seal-yellow-house",    "sealcoating", "Driveway and parking apron sealed to the garage slab."),
    "667a5c79a9ef8648d5cd764e": ("seal-gray-house",      "sealcoating", "Crack-filled and sealed ahead of the first freeze."),
    "667a5cc519bb7acc814da6b4": ("seal-tree-curve",      "sealcoating", "Tree-lined drive, hand-edged where the machine can't reach."),
    "667a5cf819bb7a96764da6ba": ("seal-blue-house",      "sealcoating", "A full residential drive restored to a deep, even black."),
    "667a5ce734b4a1df8ff2893c": ("seal-ranch-house",     "sealcoating", "Ranch driveway sealed curb to garage."),
    "67aad973eeb73726e4695a4e": ("seal-newbuild",        "sealcoating", "New construction sealed before handover."),
    "67ae3d7cc97b1a1ceaf238e1": ("seal-drive-approach",  "sealcoating", "The approach shot: clean line, clean shoulder, no tracking."),
    # --- Sealcoating: the edge (prep detail) ------------------------------
    "667a56aa34b4a14631f2875a": ("edge-detail-lawn",     "sealcoating", "The cut line where seal meets lawn. This is the part people notice."),
    "667a58f7a9ef865bb3cd74df": ("edge-detail-house",    "sealcoating", "Edged by hand so the boundary stays crisp after it cures."),
    "667a591319bb7aa3f74da539": ("edge-detail-colonial", "sealcoating", "A straight edge held the full length of the drive."),
    "667a5ad219bb7a24c24da623": ("edge-detail-sign",     "sealcoating", "Sealed up to the fixture without a drop on the base."),
    "667a5c31a9ef86252ccd7635": ("edge-detail-mailbox",  "sealcoating", "Tight work around the mailbox post."),
    "667a5c8da9ef869438cd7653": ("edge-detail-drive",    "sealcoating", "Edge held clean along the full run."),
    "667a5f3401d4bd7daa94f719": ("edge-detail-pine",     "sealcoating", "Sealed to the treeline, shoulder left clean."),
    # --- The night work: proof of finish ----------------------------------
    "667a5c6934b4a17efff28925": ("night-garage-glow",    "sealcoating", "A cured drive under a garage light. A good seal reads like water."),
    "667a5f4fa9ef864d27cd7778": ("night-commercial-lot", "commercial",  "Commercial lot sealed and restriped, photographed after dark."),
    # --- Commercial pavement ----------------------------------------------
    "67aaf54337d82f518bea0805": ("commercial-lot",       "commercial",  "Retail lot maintenance: sealing, striping, and pothole repair."),
    "67ae3dbd77c227dce34da2b5": ("commercial-fence-line","commercial",  "Fence-line pavement cleaned back before repair."),
    "67ae3e805ab0605db85390ec": ("commercial-bollard",   "commercial",  "Loading dock apron, bollard base repaired."),
    "67ae3e904478e14f1619d621": ("commercial-dock",      "commercial",  "Dock approach prepped for patch and seal."),
    "67ae3e9e9b4e264ce9b103df": ("commercial-yard",      "commercial",  "Working yard kept clear and serviceable year-round."),
    # --- Winter -------------------------------------------------------------
    "67aaf3e2eeb7372e066bef16": ("plow-truck-autumn",    "winter",      "Blade on before the first storm of the season."),
    "67ae40fb45496e7aee5035c0": ("plow-truck-snow",      "winter",      "First plowable snow, Chittenden County."),
    "67ae410b9b4e261138b112c1": ("plow-truck-night",     "winter",      "Two in the morning. Commercial route, Vermont and upstate New York."),
    "67ae41166e583953c12a1670": ("plow-field-dawn",      "winter",      "Dawn after an overnight push."),
    # --- Grounds & seasonal --------------------------------------------------
    "66ffc1a4bcac5c4e984a487d": ("cleanup-brush",        "grounds",     "Spring cleanup: winter debris cleared and hauled."),
    "66ffc25f2b3a941b732df5da": ("mowing-rig",           "grounds",     "Commercial mowing rig staged for a route."),
    # --- Carpentry & handyman -------------------------------------------------
    "67aaf6f6eeb737fac76bf0e1": ("deck-frame",           "handyman",    "Deck framed and decked for a repeat client."),
    "67ae433473de400a5eb98e99": ("bath-surround",        "handyman",    "Tub surround reset and sealed."),
    "67ae433d79162cb8f41ee10c": ("bath-refresh",         "handyman",    "Half-bath refresh: fixture, trim, and paint."),
    "67ae434545496e0b43503759": ("interior-paint",       "handyman",    "Interior repaint, trimmed and cut in by hand."),
    # --- Trucks & haul ----------------------------------------------------------
    "66ffc0329274d0004a6fea4c": ("truck-residential",    "hauling",     "The rig that shows up. One-ton dump, Essex, Vermont."),
    "67aaf5bc4325e1d7cf64cb3a": ("truck-loaded-autumn",  "hauling",     "Loaded out at the end of a fall cleanup."),
    "67aaf64c4325e16e8864cbfa": ("hauling-rig",          "hauling",     "Equipment trailer and dump staged on site."),
    "67ae456cf6d1f0f97ac240d7": ("truck-lawn",           "hauling",     "Junk removal pickup, residential."),
    "67ae46419b4e26c966b11789": ("truck-bed-load",       "hauling",     "Non-trash haul-away, loaded and strapped."),
    "67ae46be73de407a07b9944c": ("truck-driveway-load",  "hauling",     "Clean-out hauled off the same day."),
}

# Images good enough to serve at hero resolution
HERO_GRADE = {
    "seal-sweep-wide", "seal-colonial-tape", "seal-newbuild", "night-garage-glow",
    "night-commercial-lot", "seal-wooded-curve", "plow-truck-night", "seal-tree-curve",
}

WIDTHS = [(1600, "-1600"), (900, "-900")]
HERO_W = 2560


def save_webp(im, path, q=82):
    im.save(path, "WEBP", quality=q, method=6)


def main():
    manifest = []
    files = {f.split(".")[0]: f for f in os.listdir(RAW) if not f.startswith(".")}
    for iid, (slug, cat, caption) in sorted(MAP.items(), key=lambda x: x[1][0]):
        fn = files.get(iid)
        if not fn:
            print("MISSING", iid, slug); continue
        im = Image.open(os.path.join(RAW, fn))
        im = ImageOps.exif_transpose(im).convert("RGB")
        w, h = im.size
        widths = list(WIDTHS)
        if slug in HERO_GRADE:
            widths = [(HERO_W, "-2560")] + widths
        made = []
        for tw, suf in widths:
            if tw > w:
                tw = w
            th = round(h * tw / w)
            r = im.resize((tw, th), Image.LANCZOS)
            p = os.path.join(OUT, f"{slug}{suf}.webp")
            save_webp(r, p, 78 if tw > 2000 else (74 if tw > 1200 else 72))
            made.append((suf, tw, th, os.path.getsize(p)))
        manifest.append({
            "slug": slug, "category": cat, "caption": caption,
            "orientation": "portrait" if h > w else "landscape",
            "source": fn, "native": f"{w}x{h}", "renditions": made,
        })
        print(f"{slug:24} {cat:12} {w}x{h} -> " + ", ".join(f"{s[1]}px/{s[3]//1024}kb" for s in made))

    import json
    with open(os.path.join(SP, "media_manifest.json"), "w") as fh:
        json.dump(manifest, fh, indent=2)
    print(f"\nDONE {len(manifest)} images")


if __name__ == "__main__":
    main()
