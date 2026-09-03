/**
 * TSB-001 — Technical Security Baseline.
 * Approved by Neil 3 Sep 2026. Idle timeout is post-launch; do not implement in v1.
 */
export const TSB = {
  id: 'TSB-001',
  status: 'APPROVED' as const,
  approvedAt: '2026-09-03',

  sessionAbsoluteDays: 30,
  mobileTokenDays: 30,
  /** Explicitly out of v1. Do not wire. */
  sessionIdleDays: null,

  passwordMinLength: 8,
  passwordRequireUppercase: true,
  passwordRequireNumber: true,

  loginFailuresBeforeFriction: 8,
  loginFailureWindowMinutes: 15,
  loginLockoutMinutes: 15,

  signupPerEmailPerHour: 5,
  signupPerIpPerHour: 10,

  passwordResetPerEmailPerHour: 5,
  passwordResetTokenMinutes: 60,
  passwordResetVerifyAttempts: 5,

  chatPerUserPerMinute: 20,
  exportPerUserPerHour: 5,
  deletePerUserPerHour: 3,
} as const

export function sessionMaxAgeSeconds(): number {
  return TSB.sessionAbsoluteDays * 24 * 60 * 60
}

export function passwordResetTtlMs(): number {
  return TSB.passwordResetTokenMinutes * 60 * 1000
}
