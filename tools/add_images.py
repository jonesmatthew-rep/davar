"""Convert illustration PNGs to 512px WebP in img/ and point each lesson item at its picture.

Usage (from the project folder):  python tools/add_images.py <folder of PNGs named by item id>

Items without their own picture can borrow one through ALIAS (item id -> picture name).
"""
import os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALIAS = {
    "zeh": "point", "zot": "point", "hu": "ish", "hi": "ishah",
    "ani": "s-ani-ish", "atah": "s-zeh-ish", "at": "s-zot-ishah",
    "s-hu-av": "av", "s-hi-em": "em", "gam": "s-gam-hi-yaldah",
    "s3-elohim-amar": "elohim", "s3-elohim-bara": "bara",
    "hayah": "s3-yeled-hayah-babayit", "et": "s3-yeled-raah-et-sus",
}

src = sys.argv[1]
out = os.path.join(ROOT, "img")
os.makedirs(out, exist_ok=True)
for f in sorted(os.listdir(src)):
    if f.endswith(".png"):
        im = Image.open(os.path.join(src, f)).convert("RGB").resize((512, 512), Image.LANCZOS)
        im.save(os.path.join(out, f[:-4] + ".webp"), "WEBP", quality=80, method=6)
have = {f[:-5] for f in os.listdir(out) if f.endswith(".webp")}

path = os.path.join(ROOT, "data", "lessons.js")
text = open(path, encoding="utf-8").read()
missing = []
def add(m):
    line, item_id = m.group(0), m.group(1)
    name = ALIAS.get(item_id, item_id)
    line = re.sub(r', img: "[^"]*"', "", line)
    if name not in have:
        missing.append(item_id)
        return line
    return line.replace(f'id: "{item_id}",', f'id: "{item_id}", img: "img/{name}.webp",', 1)
text = re.sub(r'\{ id: "([^"]+)",[^\n]*\}', add, text)
open(path, "w", encoding="utf-8").write(text)
print(f"{len(have)} pictures in img/; items without a picture: {missing or 'none'}")
