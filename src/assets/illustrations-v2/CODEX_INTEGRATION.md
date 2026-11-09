# Codex instructions — individual-image draft pack

## What this is

This archive contains **89 standalone PNG assets, including 12 newly drawn dashboard warning icons**, not a grid, not 194 separate files. They are a first batch replacing the unacceptable bulk-generated pack. The longer-term goal is **194 separately authored and reviewed image assets** across 12 categories.

## Integration requirements

1. Work in `adilhayat86/uk-theory-test-kit` (current app uses Expo/React Native). Inspect the latest `main` and current `src/components/QuestionIllustration.tsx` and `src/data/questions.ts` before making changes.
2. Do not overwrite the tested 208-question bank, user bookmarks, saved attempts, offline sessions, SQLite data, or existing assets. Create a feature branch for this visual refresh.
3. Unzip these files into a new folder such as `src/assets/illustrations-v2/` and preserve the exact filenames in `image-manifest.json`.
4. For each asset, add an explicit static Metro `require('../assets/illustrations-v2/reg_stop_isolated.png')` (with correct relative path for the component). Do not construct a dynamic path or fetch from a URL.
5. Prefer a single authoritative map of `assetId -> require(...)`, retaining older IDs as aliases until question references are migrated. Migrate only the source data's appropriate question IDs after checking that the image actually depicts the question. `suggestedQuestionId` is **not approval**.
6. Distinguish *isolated sign diagrams* from *roadside driving scenes* and *multi-symbol panels*. Do not use a scene image as the primary sign-identification graphic, and do not use the four-symbol dashboard panel when the question asks the learner to identify one symbol.
7. For all new artwork, add concise accessibility labels. Test the same sign in practice questions, mock exams and review screens with airplane mode on. Verify 200% font scaling, scrolling, offline cold start and force-stop restoration on Android.
8. Run `npm ci`, `npm run typecheck`, `npm test`, `npm run check:mvp:content -- --report-only`, `npm run check:mvp:editorial -- --report-only`, and GitHub Mobile CI; produce/install the **standalone offline release-mode APK**, not a Metro-dependent debug APK.
9. Only change `DRAFT_REVIEW_REQUIRED` after sign-shape/lettering, UK traffic direction, road markings, visual ambiguity and licensing checks against current DfT sources. Do not mark questions as independently editorially approved merely because the image looks plausible.
10. Update the master manifest and review tracker with every newly generated asset. Keep a count of unique standalone PNGs, not panels or previews.

## Official reference material

- https://www.gov.uk/government/publications/know-your-traffic-signs
- https://www.gov.uk/guidance/the-highway-code/traffic-signs
- https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203

## Updated library status (6 November 2026)

- 31 verified unique individually generated PNG files are in `images/`.
- 10 new scenes have been added as alternate roadside/context artwork with `_scene_02` and related suffixes.
- Check `PROGRESS.md` for the per-category counts and remaining targets.
- **Do not overwrite isolated road-sign images with roadside scenes** for basic sign identification.
- Preserve IDs and paths in `image-manifest.json`; all 21 remain `DRAFT_REVIEW_REQUIRED`.
- The newly included files are separate generated scenes, **not** 10 extra approved questions or a completed image bank.

## What remains

The app's full target is 194 individually illustrated and verified images, so **163 further individual assets** are still needed. Start with isolated sign assets, then independent road-marking and junction scenes, then hazards, weather, vehicle safety and UI art. The individual files in this pack are drafts and need quality review. The road sign images are visual approximations, not certified statutory artwork.

## Latest 10 individual sign images

- `reg_no_motor_vehicles_scene_01.png`: No motor vehicles restriction sign mounted on a UK road — `DRAFT_REVIEW_REQUIRED`
- `reg_no_overtaking_scene_01.png`: No overtaking sign in residential UK street scene — `DRAFT_REVIEW_REQUIRED`
- `reg_no_u_turn_scene_01.png`: No U-turn restriction sign by UK street — `DRAFT_REVIEW_REQUIRED`
- `reg_ahead_only_scene_01.png`: Straight ahead only blue circular instruction beside UK street — `DRAFT_REVIEW_REQUIRED`
- `reg_keep_left_bollard_scene_01.png`: Keep left arrow at centre-island bollard in British road — `DRAFT_REVIEW_REQUIRED`
- `warn_left_bend_scene_01.png`: Bend to left red triangular warning sign on rural UK road — `DRAFT_REVIEW_REQUIRED`
- `warn_right_bend_scene_01.png`: Bend to right triangular sign by country lane — `DRAFT_REVIEW_REQUIRED`
- `warn_crossroads_scene_01.png`: Crossroads ahead triangular warning at a UK junction — `DRAFT_REVIEW_REQUIRED`
- `warn_slippery_road_scene_01.png`: Slippery road warning sign with wet road surface — `DRAFT_REVIEW_REQUIRED`
- `warn_school_children_scene_01.png`: School children warning sign near school entrance — `DRAFT_REVIEW_REQUIRED`


## Individual warning-sign composite batch (8 files)

The eight `warn_*_scene_01.png` files listed below are independently composed illustrations with vector warning symbols over existing original photographic scenery; do not misrepresent as photographs or reviewed official signs. Keep out of live quizzes until a competent reviewer confirms DfT sign correctness.

- `images/warn_roundabout_ahead_scene_01.png` — Original roadside sign illustration: roundabout ahead warning, composite from original generated photography
- `images/warn_road_narrows_both_scene_01.png` — Original roadside sign illustration: road narrows on both sides
- `images/warn_two_way_traffic_scene_01.png` — Original roadside sign illustration: two-way traffic warning
- `images/warn_t_junction_scene_01.png` — Original roadside sign illustration: T-junction warning
- `images/warn_double_bend_scene_01.png` — Original roadside sign illustration: double bend first left
- `images/warn_steep_hill_down_scene_01.png` — Original roadside sign illustration: steep descent 10 percent
- `images/warn_roadworks_scene_01.png` — Original roadside sign illustration: roadworks warning
- `images/warn_pedestrians_scene_01.png` — Original roadside sign illustration: pedestrians in road warning

All new assets have unique IDs, SHA-256 hashes and `DRAFT_REVIEW_REQUIRED` status in `image-manifest.json`. Use `PROGRESS.md` for counts. Maintain complete offline bundling via static Metro require paths.


## Individual warning-sign composite batch (8 files)

The eight `warn_*_scene_01.png` files listed below are independently composed illustrations with vector warning symbols over existing original photographic scenery; do not misrepresent as photographs or reviewed official signs. Keep out of live quizzes until a competent reviewer confirms DfT sign correctness.

- `images/warn_roundabout_ahead_scene_01.png` — Original roadside sign illustration: roundabout ahead warning, composite from original generated photography
- `images/warn_road_narrows_both_scene_01.png` — Original roadside sign illustration: road narrows on both sides
- `images/warn_two_way_traffic_scene_01.png` — Original roadside sign illustration: two-way traffic warning
- `images/warn_t_junction_scene_01.png` — Original roadside sign illustration: T-junction warning
- `images/warn_double_bend_scene_01.png` — Original roadside sign illustration: double bend first left
- `images/warn_steep_hill_down_scene_01.png` — Original roadside sign illustration: steep descent 10 percent
- `images/warn_roadworks_scene_01.png` — Original roadside sign illustration: roadworks warning
- `images/warn_pedestrians_scene_01.png` — Original roadside sign illustration: pedestrians in road warning

All new assets have unique IDs, SHA-256 hashes and `DRAFT_REVIEW_REQUIRED` status in `image-manifest.json`. Use `PROGRESS.md` for counts. Maintain complete offline bundling via static Metro require paths.

## New composite-regulatory batch (8 files)

The eight `reg_speed_limit_*`, `reg_turn_*`, `reg_keep_right_*` and `reg_height_limit_*` photo/vector composites are separate self-contained PNG assets with 1024×1024 dimensions. They have no suggested question IDs until an editor matches their depicted meanings to current questions. **Do not add misleading image-to-question bindings.** Keep all these assets offline via static Metro `require(...)` calls only after a person approves the depicted sign.

The `productionMethod` metadata distinguishes composites from photo-generated images. Never treat a checksum difference as proof of unique educational subject matter or as evidence of DfT approval. Preserve the manifest and `image-review-tracker.csv` during import.

## New composite-regulatory batch (8 files)

The eight `reg_speed_limit_*`, `reg_turn_*`, `reg_keep_right_*` and `reg_height_limit_*` photo/vector composites are separate self-contained PNG assets with 1024×1024 dimensions. They have no suggested question IDs until an editor matches their depicted meanings to current questions. **Do not add misleading image-to-question bindings.** Keep all these assets offline via static Metro `require(...)` calls only after a person approves the depicted sign.

The `productionMethod` metadata distinguishes composites from photo-generated images. Never treat a checksum difference as proof of unique educational subject matter or as evidence of DfT approval. Preserve the manifest and `image-review-tracker.csv` during import.

## New composite-regulatory batch (8 files)

The eight `reg_speed_limit_*`, `reg_turn_*`, `reg_keep_right_*` and `reg_height_limit_*` photo/vector composites are separate self-contained PNG assets with 1024×1024 dimensions. They have no suggested question IDs until an editor matches their depicted meanings to current questions. **Do not add misleading image-to-question bindings.** Keep all these assets offline via static Metro `require(...)` calls only after a person approves the depicted sign.

The `productionMethod` metadata distinguishes composites from photo-generated images. Never treat a checksum difference as proof of unique educational subject matter or as evidence of DfT approval. Preserve the manifest and `image-review-tracker.csv` during import.

## Information and direction signs — batch of 8 (pending approval)

Assets are at `images/info_*.png`. The manifest lists the eight explicit IDs and files. They are **drafts, not approved official sign replicas**. Do not automatically attach them to exam questions by topic or keyword. An editor must check DfT shape/legend/colour and mark the relevant CSV row as approved, then connect the asset to a semantically matching question.

Suggested integration: place approved images under `src/assets/information/` and add explicit static Metro `require()` entries; never construct paths dynamically. Keep all assets offline. Preserve the previous 208-question bank and its tests.

**Current archive count: 55 individually named PNG files; 139 remain to target.**

## Road markings batch — eight new individual images

Use IDs `mark_single_yellow_line_scene_01`, `mark_double_yellow_lines_scene_01`, `mark_broken_centre_line_scene_01`, `mark_double_solid_white_scene_01`, `mark_stop_line_scene_01`, `mark_give_way_lines_scene_01`, `mark_bus_lane_scene_01`, and `mark_diagonal_hatching_scene_01`. Paths and checksum are in `image-manifest.json`. These PNGs are **individually composed top-down teaching illustrations**, not unmodified photo references, and must remain marked `DRAFT_REVIEW_REQUIRED` until inspected by a UK road-sign editor.

For Expo: only import approved images through explicit static `require()` entries; attach an image to a question by exact semantic match after manually reviewing the marking. Keep assets offline. Do not modify the original 208 questions or their correct answers based on these unverified artwork files.

Total packaged: **63/194**, 131 outstanding.

## New junctions and crossings explanation batch (71/194)

The latest eight assets use `productionMethod: individual_explanatory_photo_annotation`. They are **annotated explanations**, not image-based question artwork: callout arrows and labels would give away the answer if displayed during a timed test. Only show them on answer-review, road-rules revision, or explanatory pages after editorial checks. Avoid importing them as default `question.imageAssetId`.

- `junction_give_way_priority_explanation_01` -> `images/junction_give_way_priority_explanation_01.png`; Give way: minor-road driver yields to main-road traffic
- `junction_stop_full_stop_explanation_01` -> `images/junction_stop_full_stop_explanation_01.png`; Stop sign: stop at solid line before entering main road
- `junction_crossroads_approach_explanation_01` -> `images/junction_crossroads_approach_explanation_01.png`; Crossroads warning: check approaching cross traffic
- `junction_yellow_box_exit_clear_explanation_01` -> `images/junction_yellow_box_exit_clear_explanation_01.png`; Yellow box junction: plan a clear exit before entering
- `junction_give_way_road_triangle_explanation_02` -> `images/junction_give_way_road_triangle_explanation_02.png`; Give way road triangle: prepare to yield at junction
- `junction_box_junction_markings_explanation_02` -> `images/junction_box_junction_markings_explanation_02.png`; Box junction: crossed yellow lines and stop line relationship
- `crossing_zebra_pedestrian_priority_explanation_01` -> `images/crossing_zebra_pedestrian_priority_explanation_01.png`; Zebra crossing: give way when a person is on the crossing
- `crossing_belisha_beacons_explanation_01` -> `images/crossing_belisha_beacons_explanation_01.png`; Zebra crossing: identify the Belisha beacon and crossing

Use `image-manifest.json` IDs, static Metro `require(...)` and an approved mapping into the current source tree without changing 208 original questions or user progress state. Human sign/priority reviews required before publication.


## 6 Nov: six new original constructed UK road scenes (77-image pack)

The new `junction_*_original_01.png` and `hazard_*_original_01.png` files are drawn, high-resolution standalone illustrations (1600×1000), not photographs. Do not position them as photorealistic clips or officially validated exam images. All are `DRAFT_REVIEW_REQUIRED` and must be reviewed for accurate British lane geometry, priority and safety; ideally replace any insufficient artwork with independently generated photorealistic scenes. Import with static Expo `require(...)` statements using manifest IDs. Recommended for revision/explanation scenarios pending QA, not official DVSA questions. The manifest contains their checksums, descriptions and paths.


## Added dashboard warnings (latest batch)

The files matching `images/dash_*_individual_01.png` are **1024×1024 static local PNGs**, with matching `editable-svg/` source files. They show individual symbols without revealing their names on the image.

1. Use only after manual sign-meaning and warning-colour review, as warning icons can differ by vehicle manufacturer.
2. Never automatically insert all icons into mock-exam questions: first verify each question's subject and correct answer.
3. Render through explicit static `require` entries and show the matching accessibility description from the manifest.
4. For UI performance prefer PNG resized to 384/512 px after approval; retain the 1024px master and SVG source for future edits.
5. No network access: these images must work in airplane mode.

**Note:** The preceding integration guide may refer to a historical 71-asset batch. The current canonical count is 89.


## 7 Nov 2026: individual vehicle safety illustrations (97 draft PNG assets total)

Eight `images/vehicle_*_original_01.png` files and matching `editable-svg/` originals have been added. They are standalone custom diagrams (1250×1000); they are not generated photos and not verified exam-standard assets. Use the IDs and file paths from `image-manifest.json`. Keep the existing 208-question bank unchanged unless a question’s actual subject matches the asset and it passes human editorial approval. For Expo offline bundling, register each via literal `require('../assets/vehicle_...png')`, not dynamic file-path construction. All eight should initially be used in explanatory/revision screens, not mock-test questions. Do not overwrite the previously approved project branch source or lose earlier 89 images.


## New vehicle-safety batch (105 draft PNGs)

Eight extra vehicle-related PNGs named `vehicle_*_original_02.png` plus matching editable SVGs are in this archive. Use `image-manifest.json` as the sole source of paths, category tags, metadata and checksums. Attach only when visually appropriate and after content editorial approval. Load images via literal `require()` calls in the Expo asset registry. Preserve prior image IDs and all 208 existing questions. These are technical illustrations, not photographic images or approved DVSA artwork.


## V6: eight additional motorway teaching scenes

Assets: 8 original 1600×900 PNG road-situation diagrams with matching SVG source files; not photographs. These are draft explanation assets; do not use them in scored exams before an independent UK safety/signage review.

- `images/motorway_joining_slip_road_original_01.png`: Joining a motorway from a left-side acceleration lane
- `images/motorway_exit_slip_road_original_01.png`: Leaving the motorway via a signed exit slip road
- `images/motorway_red_x_closed_lane_original_01.png`: Lane control gantry showing red X closed lane
- `images/motorway_emergency_refuge_area_original_01.png`: Emergency refuge area with orange SOS signage
- `images/motorway_breakdown_hard_shoulder_original_01.png`: Broken-down vehicle safely stopped off traffic lanes
- `images/motorway_variable_speed_limit_original_01.png`: Gantry with electronically displayed 50 mph limit
- `images/motorway_lane_drop_original_01.png`: Lane-drop direction signs and diverging traffic
- `images/motorway_two_second_gap_original_01.png`: Safe following distance between two vehicles

Preserve all previous image mappings. Use static literal `require()` values for Expo and map images only to semantically corresponding questions. This ZIP contains 113 draft images, not 113 approved illustrations.


## V7 — Individual adverse-weather scenes

This update adds 8 PNG assets in `images/weather_*.png`, with `Weather and adverse conditions` metadata. All are independently composited photographic illustrations created from existing project artwork, and **none is an official evidentiary or real-world photograph**. Use only for revision/explanations after UK editorial review. Use the stable `id` and `file` paths from `image-manifest.json`; do not guess file names.

Assets:
- `weather_fog_reduced_visibility_original_01` — Fog obscuring oncoming vehicles — `images/weather_fog_reduced_visibility_original_01.png`
- `weather_heavy_rain_braking_original_01` — Heavy rain and extended braking distance — `images/weather_heavy_rain_braking_original_01.png`
- `weather_night_wet_road_original_01` — Wet road reflections after dusk — `images/weather_night_wet_road_original_01.png`
- `weather_low_sun_glare_original_01` — Low sun glare on a UK road — `images/weather_low_sun_glare_original_01.png`
- `weather_snow_surface_original_01` — Snow covering a rural carriageway — `images/weather_snow_surface_original_01.png`
- `weather_road_spray_original_01` — Reduced visibility through road spray — `images/weather_road_spray_original_01.png`
- `weather_standing_water_original_01` — Standing water and reduced tyre grip — `images/weather_standing_water_original_01.png`
- `weather_crosswind_trees_original_01` — Strong crosswind and roadside trees — `images/weather_crosswind_trees_original_01.png`

For Expo, use a literal static `require()` registry; never construct a dynamic `require()` path. Resize/compress offline for device distribution. Do not replace existing 113 files or merge imagery into a contact sheet.
