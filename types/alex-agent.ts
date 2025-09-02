/**
 * Alex Agent - TypeScript Type Definitions
 * AI Code Review Assistant specialized in PR review and code quality
 */

import { ID, Timestamp, Status, BaseComponentProps } from '../lib/types';

// ============================================================================
// Agent Profile Types
// ============================================================================

export interface AlexAgentProfile {
  id: ID;
  name: string;
  avatar: string;
  tagline: string;
  description: string;
  capabilities: AgentCapability[];
  specializations: string[];
  version: string;
  status: 'active' | 'beta' | 'maintenance' | 'deprecated';
}

export interface AgentCapability {
  id: ID;
  title: string;
  description: string;
  icon: string;
  category: 'review' | 'analysis' | 'automation' | 'integration';
}

// ============================================================================
// Onboarding Types
// ============================================================================

export interface OnboardingStep {
  id: ID;
  order: number;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  icon: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  required: boolean;
  substeps?: OnboardingSubstep[];
}

export interface OnboardingSubstep {
  id: ID;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingFlow {
  steps: OnboardingStep[];
  currentStep: number;
  totalSteps: number;
  estimatedTotalTime: number;
  completedSteps: number;
  progress: number; // percentage
}

export interface GitHubIntegrationConfig {
  permissions: GitHubPermission[];
  scopes: string[];
  webhooks: string[];
  estimatedSetupTime: number;
}

export interface GitHubPermission {
  resource: string;
  level: 'read' | 'write' | 'admin';
  description: string;
  required: boolean;
}

export interface RulesConfiguration {
  presets: RulePreset[];
  customRules: ReviewRule[];
  totalRules: number;
  activeRules: number;
}

export interface RulePreset {
  id: ID;
  name: string;
  description: string;
  rules: ReviewRule[];
  enabled: boolean;
  category: 'security' | 'performance' | 'style' | 'best-practices';
}

export interface ReviewRule {
  id: ID;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info' | 'suggestion';
  enabled: boolean;
  autoFix: boolean;
  examples?: CodeExample[];
}

export interface CodeExample {
  title: string;
  before: string;
  after: string;
  language: string;
}

// ============================================================================
// Comparison Types
// ============================================================================

export interface ComparisonMetric {
  id: ID;
  category: 'speed' | 'accuracy' | 'coverage' | 'cost' | 'availability';
  metric: string;
  alexValue: number | string;
  internValue: number | string;
  unit?: string;
  improvement: number; // percentage improvement
  displayFormat: 'number' | 'percentage' | 'time' | 'currency' | 'boolean';
  description?: string;
}

export interface ComparisonData {
  metrics: ComparisonMetric[];
  summary: {
    overallImprovement: number;
    keyBenefits: string[];
    costSavings: number;
    timeSavings: number;
  };
  disclaimer?: string;
}

// ============================================================================
// Interaction Types
// ============================================================================

export interface InteractionMethod {
  id: ID;
  type: 'chat' | 'voice' | 'api' | 'ui' | 'cli';
  title: string;
  description: string;
  icon: string;
  examples: InteractionExample[];
  supported: boolean;
  beta?: boolean;
}

export interface InteractionExample {
  input: string;
  output: string;
  context?: string;
}

export interface InteractiveDemo {
  id: ID;
  title: string;
  description: string;
  steps: DemoStep[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface DemoStep {
  id: ID;
  order: number;
  action: string;
  result: string;
  code?: string;
  highlight?: string[];
  duration: number;
}

// ============================================================================
// Workflow Types
// ============================================================================

export interface SubAgent {
  id: ID;
  name: string;
  role: string;
  description: string;
  avatar?: string;
  color: string;
  capabilities: string[];
  dependencies: ID[]; // IDs of other sub-agents
  status: 'idle' | 'active' | 'processing' | 'completed';
}

export interface WorkflowConnection {
  from: ID;
  to: ID;
  type: 'data' | 'trigger' | 'feedback' | 'control';
  label?: string;
  bidirectional: boolean;
}

export interface WorkflowData {
  subAgents: SubAgent[];
  connections: WorkflowConnection[];
  entryPoint: ID;
  exitPoints: ID[];
  description: string;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface AlexHeroSectionProps extends BaseComponentProps {
  profile: AlexAgentProfile;
  onOnboardClick?: () => void;
  analyticsEnabled?: boolean;
}

export interface AgentAvatarProps extends BaseComponentProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: 'eager' | 'lazy';
  fallback?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy';
}

export interface AgentIntroProps extends BaseComponentProps {
  tagline: string;
  description: string;
  animated?: boolean;
  typingSpeed?: number;
  showCursor?: boolean;
}

export interface OnboardCTAProps extends BaseComponentProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  trackingId?: string;
}

export interface OnboardingFlowSectionProps extends BaseComponentProps {
  flow: OnboardingFlow;
  githubConfig: GitHubIntegrationConfig;
  rulesConfig: RulesConfiguration;
  onStepClick?: (stepId: ID) => void;
  currentStep?: number;
}

export interface ComparisonSectionProps extends BaseComponentProps {
  data: ComparisonData;
  animated?: boolean;
  layout?: 'table' | 'cards' | 'chart';
  highlightWinners?: boolean;
}

export interface InteractionSectionProps extends BaseComponentProps {
  methods: InteractionMethod[];
  demos: InteractiveDemo[];
  activeMethod?: ID;
  onMethodChange?: (methodId: ID) => void;
}

export interface WorkflowSectionProps extends BaseComponentProps {
  data: WorkflowData;
  interactive?: boolean;
  onNodeClick?: (nodeId: ID) => void;
  onConnectionHover?: (connection: WorkflowConnection) => void;
  layout?: 'horizontal' | 'vertical' | 'circular';
}

// ============================================================================
// API Response Types
// ============================================================================

export interface AlexAgentApiResponse {
  profile: AlexAgentProfile;
  onboarding: OnboardingFlow;
  comparison: ComparisonData;
  interactions: {
    methods: InteractionMethod[];
    demos: InteractiveDemo[];
  };
  workflow: WorkflowData;
  metadata: {
    lastUpdated: Timestamp;
    version: string;
    status: Status;
  };
}

// ============================================================================
// State Management Types
// ============================================================================

export interface AlexPageState {
  isLoading: boolean;
  error: Error | null;
  profile: AlexAgentProfile | null;
  onboardingFlow: OnboardingFlow | null;
  comparisonData: ComparisonData | null;
  interactionMethods: InteractionMethod[];
  workflowData: WorkflowData | null;
  activeSection: 'hero' | 'onboarding' | 'comparison' | 'interaction' | 'workflow';
  analyticsEvents: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  type: 'page_view' | 'section_view' | 'cta_click' | 'demo_interaction' | 'node_click';
  section?: string;
  action?: string;
  label?: string;
  value?: number;
  timestamp: Timestamp;
  sessionId: string;
  userId?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type AlexAgentConfig = {
  apiEndpoint: string;
  enableAnalytics: boolean;
  enableAnimations: boolean;
  cacheTimeout: number;
  retryAttempts: number;
  mockMode?: boolean;
};

export type OnboardingStatus = 'not-started' | 'in-progress' | 'completed' | 'abandoned';

export type ReviewSeverity = 'critical' | 'major' | 'minor' | 'trivial';