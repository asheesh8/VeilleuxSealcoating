#!/usr/bin/env python3
"""
Build the hero plate: a graded 16:9 frame cut from the night driveway shot,
intended as the seed image for an image-to-video model.

Grade is deliberately restrained — deepen and cool the asphalt, protect the
warm specular column from the garage lights, and add a soft vignette so the
frame reads cinematic without looking filtered.
"""
import math
import os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

Image.MAX_IMAGE_PIXELS = None

SP = "/private/tmp/claude-501/-Users-ashishsubedi-Desktop-ARKITECH-SOLUTIONS-01-Active-Client-Work-VeilleuxSealcoating/0ed2062d-7f5c-4bdc-8527-614eaa5ba335/scratchpad"
PROJ = "/Users/ashishsubedi/Desktop/ARKITECH SOLUTIONS/01-Active-Client-Work/VeilleuxSealcoating"
HERO = os.path.join(PROJ, "public/media/hero")
os.makedirs(HERO, exist_ok=True)

SRC_ID = "667a5c6934b4a17efff28925"   # night-garage-glow


def channel_luts():
    """Cool the shadows, hold the highlights. Returns a 768-entry LUT."""
    r, g, b = [], [], []
    for i in range(256):
        x = i / 255.0
        shadow = (1.0 - x) ** 1.8          # weight toward the dark end
        r.append(max(0, min(255, round(i - 7.0 * shadow))))
        g.append(max(0, min(255, round(i - 2.0 * shadow))))
        b.append(max(0, min(255, round(i + 9.0 * shadow))))
    return r + g + b


def s_curve(im, contrast=1.14, black_point=6):
    """Gentle filmic contrast with a real black point."""
    lut = []
    for i in range(256):
        x = (i - black_point) / (255.0 - black_point)
        x = max(0.0, x)
        x = (x - 0.5) * contrast + 0.5
        x = max(0.0, min(1.0, x))
        # slight toe so the blacks roll off instead of clipping flat
        x = x ** 1.03
        lut.append(round(x * 255))
    return im.point(lut * 3)


def vignette(im, strength=0.34, radius=1.06):
    w, h = im.size
    small = (max(w // 8, 64), max(h // 8, 64))
    mask = Image.new("L", small)
    px = mask.load()
    cx, cy = small[0] / 2, small[1] / 2
    maxd = math.hypot(cx, cy) * radius
    for y in range(small[1]):
        for x in range(small[0]):
            d = math.hypot(x - cx, y - cy) / maxd
            v = 1.0 - strength * (d ** 2.1)
            px[x, y] = max(0, min(255, int(v * 255)))
    mask = mask.resize((w, h), Image.BICUBIC).filter(ImageFilter.GaussianBlur(w / 60))
    black = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(im, black, mask)


def main():
    src = [f for f in os.listdir(f"{SP}/raw") if f.startswith(SRC_ID)][0]
    im = ImageOps.exif_transpose(Image.open(f"{SP}/raw/{src}")).convert("RGB")
    w, h = im.size
    print(f"source {src}  {w}x{h}")

    # 16:9 crop that puts the garage on the upper third and fills the lower
    # two-thirds with the reflecting driveway.
    target_h = round(w * 9 / 16)
    top = round(h * 0.198)
    if top + target_h > h:
        top = h - target_h
    im = im.crop((0, top, w, top + target_h))
    print(f"cropped -> {im.size}")

    im = s_curve(im)
    im = im.point(channel_luts())
    im = ImageEnhance.Color(im).enhance(1.07)
    im = ImageEnhance.Sharpness(im).enhance(1.18)
    im = vignette(im)

    master = im.resize((2560, 1440), Image.LANCZOS)
    master.save(f"{HERO}/veilleux-hero-plate-2560.jpg", quality=95, subsampling=0)

    hd = im.resize((1920, 1080), Image.LANCZOS)
    hd.save(f"{HERO}/veilleux-hero-plate-1920.jpg", quality=95, subsampling=0)

    # Poster frame the site can use until the film exists
    master.resize((2560, 1440), Image.LANCZOS).save(
        f"{HERO}/veilleux-hero-poster.webp", "WEBP", quality=82, method=6
    )

    for f in ("veilleux-hero-plate-2560.jpg", "veilleux-hero-plate-1920.jpg", "veilleux-hero-poster.webp"):
        print(f"  {f:36} {os.path.getsize(os.path.join(HERO, f)) // 1024} KB")


if __name__ == "__main__":
    main()
