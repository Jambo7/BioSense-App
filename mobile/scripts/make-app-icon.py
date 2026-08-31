"""HD iOS app icon: full-bleed square (Apple applies the squircle).

Do not pre-round the canvas — that is what made the nested white box.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
MARK = ROOT / "public" / "biosense-mark.png"
SIZE = 1024


def knock_out_white(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 248 and g > 248 and b > 248:
                px[x, y] = (r, g, b, 0)
    return im


def gradient_bg() -> Image.Image:
    img = Image.new("RGB", (SIZE, SIZE))
    px = img.load()
    # Warm cream at the top, soft sage at the bottom.
    top = (252, 250, 246)
    bot = (214, 226, 212)
    for y in range(SIZE):
        t = y / (SIZE - 1)
        t = t * t * (3 - 2 * t)
        r = int(top[0] + (bot[0] - top[0]) * t)
        g = int(top[1] + (bot[1] - top[1]) * t)
        b = int(top[2] + (bot[2] - top[2]) * t)
        for x in range(SIZE):
            px[x, y] = (r, g, b)
    return img


def shine_layer() -> Image.Image:
    shine = Image.new("L", (SIZE, SIZE), 0)
    d = ImageDraw.Draw(shine)
    # Soft highlight across the upper third.
    d.ellipse((-200, -420, SIZE + 80, 520), fill=210)
    shine = shine.filter(ImageFilter.GaussianBlur(90))
    overlay = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
    overlay.putalpha(shine.point(lambda v: int(v * 0.38)))
    return overlay


def main() -> None:
    mark = knock_out_white(Image.open(MARK))
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)
    mark_src = mark.copy()

    canvas = gradient_bg().convert("RGBA")
    canvas = Image.alpha_composite(canvas, shine_layer())

    target = int(SIZE * 0.58)
    ratio = min(target / mark.width, target / mark.height)
    new_w = max(1, int(mark.width * ratio))
    new_h = max(1, int(mark.height * ratio))
    mark = mark.resize((new_w, new_h), Image.Resampling.LANCZOS)
    x = (SIZE - new_w) // 2
    y = (SIZE - new_h) // 2 - 8
    canvas.paste(mark, (x, y), mark)

    out_rgb = canvas.convert("RGB")

    paths = [
        ROOT / "mobile" / "resources" / "icon.png",
        ROOT
        / "mobile"
        / "ios"
        / "App"
        / "App"
        / "Assets.xcassets"
        / "AppIcon.appiconset"
        / "AppIcon-512@2x.png",
    ]
    for path in paths:
        path.parent.mkdir(parents=True, exist_ok=True)
        out_rgb.save(path, "PNG")
        print("wrote", path)

    downloads = Path.home() / "Downloads"
    downloads.mkdir(parents=True, exist_ok=True)
    square = downloads / "BioSense-App-Icon.png"
    out_rgb.save(square, "PNG")
    print("wrote", square)

    # Home-screen preview only — Apple still needs the square file above.
    r = 228
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, SIZE - 1, SIZE - 1), radius=r, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    preview = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    preview.paste(out_rgb.convert("RGBA"), (0, 0))
    preview.putalpha(mask)
    home = downloads / "BioSense-App-Icon-homescreen.png"
    preview.save(home, "PNG")
    print("wrote", home)

    cream = (247, 245, 240)
    splash_size = 2732
    splash = Image.new("RGB", (splash_size, splash_size), cream)
    s_mark = mark_src.copy()
    s_target = int(splash_size * 0.22)
    s_ratio = min(s_target / s_mark.width, s_target / s_mark.height)
    s_w = max(1, int(s_mark.width * s_ratio))
    s_h = max(1, int(s_mark.height * s_ratio))
    s_mark = s_mark.resize((s_w, s_h), Image.Resampling.LANCZOS)
    splash.paste(
        s_mark,
        ((splash_size - s_w) // 2, (splash_size - s_h) // 2),
        s_mark,
    )

    splash_paths = [
        ROOT / "mobile" / "resources" / "splash.png",
        ROOT
        / "mobile"
        / "ios"
        / "App"
        / "App"
        / "Assets.xcassets"
        / "Splash.imageset"
        / "splash-2732x2732.png",
        ROOT
        / "mobile"
        / "ios"
        / "App"
        / "App"
        / "Assets.xcassets"
        / "Splash.imageset"
        / "splash-2732x2732-1.png",
        ROOT
        / "mobile"
        / "ios"
        / "App"
        / "App"
        / "Assets.xcassets"
        / "Splash.imageset"
        / "splash-2732x2732-2.png",
    ]
    for path in splash_paths:
        path.parent.mkdir(parents=True, exist_ok=True)
        splash.save(path, "PNG")
        print("wrote", path)

    splash.save(downloads / "BioSense-Launch-Splash.png", "PNG")
    print("wrote", downloads / "BioSense-Launch-Splash.png")


if __name__ == "__main__":
    main()
