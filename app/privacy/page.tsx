import { redirect } from 'next/navigation'

/** One controlling notice. The text lives at bio-sense.ai/privacy. */
export default function PrivacyPolicyPage() {
  redirect('https://bio-sense.ai/privacy')
}
