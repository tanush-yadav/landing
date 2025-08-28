import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Global delegation click tracking utilities
const DELEGATION_CLICK_KEY = 'delegationClickCount'
export const CAL_COM_URL = 'https://cal.com/tanushyadav/quick-chat'

export function getDelegationClickCount(): number {
  if (typeof window === 'undefined') return 0
  const value = window.localStorage.getItem(DELEGATION_CLICK_KEY)
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function incrementDelegationClickCount(): number {
  if (typeof window === 'undefined') return 0
  const current = getDelegationClickCount()
  const next = current + 1
  window.localStorage.setItem(DELEGATION_CLICK_KEY, String(next))
  return next
}

export function resetDelegationClickCount(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DELEGATION_CLICK_KEY)
}

// Returns true if redirected (caller should early-return)
export function redirectToCalIfThresholdMet(newCount: number): boolean {
  if (typeof window === 'undefined') return false
  if (newCount === 2) {
    window.location.href = CAL_COM_URL
    return true
  }
  return false
}