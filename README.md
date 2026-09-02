# Physical AI Market Map — 2026

An interactive landscape of **243 companies across 25 layers** in physical AI, spanning humanoids, industrial robotics, autonomous vehicles, drones and defence, construction, mining and agriculture.

**[→ View the live map](https://tony-h-kim.github.io/physical-ai-market-map/)**


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

- **The Map** — filterable by plane, vertical, geography, vertical integrators, category leaders and disclosed valuation. Hover any company for a profile; click to open its homepage.
- **Structure** — the taxonomy argument and the reliability-economics case for why industrial deployment is harder than it looks.
- **Capital** — H1 2026 funding, the most valuable private companies, and the capital/shipment inversion between the US and China.
- **Value Capture** — margin geography by layer, and where the durable margin actually sits.
- **Investor View** — TAM disagreement, revenue reality, the exit window, incumbent response, and six explicit positions.
- **Ecosystem** — how NVIDIA, Schaeffler, Bosch and the Korean conglomerates built partnership ecosystems, where those become circular financing loops, and four tests for telling the two apart.
- **Method & Sources** — taxonomy rules, valuation methodology, objections and responses, and known weaknesses.

## Data and methodology

Funding, valuation and revenue data from Crunchbase, PitchBook, CB Insights, Dealroom, TrendForce, Smart Analytics Global, TechCrunch and Bloomberg, current to H1 2026. Structural analysis from Goldman Sachs, Morgan Stanley, Roland Berger, Bullhound, McKinsey, IFR and The Robot Report.

**Valuation rules:** valuations only, never round sizes. Publicly listed companies show a `listed` tag rather than a market cap, which would date the map within a week. Reported-but-unclosed marks are flagged in amber and distinguished from closed rounds. A blank means undisclosed, not small.

## Known limitations

Stated rather than hidden — the full list is on the Method tab.

- **China is under-mapped.** It ships the majority of both humanoid and industrial units, but English-language coverage of its component and integrator tiers is thin. ~30 Chinese companies appear here against a real population several times larger.
- **Private marks go stale.** In a market repricing this fast, several entries may understate by a full round.
- **Sources conflict.** Where they do, the more authoritative figure is used and the conflict is noted.
- **Survivorship.** Wound-down and acquired companies are largely absent, which flatters the sector's apparent success rate.

The roster is curated, not exhaustive — roughly 243 of an estimated 700+ companies in scope.

## Validation

The map is one hand-maintained HTML file, which makes it easy to ship and easy to let the data drift out of sync with the prose. `validate.py` parses the embedded company data and asserts the invariants the map claims about itself:

- no duplicate entries, and no company counted twice via its own spans
- product lines (Isaac Sim, Cosmos, GR00T, Halos) tagged and excluded from the company count
- no self-referential spans
- every layer code resolves — in the data *and* in the prose
- controlled vocabularies for geography and vertical
- no empty layers
- headline counts, plane counts and version strings match the data

```bash
python validate.py index.html
```

Exits non-zero on any error. It found 34 on its first run, including several that a careful human review had missed.

## Technical

A single self-contained HTML file. No build step, no dependencies, no tracking. Light and dark themes, fluid typography, and accessible contrast verified in both. Open `index.html` locally or serve the directory.

---

Built by [Tony Kim](https://github.com/tony-h-kim). Analysis and any errors are my own.
