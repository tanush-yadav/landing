/**
 * Blog Posts Data
 * 
 * Sample blog posts for the Cintra AI platform
 * Following the brand voice and content strategy from the specification
 */

import { BlogPost, BlogCategory, BlogTag } from '@/lib/types';

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    slug: 'engineering',
    description: 'AI automation for development teams',
    color: 'bg-blue-500',
    postCount: 3
  },
  {
    id: 'content',
    name: 'Content',
    slug: 'content',
    description: 'Content strategy and AI writing tools',
    color: 'bg-purple-500',
    postCount: 2
  },
  {
    id: 'sales',
    name: 'Sales',
    slug: 'sales',
    description: 'AI-powered sales automation',
    color: 'bg-green-500',
    postCount: 2
  },
  {
    id: 'operations',
    name: 'Operations',
    slug: 'operations',
    description: 'Operational efficiency with AI',
    color: 'bg-orange-500',
    postCount: 2
  }
];

// Blog Tags
export const blogTags: BlogTag[] = [
  { name: 'AI Automation', slug: 'ai-automation', postCount: 8 },
  { name: 'Productivity', slug: 'productivity', postCount: 6 },
  { name: 'Workflows', slug: 'workflows', postCount: 5 },
  { name: 'Best Practices', slug: 'best-practices', postCount: 4 },
  { name: 'Team Management', slug: 'team-management', postCount: 3 },
  { name: 'Integration', slug: 'integration', postCount: 4 },
  { name: 'Analytics', slug: 'analytics', postCount: 2 },
  { name: 'Strategy', slug: 'strategy', postCount: 3 }
];

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'AI Automation Best Practices for Engineering Teams',
    excerpt: 'Learn how to implement effective AI workflows that boost engineering productivity while maintaining code quality and team collaboration.',
    content: `# AI Automation Best Practices for Engineering Teams

Engineering teams today face increasing pressure to deliver faster while maintaining high quality standards. AI automation offers a solution, but implementing it effectively requires careful planning and best practices.

## Getting Started with AI Automation

The key to successful AI automation in engineering lies in identifying repetitive tasks that consume valuable developer time:

- Code reviews and quality checks
- Bug triaging and initial analysis
- Documentation generation
- Test case creation
- Deployment monitoring

## Implementation Strategy

### 1. Start Small and Scale Gradually

Begin with non-critical tasks to build confidence and understanding:

\`\`\`bash
# Example: Automated code formatting
npm run lint:fix
npm run format
\`\`\`

### 2. Maintain Human Oversight

AI should augment, not replace human decision-making:

- Review AI-generated code before merging
- Validate automated test results
- Monitor AI decision patterns

### 3. Measure and Iterate

Track key metrics to ensure AI automation delivers value:

- Time saved on repetitive tasks
- Code quality improvements
- Developer satisfaction scores
- Deployment frequency

## Common Pitfalls to Avoid

- Over-automating critical decision points
- Insufficient testing of AI workflows
- Lack of team training on AI tools
- Ignoring security implications

## Conclusion

AI automation, when implemented thoughtfully, can significantly boost engineering team productivity. Start with small experiments, measure results, and scale successful patterns across your organization.`,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, specializing in engineering automation and developer productivity',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai'
      }
    },
    publishedAt: '2025-09-01T10:00:00Z',
    readTime: 8,
    tags: ['AI Automation', 'Best Practices', 'Productivity', 'Workflows'],
    category: 'Engineering',
    featuredImage: '/blog/ai-engineering-automation.jpg',
    slug: 'ai-automation-best-practices-engineering-teams',
    status: 'published',
    seo: {
      metaTitle: 'AI Automation Best Practices for Engineering Teams | Cintra',
      metaDescription: 'Discover proven strategies for implementing AI automation in engineering workflows. Boost productivity while maintaining code quality.',
      keywords: ['AI automation', 'engineering productivity', 'developer tools', 'workflow optimization'],
      canonicalUrl: 'https://cintra.run/blog/ai-automation-best-practices-engineering-teams'
    }
  },
  {
    id: '2',
    title: 'Transforming Content Strategy with AI Workflows',
    excerpt: 'Discover how AI can revolutionize your content creation process, from ideation to publication, while maintaining brand voice and quality.',
    content: `# Transforming Content Strategy with AI Workflows

Content teams are under constant pressure to produce high-quality, engaging content at scale. AI workflows offer a path to increased efficiency without sacrificing creativity or brand consistency.

## The Modern Content Challenge

Today's content teams face several key challenges:

- Increasing demand for content across multiple channels
- Need for consistent brand voice and messaging
- Time-consuming research and fact-checking
- Complex approval and publication workflows

## AI-Powered Content Workflows

### 1. Ideation and Research

AI can help generate content ideas and conduct initial research:

- Topic trend analysis
- Competitor content gap identification
- SEO keyword optimization
- Audience interest prediction

### 2. Content Creation

Streamline the writing process with AI assistance:

- First draft generation
- Grammar and style checking
- Tone consistency validation
- Multi-format content adaptation

### 3. Review and Optimization

Automate quality assurance processes:

- Brand voice compliance checking
- SEO optimization suggestions
- Readability analysis
- Performance prediction

## Implementation Framework

### Phase 1: Assessment
- Audit current content processes
- Identify automation opportunities
- Define success metrics

### Phase 2: Pilot Program
- Select low-risk content types
- Implement AI tools gradually
- Train team on new workflows

### Phase 3: Scale and Optimize
- Expand to additional content types
- Refine AI prompts and processes
- Measure and improve performance

## Maintaining Quality and Brand Voice

While AI can significantly speed up content production, maintaining quality requires:

- Clear brand guidelines for AI tools
- Human oversight at key decision points
- Regular quality audits
- Continuous tool training and improvement

## Results and Benefits

Content teams using AI workflows typically see:

- 40-60% reduction in content production time
- Improved consistency across channels
- Better SEO performance
- Higher team satisfaction

## Getting Started

Ready to transform your content strategy? Start with these steps:

1. Identify your biggest content bottlenecks
2. Research AI tools that address those challenges
3. Run a small pilot program
4. Measure results and iterate

The future of content is AI-augmented, not AI-replaced. Focus on using AI to handle repetitive tasks while your team focuses on strategy and creativity.`,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, expert in content strategy and automated workflows',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai'
      }
    },
    publishedAt: '2025-08-28T14:00:00Z',
    readTime: 7,
    tags: ['AI Automation', 'Strategy', 'Productivity', 'Best Practices'],
    category: 'Content',
    featuredImage: '/blog/content-strategy-ai.jpg',
    slug: 'transforming-content-strategy-ai-workflows',
    status: 'published',
    seo: {
      metaTitle: 'Transform Content Strategy with AI Workflows | Cintra',
      metaDescription: 'Learn how AI workflows can revolutionize content creation while maintaining brand voice and quality standards.',
      keywords: ['content strategy', 'AI workflows', 'content automation', 'brand consistency']
    }
  },
  {
    id: '3',
    title: 'Sales Automation: From Lead Qualification to Deal Closure',
    excerpt: 'Explore how AI can streamline your entire sales funnel, improving lead quality and closing rates while freeing up time for relationship building.',
    content: `# Sales Automation: From Lead Qualification to Deal Closure

Sales teams are constantly looking for ways to work more efficiently while maintaining the personal touch that closes deals. AI automation offers powerful solutions across the entire sales funnel.

## The Sales Automation Opportunity

Modern sales teams handle numerous time-consuming tasks:

- Lead qualification and scoring
- Research on prospects and companies
- CRM data entry and management
- Follow-up scheduling and reminders
- Proposal generation
- Performance tracking and reporting

## AI Automation Across the Sales Funnel

### Lead Generation and Qualification

AI can dramatically improve lead quality:

- Intent signal analysis
- Lead scoring based on behavior
- Automated qualification surveys
- Prospect research compilation

### Sales Intelligence

Empower your team with AI-powered insights:

- Company and contact enrichment
- Competitive analysis
- Buying signal detection
- Optimal contact timing

### Communication Automation

Streamline repetitive communications:

- Personalized email sequences
- Meeting scheduling coordination
- Follow-up reminders
- Proposal template customization

### CRM Management

Keep your data clean and actionable:

- Automatic data entry from emails
- Contact and company updates
- Deal stage progression
- Activity logging and analysis

## Implementation Best Practices

### 1. Start with Data Quality

Clean, organized data is crucial for effective AI:

- Audit existing CRM data
- Establish data entry standards
- Implement validation rules
- Regular data cleanup processes

### 2. Define Clear Processes

Map out your ideal sales process:

- Lead qualification criteria
- Sales stage definitions
- Communication templates
- Approval workflows

### 3. Train Your Team

Ensure adoption with proper training:

- Tool demonstrations
- Best practice sharing
- Regular check-ins
- Performance tracking

## Measuring Success

Key metrics to track:

- Lead-to-opportunity conversion rate
- Sales cycle length
- Deal size and win rate
- Sales rep productivity
- Customer satisfaction scores

## Common Implementation Challenges

### Data Privacy and Compliance

Ensure your automation respects:

- GDPR and privacy regulations
- Company data policies
- Customer communication preferences
- Security requirements

### Balancing Automation and Personalization

Maintain the human touch:

- Personalize automated messages
- Flag high-value prospects for manual attention
- Regular relationship check-ins
- Custom approach for enterprise deals

## ROI and Results

Sales teams implementing AI automation typically see:

- 25-30% increase in qualified leads
- 20-25% shorter sales cycles
- 15-20% improvement in win rates
- 40-50% time savings on administrative tasks

## Getting Started with Sales Automation

1. **Assess Your Current Process**: Identify bottlenecks and repetitive tasks
2. **Choose the Right Tools**: Select AI platforms that integrate with your CRM
3. **Start Small**: Begin with lead qualification or email automation
4. **Measure and Iterate**: Track results and refine your approach
5. **Scale Gradually**: Expand to additional sales process areas

## The Future of AI-Powered Sales

Sales automation is evolving rapidly with advances in:

- Predictive analytics
- Natural language processing
- Real-time conversation analysis
- Advanced personalization

Teams that embrace AI automation now will have a significant competitive advantage as these technologies mature.

## Conclusion

AI automation isn't about replacing salespeople—it's about empowering them to focus on what they do best: building relationships and closing deals. By automating routine tasks, sales teams can spend more time on high-value activities that drive revenue growth.`,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, specializing in sales automation and CRM optimization',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai'
      }
    },
    publishedAt: '2025-08-25T09:30:00Z',
    readTime: 10,
    tags: ['AI Automation', 'Team Management', 'Analytics', 'Best Practices'],
    category: 'Sales',
    featuredImage: '/blog/sales-automation-funnel.jpg',
    slug: 'sales-automation-lead-qualification-deal-closure',
    status: 'published',
    seo: {
      metaTitle: 'Sales Automation: From Lead Qualification to Deal Closure | Cintra',
      metaDescription: 'Discover how AI can streamline your entire sales funnel, improving lead quality and closing rates.',
      keywords: ['sales automation', 'lead qualification', 'CRM automation', 'sales efficiency']
    }
  },
  {
    id: '4',
    title: 'Building Resilient Operations with AI Monitoring',
    excerpt: 'Learn how AI-powered monitoring can predict issues before they impact your business and automate incident response workflows.',
    content: `# Building Resilient Operations with AI Monitoring

Operations teams are the backbone of reliable services, but traditional monitoring approaches often result in alert fatigue and reactive firefighting. AI-powered monitoring offers a proactive solution.

## The Challenge of Modern Operations

Today's operations teams face complex challenges:

- Overwhelming number of alerts and false positives
- Difficulty correlating issues across systems
- Manual incident response processes
- Limited visibility into system dependencies
- Reactive rather than proactive approach

## AI-Powered Monitoring Solutions

### Intelligent Alert Management

AI can dramatically reduce alert noise:

- Pattern recognition to reduce false positives
- Alert correlation and deduplication
- Severity prediction and prioritization
- Automated escalation based on impact

### Predictive Analytics

Identify issues before they impact users:

- Anomaly detection in metrics and logs
- Capacity planning and resource optimization
- Performance degradation prediction
- Failure pattern recognition

### Automated Incident Response

Speed up resolution with AI workflows:

- Automatic incident classification
- Runbook execution and troubleshooting
- Resource allocation and scaling
- Stakeholder communication

## Implementation Strategy

### Phase 1: Foundation
- Centralize monitoring data
- Establish baseline metrics
- Define SLOs and alerting thresholds
- Implement basic automation

### Phase 2: Intelligence
- Deploy ML-based anomaly detection
- Implement alert correlation
- Create automated response workflows
- Build predictive models

### Phase 3: Optimization
- Continuous model improvement
- Advanced predictive analytics
- Cross-system intelligence
- Business impact correlation

## Key Technologies and Tools

### Monitoring Platforms
- Observability platforms with AI capabilities
- Log aggregation and analysis
- Infrastructure and application monitoring
- Business metrics correlation

### AI/ML Components
- Anomaly detection algorithms
- Time series forecasting
- Natural language processing for logs
- Graph analysis for dependencies

## Best Practices

### 1. Start with Quality Data

Ensure your monitoring foundation is solid:

- Consistent metric naming and labeling
- Proper instrumentation coverage
- Data retention and quality policies
- Clear ownership and responsibilities

### 2. Define Clear Objectives

Set specific goals for AI monitoring:

- Reduce mean time to detection (MTTD)
- Improve mean time to resolution (MTTR)
- Decrease alert fatigue
- Increase system uptime

### 3. Iterate and Improve

Continuously refine your AI models:

- Regular model retraining
- Feedback loops for false positives
- Alert quality measurement
- Performance metric tracking

## Common Pitfalls to Avoid

- Over-relying on AI without human oversight
- Insufficient training data for models
- Ignoring business context in alerts
- Poor change management and communication

## Measuring Success

Track these key metrics:

- Alert volume and false positive rate
- Mean time to detection and resolution
- System uptime and availability
- Team satisfaction and productivity
- Business impact of incidents

## Case Study: Infrastructure Cost Optimization

One of our clients used AI monitoring to:

- Identify underutilized resources automatically
- Predict capacity needs 2-3 weeks in advance  
- Automate scaling decisions
- Result: 30% reduction in infrastructure costs

## The Future of AI Operations

Emerging trends include:

- AIOps platforms with comprehensive intelligence
- Self-healing systems and auto-remediation
- Chaos engineering with AI analysis
- Business impact prediction and optimization

## Getting Started

1. **Assess Current State**: Audit existing monitoring and alerting
2. **Identify Pain Points**: Focus on biggest operational challenges
3. **Select AI Tools**: Choose platforms that fit your stack
4. **Start Small**: Implement in non-critical systems first
5. **Measure and Scale**: Track results and expand gradually

## Conclusion

AI-powered monitoring transforms operations from reactive to proactive, reducing downtime and improving team efficiency. Start with solid monitoring foundations, then layer on AI capabilities to build truly resilient operations.

The goal isn't to replace operations teams with AI, but to empower them with intelligent tools that prevent problems before they impact your business.`,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, expert in AI-powered operations and monitoring',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai'
      }
    },
    publishedAt: '2025-08-22T11:15:00Z',
    readTime: 9,
    tags: ['AI Automation', 'Analytics', 'Integration', 'Best Practices'],
    category: 'Operations',
    featuredImage: '/blog/ai-monitoring-dashboard.jpg',
    slug: 'building-resilient-operations-ai-monitoring',
    status: 'published',
    seo: {
      metaTitle: 'Building Resilient Operations with AI Monitoring | Cintra',
      metaDescription: 'Learn how AI-powered monitoring can predict issues and automate incident response workflows.',
      keywords: ['AI monitoring', 'operations automation', 'incident response', 'predictive analytics']
    }
  },
  {
    id: '5',
    title: 'The Future of Work: AI Agents as Team Members',
    excerpt: 'Explore how AI agents are evolving from tools to collaborative team members, reshaping the future of work and productivity.',
    content: `# The Future of Work: AI Agents as Team Members

We're witnessing a fundamental shift in how AI integrates with human teams. AI agents are evolving from simple automation tools into collaborative team members that can reason, adapt, and contribute to complex projects.

## Evolution of AI in the Workplace

### From Tools to Teammates

Traditional AI implementations focused on:
- Automating repetitive tasks
- Providing data insights
- Streamlining workflows

Modern AI agents offer:
- Contextual understanding
- Multi-step problem solving
- Collaborative decision making
- Adaptive learning from team interactions

### The Agent-Human Partnership

Successful AI integration requires reimagining team dynamics:

**Human Strengths:**
- Creative problem solving
- Emotional intelligence
- Strategic thinking
- Relationship building

**AI Agent Strengths:**
- Consistent execution
- Data processing at scale
- 24/7 availability
- Pattern recognition

## Real-World Implementation

### Engineering Teams

AI agents can serve as:
- **Code Review Partners**: Analyzing PRs for best practices
- **Testing Coordinators**: Managing test suites and coverage
- **Documentation Specialists**: Keeping docs current with code
- **Infrastructure Monitors**: Proactive system optimization

### Content Teams

AI agents excel as:
- **Research Assistants**: Gathering and analyzing information
- **Content Editors**: Ensuring brand voice consistency
- **SEO Specialists**: Optimizing for search and engagement
- **Publication Managers**: Coordinating multi-channel distribution

### Sales Teams

AI agents function as:
- **Prospect Researchers**: Deep-diving into potential clients
- **Meeting Preparers**: Briefing reps before important calls
- **Follow-up Coordinators**: Managing post-meeting actions
- **Performance Analysts**: Identifying optimization opportunities

## Best Practices for AI Agent Integration

### 1. Define Clear Roles and Responsibilities

**Establish boundaries:**

AI Agent Responsibilities:
- Data collection and analysis
- Initial drafts and templates  
- Process monitoring and alerts
- Routine task execution

Human Responsibilities:
- Strategic decision making
- Client relationship management
- Creative problem solving
- Quality validation

### 2. Create Effective Communication Channels

- **Structured Updates**: Regular AI agent reports
- **Exception Handling**: Clear escalation procedures
- **Feedback Loops**: Continuous improvement mechanisms
- **Transparency**: Visible AI decision making

### 3. Implement Gradual Integration

**Phase 1: Observer**
- AI agent monitors and reports
- Minimal decision authority
- High human oversight

**Phase 2: Assistant** 
- AI agent handles routine tasks
- Limited autonomous actions
- Regular check-ins required

**Phase 3: Collaborator**
- AI agent participates in planning
- Autonomous task execution
- Strategic input valued

## Overcoming Integration Challenges

### Technical Challenges

**Data Access and Quality**
- Ensure AI agents have necessary data access
- Maintain data quality standards
- Implement security protocols

**System Integration**
- Connect AI agents to existing tools
- Manage API limitations and costs
- Handle version updates and changes

### Cultural Challenges

**Team Acceptance**
- Communicate AI agent benefits clearly
- Provide training and support
- Address job security concerns
- Celebrate early wins

**Workflow Adaptation**
- Redesign processes for AI collaboration
- Adjust communication patterns
- Redefine success metrics
- Update team structures

## Measuring AI Agent Impact

### Quantitative Metrics

- **Productivity Gains**: Tasks completed per unit time
- **Quality Improvements**: Error rates and consistency
- **Cost Reductions**: Resource optimization
- **Speed Increases**: Time to completion

### Qualitative Metrics

- **Team Satisfaction**: Survey feedback and engagement
- **Work Quality**: Subjective assessment improvements  
- **Innovation**: New solutions and approaches
- **Learning**: Skill development and knowledge growth

## The Road Ahead

### Emerging Capabilities

**Advanced Reasoning**
- Multi-step problem decomposition
- Causal reasoning and inference
- Hypothesis testing and validation

**Enhanced Collaboration**
- Natural language team communication
- Contextual awareness of team dynamics
- Adaptive behavior based on team preferences

**Specialized Intelligence**
- Domain-specific expertise
- Industry knowledge integration
- Custom skill development

### Preparing Your Organization

1. **Assess Readiness**: Evaluate technical and cultural preparedness
2. **Start Small**: Pilot with receptive teams and clear use cases
3. **Invest in Training**: Develop AI collaboration skills
4. **Plan for Scale**: Design sustainable integration approaches
5. **Stay Adaptive**: Prepare for rapid technological evolution

## Ethical Considerations

### Transparency and Trust

- Clear disclosure of AI agent capabilities
- Visible decision-making processes
- Regular performance audits
- Human oversight mechanisms

### Privacy and Security

- Data protection protocols
- Access control and authentication
- Audit trails and accountability
- Compliance with regulations

### Fairness and Bias

- Regular bias testing and mitigation
- Diverse training data sources
- Inclusive design principles
- Equal access to AI benefits

## Conclusion

The future of work isn't about AI replacing humans—it's about AI agents becoming valued team members who amplify human capabilities. Organizations that successfully integrate AI agents as collaborative partners will have significant competitive advantages.

Start small, focus on clear value creation, and gradually build trust between human and AI team members. The future of productive, fulfilling work lies in this collaboration.

The question isn't whether AI agents will join your team—it's how quickly you can make them effective teammates.`,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, researcher in human-AI collaboration and workplace transformation',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai'
      }
    },
    publishedAt: '2025-08-20T08:00:00Z',
    readTime: 12,
    tags: ['AI Automation', 'Team Management', 'Strategy', 'Productivity'],
    category: 'Operations',
    featuredImage: '/blog/ai-agents-teammates.jpg',
    slug: 'future-of-work-ai-agents-team-members',
    status: 'published',
    seo: {
      metaTitle: 'The Future of Work: AI Agents as Team Members | Cintra',
      metaDescription: 'Explore how AI agents are evolving from tools to collaborative team members, reshaping the future of work.',
      keywords: ['AI agents', 'future of work', 'human-AI collaboration', 'workplace transformation']
    }
  }
];

// Helper functions for working with blog data
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.status === 'published');
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === categorySlug.toLowerCase() && 
    post.status === 'published'
  );
};

export const getPostsByTag = (tagSlug: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === tagSlug.toLowerCase()) &&
    post.status === 'published'
  );
};

export const getPostsByAuthor = (authorName: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.author.name.toLowerCase() === authorName.toLowerCase() &&
    post.status === 'published'
  );
};

export const searchPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return blogPosts.filter(post => 
    post.status === 'published' && (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
    )
  );
};

export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};