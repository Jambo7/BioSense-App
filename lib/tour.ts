import type { ComponentType } from 'react'
import {
  Sun,
  Lightbulb,
  FlaskConical,
  TrendingUp,
  Watch,
  Bell,
  User as UserIcon,
  Heart,
} from 'lucide-react'
import { BiosenseS } from '@/components/brand-mark'
import type { IconBadgeTone } from '@/components/ui/icon-badge'

/**
 * Interactive walkthrough step.
 *
 * `target` is a `data-tour="…"` key placed on a real control in the app
 * (see `components/app-nav.tsx`). When omitted, the step renders as a
 * centred card (used for the intro + finale) rather than a spotlight.
 *
 * `placement` is a hint only. The overlay flips it automatically when the
 * target sits too close to a screen edge.
 */
export type TourStep = {
  id: string
  target?: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  tone?: IconBadgeTone
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
    tone: 'sage',
    title: 'Welcome to BioSense',
    body:
      'BioSense gets more useful as it learns from your data over time. This quick tour will show you where your scores, intelligence, AI, biomarkers and connected data live. Tap Next to move along.',
  },
  {
    id: 'home',
    target: 'home',
    icon: Sun,
    tone: 'amber',
    title: 'Home',
    body:
      "Your most important summarised health intelligence lives here. Your long-term Health Score, Latest Intelligence, today's readiness and your daily snapshot.",
    placement: 'top',
  },
  {
    id: 'insights',
    target: 'insights',
    icon: Lightbulb,
    tone: 'teal',
    title: 'Insights',
    body:
      "This is where BioSense turns your data into intelligence. From what's changed recently, to patterns, predictions and discoveries learned across months and years.",
    placement: 'top',
  },
  {
    id: 'ai',
    target: 'ai',
    icon: BiosenseS,
    tone: 'violet',
    title: 'BioSense AI',
    body:
      'Dive into Learning Mode, an intuitive feature that will ask you questions to help understand your lifestyle and habits. When there are gaps in knowledge, BioSense will ask you the questions.',
    hint: 'Give it a tap to open it.',
    placement: 'top',
  },
  {
    id: 'biomarkers',
    target: 'biomarkers',
    icon: FlaskConical,
    tone: 'amber',
    title: 'Biomarkers',
    body:
      'Upload blood test results from almost any provider. BioSense organises your biomarkers, explains what they mean and tracks how they change over time.',
    placement: 'top',
  },
  {
    id: 'trends',
    target: 'trends',
    icon: TrendingUp,
    tone: 'rose',
    title: 'Trends',
    body:
      'Follow how your health changes over time. Track goals, review reports and see your longer-term progress.',
    placement: 'top',
  },
  {
    id: 'wearables',
    target: 'wearables',
    icon: Watch,
    tone: 'sage',
    title: 'Connections',
    body:
      'Connect your wearable and BioSense will continuously analyse its history and incoming data, using it across your scores, readiness, patterns and predictions.',
    placement: 'bottom',
  },
  {
    id: 'notifications',
    target: 'notifications',
    icon: Bell,
    tone: 'sky',
    title: 'Notifications',
    body:
      'Important changes, discoveries and prompts from BioSense appear here. Tap one to go straight to the intelligence behind it.',
    placement: 'bottom',
  },
  {
    id: 'profile',
    target: 'profile',
    icon: UserIcon,
    tone: 'ink',
    title: 'Your account',
    body: 'Manage your profile, privacy and settings here.',
    placement: 'bottom',
  },
  {
    id: 'finish',
    icon: Heart,
    tone: 'sage',
    title: 'Your journey starts here',
    body:
      'Every health journey is unique. Connect your wearables, set your goals and keep exploring. The more BioSense learns over time, the more useful your health intelligence becomes.',
  },
]

export const TOUR_TOTAL = TOUR_STEPS.length
