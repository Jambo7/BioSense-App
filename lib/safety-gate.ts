/**
 * Deterministic launch safety layer (Neil §7).
 * Prompting is not the boundary — these rules run before the model and
 * again on the model output. Templates are fixed; the model cannot invent
 * a safety category.
 */

export type SafetyCode =
  | 'EMERGENCY'
  | 'DIAGNOSIS'
  | 'TREATMENT'
  | 'MEDICATION'
  | 'TRIAGE'
  | 'SELF_HARM'
  | 'MINOR'
  | 'OUTPUT_PROHIBITED'

const TEMPLATES: Record<SafetyCode, string> = {
  EMERGENCY:
    'If this is a medical emergency, contact local emergency services or go to the nearest emergency department. BioSense cannot assess emergencies or tell you whether you need urgent care.',
  DIAGNOSIS:
    'BioSense cannot diagnose conditions. We can talk about what your data shows in educational terms. For a diagnosis, speak with a qualified clinician.',
  TREATMENT:
    'BioSense cannot prescribe treatment or tell you to start, stop or change care. A qualified clinician should advise on treatment.',
  MEDICATION:
    'BioSense cannot advise on medication, dose or supplements as treatment. Ask a pharmacist or clinician before changing anything you take.',
  TRIAGE:
    'BioSense cannot decide how urgent your symptoms are. If you are unwell, contact a qualified clinician or local urgent care.',
  SELF_HARM:
    'If you are in immediate danger, contact local emergency services. If you are thinking about harming yourself, please reach out to local crisis support or someone you trust. BioSense is not a crisis service.',
  MINOR:
    'BioSense is for adults. We cannot provide health guidance for anyone under 18.',
  OUTPUT_PROHIBITED:
    'I can share general educational context, but I can’t diagnose conditions or tell you what treatment to take. Ask about your check-ins, wearables or blood markers in educational terms, or speak with a clinician.',
}

const INPUT_RULES: { code: SafetyCode; re: RegExp }[] = [
  {
    code: 'SELF_HARM',
    re: /\b(suicid(e|al)|kill myself|end my life|self[- ]harm|want to die|hurt myself)\b/i,
  },
  {
    code: 'EMERGENCY',
    re: /\b(chest pain|can'?t breathe|cannot breathe|difficulty breathing|stroke|anaphyla|severe bleeding|unconscious|overdose|heart attack)\b/i,
  },
  {
    code: 'MINOR',
    re: /\b(my (kid|child|son|daughter|baby|toddler|infant)|for a (child|minor|teen(ager)?))\b.{0,40}\b(symptom|diagnos|medicin|fever|sick)\b/i,
  },
  {
    code: 'DIAGNOSIS',
    re: /\b(do i have|what disease|diagnose me|is this cancer|am i (diabetic|anaemic|anemic)|what'?s wrong with me)\b/i,
  },
  {
    code: 'MEDICATION',
    re: /\b(what (dose|medication|drug|tablet)|should i (take|stop|start|increase|decrease)|prescribe|titrate)\b.{0,50}\b(mg|medication|drug|statin|metformin|insulin|antibiotic|supplement)\b/i,
  },
  {
    code: 'TREATMENT',
    re: /\b(how (do|should) i treat|cure (my|this)|treatment plan|should i see (a )?(doctor|a&e|er))\b/i,
  },
  {
    code: 'TRIAGE',
    re: /\b(is this (urgent|an emergency|serious)|should i go to (a&e|er|hospital|urgent))\b/i,
  },
]

const OUTPUT_RULES: RegExp[] = [
  /\byou have\b.{0,40}\b(diabetes|cancer|anemia|anaemia|infection|disease|disorder|syndrome)\b/i,
  /\b(diagnos(e|is|ed)|you are suffering from)\b/i,
  /\bi (recommend|suggest|prescribe)\b/i,
  /\byou (must|should|need to) (take|start|stop|increase|decrease)\b.{0,40}\b(medication|drug|dose|supplement)\b/i,
  /\bthis (is|means) (dangerous|life[- ]threatening|an emergency)\b/i,
  /\bseek (immediate|emergency) (care|attention|help)\b/i,
]

const DISCLAIMER =
  'This information is for educational purposes only and is not medical advice. Consult a qualified healthcare professional before making any changes.'

export function safetyTemplate(code: SafetyCode): string {
  return TEMPLATES[code]
}

export function classifyUserMessage(text: string): SafetyCode | null {
  const t = text.trim()
  if (!t) return null
  for (const rule of INPUT_RULES) {
    if (rule.re.test(t)) return rule.code
  }
  return null
}

export function outputViolatesSafety(text: string): boolean {
  return OUTPUT_RULES.some((re) => re.test(text))
}

export function enforceOutputSafety(text: string): string {
  let out = text.trim()
  if (!out || outputViolatesSafety(out)) {
    return `${TEMPLATES.OUTPUT_PROHIBITED}\n\n${DISCLAIMER}`
  }
  if (!/educational purposes only/i.test(out)) {
    out = `${out}\n\n${DISCLAIMER}`
  }
  return out
}

export function degradedSafetyReply(): string {
  return `BioSense AI is temporarily unavailable. Your data is still saved — try again in a moment.\n\n${DISCLAIMER}`
}
