import re
from pathlib import Path

out = Path(r"c:\Next-js-projects\The Barker Shoppe\.design-ref")
for name in ["services-body.html", "pricing-body.html"]:
    html = (out / name).read_text(encoding="utf-8")
    sections = re.findall(r"<section\b[^>]*>.*?</section>", html, flags=re.S | re.I)
    # Write section 0 and 1 pretty-printed lightly
    for i in [0, 1, 2]:
        if i >= len(sections):
            continue
        sec = sections[i]
        # collapse long style attrs for readability - keep first 80 chars of style
        pretty = re.sub(
            r'style="([^"]{0,120})[^"]*"',
            lambda m: f'style="{m.group(1)}..."' if len(m.group(0)) > 140 else m.group(0),
            sec,
        )
        pretty = re.sub(r"><", ">\n<", pretty)
        (out / f"{name.replace('-body.html','')}-sec{i}.html").write_text(pretty[:15000], encoding="utf-8")
    print(name, "ok")
