# Sophia Onboarding Implementation Roadmap

## Phase 1: Foundation (Week 1)

### 1.1 Create Expression Assets
**Priority**: Critical
**Time**: 2-3 days

Create the base expression images in `/public/images/sophia-reactions/`:

```bash
# Essential expressions (Priority 1)
sophia-curious.png
sophia-excited.png
sophia-thinking.png
sophia-happy.png
sophia-hopeful.png
sophia-encouraging.png
sophia-confused.png
sophia-disappointed.png
sophia-neutral.png
sophia-writing.png
```

### 1.2 Expression Controller Component
**File**: `/components/sophia/expressions/ExpressionController.tsx`

```typescript
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type ExpressionType = 
  | 'curious' | 'excited' | 'thinking' | 'happy' | 'hopeful'
  | 'encouraging' | 'confused' | 'disappointed' | 'neutral' | 'writing'

interface ExpressionControllerProps {
  expression: ExpressionType
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showParticles?: boolean
  onExpressionChange?: (expression: ExpressionType) => void
}

export function ExpressionController({
  expression,
  size = 'lg',
  showParticles = false,
  onExpressionChange
}: ExpressionControllerProps) {
  const [currentExpression, setCurrentExpression] = useState(expression)
  
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  }
  
  const transitionConfig = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    mass: 1
  }
  
  useEffect(() => {
    if (expression !== currentExpression) {
      onExpressionChange?.(expression)
      setCurrentExpression(expression)
    }
  }, [expression])
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentExpression}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={transitionConfig}
        className={`relative ${sizeMap[size]}`}
      >
        <Image
          src={`/images/sophia-reactions/sophia-${currentExpression}.png`}
          alt={`Sophia ${currentExpression}`}
          fill
          className="object-contain"
          priority
        />
        
        {showParticles && (
          <ParticleEffect expression={currentExpression} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 1.3 Expression State Machine
**File**: `/components/sophia/utils/expressionMachine.ts`

```typescript
import { createMachine, assign } from 'xstate'

export const sophiaExpressionMachine = createMachine({
  id: 'sophiaExpression',
  initial: 'neutral',
  context: {
    currentExpression: 'neutral',
    dialogue: '',
    intensity: 0.5,
    particles: false
  },
  states: {
    neutral: {
      on: {
        USER_HOVER: 'curious',
        USER_TYPE: 'listening',
        GREETING: 'waving'
      }
    },
    curious: {
      on: {
        USER_ACCEPT: 'excited',
        USER_HESITATE: 'hopeful',
        USER_REJECT: 'disappointed'
      }
    },
    excited: {
      on: {
        CELEBRATE: 'celebrating',
        CALM_DOWN: 'happy'
      },
      entry: 'triggerParticles'
    },
    thinking: {
      on: {
        IDEA: 'aha',
        CONFUSED: 'confused',
        COMPLETE: 'proud'
      }
    },
    writing: {
      on: {
        COMPLETE: 'proud',
        ERROR: 'concerned'
      }
    }
  }
})
```

## Phase 2: Onboarding Flow Components (Week 1-2)

### 2.1 Main Onboarding Flow
**File**: `/components/sophia/onboarding/OnboardingFlow.tsx`

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainAccessStep } from './BrainAccessStep'
import { CreatorShowcase } from './CreatorShowcase'
import { ContentCreation } from './ContentCreation'
import { DeliveryMethod } from './DeliveryMethod'
import { useOnboardingState } from '../utils/onboardingState'

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const { state, dispatch } = useOnboardingState()
  
  const steps = [
    { id: 'brain-access', component: BrainAccessStep },
    { id: 'creator-showcase', component: CreatorShowcase },
    { id: 'content-creation', component: ContentCreation },
    { id: 'delivery-method', component: DeliveryMethod }
  ]
  
  const CurrentStepComponent = steps[currentStep].component
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1B] to-[#1A1F36] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="container mx-auto px-4 py-12"
        >
          <CurrentStepComponent
            onNext={() => setCurrentStep(prev => prev + 1)}
            onBack={() => setCurrentStep(prev => prev - 1)}
            state={state}
            dispatch={dispatch}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${
                index <= currentStep ? 'bg-purple-500' : 'bg-gray-600'
              }`}
              initial={{ width: 8 }}
              animate={{ 
                width: index === currentStep ? 32 : 8 
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

### 2.2 Brain Access Step
**File**: `/components/sophia/onboarding/BrainAccessStep.tsx`

```typescript
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Lock } from 'lucide-react'
import { ExpressionController } from '../expressions/ExpressionController'
import { TypewriterText } from '../utils/TypewriterText'

export function BrainAccessStep({ onNext, state, dispatch }) {
  const [sophiaExpression, setSophiaExpression] = useState('curious')
  const [dialogue, setDialogue] = useState(0)
  const [showBrainViz, setShowBrainViz] = useState(false)
  
  const dialogues = [
    "Hi! I'm Sophia 👋",
    "I'm here to help you create amazing content",
    "But first, I need to understand how your unique mind works",
    "May I have permission to learn from you?"
  ]
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (dialogue < dialogues.length - 1) {
        setDialogue(prev => prev + 1)
        
        // Update expression based on dialogue
        if (dialogue === 1) setSophiaExpression('excited')
        if (dialogue === 2) setSophiaExpression('curious')
        if (dialogue === 3) setSophiaExpression('hopeful')
      }
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [dialogue])
  
  const handleBrainAccess = async () => {
    setSophiaExpression('celebrating')
    dispatch({ type: 'GRANT_BRAIN_ACCESS' })
    
    // Show brain visualization
    setShowBrainViz(true)
    
    setTimeout(() => {
      onNext()
    }, 2000)
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      {/* Sophia Character */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <ExpressionController
          expression={sophiaExpression}
          size="xl"
          showParticles={sophiaExpression === 'celebrating'}
        />
      </motion.div>
      
      {/* Dialogue */}
      <motion.div
        className="mt-8 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <TypewriterText
          text={dialogues[dialogue]}
          className="text-2xl text-white font-medium"
          speed={50}
        />
      </motion.div>
      
      {/* Brain Access Button */}
      {dialogue === dialogues.length - 1 && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="relative group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBrainAccess}
            onMouseEnter={() => setSophiaExpression('excited')}
            onMouseLeave={() => setSophiaExpression('hopeful')}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Brain className="w-6 h-6" />
              Grant Brain Access
              <Sparkles className="w-5 h-5" />
            </span>
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          {/* Explanation link */}
          <button
            className="mt-4 text-gray-400 text-sm hover:text-white transition-colors"
            onClick={() => {/* Show tooltip */}}
          >
            What does this mean?
          </button>
        </motion.div>
      )}
      
      {/* Brain Visualization */}
      {showBrainViz && (
        <BrainVisualization />
      )}
    </div>
  )
}
```

### 2.3 Particle Effects
**File**: `/components/sophia/expressions/ParticleEffects.tsx`

```typescript
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ParticleEffectProps {
  expression: string
  count?: number
}

export function ParticleEffect({ expression, count = 20 }: ParticleEffectProps) {
  const particlesRef = useRef<HTMLDivElement>(null)
  
  const getParticleConfig = (expression: string) => {
    switch(expression) {
      case 'excited':
        return { emoji: '✨', color: '#FBBF24', spread: 150 }
      case 'celebrating':
        return { emoji: '🎉', color: '#10B981', spread: 200 }
      case 'thinking':
        return { emoji: '💭', color: '#6B7280', spread: 100 }
      case 'aha':
        return { emoji: '💡', color: '#FDE047', spread: 120 }
      default:
        return { emoji: '✨', color: '#8B5CF6', spread: 100 }
    }
  }
  
  const config = getParticleConfig(expression)
  
  return (
    <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0
          }}
          animate={{
            x: Math.random() * config.spread - config.spread / 2,
            y: -Math.random() * 200 - 50,
            opacity: 0,
            scale: [0, 1, 1, 0.5, 0]
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: Math.random() * 0.3,
            ease: "easeOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            color: config.color
          }}
        >
          {config.emoji}
        </motion.div>
      ))}
    </div>
  )
}
```

## Phase 3: Advanced Features (Week 2)

### 3.1 Real-time Expression Reactions
```typescript
// Hook for expression reactions
export function useSophiaReactions() {
  const [expression, setExpression] = useState('neutral')
  
  const react = useCallback((trigger: string, delay = 200) => {
    setTimeout(() => {
      const reactions = {
        'user_hover': 'curious',
        'user_click': 'excited',
        'user_type': 'listening',
        'success': 'celebrating',
        'error': 'concerned',
        'waiting': 'thinking',
        'complete': 'proud'
      }
      
      setExpression(reactions[trigger] || 'neutral')
    }, delay)
  }, [])
  
  return { expression, react }
}
```

### 3.2 Creator Showcase Component
```typescript
// Substack-style creator cards with parallax
export function CreatorShowcase({ onNext }) {
  const creators = [
    {
      name: "Sarah Chen",
      handle: "@sarahchen",
      subscribers: "10K",
      testimonial: "Sophia helped me 5x my output",
      preview: "Technical blog posts that convert..."
    },
    // More creators...
  ]
  
  return (
    <div className="space-y-6">
      {creators.map((creator, index) => (
        <motion.div
          key={creator.handle}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6"
        >
          {/* Creator card content */}
        </motion.div>
      ))}
    </div>
  )
}
```

## Phase 4: Integration & Polish (Week 2-3)

### 4.1 API Integration
```typescript
// API client for onboarding
export class OnboardingAPI {
  async grantBrainAccess(userId: string) {
    return fetch('/api/sophia/brain-access', {
      method: 'POST',
      body: JSON.stringify({ userId })
    })
  }
  
  async generateFirstContent(prompt: string, userId: string) {
    return fetch('/api/sophia/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, userId, first: true })
    })
  }
  
  async trackProgress(step: string, action: string) {
    return fetch('/api/onboarding/track', {
      method: 'POST',
      body: JSON.stringify({ step, action, timestamp: Date.now() })
    })
  }
}
```

### 4.2 Performance Optimizations
```typescript
// Preload expressions
export function preloadExpressions(expressions: string[]) {
  expressions.forEach(exp => {
    const img = new Image()
    img.src = `/images/sophia-reactions/sophia-${exp}.png`
  })
}

// Lazy load heavy components
const CreatorShowcase = lazy(() => import('./CreatorShowcase'))
```

## Testing Checklist

### Unit Tests
- [ ] Expression Controller renders all expressions
- [ ] State machine transitions work correctly
- [ ] Particle effects trigger appropriately
- [ ] TypewriterText animates properly

### Integration Tests
- [ ] Onboarding flow progresses through all steps
- [ ] API calls succeed and handle errors
- [ ] Progress is tracked correctly
- [ ] Expressions change based on user actions

### E2E Tests
- [ ] Complete onboarding flow works end-to-end
- [ ] Animations perform well on various devices
- [ ] Accessibility features work (keyboard nav, screen readers)
- [ ] Works across browsers (Chrome, Safari, Firefox)

## Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Expression change: < 200ms
- API response: < 500ms

## Deployment Steps
1. Build and optimize expression images
2. Deploy API endpoints
3. Set up monitoring and analytics
4. A/B testing configuration
5. Progressive rollout (10% → 50% → 100%)

## Monitoring & Analytics
- Track expression engagement rates
- Monitor step completion rates
- Measure time spent per step
- Collect user feedback on expressions
- A/B test different dialogue variations