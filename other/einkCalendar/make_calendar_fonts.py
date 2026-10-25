#!/usr/bin/env python3
# Usage: python3 make_calendar_fonts.py NotoSansMono-Bold.ttf CalFonts.h
import sys
from PIL import Image, ImageDraw, ImageFont

BOLD = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else "CalFonts.h"

UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
DIG = "0123456789"
MIXED = UP + "abcdefghijklmnopqrstuvwxyz" + DIG + " "

# (name in the sketch, size in px, characters, threshold 0-255: lower = bolder)
FONTS = [
    ("CalDate",   20,  DIG,   115),   # calendar day numbers
    ("CalHead",   12,  UP,    110),   # MON TUE WED ...
    ("PanelYear", 30,  DIG,   120),   # 2026 on the yellow block
    ("PanelDay",  140, DIG,   128),   # big day number
    ("PanelText", 26,  UP,    120),   # OCTOBER
    ("PanelWeek", 52,  UP,    125),   # FRI
    ("ErrFont",   36,  MIXED, 120),   # "Something is broken"
]

lines = [
    "#pragma once",
    "#include <stdint.h>",
    "",
    "struct PFont {",
    "  const uint8_t* bitmap;   // one bpr*H block per character, in the order of 'chars'",
    "  const uint8_t* adv;      // advance width of each character",
    "  const char*    chars;",
    "  uint16_t maxW, H, ascent, bpr;",
    "};",
    "",
]

for name, size, chars, thresh in FONTS:
    font = ImageFont.truetype(BOLD, size)
    adv, tops, bottoms, rights = {}, [], [], []
    for ch in chars:
        adv[ch] = int(round(font.getlength(ch)))
        if ch == " ":
            continue
        l, t, r, b = font.getbbox(ch, anchor="ls")   # relative to the baseline
        tops.append(t); bottoms.append(b); rights.append(r)
    top = min(tops) - 1
    bottom = max(bottoms) + 1
    H = bottom - top
    ascent = -top
    maxW = max(max(rights), max(adv.values())) + 1
    bpr = (maxW + 7) // 8

    data = bytearray()
    for ch in chars:
        img = Image.new("L", (maxW, H), 0)
        ImageDraw.Draw(img).text((0, ascent), ch, font=font, fill=255, anchor="ls")
        for y in range(H):
            row = bytearray(bpr)
            for x in range(maxW):
                if img.getpixel((x, y)) >= thresh:
                    row[x // 8] |= 0x80 >> (x % 8)
            data.extend(row)

    lines.append("static const uint8_t %s_bits[] = {" % name)
    for i in range(0, len(data), 16):
        lines.append("  " + ", ".join("0x%02X" % b for b in data[i:i + 16]) + ",")
    lines.append("};")
    lines.append("static const uint8_t %s_adv[] = { %s };" % (name, ", ".join(str(adv[c]) for c in chars)))
    lines.append('static const PFont %s = { %s_bits, %s_adv, "%s", %d, %d, %d, %d };' %
                 (name, name, name, chars, maxW, H, ascent, bpr))
    lines.append("")
    print("%-10s %3dpx  cell %3dx%-3d  %5.1f KB" % (name, size, maxW, H, len(data) / 1024))

with open(OUT, "w") as fh:
    fh.write("\n".join(lines))
print("written", OUT)
