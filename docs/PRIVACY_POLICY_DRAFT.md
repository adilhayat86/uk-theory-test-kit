# Driving Theory Test UK: Learn — privacy notice prepared for publisher review

Revised: 18 November 2026. Android MVP 0.8.0.

The public-facing webpage is prepared at [release/privacy/index.html](../release/privacy/index.html). It is **not published**. The confirmed support/privacy contact is **adilhayatkamker@gmail.com**. Publisher legal identity, the hosted privacy URL and final publisher review remain required before a paid Play release.

## Current data handling

Study works without an account, advertising, analytics or a developer-operated progress server. The app keeps lesson positions and study confirmations, question answers, revision progress, saved questions/signs, ordinary practice, topic-check snapshots, mock answers/flags/timing/results and each mock's study acknowledgement in its private local storage.

Lessons, illustrations and the three original case-study animations are bundled locally. Optional source/help links open the user's browser or another app and need connectivity. The app does not automatically attach study history to those links or to a support email.

No name, email, password, location, contacts, photographs, government ID or payment-card information is needed to study. If a user chooses to email support, the mailbox receives the sender address and whatever they include. The prepared notice explains that distinction; it does not falsely claim the support mailbox receives no personal information.

The intended commercial model is a **one-time paid Google Play download with all included content available**, no subscription and no in-app purchases. Google Play processes purchase/account/payment information independently. Android/store diagnostics are governed by their settings and terms.

## Local-only storage and deletion

The Android config explicitly sets `allowBackup=false` and `fullBackupContent=false`. Its generated `dataExtractionRules` exclude all nine app-storage domains from both cloud backup and device transfer. This additional rule matters because some manufacturers can permit device transfers despite `allowBackup=false` alone. The native APK verifier checks the **compiled manifest and referenced rules**, not only app.json.

The MVP has no cloud copy from which to restore learning. Resetting app study data, clearing Android app storage, uninstalling or replacing the phone can permanently remove history. An ordinary app update must continue to preserve local data through compatible migrations; disabling backup does not authorize an update-time wipe. Copies independently made using manual/device-management tools are outside the app's control.

The user can remove local study data with the app's reset control or Android Settings → Apps → Driving Theory Test UK: Learn → Storage → Clear data. There is no remote learner account to delete. Email privacy enquiries and requests about support correspondence use the confirmed address above.

## Publisher checklist before posting the notice

- Review the prepared HTML against the final shipped code, SDKs, manifest permissions and actual support-mailbox practices, including retention/deletion of correspondence.
- Confirm the developer identity used in Play Console. Do not invent a legal name from the GitHub username.
- Publish the reviewed notice as a normal, accessible public HTTPS webpage, with no login, geofencing or PDF-only delivery. Enter its real URL in `release/android-release.json` and Play Console.
- Make privacy information accessible inside the app and keep its contact/data-handling text consistent with the hosted notice.
- Complete the Play Data safety form from the actual production behavior. Local-only processing is different from off-device collection; SDK behavior and voluntary support communications still need accurate treatment.
- Recheck storefront, audience, content-rating and local consumer/privacy requirements before publishing. This repository draft is not legal approval.

## Primary policy and platform references

Checked 17–18 November 2026:

- [Google Play: prepare your app for review/privacy policy](https://support.google.com/googleplay/android-developer/answer/9859455)
- [Google Play: Data safety declarations](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Android: Auto Backup, cloud and device-transfer exclusions](https://developer.android.com/identity/data/autobackup)

The production preflight intentionally fails until publisher identity, the public privacy URL, owner signing configuration and independent content approvals are supplied. A passing internal build does not publish this page or approve a paid release.
