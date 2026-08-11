"""Build iOS app icon + splash from the real BioSense S-mark."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MARK = ROOT / "public" / "biosense-mark.png"


def main() -> None:
    mark = Image.open(MARK).convert("RGBA")
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)

    size = 1024
    bg = Image.new("RGBA", (size, size), (247, 245, 240, 255))

    target = int(size * 0.62)
    ratio = min(target / mark.width, target / mark.height)
    new_w = max(1, int(mark.width * ratio))
    new_h = max(1, int(mark.height * ratio))
    mark = mark.resize((new_w, new_h), Image.Resampling.LANCZOS)

    x = (size - new_w) // 2
    y = (size - new_h) // 2
    bg.paste(mark, (x, y), mark)
    out_rgb = bg.convert("RGB")

    paths = [
        ROOT / "mobile" / "resources" / "icon.png",
        ROOT / "mobile" / "resources" / "splash.png",
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

    splash_dir = (
        ROOT
        / "mobile"
        / "ios"
        / "App"
        / "App"
        / "Assets.xcassets"
        / "Splash.imageset"
    )
    if splash_dir.exists():
        canvas = Image.new("RGB", (2732, 2732), (247, 245, 240))
        big = out_rgb.resize((1200, 1200), Image.Resampling.LANCZOS)
        canvas.paste(big, ((2732 - 1200) // 2, (2732 - 1200) // 2))
        for name in (
            "splash-2732x2732.png",
            "splash-2732x2732-1.png",
            "splash-2732x2732-2.png",
        ):
            dest = splash_dir / name
            canvas.save(dest, "PNG")
            print("wrote", dest)


if __name__ == "__main__":
    main()
