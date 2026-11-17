# Driving Theory Test UK: Learn identity

The descriptive app title is **Driving Theory Test UK: Learn** (29 characters). The core phrase, “Driving Theory Test UK”, appears first; “Learn” describes the progress-led learning flow. The title is used in Expo/native app metadata, the README and the draft privacy notice. The compact in-app header uses the current screen name beside the brand mark; the full app title remains in native metadata and study-tool information.

This wording follows the vocabulary of current [Google Play](https://play.google.com/store/apps/details?id=com.ablab.driving.theory.test.uk) and [Apple App Store](https://apps.apple.com/gb/app/driving-theory-test-uk-kit/id596040849) category listings. Both [Google Play](https://support.google.com/googleplay/android-developer/answer/9898842) and [Apple](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information) allow titles up to 30 characters. This is a descriptive naming choice, not measured search-volume evidence or a search-ranking promise. No store listing has been published or renamed by this internal update.

## Road-sign variation

The Union Flag fills the background outside the red octagon, making the regional identity visible at small icon sizes. It reuses the project's existing flag geometry, cropped to the square without distortion. The car and checkmark stay clear on the red sign. The earlier small inset has been removed.

The original mark uses the familiar red octagonal silhouette of a STOP sign, with a white inset border. Its central symbol is a newly drawn front-view car and checkmark, replacing the STOP lettering. It represents driving knowledge and practice; it is not an actual instructional sign or an official approval badge. [DfT describes the STOP sign's distinctive octagonal shape](https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system).

Editable SVG masters and matching PNG exports are in `src/assets/brand/`. The 1024px app icon has an opaque Union Flag background, red octagon (#DC333C), and white symbols. The adaptive foreground is transparent and inset so the complete sign fits launcher masks; its separate `adaptive-background.png` carries the flag. The header mark has the same flag backdrop with rounded-square clipping. Full-size, 64px and circular launcher variants were inspected for legibility.

The study interface retains indigo actions, lime progress accents and warm neutral surfaces from `src/theme.ts`. Red is used in the sign-inspired identity and retains its existing answer-feedback meaning. The Progress navigation icon remains an ascending path because it describes learning progress, independently of the app logo.

The package identifier, bundle identifier, question IDs, database and signing identity stay compatible with the installed test app. This remains independent Great Britain car-theory revision, not an official DVSA product. The scope and content approvals are unchanged by naming or visual identity work.
