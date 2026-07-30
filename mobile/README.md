# BioSense iOS (TestFlight)

Thin Capacitor shell that opens the live web app  
`https://bio-sense-app-navy.vercel.app`

Backend mobile APIs (Bearer login etc.) were already in place. This folder is the **native iOS project** that was missing.

| | |
|---|---|
| Bundle ID | `ai.biosense.app` |
| Display name | BioSense |
| Version | 1.0 (build 1) |

> Building / uploading to TestFlight **requires a Mac** with Xcode. This Windows machine can sync the project; it cannot Archive.

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
npx cap sync ios
npx cap open ios          # opens Xcode
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

Pushing to `main` updates Vercel. The iOS shell always loads production — **you do not need a new TestFlight build** for most web changes.

You **do** need a new build when you change:

- Bundle ID, icons, splash, Info.plist permissions
- Capacitor plugins / native code
- `server.url` in `capacitor.config.ts`

```bash
cd mobile && npx cap sync ios && npx cap open ios
# then Archive again
```

---

## What this is / isn’t

**Is:** installable TestFlight app with the real BioSense UI, login, wearables, blood upload, chat.

**Isn’t yet:** HealthKit sync, Apple Push (APNs), offline-native UI. Those need a deeper native pass later; Bearer APIs under `/api/auth/mobile/*` are ready for that.
