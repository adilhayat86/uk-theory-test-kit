# Bundled illustration sources

## Department for Transport signs

`src/assets/dft-signs/` contains 30 SVGs downloaded on 10 November 2026 from **Know Your Traffic Signs**, plus PNG rasterizations. `sources.json` records source chapters, direct URLs, SHA-256 digests and PNG dimensions.

Contains public sector information licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). Crown copyright 2023, Department for Transport. No government endorsement is implied.

Sources:

- [The signing system](https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system)
- [Regulatory signs](https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs)
- [Warning signs](https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs)
- [Speed limit signs](https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs)
- [Information signs](https://www.gov.uk/government/publications/know-your-traffic-signs/information-signs)

These pages identify Crown copyright and OGL v3.0, subject to identified third-party exceptions. The selected vectors have no identified third-party exception. SVG bytes are retained unchanged. PNGs were rendered at 640 pixels wide with `@resvg/resvg-js`, preserving aspect ratio. Generic shape schematics are labelled accordingly. Attribution also appears in Road Signs.

## Original project artwork

The current learner selection contains **52 original project images**, recorded in `src/assets/illustrations-v2/learner-selection.json`. The complete 121-image source pack remains available for internal review; the other 69 drafts must not be shipped in the learner APK. The native verifier compares decoded image pixels because Android resource processing can rename or recompress PNG files. Selection does not constitute independent human editorial approval. No competitor media was imported.

## Original video and brand assets

The three silent, 20-second case-study clips under `src/assets/case-studies/` are original diagram animations. Their generation sources and timing notes are retained beside the MP4s. No DVSA/competitor footage, music or third-party stock video is included. They support multiple-choice study; they are not hazard-perception clips or official test footage.

The app's road-sign-inspired car/check mark, flag variation and navigation graphics are original project artwork, with editable SVG masters under `src/assets/brand/`. The mark is branding, not an official traffic sign, endorsement or approval badge. Government sign meanings/source material remain subject to the separate attribution above.

Paid publication requires review of the selected images, videos, questions, lessons and sign notes. Content-addressed review records bind approval to the exact text, mappings and media bytes; automated packaging checks alone do not approve commercial use or factual correctness.
