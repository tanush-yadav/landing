# Premium Design System - Volition AI

## Design Philosophy
Inspired by Linear's minimalism and Scribblitt's sophisticated depth, this design system emphasizes:
- **Ultra-clean interfaces** with purposeful negative space
- **Glass morphism** for depth and hierarchy
- **Smooth micro-interactions** that feel instantaneous
- **Monochromatic elegance** with strategic color accents

## Typography Scale

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|--------|
| Display | 72px | 700 | 1.1 | Hero headlines |
| H1 | 56px | 600 | 1.2 | Page titles |
| H2 | 40px | 600 | 1.3 | Section headers |
| H3 | 32px | 600 | 1.4 | Subsections |
| H4 | 24px | 500 | 1.4 | Card titles |
| Body Large | 20px | 400 | 1.6 | Introductions |
| Body | 16px | 400 | 1.6 | Default text |
| Caption | 14px | 500 | 1.5 | Meta information |
| Small | 12px | 500 | 1.5 | Labels, hints |

## Color System

### Base Palette
```css
/* Premium Light Backgrounds (Primary Mode) */
--bg-primary: #F5F5F7; /* Apple-style soft gray */
--bg-secondary: #FFFFFF;
--bg-elevated: #FFFFFF;
--bg-surface: #FAFAFA;
--bg-gradient: linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%);

/* Dark Mode Backgrounds (Keep for dark sections) */
--black-pure: #000000;
--black-deep: #0A0A0B;
--black-elevated: #111113;
--black-surface: #1A1A1D;

/* Glass Surfaces */
--glass-subtle: rgba(255, 255, 255, 0.03);
--glass-light: rgba(255, 255, 255, 0.05);
--glass-medium: rgba(255, 255, 255, 0.08);
--glass-strong: rgba(255, 255, 255, 0.12);

/* Text - Light Mode */
--text-primary: #1D1D1F;
--text-secondary: #666668;
--text-tertiary: #86868B;
--text-muted: #A1A1A6;

/* Text - Dark Mode */
--text-primary-dark: rgba(255, 255, 255, 0.95);
--text-secondary-dark: rgba(255, 255, 255, 0.6);
--text-tertiary-dark: rgba(255, 255, 255, 0.4);
--text-disabled-dark: rgba(255, 255, 255, 0.25);

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.12);
```

### Accent Colors
```css
/* Purple - Primary Brand */
--purple-400: #A78BFA;
--purple-500: #8B5CF6;
--purple-600: #7C3AED;

/* Green - Success/Active */
--green-400: #34D399;
--green-500: #10B981;
--green-600: #059669;

/* Blue - Information */
--blue-400: #60A5FA;
--blue-500: #3B82F6;
--blue-600: #2563EB;

/* Red - Error/Warning */
--red-400: #F87171;
--red-500: #EF4444;
--red-600: #DC2626;
```

### Gradients
```css
/* Premium Gradients */
--gradient-purple: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
--gradient-green: linear-gradient(135deg, #10B981 0%, #34D399 100%);
--gradient-blue: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
--gradient-mesh: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ffa0ff 75%, #667eea 100%);
```

## Glass Morphism Components

### Base Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

### Glass Variations
```css
/* Subtle Glass */
.glass-subtle {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Strong Glass */
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Frosted Glass */
.glass-frosted {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Animation System

### Timing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Standard Animations
```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Shimmer Effect */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
```

### Hover States
```css
/* Button Hover */
.button-hover {
  transition: all 200ms var(--ease-smooth);
}
.button-hover:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

/* Card Hover */
.card-hover {
  transition: all 300ms var(--ease-smooth);
}
.card-hover:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}
```

## Spacing System

### Base Unit: 4px
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

## Component Patterns

### Premium Button
```css
/* Primary Black Pill Button */
.btn-black-pill {
  background: #000000;
  color: #FFFFFF;
  padding: 14px 28px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
}

.btn-black-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Secondary Green Pill (CTA) */
.btn-green-pill {
  background: #00C851;
  color: #FFFFFF;
  padding: 14px 28px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(0, 200, 81, 0.25);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
}

.btn-green-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 200, 81, 0.35);
  background: #00B548;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.2);
}
```

### Premium Cards
```css
/* Elevated White Card */
.card-elevated {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-elevated:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Glass Card (for dark backgrounds) */
.card-glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-glass:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

/* Gradient Border Card */
.card-gradient-border {
  position: relative;
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px;
}

.card-gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask-composite: exclude;
}
```

## Device Mockups

### Floating Phone Presentation
```css
.device-mockup {
  position: relative;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.12));
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.device-angled-left {
  transform: perspective(1200px) rotateY(15deg) rotateX(2deg);
}

.device-angled-right {
  transform: perspective(1200px) rotateY(-15deg) rotateX(2deg);
}

.device-overlap {
  position: relative;
  z-index: 2;
  margin-left: -80px;
}

.device-mockup:hover {
  transform: perspective(1200px) rotateY(0deg) scale(1.05);
  filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.15));
}
```

### Social Proof Components
```css
/* Avatar Stack */
.avatar-stack {
  display: flex;
  align-items: center;
}

.avatar-stack .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: -8px;
}

.avatar-stack .avatar:first-child {
  margin-left: 0;
}

.avatar-count {
  margin-left: 12px;
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Trust Badge */
.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}
```

## Layout Patterns

### Container Widths
```css
--container-xs: 512px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Premium Hero Section
```css
.hero-premium {
  min-height: 100vh;
  background: var(--bg-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.hero-card {
  background: white;
  border-radius: 32px;
  padding: 80px;
  max-width: 1200px;
  box-shadow: var(--shadow-lg);
}

.hero-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.hero-devices {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Grid System
```css
/* 12-column grid */
.grid-premium {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .grid-premium {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-premium {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
```

## Premium Section Layouts

### Alternating Light Sections
```css
.section-light {
  min-height: 100vh;
  background: #FFFFFF;
  padding: 120px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-light-gray {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 120px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Minimal Content Sections */
.section-minimal {
  min-height: 80vh;
  padding: 10vh 5vw;
  display: grid;
  place-content: center;
  text-align: center;
}

.section-minimal .headline {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.section-minimal .subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}
```

## Motion Principles

1. **Purposeful**: Every animation serves a function
2. **Swift**: 200-300ms for most transitions
3. **Smooth**: Use easing functions, avoid linear
4. **Subtle**: Small transforms (2-4px) feel premium
5. **Consistent**: Same timing across similar elements
6. **Elevated**: Lift elements on hover for depth
7. **Refined**: Use drop shadows instead of borders

## Implementation Checklist

### Phase 1: Foundation
- [ ] Update color variables in Tailwind config
- [ ] Install and configure Inter font
- [ ] Set up glass morphism utility classes
- [ ] Create animation keyframes

### Phase 2: Components
- [ ] Redesign navigation with glass morphism
- [ ] Update hero with premium gradients
- [ ] Create floating card components
- [ ] Implement smooth hover states

### Phase 3: Interactions
- [ ] Add stagger animations on scroll
- [ ] Implement smooth page transitions
- [ ] Create loading states with shimmer
- [ ] Add micro-interactions to buttons

### Phase 4: Polish
- [ ] Fine-tune spacing consistency
- [ ] Optimize blur performance
- [ ] Add subtle grain texture overlay
- [ ] Implement dark/light theme toggle

## Performance Considerations

1. **Backdrop Filter**: Use sparingly, can impact performance
2. **Animations**: Use `transform` and `opacity` for 60fps
3. **Gradients**: Pre-calculate and use CSS variables
4. **Blur Radius**: Keep under 20px for smooth performance
5. **Will-change**: Apply to animated elements strategically

## Accessibility Standards

- Maintain WCAG AAA contrast ratios (7:1 for normal text)
- Ensure all interactions work with keyboard
- Provide focus states for all interactive elements
- Include prefers-reduced-motion media queries
- Use semantic HTML and ARIA labels appropriately