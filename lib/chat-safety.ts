import { enforceOutputSafety, degradedSafetyReply } from '@/lib/safety-gate'

export function sanitizeChatReply(reply: string): string {
  return enforceOutputSafety(reply)
}

export function degradedChatReply(_reason?: 'error' | 'empty'): string {
  return degradedSafetyReply()
}
