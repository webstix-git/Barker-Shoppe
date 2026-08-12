import re
from pathlib import Path

out = Path(r"c:\Next-js-projects\The Barker Shoppe\.design-ref")

for name in ["services-body.html", "pricing-body.html"]:
    html = (out / name).read_text(encoding="utf-8")
    # Split into sections with brief summaries
    sections = re.findall(r"<section\b[^>]*>.*?</section>", html, flags=re.S | re.I)
    lines = [f"{name}: {len(sections)} sections\n"]
    for i, sec in enumerate(sections):
        texts = re.findall(r">([^<]{2,100})<", sec)
        clean = []
        for t in texts:
            t = re.sub(r"\s+", " ", t).strip()
            if t and not t.startswith(("http", "fi ", ".", "#")):
                clean.append(t[:90])
        # unique preserve order
        seen = set()
        uniq = []
        for t in clean:
            if t not in seen:
                seen.add(t)
                uniq.append(t)
        lines.append(f"\n## SECTION {i}")
        # grab background from style
        bg = re.search(r"background:([^;\"']+)", sec)
        lines.append(f"bg: {bg.group(1) if bg else '?'}")
        lines.append(" | ".join(uniq[:25]))
    (out / name.replace("-body.html", "-sections.txt")).write_text("\n".join(lines), encoding="utf-8")
    print(name, len(sections))
