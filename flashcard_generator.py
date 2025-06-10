#!/usr/bin/env python3
"""flashcard_generator.py

Generate printable A-4 sheets (300 dpi PNGs) containing four A-6 toddler flashcards per page.
Each card shows:
  • A large uppercase letter (A-Z)
  • A centred animal illustration (supplied by you)
  • The animal's name

Features
========
* True A-4 output size (210 mm × 297 mm) at any DPI (default 300)
* Automatic page breaks - 4 cards/sheet in A-D, E-H… order
* Rounded-corner card borders and grey dashed cut lines
* Scaling and centring of any input image (PNG/JPG/SVG-rasterised)
* Customisable fonts, colours, DPI, margins, CSV mapping

Quick start
===========
```bash
python flashcard_generator.py --images animals/ --outdir sheets/
```
Place 26 images named `A.png … Z.png` in `animals/`.  The script writes six PNG sheets in `sheets/`.

Advanced: supply a CSV with columns **letter, animal, filepath** to override names or image paths:
```bash
python flashcard_generator.py --mapping my_animals.csv --outdir sheets/
```

Dependencies
------------
* Pillow ≥ 10
```bash
pip install pillow
```

"""
from __future__ import annotations

import argparse
import csv
import math
import os
from pathlib import Path
from typing import List, Tuple

from PIL import Image, ImageDraw, ImageFont, ImageOps

# ────────────────────────────── Config helpers ────────────────────────────── #

DEFAULT_ANIMALS = [
    "Alligator", "Bear", "Cat", "Dog", "Elephant", "Fox", "Giraffe", "Hippo",
    "Iguana", "Jaguar", "Koala", "Lion", "Monkey", "Narwhal", "Owl", "Penguin",
    "Quail", "Rabbit", "Snake", "Tiger", "Urial", "Vulture", "Whale", "Xerus",
    "Yak", "Zebra",
]

LETTER_SEQUENCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def mm_to_px(mm: float, dpi: int) -> int:
    """Convert millimetres to integer pixels at the given DPI."""
    return int(mm / 25.4 * dpi)


def get_edge_color(image_path: Path) -> str:
    """Extract the dominant edge color from an image."""
    if not image_path.exists():
        return "white"
    
    try:
        img = Image.open(image_path).convert("RGB")
        width, height = img.size
        
        # Sample pixels from all four edges
        edge_pixels = []
        
        # Top and bottom edges
        for x in range(0, width, max(1, width // 20)):
            edge_pixels.append(img.getpixel((x, 0)))  # Top edge
            edge_pixels.append(img.getpixel((x, height - 1)))  # Bottom edge
        
        # Left and right edges  
        for y in range(0, height, max(1, height // 20)):
            edge_pixels.append(img.getpixel((0, y)))  # Left edge
            edge_pixels.append(img.getpixel((width - 1, y)))  # Right edge
        
        # Also sample corners multiple times for better weight
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((width - 1, 0)),
            img.getpixel((0, height - 1)),
            img.getpixel((width - 1, height - 1))
        ]
        edge_pixels.extend(corners * 5)  # Weight corners more heavily
        
        # Calculate average color
        if edge_pixels:
            avg_r = sum(pixel[0] for pixel in edge_pixels) // len(edge_pixels)
            avg_g = sum(pixel[1] for pixel in edge_pixels) // len(edge_pixels)
            avg_b = sum(pixel[2] for pixel in edge_pixels) // len(edge_pixels)
            return f"#{avg_r:02x}{avg_g:02x}{avg_b:02x}"
        
    except Exception:
        pass
    
    return "white"


# ─────────────────────────────── Core logic ──────────────────────────────── #

def load_mapping(mapping_csv: str | None, image_dir: Path) -> List[Tuple[str, str, Path]]:
    """Return [(letter, animal_name, image_path)] for all 26 letters."""
    mapping: List[Tuple[str, str, Path]] = []

    if mapping_csv and Path(mapping_csv).exists():
        with open(mapping_csv, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                letter = row["letter"].strip().upper()
                animal = row.get("animal", "").strip().title() or letter
                img_path = Path(row.get("filepath", "").strip() or image_dir / f"{letter}.png")
                mapping.append((letter, animal, img_path))
    else:
        for letter, animal in zip(LETTER_SEQUENCE, DEFAULT_ANIMALS):
            mapping.append((letter, animal, image_dir / f"{letter}.png"))

    # Ensure length 26 and ordered A→Z
    mapping_dict = {letter: (letter, animal, path) for letter, animal, path in mapping}
    return [mapping_dict.get(l, (l, l, image_dir / f"{l}.png")) for l in LETTER_SEQUENCE]


def draw_sheet(group: List[Tuple[str, str, Path]], dpi: int, font_path: Path, out_file: Path, bg_colour: str = "white") -> None:
    """Render 4 cards (2×2) to one A-4 PNG file."""
    # Page & card geometry
    a4_w_mm, a4_h_mm = 210, 297
    page_w, page_h = mm_to_px(a4_w_mm, dpi), mm_to_px(a4_h_mm, dpi)
    card_w, card_h = page_w // 2, page_h // 2

    page = Image.new("RGB", (page_w, page_h), bg_colour)
    draw = ImageDraw.Draw(page)

    # Type
    font_letter = ImageFont.truetype(str(font_path), size=int(card_h * 0.28))
    font_label = ImageFont.truetype(str(font_path), size=int(card_h * 0.12))

    # Measurements
    pad = mm_to_px(5, dpi)          # inner padding inside each card
    border_w = mm_to_px(2, dpi)     # rounded-rect border thickness
    radius = mm_to_px(4, dpi)       # corner radius
    dash_len = mm_to_px(2, dpi) * 5 # length of dashes for cut lines

    # Iterate over the four positions (row 0/1, col 0/1)
    for idx, (letter, animal, img_path) in enumerate(group):
        row, col = divmod(idx, 2)
        x0, y0 = col * card_w, row * card_h
        x1, y1 = x0 + card_w, y0 + card_h

        # ── Fill card background with edge color ──
        card_bg_color = get_edge_color(img_path)
        draw.rectangle([(x0, y0), (x1, y1)], fill=card_bg_color)

        # ── Cut-line dashes (grey) ──
        for x in range(x0, x1, dash_len * 2):
            draw.line([(x, y0), (min(x + dash_len, x1), y0)], fill="lightgrey")
            draw.line([(x, y1), (min(x + dash_len, x1), y1)], fill="lightgrey")
        for y in range(y0, y1, dash_len * 2):
            draw.line([(x0, y), (x0, min(y + dash_len, y1))], fill="lightgrey")
            draw.line([(x1, y), (x1, min(y + dash_len, y1))], fill="lightgrey")

        # ── Rounded border ──
        card_box = (x0 + pad, y0 + pad, x1 - pad, y1 - pad)
        card_content_w = card_box[2] - card_box[0]  # width of content area
        card_content_h = card_box[3] - card_box[1]  # height of content area
        draw.rounded_rectangle(card_box, radius, outline="#cccccc", width=border_w)

        # ── Letter ──
        # Center the letter using anchor positioning with enough top margin to prevent clipping
        letter_center_x = card_box[0] + card_content_w // 2
        letter_y = card_box[1] + mm_to_px(20, dpi)  # More space from top to prevent clipping
        draw.text((letter_center_x, letter_y), letter, font=font_letter, fill="black", anchor="mm")

        # ── Image ──
        if img_path.exists():
            image = Image.open(img_path).convert("RGBA")
            max_pic_size = (int(card_content_w * 0.85), int(card_content_h * 0.45))
            image.thumbnail(max_pic_size, Image.LANCZOS)
            pic_x = card_box[0] + (card_content_w - image.width) // 2
            # Position image in middle section of card, well below the letter
            pic_y = card_box[1] + int(card_content_h * 0.35)
            page.paste(image, (pic_x, pic_y), image)

        # ── Animal name ──
        # Center the animal name using anchor positioning
        label_center_x = card_box[0] + card_content_w // 2
        label_y = card_box[3] - mm_to_px(15, dpi)  # More space from bottom
        draw.text((label_center_x, label_y), animal, font=font_label, fill="black", anchor="mb")

    page.save(out_file)
    print(f"✓ Saved {out_file.relative_to(out_file.parent.parent)}")


# ──────────────────────────────── CLI entry ──────────────────────────────── #

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate toddler A-Z animal flashcards (4 per A-4 sheet).")
    p.add_argument("--images", default="images", help="Folder containing A.png … Z.png (default: images/)")
    p.add_argument("--mapping", help="CSV mapping with letter,animal,filepath columns (optional)")
    p.add_argument("--outdir", default="sheets", help="Output directory (default: sheets/)")
    p.add_argument("--dpi", type=int, default=300, help="Output DPI (default: 300)")
    p.add_argument("--font", default="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", help="TTF font path")
    return p.parse_args()


def main() -> None:
    args = parse_args()

    image_dir = Path(args.images)
    out_dir = Path(args.outdir)
    out_dir.mkdir(parents=True, exist_ok=True)

    mapping = load_mapping(args.mapping, image_dir)

    # Build 4-card groups: [A-D], [E-H] …
    for i in range(0, len(mapping), 4):
        group = mapping[i : i + 4]
        span = f"{group[0][0]}-{group[-1][0]}"
        out_file = out_dir / f"flashcards_{span}.png"
        draw_sheet(group, dpi=args.dpi, font_path=Path(args.font), out_file=out_file)


if __name__ == "__main__":
    main()
