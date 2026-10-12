"""Generate the social summary from the roster; requires Pillow and DejaVu or Segoe UI."""
from pathlib import Path
import re
from PIL import Image, ImageDraw, ImageFont
from validate import parse_companies, slice_between

root = Path(__file__).parent
try:
    text = (root / 'index.html').read_text(encoding='utf-8')
    co = parse_companies(slice_between(text, 'const CO = [', '\n];'))
    total = sum(not c['prod'] for c in co)
    windows_fonts = Path('C:/Windows/Fonts')
    linux_fonts = Path('/usr/share/fonts/truetype/dejavu')
    def font(size, bold=False):
        name = ('segoeuib.ttf' if bold else 'segoeui.ttf') if windows_fonts.exists() else ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')
        return ImageFont.truetype(str((windows_fonts if windows_fonts.exists() else linux_fonts) / name), size)
    im = Image.new('RGB', (1200, 630), '#f2f5f9')
    draw = ImageDraw.Draw(im)
    draw.text((58, 42), 'Research by Tony Kim', fill='#52647a', font=font(24))
    draw.text((56, 101), 'Physical AI', fill='#142b45', font=font(67, True))
    draw.text((56, 174), 'Market Map', fill='#142b45', font=font(67, True))
    draw.text((58, 281), 'From machines to deployed autonomy.', fill='#52647a', font=font(26))
    draw.text((58, 324), 'Companies, economics and partner choices.', fill='#52647a', font=font(24))
    draw.rounded_rectangle((685, 103, 1140, 437), radius=18, fill='#ffffff')
    colors = ['#147d76', '#405fc7', '#aa6718']
    for i, (plane, label) in enumerate([('A', 'Body'), ('B', 'Brain'), ('C', 'Operations')]):
        y = 126 + i * 98
        count = sum(c['l'][0] == plane for c in co)
        draw.text((711, y), label, fill='#142b45', font=font(25, True))
        draw.text((1046, y), str(count), fill='#142b45', font=font(27, True))
        draw.rounded_rectangle((711, y+45, 1109, y+59), radius=3, fill='#f2f5f9')
        draw.rounded_rectangle((711, y+45, 711+int(398*count/len(co)), y+59), radius=3, fill=colors[i])
    draw.text((711, 403), 'Roster entries by primary plane', fill='#52647a', font=font(17))
    draw.line((58, 476, 1140, 476), fill='#c9d4e1', width=2)
    draw.text((58, 503), f'{total} companies    25 layers    3 planes', fill='#142b45', font=font(28, True))
    draw.text((58, 552), 'September roster / Updated October 11, 2026', fill='#52647a', font=font(22))
    draw.text((58, 590), 'tony-h-kim.github.io/physical-ai-market-map', fill='#52647a', font=font(18))
    im.save(root / 'og-image.png')
    print('Done — generated og-image.png from current roster')
except (OSError, ValueError) as exc:
    raise SystemExit(f'Social card failed: {exc}')
