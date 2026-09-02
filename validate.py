#!/usr/bin/env python3
"""
Consistency checker for the Physical AI Market Map.

The map is a single self-contained HTML file, which makes it easy to ship and
easy to let the data drift out of sync with the prose. This script parses the
embedded company data and asserts the invariants the map claims about itself.

Run:  python validate.py [path/to/index.html]
Exit: 0 if clean, 1 if any ERROR. Warnings do not fail the build.
"""
import io
import json
import re
import sys
from collections import Counter
from pathlib import Path

GEOS = {"US", "CN", "EU", "KR", "JP", "TW", "IL", "other"}
VERTS = {"hum", "ind", "av", "def", "con", "min", "ag"}

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def slice_between(text, start, end_marker):
    i = text.index(start)
    j = text.index(end_marker, i)
    return text[i:j]


def parse_companies(js):
    """Parse the CO array entries into dicts. Deliberately tolerant: the goal is
    to catch data mistakes, not to be a JavaScript parser."""
    out = []
    for raw in re.findall(r"\{n:\"(?:[^\"\\]|\\.)*\".*?\}(?=\s*(?:[,\]]|$))", js, re.S):
        c = {}
        m = re.search(r'n:"((?:[^"\\]|\\.)*)"', raw)
        c["n"] = m.group(1)
        m = re.search(r'l:"([A-C]\d+)"', raw)
        c["l"] = m.group(1) if m else None
        m = re.search(r"span:\[([^\]]*)\]", raw)
        c["span"] = re.findall(r'"([A-C]\d+)"', m.group(1)) if m else []
        m = re.search(r"v:\[([^\]]*)\]", raw)
        c["v"] = re.findall(r'"(\w+)"', m.group(1)) if m else []
        m = re.search(r'g:"([^"]+)"', raw)
        c["g"] = m.group(1) if m else None
        for flag in ("big", "pub", "fs", "est", "intn", "prod"):
            c[flag] = f"{flag}:1" in raw
        c["_raw"] = raw
        out.append(c)
    return out


def parse_layers(js):
    layers = {}
    for code, grp, name in re.findall(r'\{c:"([A-C]\d+)",(?:grp:"([^"]+)",)?(?:gd:"[^"]*",)?n:"([^"]+)"', js):
        layers[code] = {"grp": grp or None, "n": name}
    # carry group forward the way the renderer does
    last = None
    for code in layers:
        if layers[code]["grp"]:
            last = layers[code]["grp"]
        else:
            layers[code]["grp"] = last
    return layers


def main(path):
    t = Path(path).read_text(encoding="utf-8")
    head, js = t.split("<script>", 1)

    co = parse_companies(slice_between(js, "const CO = [", "\n];"))
    layers = parse_layers(slice_between(js, "const PLANES=[", "\n];"))
    info = dict(re.findall(r'^"((?:[^"\\]|\\.)*)":\["([^"]*)"', slice_between(js, "const INFO={", "\n};"), re.M))

    print(f"parsed  {len(co)} entries · {len(layers)} layers · {len(info)} profiles\n")

    # 1 — duplicate names
    for name, n in Counter(c["n"] for c in co).items():
        if n > 1:
            err(f"duplicate entry name: {name} ×{n}")

    # 2 — one company, one row: catch product lines sharing a parent prefix
    bare = {c["n"] for c in co if not c["prod"]}
    for c in co:
        if c["prod"]:
            continue
        for other in bare:
            if other != c["n"] and c["n"].startswith(other + " "):
                err(f'"{c["n"]}" looks like a product line of "{other}" but is not flagged prod:1')

    # 3 — layer codes resolve
    for c in co:
        if c["l"] not in layers:
            err(f'{c["n"]}: unknown primary layer {c["l"]}')
        for s in c["span"]:
            if s not in layers:
                err(f'{c["n"]}: unknown span layer {s}')

    # 4 — no self-spans
    for c in co:
        if c["l"] in c["span"]:
            err(f'{c["n"]}: span contains its own primary layer {c["l"]}')

    # 5 — no duplicate spans
    for c in co:
        for s, n in Counter(c["span"]).items():
            if n > 1:
                err(f'{c["n"]}: span lists {s} {n} times')

    # 6 — product lines must not be double-counted in the parent's spans
    for c in co:
        if not c["prod"]:
            continue
        parent = next((p for p in co if not p["prod"] and c["n"].startswith(p["n"] + " ")), None)
        if parent and c["l"] in parent["span"]:
            err(f'{parent["n"]}: spans {c["l"]}, but that layer is already represented by product entry "{c["n"]}"')

    # 7 — profiles present both ways
    for c in co:
        if c["n"] not in info:
            err(f'{c["n"]}: no INFO profile')
    for name in info:
        if not any(c["n"] == name for c in co):
            err(f"INFO profile with no company: {name}")

    # 8 — controlled vocabularies
    for c in co:
        if c["g"] not in GEOS:
            err(f'{c["n"]}: geography "{c["g"]}" not in {sorted(GEOS)}')
        for v in c["v"]:
            if v not in VERTS:
                err(f'{c["n"]}: vertical "{v}" not in {sorted(VERTS)}')

    # 9 — no empty layers
    used = Counter(c["l"] for c in co)
    for code in layers:
        if not used[code]:
            err(f"layer {code} ({layers[code]['n']}) has no companies")

    # 10 — every layer code named in prose resolves
    prose = re.sub(r"<[^>]+>", " ", head)
    for code in sorted(set(re.findall(r"\b([A-C]\d+)\b", prose))):
        if code not in layers:
            err(f"prose references layer {code}, which does not exist")

    # 11 — plane counts quoted in prose match the data
    plane_counts = Counter(c["l"][0] for c in co)
    for plane, n in plane_counts.items():
        for quoted in re.findall(rf"{plane} · \w+[^·]*· (\d+) compan", head):
            if int(quoted) != n:
                err(f"plane {plane}: prose says {quoted} companies, data has {n}")

    # 12 — headline company count
    for quoted in set(re.findall(r"(\d{3}) companies", head)):
        if int(quoted) not in (len(co), len([c for c in co if not c["prod"]])):
            warn(f'headline count "{quoted} companies" matches neither entries ({len(co)}) '
                 f'nor distinct companies ({len([c for c in co if not c["prod"]])})')

    # 12b — the taxonomy figure must name every layer that exists
    fig = re.search(r"<svg[^>]*aria-label=\"Three-plane.*?</svg>", head, re.S)
    if fig:
        shown = set(re.findall(r"\b([A-C]\d+)\b", fig.group(0)))
        for code in layers:
            if code not in shown:
                err(f"Fig. 1 does not show layer {code} ({layers[code]['n']})")
    else:
        warn("could not locate the taxonomy figure to check layer coverage")

    # 13 — version string consistent
    vers = set(re.findall(r"V\d-00", head))
    if len(vers) > 1:
        err(f"inconsistent version strings: {sorted(vers)}")

    # 14 — full-stack companies should span at least two planes
    for c in co:
        if c["fs"]:
            planes = {c["l"][0]} | {s[0] for s in c["span"]}
            if len(planes) < 2:
                err(f'{c["n"]}: marked full-stack but does not span multiple planes')

    # 15 — layers claimed in headline
    for quoted in set(re.findall(r"(\d+) layers", head)):
        if quoted.isdigit() and int(quoted) not in (len(layers), 3):
            err(f'prose claims {quoted} layers, data has {len(layers)}')

    print(f"ERRORS   {len(errors)}")
    for e in errors:
        print("  FAIL", e)
    print(f"\nWARNINGS {len(warnings)}")
    for w in warnings:
        print("  WARN", w)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "index.html"))
