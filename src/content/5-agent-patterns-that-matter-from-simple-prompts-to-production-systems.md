---
title: 'The 5 Agent Patterns That Matter: From Simple Prompts to Production Systems'
excerpt: "I burned three weeks building an orchestration nightmare. Then I shipped 100 images in 48 hours with a for-loop. Here's why complexity is your enemy in agent systems."
date: '2025-09-01'
author: 'Tanush Yadav'
authorAvatar: '/images/team/tanush.jpg'
category: 'Engineering'
tags: ['ai-agents', 'production', 'system-design', 'engineering']
image: '/images/blog/default_4.jpg'
slug: 'the-5-agent-patterns-that-matter-from-simple-prompts-to-production-systems'
linear_id: 'VOL-33'
featured: true
---

# The 5 Agent Patterns That Matter: From Simple Prompts to Production Systems

**I burned three weeks building an orchestration nightmare. Then I shipped 100 images in 48 hours with a for-loop.** Here's why complexity is your enemy in agent systems—and the exact pattern hierarchy that actually works.

## The Pattern Stack (Least to Most Complex)

1. **Why Your First Agent Should Be You** - Direct feedback, rapid iteration
2. **Reusable prompts** - Parameterized templates with tests
3. **Sub-agents** - Specialized tasks with parallelization
4. **MCP wrappers** - Production-grade integration layer
5. **Full applications** - Queues, observability, SLAs

Patterns 3-5 seduce with elegance—patterns 1-2 ship products.

## Pattern 1: Why Your First Agent Should Be You

**When to use:** Unclear requirements, aesthetic decisions, new domains.

Anchor here. Everything else builds on this foundation.

### My 100-Image Sprint Process

**Hour 0-2 results:**

- Generated 20 test images manually
- Tracked acceptance rate (30% → 65%)
- The breakthrough: switching from "professional" to "isometric" eliminated 70% of rejections
- Stakeholders wanted consistency, not creativity—locked 4 reusable styles

### Minimal Implementation

```python
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def single_image(prompt, size="1024x1024"):
    resp = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size=size
    )
    return resp.data[0].b64_json

prompt = "Isometric illustration, clean data pipeline, #0A84FF and #111827, minimal, high contrast"
img = single_image(prompt)
```

**Key metrics to track:**

- Acceptance rate (% shipped without edits)
- Edit distance (words changed per iteration)
- Time to first acceptable result

## Pattern 2: Reusable Prompts (80% of Value Lives Here)

**When to use:** Repeated tasks, consistent output needs, team collaboration.

Stable prompts become parameterized functions—agents wait.

### Implementation with Tests

```python
BASE_STYLE = "Minimal, high contrast, brand colors (#0A84FF, #111827), crisp edges"
ASPECT_MAP = {"slide": "1792x1024", "square": "1024x1024"}

def image_prompt(theme, style="isometric", variant="A"):
    components = {
        "isometric": "Isometric illustration, soft gradients",
        "photo": "Photoreal studio lighting",
        "schematic": "Technical line drawing, blueprint feel"
    }
    negatives = "no text, no watermarks, no logos"
    return f"{components[style]}. {BASE_STYLE}. Theme: {theme}. Variant {variant}. Negative: {negatives}."

def generate_batch(themes, style="isometric", form="slide"):
    size = ASPECT_MAP[form]
    outputs = []
    for i, t in enumerate(themes):
        p = image_prompt(t, style=style, variant=chr(65 + (i % 3)))
        outputs.append({"theme": t, "prompt": p, "size": size})
    return outputs
```

**85% acceptance revealed the pattern:** aesthetic consistency trumped creative variety. One style, infinite variations.

**Two additions that paid off:**

- **Unit tests** for critical terms (brand colors, negative prompts)
- **YAML registry** for styles (marketing can PR changes)

## Pattern 3: Sub-Agents (Surgical Precision Required)

**When to use:** You need BOTH specialization AND parallelization.

Sub-agents solve exactly one problem: concurrent specialization. Everything else is over-engineering.

Reserve sub-agents for dual requirements:

- Parallelization alone → Use batching with semaphore
- Specialization alone → Use single prompt with sections

### My Sub-Agent Architecture

**Specialization:**

- **Prompt Stylist** - Shapes initial prompt
- **Safety Checker** - Enforces brand/policy
- **Visual QA** - Validates composition

**Parallelization:** 30-40 themes concurrently

```python
import asyncio

SEM = asyncio.Semaphore(20)  # Rate limit tuning

async def generate_one(theme):
    async with SEM:
        p1 = await stylist(theme)
        p2 = await safety_check(p1)
        img = await call_image_api(p2, size="1792x1024")
        qa = await visual_qa(img)
        return {"theme": theme, "prompt": p2, "qa": qa, "image": img}

async def generate_all(themes):
    tasks = [asyncio.create_task(generate_one(t)) for t in themes]
    return await asyncio.gather(*tasks)
```

**Results after sub-agents:**

- Throughput: 12 → 68 images/min
- Acceptance: 85% → 92% (the 7% jump came from Visual QA catching composition issues early)
- Unit cost: +4-6% (offset by fewer re-renders)

**Common failures:**

- Cascading retries (bound per stage)
- Prompt drift (single config source)
- Over-parallelization (start at 5, scale monitoring p95)

## Pattern 4: MCP Wrappers (Integration Without Full Apps)

**When to use:** Multiple tools/teams need access, stable interface required.

MCP transforms ad-hoc scripts into typed contracts. The power isn't intelligence—it's integration.

### Minimal MCP Server

```typescript
import { Server } from '@modelcontextprotocol/sdk/server'
import { z } from 'zod'

const server = new Server({ name: 'image-gen', version: '0.1.0' })

const GenerateImageInput = z.object({
  prompt: z.string(),
  size: z.enum(['1024x1024', '1536x1024', '1792x1024']),
  style: z.enum(['isometric', 'photo', 'schematic']),
})

server.tool('generate_image', {
  description: 'Generate branded image',
  inputSchema: GenerateImageInput,
  handler: async ({ prompt, size, style }) => {
    const refinedPrompt = buildPrompt(prompt, style)
    const image = await callImageAPI(refinedPrompt, size)
    return { prompt: refinedPrompt, size, b64: image }
  },
})
```

**Benefits:**

- Clear schemas and errors
- Centralized constraints
- Zero glue code for new clients

## Pattern 5: Full Applications (When Production Demands)

**When to use:** SLAs, budgets, compliance, multiple teams.

Production isn't about sophistication—it's about promises. Every component exists to keep one.

**Required components:**

- Queue with idempotency keys
- Budget control and rate limits
- Audit logs with trace IDs
- Human review UI for edge cases

### Core Job Loop

```pseudocode
while True:
    job = queue.pop()
    if not job: sleep(0.2); continue
    try:
        with trace(job.id):
            prompt = stylist(job.theme)
            prompt = enforce_policy(prompt)
            img = render(prompt, job.size)
            qa = vision_check(img)
            if qa.ok:
                store(img); mark_done(job.id)
            else:
                store(qa.report); mark_needs_review(job.id)
    except RateLimit:
        queue.defer(job, delay=backoff(job.attempt))
    except Exception as e:
        mark_failed(job.id, reason=str(e))
```

## Decision Framework: Choose Your Pattern

Ask these questions in order. Ascend only when you can justify "yes."

1. **Is it ambiguous/aesthetic?** → Start human-in-the-loop

   - Ship 10 manually
   - <60% acceptance: keep iterating
   - > 80% acceptance: graduate to reusable

2. **Will you reuse >2x per week?** → Create reusable prompt

   - Parameters and tests
   - Config not code

3. **Need specialization AND parallelization?** → Add sub-agents

   - Target: >20 items/min
   - 2+ reasoning modes

4. **Multiple tools/teams need access?** → MCP wrapper

   - 2+ client surfaces
   - Stable interface needed

5. **Have SLAs/budgets/compliance?** → Full application
   - Team handoffs
   - Auditability required

## My 100-Image Sprint Timeline

- **Hour 0-2:** Human-in-the-loop (30% → 65% acceptance—"corporate" became "isometric")
- **Hour 3-5:** Reusable prompts (→ 85% acceptance—consistency wins)
- **Hour 6-8:** Sub-agents (→ 92% acceptance, 68 images/min—Visual QA caught edge cases)
- **Week 2:** MCP wrapper for analytics CLI
- **Month 1:** Full app with queues and review UI

The pattern: each step solved exactly one bottleneck. No more.

## Anti-Patterns to Avoid

- **Premature multi-agent choreography** without concrete needs
- **Unversioned prompts** causing drift
- **Over-orchestration** for unclear tasks
- **Environment drift** between teams

## Universal Metrics

Track these regardless of pattern:

- **Acceptance rate:** % needing no edits
- **Time to first result:** Minutes to shippable output
- **Throughput:** Items/min at p95 latency
- **Cost per accepted:** Total spend / accepted outputs
- **Re-render taxonomy:** Actual failure reasons

## Key Takeaways

- **Start simple.** Most value comes from prompts and constraints.
- **Reusable prompts with tests** solve 80% of problems.
- **Sub-agents are surgical tools**—use when necessary.
- **MCP/apps are about integration**, not intelligence.
- **Earn your complexity.** Each step needs clear ROI.

The hardest lesson: that three-week orchestration nightmare taught me more about unnecessary complexity than any success could. Sometimes the best architecture is a for-loop.
