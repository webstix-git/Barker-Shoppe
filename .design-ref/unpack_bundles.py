import json
import re
from pathlib import Path

out = Path(r"c:\Next-js-projects\The Barker Shoppe\.design-ref")
dlmap = {
    "daycare.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Daycare.html"),
    "pricing.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Pricing.html"),
    "services.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Services.html"),
}


def extract_bundle(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="replace")
    m = re.search(
        r'<script[^>]*type="__bundler/template"[^>]*>(.*?)</script>',
        text,
        re.I | re.S,
    )
    if not m:
        raise SystemExit(f"no template in {path.name}")
    template = json.loads(m.group(1))
    if isinstance(template, dict):
        return template.get("html") or template.get("content") or ""
    return template if isinstance(template, str) else ""


summary_lines = []
for name in ["daycare.html", "pricing.html", "services.html"]:
    src = out / name
    if not src.exists() or src.stat().st_size < 1000:
        src.write_text(dlmap[name].read_text(encoding="utf-8", errors="replace"), encoding="utf-8")
    html = extract_bundle(src)
    clean = re.sub(r"data:image/[^\"')\s]+", "IMG", html)
    clean = re.sub(r"url\(IMG[^)]*\)", "url(IMG)", clean)
    dest = out / name.replace(".html", "-unpacked.html")
    dest.write_text(clean, encoding="utf-8")

    texts = re.findall(r">([^<]{2,180})<", clean)
    seen = set()
    lines = []
    for t in texts:
        t = re.sub(r"\s+", " ", t).strip()
        if not t or t in seen:
            continue
        if t.startswith(("http", "IMG", "fi ", ".", "#", "{", "function")):
            continue
        seen.add(t)
        lines.append(t)

    text_dest = out / name.replace(".html", "-texts.txt")
    text_dest.write_text("\n".join(lines), encoding="utf-8")
    summary_lines.append(f"{name}: html={len(html)} clean={len(clean)} texts={len(lines)}")

(out / "unpack-summary.txt").write_text("\n".join(summary_lines), encoding="utf-8")
print("\n".join(summary_lines))
