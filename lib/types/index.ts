/**
 * Centralized TypeScript Type Definitions
 * 
 * This file contains all shared types used across the application
 * Organized by domain for better maintainability
 */

// ============================================================================
// Common Types
// ============================================================================

export type ID = string;
export type Timestamp = string | Date;
export type URL = string;
export type Email = string;
export type UUID = string;

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> = {
  data: T | null;
  error: Error | null;
  status: Status;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

// ============================================================================
// UI Types
// ============================================================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline' | 'danger' | 'success' | 'warning';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type Direction = 'horizontal' | 'vertical';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

// ============================================================================
// Animation Types
// ============================================================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'backIn' | 'backOut';
  repeat?: number | 'infinite';
  reverse?: boolean;
}

export interface TransitionConfig {
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
}

// ============================================================================
// Demo/Business Logic Types
// ============================================================================

export interface Agent {
  id: ID;
  name: string;
  avatar: string;
  role: string;
  status: 'idle' | 'working' | 'completed';
  color: string;
}

export interface Task {
  id: ID;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: Agent;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  completedAt?: Timestamp;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: ID;
  taskId: ID;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  order: number;
}

export interface SlackMessage {
  id: ID;
  sender: string;
  content: string;
  timestamp: string;
  type?: 'user' | 'bot' | 'system';
  reactions?: {
    emoji: string;
    count: number;
  }[];
}

export interface LinearIssue {
  id: ID;
  number: string;
  title: string;
  description?: string;
  status: string;
  priority: number;
  assignee?: {
    name: string;
    avatar?: string;
  };
  labels?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface CompletionMessage {
  title: string;
  description: string;
  metrics?: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
}

// ============================================================================
// Demo State Types
// ============================================================================

export interface DemoState {
  isRunning: boolean;
  phase: 'idle' | 'analyzing' | 'creating-subtasks' | 'executing' | 'notifying' | 'completed';
  ticketCreated: boolean;
  subtasksCreated: boolean;
  tasksExecuting: boolean;
  allTasksCompleted: boolean;
  slackNotified: boolean;
}

export interface DemoConfig {
  autoPlay: boolean;
  loopDelay: number;
  stepDuration: number;
  enableSound?: boolean;
  showMetrics?: boolean;
}

// ============================================================================
// API Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  error?: string;
  timestamp: Timestamp;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Timestamp;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============================================================================
// Form Types
// ============================================================================

export interface FormField {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  validation?: ValidationRule[];
  defaultValue?: unknown;
  options?: SelectOption[];
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email' | 'url' | 'custom';
  value?: unknown;
  message: string;
  validator?: (value: unknown) => boolean;
}

export interface FormErrors {
  [fieldName: string]: string | undefined;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  id: ID;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  external?: boolean;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// ============================================================================
// Table Types
// ============================================================================

export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  accessor?: (row: T) => unknown;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableData<T = unknown> {
  columns: TableColumn<T>[];
  rows: T[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filterBy?: Record<string, unknown>;
}

// ============================================================================
// Blog Types
// ============================================================================

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: ID;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  publishedAt: Timestamp;
  updatedAt?: Timestamp;
  readTime: number; // in minutes
  tags: string[];
  category: string;
  featuredImage?: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
}

export interface BlogCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  author?: string;
  sortBy?: 'publishedAt' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
  readTimeRange?: 'short' | 'medium' | 'long';
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ValueOf<T> = T[keyof T];

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Keys<T> = keyof T;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys];