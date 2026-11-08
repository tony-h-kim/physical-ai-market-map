# Responsive route and editorial layout audit

The relationship routes now terminate on explicit left/right company connection points. SVG coordinates are converted from the rendered port centers using the screen transformation matrix, including browser scaling and horizontal canvas scrolling. The overlay dimensions come from its content rather than its own previous scroll extent. The overlay also overrides legacy SVG minimum/maximum sizes so it can shrink and grow with the map.

ResizeObserver watches both the board and the company columns. Resize, font completion, expansion/collapse, selection, and focus mode recalculate the routes. Same-column routes use the adjoining gutter; routes spanning two planes travel below the columns rather than through intervening labels. Routing remains one CSS pixel at rest.

## Browser review

- Five viewport presets from 390 to 2560 screen pixels; effective CSS widths with the browser's existing scaling were 355, 698, 1164, 1745 and 2327.
- Measured actual rendered path endpoints against rendered company-port centers for NVIDIA, Apptronik and Skild AI, covering incoming/outgoing, same-column, adjacent-plane and spanning-plane connections.
- Endpoint deviations were below 0.001 CSS pixel in the measured states. Expansion/collapse and focus mode were also checked; the SVG height shrank correctly after collapsing a layer.
- Reviewed 51 layout states: seven original map views, four relationship views and all six Insights/Method chapters at phone, laptop and wide-monitor widths. No page-level horizontal overflow was measured. Tables and the mobile atlas retain their intentional internal scrolling.
- Light and charcoal themes reviewed. The section tabs have 44px minimum mobile height and 46px minimum desktop height, with horizontal padding.

## Editorial changes

The fixed 760px article column is replaced with a fluid main column and bounded chapter navigation. Large screens use a wider container, figures, tables and comparison grids. Prose retains a readable measure. Comparison grids stack on phones; the chapter menu moves above the article on narrower screens.

Run `python build.py`, `python validate.py index.html`, and `node check.js`. Route geometry regression checks accompany the existing roster, filter, URL and relationship checks. Screenshots and numeric viewport observations are retained as local review outputs.

## Directional arrow review

Destination markers now use a visible fixed-size arrowhead; intermediate chevrons are deduplicated where routes share a gutter. Named direction labels appear on pointer hover or keyboard focus. The legend defines investor to company, customer to provider, owner/proposed acquirer to company, and technology actor to counterpart. Technology direction follows the announcement and is not a claim of measured one-way dependency.

Reviewed NVIDIA's 11 routes in charcoal at desktop and phone widths, and Schaeffler's customer/equity routes in light mode. Keyboard focus exposed the expected NVIDIA to ABB Robotics label. Measured endpoint errors remained below 0.001 CSS pixel with no page overflow. The existing 75 validation checks pass.
