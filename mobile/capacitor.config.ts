import type { CapacitorConfig } from '@capacitor/cli'

/**
 * Thin native shell for TestFlight / App Store / Play.
 *
 * Loads the live Next.js app so NextAuth cookies, SSR pages, Terra OAuth and
 * Stripe all keep working. HealthKit is iOS only. Local notifications work on
 * both shells via Capacitor.
 *
 * Change `server.url` only if the production host moves.
 */
const config: CapacitorConfig = {
  appId: 'ai.biosense.app',
  appName: 'BioSense',
  webDir: 'www',
  server: {
    url: 'https://bio-sense-app-navy.vercel.app',
    cleartext: false,
    allowNavigation: ['bio-sense-app-navy.vercel.app'],
  },
  ios: {
    // 'automatic' was causing the WKWebView to pan/offset (content wider than
    // the screen). Default 'never' + CSS safe-area insets keeps layout locked.
    contentInset: 'never',
    zoomEnabled: false,
    preferredContentMode: 'mobile',
    scheme: 'BioSense',
    backgroundColor: '#F7F5F0',
  },
  android: {
    backgroundColor: '#F7F5F0',
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#F7F5F0',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#F7F5F0',
    },
  },
}

export default config
