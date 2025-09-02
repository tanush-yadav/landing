/**
 * UI State Types for Alex Agent Detail Page
 * Managing component states, loading states, and UI interactions
 */

import { ID, Status } from '../lib/types';

// ============================================================================
// Loading State Types
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
  phase?: 'initializing' | 'fetching' | 'processing' | 'rendering';
}

export interface SkeletonConfig {
  show: boolean;
  animate: boolean;
  variant: 'pulse' | 'wave' | 'shimmer';
  duration?: number;
}

// ============================================================================
// Animation State Types
// ============================================================================

export interface AnimationState {
  enabled: boolean;
  reducedMotion: boolean;
  playState: 'playing' | 'paused' | 'stopped';
  currentAnimation?: string;
  queue: AnimationQueueItem[];
}

export interface AnimationQueueItem {
  id: ID;
  target: string;
  animation: string;
  duration: number;
  delay?: number;
  priority: number;
}

export interface ScrollTriggerConfig {
  threshold: number;
  rootMargin?: string;
  triggerOnce: boolean;
  delay?: number;
}

// ============================================================================
// Interactive Element States
// ============================================================================

export interface InteractiveElementState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isDisabled: boolean;
  isSelected: boolean;
}

export interface DemoControlState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  loop: boolean;
  showControls: boolean;
}

export interface TabState {
  activeTab: string;
  previousTab?: string;
  tabs: TabConfig[];
  direction: 'forward' | 'backward';
}

export interface TabConfig {
  id: ID;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

// ============================================================================
// Form State Types
// ============================================================================

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

export interface FieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
  validating: boolean;
  valid: boolean;
}

// ============================================================================
// Modal & Overlay States
// ============================================================================

export interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  showCloseButton: boolean;
  preventScroll: boolean;
}

export interface TooltipState {
  isVisible: boolean;
  content: string | React.ReactNode;
  position: 'top' | 'right' | 'bottom' | 'left';
  trigger: 'hover' | 'click' | 'focus';
  delay?: number;
}

export interface PopoverState extends ModalState {
  anchorElement?: HTMLElement;
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  offset?: [number, number];
}

// ============================================================================
// Navigation State Types
// ============================================================================

export interface NavigationState {
  currentSection: string;
  previousSection?: string;
  sections: SectionConfig[];
  scrollPosition: number;
  isScrolling: boolean;
  direction: 'up' | 'down';
}

export interface SectionConfig {
  id: ID;
  label: string;
  href: string;
  isVisible: boolean;
  progress: number; // 0-100 percentage of section in view
  ref?: React.RefObject<HTMLElement>;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
  separator: string;
  showHome: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  icon?: React.ReactNode;
}

// ============================================================================
// Notification State Types
// ============================================================================

export interface NotificationState {
  notifications: Notification[];
  maxNotifications: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  autoHideDuration?: number;
}

export interface Notification {
  id: ID;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: Date;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible: boolean;
}

// ============================================================================
// Media State Types
// ============================================================================

export interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  src: string;
  fallbackSrc?: string;
  retryCount: number;
  maxRetries: number;
}

export interface VideoPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
}

// ============================================================================
// Performance State Types
// ============================================================================

export interface PerformanceState {
  metrics: PerformanceMetrics;
  isMonitoring: boolean;
  thresholds: PerformanceThresholds;
  alerts: PerformanceAlert[];
}

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  renderTime?: number;
  interactionTime?: number;
}

export interface PerformanceThresholds {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

export interface PerformanceAlert {
  metric: keyof PerformanceMetrics;
  value: number;
  threshold: number;
  severity: 'warning' | 'critical';
  timestamp: Date;
}

// ============================================================================
// Accessibility State Types
// ============================================================================

export interface AccessibilityState {
  keyboardNavigationEnabled: boolean;
  screenReaderMode: boolean;
  highContrastMode: boolean;
  focusVisible: boolean;
  currentFocusElement?: string;
  skipLinks: SkipLink[];
  announcements: string[];
}

export interface SkipLink {
  id: ID;
  label: string;
  target: string;
  order: number;
}

export interface FocusTrapState {
  isActive: boolean;
  container?: HTMLElement;
  initialFocus?: HTMLElement;
  returnFocus: boolean;
  allowOutsideClick: boolean;
}

// ============================================================================
// Theme State Types
// ============================================================================

export interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  customColors?: Record<string, string>;
  fontSize: 'small' | 'medium' | 'large';
  contrast: 'normal' | 'high';
  animations: boolean;
}

// ============================================================================
// Error State Types
// ============================================================================

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorBoundary?: {
    fallback: React.ReactNode;
    resetKeys?: string[];
    onReset?: () => void;
  };
  retryCount: number;
  maxRetries: number;
}

export interface ErrorRecoveryState {
  canRecover: boolean;
  recoveryAction?: () => void;
  recoveryMessage?: string;
  showDetails: boolean;
}

// ============================================================================
// Composite State Types
// ============================================================================

export interface PageUIState {
  loading: LoadingState;
  navigation: NavigationState;
  animations: AnimationState;
  notifications: NotificationState;
  performance: PerformanceState;
  accessibility: AccessibilityState;
  theme: ThemeState;
  errors: Record<string, ErrorState>;
}

export interface ComponentUIState {
  interactive: InteractiveElementState;
  skeleton: SkeletonConfig;
  tooltip?: TooltipState;
  error?: ErrorState;
  media?: ImageLoadState | VideoPlaybackState;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  updateProgress: (progress: number) => void;
  loadingState: LoadingState;
}

export interface UseAnimationReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  restart: () => void;
  animationState: AnimationState;
}

export interface UseIntersectionReturn {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
  ref: React.RefObject<any>;
}

export interface UseMediaQueryReturn {
  matches: boolean;
  query: string;
}