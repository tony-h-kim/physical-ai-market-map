# Integrated market map and relationship atlas

The default exploration mode is a layer atlas. Industry territories, company dependencies and the directed relationship matrix use the same canonical roster, filters, selection and company profile. The original landscape charts, screening table, shortlist, business-model matrix, insights and method remain available.

## Visual system

Retain Manrope and Source Sans 3 and the existing type tokens. Body, Brain and Operations retain their semantic accents. The dark background is neutral charcoal `#090a0c`, with card `#121416`, secondary surface `#1b1d20`, boundary `#2c2e33`, primary text `#eff0f2` and secondary text `#babdc3`. These replace the previous navy surfaces in both the existing market map and the relationship views.

Relationship routes are one CSS pixel at rest, with larger transparent interaction paths. Technology is dotted; equity and customer relationships use distinct dash lengths; ownership is solid, with pending and blocked transaction patterns explicit. Line widths do not encode deal magnitude. Hover isolates a route and animates its dash offset; reduced-motion preferences disable this animation. Hovering a company dims unrelated layer blocks. Layer expansion and focus view expose detail without abandoning the market architecture.

The atlas uses three aligned plane columns rather than a force graph. Only selected-company routes are drawn; expanded layer stations expose additional counterparties. A visible-route count distinguishes rendered lines from the complete records in the selected evidence scope. Outside actors remain supporting context and are separately switchable. Uber and its relationships are excluded from the embedded data and export.

## Data boundary

The core roster stays at 252 entries / 244 distinct companies. The relationship edition contains 117 directed records: 30 checked against supporting primary sources and 87 inherited records available through an explicit evidence selector. This is a design and integration update, not a new audit of every roster valuation or company claim. September / October data baselines and financial-review dates remain visible in the original research.

## Rebuild and validation

The previously referenced external artifact was unavailable. The editable source now lives in `source/physical_ai_market_map_artifact.html`. Run `python build.py`, `python validate.py index.html`, and `node check.js`. The builder preserves social metadata. The validation suite includes relationship endpoint integrity, distinct equity/customer roles, transaction status, exclusion rules and URL restoration alongside the original market-map checks.

No JavaScript runtime dependencies or network data fetches are introduced. The page remains self-contained, with optional remote typography and external source links.
