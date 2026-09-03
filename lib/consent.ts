export const CONSENT = {
  tcVersion: '1.0',
  privacyVersion: '1.0',
  consentVersion: '1.0',
} as const

export type ConsentPurpose = 'SERVICE' | 'MARKETING'
export type ConsentStatus = 'GRANTED' | 'WITHDRAWN'
