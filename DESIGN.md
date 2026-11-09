# Integrated market map and relationship atlas

The default exploration mode is a curated 100-company overview. The full ecosystem atlas is an alternative view. Industry territories, company dependencies and the directed relationship matrix use the same canonical roster, filters, selection and company profile. The original landscape charts, screening table, shortlist, business-model matrix, insights and method remain available.

## Visual system

Retain Manrope and Source Sans 3 and the existing type tokens. The five functional roles retain their semantic accents. The dark background is neutral charcoal `#090a0c`, with card `#121416`, secondary surface `#1b1d20`, boundary `#2c2e33`, primary text `#eff0f2` and secondary text `#babdc3`. These replace the previous navy surfaces in both the existing market map and the relationship views.

Relationship routes are one CSS pixel at rest, with larger transparent interaction paths. Technology is dotted; equity and customer relationships use distinct dash lengths; ownership is solid, with pending and blocked transaction patterns explicit. Line widths do not encode deal magnitude. Hover isolates a route and animates its dash offset; reduced-motion preferences disable this animation. Hovering a company dims unrelated layer blocks. Layer expansion and focus view expose detail without abandoning the market architecture.

The atlas arranges five functional roles across three broad lanes: enablers, intelligence and systems/operations. Only selected-company routes are drawn; expanded layer stations expose additional counterparties. A visible-route count distinguishes rendered lines from the complete records in the selected evidence scope. Outside actors remain supporting context and are separately switchable. Uber and its relationships are excluded from the embedded data and export.

## Data boundary

The database represents 422 organizations through 430 records, including 12 product/project records consolidated into their responsible organization for company counts. The relationship edition contains 150 directed records: 70 checked against primary sources and 80 inherited records available through an explicit evidence selector. This is a design and integration update, not a new audit of every roster valuation or company claim. September / October data baselines and financial-review dates remain visible in the original research.

## Rebuild and validation

The previously referenced external artifact was unavailable. The editable source now lives in `source/physical_ai_market_map_artifact.html`. Run `python build.py`, `python validate.py index.html`, and `node check.js`. The builder preserves social metadata. The validation suite includes relationship endpoint integrity, distinct equity/customer roles, transaction status, exclusion rules and URL restoration alongside the original market-map checks.

No JavaScript runtime dependencies or network data fetches are introduced. The page remains self-contained, with optional remote typography and external source links.

## Legends and reader state

The relationship-type filter row doubles as the legend: line patterns for routed atlas lines, cell symbols for the company matrix, plain labels for plane counts, dependency cards and industry territories. There is no shared footer legend. Direction guidance appears only with routed lines; other views explain their own encoding. Company selection is explicit in Dependencies. Matrix totals, cells and opened evidence use the same focused company and evidence scope. Shared roster count, filter chips, copy link and roster export stay available in relationship modes.

## Analytical chapters

Ecosystem uses a two-party exchange diagram with three role-specific rows. Solid payment/capital arrows and dashed consideration arrows have an explicit key. Supplier payments run in the opposite direction to investment and customer payments. The illustration does not assert a measured recycling of capital or a named commercial arrangement. Mobile layouts repeat the party direction as text.

Capital and Investor view share one operating-disclosure register. Method uses compact full-width role rows with 22 functional sections; technical A/B/C categories remain a compatibility crosswalk. A focused company matrix includes all counterparties in the active evidence scope; an unselected overview states its coverage cap.

## Navigation, labels and typography

Readable fragment routes name the destination, such as `#overview`, `#atlas?company=AMD` and `#insights/ecosystem`. Only non-default relationship settings are serialized; the original query-style fragments remain supported. H/D/I/S/O are retained with an early Hardware/Development/Intelligence/Systems/Operations key.

Primary section tabs and secondary view selectors form a measured two-row sticky stack. The page contents offsets follow the measured heights. Phones use horizontally scrollable secondary selectors to preserve reading space. A keyboard-accessible back-to-top control appears after scrolling. Body, control, label and metadata text use one shared type scale across chapters; only headings and metrics retain larger levels.
