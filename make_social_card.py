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
    labels = dict(re.findall(r'([ABC]\d+):"([^"]+)"', text.split('const COVER_NAMES=', 1)[1].split(';', 1)[0]))
    im = Image.new('RGB', (1200, 630), '#ffffff')
    draw = ImageDraw.Draw(im)
    draw.text((48, 38), 'Tony Kim / Independent research', fill='#4a6075', font=font(21))
    draw.text((45, 145), 'Physical AI', fill='#0a2742', font=font(66, True))
    draw.text((45, 217), 'Market Map', fill='#0a2742', font=font(66, True))
    draw.text((48, 326), "A buyer's view of the companies", fill='#4a6075', font=font(24))
    draw.text((48, 364), 'turning intelligence into physical work.', fill='#4a6075', font=font(24))
    draw.text((48, 436), f'{total} companies. 25 layers.', fill='#0a2742', font=font(25, True))
    draw.rounded_rectangle((590, 96, 1152, 510), radius=8, fill='#0a2742')
    draw.text((612, 115), f'The market structure / {len(co)} roster entries', fill='#bed1e2', font=font(16))
    palette = ['#55ceba', '#a5b9ff', '#f1c17a']
    for i, (plane, name) in enumerate([('A', 'Body'), ('B', 'Brain'), ('C', 'Operations')]):
        x = 612 + i*175
        count = sum(c['l'][0] == plane for c in co)
        draw.text((x, 156), name, fill='#ffffff', font=font(21, True))
        draw.text((x, 185), f'{count} entries', fill='#bed1e2', font=font(15))
        for j, (code, label) in enumerate((pair for pair in labels.items() if pair[0].startswith(plane))):
            y = 222 + j*21
            n = sum(c['l'] == code for c in co)
            short = {'Industrial / AMR':'Industrial / AMR','Ground autonomy':'Ground autonomy','Operating models':'Operating models'}.get(label, label)
            draw.text((x, y), short, fill='#ffffff', font=font(13))
            draw.text((x+151, y), str(n), fill='#bed1e2', font=font(13))
            draw.line((x, y+18, x+int(140*n/25), y+18), fill=palette[i], width=2)
    draw.text((612, 490), 'Common scale: 0-25 entries per layer', fill='#bed1e2', font=font(13))
    draw.line((48, 545, 1152, 545), fill='#bdccd9', width=1)
    draw.text((48, 568), 'Updated October 11, 2026', fill='#4a6075', font=font(18))
    draw.text((650, 568), 'tony-h-kim.github.io/physical-ai-market-map', fill='#4a6075', font=font(18))
    im.save(root / 'og-image.png')
    print('Done — generated og-image.png from current roster')
except (OSError, ValueError) as exc:
    raise SystemExit(f'Social card failed: {exc}')
