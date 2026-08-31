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

    preview = ROOT / "mobile" / "resources" / "icon-preview.png"
    out_rgb.save(preview, "PNG")
    print("wrote", preview)


if __name__ == "__main__":
    main()
