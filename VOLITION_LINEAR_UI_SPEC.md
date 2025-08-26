# Volition AI Linear UI Specification

## Overview
**Purpose**: Create a pixel-perfect Linear-style UI for Volition AI's employee landing page demo section, replicating Linear's dark theme design system with issue tracking, activity feeds, and sub-task management components.

**User Story**: As a Volition AI employee, I want to see a familiar Linear-style interface that demonstrates our AI's ability to integrate with project management workflows.

**Success Criteria**: 
- UI matches Linear's dark theme aesthetics exactly
- All interactive states are properly defined
- Smooth animations and transitions
- Fully responsive across all devices
- Accessible to screen readers and keyboard navigation

## Component Architecture

```
LinearDemoContainer
├── IssueDetailView
│   ├── IssueHeader
│   │   ├── IssueID (VOL-12)
│   │   ├── StatusBadge
│   │   ├── PriorityIndicator
│   │   └── ActionMenu
│   ├── IssueContent
│   │   ├── Title
│   │   ├── Description
│   │   └── MetadataBar
│   ├── ActivityFeed
│   │   ├── ActivityItem[]
│   │   │   ├── UserAvatar
│   │   │   ├── ActionText
│   │   │   └── Timestamp
│   │   └── CommentSection
│   └── PropertiesSidebar
│       ├── AssigneeSelector
│       ├── PriorityDropdown
│       ├── LabelManager
│       └── ProjectSelector
└── IssueListView
    ├── ParentIssue
    │   ├── IssueTitle
    │   └── SubIssueIndicator (0/9)
    └── SubIssueList
        └── SubIssue[]
            ├── RadioButton/Checkbox
            ├── IssueText
            ├── AssigneeAvatar
            └── DueDate
```

## Design Tokens

### Color Palette
```typescript
const linearColors = {
  // Backgrounds
  background: {
    primary: '#1C1D1F',     // Main background
    secondary: '#2A2B2F',   // Card/panel background
    tertiary: '#363739',    // Elevated surfaces
    hover: '#3A3B3F',       // Hover state background
    active: '#404145',      // Active/pressed state
  },
  
  // Borders
  border: {
    subtle: '#363739',      // Default borders
    default: '#464749',     // Prominent borders
    strong: '#5A5B5F',      // Emphasized borders
  },
  
  // Text
  text: {
    primary: '#FFFFFF',     // Primary text
    secondary: '#9CA3AF',   // Secondary text
    tertiary: '#6B7280',    // Muted text
    quaternary: '#4B5563',  // Disabled text
  },
  
  // Status Colors
  status: {
    todo: {
      background: '#2A2B2F',
      border: '#464749',
      text: '#9CA3AF',
      icon: '#6B7280',
    },
    inProgress: {
      background: 'rgba(245, 158, 11, 0.1)',  // Yellow with low opacity
      border: '#F59E0B',
      text: '#F59E0B',
      icon: '#F59E0B',
      label: 'Ready to draft',
    },
    done: {
      background: 'rgba(16, 185, 129, 0.1)',  // Green with low opacity
      border: '#10B981',
      text: '#10B981',
      icon: '#10B981',
    },
    blocked: {
      background: 'rgba(239, 68, 68, 0.1)',   // Red with low opacity
      border: '#EF4444',
      text: '#EF4444',
      icon: '#EF4444',
    },
  },
  
  // Interactive Elements
  interactive: {
    link: '#6366F1',        // Links and clickable text
    linkHover: '#818CF8',   // Hover state for links
    focus: '#6366F1',       // Focus ring color
    selection: 'rgba(99, 102, 241, 0.2)', // Text selection
  },
  
  // Semantic Colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Special Elements
  avatar: {
    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    text: '#FFFFFF',
  },
}
```

### Typography
```typescript
const typography = {
  // Font Families
  fontFamily: {
    mono: 'SF Mono, Monaco, Inconsolata, "Courier New", monospace',
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Font Sizes
  fontSize: {
    xs: '11px',    // Timestamps, labels
    sm: '12px',    // Secondary text, metadata
    base: '14px',  // Body text
    md: '15px',    // Emphasized body
    lg: '16px',    // Subheadings
    xl: '18px',    // Headings
    '2xl': '20px', // Large headings
  },
  
  // Line Heights
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
}
```

### Spacing & Layout
```typescript
const spacing = {
  // Base spacing scale
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  
  // Component-specific spacing
  issueCard: {
    padding: '16px',
    gap: '12px',
  },
  activityItem: {
    gap: '8px',
    indent: '32px',
  },
  sidebar: {
    width: '320px',
    padding: '16px',
  },
}
```

## Component Specifications

### 1. Issue Detail View

#### IssueHeader Component
```typescript
interface IssueHeaderProps {
  issueId: string // Format: "VOL-XX"
  status: 'todo' | 'in-progress' | 'done' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
}
```

**Visual Specifications**:
- Background: `#2A2B2F` with `1px` border `#363739`
- Border radius: `8px`
- Padding: `16px`
- Issue ID: Monospace font, `12px`, `#9CA3AF`
- Status badge: 
  - Height: `24px`
  - Border radius: `12px`
  - Padding: `4px 8px`
  - Icon size: `14px`
  - Gap between icon and text: `4px`
  
**States**:
- Default: As specified
- Hover: Background lightens to `#3A3B3F`
- Focus: `2px` outline with `#6366F1`
- Loading: Skeleton loader with pulse animation

#### ActivityFeed Component
```typescript
interface ActivityItem {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: 'status_change' | 'assignment' | 'comment' | 'title_change' | 'priority_change'
  metadata?: Record<string, any>
  timestamp: string // Format: "1w ago", "6d ago", "Just now"
  content?: string
}
```

**Visual Specifications**:
- Container: No background, items separated by `12px`
- Avatar: 
  - Size: `24px` diameter
  - Border radius: `50%`
  - Font size for initials: `10px`
  - Font weight: `600`
- Action text: `14px`, `#FFFFFF`
- Timestamp: `12px`, `#6B7280`
- Hover state: Entire item gets `#2A2B2F` background with `4px` padding

**Animation**:
- New items slide in from left: `transform: translateX(-20px)` to `translateX(0)`
- Opacity: `0` to `1` over `300ms` ease-out
- Stagger: `50ms` between items

### 2. Issue List View

#### SubIssue Component
```typescript
interface SubIssueProps {
  id: string
  title: string
  completed: boolean
  assignee?: {
    id: string
    name: string
    avatar?: string
  }
  dueDate?: string // ISO format
  isOverdue?: boolean
}
```

**Visual Specifications**:
- Height: `36px`
- Padding: `8px 12px`
- Radio/Checkbox:
  - Size: `16px`
  - Border: `1px solid #464749`
  - Checked background: `#10B981`
  - Check icon: White, `10px`
- Text: `14px`, `#FFFFFF` (completed: `#6B7280` with line-through)
- Due date when overdue: `#EF4444`, `12px`, medium weight

**Interactions**:
- Hover: Background `#2A2B2F`
- Click on radio: Ripple effect from click point
- Keyboard navigation: Arrow keys move between items
- Space/Enter toggles selection

### 3. Properties Sidebar

#### AssigneeSelector Component
```typescript
interface AssigneeSelectorProps {
  currentAssignee?: User
  availableUsers: User[]
  onAssign: (userId: string) => void
}
```

**Visual Specifications**:
- Trigger button:
  - Height: `32px`
  - Background: `#2A2B2F`
  - Border: `1px solid #363739`
  - Border radius: `6px`
  - Padding: `6px 8px`
- Dropdown:
  - Max height: `240px`
  - Scrollable with custom scrollbar
  - Item height: `32px`
  - Search input at top with `#1C1D1F` background

**Dropdown Animation**:
- Scale from `0.95` to `1`
- Opacity from `0` to `1`
- Duration: `150ms` ease-out

## Responsive Behavior

### Breakpoints
```typescript
const breakpoints = {
  mobile: '0-639px',
  tablet: '640px-1023px',
  desktop: '1024px-1439px',
  wide: '1440px+',
}
```

### Mobile Adaptations (< 640px)
- Sidebar becomes bottom sheet
- Touch targets minimum `44x44px`
- Swipe gestures for status changes
- Activity feed collapses to show last 3 items
- Font sizes increase by `1px` for readability

### Tablet Adaptations (640px - 1023px)
- Sidebar width reduces to `280px`
- Two-column layout for sub-issues
- Condensed activity feed

### Desktop+ (1024px+)
- Full three-column layout
- Sidebar fixed position
- Keyboard shortcuts enabled
- Hover states active

## Interaction Specifications

### Keyboard Navigation
```
Tab: Move through focusable elements
Shift+Tab: Move backwards
Arrow Up/Down: Navigate list items
Space: Toggle checkboxes/radio buttons
Enter: Activate buttons/links
Escape: Close dropdowns/modals
Cmd/Ctrl + K: Open command palette
```

### Mouse Interactions
- Single click: Primary actions
- Double click: Edit in place (titles, descriptions)
- Right click: Context menu
- Long press (mobile): Alternative to right click
- Drag: Reorder items (with 100ms delay)

### Form Validations
- Inline validation after blur
- Async validation shows spinner
- Error messages appear below field
- Success state shows green checkmark
- Warning state shows yellow icon

## Data Handling

### API Contracts
```typescript
interface Issue {
  id: string
  projectId: string
  number: number
  title: string
  description?: string
  status: IssueStatus
  priority: Priority
  assigneeId?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  labels: Label[]
  subIssues: Issue[]
  activity: ActivityItem[]
}

interface IssueStatus {
  id: string
  name: string
  color: string
  type: 'todo' | 'in-progress' | 'done' | 'blocked'
}

interface Priority {
  level: 0 | 1 | 2 | 3 // low, medium, high, urgent
  label: string
  color: string
}
```

### Edge Cases
- **Empty States**: Show illustration with "No issues found" message
- **Error States**: Red banner with retry button
- **Offline Mode**: Cache last 50 issues, show offline indicator
- **Large Lists**: Virtualize after 100 items
- **Stale Data**: Show "Updated X minutes ago" with refresh button
- **Rate Limiting**: Queue updates, batch API calls

## Performance Requirements

### Load Times
- Initial render: < 100ms
- Data fetch: < 500ms
- Animation start: < 16ms
- Interaction response: < 50ms

### Bundle Impact
- Component size: < 50KB gzipped
- Lazy load activity feed after 10 items
- Virtualize lists > 100 items
- Debounce search inputs by 300ms

### Caching Strategy
- Cache issue data for 5 minutes
- Cache user avatars for 24 hours
- Optimistic updates with rollback
- Background sync every 30 seconds

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance
- Color contrast ratio: 4.5:1 minimum
- Focus indicators visible
- Screen reader announcements for state changes
- Landmark regions properly labeled
- Form inputs with associated labels

### Screen Reader Support
```html
<div role="article" aria-label="Issue VOL-12">
  <h2 id="issue-title">Implement logout route</h2>
  <div role="status" aria-live="polite">Status: Ready to draft</div>
  <div role="feed" aria-label="Activity feed">
    <!-- Activity items -->
  </div>
</div>
```

### Keyboard Navigation
- All interactive elements reachable via keyboard
- Focus trap in modals
- Skip links for navigation
- Logical tab order
- Focus restoration after modal close

## Animation Specifications

### Transitions
```css
/* Default transition */
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Status change */
transition: background-color 200ms ease-out,
            border-color 200ms ease-out;

/* Activity item entrance */
animation: slideInLeft 300ms ease-out;

/* Skeleton loader */
animation: pulse 2s infinite;
```

### Animation Sequences
1. **Issue Assignment**:
   - Avatar fades in (150ms)
   - Name slides from left (200ms)
   - Status updates (100ms delay)

2. **Status Change**:
   - Old status fades out (100ms)
   - New status scales in (150ms)
   - Activity item appears (200ms delay)

3. **Sub-issue Completion**:
   - Checkbox fills (100ms)
   - Text strikes through (150ms)
   - Counter updates (200ms)

## Test Scenarios

### Happy Path
1. Load issue detail view
2. Assign to user
3. Change status to in-progress
4. Add comment
5. Mark sub-issues complete
6. Change status to done

### Error Recovery
1. Network failure during update
2. Optimistic update rollback
3. Retry mechanism activation
4. Error message display
5. Manual refresh option

### Edge Cases
1. 10,000+ issues in list
2. 100+ character issue title
3. RTL text in descriptions
4. Emoji in usernames
5. Rapid status changes
6. Multiple tabs updating same issue

### Performance Tests
1. Time to interactive < 2s
2. 60 FPS during animations
3. Memory usage < 50MB
4. CPU usage < 30% during idle
5. Network requests < 10 per minute

### Accessibility Tests
1. Navigate entire UI with keyboard only
2. Screen reader announces all changes
3. Color blind mode functions correctly
4. High contrast mode preserves functionality
5. Mobile touch targets meet 44x44px minimum

## Implementation Notes

### Component Library
- Use Radix UI primitives for dropdowns
- Framer Motion for animations
- React Hook Form for form handling
- SWR for data fetching and caching
- Virtualize with react-window

### State Management
```typescript
// Global state
interface AppState {
  issues: Map<string, Issue>
  users: Map<string, User>
  filters: FilterState
  ui: UIState
}

// Local state
interface IssueDetailState {
  isEditing: boolean
  pendingChanges: Partial<Issue>
  optimisticUpdates: Update[]
  errors: Error[]
}
```

### Performance Optimizations
- Memoize expensive computations
- Debounce user input (300ms)
- Throttle scroll events (16ms)
- Lazy load images
- Code split by route
- Preload critical assets

## Open Questions for Stakeholders

### Product Decisions
1. Should completed sub-issues remain visible or collapse?
2. How many activity items to show by default?
3. Should we support bulk operations on issues?
4. What happens when assignee is deactivated?
5. Do we need real-time collaboration indicators?

### Design Decisions
1. Should we support light theme?
2. Custom avatar colors or generated from name?
3. How to handle very long issue titles?
4. Should timestamps show relative or absolute time?
5. Animation speed preferences?

### Technical Constraints
1. Maximum number of sub-issues per issue?
2. API rate limits to consider?
3. Offline capability requirements?
4. Browser support requirements?
5. Maximum file size for attachments?

### Data Requirements
1. How long to cache issue data?
2. Which fields are required vs optional?
3. How to handle deleted references?
4. Pagination strategy for large lists?
5. How to handle concurrent edits?

## Quality Checklist

✅ Every state has a design
✅ Every error has recovery path
✅ Every action has feedback
✅ Every input has validation
✅ Every list has empty state
✅ Every load has skeleton
✅ Every device size considered
✅ Every accessibility requirement met
✅ Every edge case documented
✅ Every animation defined
✅ Performance metrics established
✅ Test scenarios comprehensive

## Next Steps

1. **Review & Approval**: Stakeholder review of specifications
2. **Design Assets**: Create high-fidelity mockups based on specs
3. **Component Development**: Build components in isolation
4. **Integration**: Connect to backend APIs
5. **Testing**: Unit, integration, and E2E tests
6. **Performance Optimization**: Profile and optimize
7. **Accessibility Audit**: Third-party validation
8. **User Testing**: Beta test with employees
9. **Documentation**: Component documentation and examples
10. **Deployment**: Staged rollout with monitoring

---

*This specification is complete and ready for implementation. The UI engineer should be able to build the Linear-style interface without requiring clarification on visual design, interactions, or edge cases.*