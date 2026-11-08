# Market map quality review

Reviewed November 7, 2026. Applies to the integrated public market map and private relationship atlas.

## Corrections

| Area | Reader-facing correction |
| --- | --- |
| Matrix legend | One symbol-only filter/legend above the grid. No line samples, arrowhead guide or duplicate footer key. Plane mode uses counts and plain type filters instead of a symbol legend. |
| View guidance | Atlas, territory rows, dependencies and matrix each have instructions matching their actual visual encoding. |
| Dependency defaults | No silently selected company while Follow reads Choose a company. The empty state invites an explicit choice. |
| Matrix selection | Following a company limits both matrix levels. Displayed totals and the opened plane-pair evidence list now use the same scope. |
| Evidence state | Changing filters clears evidence that is no longer in scope. Closing a relationship keeps the followed company. |
| Keyboard use | Type toggles and layer expansion restore focus after rendering. Evidence headings receive focus when inspected. |
| Mobile evidence | Opening a relationship brings the evidence panel into view. Matrix cells have 44px minimum touch targets on phones. |
| Company controls | Matrix and evidence company buttons use the site's typography and theme instead of native browser styling. Selected company names are indicated. |
| Company-label legends | The original industry and headquarters views now expose the company-label guide, as Company map does. Screening-table guidance explains deployment dots and leader tags. |
| Navigation | Landscape & screening remains marked active throughout its seven views. The hero action focuses a visible navigation control. |
| Sharing and coverage | Relationship views expose the shared roster count, active filter chips, Copy link and roster CSV actions. Relationship export remains separately labeled. |
| Financial terminology | Screening table and Method consistently describe financial marks, distinguishing valuations, historical marks, proposed transactions and capital raised. |
| Taxonomy wording | Full-stack wording explicitly retains primary placement; the scope statement distinguishes general-purpose humanoid developers from dedicated consumer appliances. |
| Dates | The roster review date is labeled separately from the design and relationship edition date. |
| Empty states | Search recovery explicitly suggests clearing search or filters. Industry grids explain horizontal scrolling and separate membership from relationship evidence. |

## Verification

- 91 checks pass: canonical roster, classifications, financial/source invariants, filters, URL restoration, CSV safety, relationship roles, route geometry, storage failure and view-specific encoding regressions.
- Reviewed 79 layout states: 11 map views at three sizes in charcoal, six reading chapters at three sizes in charcoal, 11 map views at phone and desktop sizes in light, and all six chapters at desktop size in light.
- No page-level horizontal overflow, unnamed map controls or duplicate document IDs in the measured states. Wide matrices and territorial grids retain intentional internal scrolling.
- Main prose fills its article column in all six chapters at the measured widths.
- NVIDIA route endpoints remain within 0.001 CSS pixel of company ports on desktop and phone.
- Manually tested matrix evidence selection, closing evidence, type-filter focus, stale-evidence removal, followed-company plane totals, plane-cell evidence counts, dependency empty state, profile opening, shortlist add/remove, mobile evidence navigation, search empty-state recovery, funding toggle and reliability slider.
- Browser console showed no warnings or errors during the review.

## Research boundary

This pass checks presentation, interaction, terminology and internal consistency. It does not constitute a fresh audit of every external claim or source URL. The existing dated research remains visible: 252 roster entries, 244 distinct companies and 117 relationship records, including 30 checked primary-source records and 87 inherited records.
