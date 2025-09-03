---
title: "Agent Lock-in Is the New Vendor Lock-in"
description: "Your AI agents own you—not the other way around. One weekend migration exposed the trap."
date: "2025-09-03"
author: "Tanush Yadav"
slug: "agent-lock-in-is-the-new-vendor-lock-in"
linear_id: "VOL-50"
---

# Agent Lock-in Is the New Vendor Lock-in

Your AI agents own you—not the other way around. One weekend migration exposed the trap.

The task seemed straightforward: migrate from the sunsetting Assistants API to the Responses API. Change a client, update method names, ship by Monday.

The reality shattered that assumption. **Thread IDs embedded throughout business logic**. **Tool payloads hardcoded to one provider's JSON format**. **Coordinator graphs imprisoned in framework-specific DSLs**. This wasn't an API migration—it was architectural surgery.

That's agent lock-in—a new architectural trap that compounds the complexity of traditional vendor dependencies with runtime behavior coupling.

## The Hidden Architecture Problem

Teams assume they're abstracting "the model." Reality disagrees. **Lock-in infects three critical layers**:

- **Conversation state**: threads, runs, tool calls, and memory trapped in provider-specific shapes
- **Multi-agent coordination**: orchestration graphs, planners, retries, and tool routing imprisoned by framework DSLs  
- **Tool integration**: schemas, IO formats, calling conventions, and auth welded to specific runtimes

Here's the common anti-pattern poisoning production systems:

```python
def handle_support_ticket(ticket_id: str):
    # Model and state are coupled
    thread = client.beta.threads.create(metadata={"ticket_id": ticket_id})
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=ASSISTANT_ID,
        tools=[{"type": "function", "function": {"name": "refund", "parameters": {...}}}],
        instructions="Assist with refunds. Use the refund tool when needed."
    )
    while run.status in ("queued", "in_progress"):
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
    # Business logic branches on provider-specific run output
    if run.required_action and run.required_action.submit_tool_outputs:
        # expects provider-specific tool IO schema
        tool_calls = run.required_action.submit_tool_outputs.tool_calls
        outputs = [dispatch_tool(call) for call in tool_calls]
        client.beta.threads.runs.submit_tool_outputs(thread.id, run.id, outputs=outputs)
```

Every component cements vendor dependency: thread/run lifecycle, tool schema, control loop. Compare with a portable architecture:

```python
class ModelClient(Protocol):
    def chat(self, messages: list[dict], tools: list[ToolSpec] | None = None, stream=False) -> ChatResult: ...

class StateStore(Protocol):
    def get_session(self, key: str) -> dict: ...
    def put_session(self, key: str, state: dict) -> None: ...

class Tool(Protocol):
    name: str
    schema: dict  # JSON Schema
    def invoke(self, args: dict, ctx: ToolContext) -> dict: ...

def handle_support_ticket(ticket_id: str, model: ModelClient, state: StateStore, tools: list[Tool]):
    sess = state.get_session(ticket_id) or {"messages": []}
    result = model.chat(sess["messages"], tools=[t.schema for t in tools])
    while result.requires_tools:
        tool_results = []
        for call in result.tool_calls:
            tool = find_tool(tools, call.name)
            tool_results.append({"tool_call_id": call.id, "output": tool.invoke(call.args, ctx={})})
        result = model.chat(sess["messages"] + [result.to_message(), {"tool_results": tool_results}], tools=[t.schema for t in tools])
    sess["messages"].append(result.to_message())
    state.put_session(ticket_id, sess)
    return result.final_text
```

This architecture isolates vendor dependencies behind clean protocols. **ModelClient works with any provider**. **Tools expose standard JSON Schema**. **State lives in your infrastructure**—Postgres, Redis, S3—not vendor threads.

The shift from trapped to portable isn't just code organization—it's reclaiming control over your application's brain.

## Why Agent Lock-in Surpasses Database Lock-in

Database lock-in involved predictable challenges: SQL dialects, indexing strategies, calculated migration effort. **Agent lock-in compounds complexity across runtime semantics and behavior**:

- **State semantics**: Provider-specific IDs, run lifecycles, tool-call envelopes, streaming formats. Function calling implementations vary subtly between models.
- **Orchestrator coupling**: Graph DSLs encoded in framework types and callbacks. Porting demands redesign, not refactoring.
- **Tool surface**: Auth, retries, idempotency, JSON schema assumptions. Tool code becomes enslaved to specific calling envelopes.
- **Evaluation and safety**: Red-team prompts, eval harnesses, safety rules bound to provider tokenization, log formats, event hooks.

You're trapped.

Interdependencies compound costs—agent migrations run 40-60% above traditional platform moves. Teams aren't just switching SDKs—they're untangling behavior, state, and tooling.

This architectural entanglement creates dependencies that dwarf traditional platform lock-in—here's what that means in production.

## Real Costs in Production

Industry data exposes the stakes:

**[MIT's NANDA study found 95% of GenAI pilots fail](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)**. Projects implode at integration boundaries—state, tools, orchestration—rather than modeling challenges.

**[Klarna laid off 700 people for AI, then rehired](https://www.reworked.co/employee-experience/klarna-claimed-ai-was-doing-the-work-of-700-people-now-its-rehiring/)** after customers reported robotic loops and dead-ends. Agent behavior drift without escape hatches triggers customer service disasters.

**[PayPal's Cosmos.AI platform demonstrates the solution](https://medium.com/paypal-tech/scaling-paypals-ai-capabilities-with-paypal-cosmos-ai-platform-e67a48e04691)**. Support for multiple frameworks—LangChain, CrewAI, MCP servers, OpenAI SDK, Vercel SDK. **Internal interfaces command the architecture**. External frameworks serve as swappable plugins.

**BMW and Monkeyway's SORDI.ai** exemplifies enterprise-grade patterns. Data remains in controlled domains. Tools register behind standard schemas. Orchestration stays swappable. The architecture principle persists: **portable contracts for tools and state**, **coordinator logic severed from business logic**.

The cost? Astronomical.

## Portable Abstraction Architecture

The minimal viable abstraction for production systems:

```typescript
// Model client hides provider differences
export interface ModelClient {
  chat(input: ChatInput): Promise<ChatResult>;
  stream?(input: ChatInput): AsyncIterable<ChatChunk>;
}

// Tool spec is pure JSON Schema with a stable name
export interface ToolSpec {
  name: string;
  description?: string;
  schema: JSONSchema7;
}

// Tool adapter executes real business logic
export interface Tool {
  spec: ToolSpec;
  invoke(args: unknown, ctx: ToolContext): Promise<unknown>;
}

// State store is your infra, not the vendor's
export interface StateStore {
  get(key: string): Promise<SessionState | null>;
  set(key: string, state: SessionState): Promise<void>;
}

export async function runAgent(sessionId: string, model: ModelClient, store: StateStore, tools: Tool[]) {
  const state = (await store.get(sessionId)) ?? { messages: [] };
  let result = await model.chat({ messages: state.messages, tools: tools.map(t => t.spec) });

  while (result.toolCalls?.length) {
    const toolResults = [];
    for (const call of result.toolCalls) {
      const t = tools.find(x => x.spec.name === call.name);
      if (!t) throw new Error(`Unknown tool ${call.name}`);
      toolResults.push({ id: call.id, output: await t.invoke(call.args, { sessionId }) });
    }
    result = await model.chat({
      messages: [...state.messages, result.asMessage(), { role: "tool", toolResults }],
      tools: tools.map(t => t.spec)
    });
  }

  state.messages.push(result.asMessage());
  await store.set(sessionId, state);
  return result.text;
}
```

Runtime swapping transforms into straightforward adapter code.

OpenAI Responses adapter:

```typescript
class OpenAIResponsesClient implements ModelClient {
  constructor(private sdk: OpenAI) {}
  async chat(input: ChatInput): Promise<ChatResult> {
    // map ChatInput to Responses payload
    const resp = await this.sdk.responses.create({
      model: "gpt-4.1",
      messages: input.messages,
      tools: input.tools?.map(toOpenAITool),
    });
    return fromOpenAI(resp);
  }
}
```

MCP tool adapter:

```typescript
import { Server as MCPServer } from "@anthropic-ai/mcp";

export function serveTools(tools: Tool[]) {
  const mcp = new MCPServer();
  for (const t of tools) {
    mcp.tool(t.spec.name, t.spec.schema, async (args, ctx) => await t.invoke(args, ctx));
  }
  return mcp;
}
```

**Business logic remains in Tool.invoke and SessionState**, not vendor thread models or framework callback graphs.

Freedom requires discipline.

## Standards Creating Portability

While the lock-in challenge intensifies, emerging standards offer escape routes.

**[MCP (Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol)** delivers the most practical standard today:

- Tool discovery via schemas and manifests
- Consistent RPC envelope for tool execution  
- Transport-agnostic model-to-capability connections

MCP transforms toolset registration across multiple orchestrators. **Tools become portable assets**.

Two emerging standards command attention:

**OASF (Open Agent Schema/Foundation)**: Standardizes agent descriptors—capabilities, memory, tool contracts, event streams. Deploy as internal config target shape rather than dependency.

**Agent Connect Protocol**: Enables agent-to-agent federation—messaging, identity, capability negotiation. Secure envelopes for multi-agent systems across organizational boundaries.

Design architecture seams aligned with these standards. **Tool schemas, message envelopes, capability descriptors** become interoperable as the ecosystem matures.

## 90-Day Migration Playbook

### Days 0–30: Inventory and Isolate

**Build dependency map**
- Count references to thread/run IDs, tool-call envelopes, provider SDK types, framework decorators
- Tag "hot paths" (customer-facing, revenue-impacting) versus internal tools

**Wrap the model**
- Introduce ModelClient interface
- Implement Responses API adapter alongside current client
- Add A/B testing flag for staging validation

**Externalize state**
- Introduce StateStore backed by Postgres or Redis
- Dual-write for one week
- Keep state minimal: messages, last tool call, variables

### Days 31–60: Decouple Tools and Coordinator

**Define ToolSpec**
- Normalize tools to JSON Schema and pure args/output
- Remove SDK-specific annotations from tool code
- Create two adapters: current orchestrator and MCP

**Build eval harness**
- Record 50–200 representative sessions
- Replay through old and new adapters
- Diff behaviors and costs

**Abstract coordinator**
- Create Coordinator interface (run(), plan(), route())
- Adapt to current framework
- Extract business logic from framework callbacks

### Days 61–90: Parallel Run and Cutover

**Shadow deploy**
- Run new stack read-only for 1–2 weeks
- Compare latencies, error rates, cost deltas

**Fix the critical 20%**
- Tool arg coercion
- Retry idempotency
- Streaming token handling
- Function-call naming mismatches

**Migrate incrementally**
- Cut over one agent or route at a time
- Maintain old path as safety valve for one sprint

Validation harness for A/B testing:

```typescript
async function dualRun(session, message) {
  const a = await adapterA.chat({ session, message, tools });
  const b = await adapterB.chat({ session, message, tools });
  return {
    sameFinalText: normalize(a.text) === normalize(b.text),
    toolDiff: diff(a.toolCalls, b.toolCalls),
    costDelta: b.cost - a.cost,
    latencyDelta: b.latency - a.latency
  };
}
```

Run nightly across eval set. Ship when diffs stabilize.

## Migration Budget Reality

**Budget 40–60% above equivalent non-AI platform migrations**. Cost drivers include:

- **State disentanglement**: Extract conversation/memory from provider threads, backfill history
- **Tool rewrites**: Align to JSON Schema contracts, add idempotency, retries, metrics
- **Eval and safety**: Build replay harnesses, test corpora, red-team checks independent of provider logs
- **Coordinator portability**: Extract business logic from framework DSLs
- **Change management**: Retrain teams, update runbooks, adapt observability

The investment protects against discovering under pressure that your "agent" is your application—owned by someone else.

## Production Architecture Patterns

**PayPal's multi-framework approach**: One platform, many adapters. Internal contracts command truth.

**BMW/Monkeyway SORDI.ai patterns**: On-prem data connectors, standardized tool registration, swappable orchestrators. Apply this discipline regardless of regulation requirements.

**MCP for all tools**: Creates clean capability-runtime separation.

**Business logic in tools**: Tools are testable, replayable, portable. Avoid planner callbacks for core logic.

Starting fresh? Begin with four interfaces: **ModelClient, StateStore, ToolSpec/Tool, Coordinator**.

Already shipped? Execute the 90-day playbook.

**Treat agent frameworks like ORMs**—useful but never the architectural center.
