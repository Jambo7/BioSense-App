/**
 * Aspect 1 engineering dials — sensible defaults we can tune without
 * medical/clinical input (Aspect 2). Single source of truth for the MVP
 * maturity / unlock / pattern / freshness layer.
 *
 * These are NOT the full ENG-001 DHM parameters; they power the prototype
 * loops we actually ship today (patterns, bio-age unlock, score freshness).
 */

export const MATURITY = {
  /** Min distinct check-in days before lag-pattern analysis runs. */
  PATTERN_MIN_CHECKINS: 7,
  /** Absolute Pearson |r| floor to keep a pattern. */
  PATTERN_MIN_ABS_R: 0.45,
  /** |r| ≥ this → HIGH confidence. */
  PATTERN_HIGH_R: 0.7,
  /** |r| ≥ this (and below HIGH) → MEDIUM; else LOW. */
  PATTERN_MED_R: 0.45,
  /** Max patterns persisted per user after each refresh. */
  PATTERN_MAX_STORED: 10,

  /**
   * Half-life (days) for wearable contribution to the health score.
   * At this age, wearable influence is halved toward the no-data baseline.
   */
  DATA_HALF_LIFE_DAYS: 14,

  /** Calendar days of tracking before biological age is computed/shown. */
  BIO_AGE_UNLOCK_DAYS: 14,
  /**
   * Min non-null signals among HRV / RHR / sleepAvg / energyAvg / vo2max
   * required before we persist a biological age.
   */
  BIO_AGE_MIN_SIGNALS: 2,

  /** Pillar baseline used when a signal is missing (matches lib/score.ts). */
  SCORE_DEFAULT_PILLAR: 50,
} as const

export type MaturityConfig = typeof MATURITY
