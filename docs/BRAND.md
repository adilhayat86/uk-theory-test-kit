# Roadstep visual identity

Roadstep is the working brand for this internal Great Britain car-theory revision build. Its learning promise is simple: **UK theory, one step forward.** It is not an official DVSA product or a promise of passing the driving theory test. Public brand-name and trademark clearance remains outside this test update.

The original mark is an ascending white path with three steps and a lime checkpoint dot on an indigo field. It represents visible learning progress, including returning to an earlier topic when revision is useful. It does not imply a verified mastery or pass-readiness score. The icon contains no national flag or endorsement badge.

The shared palette in `src/theme.ts` uses warm offwhite (#F7F7F2), indigo (#4F46E5), dark ink (#202033), lime (#DDEA91), soft lavender (#EFEDFF) and quiet grey borders. Green and red retain their semantic meaning in answer feedback. Coverage, latest answer correctness and overall accuracy remain distinct concepts in the interface.

Editable SVG masters and matching exported PNGs live in `src/assets/brand/`. The app icon is opaque. Android's adaptive foreground is transparent, with the symbol inset to protect its checkpoint under launcher masks; its separate background is indigo. The header uses the rounded-square brand mark. The seven matching outline icons have simple geometry that remains legible at small sizes.

Navigation remains compatible with existing routes. Its visible order is Home, Learn, Progress, Signs and Saved, with Progress in the centre. The active destination has a lime indicator; Progress retains an indigo tile when another destination is active. Labels and selected state remain available to screen readers.

All artwork is original project vector work. Competitor research informs the study flow, not the logo, artwork or typography. The package identifier, bundle identifier and question IDs remain unchanged so an update can preserve stored learning data. The old Union Flag asset is retained for any scoped country-reference use; it is no longer part of the launcher identity.
