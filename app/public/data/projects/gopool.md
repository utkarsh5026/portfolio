# gopool — A High-Performance Worker Pool for Go

![gopool hero — a sleek dark dashboard showing concurrent task throughput across scheduling strategies](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/gopool-main.svg)

> A type-safe, production-ready worker pool for Go — built for the workloads where performance actually matters.

## The Problem

Concurrent programming in Go is powerful, but raw goroutines are a blunt instrument. Spin up hundreds of them against a database or an external API and you crash the service. Spin up too few and you leave performance on the table.

Most teams reach for `sync.WaitGroup` and a hand-rolled channel pattern. It works — until it doesn't. There's no retry logic, no rate limiting, no priority scheduling, and no observability. Every project ends up re-implementing the same fragile plumbing.

Existing third-party pools offered generic worker dispatch, but none provided the breadth of scheduling strategies needed for different workload profiles. CPU-bound tasks, I/O-bound tasks, and latency-sensitive financial pipelines all behave differently and demand different scheduling primitives.

![Diagram illustrating the gap between raw goroutines and production-grade task dispatching](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/gopool-compare.svg)

## The Solution

`gopool` is a fully-featured, generic worker pool library built on Go 1.18+ generics. It exposes a single, unified API capable of processing slices, maps, or streaming channels — while offering **7 interchangeable scheduling strategies** behind a clean option-based configuration surface.

The library is designed to be dropped into any Go service with a single `go get`, with zero `interface{}` conversions required.

![gopool system architecture — task submission flows through a configurable scheduler into a managed worker pool and back to the caller](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/gopool-architectue.svg)

## Code Savings at a Glance

The table below shows how each feature compares in raw boilerplate versus a single gopool option call.

| Feature                                 | Raw Go (lines) | gopool (lines) | Saved    |
| --------------------------------------- | -------------- | -------------- | -------- |
| Bounded worker pool + result collection | ~40            | 5              | **~35**  |
| Retry with exponential backoff          | ~30            | 1              | **~29**  |
| Rate limiting                           | ~25            | 1              | **~24**  |
| Panic recovery per worker               | ~10            | 0 (automatic)  | **~10**  |
| Lifecycle hooks (start / end / retry)   | ~20            | 3              | **~17**  |
| **Total**                               | **~125**       | **~10**        | **~115** |

### Bounded Worker Pool + Result Collection

```go
// Raw Go — ~40 lines
func processURLs(urls []string) ([]string, []error) {
    const workers = 8
    type result struct {
        idx int
        val string
        err error
    }

    sem := make(chan struct{}, workers)
    results := make([]result, len(urls))
    var wg sync.WaitGroup

    for i, url := range urls {
        wg.Add(1)
        sem <- struct{}{}
        go func(i int, url string) {
            defer wg.Done()
            defer func() { <-sem }()
            defer func() {
                if r := recover(); r != nil {
                    results[i] = result{i, "", fmt.Errorf("panic: %v", r)}
                }
            }()
            body, err := fetch(url)
            results[i] = result{i, body, err}
        }(i, url)
    }
    wg.Wait()

    out := make([]string, len(urls))
    errs := make([]error, len(urls))
    for _, r := range results {
        out[r.idx], errs[r.idx] = r.val, r.err
    }
    return out, errs
}

// gopool — 5 lines
pool := pool.New[string, string](ctx, 8)
results := pool.Process(urls, func(ctx context.Context, url string) (string, error) {
    return fetch(url)
})
```

### Retry with Exponential Backoff

```go
// Raw Go — ~30 lines
func fetchWithRetry(ctx context.Context, url string) (string, error) {
    const maxAttempts = 3
    delay := 100 * time.Millisecond
    var lastErr error
    for attempt := 0; attempt < maxAttempts; attempt++ {
        if attempt > 0 {
            select {
            case <-ctx.Done():
                return "", ctx.Err()
            case <-time.After(delay):
            }
            delay *= 2
        }
        body, err := fetch(url)
        if err == nil {
            return body, nil
        }
        if !isTransient(err) {
            return "", err
        }
        lastErr = err
    }
    return "", fmt.Errorf("all %d attempts failed: %w", maxAttempts, lastErr)
}

// gopool — 1 option
pool.New[string, string](ctx, 8,
    pool.WithRetry(3, 100*time.Millisecond),
)
```

### Rate Limiting + Hooks + Panic Recovery

```go
// Raw Go — ~55 lines of setup wiring all three together manually

// gopool — 3 options, panic recovery is automatic
pool.New[string, string](ctx, 8,
    pool.WithRateLimit(1000, 50),           // 1 000 tasks/sec, burst 50
    pool.WithBeforeTaskStart(func(id int) { metrics.Inc("started") }),
    pool.WithOnTaskEnd(func(id int, d time.Duration, err error) {
        metrics.Observe("duration", d)
    }),
    // panic recovery requires zero lines — it is always on
)
```

### Switching Scheduling Strategies

```go
// Raw Go — requires a full rewrite of the dispatcher

// gopool — swap one option, zero other changes
pool.New[Request, Response](ctx, workers,
    pool.WithStrategy(scheduler.LMAX),       // financial pipeline
    // pool.WithStrategy(scheduler.WorkStealing), // CPU-bound batch
    // pool.WithStrategy(scheduler.PriorityQueue), // SLA-driven tasks
)
```

### Generic, Type-Safe API

The pool is parameterised over two types: `T` (the task input) and `R` (the result). The compiler enforces correctness at every call site — no type assertions, no runtime panics from mismatched types.

Three processing modes are available out of the box: `Process` returns ordered results for a slice of tasks, `ProcessMap` handles keyed input/output pairs, and `ProcessStream` produces a live result channel for unbounded streaming workloads.

### Scheduling Strategies

The default `Channel` strategy uses per-worker buffered channels with round-robin dispatch and FNV-1a affinity hashing. It covers the majority of general-purpose workloads with minimal overhead.

For CPU-intensive pipelines, `WorkStealing` implements the **Chase-Lev deque algorithm** — idle workers steal tasks from the back of busy workers' queues, achieving automatic load balancing without a central dispatcher. `MPMC` provides a lock-free ring buffer for high-throughput scenarios with many concurrent submitters. `Priority Queue` and `Skip List` strategies enable SLA-driven processing where critical work must jump the queue. The `Bitmask` strategy dispatches directly to idle workers in a single atomic instruction — limited to 64 workers, but with ultra-low latency overhead. Finally, the `LMAX Disruptor` strategy (described in depth below) targets financial-grade, sub-microsecond latency at millions of operations per second.

### Resilience Features

Automatic retry with **exponential backoff** handles transient errors without manual retry loops. Built-in **rate limiting** uses a token bucket to prevent gopool from overwhelming downstream services. Every worker includes **panic recovery** so a crashing task never kills the entire pool.

**Thread-safe lifecycle hooks** (`WithBeforeTaskStart`, `WithOnTaskEnd`, `WithOnEachAttempt`) give callers full observability into task execution without any additional instrumentation infrastructure.

## Key Features

- Full Go generics support — compile-time type safety with zero `interface{}` casts
- 7 interchangeable scheduling strategies switchable via a single option call
- Task Fusion wrapper that batches submissions across any underlying strategy
- Built-in exponential backoff retry with configurable attempt counts and initial delay
- Native rate limiting via token bucket — tunable tokens per second and burst size
- Per-worker panic recovery to isolate failures from the rest of the pool
- `context.Context`–first API throughout — every operation honours cancellation and deadlines
- Lifecycle hooks for monitoring task start, completion, and each individual retry attempt
- CPU affinity pinning on Linux via `SchedSetaffinity` for latency-sensitive workloads
- Interactive benchmark visualisation dashboard with Docker in a single command

## Results & Impact

Benchmarks run on an **Intel i7-11800H @ 2.30 GHz (16 cores)**:

| Metric                 | Result                                              |
| ---------------------- | --------------------------------------------------- |
| **Peak Throughput**    | ~1 million tasks/sec (lightweight CPU tasks)        |
| **Worker Efficiency**  | 400–500K tasks/sec per worker at 2–4 workers        |
| **Memory per Task**    | ~65 bytes                                           |
| **Parallel Speedup**   | 19× faster than sequential over 1,000 tasks         |
| **Hook Overhead**      | ~5% additional cost with all hooks enabled          |
| **Buffer Tuning Gain** | ~30% throughput increase at 4–8× worker buffer size |

The pool achieves near-linear scaling from 2 to 16 workers on CPU-bound workloads. For I/O-bound tasks, optimal worker counts sit at 24–48, well above the physical core count, without scheduling overhead degrading throughput.

Each submitted task incurs roughly **one allocation**, keeping GC pressure predictable and pause times consistent even at sustained high throughput.

## Under the Hood — Technical Deep Dive

The hardest part of building a high-performance pool is not the goroutine management — it is eliminating the contention that arises when many goroutines compete for the same shared state. Every strategy in gopool is an answer to a different contention profile.

### LMAX Disruptor Implementation

The LMAX strategy is the most technically ambitious component in the library. The original Disruptor was developed by LMAX Exchange to process **6 million financial transactions per second** with single-digit microsecond latency — without a single lock in the hot path.

`gopool`'s implementation uses a **pre-allocated power-of-two ring buffer** where each slot is cache-line padded to exactly 64 bytes. Padding prevents false sharing: when one CPU core modifies a slot's sequence number, it does not invalidate the cache lines of neighbouring slots on other cores. Index calculation uses a bitmask (`seq & mask`) instead of modulo, eliminating division from the critical path entirely.

![LMAX ring buffer architecture — producers CAS the tail sequence, consumers claim batches via consumerSeq, and gatingSeq enforces back-pressure](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/lmax-architecture.svg)

Producers claim slots by atomically incrementing the `tail` sequence via Compare-And-Swap. Workers claim batches of up to 16 tasks at a time by CAS-ing a shared `consumerSeq`. The `gatingSeq` — the minimum across all active worker sequences — enforces back-pressure: a producer blocks when it would wrap around and overwrite data that has not been consumed yet.

A subtle race condition makes the LMAX implementation exceptionally tricky. Workers must signal their position _before_ computing the gating sequence, and gating must be able to _decrease_ (not only increase) to account for a worker that claims a lower sequence than the current minimum. Both invariants are enforced through a `claimMu` mutex that wraps the CAS-plus-workerSeq-update atomically.

### Work-Stealing Deque

The `WorkStealing` strategy gives each worker a private double-ended queue (deque). Workers push and pop from their own queue's **tail** in LIFO order — exploiting cache warmth from recently submitted tasks. When a worker exhausts its local queue, it attempts to steal from the **head** of a randomly chosen peer's queue.

![Work-stealing deque diagram — each worker owns a local deque; idle workers steal from the front of busy workers' queues](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/work-steal.svg)

LIFO local access and FIFO stealing is not arbitrary: local LIFO improves CPU cache reuse because the most recently _submitted_ task likely touches data that is still hot in L1/L2. FIFO stealing targets the oldest tasks in the victim's queue, which are most likely to have accumulated subtasks of their own — making them cheaper to steal since they represent the largest units of independent work.

### CPU Affinity Pinning

On Linux, `gopool` can pin each worker goroutine to a specific CPU core using `SchedSetaffinity` from `golang.org/x/sys/unix`. After calling `runtime.LockOSThread`, the goroutine is bound to one OS thread and that thread is pinned to one physical core.

![CPU affinity pinning — each worker goroutine is locked to an OS thread and bound to a dedicated CPU core to maximise cache locality](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/gopool/cpu-affinit.svg)

The benefit is deterministic L1/L2 cache residency: a pinned worker's data structures never migrate across cores between scheduler ticks. For latency-sensitive workloads — particularly the LMAX strategy — the difference between cache-hot and cache-cold access to the ring buffer can be the dominant factor in end-to-end task latency.

A no-op stub in `affinity_windows.go` ensures the API surface remains identical across platforms, with affinity silently disabled on operating systems that do not support the syscall.

## Links

- [GitHub Repository](https://github.com/utkarsh5026/gopool)
- [Go Package Documentation](https://pkg.go.dev/github.com/utkarsh5026/gopool)
