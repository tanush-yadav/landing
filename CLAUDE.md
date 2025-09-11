# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cintra Landing Site**: A Next.js 15 landing page showcasing Sophia, an AI content assistant. The site features an interactive onboarding flow where users connect their data sources and configure content preferences.

**Core Product**: Sophia - AI assistant that learns from user's transcripts, conversations, and content preferences to generate personalized content.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run Playwright end-to-end tests

### Testing Notes
- No unit test framework configured (only Playwright E2E)
- When implementing tests, determine framework by checking existing patterns
- DO NOT assume Jest/Vitest - ask user for preference

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **TypeScript**: Full type safety with strict mode
- **Icons**: Lucide React + React Icons
- **Analytics**: PostHog, Google Analytics, Plausible (production only)

### Key Directories
```
app/                    # Next.js App Router pages
├── sophia/            # Sophia product pages
│   └── onboarding/    # Multi-step onboarding flow
components/            # Reusable React components
├── ui/                # Base UI components
├── blog/              # Blog-specific components  
└── sophia/            # Sophia-specific components
lib/                   # Utilities and shared logic
├── design-system/     # Design system utilities
└── data/             # Data and content
```

### Core Patterns

#### Component Architecture
- **Consistent Props Pattern**: All major components follow this interface:
```typescript
interface ComponentProps {
  onUpdate?: (key: string, value: any) => void
  data?: any
  setSophiaMessage?: (message: string) => void
}
```

#### Design System Integration
- **Utility Function**: `cn()` from `lib/utils.ts` for class merging (clsx + tailwind-merge)
- **Font Variables**: `font-display`, `font-heading`, `font-sans` (custom font setup)
- **Color Palette**: Primarily `slate-*` grays with `blue-500` accents
- **Animation Patterns**: Consistent `0.15s`, `0.3s` durations with `ease-out` timing

#### Connection Flow Pattern
Used across onboarding steps (IntegrationsGrid, WhatYouConsume, SocialPresence):
```typescript
type ConnectionStatus = 'not_connected' | 'connecting' | 'connected' | 'error'
```
- Hover states reveal connection methods
- Loading spinners during connection
- Connected state shows checkmarks and blue borders
- Consistent progress tracking with visual feedback

### Onboarding Flow Architecture

**Multi-Step Wizard**: Located in `app/sophia/onboarding/`
- **Step 0**: IntegrationsSetup - Connect meeting/transcript tools (Gong, Zoom, etc.)
- **Step 1**: WhatYouConsume - Select Substack publications for writing inspiration
- **Step 2**: BrandNarratives - Define brand voice and storytelling preferences
- **Step 3**: SocialPresence - Connect social platforms for voice analysis
- **Step 4**: StyleGuide - Set writing style and tone preferences
- **Steps 5-7**: Content creation and delivery options

**Key Onboarding Patterns**:
- Persistent state via localStorage
- Sophia companion with context-aware reactions
- Progress indicator with visual feedback
- Consistent card-based selection interface
- Connection states with loading/success feedback

## Design System Guidelines

### Color Usage
- **Primary Text**: `text-slate-900` (headings), `text-slate-600` (body)
- **Borders**: `border-slate-200` (default), `border-blue-500` (selected)
- **Backgrounds**: `bg-white` (cards), `bg-slate-50` (page backgrounds)
- **Interactive States**: `hover:border-slate-300`, `hover:shadow-sm`

### Typography Scale
```css
font-display: Fraunces (headings)
font-heading: Plus Jakarta Sans  
font-sans: Outfit (body text)
```

### Animation Guidelines
- **Card Interactions**: `transition-all duration-150`
- **Page Transitions**: `duration-0.3` with `ease-out`
- **Hover Effects**: Quick `duration-150` responses
- **Loading States**: Framer Motion with staggered animations

### Responsive Patterns
- **Grid Layouts**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Typography**: Responsive font sizes using `clamp()` functions
- **Spacing**: Consistent `space-y-*` and `gap-*` patterns

## Component Conventions

### File Naming
- PascalCase for components (`SocialPresence.tsx`)
- kebab-case for pages and utilities (`blog-post.tsx`)
- Organized by feature in subdirectories

### Import Patterns
```typescript
'use client'  // Client components always at top

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconName } from 'lucide-react'
import { cn } from '@/lib/utils'
```

### State Management
- Local state with `useState` for component-specific data
- Props drilling for parent-child communication
- localStorage for onboarding persistence
- No global state management library

## Content Architecture

### Blog System
- Markdown-based content in `content/blog/`
- Gray-matter for frontmatter parsing
- Structured data for SEO
- Reading time calculation
- Dynamic routing with `[slug]`

### Analytics Integration
- **Production Only**: Analytics disabled in development
- **Environment Flag**: `NEXT_PUBLIC_ENABLE_ANALYTICS` override
- **Multiple Providers**: PostHog, GA4, Plausible, Ahrefs

## Performance Optimizations

### Image Handling
- Next.js Image component with optimization
- AVIF/WebP format support
- Responsive device sizes configured
- Remote pattern allowlist for external images

### Build Optimizations
- Console removal in production builds
- Compression enabled
- PostHog proxy for analytics
- Font optimization with `display: swap`

## Development Guidelines

### Code Style
- TypeScript strict mode enforced
- No explicit `any` types (use proper interfaces)
- Consistent arrow functions for components
- Destructured props in function signatures

### Error Handling
- Error boundaries for blog content
- Graceful fallbacks for missing data
- Loading states for async operations

### Accessibility
- Skip navigation link implemented
- Semantic HTML structure
- Focus management in interactive elements
- Screen reader friendly components

## Important Notes

### Analytics Configuration
- Analytics are **disabled by default** in development
- Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` to enable in dev
- Multiple tracking systems run in production

### Image Assets
- Sophia character images stored in `/public/images/sophia-reactions/`
- Optimized image loading with Next.js Image component
- Remote image patterns configured for external sources

### Font Loading
- Custom Google Fonts with CSS variables
- Preloaded for performance
- Fallback system fonts defined

This codebase emphasizes clean, maintainable code with consistent patterns across components. When adding new features, follow the established design system and component patterns for consistency.

## SPARC Commands

### Core Commands
- `npx claude-flow sparc modes` - List available modes
- `npx claude-flow sparc run <mode> "<task>"` - Execute specific mode
- `npx claude-flow sparc tdd "<feature>"` - Run complete TDD workflow
- `npx claude-flow sparc info <mode>` - Get mode details

### Batchtools Commands
- `npx claude-flow sparc batch <modes> "<task>"` - Parallel execution
- `npx claude-flow sparc pipeline "<task>"` - Full pipeline processing
- `npx claude-flow sparc concurrent <mode> "<tasks-file>"` - Multi-task processing

### Build Commands
- `npm run build` - Build project
- `npm run test` - Run tests
- `npm run lint` - Linting
- `npm run typecheck` - Type checking

## SPARC Workflow Phases

1. **Specification** - Requirements analysis (`sparc run spec-pseudocode`)
2. **Pseudocode** - Algorithm design (`sparc run spec-pseudocode`)
3. **Architecture** - System design (`sparc run architect`)
4. **Refinement** - TDD implementation (`sparc tdd`)
5. **Completion** - Integration (`sparc run integration`)

## Code Style & Best Practices

- **Modular Design**: Files under 500 lines
- **Environment Safety**: Never hardcode secrets
- **Test-First**: Write tests before implementation
- **Clean Architecture**: Separate concerns
- **Documentation**: Keep updated

## 🚀 Available Agents (54 Total)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`, `collective-intelligence-coordinator`, `swarm-memory-manager`

### Consensus & Distributed
`byzantine-coordinator`, `raft-manager`, `gossip-coordinator`, `consensus-builder`, `crdt-synchronizer`, `quorum-manager`, `security-manager`

### Performance & Optimization
`perf-analyzer`, `performance-benchmarker`, `task-orchestrator`, `memory-coordinator`, `smart-agent`

### GitHub & Repository
`github-modes`, `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`, `workflow-automation`, `project-board-sync`, `repo-architect`, `multi-repo-swarm`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`, `refinement`

### Specialized Development
`backend-dev`, `mobile-dev`, `ml-developer`, `cicd-engineer`, `api-docs`, `system-architect`, `code-analyzer`, `base-template-generator`

### Testing & Validation
`tdd-london-swarm`, `production-validator`

### Migration & Planning
`migration-planner`, `swarm-init`

## 🎯 Claude Code vs MCP Tools

### Claude Code Handles ALL EXECUTION:
- **Task tool**: Spawn and run agents concurrently for actual work
- File operations (Read, Write, Edit, MultiEdit, Glob, Grep)
- Code generation and programming
- Bash commands and system operations
- Implementation work
- Project navigation and analysis
- TodoWrite and task management
- Git operations
- Package management
- Testing and debugging

### MCP Tools ONLY COORDINATE:
- Swarm initialization (topology setup)
- Agent type definitions (coordination patterns)
- Task orchestration (high-level planning)
- Memory management
- Neural features
- Performance tracking
- GitHub integration

**KEY**: MCP coordinates the strategy, Claude Code's Task tool executes with real agents.

## 🚀 Quick Setup

```bash
# Add Claude Flow MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

## MCP Tool Categories

### Coordination
`swarm_init`, `agent_spawn`, `task_orchestrate`

### Monitoring
`swarm_status`, `agent_list`, `agent_metrics`, `task_status`, `task_results`

### Memory & Neural
`memory_usage`, `neural_status`, `neural_train`, `neural_patterns`

### GitHub Integration
`github_swarm`, `repo_analyze`, `pr_enhance`, `issue_triage`, `code_review`

### System
`benchmark_run`, `features_detect`, `swarm_monitor`

## 🚀 Agent Execution Flow with Claude Code

### The Correct Pattern:

1. **Optional**: Use MCP tools to set up coordination topology
2. **REQUIRED**: Use Claude Code's Task tool to spawn agents that do actual work
3. **REQUIRED**: Each agent runs hooks for coordination
4. **REQUIRED**: Batch all operations in single messages

### Example Full-Stack Development:

```javascript
// Single message with all agent spawning via Claude Code's Task tool
[Parallel Agent Execution]:
  Task("Backend Developer", "Build REST API with Express. Use hooks for coordination.", "backend-dev")
  Task("Frontend Developer", "Create React UI. Coordinate with backend via memory.", "coder")
  Task("Database Architect", "Design PostgreSQL schema. Store schema in memory.", "code-analyzer")
  Task("Test Engineer", "Write Jest tests. Check memory for API contracts.", "tester")
  Task("DevOps Engineer", "Setup Docker and CI/CD. Document in memory.", "cicd-engineer")
  Task("Security Auditor", "Review authentication. Report findings via hooks.", "reviewer")
  
  // All todos batched together
  TodoWrite { todos: [...8-10 todos...] }
  
  // All file operations together
  Write "backend/server.js"
  Write "frontend/App.jsx"
  Write "database/schema.sql"
```

## 📋 Agent Coordination Protocol

### Every Agent Spawned via Task Tool MUST:

**1️⃣ BEFORE Work:**
```bash
npx claude-flow@alpha hooks pre-task --description "[task]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-[id]"
```

**2️⃣ DURING Work:**
```bash
npx claude-flow@alpha hooks post-edit --file "[file]" --memory-key "swarm/[agent]/[step]"
npx claude-flow@alpha hooks notify --message "[what was done]"
```

**3️⃣ AFTER Work:**
```bash
npx claude-flow@alpha hooks post-task --task-id "[task]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## 🎯 Concurrent Execution Examples

### ✅ CORRECT WORKFLOW: MCP Coordinates, Claude Code Executes

```javascript
// Step 1: MCP tools set up coordination (optional, for complex tasks)
[Single Message - Coordination Setup]:
  mcp__claude-flow__swarm_init { topology: "mesh", maxAgents: 6 }
  mcp__claude-flow__agent_spawn { type: "researcher" }
  mcp__claude-flow__agent_spawn { type: "coder" }
  mcp__claude-flow__agent_spawn { type: "tester" }

// Step 2: Claude Code Task tool spawns ACTUAL agents that do the work
[Single Message - Parallel Agent Execution]:
  // Claude Code's Task tool spawns real agents concurrently
  Task("Research agent", "Analyze API requirements and best practices. Check memory for prior decisions.", "researcher")
  Task("Coder agent", "Implement REST endpoints with authentication. Coordinate via hooks.", "coder")
  Task("Database agent", "Design and implement database schema. Store decisions in memory.", "code-analyzer")
  Task("Tester agent", "Create comprehensive test suite with 90% coverage.", "tester")
  Task("Reviewer agent", "Review code quality and security. Document findings.", "reviewer")
  
  // Batch ALL todos in ONE call
  TodoWrite { todos: [
    {id: "1", content: "Research API patterns", status: "in_progress", priority: "high"},
    {id: "2", content: "Design database schema", status: "in_progress", priority: "high"},
    {id: "3", content: "Implement authentication", status: "pending", priority: "high"},
    {id: "4", content: "Build REST endpoints", status: "pending", priority: "high"},
    {id: "5", content: "Write unit tests", status: "pending", priority: "medium"},
    {id: "6", content: "Integration tests", status: "pending", priority: "medium"},
    {id: "7", content: "API documentation", status: "pending", priority: "low"},
    {id: "8", content: "Performance optimization", status: "pending", priority: "low"}
  ]}
  
  // Parallel file operations
  Bash "mkdir -p app/{src,tests,docs,config}"
  Write "app/package.json"
  Write "app/src/server.js"
  Write "app/tests/server.test.js"
  Write "app/docs/API.md"
```

### ❌ WRONG (Multiple Messages):
```javascript
Message 1: mcp__claude-flow__swarm_init
Message 2: Task("agent 1")
Message 3: TodoWrite { todos: [single todo] }
Message 4: Write "file.js"
// This breaks parallel coordination!
```

## Performance Benefits

- **84.8% SWE-Bench solve rate**
- **32.3% token reduction**
- **2.8-4.4x speed improvement**
- **27+ neural models**

## Hooks Integration

### Pre-Operation
- Auto-assign agents by file type
- Validate commands for safety
- Prepare resources automatically
- Optimize topology by complexity
- Cache searches

### Post-Operation
- Auto-format code
- Train neural patterns
- Update memory
- Analyze performance
- Track token usage

### Session Management
- Generate summaries
- Persist state
- Track metrics
- Restore context
- Export workflows

## Advanced Features (v2.0.0)

- 🚀 Automatic Topology Selection
- ⚡ Parallel Execution (2.8-4.4x speed)
- 🧠 Neural Training
- 📊 Bottleneck Analysis
- 🤖 Smart Auto-Spawning
- 🛡️ Self-Healing Workflows
- 💾 Cross-Session Memory
- 🔗 GitHub Integration

## Integration Tips

1. Start with basic swarm init
2. Scale agents gradually
3. Use memory for context
4. Monitor progress regularly
5. Train patterns from success
6. Enable hooks automation
7. Use GitHub tools first

## Support

- Documentation: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues

---

Remember: **Claude Flow coordinates, Claude Code creates!**

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
Never save working files, text/mds and tests to the root folder.
- memory UX designer to always think ultra hard and be super creative, But give a short intuitive answer.
- memory Never run npm run dev or npm run build, it's already running. No need to test as well.