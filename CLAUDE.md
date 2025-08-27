# Volition Labs Landing Page - Engineering Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Stack](#architecture--stack)
3. [Design System](#design-system)
4. [Component Patterns](#component-patterns)
5. [File Structure](#file-structure)
6. [Development Guidelines](#development-guidelines)
7. [Code Standards](#code-standards)
8. [Testing Strategy](#testing-strategy)
9. [Performance Optimization](#performance-optimization)
10. [Deployment](#deployment)

---

## 🎯 Project Overview

This is the official landing page for Volition Labs Inc, showcasing our AI automation platform that integrates with Linear and Slack for seamless workflow automation.

### Key Features

- **Interactive Demo**: Live demonstration of AI agents automating Linear tickets
- **Real-time Animations**: Framer Motion-powered smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation
- **Performance Optimized**: Next.js 15.5 with App Router

---

## 🏗 Architecture & Stack

### Core Technologies

```typescript
{
  "framework": "Next.js 15.5.0",
  "language": "TypeScript 5.9.2",
  "styling": "Tailwind CSS 3.4.17",
  "animations": "Framer Motion 12.23.12",
  "icons": "Lucide React",
  "fonts": ["Outfit", "Fraunces", "Plus Jakarta Sans"]
}
```

### Project Structure Philosophy

```
landing/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI primitives
│   └── [feature]/         # Feature-specific components
├── lib/                   # Utilities and configurations
│   ├── design-system/     # Theme and patterns
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
└── public/               # Static assets
```

---

## 🎨 Design System

### Theme Configuration

Located in `/lib/design-system/theme.ts`

```typescript
// Color Palette
theme.colors = {
  brand: { primary, secondary, accent },
  neutral: { 50-950 grayscale },
  semantic: { success, warning, error, info },
  background: { primary, secondary, tertiary },
  text: { primary, secondary, tertiary, quaternary },
  border: { default, subtle, strong }
}

// Typography Scale
theme.typography = {
  fontFamily: { sans, display, heading, mono },
  fontSize: { xs through 9xl },
  fontWeight: { thin through black },
  lineHeight: { none, tight, normal, relaxed, loose }
}

// Spacing (8pt Grid System)
theme.spacing = {
  // 0, px, 0.5 through 96
  // All values follow 8pt grid for consistency
}
```

### Component Patterns

Located in `/lib/design-system/patterns.ts`

```typescript
// Standard Variants
variants =
  'primary' |
  'secondary' |
  'tertiary' |
  'ghost' |
  'outline' |
  'danger' |
  'success' |
  'warning'

// Standard Sizes
sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Standard States
states =
  'default' |
  'hover' |
  'active' |
  'focus' |
  'disabled' |
  'loading' |
  'error' |
  'success'
```

---

## 🧩 Component Patterns

### Component Structure Template

Every component follows this structure:

````typescript
/**
 * ComponentName
 *
 * Brief description of component purpose
 *
 * @example
 * ```tsx
 * <ComponentName prop="value">
 *   Content
 * </ComponentName>
 * ```
 */

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/design-system'

export interface ComponentNameProps extends BaseComponentProps {
  // Specific props with JSDoc comments
  variant?: Variant
  size?: Size
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  (
    { children, variant = 'primary', size = 'md', className, ...props },
    ref
  ) => {
    // Component logic

    return (
      <motion.div
        ref={ref}
        className={
          cn()
          // Base styles
          // Variant styles
          // Size styles
          // Custom className
        }
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

ComponentName.displayName = 'ComponentName'
````

### Composition Pattern

Components support composition through subcomponents:

```typescript
// Example: Card component with subcomponents
<Card variant="elevated" padding="md">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content goes here</Card.Content>
  <Card.Footer>Footer content</Card.Footer>
</Card>
```

---

## 📁 File Structure

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `InteractiveDemo.tsx`)
- **Utilities**: camelCase (`utils.ts`, `demoWorkflows.ts`)
- **Types**: PascalCase with `.types.ts` or in `/lib/types/`
- **Hooks**: camelCase with `use` prefix (`useAnimation.ts`)
- **Constants**: SCREAMING_SNAKE_CASE in dedicated files

### Import Organization

Follow this order in all files:

```typescript
// 1. React and core libraries
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 2. Next.js specific
import Image from 'next/image'
import Link from 'next/link'

// 3. UI Components
import { Button, Card, Input } from '@/components/ui'

// 4. Feature Components
import { InteractiveDemo } from '@/components/interactive-demo'

// 5. Utilities and helpers
import { cn } from '@/lib/design-system'
import { demoWorkflows } from '@/lib/demo-workflows'

// 6. Types
import type { DemoState, Agent, Task } from '@/lib/types'

// 7. Styles (if any CSS modules)
import styles from './component.module.css'
```

---

## 💻 Development Guidelines

### 1. Component Development Checklist

- [ ] TypeScript interfaces defined
- [ ] Props documented with JSDoc
- [ ] Follows design system patterns
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] Responsive design implemented
- [ ] Motion preferences respected
- [ ] Error boundaries in place
- [ ] Memoization where needed
- [ ] Example usage in comments

### 2. State Management Rules

```typescript
// ✅ DO: Use local state for UI-only concerns
const [isOpen, setIsOpen] = useState(false)

// ✅ DO: Use useReducer for complex state
const [state, dispatch] = useReducer(demoReducer, initialState)

// ✅ DO: Memoize expensive computations
const computedValue = useMemo(() => expensiveOperation(data), [data])

// ✅ DO: Memoize callbacks passed to children
const handleClick = useCallback(() => {
  // handler logic
}, [dependency])

// ❌ DON'T: Mutate state directly
// ❌ DON'T: Use state for derived values
// ❌ DON'T: Forget dependencies in hooks
```

### 3. Performance Patterns

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // if not needed on server
})

// Virtualize long lists
import { FixedSizeList } from 'react-window'

// Debounce expensive operations
import { debounce } from '@/lib/utils'
const debouncedSearch = debounce(search, 300)
```

### 4. Accessibility Requirements

```typescript
// Every interactive element needs:
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels for screen readers
- Focus indicators (focus-visible)
- Proper heading hierarchy
- Color contrast ratios (4.5:1 minimum)
- Reduced motion alternatives
```

---

## 📏 Code Standards

### TypeScript Best Practices

```typescript
// ✅ DO: Use explicit types
export interface ButtonProps {
  variant: 'primary' | 'secondary'
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// ✅ DO: Use type guards
function isValidTask(task: unknown): task is Task {
  return (
    typeof task === 'object' && task !== null && 'id' in task && 'title' in task
  )
}

// ✅ DO: Use generics for reusable logic
function useState<T>(initial: T): [T, (value: T) => void] {
  // implementation
}

// ❌ DON'T: Use 'any' type
// ❌ DON'T: Ignore TypeScript errors with @ts-ignore
// ❌ DON'T: Use assertions without validation
```

### React Best Practices

```typescript
// ✅ DO: Use functional components
export const Component: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>
}

// ✅ DO: Handle loading and error states
if (isLoading) return <Spinner />
if (error) return <ErrorMessage error={error} />
return <Content data={data} />

// ✅ DO: Clean up side effects
useEffect(() => {
  const timer = setTimeout(callback, 1000)
  return () => clearTimeout(timer) // Cleanup
}, [callback])

// ❌ DON'T: Use index as key in dynamic lists
// ❌ DON'T: Call hooks conditionally
// ❌ DON'T: Modify props directly
```

### CSS/Tailwind Standards

```typescript
// ✅ DO: Use design system classes
className="text-primary-600 bg-neutral-100"

// ✅ DO: Use cn() for conditional classes
className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}

// ✅ DO: Group related utilities
className="
  /* Layout */
  flex items-center justify-between
  /* Spacing */
  px-4 py-2
  /* Typography */
  text-sm font-medium
  /* Colors */
  text-neutral-900 bg-white
  /* Borders */
  border border-neutral-200 rounded-lg
"

// ❌ DON'T: Use arbitrary values excessively
// ❌ DON'T: Mix Tailwind with inline styles
// ❌ DON'T: Create deeply nested selectors
```

---

## 🧪 Testing Strategy

### Unit Testing

```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Testing

```typescript
// Test user flows
describe('Demo Workflow', () => {
  it('completes full automation cycle', async () => {
    // Setup
    // User action
    // Assert state changes
    // Verify UI updates
  })
})
```

### E2E Testing

```typescript
// Playwright for end-to-end testing
test('landing page demo interaction', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="start-demo"]')
  await expect(page.locator('.demo-animation')).toBeVisible()
})
```

---

## ⚡ Performance Optimization

### Build-Time Optimizations

```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

### Runtime Optimizations

1. **Code Splitting**: Automatic with Next.js App Router
2. **Image Optimization**: Using next/image with lazy loading
3. **Font Optimization**: Using next/font for automatic optimization
4. **Bundle Analysis**: Regular monitoring with @next/bundle-analyzer
5. **Caching Strategy**: Leveraging Next.js ISR and client-side caching

### Performance Metrics Targets

```typescript
{
  "LCP": "< 2.5s",    // Largest Contentful Paint
  "FID": "< 100ms",   // First Input Delay
  "CLS": "< 0.1",     // Cumulative Layout Shift
  "FCP": "< 1.8s",    // First Contentful Paint
  "TTI": "< 3.8s"     // Time to Interactive
}
```

---

## 🚀 Deployment

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.volitionlabs.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX
```

### Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build
npm run start

# Type Checking
npm run type-check

# Linting
npm run lint

# Format Code
npm run format
```

### Deployment Checklist

- [ ] All TypeScript errors resolved
- [ ] Linting passes
- [ ] Build successful
- [ ] Lighthouse score > 90
- [ ] No console errors in production
- [ ] Meta tags and SEO configured
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Performance monitoring active

---

## 📚 Quick Reference

### Commonly Used Patterns

```typescript
// Glass morphism effect
className = 'backdrop-blur-md bg-white/80 border border-white/20'

// Gradient text
className =
  'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'

// Smooth scroll
className = 'scroll-smooth'

// Focus ring
className =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

// Truncate text
className = 'truncate' // or "line-clamp-3" for multi-line
```

### Animation Presets

```typescript
import { animations } from '@/lib/design-system';

// Fade in
<motion.div {...animations.fadeIn}>

// Slide up
<motion.div {...animations.slideInUp}>

// Scale
<motion.div {...animations.scale}>
```

### Responsive Helpers

```typescript
// Hide on mobile
className = 'hidden sm:block'

// Stack on mobile, row on desktop
className = 'flex flex-col sm:flex-row'

// Responsive text
className = 'text-sm md:text-base lg:text-lg'

// Responsive spacing
className = 'p-4 md:p-6 lg:p-8'
```

---

## 🤝 Contributing

### Before Starting

1. Read this document completely
2. Check existing components in `/components/ui/`
3. Review the design system in `/lib/design-system/`
4. Follow the established patterns

### Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript types are properly defined
- [ ] Components are accessible
- [ ] Responsive design implemented
- [ ] Documentation updated
- [ ] Tests written/updated
- [ ] Build passes locally

---
