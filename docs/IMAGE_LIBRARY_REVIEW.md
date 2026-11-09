# Offline artwork integration — 9 November 2026

## Delivered and preserved

- Imported the v7-1 archive into `src/assets/illustrations-v2/` without overwriting any existing artwork.
- 121 PNGs, 121 unique IDs, 121 distinct SHA-256 hashes. Every checksum matches the supplied manifest; dimensions are checked from PNG headers.
- Original manifest, review CSV, integration guide and editable sources retained unchanged. Historical counts in the guide are superseded by the manifest's 121.
- Literal static Metro sources for all 121 drafts. Offline reviewer displays one image at a time, so the full pack is not decoded into memory together.
- Existing nine image IDs remain stable, with neutral visual descriptions during questions and meaning captions only in learning/answer review. Flashcards, practice results and selected sign notes now share that renderer.
- 208 question records, correct answers and IDs preserved. No SQLite migration or progress/session changes.

## Review status and candidate bindings

**0/121 draft assets independently approved. 0/208 questions independently approved.** This integration is not editorial sign-off. No draft ID is accepted by the learner question registry. The reviewer entry is available in development or builds explicitly made with `EXPO_PUBLIC_IMAGE_REVIEW=true`; normal release navigation hides it.

These are semantic candidates from the supplied descriptions and the existing question subjects, not activated bindings or completed visual reviews:

| Draft asset | Candidate question | Required context |
| --- | --- | --- |
| `reg_stop_isolated` | `sign-recognition-001` | Isolated sign; replace only after shape/lettering review |
| `reg_no_entry_isolated` | `sign-recognition-002` | Isolated sign; review bar/circle proportions |
| `reg_give_way_isolated` | `sign-recognition-003` | Isolated sign; review border and lettering |
| `reg_speed_limit_30_isolated` | `sign-recognition-004` | Isolated sign; review numeral typography |
| `reg_national_speed_limit_isolated` | `sign-recognition-006` | Isolated sign; review diagonal stripe |
| `warn_traffic_signals_ahead_isolated` | `sign-recognition-008` | Isolated warning sign; review symbol |
| `crossing_zebra_scene_01` | `rules-001` | Context scene; review traffic direction, pedestrian position and markings |

Do not use roadside variants as replacements for isolated sign identification. The supplied suggestion for `reg_give_way_roadside_scene_01` is therefore held, even though its suggested question ID exists. A matching category alone is insufficient. The pack has no isolated replacements for the existing 50 mph and keep-left question diagrams; retain those originals.

## Initial findings requiring review

This is an initial spot check, not a visual audit of all 121 files.

| Asset/group | Finding and required action |
| --- | --- |
| `mark_stop_line_scene_01` | Vehicle headlights face towards the junction while the car occupies the right half of the approach; apparent conflict with British left-side driving. The stop line also spans the entire depicted approach. Hold for lane geometry/sign placement rework. |
| `motorway_red_x_closed_lane_original_01` | A single oversized central red X is not clearly associated with an individual lane; cars appear on solid longitudinal boundaries. Lane geometry and the affected lane are ambiguous. Hold for rework before teaching lane closure. |
| `reg_give_way_isolated` | The basic inverted triangle and wording match the intended subject, but border/lettering proportions still require comparison with prescribed artwork. No approval recorded. |
| `*_explanation_*` | Eight annotated photo explanations contain arrows/labels that reveal the lesson. Explanation/revision use only after review, never pre-answer scored questions. |
| `dashboard_warning_panel_*` | Multiple symbols in one picture; unsuitable for a question asking the learner to identify one warning lamp. Use reviewed individual icon assets for those questions. |
| `weather_*` | Composites from existing project artwork, not evidentiary photographs. Review realism and scenario meaning individually; explanation/revision candidates only. |
| Whole pack | Distinct hashes do not establish distinct educational subjects. Roadside/isolated variants repeat subjects deliberately. Licensing provenance, sign typography, UK lane direction and ambiguity still require independent checks. |

Primary sources checked on 9 November 2026:

- [DfT regulatory signs](https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs): STOP/GIVE WAY/no-entry meanings and reference illustrations.
- [DfT signing system](https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system): order/warning/information shapes and exceptions.
- [DfT warning signs](https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs): traffic-signals-ahead reference.

These references establish intended meanings, not certification of the artwork's geometry. The original review CSV remains pending and unchanged.

## Verification and remaining device checks

Automated integrity tests cover source paths, PNG dimensions, hashes, duplicate bytes, pending tracker rows, separation from scored questions, original image metadata and hidden quiz captions. Android Metro export must include 130 local image assets (121 drafts plus nine existing diagrams) in an artwork-review build.

The continuation found that a hidden review menu still pulled all draft masters
into ordinary exports through its static import. Metro now substitutes an empty
review component for production learner builds. Explicit review builds and
development retain the full reviewer. The export verifier checks actual asset
hashes: all original learner diagrams must remain, all drafts must be absent in
learner exports, and all drafts must be present in review exports. CI runs both
Android modes plus the iOS learner export. The original master files, manifests,
question records and SQLite formats are unchanged.

Local continuation verification: TypeScript and all 53 tests pass. Android and
iOS learner exports each contain nine PNGs (0.39 MiB); the Android review export
contains 130 PNGs (146.18 MiB). All three pass packaged-byte verification. These
are JavaScript/asset export results, not native APK or physical-device results.
The branch upload was blocked by automatic approval review pending explicit
permission to upload the source and draft pack to the GitHub repository, so CI
for this branch and its standalone APK are not yet verified.

Native Android airplane-mode cold start, all-image browsing, force-stop/resume, TalkBack, 200% fonts and low-memory QA must be repeated on the new build. Earlier device results apply to the older APK. This environment does not have a connected Android phone. CI builds provide a release-mode device-test APK; production signing and commercial release remain separate work.
