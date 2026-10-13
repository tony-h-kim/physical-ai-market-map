# Physical AI Market Map — 2026

An interactive landscape of **244 companies across 25 layers** in physical AI, spanning humanoids, industrial robotics, autonomous vehicles, drones and defence, construction, mining and agriculture.

**[→ View the live map](https://tony-h-kim.github.io/physical-ai-market-map/)**

**How to use:** Choose a view, filter or search the roster, and select a company for its profile. Insights explains the thesis; Method explains the classifications.

---

## Why another market map

Most published landscapes split physical AI into hardware and software, then merge simulation, world models and robot policies into a single bucket. Both moves hide where value actually accrues.

The hardware/software split fails on exactly the companies that matter most: NVIDIA is silicon *and* Isaac, Cosmos and GR00T; Figure is hardware *and* Helix 2. Tesla, Unitree, Anduril and Waymo are all both. That split places the fifteen most important companies in two boxes each — and has nowhere to put fleet orchestration, safety certification or systems integration.

This map is organised by **unit of sale** — what the customer actually buys — not by what a company touches.

## The taxonomy

Three planes, twenty-five layers. Every company is assigned to **one primary layer** — the unit of sale, meaning what the customer actually buys. Where no layer dominates, the company is marked **full-stack** rather than forced into a box. Secondary positions are recorded as spans and rendered with a dashed border, never as duplicate entries.

| Plane | Groups | Layers |
|---|---|---|
| **A · Body** | Components · Infrastructure · Embodiments | A1–A12 |
| **B · Brain** | Data · Modelling · Applied autonomy | B1–B8 |
| **C · Operations** | Operational software · Commercial delivery | C1–C5 |

Two distinctions this map draws that most others don't:

- **B4 physics simulation vs. B5 world models vs. B6 robot foundation models.** Three different technical bets with different customers and opposite failure modes — authored dynamics, learned dynamics, and motor policy respectively.
- **C3 safety and certification as a layer of its own.** The most under-mapped layer in the industry, and arguably the most defensible.

## What's in it

Three sections, in the order a reader actually needs them.

**Market map** — the companies, in seven views over one shared set of filters:

- *Overview* — an interactive 25-layer cover atlas, headquarters and business-model charts, and commercial-stage composition
- *Value chain* — the 25-layer map, every company in the one layer it sells
- *By industry* — the same companies regrouped by the vertical they serve, for comparing who competes for the same buyer
- *By geography* — headquarters, with the layer concentration of each region
- *Layer × model* — cross-tabulate unit of sale and business model
- *Shortlist* — save companies, compare them and keep private browser-local notes
- *Screening table* — a flat, sortable list: layer, HQ, business model, maturity, valuation

Filter by plane, vertical, headquarters, business model, commercial maturity, and position (category leaders, full-stack, vertical integrators, disclosed valuation, named deployments). Active filters are shown as dismissible chips with a live count. Click any company for a profile panel: what it sells, how it charges, how far along it is, publicly reported deployments, spans and verticals.

**Insights** — *Capital* (comparable half-year funding and transaction evidence) · *Value capture* (pricing power and an adjacent revenue-mix example) · *Investor view* (forecast scope, deployment evidence and four commercial questions) · *Ecosystem* (capital and product flows, partnership incentives and four demand tests).

**Method** — *Structure & taxonomy* (the taxonomy argument, and the reliability-economics case for why industrial deployment is harder than it looks) · *Method & sources* (taxonomy rules, valuation methodology, the business-model and maturity classifications, objections and responses, known weaknesses).

## V9-02 — form-control spacing, October 12, 2026

Search and view controls share a 44-pixel height and consistent text insets. Filter options use even padding, with aligned labels on desktop and stacked labels on phones. Advanced-filter headings use the site's reading typography. Selected-filter tags wrap long search text without overflowing, and private notes have consistent padding and focus outlines. Profile and shortlist actions use the same control height. Reviewed in both themes at 320, 390, 600, 800 and 1280 pixels.

## V9-01 — comparison-table corrections, October 12, 2026

The layer × business model matrix now uses explicit column widths, indented wrapping labels, centered counts and full-cell controls. Redundant badges and patterned empty cells are removed. Column headings and layer labels stay visible during table scrolling. Row headers identify the layer for assistive technology, and cell selection returns focus to the view control.

The screening table uses a narrower company column on phones, wrapping text, stable sort indicators and fixed headings. Its methodology note is expandable. Both tables were reviewed in light and dark themes, including 320- and 390-pixel layouts; all seven map views were checked for page overflow at desktop and phone widths.

## V9-00 — editorial atlas and rebuilt Insights, October 11, 2026

This release replaces the schematic cover with the actual 25-layer market structure and entry counts. One view selector replaces the secondary tab strip. The three disconnected workload shortcuts and their data/renderer are retired; old workbench links open the company map. Profiles, shared filters, exports and private shortlist notes remain available.

All four Insights chapters are rewritten around a thesis, a figure and inspectable evidence. Capital uses equal half-year windows and a Waymo-exclusion toggle. Value capture replaces precise-looking qualitative pressure bars with a categorical framework and adds a source-checked FY2025 revenue mix. Investor view separates forecast assumptions/horizons and types of commercial evidence. Ecosystem shows a conceptual capital/procurement loop and independent-demand tests. Method adds a learning-loop diagram and interactive first-order reliability arithmetic. Six chapters share one reading structure and in-chapter navigation; paragraphs and figures align consistently, and manual chapter-title line breaks are removed.

Visual research included Bessemer Atlas, Lightspeed Frontier Tech and Insight Partners' robotics ecosystem research. Original figures use the map's data or explicitly labeled author frameworks. Source review corrected Roland Berger's OEM-level forecast label, dated the forecast panels, corrected the B2 data-rights reference and A11/A12 assignments in Method, and clarified pre-/post-money valuation language. Ctrl+Home no longer resets the active chapter tab.

Validation: 55 checks for data, charts, arithmetic, URL migration, CSV, storage and chapter structure, plus desktop/mobile review in both themes. Company counts and financial marks remain unchanged; this release is not a comprehensive new company-data refresh.

## V8-00 — visual research overview, October 11, 2026

The default view is now an interactive research overview. Four charts show plane composition, headquarters by plane, primary business model and commercial stage within each plane. All counts derive from the current filtered roster; bars open the corresponding detailed view. The expandable atlas compares all 25 layers on a common scale. Counts use entries rather than distinct companies and describe coverage, not market share; maturity remains an author classification.

A conceptual system diagram introduces Body, Brain and Operations. The page uses IBM Plex Sans headings, Inter reading text, a navy/teal/blue/amber palette, calmer navigation, a shared chart canvas, shorter introductory copy and progressive disclosure of source context. Existing URLs, company profiles, decision tools and private shortlist notes remain available. The social preview follows the new visual identity. Validation includes 41 JavaScript checks and desktop/mobile review in both themes.

Design references: [Dealroom ecosystem explorer](https://dealroom.co/ecosystems-network/?view=map) for overview-to-detail navigation; [Our World in Data Grapher](https://ourworldindata.org/redesigning-our-interactive-data-visualizations) for explicit chart context and controls. No runtime chart library is required.

## V7-01 — targeted financial refresh, October 11, 2026

All 29 previously displayed financial marks were reviewed using eight authenticated PitchBook deal histories, issuer and investor announcements, transaction advisers, exchange notices and labeled press reports. Profiles, the screening table and CSV expose financial status and dates; profiles and exports include source URLs, review dates and conflicting records. PitchBook's modeled current valuations are excluded.

Physical Intelligence moves to USD 11.7B for its completed May 2026 round. World Labs shows AMD's approximately USD 8.2B announced acquisition, with closing pending and earlier round/secondary marks distinguished in the profile. 1X shows a USD 6B acquisition rumor, with an amber flag and no implication of a completed sale. Skild's research/pre-revenue labels are corrected using its company revenue disclosure; ARR is kept distinct from recognized annual revenue. Figure and Waymo retain their marks, with differing database and announcement dates explained.

Helsing moves to USD 18B and Skydio to USD 4.4B. Unitree is now marked listed, with its private valuation removed. Atoms' USD 1.7B funding amount is removed from the valuation field; its website, description and primary placement are corrected to its industrial/mining offer. The roster still has 244 companies and 252 entries, with 24 humanoid-platform entries and 27 private/historical financial marks. All retained marks have source records; reported values, lower bounds, pre-money marks and historical values remain explicitly distinguished. A source review is not an independent audit or assurance that no newer undisclosed deal exists.

The follow-up adds financial provenance and state checks; the JavaScript suite now has 31 checks. Company operational claims and sector funding aggregates retain their original research periods.

## V7-00 — decision tools, October 11, 2026

The decision tools are designed for robotics partnerships and commercial diligence. Start with shipyard welding, warehouse handling or industrial manipulation. Each brief states the buyer, technical constraints, candidate incentive, proposed deal shape and a measurable acceptance gate. Partner fit and deal terms are author hypotheses; ten linked evidence cards support only their stated claims.

Save companies from profiles or the workbench. The shortlist compares them in a sortable table and stores private notes in your browser. Shared links exclude the shortlist and notes. The filtered CSV excludes notes; the shortlist CSV includes them. Exports label USD, reported versus last-disclosed marks, evidence dates and source URLs.

This release consolidates Leaderdrive / Suzhou Green Harmonic, reclassifies RLWRLD from hardware to robot foundation models, and distinguishes Persona's shipyard development program from production deployment. The roster now has 244 companies and 252 entries. Evidence cards were checked October 11; the broad roster and financial analysis retain their September 2026 cutoff.

Visual updates include a shorter header, workload entry tiles, collapsible filters in decision views, clearer type and contrast, quieter company borders, responsive partner briefs, and a theme selector. The editorial pass tightens 54 passages, adds a technical glossary, and separates facts from assessments.

## Data and methodology

September 2026 research baseline: funding, valuation and revenue data from Crunchbase, PitchBook, CB Insights, Dealroom, TrendForce, Smart Analytics Global, TechCrunch and Bloomberg, with each figure retaining its own reporting period. Structural analysis from Goldman Sachs, Morgan Stanley, Roland Berger, Bullhound, McKinsey, IFR and The Robot Report.

**Business model and commercial maturity** are the author's classification, not sourced figures. Business model is the unit of sale restated commercially — component supply, machine sale, software licence, RaaS, owned-fleet operations, integration, certification, open source. Maturity describes the *primary layer*, not the company: Tesla is marked *pilot* because its mapped layer is A6 humanoid platforms and Optimus is a pilot, not because Tesla is early-stage.

**Deployments and programs** are publicly reported only — company announcements and press coverage, neither confirmed with the companies nor audited. 73 of 252 entries carry a named deployment or program, including pilots and announcements; the remaining 179 have no compiled deployment detail. This is not a count of production installations. Absence is a gap in the research, not evidence that none exist, and each profile says so rather than showing an empty field.

**Revenue is deliberately not a field.** It is not reliably available for private companies at this scale, and a column populated by estimates would be the least defensible thing on the map.

**Valuation rules:** valuations only, never round sizes. Publicly listed companies show a `listed` tag rather than a market cap, which would date the map within a week. Reported-but-unclosed marks are flagged in amber and distinguished from closed rounds. A blank means undisclosed, not small.

## Known limitations

Stated rather than hidden — the full list is on the Method tab.

- **China is under-mapped.** It ships the majority of both humanoid and industrial units, but English-language coverage of its component and integrator tiers is thin. ~30 Chinese companies appear here against a real population several times larger.
- **Private marks go stale.** In a market repricing this fast, several entries may understate by a full round.
- **Sources conflict.** Where they do, the more authoritative figure is used and the conflict is noted.
- **Survivorship.** Wound-down and acquired companies are largely absent, which flatters the sector's apparent success rate.

The roster is curated, not exhaustive — roughly 244 of an estimated 700+ companies in scope.

## Validation

The map is one hand-maintained HTML file, which makes it easy to ship and easy to let the data drift out of sync with the prose. `validate.py` parses the embedded company data and asserts the invariants the map claims about itself:

- no duplicate entries, and no company counted twice via its own spans
- product lines (Isaac Sim, Cosmos, GR00T, Halos) tagged and excluded from the company count
- no self-referential spans
- every layer code resolves — in the data *and* in the prose
- controlled vocabularies for geography, vertical, business model and maturity
- every company carries a business-model and maturity classification, with no orphan entries
- **every filter chip vocabulary covers the values actually present in the data** — this check exists because the geography filter shipped offering `KR/JP` and `other` while the data used `KR`, `JP`, `IL` and `TW`, silently making 36 companies unreachable
- no empty layers
- headline counts, plane counts, deployment counts and version strings match the data

```bash
python validate.py index.html
```

Exits non-zero on any error. It found 34 on its first run, and the checks added since have each been verified to fire against the bug that prompted them.

## Build and checks

The original `Brain/output/physical_ai_market_map_artifact.html` fragment remains the authoring source. Edit it, then wrap it with the tracked shell:

```bash
python build.py /path/to/physical_ai_market_map_artifact.html
python validate.py index.html
node check.js
```

`build.py` preserves social metadata and derives its company count from the roster. `check.js` checks full JavaScript syntax plus data references, financial provenance, filtering, malformed/empty URL state, sort restoration, CSV escaping/formula handling, note exclusion and blocked storage. GitHub Actions runs both validators on pushes and pull requests.

After count changes, regenerate the social card with `python make_social_card.py` (Pillow, Segoe UI or DejaVu Sans). Normal site use requires no Python, Node or build dependencies.

Browser QA covers all seven views, three workloads, empty filters, reload persistence, sorting, keyboard matrix navigation, dialog focus, CSV download, light/dark themes and a 390px viewport. This checks behavior and layout, not the accuracy of every inherited company or financial claim.

## Technical

A single self-contained HTML file. No build step, no dependencies, no tracking. Light and dark themes, fluid typography, and accessible contrast verified in both. Open `index.html` locally or serve the directory.

---

Built by [Tony Kim](https://github.com/tony-h-kim). Analysis and any errors are my own.
