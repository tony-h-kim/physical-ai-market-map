# Product review — V14-00

Reviewed November 8, 2026. Scope: the complete reader experience, including all market views, analytical chapters, company profiles, relationship encodings, navigation and exports.

## Changes made

- Replaced the large, ambiguous Ecosystem cards with three compact exchanges between a strategic partner and a builder. Payment and return paths have different line styles, visible arrowheads, labels and a matching key. Investor cash, supplier spending and customer payments remain distinct. The mobile version repeats direction in words.
- Connected the Ecosystem disclosure action to the actual operating-disclosure section, with focus moved to the destination heading.
- Removed the stale duplicate Investor valuation/multiple table. Investor view now derives its seven operating cases from the same register as Capital, preserving periods, original currencies and evidence types.
- Corrected the liquidity ledger to distinguish completed listings/acquisitions, private financing and unverified listing status. Removed forecast rows without a traceable, comparable primary basis and added primary attribution to retained ABI/BCC forecasts.
- Corrected outdated role codes in analytical examples and the platform incentive table.
- Distinguished product/project records from company maturity and valuation in screening, profiles and CSV output. Removed a financial description incorrectly used as Dobot deployment evidence; connected disclosure evidence to its CSV record.
- Expanded followed-company relationship matrices to include every counterparty in the active evidence scope. The unselected overview states its coverage limits above the matrix. Removed a conflicting generic footer limit.
- Replaced tall taxonomy cards with compact, full-width role rows and responsive section columns. Added the missing 100-company overview entry in the Method contents.
- Added a main landmark, keyboard skip link, tab/panel associations and selected-tab keyboard stops. Improved the profile focus trap and retained Escape/focus-return behavior.
- Updated design documentation to the current database, functional taxonomy and default overview.

## Verification

- `node check.js`: 160 dependency-free assertions pass. Coverage includes counts, classifications, relationship endpoints/direction/status, product ownership, shared disclosure data, CSV formula protection, focused-matrix coverage, chapter targets and unique static IDs.
- `python validate.py index.html`: 430 records and 430 profiles; zero errors and warnings. The 26 legacy technical categories remain the compatibility crosswalk; the primary taxonomy has five roles and 22 sections.
- Browser layout inspection: 144 states, comprising 12 market views and six analytical chapters at 390, 768, 1440 and 2752 pixels in light and dark appearances. No page-level horizontal overflow or clipped visible button text detected. Intentionally scrollable matrices and tables retain their own scroll regions.
- Visual inspection included desktop and phone Ecosystem layouts, the taxonomy catalog, matrix legends, disclosure tables and product screening/profile treatment.
- Exercised company search, profile opening/closing and focus return, tab arrow navigation, the skip link, disclosure chapter navigation, shortlist/note persistence, selected relationship evidence and reliability-slider recalculation. No browser console errors were captured in the final interaction pass.

## Verification limits

This is a bounded product and consistency review, not a fresh independent audit of every claim in all 430 records. Source dates and inherited evidence remain visible; missing relationships remain research gaps. No claim of exhaustive market coverage is made.

CSV serialization and formula protection pass automated checks, and its browser control was exercised. The browser automation bridge did not capture a download event in the bounded download check, so browser file delivery is not reported as independently verified. SVG generation is covered by the existing automated export checks.

The responsive pass targets the listed widths and current Chrome; it does not certify every browser, device, zoom level or assistive-technology combination.
