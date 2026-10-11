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
    im = Image.new('RGB', (1200, 630), '#f4f6f8')
    draw = ImageDraw.Draw(im)
    draw.text((58, 48), 'September 2026 roster • October 2026 decision tools', fill='#596373', font=font(23))
    draw.text((54, 101), 'Physical AI Market Map', fill='#0f1729', font=font(68, True))
    draw.text((58, 199), f'{total} companies. 25 layers. A buyer-first view of robotics.', fill='#596373', font=font(29))
    colors = [('#0d8a6a', '#e9f7f2'), ('#6d43c4', '#f1ecfc'), ('#b06a05', '#fdf3e3')]
    for i, (plane, label) in enumerate([('A', 'Body'), ('B', 'Brain'), ('C', 'Operations')]):
        x = 58 + i * 365
        ink, bg = colors[i]
        draw.rounded_rectangle((x, 278, x+345, 401), radius=10, fill=bg)
        draw.rectangle((x, 289, x+4, 390), fill=ink)
        draw.text((x+20, 292), f'{plane}  {label}', fill=ink, font=font(29, True))
        count = sum(c['l'][0] == plane for c in co)
        draw.text((x+20, 348), f'{count} entries', fill='#596373', font=font(23))
    draw.line((58, 437, 1140, 437), fill='#d3d8e0', width=2)
    draw.text((58, 468), 'Explore partners. Compare alternatives. Test deployment fit.', fill='#0f1729', font=font(28, True))
    draw.text((58, 536), 'Tony Kim', fill='#0f1729', font=font(25, True))
    draw.text((58, 574), 'tony-h-kim.github.io/physical-ai-market-map', fill='#596373', font=font(21))
    im.save(root / 'og-image.png')
    print('Done — generated og-image.png from current roster')
except (OSError, ValueError) as exc:
    raise SystemExit(f'Social card failed: {exc}')
