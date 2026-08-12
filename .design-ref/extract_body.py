import re
from pathlib import Path

out = Path(r"c:\Next-js-projects\The Barker Shoppe\.design-ref")

for name in ["daycare-unpacked.html", "pricing-unpacked.html", "services-unpacked.html"]:
    html = (out / name).read_text(encoding="utf-8")
    # Drop font-face blocks
    html = re.sub(r"@font-face\s*\{[^}]+\}", "", html)
    # Find body content after style
    # Keep style block that has page CSS (not fonts)
    styles = re.findall(r"<style[^>]*>(.*?)</style>", html, re.S | re.I)
    page_css = []
    for s in styles:
        if "font-face" in s and len(s) < 5000:
            continue
        # keep non-font css
        cleaned = re.sub(r"@font-face\s*\{[^}]+\}", "", s)
        if len(cleaned.strip()) > 50:
            page_css.append(cleaned.strip())
    css_path = out / name.replace("-unpacked.html", "-styles.css")
    css_path.write_text("\n\n".join(page_css), encoding="utf-8")

    # Extract from first meaningful section / main
    # Remove head
    body = re.sub(r"<head>.*?</head>", "", html, flags=re.S | re.I)
    body = re.sub(r"<style[^>]*>.*?</style>", "", body, flags=re.S | re.I)
    body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.S | re.I)
    body = re.sub(r"<link[^>]*>", "", body, flags=re.I)
    body = re.sub(r"\s{2,}", " ", body)
    # Pretty-ish: break on major tags
    for tag in ["section", "header", "footer", "nav", "main", "article"]:
        body = re.sub(rf"<{tag}\b", f"\n<{tag}", body, flags=re.I)
        body = re.sub(rf"</{tag}>", f"</{tag}>\n", body, flags=re.I)
    dest = out / name.replace("-unpacked.html", "-body.html")
    dest.write_text(body[:120000], encoding="utf-8")
    print(name, "css", css_path.stat().st_size, "body", dest.stat().st_size)
