# Original offline video case studies

Three original silent **diagram animations**, not DVSA footage or a hazard-perception simulator. All vehicle graphics, road layouts and motion are authored in `generate.mjs`; no competitor footage, stock photographs, AI photographic drafts or external video files are used.

Each MP4 is 20 seconds, 960×540, 20 fps, H.264 with yuv420p pixel format, no audio, and `faststart` metadata. Scenes show Great Britain left-hand traffic. Registry IDs in `src/data/caseStudies.ts` match the nine questions in `src/data/caseStudyQuestions.ts`.

| Registry ID | MP4 | Events to review |
|---|---|---|
| case-zebra-crossing | town-crossing.mp4 | Both approaching cars stop outside the crossing; a pedestrian crosses; cars move only once it is clear. |
| case-wet-following | wet-following-gap.mp4 | Rain is visible; the blue following car increases its spacing behind the other car and stays in the left-hand lane. |
| case-cyclist-oncoming | cyclist-and-parked-vehicles.mp4 | A cyclist moves clear of parked vehicles. The blue car stays behind while oncoming traffic passes, then gives the cyclist room while overtaking. |

## Reproduce

Install Node.js, ffmpeg (with libx264) and the build-only `sharp` package. `sharp` is intentionally not an app runtime dependency. If installed outside the repository, set `CASE_STUDY_SHARP_MODULE` to its module directory. Then run:

```
node src/assets/case-studies/generate.mjs
```

The generator writes the three MP4s and editable SVG/PNG snapshots at 0, 8 and 16 seconds under `review-frames/`. These review files are not referenced by the app's runtime asset registry.

## Sources and status

Questions were independently authored against these current primary sources, checked 17 November 2026:

- Highway Code Rule 195 / H2: https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203
- Highway Code Rule 126: https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158
- Highway Code Rules 162–163: https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203
- Highway Code Rule 213: https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225

Independent human editorial and driving-instructor review is **pending**. Technical validity and source checking are not commercial release approval. The animations simplify real roads and do not establish exact spatial scale. Numeric passing/following-distance questions state the necessary conditions explicitly rather than asking users to measure the animation.
