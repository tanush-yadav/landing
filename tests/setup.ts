import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.scrollY for scroll-based tests
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

// Mock addEventListener/removeEventListener
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: vi.fn(),
})

// Mock IntersectionObserver for framer-motion
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})