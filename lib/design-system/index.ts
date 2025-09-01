/**
 * Design System Entry Point
 * Export all design system utilities and patterns
 */

export * from './theme'
export * from './patterns'
export { cn } from './patterns'

// Re-export commonly used utilities
export { theme } from './theme'
export {
  animations,
  buttonStyles,
  cardStyles,
  inputStyles,
  typography,
  layouts,
  glassMorphism,
  gradients,
  a11y,
  responsive,
} from './patterns'
