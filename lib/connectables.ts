/**
 * Launch connectables for BioSense. The Connections screen shows only these
 * 20, grouped the way Neil specified, rather than Terra's full directory.
 *
 * `terraSlug` is what we pass to generateWidgetSession. Amazfit maps to ZEPP.
 * Dexcom is not a Terra login: it arrives through Apple Health.
 */

export type ConnectKind = 'healthkit' | 'oauth'

export interface Connectable {
  id: string
  name: string
  desc: string
  image?: string
  kind: ConnectKind
  terraSlug?: string
  role: string
  /** HealthKit-backed rows that are not Apple Health itself (e.g. Dexcom via Health). */
  viaApple?: boolean
  connectLabel?: string
}

/**
 * Terra still needs brand credentials for these before Connect will complete.
 * Sources are enabled in the dashboard; "Add Credentials" is outstanding.
 * Dexcom is intentionally not on this list: we read it from Apple Health.
 */
export const TERRA_CREDENTIALS_STILL_NEEDED = [
  'WHOOP',
  'HUAWEI',
  'SAMSUNG',
  'STRAVA',
] as const

export interface ConnectableGroup {
  id: string
  label: string
  items: Connectable[]
}

export const CONNECTABLES: Connectable[] = [
  // Most popular
  {
    id: 'apple',
    name: 'Apple Health',
    desc: 'Apple Watch, iPhone, and Dexcom if it is shared with Health',
    image: '/wearables/apple.png',
    kind: 'healthkit',
    role: 'Sleep and activity source',
  },
  {
    id: 'garmin',
    name: 'Garmin',
    desc: 'Sleep, HRV, resting HR, activity, VO₂ max',
    image: '/wearables/garmin.png',
    kind: 'oauth',
    terraSlug: 'GARMIN',
    role: 'Activity source',
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    desc: 'Recovery, strain, sleep, HRV',
    image: '/wearables/whoop.png',
    kind: 'oauth',
    terraSlug: 'WHOOP',
    role: 'Recovery source',
  },
  {
    id: 'oura',
    name: 'Oura',
    desc: 'Sleep, readiness, HRV, temperature',
    image: '/wearables/oura.png',
    kind: 'oauth',
    terraSlug: 'OURA',
    role: 'Sleep source',
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    desc: 'Sleep, heart rate, steps, activity',
    image: '/wearables/fitbit.png',
    kind: 'oauth',
    terraSlug: 'FITBIT',
    role: 'Activity source',
  },
  {
    id: 'samsung',
    name: 'Samsung Health',
    desc: 'Steps, heart rate, sleep (Android)',
    image: '/wearables/samsung.png',
    kind: 'oauth',
    terraSlug: 'SAMSUNG',
    role: 'Activity source',
  },
  // More wearables
  {
    id: 'huawei',
    name: 'Huawei',
    desc: 'Sleep, heart rate, activity',
    image: '/wearables/huawei.png',
    kind: 'oauth',
    terraSlug: 'HUAWEI',
    role: 'Activity source',
  },
  {
    id: 'amazfit',
    name: 'Amazfit',
    desc: 'Smartwatch and band data via Zepp',
    image: '/wearables/amazfit.png',
    kind: 'oauth',
    terraSlug: 'ZEPP',
    role: 'Activity source',
  },
  {
    id: 'ultrahuman',
    name: 'Ultrahuman',
    desc: 'Ring, recovery and metabolic data',
    image: '/wearables/ultrahuman.png',
    kind: 'oauth',
    terraSlug: 'ULTRAHUMAN',
    role: 'Recovery source',
  },
  {
    id: 'polar',
    name: 'Polar',
    desc: 'Training, heart rate and recovery',
    image: '/wearables/polar.png',
    kind: 'oauth',
    terraSlug: 'POLAR',
    role: 'Activity source',
  },
  {
    id: 'suunto',
    name: 'Suunto',
    desc: 'Exercise and recovery from Suunto watches',
    image: '/wearables/suunto.png',
    kind: 'oauth',
    terraSlug: 'SUUNTO',
    role: 'Activity source',
  },
  {
    id: 'coros',
    name: 'COROS',
    desc: 'Running and endurance training data',
    image: '/wearables/coros.png',
    kind: 'oauth',
    terraSlug: 'COROS',
    role: 'Activity source',
  },
  {
    id: 'withings',
    name: 'Withings',
    desc: 'Weight, body composition, blood pressure, sleep',
    image: '/wearables/withings.png',
    kind: 'oauth',
    terraSlug: 'WITHINGS',
    role: 'Body composition source',
  },
  // Nutrition & metabolic
  {
    id: 'dexcom',
    name: 'Continuous Glucose',
    desc: 'Dexcom via Apple Health. No separate Dexcom login.',
    image: '/wearables/dexcom.png',
    kind: 'healthkit',
    viaApple: true,
    connectLabel: 'Connect via Apple Health',
    role: 'Glucose source',
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    desc: 'Meals, calories and macros',
    image: '/wearables/myfitnesspal.png',
    kind: 'oauth',
    terraSlug: 'MYFITNESSPAL',
    role: 'Nutrition source',
  },
  {
    id: 'cronometer',
    name: 'Cronometer',
    desc: 'Detailed macro and micronutrient logging',
    image: '/wearables/cronometer.png',
    kind: 'oauth',
    terraSlug: 'CRONOMETER',
    role: 'Nutrition source',
  },
  // Fitness & lifestyle
  {
    id: 'strava',
    name: 'Strava',
    desc: 'Running, cycling, workouts and activities',
    image: '/wearables/strava.png',
    kind: 'oauth',
    terraSlug: 'STRAVA',
    role: 'Activity source',
  },
  {
    id: 'peloton',
    name: 'Peloton',
    desc: 'Structured indoor workouts',
    image: '/wearables/peloton.png',
    kind: 'oauth',
    terraSlug: 'PELOTON',
    role: 'Activity source',
  },
  {
    id: 'wahoo',
    name: 'Wahoo',
    desc: 'Cycling and indoor trainer sessions',
    image: '/wearables/wahoo.png',
    kind: 'oauth',
    terraSlug: 'WAHOO',
    role: 'Activity source',
  },
  {
    id: 'flo',
    name: 'Flo',
    desc: "Cycle tracking and women's health context",
    image: '/wearables/flo.png',
    kind: 'oauth',
    terraSlug: 'FLO',
    role: 'Cycle source',
  },
]

export const CONNECT_GROUPS: ConnectableGroup[] = [
  {
    id: 'popular',
    label: 'Most popular',
    items: CONNECTABLES.filter((c) =>
      ['apple', 'garmin', 'whoop', 'oura', 'fitbit', 'samsung'].includes(c.id),
    ),
  },
  {
    id: 'wearables',
    label: 'More wearables',
    items: CONNECTABLES.filter((c) =>
      ['huawei', 'amazfit', 'ultrahuman', 'polar', 'suunto', 'coros', 'withings'].includes(c.id),
    ),
  },
  {
    id: 'metabolic',
    label: 'Nutrition & metabolic',
    items: CONNECTABLES.filter((c) =>
      ['dexcom', 'myfitnesspal', 'cronometer'].includes(c.id),
    ),
  },
  {
    id: 'lifestyle',
    label: 'Fitness & lifestyle',
    items: CONNECTABLES.filter((c) =>
      ['strava', 'peloton', 'wahoo', 'flo'].includes(c.id),
    ),
  },
]

export const TERRA_PROVIDER_SLUGS: Record<string, string> = Object.fromEntries(
  CONNECTABLES.filter((c) => c.terraSlug).map((c) => [c.id, c.terraSlug as string]),
)

/** Map a Terra webhook provider enum onto our Connections id. */
export function canonicalProvider(terraProvider: string): string {
  const raw = terraProvider.trim().toLowerCase()
  if (raw === 'zepp' || raw === 'amazfit') return 'amazfit'
  if (raw.startsWith('dexcom')) return 'dexcom'
  if (raw === 'google_health' || raw === 'google') return 'google'
  return raw
}

export function isGlucoseProvider(provider: string): boolean {
  const id = canonicalProvider(provider)
  return id === 'dexcom' || id === 'apple'
}

/** Dexcom is not a Terra login. Glucose arrives when Apple Health is connected. */
export function connectionIdFor(id: string): string {
  if (id === 'dexcom') return 'apple'
  return id
}
