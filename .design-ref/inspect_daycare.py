from pathlib import Path
import re

p = Path(r"c:\Next-js-projects\The Barker Shoppe\.design-ref\daycare.html")
text = p.read_text(encoding="utf-8", errors="replace")
print("len", len(text))
print("head", text[:2000])
print("---")
# find interesting markers
for pat in ["artifact", "html_content", "compressed", "inflate", "pako", "base64", "textarea", "APPLICATION_JSON", "type=\"application", "id=\"root\"", "claude", "unpack"]:
    idxs = [m.start() for m in re.finditer(pat, text, re.I)]
    print(pat, idxs[:5], "count", len(idxs))
