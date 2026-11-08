"""Generate the social summary from the roster; requires Pillow and DejaVu or Segoe UI."""
from pathlib import Path
import re
import json
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
    roles = json.loads(text.split('const ROLE_AUDIT=',1)[1].split(';\n',1)[0])
    im = Image.new('RGB', (1200, 630), '#ffffff')
    draw = ImageDraw.Draw(im)
    draw.text((48, 38), 'Tony Kim / Independent research', fill='#4a6075', font=font(21))
    draw.text((45, 145), 'Physical AI', fill='#0a2742', font=font(66, True))
    draw.text((45, 217), 'Market Map', fill='#0a2742', font=font(66, True))
    draw.text((48, 326), "A buyer's view of the companies", fill='#4a6075', font=font(24))
    draw.text((48, 364), 'turning intelligence into physical work.', fill='#4a6075', font=font(24))
    draw.text((48, 436), f'{total} companies. 5 functional roles.', fill='#0a2742', font=font(25, True))
    draw.rounded_rectangle((590, 96, 1152, 510), radius=8, fill='#121416')
    draw.text((612, 115), f'The market structure / {len(co)} roster entries', fill='#bed1e2', font=font(16))
    palette = ['#68cbb4','#b79bd0','#a3b1fb','#e5bc77','#d398a8']
    for i, (role, name) in enumerate([('H','Components & edge compute'),('D','Development & learning'),('I','Intelligence & runtime'),('S','Robots & systems'),('O','Integration, operations & assurance')]):
        y=162+i*61
        count=sum(a['section'][0]==role for a in roles.values())
        draw.text((612,y),role,fill=palette[i],font=font(22,True))
        draw.text((649,y),name,fill='#ffffff',font=font(20,True))
        draw.text((1086,y),str(count),fill='#bed1e2',font=font(20))
        draw.line((649,y+36,649+int(440*count/len(co)),y+36),fill=palette[i],width=3)
    draw.text((612, 490), 'One roster. Multiple analytical lenses.', fill='#bed1e2', font=font(14))
    draw.line((48, 545, 1152, 545), fill='#bdccd9', width=1)
    draw.text((48, 568), 'Updated November 8, 2026', fill='#4a6075', font=font(18))
    draw.text((650, 568), 'tony-h-kim.github.io/physical-ai-market-map', fill='#4a6075', font=font(18))
    im.save(root / 'og-image.png')
    print('Done — generated og-image.png from current roster')
except (OSError, ValueError) as exc:
    raise SystemExit(f'Social card failed: {exc}')
