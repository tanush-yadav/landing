# Task Configuration - Volition AI Employees Demo Workflows

## Engineering Tasks (Zoe - AI Engineer)

### 1. Fix the authentication bug in production

**Channel:** #development
**Initial Context:** Ticket contains customer screenshot showing login failure and Slack thread link

**Workflow:**

1. **Investigation Phase** (0-30s)

   - Zoe analyzes the customer screenshot: "Login failed after 2FA"
   - Reviews Slack thread for error patterns
   - Scans codebase: `/auth/middleware.ts`, `/auth/jwt-handler.ts`
   - **Points:** +50 for issue identification

2. **Root Cause Analysis** (30-60s)

   - Finds bug in JWT token refresh logic
   - Messages Slack: "Found it! JWT refresh token expires 2 hours early due to timezone mismatch in `auth/jwt-handler.ts:142`"
   - **Achievement Unlocked:** 🔍 "Bug Detective"

3. **Planning Phase** (60-90s)

   - Creates Linear subtasks:
     - Fix timezone calculation in JWT handler
     - Add unit tests for token expiry edge cases
     - Update error messages for better debugging
     - Add monitoring for auth failures
   - Sends detailed spec to Slack with code snippets
   - **Points:** +30 for planning

4. **Review & Refinement** (90-120s)

   - User highlights: "What about backward compatibility?"
   - Zoe refines: "Good catch! I'll add a migration script for existing sessions"
   - Updates plan with migration strategy
   - **Streak Bonus:** 3x efficiency multiplier

5. **Implementation** (120-180s)

   - Works through subtasks (progress bar fills)
   - Each subtask completed: +25 points
   - Creates PR #1247: "Fix JWT timezone bug affecting 2FA users"
   - Links PR to Linear ticket VOL-101

6. **Code Review** (180-210s)
   - Tags user: "@sarah PR ready for review"
   - CodeRabbit comments: "Missing error handling on line 156"
   - User adds: "Please add integration tests"
   - Zoe responds and fixes issues
   - **Final Score:** 280 points, Time saved: 4 hours

### 2. Add error handling to the payment API

**Channel:** #development
**Initial Context:** Stripe webhooks are failing silently, causing missed payments

**Workflow:**

1. **Analysis Phase** (0-30s)

   - Reviews `/api/payments/stripe-webhook.ts`
   - Identifies missing try-catch blocks
   - Checks error logs in DataDog
   - **Points:** +40 for analysis

2. **Strategy Planning** (30-60s)

   - Messages: "Found 7 unhandled webhook scenarios. Creating comprehensive error handling"
   - Creates subtasks:
     - Add retry logic with exponential backoff
     - Implement webhook signature validation
     - Add error queue for failed payments
     - Create alerting for payment failures
     - Add detailed logging

3. **Implementation** (60-120s)

   - Implements custom error classes
   - Adds retry mechanism: 3 attempts with backoff
   - Creates error recovery queue
   - **Achievement:** ⚡ "Payment Guardian"

4. **Testing & Validation** (120-150s)

   - Writes test cases for each error scenario
   - Simulates webhook failures
   - Validates retry logic works
   - **Streak:** 5 tasks without errors

5. **Deployment** (150-180s)
   - Creates PR with comprehensive error handling
   - Adds monitoring dashboard
   - Documents error codes
   - **Final Score:** 320 points

### 3. Write unit tests for the user service

**Channel:** #development
**Initial Context:** User service has 0% test coverage, causing production bugs

**Workflow:**

1. **Coverage Analysis** (0-20s)

   - Scans `/services/user-service.ts`
   - Identifies 23 untested methods
   - **Points:** +30

2. **Test Planning** (20-50s)

   - Messages: "Creating comprehensive test suite. Target: 95% coverage"
   - Groups tests by functionality:
     - CRUD operations (8 tests)
     - Authentication (6 tests)
     - Permissions (5 tests)
     - Data validation (4 tests)

3. **Test Implementation** (50-120s)

   - Uses Jest framework
   - Writes tests with proper mocking
   - Each test suite completed: +40 points
   - **Achievement:** 🎯 "Coverage Champion"

4. **Edge Cases** (120-150s)

   - Adds edge case tests
   - Tests error scenarios
   - Validates async operations
   - **Current Coverage:** 96%

5. **Review** (150-180s)
   - Runs full test suite: All green ✅
   - Creates PR with 96% coverage
   - **Final Score:** 280 points, 23 tests added

## Content Tasks (Bella - AI Content Creator)

### 1. Write blog post about Q4 product updates

**Channel:** #content
**Initial Context:** Q4 launches need announcement blog for 5 new features

**Workflow:**

1. **Research Phase** (0-30s)

   - Bella analyzes product knowledge base
   - Reviews feature specs and user feedback
   - Messages: "I've identified 5 key features. Which angle resonates most: technical deep-dive or business value?"
   - **Points:** +40 for research

2. **Brief Creation** (30-60s)

   - User responds: "Business value with technical snippets"
   - Bella creates brief:
     - Target: CTOs and engineering leads
     - Tone: Professional but approachable
     - Length: 1,800 words
     - SEO focus: "API automation", "developer productivity"
   - **Achievement:** 📝 "Brief Master"

3. **Reference Validation** (60-90s)

   - Verifies 12 statistics and benchmarks
   - Corrects 2 outdated references
   - Adds 3 customer quotes
   - Messages: "Brief ready for review. All references verified ✓"

4. **Review & Refinement** (90-120s)

   - User requests: "Add ROI calculator section"
   - Bella updates brief with calculator specs
   - Creates review subtasks in Linear
   - **Streak:** 10 posts without major revisions

5. **Content Generation** (120-180s)

   - Writes post matching brand voice
   - Includes code examples
   - Adds visuals placeholders
   - Progress bar shows: 500...1000...1500...1800 words
   - **Points:** +100 for full draft

6. **Style Review** (180-210s)

   - Checks brand voice consistency
   - Validates technical accuracy
   - Optimizes for SEO
   - Messages: "Draft complete. Flesch reading score: 62 (target range)"

7. **Final Edits** (210-240s)
   - User requests 3 line edits
   - Writer makes final polish
   - 3 team approvals received
   - Bella publishes: "Live at blog.volition.ai/q4-updates"
   - **Final Score:** 380 points

### 2. Create email campaign for new feature launch

**Channel:** #content
**Initial Context:** AI Code Review feature launching next week, need email sequence

**Workflow:**

1. **Audience Segmentation** (0-30s)

   - Analyzes customer database
   - Creates 3 segments: Enterprise, Startup, Individual
   - **Points:** +30

2. **Campaign Strategy** (30-60s)

   - Messages: "Creating 3-email sequence for each segment"
   - Plans timeline:
     - Email 1: Announcement (Launch day)
     - Email 2: Use cases (Day 3)
     - Email 3: Limited offer (Day 7)

3. **Content Creation** (60-120s)

   - Writes personalized subject lines
   - Creates segment-specific content
   - Adds CTAs and tracking
   - **Achievement:** 📧 "Campaign Architect"

4. **A/B Testing Setup** (120-150s)

   - Creates 2 subject line variants
   - Sets up CTA testing
   - Configures tracking pixels

5. **Review & Launch** (150-180s)
   - Gets approval from marketing lead
   - Schedules campaign
   - **Final Score:** 240 points

### 3. Update help documentation for API changes

**Channel:** #content
**Initial Context:** v2.0 API has 15 breaking changes, docs need urgent update

**Workflow:**

1. **Change Analysis** (0-30s)

   - Reviews API changelog
   - Identifies affected endpoints
   - Lists deprecated methods
   - **Points:** +50

2. **Documentation Planning** (30-60s)

   - Messages: "Found 15 breaking changes, 23 new endpoints. Creating migration guide"
   - Creates doc structure:
     - Breaking changes guide
     - New endpoint reference
     - Code migration examples
     - FAQ section

3. **Content Update** (60-120s)

   - Updates 47 documentation pages
   - Adds code examples in 5 languages
   - Creates interactive API explorer
   - **Achievement:** 📚 "Doc Champion"

4. **Technical Review** (120-150s)

   - Engineering team validates accuracy
   - Tests all code examples
   - Fixes 3 minor issues

5. **Publishing** (150-180s)
   - Deploys to docs.volition.ai
   - Notifies customers via email
   - **Final Score:** 290 points

## Sales Tasks (Alex - AI Sales Assistant)

### 1. Qualify leads from yesterday's webinar

**Channel:** #sales
**Initial Context:** 247 attendees from "AI in DevOps" webinar need qualification

**Workflow:**

1. **Lead Import** (0-20s)

   - Imports attendee list to HubSpot
   - Enriches data with Clearbit
   - **Points:** +30

2. **Scoring Analysis** (20-60s)

   - Applies BANT criteria
   - Identifies 43 qualified leads
   - Messages: "Found 43 MQLs: 12 Enterprise, 19 Mid-market, 12 SMB"
   - **Achievement:** 🎯 "Lead Hunter"

3. **Segmentation** (60-90s)

   - Creates targeted lists:
     - Hot (ready to buy): 8 leads
     - Warm (evaluating): 21 leads
     - Nurture (future potential): 14 leads

4. **Personalized Outreach** (90-120s)

   - Drafts personalized emails for hot leads
   - Creates follow-up sequences
   - Schedules calls for AEs
   - **Streak:** 15 webinars analyzed

5. **CRM Update** (120-150s)
   - Updates lead scores
   - Adds webinar engagement data
   - Sets follow-up tasks
   - **Final Score:** 220 points

### 2. Research competitor pricing for Enterprise deals

**Channel:** #sales
**Initial Context:** Enterprise prospect asking for comparison with GitHub Copilot, Tabnine

**Workflow:**

1. **Data Collection** (0-40s)

   - Scrapes competitor pricing pages
   - Analyzes feature matrices
   - Reviews G2 comparisons
   - **Points:** +60

2. **Comparison Matrix** (40-80s)

   - Creates detailed comparison:
     - Pricing tiers
     - Feature availability
     - Support levels
     - Integration options
   - Messages: "Volition offers 40% more value at Enterprise tier"

3. **Battle Card Creation** (80-120s)

   - Builds sales battle card
   - Adds win/loss insights
   - Includes objection handling
   - **Achievement:** 🛡️ "Competitive Intel"

4. **Presentation Prep** (120-150s)

   - Creates exec summary
   - Builds pricing calculator
   - Adds ROI projections

5. **Delivery** (150-180s)
   - Shares with sales team
   - Updates pricing strategy
   - **Final Score:** 260 points

### 3. Update CRM with meeting notes from demos

**Channel:** #sales
**Initial Context:** 8 demos completed yesterday, notes scattered in notebooks

**Workflow:**

1. **Note Collection** (0-30s)

   - Gathers notes from 8 AEs
   - Transcribes call recordings
   - **Points:** +40

2. **Data Extraction** (30-60s)

   - Extracts key points:
     - Pain points discussed
     - Features demoed
     - Objections raised
     - Next steps agreed

3. **CRM Updates** (60-120s)

   - Updates opportunity stages
   - Adds meeting summaries
   - Sets follow-up tasks
   - Links relevant collateral
   - **Achievement:** 📊 "Data Hygienist"

4. **Action Items** (120-150s)

   - Creates 23 follow-up tasks
   - Assigns to team members
   - Sets due dates

5. **Analytics** (150-180s)
   - Updates pipeline forecast
   - Identifies trends
   - **Final Score:** 200 points

## Operations Tasks (Morgan - AI Operations Specialist)

### 1. Audit AWS costs and identify savings

**Channel:** #operations
**Initial Context:** AWS bill increased 40% last month, need immediate audit

**Workflow:**

1. **Cost Analysis** (0-30s)

   - Connects to AWS Cost Explorer
   - Analyzes service breakdown
   - Messages: "Found it! 67% of increase from forgotten dev environments"
   - **Points:** +70

2. **Waste Identification** (30-60s)

   - Identifies:
     - 14 unused EC2 instances ($3,400/month)
     - 8 unattached EBS volumes ($890/month)
     - Overprovisioned RDS instances ($2,100/month)
   - **Achievement:** 💰 "Cost Cutter"

3. **Savings Plan** (60-90s)

   - Creates action plan:
     - Immediate: Terminate unused resources
     - Short-term: Right-size instances
     - Long-term: Reserved instances
   - Total savings: $6,390/month

4. **Implementation** (90-120s)

   - Terminates unused resources
   - Schedules auto-shutdown for dev
   - Implements tagging strategy
   - **Streak:** $50K saved this quarter

5. **Monitoring Setup** (120-150s)

   - Creates cost alerts
   - Builds dashboard
   - Sets up weekly reports

6. **Documentation** (150-180s)
   - Documents changes
   - Creates runbook
   - **Final Score:** 340 points

### 2. Set up monitoring alerts for the API

**Channel:** #operations
**Initial Context:** API experiencing intermittent issues, no visibility

**Workflow:**

1. **Metrics Definition** (0-30s)

   - Identifies key metrics:
     - Response time (p50, p95, p99)
     - Error rate
     - Request volume
     - Database connection pool
   - **Points:** +50

2. **DataDog Configuration** (30-90s)

   - Sets up monitors:
     - Alert: Response time > 500ms for 5 min
     - Warning: Error rate > 1%
     - Critical: Error rate > 5%
   - Messages: "Configured 12 monitors covering all critical paths"

3. **Dashboard Creation** (90-120s)

   - Builds real-time dashboard
   - Adds historical trends
   - Creates SLO tracking
   - **Achievement:** 📊 "Monitoring Master"

4. **Alert Routing** (120-150s)

   - Configures PagerDuty integration
   - Sets up escalation policy
   - Tests alert flow

5. **Documentation** (150-180s)
   - Creates runbook for each alert
   - Documents response procedures
   - **Final Score:** 280 points

### 3. Document the deployment process

**Channel:** #operations
**Initial Context:** New engineers struggling with deployment, no documentation exists

**Workflow:**

1. **Process Mapping** (0-30s)

   - Maps current deployment flow
   - Identifies 5 environments
   - Lists all prerequisites
   - **Points:** +40

2. **Documentation Creation** (30-90s)

   - Writes step-by-step guide:
     - Local development setup
     - GitHub Actions workflow
     - Staging deployment
     - Production deployment
     - Rollback procedures
   - Messages: "Created 20-page deployment guide with diagrams"

3. **Automation Opportunities** (90-120s)

   - Identifies manual steps to automate
   - Creates deployment scripts
   - Adds validation checks
   - **Achievement:** 📝 "Process Pro"

4. **Review & Testing** (120-150s)

   - Team validates documentation
   - New engineer tests guide
   - Fixes 2 unclear sections

5. **Publishing** (150-180s)
   - Publishes to team wiki
   - Creates quick reference card
   - Schedules training session
   - **Final Score:** 240 points
