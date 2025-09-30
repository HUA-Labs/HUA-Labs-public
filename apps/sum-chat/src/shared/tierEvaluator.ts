import type { SessionMessage } from '@/types/session'

export function evaluateTier(messages: SessionMessage[], slipCount: number): string {
  if (slipCount >= 3) return 'D'
  if (slipCount >= 2) return 'C'
  if (slipCount >= 1) return 'B'
  if (messages.length >= 10) return 'A'
  return 'S'
} 