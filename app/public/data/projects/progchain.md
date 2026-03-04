# ProgChain

![ProgChain app interface showing the Explore learning mode with an AI-generated response about Python decorators](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

> An AI-powered learning platform I built to finally understand how all the pieces of a modern AI app fit together.

---

## Why I Built This

I'd been reading about LangChain, FastAPI, and server-sent events for months, absorbing tutorials and documentation without ever having a real reason to wire them all together. At some point it clicked that the only way I was going to actually learn this stack was to build something that forced me to use all of it at once.

The idea of an AI learning assistant felt like exactly the right scope. Complex enough that I couldn't fake my way through it — streaming responses, persistent chat history, vector search, async database operations — but concrete enough that I could define what "done" looked like. I gave myself a constraint: the project had to be genuinely useful to me, not just a demo.

I ended up building something I actually use to explore new programming concepts. That wasn't really the plan, but it's how it turned out.

---

## The Problem

Most learning resources are built for an imaginary average learner. A course on Python gives you the same 8-week syllabus whether you already know JavaScript or you're starting from zero. There's no branching, no depth control, no way to say "I get the basics, skip ahead and go deeper on async."

AI chatbots like ChatGPT are flexible, but conversations disappear. There's no structure to build on, no saved learning path, no difficulty progression. Every session starts cold. You're always rebuilding context.

The real friction I felt was the constant context-switching: a Stack Overflow tab, a docs page, a YouTube video, a ChatGPT window, none of them connected. I wanted a single interface where I could explore a topic, drill into a subtopic, and return to exactly where I left off.

![Illustration of fragmented learning resources versus a unified learning interface](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

---

## The Solution

I built ProgChain around three distinct learning modes, all backed by the same FastAPI + LangChain core. Each mode targets a different kind of learning: free-form conversation, structured exploration, and sequential deep-dives. They all share one streaming architecture.

![High-level architecture diagram showing the React frontend, FastAPI backend, LangChain orchestration layer, FAISS vector store, and SQLite database](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/progchain/projetc-architecture.svg)

### Explore Mode

Explore is the conversational core of the app. You ask a question about any programming topic, and a research assistant AI walks you through it — then surfaces three or four natural follow-up questions you can chase. Every question becomes a node in a graph you can navigate.

Sessions are saved with full context. If I ask about Python decorators on Monday and come back Thursday, the assistant still knows what we covered. Under the hood, FAISS vector search retrieves the most semantically relevant previous messages and injects them back into the LangChain prompt — so the AI doesn't have to re-read the entire chat history every time.

![Explore mode minimap view showing a branching question graph](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Topic Explorer

Topic Explorer takes a different approach. Instead of conversation, it generates a hierarchical breakdown of any topic — organized into beginner, intermediate, and advanced concepts. Type "React" and you get a sorted, categorized tree of subtopics to navigate.

Each node in the tree is clickable: selecting it generates the next layer of subtopics, going deeper. The entire thing is rendered as an interactive flowchart using `@xyflow/react`, so you can literally see the shape of the knowledge graph as you expand it. Chains are saved so you can resume them later.

![Topic Explorer showing a flowchart tree for "Python" branching into beginner, intermediate, and advanced subtopics](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Learning Threads

Threads are for when you want to study a topic systematically, piece by piece. You name a topic, and the backend generates a multi-part content series — each part is a focused deep-dive, sequentially ordered. Think of it like a custom mini-course generated on demand.

Every piece of thread content has its own Q&A attached to it. You can ask questions about a specific section without losing context from the others. You can also tell the backend to generate more sections when you've finished the first batch.

![Learning Threads view showing sequential content sections with an inline Q&A panel open](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Roadmap View

The roadmap feature lets me track progress on a learning path as a node-based visual graph. Each node has a difficulty level (beginner, intermediate, advanced) and a status (not started, in progress, completed). It's simple, but having a visual record of what I've covered and what's left is surprisingly motivating.

---

## Key Features

- Real-time streaming responses via Server-Sent Events — content appears token-by-token, no waiting for the full response
- Three learning modes: Explore (conversational), Topics (hierarchical), Threads (sequential) — each backed by the same async streaming core
- Persistent session storage with SQLite + SQLAlchemy async ORM — conversations survive browser restarts
- Vector-augmented generation: FAISS + OpenAI embeddings for semantically relevant context retrieval
- Multi-model support: switch between GPT-4o and GPT-4o-mini per request
- Prompt type selector — four modes: Step-by-Step Teacher, Interview Prep, Deep Dive, Code Analysis
- Rich markdown rendering with LaTeX math (KaTeX), syntax highlighting, and auto-copy-on-select
- Framer Motion animations with spring physics on the sidebar and all interactive elements
- Fully Dockerized: separate dev and production `compose` files with hot-reload in development

---

## Results & Impact

The real result of building ProgChain was less about the product and more about what I learned in the process. I shipped a full-stack AI application from scratch — and every hard problem I ran into forced me to actually understand the tools I was using.

| Dimension         | Before                                        | After                                        |
| ----------------- | --------------------------------------------- | -------------------------------------------- |
| Learning workflow | 4–5 browser tabs, constant context-switching  | Single interface with persistent history     |
| Topic structure   | Linear course chapters or flat search results | Hierarchical trees with difficulty levels    |
| AI conversations  | Ephemeral ChatGPT windows                     | Saved sessions with vector-augmented context |
| Stack knowledge   | Shallow familiarity from tutorials            | Deep, hands-on understanding from building   |
| Deployment        | "I'll figure it out later"                    | Docker Compose with dev + prod configs       |

I went into this project knowing React and basic Python. I came out with production-level experience in FastAPI, async Python, LangChain, SSE streaming, Redux Toolkit, and Docker. That was the real outcome.

---

## Challenges & What I Learned

### Streaming: When JSON Breaks Mid-Token

The first time I got streaming working end-to-end, it crashed the moment a response was long enough. The issue: SSE chunks from FastAPI don't arrive as clean, complete JSON objects. A single `data:` event can be split mid-value, mid-key, sometimes mid-character. My client was trying to `JSON.parse()` every chunk as it arrived — and of course it blew up on malformed partials.

I spent two days convinced the problem was on the backend before I finally logged the raw bytes on the client side and saw what was actually arriving. The fix was straightforward once I understood the problem: buffer incoming text, only attempt to parse when a chunk is terminated by the SSE delimiter `\n\n`. It felt obvious in hindsight, but it took real debugging to get there.

### Async Python: SQLAlchemy Sessions Are Not Shareable

Early in development, I started seeing data that was written to the database disappearing silently — no errors, just gone. It took me a long time to find the root cause: I was passing `AsyncSession` objects across coroutine boundaries, which is explicitly not supported. The session would close under me and silently swallow the writes.

FastAPI's dependency injection made it tempting to hold a session open across the entire request lifecycle, but that pattern breaks down the moment you have any kind of concurrent work. The fix was to treat async sessions exactly like file handles: open them, use them, close them inside an `async with` block. I rewrote every service function to follow this pattern, and the silent data loss disappeared immediately.

### Prompt Engineering: Structure Is Fragile

Getting the LLM to return consistently structured output — topic trees organized by beginner, intermediate, and advanced, with specific field names — was much harder than I expected. The AI would routinely decide to be creative with the format: adding extra fields, merging difficulty levels, returning prose instead of JSON.

I eventually learned that structure requirements buried in a long system prompt get ignored. Moving format instructions to the very end of the prompt, right before the user message, improved consistency dramatically. Adding a concrete example of the expected format helped further. The final step was adding Pydantic validation at the service layer: if the response doesn't match the schema, it gets retried rather than persisted as garbage data.

---

## Under the Hood — Technical Deep Dive

The most technically interesting part of ProgChain isn't any individual component — it's how they all connect. Real-time, token-by-token streaming from an LLM through a Python backend to a React state store is a chain with a lot of failure points, and getting it right required understanding each link deeply.

### The Streaming Pipeline

LangChain's async generators produce tokens one at a time. FastAPI wraps that generator in a `StreamingResponse` and sends it over the wire as Server-Sent Events. On the client, the native `fetch` API reads the `ReadableStream` from the response body — I deliberately avoided libraries here because I needed precise control over chunk buffering.

Each parsed SSE event is yielded from a client-side async generator, which is consumed by a Redux thunk. The thunk accumulates chunks in local state and flushes to the Redux store every 100ms — not on every token. That batching was critical: flushing on every token caused the entire component tree to re-render thousands of times per response.

![Diagram of the full streaming pipeline: LangChain async generator → FastAPI StreamingResponse → SSE wire format → client-side fetch ReadableStream → Redux thunk with 100ms batching → React component update](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/progchain/progchain-backend-streaming.svg)

### Vector-Augmented Context

Every Explore session gets a FAISS vector store, seeded with the initial topic text. As the conversation grows, new messages are added to the index. When the user asks a follow-up question, a similarity search retrieves the five most semantically relevant previous messages — not just the most recent ones.

Those retrieved messages are injected into the LangChain prompt via a `MessagesPlaceholder`, giving the LLM focused context without blowing up the token count. Query results are cached with a 60-second TTL using `cachetools.TTLCache` — repeated questions within a session hit the cache instead of re-embedding and re-searching.

![Diagram showing FAISS vector store with OpenAI embeddings, similarity search query flow, and context injection into the LangChain ChatPromptTemplate](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/progchain/progchain-faiss.svg)

### Async Database Layer

The database layer uses SQLAlchemy 2.0's async ORM with `aiosqlite`. Every model inherits from two mixins: `TimestampMixin` (auto-populates `created_at` and `updated_at`) and `PublicIDMixin` (generates a UUID-style public identifier on insert, keeping internal integer IDs private).

The most interesting part is the SQLAlchemy event listeners. When a new `ExploreChatMessage` is inserted, a listener automatically increments the parent `ExploreChat.chat_messages_count` and recomputes token usage and cost into the `ExploreChatStats` table. Statistics stay consistent without any service-layer bookkeeping.

![ER diagram showing ExploreChat, ExploreChatMessage, ExploreChatStats, Thread, ThreadContent, and ThreadContentChat with their relationships and event-listener-managed computed fields](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

---

## Links

[View on GitHub](https://github.com/UtkarshPriyadarshi/progchain)
