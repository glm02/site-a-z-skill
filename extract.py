"""Extrait du site WordPress actuel (thème Houzez) le contenu utile à la refonte :
textes de chaque page, fiches annonces, liste des photos, couleurs et polices.
Sorties : content/pages.json, content/properties.json, content/images.txt, content/design.json
"""
import json
import re
import html as htmlmod
from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
OUT = ROOT / "content"
OUT.mkdir(exist_ok=True)


def clean(text):
    text = htmlmod.unescape(text or "")
    return re.sub(r"\s+", " ", text).strip()


def main_text(soup):
    """Texte de la zone principale, sans header/footer/menus/scripts."""
    for tag in soup(["script", "style", "noscript", "svg", "header", "footer", "nav", "form"]):
        tag.decompose()
    main = soup.select_one("#main-wrap") or soup.select_one("main") or soup.body
    lines = []
    for el in main.find_all(["h1", "h2", "h3", "h4", "h5", "p", "li", "span", "a", "strong"]):
        if el.find(["h1", "h2", "h3", "h4", "h5", "p", "li"]):
            continue
        t = clean(el.get_text(" "))
        if t and (not lines or lines[-1] != t):
            lines.append(t)
    return lines


def images_of(soup):
    srcs = set()
    for img in soup.find_all("img"):
        for attr in ("data-src", "src", "data-lazy-src"):
            v = img.get(attr)
            if v and "wp-content/uploads" in v:
                srcs.add(v)
    for m in re.finditer(r"https://www\.liccia-immo\.fr/wp-content/uploads/[^\s\"')]+?\.(?:jpe?g|png|webp|svg)", str(soup)):
        srcs.add(m.group(0))
    # garder l'original plutôt que les déclinaisons -300x200
    return sorted({re.sub(r"-\d+x\d+(?=\.\w+$)", "", s) for s in srcs})


pages = {}
properties = {}
all_images = set()
for f in sorted((ROOT / "html").glob("*.html")):
    raw = f.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(raw, "html.parser")
    title = clean(soup.title.string if soup.title else "")
    desc = soup.find("meta", attrs={"name": "description"})
    imgs = images_of(BeautifulSoup(raw, "html.parser"))
    all_images.update(imgs)
    entry = {
        "title": title,
        "meta_description": desc["content"] if desc else None,
        "images": imgs,
        "text": main_text(soup),
    }
    if f.stem.startswith("property_"):
        properties[f.stem.removeprefix("property_")] = entry
    else:
        pages[f.stem] = entry

(OUT / "pages.json").write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "properties.json").write_text(json.dumps(properties, ensure_ascii=False, indent=2), encoding="utf-8")

# Médias déclarés dans WordPress (API REST)
media = json.loads((ROOT / "api" / "media.json").read_text(encoding="utf-8"))
for m in media:
    all_images.add(m["source_url"])
(OUT / "images.txt").write_text("\n".join(sorted(all_images)), encoding="utf-8")

# Couleurs et polices : fréquence dans le CSS inline de l'accueil
home = (ROOT / "html" / "home.html").read_text(encoding="utf-8", errors="ignore")
colors = Counter(c.lower() for c in re.findall(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b", home))
fonts = Counter(re.findall(r"font-family\s*:\s*([^;}\"]+)", home))
gfonts = re.findall(r"fonts\.googleapis\.com/css[^\"']+", home)
(OUT / "design.json").write_text(json.dumps({
    "colors": colors.most_common(40),
    "fonts": fonts.most_common(15),
    "google_fonts": gfonts,
}, ensure_ascii=False, indent=2), encoding="utf-8")

print(len(pages), "pages,", len(properties), "annonces,", len(all_images), "images")
