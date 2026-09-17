# BioSense native shells (iOS TestFlight + Android Play)

Thin Capacitor shells that open the live web app  
`https://bio-sense-app-navy.vercel.app`

| | |
|---|---|
| App ID / package | `ai.biosense.app` (same on iOS and Android) |
| Display name | BioSense |
| iOS version | 1.0 (build 4) |
| Android version | 1.0 (versionCode 1) |
| App icon | Real S-mark (`public/biosense-mark.png` → `mobile/resources/icon.png`) |

Regenerate icon after brand updates:

```bash
python mobile/scripts/make-app-icon.py
```

`npm run sync` is **iOS only** (HealthKit patch). Do not change that for Play work. Android uses `npm run sync:android`.

> Building / uploading to TestFlight **requires a Mac** with Xcode. This Windows machine can sync iOS; it cannot Archive. Android Studio on Windows is enough for Play.

---

## One-time setup (Neil — Apple Developer)

1. Sign in at [developer.apple.com](https://developer.apple.com) / [App Store Connect](https://appstoreconnect.apple.com).
2. **Identifiers → App IDs → +** → Bundle ID `ai.biosense.app` (or change it here + in Xcode if you prefer another).
3. **Users and Access** — invite James (or whoever builds) as Admin/Developer if needed.
4. **Apps → +** → create **BioSense**, platform iOS, bundle ID above.
5. On a Mac: install **Xcode** (App Store) + open it once to accept licenses. Install CocoaPods if prompted (`sudo gem install cocoapods`).

---

## Build & TestFlight (on a Mac)

```bash
cd mobile
npm install
npm run sync
npx cap open ios
```

In Xcode:

1. Select the **App** target → **Signing & Capabilities** → Team = Neil’s Apple Developer team. Turn on **Automatically manage signing**.
2. Plug in an iPhone *or* pick Any iOS Device (for Archive).
3. **Product → Archive**.
4. Organizer → **Distribute App → App Store Connect → Upload**.
5. App Store Connect → BioSense → **TestFlight** → wait for processing → add internal testers → they install via the TestFlight app.

Bump version when you ship again: `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in the Xcode target (or `project.pbxproj`).

---

## After changing the web app

Pushing to `main` updates Vercel. Both shells always load production — **you do not need a new store build** for most web changes.

You **do** need a new native build when you change:

- Bundle ID, icons, splash, Info.plist / AndroidManifest permissions
- Capacitor plugins / native code
- `server.url` in `capacitor.config.ts`

```bash
cd mobile && npx cap sync ios && npx cap open ios
# then Archive again
```

---

## What this is / isn’t

**Is:** installable TestFlight / Play-internal app with the real BioSense UI, login, wearables, blood upload, chat, and **daily local reminders**. **Apple Health (HealthKit)** is iPhone only.

**Still later:** remote push (APNs / FCM), Health Connect / Terra Dexcom on Android, Play Billing (today Stripe still runs in the WebView). Bearer APIs under `/api/auth/mobile/*` remain available.

### Apple Health (one more TestFlight — build 4)

The live website cannot read HealthKit. Neil archives **1.0 (4)** once from latest `main`. After testers install that build, Wearables → Apple Health → Connect. No further Mac work for Apple Health unless native code changes again.

---

## Android / Play (Windows is fine)

Same package `ai.biosense.app`. HealthKit is not in this project. Apple Health / Dexcom-via-Health buttons tell people that is iPhone only.

Neil: Google Play Console as Origin BioSense Technologies FZCO, then create the app listing.

On this machine (Android Studio installed):

```bash
cd mobile
npm install
npm run sync:android
npm run open:android
```

In Android Studio: wait for Gradle, then **Build → Generate Signed App Bundle / APK** (AAB for Play). First upload goes to an **internal testing** track, not production.

Play listing still needs screenshots, Data safety, privacy URL, and a call on Stripe vs Play Billing.
