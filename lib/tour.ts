import type { LucideIcon } from 'lucide-react'
import {
  Sun,
  Lightbulb,
  Sparkles,
  FlaskConical,
  TrendingUp,
  Watch,
  Bell,
  User as UserIcon,
  Heart,
} from 'lucide-react'

/**
 * Interactive walkthrough step.
 *
 * `target` is a `data-tour="…"` key placed on a real control in the app
 * (see `components/app-nav.tsx`). When omitted, the step renders as a
 * centred card (used for the intro + finale) rather than a spotlight.
 *
 * `placement` is a hint only — the overlay flips it automatically when the
 * target sits too close to a screen edge.
 */
export type TourStep = {
  id: string
  target?: string
  icon: LucideIcon
  title: string
  body: string
  /** Optional nudge shown under the body, e.g. "Tap it to try". */
  hint?: string
  placement?: 'top' | 'bottom'
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    icon: Heart,
    title: 'Welcome to BioSense',
    body:
      "Let's take a quick walk around the app. I'll highlight each part and explain what it does — tap Next to move along, or tap a highlighted button to try it yourself.",
  },
  {
    id: 'home',
    target: 'home',
    icon: Sun,
    title: 'Home',
    body:
      'Your daily snapshot lives here — health score, readiness and your daily check-in, all in one place.',
    placement: 'top',
  },
  {
    id: 'insights',
    target: 'insights',
    icon: Lightbulb,
    title: 'Insights',
    body:
      "The 'why' behind your score. Insights breaks down what's driving how you feel today.",
    placement: 'top',
  },
  {
    id: 'ai',
    target: 'ai',
    icon: Sparkles,
    title: 'BioSense AI',
    body:
      'Tap here anytime to chat or start Learning Mode — a guided conversation where BioSense gets to know your lifestyle, habits and goals.',
    hint: 'Give it a tap to open it.',
    placement: 'top',
  },
  {
    id: 'biomarkers',
    target: 'biomarkers',
    icon: FlaskConical,
    title: 'Biomarkers',
    body:
      'Upload blood test results from any provider, then explore the Biomarker Guide to understand what each marker means for you.',
    placement: 'top',
  },
  {
    id: 'trends',
    target: 'trends',
    icon: TrendingUp,
    title: 'Trends',
    body:
      'Set your goals, read your weekly & monthly reports, and share your BioSense Discovery — your progress over time, all here.',
    placement: 'top',
  },
  {
    id: 'wearables',
    target: 'wearables',
    icon: Watch,
    title: 'Wearables',
    body:
      'Connect Oura, Whoop, Garmin, Apple Health and more to sync your health data into BioSense automatically.',
    placement: 'bottom',
  },
  {
    id: 'notifications',
    target: 'notifications',
    icon: Bell,
    title: 'Notifications',
    body:
      'Nudges and alerts from BioSense land here. Tap one to jump straight to whatever it relates to.',
    placement: 'bottom',
  },
  {
    id: 'profile',
    target: 'profile',
    icon: UserIcon,
    title: 'Your account',
    body:
      'Manage your profile, privacy and settings here — and you can replay this walkthrough anytime.',
    placement: 'bottom',
  },
  {
    id: 'finish',
    icon: Heart,
    title: 'Your journey starts here',
    body:
      'Every health journey is unique. Connect your devices, set your goals and keep exploring — your next discovery could be the one that changes everything.',
  },
]

export const TOUR_TOTAL = TOUR_STEPS.length
