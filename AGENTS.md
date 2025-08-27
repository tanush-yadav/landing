# AI Agent Usage Guidelines

## 🤖 Overview

This document provides comprehensive guidelines for working with AI agents on this codebase. It explains when to use specific agents, their strengths, and how to get the best results.

---

## 📊 Agent Comparison Matrix

| Agent | Best For | Speed | Focus | Output Style |
|-------|----------|-------|-------|--------------|
| **@agent-soham-ui-engineer** | UI Polish & Enhancements | ⚡ Fast | Visual Excellence | Direct Implementation |
| **@agent-ui-engineer** | System Architecture | 🐢 Thorough | Engineering & Scalability | Modular Components |
| **@agent-executor** | Implementation & Features | ⚡ Fast | Production Code | Complete Solutions |
| **@agent-ui-code-reviewer** | Code Review | 🔍 Detailed | Quality & Standards | Feedback & Fixes |
| **@agent-ui-spec-planner** | Requirements & Specs | 📋 Comprehensive | Edge Cases | Detailed Specifications |

---

## 🎯 Agent Selection Guide

### @agent-soham-ui-engineer
**Specialty**: Rapid UI enhancements with focus on visual polish

#### When to Use:
- Need quick visual improvements to existing components
- Adding animations and micro-interactions
- Implementing modern design patterns
- Polishing user experience
- Creating beautiful, production-ready interfaces
- Time-sensitive UI updates

#### Strengths:
- ⚡ **Speed**: Delivers results quickly
- 🎨 **Visual Focus**: Emphasizes aesthetics and user experience
- 🎯 **Direct Implementation**: Makes changes in-place efficiently
- ✨ **Polish**: Adds professional touches and refinements
- 🎭 **Animations**: Expert in Framer Motion and CSS animations

#### Example Prompts:
```
"Make the hero section more visually appealing with animations"
"Add smooth transitions to the navigation menu"
"Polish the button hover states and interactions"
"Improve the visual hierarchy of the card components"
```

---

### @agent-ui-engineer
**Specialty**: Building scalable UI systems and architecture

#### When to Use:
- Creating new component libraries
- Establishing design systems
- Building reusable UI infrastructure
- Implementing complex component architectures
- Setting up comprehensive testing utilities
- Long-term maintainability focus

#### Strengths:
- 🏗️ **Architecture**: Builds well-structured systems
- 📦 **Modularity**: Creates highly reusable components
- 📚 **Documentation**: Provides thorough documentation
- 🧪 **Testing**: Includes test utilities and examples
- 🔄 **Scalability**: Designs for growth and maintenance

#### Example Prompts:
```
"Build a comprehensive form system with validation"
"Create a reusable table component with sorting and filtering"
"Establish a design token system for the project"
"Implement a component library with Storybook"
```

---

### @agent-executor
**Specialty**: Elite implementation and feature development

#### When to Use:
- Transforming designs into production code
- Implementing complex features end-to-end
- Performance optimization tasks
- Setting up DevOps pipelines
- Solving challenging technical problems
- Building production-ready solutions

#### Strengths:
- 🚀 **Implementation**: Expert at turning ideas into code
- ⚡ **Performance**: Focuses on optimization
- 🔧 **Technical Excellence**: Solves complex problems
- 🏭 **Production Ready**: Delivers deployment-ready code
- 🔄 **Full Stack**: Can handle frontend and backend

#### Example Prompts:
```
"Implement the payment processing flow"
"Optimize the app's bundle size and load time"
"Set up CI/CD pipeline with GitHub Actions"
"Build the real-time notification system"
```

---

### @agent-ui-code-reviewer
**Specialty**: Comprehensive frontend code review

#### When to Use:
- Before merging pull requests
- After implementing complex UI features
- Checking accessibility compliance
- Reviewing performance implications
- Validating design system adherence
- Ensuring best practices

#### Strengths:
- 🔍 **Thorough Analysis**: Deep code examination
- ♿ **Accessibility**: WCAG compliance checking
- 📊 **Performance**: Identifies bottlenecks
- 🎨 **Design System**: Ensures consistency
- 🐛 **Bug Detection**: Finds potential issues

#### Example Prompts:
```
"Review the new dashboard components for best practices"
"Check the form implementation for accessibility"
"Review the data table for performance issues"
"Validate the component against our design system"
```

---

### @agent-ui-spec-planner
**Specialty**: Transform vague requirements into detailed specs

#### When to Use:
- Before starting implementation
- When requirements are unclear
- Need to identify edge cases
- Planning complex UI features
- Creating implementation roadmaps
- Documenting all states and interactions

#### Strengths:
- 📋 **Comprehensive Specs**: Covers all scenarios
- 🎯 **Edge Cases**: Identifies hidden complexity
- 📊 **State Management**: Documents all UI states
- 🔄 **User Flows**: Maps complete interactions
- ⚠️ **Error Handling**: Specifies failure modes

#### Example Prompts:
```
"Create detailed specs for the file upload feature"
"Plan all states for the user authentication flow"
"Specify the data table with filtering and sorting"
"Document all edge cases for the checkout process"
```

---

## 🎨 Design System Agents

For design system work, use agents in this order:

1. **@agent-ui-spec-planner** - Define requirements
2. **@agent-ui-engineer** - Build the system
3. **@agent-executor** - Implement features
4. **@agent-soham-ui-engineer** - Polish and enhance
5. **@agent-ui-code-reviewer** - Review and validate

---

## 💡 Best Practices

### 1. Provide Clear Context
```
❌ Bad: "Fix the button"
✅ Good: "The primary button in the hero section needs better hover states and should match our design system colors"
```

### 2. Include File Paths When Known
```
❌ Bad: "Update the navigation"
✅ Good: "Update the navigation component in /components/navigation.tsx to be mobile-responsive"
```

### 3. Specify Design Constraints
```
❌ Bad: "Make it look better"
✅ Good: "Improve the visual hierarchy using our existing color palette and maintain WCAG AA compliance"
```

### 4. Chain Agents for Complex Tasks
```
1. Use @agent-ui-spec-planner to define requirements
2. Use @agent-ui-engineer to build the foundation
3. Use @agent-soham-ui-engineer to polish
4. Use @agent-ui-code-reviewer to validate
```

---

## 🚀 Performance Tips

### For Speed:
- Use **@agent-soham-ui-engineer** for quick iterations
- Use **@agent-executor** for rapid feature delivery
- Provide specific file paths to avoid search time

### For Quality:
- Use **@agent-ui-engineer** for architectural decisions
- Use **@agent-ui-code-reviewer** before deployments
- Use **@agent-ui-spec-planner** for complex features

### For Visual Excellence:
- Use **@agent-soham-ui-engineer** for animations
- Provide design references or examples
- Specify motion and interaction preferences

---

## 📝 Example Workflows

### Creating a New Feature
```bash
1. @agent-ui-spec-planner "Plan a user profile page with edit capabilities"
2. @agent-ui-engineer "Build the profile component structure"
3. @agent-executor "Implement the profile API integration"
4. @agent-soham-ui-engineer "Add animations and polish to the profile page"
5. @agent-ui-code-reviewer "Review the complete profile implementation"
```

### Improving Existing UI
```bash
1. @agent-soham-ui-engineer "Enhance the dashboard with modern design patterns"
2. @agent-ui-code-reviewer "Review the dashboard changes for accessibility"
```

### Building a Design System
```bash
1. @agent-ui-engineer "Create a comprehensive component library"
2. @agent-executor "Set up Storybook for the components"
3. @agent-soham-ui-engineer "Add polish and animations to components"
```

---

## 🔧 Troubleshooting

### Agent Not Responding as Expected?
1. Provide more specific context
2. Include file paths
3. Break complex tasks into smaller ones
4. Use the right agent for the job

### Code Not Following Standards?
1. Reference CLAUDE.md in your prompt
2. Specify coding standards explicitly
3. Use @agent-ui-code-reviewer to validate

### Visual Results Not Satisfactory?
1. Provide design references
2. Specify color schemes and spacing
3. Use @agent-soham-ui-engineer for polish

---

## 📚 Quick Reference

### Task → Agent Mapping
| Task | Primary Agent | Alternative |
|------|--------------|-------------|
| Add animations | @agent-soham-ui-engineer | @agent-ui-engineer |
| Build design system | @agent-ui-engineer | @agent-executor |
| Code review | @agent-ui-code-reviewer | - |
| Create specs | @agent-ui-spec-planner | - |
| Fix bugs | @agent-executor | @agent-soham-ui-engineer |
| Implement features | @agent-executor | @agent-ui-engineer |
| Improve performance | @agent-executor | @agent-ui-code-reviewer |
| Polish UI | @agent-soham-ui-engineer | - |
| Refactor code | @agent-ui-engineer | @agent-executor |
| Write tests | @agent-executor | @agent-ui-engineer |

---

## 🎯 Agent Capabilities Summary

### Visual & Animation
**Best**: @agent-soham-ui-engineer
- Framer Motion animations
- CSS transitions
- Micro-interactions
- Visual polish
- Modern design patterns

### Architecture & Systems
**Best**: @agent-ui-engineer
- Component architecture
- Design systems
- Reusable libraries
- Testing utilities
- Documentation

### Implementation & Features
**Best**: @agent-executor
- Feature development
- API integration
- Performance optimization
- Production deployment
- Bug fixes

### Quality & Review
**Best**: @agent-ui-code-reviewer
- Code quality
- Best practices
- Accessibility
- Performance review
- Security audit

### Planning & Specification
**Best**: @agent-ui-spec-planner
- Requirements analysis
- Edge case identification
- State documentation
- User flow mapping
- Implementation planning

---

## 🤝 Working with Multiple Agents

### Sequential Workflow
```
Spec → Build → Implement → Polish → Review
```

### Parallel Workflow
For independent tasks, you can use multiple agents simultaneously:
```
@agent-ui-engineer "Build the header component"
@agent-soham-ui-engineer "Polish the footer animations"
@agent-executor "Implement the API integration"
```

### Iterative Workflow
```
1. Initial implementation with @agent-executor
2. Review with @agent-ui-code-reviewer
3. Polish with @agent-soham-ui-engineer
4. Final review with @agent-ui-code-reviewer
```

---

## 📌 Important Notes

1. **Always provide context**: The more specific you are, the better the results
2. **Use the right tool**: Each agent has specialized strengths
3. **Combine agents**: Complex tasks benefit from multiple perspectives
4. **Reference documentation**: Point agents to CLAUDE.md for standards
5. **Iterate**: Don't hesitate to refine with follow-up requests

---

## 🆘 Getting Help

If an agent isn't producing expected results:
1. Check you're using the right agent for the task
2. Provide more specific requirements
3. Include example code or designs
4. Reference the design system
5. Break down complex tasks

---

*Last updated: January 2025*
*Version: 1.0.0*