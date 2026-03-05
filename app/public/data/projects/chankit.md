# ⚡ Chankit

![Chankit — reactive channel operators for Go, showing a pipeline composing throttle, map, filter, and batch](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Chankit)

> Reactive pipelines for Go channels — 50+ operators, zero dependencies, fully type-safe.

## ⚠️ The Problem

Go's native channels are powerful, but composing them into real pipelines is painful. Debouncing user input, batching database writes, or rate-limiting API calls all require the same 30-line scaffolding every single time.

Goroutine leaks are silent killers. Forgetting to `close()` a channel, or not propagating a cancelled context, can leave dozens of goroutines blocked indefinitely — and Go's runtime won't warn you.

The result is Go developers reinventing the wheel across every project. A `batchWorker` here, a `throttleLoop` there — none of it reusable, all of it fragile.

![Diagram showing typical Go boilerplate for a simple debounce-filter-batch pipeline versus the equivalent Chankit pipeline](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

## ✨ The Solution

Chankit is a pure-Go library that brings functional, reactive operators to Go channels. It wraps any `<-chan T` in a typed `Pipeline[T]`, then exposes a fluent API for composing operators declaratively.

Every operator handles its own goroutine lifecycle. Context cancellation propagates automatically. Channels are closed deterministically. The library has **zero external dependencies** and passes the Go race detector on its full test suite.

![High-level architecture: a source channel enters a Pipeline, passes through operator stages (each in its own goroutine), and exits as a transformed channel](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### 🔧 Pipeline API

The `Pipeline[T]` type is the core abstraction. It wraps a read-only channel alongside a `context.Context`, and every method returns a new `Pipeline[T]` — making operator chains composable and readable at a glance.

```go
// Debounce search input, filter empty queries, batch into groups of 10
results, _ := chankit.From(ctx, searchEvents).
    Debounce(300 * time.Millisecond).
    Filter(func(q string) bool { return len(q) > 0 }).
    Batch(10, time.Second).
    ToSlice()
```

Resource lifecycle is automatic. When the context is cancelled, every goroutine in the chain tears itself down in order, draining upstream channels to unblock producers before exiting.

### 🌊 Flow Control

The flow-control operators are the library's most technically sophisticated piece. **Throttle** keeps only the latest value per interval (ideal for high-frequency sensor streams). **Debounce** waits for a silence window before emitting (ideal for search-as-you-type). **FixedInterval** paces values without dropping any (ideal for rate-limited API calls).

**Batch** is a dual-trigger operator: it flushes when either a size threshold or a time window is crossed — whichever comes first. Partial batches are sent on context cancellation so no data is silently discarded.

```go
// Throttle: keep only the latest value per 100ms window (drops intermediates)
out := chankit.Throttle(ctx, sensorStream, 100*time.Millisecond)

// Debounce: emit only after 300ms of silence (resets timer on every new value)
out := chankit.Debounce(ctx, searchInput, 300*time.Millisecond)

// FixedInterval: pace every value at 50ms apart — no drops, just queued
out := chankit.FixedInterval(ctx, apiRequests, 50*time.Millisecond)

// Batch: flush at 100 items OR after 1 second, whichever comes first
out := chankit.Batch(ctx, events, 100, time.Second)
// => each value on `out` is a []Event slice
```

![Timing diagram comparing Throttle, Debounce, and FixedInterval behaviour on the same bursty input stream](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### 🔄 Transformations & Selection

The transformation layer covers the full functional primitives: **Map**, **Filter**, **Reduce**, **FlatMap**, and **Tap**. All are generic — no `interface{}` casting, no runtime type assertions.

Selection operators (**Take**, **Skip**, **TakeWhile**, **SkipWhile**, **First**, **Last**) and logical predicates (**Any**, **All**) allow precise control over how many values flow through a pipeline and when it terminates.

### 🔀 Generators & Combiners

Source generators — **Range**, **Repeat**, **Generate**, **FromSlice**, **From** — let you bootstrap pipelines without an existing channel. Combiner operators — **Merge**, **ZipWith**, **ZipN** — join multiple streams into one, enabling fan-in patterns with a single method call.

## 🌟 Key Features

- Fluent `Pipeline[T]` API with full method chaining
- **Throttle**, **Debounce**, **FixedInterval**, and **Delay** for precise timing control
- **Batch** operator with dual size/time-window flush triggers
- Type-safe **Map**, **Filter**, **Reduce**, **FlatMap** using Go generics
- **Merge** and **Zip** combiners for multi-stream fan-in
- **Range**, **Repeat**, **Generate** generators to create sources from scratch
- Automatic goroutine lifecycle — no manual `close()` or leak risk
- `context.Context` propagation throughout the entire chain
- Zero external dependencies — pure Go stdlib
- Race-detector clean on the full test suite
- Benchmark suite included for performance validation
- VitePress documentation site with API reference and real-world examples

## 📊 Results & Impact

| Metric                                       | Vanilla Go           | Chankit          | Delta          |
| -------------------------------------------- | -------------------- | ---------------- | -------------- |
| Lines for debounce + filter + batch pipeline | ~90                  | ~10              | **-89%**       |
| Runtime type casting (`interface{}`)         | Required             | None             | **Eliminated** |
| Goroutine leak surface area                  | Every operator       | Zero (automated) | **Eliminated** |
| Context cancellation wiring                  | Manual per goroutine | Built-in         | **Automated**  |
| Reusable across projects                     | No (copy-paste)      | Drop-in package  | **Yes**        |

Chankit cuts pipeline boilerplate by roughly **89%** on real-world examples from the documentation — debounce + filter + batch went from ~90 lines to ~10.

The shift from imperative goroutine management to declarative operator composition also makes pipelines dramatically easier to test. Each operator is independently mockable via a channel input, removing the need for complex synchronisation harness code in tests.

## 🔬 Under the Hood — Technical Deep Dive

The hardest engineering problems in Chankit are not the functional operators — those are straightforward. The hard problems are **goroutine lifecycle**, **non-blocking teardown**, and **type-safe composition** without sacrificing ergonomics.

### 🧬 Generic Type System

Chankit targets Go 1.18+ and uses type parameters throughout. The `Pipeline[T any]` struct, every operator function, and every option type are all parameterised. This eliminates the `interface{}` escape hatch that plagued pre-generics channel libraries.

Numeric-specific constraints (`constraints.Ordered`, custom `Number`) are used for operators like **Range** that only make sense on numeric types — catching misuse at compile time rather than panicking at runtime.

![Diagram showing how the generic type parameter T flows unchanged through a Pipeline[T] operator chain, with type inference at the call site](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### ♻️ Context-Driven Lifecycle

Every operator goroutine uses a `select` loop with a `ctx.Done()` arm. Cancellation is checked at two points: **on receive** (before processing a value) and **on send** (before writing to the output channel). This two-point check prevents a goroutine from processing a value that will never be consumed.

When a downstream operator stops reading (because its own context was cancelled), the upstream producer would normally block on a channel send. Chankit spawns a **drain goroutine** — a lightweight goroutine whose only job is to read and discard values from an abandoned channel until it closes. This guarantees that producers always unblock and exit cleanly.

![Sequence diagram showing context cancellation propagating from a downstream operator through drain goroutines to clean up upstream producers](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### ⏱️ Flow Control Algorithms

**Debounce** uses a single resettable `time.Timer`. On each incoming value, the timer is reset. Only when the timer fires without interruption is the last-seen value emitted. This is a faithful implementation of the classic debounce pattern, with correct handling of `timer.Stop()` / drain semantics to avoid spurious fires.

**Throttle** uses a ticker to define the emission window. Within each window, only the most recently received value is stored; on each tick, that value (if any) is emitted and the slot is cleared. **FixedInterval** instead queues every value and releases them one-per-tick, trading latency for data completeness.

![State machine diagram for Debounce, Throttle, and FixedInterval showing how each handles the same bursty input sequence differently](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### 📦 Buffering Strategy

By default, all operator output channels are **unbuffered** — providing natural backpressure. If a downstream consumer is slow, the upstream operator blocks, which in turn blocks its upstream, all the way to the source. This is the correct behaviour for most pipelines.

Two opt-in mechanisms override this: `WithBuffer[T](n)` sets an explicit buffer size; `WithBufferAuto[T]()` infers a sensible size for slice-backed operations. Both are passed as functional options, keeping the default API zero-config.

## 🔗 Links

- [GitHub — utkarsh5026/chankit](https://github.com/utkarsh5026/chankit)
- [Documentation Site](https://utkarsh5026.github.io/chankit)
