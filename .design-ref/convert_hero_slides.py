from pathlib import Path
from PIL import Image

assets = Path(r"C:\Users\DELL\.cursor\projects\c-Next-js-projects-The-Barker-Shoppe\assets")
dest = Path(r"c:\Next-js-projects\The Barker Shoppe\public\images")

patterns = [
    ("*IMG_0454*", "hero-slide-1.jpg", "Husky smiling on the turf yard"),
    ("*IMG_5123*", "hero-slide-2.jpg", "Two dogs looking up from the turf"),
    ("*65045921*", "hero-slide-3.jpg", "Golden retriever resting on the turf"),
    ("*IMG_4245*", "hero-slide-4.jpg", "Three dogs playing tug on the yard"),
]

alts = {}
for pattern, out_name, alt in patterns:
    matches = list(assets.glob(pattern))
    print(pattern, "->", [m.name for m in matches])
    if not matches:
        raise SystemExit(f"missing {pattern}")
    src = matches[0]
    im = Image.open(src).convert("RGB")
    im.thumbnail((1600, 2000))
    out = dest / out_name
    im.save(out, "JPEG", quality=88, optimize=True)
    print("saved", out_name, im.size)
    alts[out_name] = alt

print("done")
