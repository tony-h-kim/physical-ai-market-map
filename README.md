# Physical AI Market Map 2026

**[Open the live map](https://tony-h-kim.github.io/physical-ai-market-map/)**

An independent research project by Tony Kim (Berkeley Haas MBA). The map covers 422 physical AI organizations, from components and compute to the robots themselves and the firms that deploy and support them. It includes a 100-company overview, a sourced profile for every organization, and an atlas of the relationships between them. The database holds 430 records; 12 are products or projects counted under their parent organization.

## What is in it

- **Five functional roles.** Each organization has one primary role: components and edge compute; development and learning; intelligence and runtime; robots and autonomous systems; or deployment, operations and assurance. A primary role does not limit what a company does, and secondary capabilities appear in its profile. The older technical categories remain available as a crosswalk.
- **Company profiles.** Inclusion rationale, products, business model, commercial maturity, funding marks and relationships, with source links and review dates.
- **Relationship atlas.** Ownership, investment, technology collaboration, product membership and customer relationships are kept distinct. A missing line is a research gap, not evidence that no relationship exists.
- **Analysis.** Capital (Q3 2026 robotics venture funding against Q3 2025, with defense excluded), operating disclosures for seven companies (Agility, Unitree, AgiBot, UBTECH, Dobot, FANUC and GrayMatter), value capture, an investor view and ecosystem incentives. Each figure keeps its own period, currency, accounting scope and evidence type, and company statements are kept apart from filed financial results.
- **Private shortlist.** Save companies and add notes. Both stay in your browser and are left out of shared links.

## Method

- **Sources.** The research baseline is September 2026, with targeted updates through November 2026. Funding, valuation and revenue data come from Crunchbase, PitchBook, CB Insights, Dealroom, TrendForce, Smart Analytics Global, TechCrunch and Bloomberg, and each figure keeps its own reporting period. Structural analysis draws on Goldman Sachs, Morgan Stanley, Roland Berger, Bullhound, McKinsey, IFR and The Robot Report.
- **Business model and commercial maturity** are my classifications, not sourced figures. Business model is the unit of sale: component supply, machine sale, software licence, RaaS, owned-fleet operations, integration, certification or open source. Maturity describes the mapped layer, not the company. Tesla is marked *pilot* because its mapped layer is humanoid platforms and Optimus is a pilot, not because Tesla is early-stage.
- **Deployments and programs** are publicly reported only, from company announcements and press coverage. They are not confirmed with the companies or audited, and they are not a count of production installations. Where none is compiled, the profile says so.
- **Revenue is not a field.** It is not reliably available for private companies at this scale, and a column of estimates would be the least defensible thing on the map.
- **Valuations only, never round sizes.** Listed companies show a `listed` tag rather than a market cap. Reported but unclosed marks are flagged in amber. A blank means undisclosed, not small.

## Limits

- **Curated, not exhaustive.** The roster is a research selection, not a census, a live financial feed or an investment recommendation.
- **China is under-mapped.** China ships most humanoid and industrial units, but English-language coverage of its component and integrator tiers is thin.
- **Private marks go stale.** In a market repricing this fast, some entries may understate by a full round.
- **Sources conflict.** Where they do, the more authoritative figure is used and the conflict is noted.
- **Survivorship.** Wound-down and acquired companies are largely absent, which flatters the sector's apparent success rate.

The full list is on the map's Method tab.

## Build and validate

The site is one self-contained HTML file with no runtime dependencies or tracking. Edit `source/physical_ai_market_map_artifact.html`, then run:

```bash
python build.py
python validate.py index.html
node check.js
```

`validate.py` checks the embedded data against the claims the map makes about itself: no duplicate entries, products excluded from company counts, every layer code resolving in both the data and the prose, filter vocabularies that cover the values in the data, and headline counts that match. It found 34 errors on its first run. `check.js` covers JavaScript syntax, data references, financial provenance, filtering, URL state, CSV escaping and storage. GitHub Actions runs both on every push and pull request. After count changes, regenerate the social card with `python make_social_card.py`.

Release notes are in [CHANGELOG.md](CHANGELOG.md). Design and review records: [DESIGN.md](DESIGN.md), [PRODUCT_REVIEW.md](PRODUCT_REVIEW.md), [QUALITY_REVIEW.md](QUALITY_REVIEW.md), [CAPITAL_REVIEW.md](CAPITAL_REVIEW.md) and [RESPONSIVE_QA.md](RESPONSIVE_QA.md).

---

Built by [Tony Kim](https://github.com/tony-h-kim). Analysis and any errors are my own.
