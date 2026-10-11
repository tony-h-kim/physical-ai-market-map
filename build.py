"""Wrap the original artifact fragment in the tracked GitHub Pages shell.

Usage: python build.py path/to/physical_ai_market_map_artifact.html
Edits index.html. Keep the artifact as source of truth; preserves social metadata.
"""
from pathlib import Path
import re
import sys

try:
    source_path = Path(sys.argv[1])
    target_path = Path(__file__).parent / 'index.html'
    source = source_path.read_text(encoding='utf-8')
    current = target_path.read_text(encoding='utf-8')
    style_start, style_end = source.index('<style>'), source.index('</style>') + len('</style>')
    shell = current[:current.index('<style>')]
    # Metadata count follows the roster, so generated and social summaries agree.
    co = source.split('const CO = [', 1)[1].split('\n];', 1)[0]
    distinct = sum('prod:1' not in entry for entry in re.findall(r'\{n:"(?:[^"\\]|\\.)*".*?\}', co, re.S))
    shell = re.sub(r'\b\d{3} companies\b', f'{distinct} companies', shell)
    body = source[style_end:].strip()
    target_path.write_text(shell + source[style_start:style_end] + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n', encoding='utf-8', newline='\n')
    print(f'Done — regenerated {target_path.name} ({distinct} companies)')
except (OSError, ValueError, IndexError) as exc:
    raise SystemExit(f'Build failed: {exc}. Supply the original artifact fragment path.')
