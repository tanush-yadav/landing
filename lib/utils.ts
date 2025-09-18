import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { CALENDAR_LINK } from "./constants"

const DELEGATION_CLICK_KEY = "delegationClickCount"
const DEFAULT_REDIRECT_THRESHOLD = 2

const getDelegationRedirectThreshold = () => {
  const envValue = process.env.NEXT_PUBLIC_DELEGATION_REDIRECT_THRESHOLD
  const parsed = envValue ? Number.parseInt(envValue, 10) : Number.NaN

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_REDIRECT_THRESHOLD
}

const getClientStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const incrementDelegationClickCount = (): number => {
  const storage = getClientStorage()

  if (!storage) {
    return 1
  }

  try {
    const currentValue = storage.getItem(DELEGATION_CLICK_KEY)
    const current = currentValue ? Number.parseInt(currentValue, 10) : 0
    const nextCount = Number.isFinite(current) ? current + 1 : 1

    storage.setItem(DELEGATION_CLICK_KEY, String(nextCount))

    return nextCount
  } catch {
    return 1
  }
}

export const redirectToCalIfThresholdMet = (count: number): boolean => {
  if (count < getDelegationRedirectThreshold()) {
    return false
  }

  if (typeof window === "undefined") {
    return false
  }

  try {
    window.location.href = CALENDAR_LINK
    return true
  } catch {
    return false
  }
}
