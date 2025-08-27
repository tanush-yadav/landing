/**
 * Standardized Component Patterns
 * This file defines reusable patterns and composition rules
 */

import { type CSSProperties } from 'react';

// Component Size Variants
export const sizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;

export type Size = keyof typeof sizes;

// Component Variant Types
export const variants = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  ghost: 'ghost',
  outline: 'outline',
  danger: 'danger',
  success: 'success',
  warning: 'warning',
} as const;

export type Variant = keyof typeof variants;

// Component States
export const states = {
  default: 'default',
  hover: 'hover',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
  loading: 'loading',
  error: 'error',
  success: 'success',
} as const;

export type State = keyof typeof states;

// Common Animation Patterns
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 1, ease: 'linear', repeat: Infinity },
  },
} as const;

// Glass Morphism Pattern
export const glassMorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  } as CSSProperties,
  dark: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  } as CSSProperties,
} as const;

// Gradient Patterns
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #13E2DA 0%, #1FA2FF 100%)',
  warning: 'linear-gradient(135deg, #FCB045 0%, #FD7E14 100%)',
  danger: 'linear-gradient(135deg, #FF512F 0%, #F09819 100%)',
  dark: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  mesh: 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)',
} as const;

// Common Layout Patterns
export const layouts = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  grid: {
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    col: 'flex flex-col',
    wrap: 'flex flex-wrap',
  },
} as const;

// Typography Patterns
export const typography = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl lg:text-4xl font-semibold',
  h4: 'text-xl sm:text-2xl lg:text-3xl font-semibold',
  h5: 'text-lg sm:text-xl lg:text-2xl font-medium',
  h6: 'text-base sm:text-lg lg:text-xl font-medium',
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',
  caption: 'text-xs uppercase tracking-wider',
} as const;

// Button Styles Pattern
export const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  sizes: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
    xl: 'px-6 py-3.5 text-xl',
  },
  variants: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-400',
    outline: 'border-2 border-neutral-300 hover:border-neutral-400 focus:ring-neutral-400',
    ghost: 'hover:bg-neutral-100 focus:ring-neutral-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
} as const;

// Card Styles Pattern
export const cardStyles = {
  base: 'rounded-lg border bg-white shadow-sm',
  variants: {
    default: 'border-neutral-200',
    elevated: 'border-transparent shadow-lg',
    ghost: 'border-transparent shadow-none',
    glass: 'border-white/20 bg-white/80 backdrop-blur-md',
  },
  padding: {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
} as const;

// Input Styles Pattern
export const inputStyles = {
  base: 'w-full rounded-lg border bg-white px-4 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  sizes: {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3',
  },
  variants: {
    default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
  },
} as const;

// Accessibility Patterns
export const a11y = {
  srOnly: 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  skipToContent: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50',
} as const;

// Responsive Patterns
export const responsive = {
  hideOnMobile: 'hidden sm:block',
  hideOnDesktop: 'block sm:hidden',
  mobileOnly: 'block sm:hidden',
  tabletUp: 'hidden sm:block',
  desktopUp: 'hidden lg:block',
} as const;

// Export utility function to combine class names
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};