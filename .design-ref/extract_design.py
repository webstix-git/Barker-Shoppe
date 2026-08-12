import re
from pathlib import Path

out = Path(__file__).parent
for name in ["daycare.html", "pricing.html", "services.html"]:
    src = out / name
    if not src.exists():
        # try downloads
        dl = {
            "daycare.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Daycare.html"),
            "pricing.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Pricing.html"),
            "services.html": Path(r"c:\Users\DELL\Downloads\Barker Shoppe Services.html"),
        }[name]
        text = dl.read_text(encoding="utf-8", errors="replace")
        src.write_text(text, encoding="utf-8")
    else:
        text = src.read_text(encoding="utf-8", errors="replace")

    clean = re.sub(r"data:image/[^\"']+", "data:image/omitted", text)
    clean = re.sub(r"(data:image/omitted)[^\"']{50,}", r"\1...", clean)
    m = re.search(r"<body[^>]*>(.*)</body>", clean, re.I | re.S)
    body = m.group(1) if m else clean
    body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.I | re.S)
    body = re.sub(r"\n{3,}", "\n\n", body)

    dest = out / name.replace(".html", "-structure.html")
    dest.write_text(body[:250000], encoding="utf-8")
    print(name, "orig", len(text), "structure", dest.stat().st_size)

    texts = re.findall(r">([^<]{3,140})<", body)
    print("KEY TEXTS:")
    seen = set()
    for t in texts:
        t = re.sub(r"\s+", " ", t).strip()
        if not t or t in seen:
            continue
        if t.startswith(("http", "data:", "function", "var ", "const ", "{", ".", "#")):
            continue
        if re.fullmatch(r"[\d\s\$\.,/%\-–—]+", t):
            # keep prices
            pass
        seen.add(t)
        print(" |", t[:120])
    print("=====\n")
