# SourceControl

![SourceControl CLI showing commit history, branch status, and object inspection in a styled terminal](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

> I built Git from scratch in Go — not to use it, but to finally understand what Git is actually doing.

---

## Why I Built This

I had been using Git every day for years and still couldn't answer basic questions about it. What is a commit, really? Why does a rebase feel dangerous? What does "detached HEAD" mean at the byte level? I kept reading docs and blog posts that explained the surface, but I wanted to understand the internals the way you only can by building them yourself.

So I started implementing a version control system from scratch in Go. I called it SourceControl. It stores data in `.source/` instead of `.git/`, but otherwise it tries to implement the exact same object model, index format, and reference system that Git uses.

It took longer than I expected, broke in ways I didn't anticipate, and taught me more than any tutorial I've ever read.

---

## The Problem

Git is one of the most widely used tools in software development, and also one of the most misunderstood. Most developers have no idea what happens when they run `git add` — the file gets serialized, compressed, hashed, and written to a content-addressed store. Almost nobody knows that.

This knowledge gap creates real problems. Developers lose work, botch rebases, corrupt repositories, and fear commands like `git reflog` or `git cherry-pick` because the underlying model is opaque to them. There are no beginner-friendly implementations that expose the internals at the source level.

I wanted to build something that would be a working reference — a readable, well-tested Go implementation of Git's core concepts that someone could study alongside the real thing.

![Diagram showing how a file flows from disk through hashing, compression, and into content-addressable storage](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

---

## The Solution

I built a complete version control CLI in Go that implements Git's object model, staging area, reference system, and branch management. The commands (`init`, `add`, `commit`, `branch`, `checkout`, `log`, `show`, `status`) behave like their Git equivalents, but every line of the implementation is mine.

The design is interface-driven and modular. `BaseObject` is implemented by all three object types. `Repository` abstracts storage so implementations are swappable. Every multi-step operation is context-aware, cancellable, and wrapped in a typed error system.

![High-level architecture: CLI commands → manager layer → object/index/refs stores → .source/ on disk](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### The Object Store

The heart of the system is a content-addressable file store. Every piece of data — file contents, directory structures, commit snapshots — is serialized into Git's canonical format (`<type> <size>\0<content>`), hashed with SHA-1, and stored as a DEFLATE-compressed file under `.source/objects/`.

The hash becomes the file's address. A blob with the same content always produces the same hash, which means identical files across commits share a single stored object. The write path checks for existence before writing, making all writes idempotent at no cost.

Storage is sharded into 256 first-level directories using the first two hex characters of each hash. This matches Git's layout exactly and prevents filesystem performance degradation when a project accumulates thousands of objects.

![Object store directory layout showing two-level sharding with blob, tree, and commit objects](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### The Index (Staging Area)

The index is a binary file that tracks the current state of the working directory. I implemented Git's exact v2 format: a 4-byte `DIRC` magic signature, a 4-byte version, a 4-byte entry count, followed by variable-length entries each padded to an 8-byte boundary.

Each entry carries 62 bytes of fixed metadata — creation time, modification time, device ID, inode, file mode, UID, GID, file size, and a 20-byte raw SHA-1 — followed by the filename and padding. The entire file ends with a 20-byte SHA-1 checksum of all preceding bytes, validated on every read.

I use a dual data structure internally: a sorted slice for serialization (Git's required ordering) and a hash map for O(1) lookups. Change detection is stat-based — comparing file size and modification time before touching file content — which keeps `add` and `status` fast even on large trees.

### Commit History and the DAG

Commits form a directed acyclic graph. Each commit stores the SHA-1 of its root tree, the SHA-1s of its parent commits, and author/committer metadata. The first commit has no parents. A merge commit has two or more.

History traversal uses breadth-first search. I maintain a FIFO queue and a visited map to handle the graph correctly without cycles. BFS respects approximate chronological ordering better than DFS, and the `limit` parameter short-circuits traversal for performance — no need to walk a 10,000-commit history just to show the last 20.

The BFS also handles merge commits naturally: both parents are queued when encountered, so the full reachable history is explored without special cases.

![Commit DAG showing BFS traversal across a branch merge, with visited map preventing duplicate processing](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### The Tree Builder

When you run `commit`, the index's flat list of file paths gets converted into a nested tree of tree objects. I wrote a two-phase builder for this: first, walk the index entries and reconstruct the in-memory directory hierarchy; second, recursively create tree objects bottom-up, writing each to the store and returning its SHA-1 to the parent.

For directories with three or more subdirectories, the builder switches to concurrent processing using a generic `WorkerPool[T, R]`. Below that threshold, the goroutine overhead isn't worth it. Above it, subdirectories are built in parallel, with results collected via channels and assembled into the parent tree.

---

## Key Features

- Full Git object model: blob, tree, and commit objects with SHA-1 addressing and DEFLATE compression
- Binary index format matching Git's v2 spec, including SHA-1 checksum integrity on every read
- Content-addressable storage with two-level sharding, deduplication, and idempotent writes
- BFS commit history traversal with early termination, visited-map cycle protection, and merge commit support
- Adaptive concurrent tree building using a generic `WorkerPool[T, R]` with `errgroup` cancellation
- Full branch lifecycle: create, delete, rename, list, checkout, detached HEAD, and orphan branches
- `show` command for inspecting commits, trees, and blobs — including tree-to-tree patch diffs
- Hierarchical config system with five precedence levels (CLI > repo > user > system > built-in defaults)
- Type-safe path abstractions that prevent mixing absolute, relative, and source paths at compile time
- Atomic file writes using write-to-temp-then-rename, preventing partial writes even on process crash
- Typed error system with 11 named codes, package-namespaced, and programmatically inspectable
- Cross-platform support via Go build tags (`stat_unix.go` / `stat_windows.go`) with path normalization
- Terminal UI built on `charmbracelet/lipgloss` with styled status icons, commit boxes, and color coding
- CI pipeline with race detection, format enforcement, and coverage reporting across Go 1.21 and 1.22

---

## Results & Impact

| Dimension            | Outcome                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| Commands implemented | `init`, `add`, `commit`, `log`, `status`, `branch`, `checkout`, `show` |
| Object types         | Blob, Tree, Commit — fully serializable and content-addressed          |
| Index format         | Git v2-compatible binary format with SHA-1 checksum integrity          |
| Concurrency model    | Adaptive goroutine pooling with generic `WorkerPool[T, R]`             |
| Config levels        | 5-level hierarchy with platform-aware defaults                         |
| Test coverage        | Table-driven tests, race detection, Git compatibility comparison suite |
| Cross-platform       | Linux, macOS, Windows with build-tag stat abstraction                  |
| CI enforcement       | Format, vet, race, coverage on every push                              |

The biggest result isn't a metric — it's the depth of understanding I gained. After building the index serializer, I stopped being confused by `git add -p`. After implementing tree hashing, merge conflicts made intuitive sense. The project achieved exactly what I set out for.

---

## Challenges & What I Learned

### Getting the Binary Format Exactly Right

The Git index format is precise to the byte. Entry padding must bring each record to an 8-byte alignment. The flags field packs four distinct sub-fields into 16 bits. The SHA-1 checksum covers every byte of the file except itself. Getting any of these wrong produces silent corruption that only shows up when you try to read the file back.

I spent several days getting the padding arithmetic right. My first version had an off-by-one in the null terminator handling that caused the checksum to always fail. The fix was simple — one line — but finding it required building a hex dump tool and comparing my output byte-for-byte against a real Git index. After that, I developed a habit of writing the deserializer immediately after the serializer and running a round-trip test before moving on.

### Tree Entry Sorting and Determinism

Git's tree format requires entries to be sorted in a very specific way. The sort is lexicographic, but directories are treated as if they have a trailing `/` appended. This means `src` (a directory) sorts differently than `src` (a file), and `src/` sorts before `src.txt`.

My first implementation used simple alphabetical sorting and produced trees that looked correct on inspection but hashed differently than Git expected. The hashes were wrong because the same content in a different sort order serializes to different bytes, producing a different SHA-1. I had to rewrite the `CompareTo` method with the directory-as-trailing-slash rule, then verify it against a table of known Git tree hashes. Lesson: in a content-addressed system, byte order is everything.

### Tuning the Concurrency Threshold

The tree builder uses goroutines when a directory has three or more subdirectories. I chose three by benchmarking, but getting there was more interesting than the number itself. My first implementation spawned a goroutine per subdirectory unconditionally, which was actually slower on small trees because goroutine creation and channel synchronization dominated the runtime.

I benchmarked combinations of threshold and worker count, then read Go's scheduler internals to understand why. The insight was that goroutines are cheap but not free — for work that takes less than a few microseconds, the overhead exceeds the gain. Three subdirectories is roughly the crossover point where the parallelism starts paying off. I also learned to use `errgroup` correctly: cancel the context on the first error and let workers drain, rather than collecting all errors.

### Cross-Platform Stat Fields

The index stores inode numbers and device IDs from `os.Stat()`. On Linux and macOS these come from `syscall.Stat_t` directly. On Windows, `syscall.Stat_t` doesn't have those fields. I had to write platform-specific stat extraction via Go build tags — `stat_unix.go` with `//go:build !windows` and `stat_windows.go` that synthesizes inode-like values from file identity.

The Windows version required digging into the Windows file API to extract a `FileIndex` that approximates an inode. It's not perfect — but it's deterministic and doesn't break the index on Windows. The broader lesson was that "cross-platform Go" means writing less code than you expect in most cases, but then writing very platform-specific code in the few places where the OS model fundamentally differs.

---

## Under the Hood — Technical Deep Dive

The most technically interesting parts of SourceControl are the pieces that had to match Git's exact semantics, not just approximate them.

### Object Serialization and Hashing

Every object is serialized using Git's header format before hashing: the type string, a space, the byte length of the content in ASCII decimal, a null byte, then the raw content. The SHA-1 is computed over this entire serialized form — not just the content. This is why two files with the same bytes but wrapped in different object types hash differently.

I store the hash lazily: `Blob`, `Tree`, and `Commit` each hold a pointer to their hash, nil until first access. The pointer is computed once and cached. Many objects are created during tree building but never hashed (only their final form gets hashed), so this avoids a significant amount of unnecessary SHA-1 computation.

![Serialization flow: content → header prepend → SHA-1 hash → DEFLATE compress → write to sharded path](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### The Index Binary Protocol

The index is the most complex binary format in the project. I chose to implement exact Git v2 compatibility because I wanted to be able to validate my output against real Git. That meant no shortcuts: I had to handle the 8-byte alignment padding correctly, implement the 12-bit filename-length sub-field in the flags word, and write a round-trip checksum verifier.

Reading and writing are handled by separate functions using Go's `encoding/binary` with explicit `binary.BigEndian` byte order everywhere. I chose to store all integer fields big-endian because Git does, and because big-endian is the network byte order convention — consistent across platforms. The checksum is computed incrementally using `crypto/sha1` fed with a `bytes.Buffer` that mirrors the write stream.

![Index binary layout: DIRC header, variable-length entries with 8-byte padding, and trailing SHA-1 checksum](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Generic Worker Pool

The `WorkerPool[T, R]` in `pkg/common/concurrency/` is a general-purpose concurrent task processor built with Go generics. Input type `T` and result type `R` are fully parameterized. It supports three modes: slice processing with ordered results, map processing with keyed outputs, and streaming via channels.

Internally it uses a buffered task channel and a buffered result channel to decouple producers, workers, and consumers. Workers run in an `errgroup`-managed goroutine group — the first error cancels the context and signals all workers to drain. Panics inside worker functions are recovered and converted to errors with a stack trace attached. I chose this design over a simple `sync.WaitGroup` approach because it makes cancellation, error propagation, and result ordering composable without additional plumbing at each call site.

![Worker pool architecture: task channel → N workers → result channel, with errgroup context cancellation](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Typed Error System

Rather than returning `fmt.Errorf` strings or raw `errors.New` values, every package in the project uses a structured `Error` type from `pkg/common/err/`. Each error carries a package name, an operation name, one of 11 named error codes, a human-readable message, and an optional map of structured context fields.

This pays off in the command layer. A `status` command can distinguish a "repository not found" error (walk up further, or tell the user to run `init`) from a "permission denied" error (nothing to do programmatically) from an "invalid format" error (potential corruption). Without typed codes, all three look the same at the call site and require error message string matching — which is fragile and wrong.

The codes are also used by the test suite. Tests assert `err.IsCode(e, err.CodeNotFound)` rather than matching on strings, which means error messages can change freely without breaking tests.

### Reference Resolution and HEAD

References are stored as plain text files under `.source/refs/heads/`. HEAD can either contain a 40-character SHA-1 directly (detached HEAD state) or a symbolic reference like `ref: refs/heads/main`. The reference manager follows symbolic refs recursively, with a depth limit of 10 to prevent infinite loops.

Detached HEAD is a real first-class state in the implementation — not a special case or an error. When you check out a commit SHA directly, HEAD is updated to that SHA. Subsequent commits will not advance any branch. Checking out a branch name replaces the detached SHA with a symbolic ref pointing to that branch. I added this because detached HEAD is one of the states most developers find confusing, and implementing it made me understand exactly why it works the way it does.

![Reference resolution chain: HEAD → symbolic ref → branch ref → commit SHA, with detached HEAD shortcut](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

---

## Links

- [GitHub — utkarsh5026/SourceControl](https://github.com/utkarsh5026/SourceControl)
