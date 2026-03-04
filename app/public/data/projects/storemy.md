# StoreMy

![StoreMy terminal interface showing SQL query results in a dark-themed TUI](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/Screenshot%202026-03-04%20054124.png)

> A fully functional relational database management system, built from scratch in Go — pages, locks, logs, and all.

## Why I Built This

I've been using databases for years. MySQL, PostgreSQL, SQLite — I've wired them up to applications, tuned queries, added indexes, and thought I understood them. But I didn't, not really. I understood how to use them. I had no idea how they actually worked.

The question that started this project was embarrassingly simple: what happens when I call `INSERT`? Not the API call. The actual thing. What bytes go where, what guarantees get made, and who is responsible for keeping them? I started pulling on that thread and found I couldn't stop.

So I built a database. Not a toy, not a key-value store — an actual relational database with SQL, transactions, indexes, crash recovery infrastructure, and a terminal UI. I wanted to know what it felt like to own every layer of the stack.

## The Problem

Most developers interact with databases as black boxes. You send SQL in, rows come out, and somewhere in the middle there's magic that ensures your data doesn't get corrupted if the server crashes mid-write. That's fine for building applications — but it's a terrible foundation for understanding performance, debugging weird behavior, or knowing which database to reach for and why.

The resources for learning database internals are either too shallow (blog posts that explain B+Trees without discussing concurrency) or too deep (dense academic papers on ARIES recovery algorithms). Very few resources let you trace a single `INSERT` all the way from the SQL string to the bits on disk while simultaneously holding a transaction lock.

I wanted something I could run, break, trace, and own entirely.

![Add image here — developer staring at a complex system diagram, representing the challenge of understanding database internals](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-flow.svg)

## The Solution

I built StoreMy — a production-grade educational RDBMS in Go, implementing the complete database stack with no external database libraries. Every layer is hand-written: the page format, the buffer pool, the lock manager, the write-ahead log, the SQL parser, the query optimizer, the join algorithms, and the terminal UI.

The architecture is organized into **13 strict dependency layers**, where packages at lower levels have no knowledge of higher ones. This isn't just good practice — it's the only way to build a system this complex without losing your mind.

![System architecture diagram showing 13 dependency layers from primitives at the bottom to the terminal UI at the top](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-code-flow.svg)

### Storage Engine

The foundation is a **slotted-page storage engine** with fixed **4KB pages**. Every piece of data — whether it's a user row or a system catalog entry — ultimately lives in a page on disk. Pages are the unit of I/O, locking, and buffering throughout the entire system.

The buffer pool holds **1,000 pages (4MB)** in memory using an LRU cache. An O(1) eviction policy ensures the most recently used pages stay hot without any scanning. If you need a page and it's not cached, the system loads it from disk, potentially evicting a cold page to make room.

Rows are stored in heap files using a slotted-page format that supports variable-length tuples. Alongside heap storage, I built two index structures: a **B+Tree** for sorted range queries and a **Hash index** for O(1) equality lookups.

![Add image here — diagram of a 4KB slotted page showing the header, slot array, and tuple data regions](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-storage.svg)

### Transaction Engine

The transaction layer implements full **ACID guarantees** through two interlocking mechanisms: **Two-Phase Locking (2PL)** for isolation, and **Write-Ahead Logging (WAL)** for durability.

The lock manager operates at page granularity, granting shared locks for reads and exclusive locks for writes. Before any transaction enters the wait queue, the system runs a dependency graph cycle check — if a deadlock would result, the transaction gets an immediate error instead of blocking forever.

The buffer pool enforces **NO-STEAL/FORCE** policies: dirty pages from uncommitted transactions are never evicted to disk, and at commit time, every dirty page is flushed before the COMMIT record is written. These two constraints together eliminate the need for the undo phase of crash recovery.

### Query Engine

SQL arrives as a string and passes through a **recursive-descent parser** that builds an AST, then through a **cost-based optimizer** that chooses physical operators and selects a join algorithm based on cardinality estimates from the system catalog.

Execution uses a **streaming iterator model** — every operator implements `Open/HasNext/Next/Rewind/Close`. Results flow one tuple at a time, meaning even a join over two large tables never materializes the full result set unless explicitly requested.

I implemented three join algorithms with automatic selection: **Hash Join** (O(n+m), equi-joins), **Sort-Merge Join** (O(n log n + m log m)), and **Block Nested Loop** (works with any predicate type). The optimizer picks the cheapest one given the current statistics.

![Add image here — query execution pipeline showing SQL string flowing through lexer, parser, planner, optimizer, and operator tree](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-query-engine.svg)

### Terminal UI

The interface is built with **Bubble Tea**, the Go TUI framework from Charmbracelet. It has a SQL editor with syntax feedback, a scrollable result view, a status bar, query history navigation, and an inline help panel. Queries execute asynchronously so the spinner animates smoothly while the database works.

The dark theme uses a purple accent color palette and renders result sets as formatted tables. Running `SHOW TABLES`, `EXPLAIN`, or any DML statement gives you immediate formatted output in the terminal.

![Add image here — screenshot of the StoreMy terminal UI showing a SQL editor, query results table, and status bar](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

## Key Features

- Full SQL support: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`, `DROP TABLE`, `CREATE INDEX`
- Slotted-page storage with 4KB pages and variable-length tuple support
- B+Tree index with doubly-linked leaf pages for efficient range scans
- Hash index for O(1) equality lookups
- LRU buffer pool with O(1) eviction using a HashMap + doubly-linked list
- Two-Phase Locking (2PL) with page-granularity shared and exclusive locks
- Deadlock detection via a wait-for dependency graph, checked before blocking
- Lock upgrades from shared to exclusive without deadlock risk
- Write-Ahead Logging with LSN chains, before-images, and after-images
- NO-STEAL/FORCE buffer policies for ACID durability without full ARIES
- Cost-based query optimizer with cardinality estimation from catalog statistics
- Three pluggable join algorithms: Hash Join, Sort-Merge Join, Block Nested Loop
- Aggregate functions — `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` — with `GROUP BY`
- `UNION`, `INTERSECT`, and `EXCEPT` set operations
- Self-describing system catalog stored as regular tables
- Background statistics updater keeping cost estimates fresh
- Terminal UI with async query execution, query history, and formatted result tables
- `EXPLAIN` and `SHOW INDEXES` utility commands
- Docker support for demo and automated test modes

## Results & Impact

I ended up building something considerably larger than I originally planned. The scope grew organically — every subsystem I finished revealed the next one that needed to be done properly.

| Metric                        | Value                             |
| ----------------------------- | --------------------------------- |
| Total source lines            | ~100,000                          |
| Production Go files           | 149                               |
| Total Go files (incl. tests)  | 289                               |
| Packages                      | 49                                |
| Architectural layers          | 13                                |
| System catalog tables         | 6                                 |
| Join algorithms               | 3                                 |
| Supported SQL statement types | 10+                               |
| Default buffer pool size      | 4 MB (1,000 × 4KB pages)          |
| Maximum lock wait             | ~20 seconds (200 retries × 100ms) |

The project took me from "I know how to use a database" to "I know how a database actually works." I can now read papers on ARIES recovery or MVCC and immediately map the concepts to concrete implementations I've written myself. That transfer is hard to overstate.

## Challenges & What I Learned

### The Lock Table Identity Problem

For a long time, my lock manager would intermittently fail to detect conflicts — two transactions would both think they had an exclusive lock on the same page. The bug was subtle: the lock table was keyed on `*PageID` pointer identity. Different parts of the codebase created new `PageDescriptor` instances representing the same logical page, and the lock table treated them as distinct keys.

The fix was to normalize all page identifiers using a `HashCode()` — an FNV-64a hash over the serialized `(FileID, PageNumber)` pair. The first `PageDescriptor` seen for each hash code becomes the canonical reference; all subsequent operations use that canonical key. Pointer identity stopped mattering entirely. I spent two days on this before finding the root cause, and it permanently changed how I think about object identity vs. value equality.

### Deadlock Detection: When You Check Matters As Much As Whether You Check

My first deadlock detection implementation was correct in theory but wrong in practice. I would add the transaction to the wait queue and then check for a cycle. If I found one, I'd remove the transaction and return an error. This worked most of the time, but there was a race window where the transaction had already started sleeping — the error signal arrived after the goroutine was blocked.

The fix was to check for a cycle **before** the transaction starts waiting, not after. If adding the wait-for edge would create a cycle, the transaction never enters the queue at all — it gets an immediate error and can abort and retry cleanly. This "deadlock gate" pattern means the wait-for graph never contains a cycle; cycles are caught at the door. The retry logic uses exponential backoff to spread out contention on hot pages.

### Getting WAL-Before-Write Right

Write-Ahead Logging sounds simple in principle: write the log, then write the page. But in a system where the buffer pool, the WAL writer, and the lock manager are all separate components, enforcing this ordering consistently is genuinely difficult. Early versions had paths where pages could be flushed to disk before their log records were synced.

The invariant I eventually encoded: `HandlePageChange()` in the PageStore always writes and forces the WAL record before marking the page as dirty and eligible for flushing. No direct page write happens without going through this function. It's now a critical invariant documented alongside the buffer pool code — one of those rules that must never be violated regardless of what refactoring happens around it.

### The NO-STEAL Decision and Its Tradeoffs

I chose NO-STEAL (never evict dirty pages from uncommitted transactions) and FORCE (flush all dirty pages at commit) specifically because they let me skip the undo phase of ARIES recovery. With NO-STEAL, if a transaction aborts, its dirty pages are simply discarded from the buffer pool — no on-disk undo needed. With FORCE, every committed transaction's data is already on disk, so redo isn't needed for normal operation.

The tradeoff is memory pressure under long-running transactions. If a transaction modifies thousands of pages, all of them must stay in the buffer pool until commit. In a production database, this would be unacceptable. But for an educational system with well-bounded workloads, it keeps the recovery story clean and understandable. The WAL infrastructure is fully built — LSN chains, before-images, checkpoint records — so adding ARIES recovery is a matter of implementing the startup phases, not rebuilding from scratch.

### B+Tree Separator Keys and the Cascade Problem

B+Trees maintain an invariant: every separator key in an internal (non-leaf) node must equal the minimum key of its corresponding child. This is easy to maintain when inserting in the middle of a node, but breaks silently when you insert at position zero of a leaf — the leaf's minimum key changes, and the parent's separator becomes stale.

I discovered this by running range scans after sequences of insertions at the front of the key space. Some keys would appear twice in range results; others would vanish entirely. The fix required propagating key updates upward through the tree whenever a leaf's minimum changed, which could cascade through multiple levels of internal nodes. Getting the recursion termination conditions right — especially for root splits — took more iterations than I'd like to admit.

## Under the Hood — Technical Deep Dive

### Page Format and the Ownership Boundary

Every piece of data in StoreMy lives in a **4KB slotted page**. The format stores a header, a slot array growing from the front, and tuple data growing from the back — a classic design that handles variable-length rows without fragmentation.

I drew a sharp line between `PageIO` (an interface for reading and writing page bytes) and `DbFile` (the full file abstraction including lifecycle methods like `Close()`). The buffer pool only ever touches `PageIO`. The `CatalogManager` is the sole owner of `DbFile` instances and the only component that calls `Close()`.

This single constraint eliminated an entire class of bugs. Before I enforced it, double-close errors and use-after-close panics were a recurring problem. Afterwards, file lifecycle became a solved problem — there was exactly one place responsible for it.

![Diagram showing PageIO vs DbFile boundary: PageStore holds PageIO references, CatalogManager owns DbFile instances exclusively](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-ownership.svg)

### 2PL Lock Manager with Dependency-Graph Deadlock Detection

The lock manager maintains two data structures: a page-to-locks index (for conflict checking) and a transaction-to-held-locks index (for release at commit/abort). A separate `WaitQueue` tracks which transactions are blocked on which pages, and a `DependencyGraph` tracks wait-for edges between transactions.

Lock acquisition has a defined protocol: try to grant immediately; if blocked, add a wait-for edge to the dependency graph and check for a cycle before sleeping. The cycle check runs in O(V+E) using iterative DFS. If a cycle is found, the edge is removed and an error is returned — the transaction never waits. If no cycle is found, the transaction sleeps on a notification channel and retries when woken up.

This "deadlock gate" design means the wait-for graph is always acyclic at rest. Deadlock is not detected and resolved — it is prevented at the entry point.

![Diagram of the lock manager: page-to-locks map, transaction-to-locks map, WaitQueue, and DependencyGraph with cycle detection highlighted](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-lock-manager.svg)

### LRU Buffer Pool with NO-STEAL/FORCE

The LRU cache achieves O(1) get, put, and remove by pairing a Go `map[HashCode]*list.Element` with a `container/list` doubly-linked list. A cache hit moves the element to the front in one operation. An eviction removes the tail element — but only if that page is clean and not currently locked by an active transaction.

The `PageStore` coordinates the buffer pool with the transaction layer. When a transaction commits, `PageStore` flushes every dirty page it owns to disk before writing the COMMIT log record. When a transaction aborts, dirty pages are restored from their WAL before-image and discarded. The cache never evicts a dirty page, so aborts never require disk reads to reconstruct the pre-transaction state.

These two policies together give ACID guarantees with simpler recovery semantics than a full steal/no-force database.

![Diagram of the buffer pool: LRU doubly-linked list with HashMap, dirty page tracking, and flush-on-commit flow](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-lru-cache.svg)

### B+Tree Index

The B+Tree index stores `(key, RID)` pairs in leaf pages, with internal pages holding separator keys and child page pointers. The root always lives at page 0. Leaf pages form a **doubly-linked list**, so range scans can start at the leftmost matching leaf and walk the chain without ever returning to internal nodes — the typical O(log n + k) range scan complexity.

The key structural invariant is that every separator key in an internal node equals the minimum key of its corresponding right child. Maintaining this invariant through insertions and deletions requires updating parent nodes whenever a child's first key changes, and those updates can cascade upward through the tree.

I wrapped all tree operations in the same lock-acquire path as the buffer pool, so B+Tree pages are subject to the same 2PL rules as heap pages. The tree acquires shared locks when traversing for reads and upgrades to exclusive locks when modifying nodes.

![Diagram of the B+Tree structure: root at page 0, internal nodes with separator keys, doubly-linked leaf pages with (key, RID) entries](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-btree.svg)

### Cost-Based Query Optimizer

The optimizer receives a logical plan tree and selects physical operators. For join nodes, it gathers **cardinality estimates** from the system catalog (updated every 30 seconds by a background goroutine) and computes the estimated I/O cost for each of the three join algorithms given the current table sizes and available memory.

Selectivity estimates for `WHERE` predicates follow standard heuristics: equality on a primary key → 1/n, equality on a non-key column → 1/distinct_values, range predicates → proportional fraction of the value domain. The optimizer multiplies selectivities across independent predicates and uses the result to estimate intermediate result sizes.

The join order is currently determined by the query structure rather than cost-based reordering — join reordering is on the roadmap. Even so, the per-join algorithm selection meaningfully improves performance for skewed workloads where one algorithm dominates the others.

![Diagram of the cost model: catalog statistics feeding into selectivity estimates, cardinality estimation, and join algorithm selection](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-cost-optimization.svg)

### Self-Describing System Catalog

The catalog stores all metadata — table definitions, column types, indexes, and statistics — in **six regular heap tables** that follow the same storage format as user tables. There is no special-cased metadata store. The catalog tables are accessed using the same scan operators and buffer pool as everything else.

This design pays a complexity cost at bootstrap (the catalog tables need to exist before they can describe themselves) but simplifies everything afterward. A `SHOW TABLES` query literally scans the `CATALOG_TABLES` heap file. Statistics updates write tuples to `CATALOG_STATISTICS` using the normal insert path. The entire system is self-consistent in a way that feels genuinely elegant once it's working.

![Diagram showing the six system catalog tables and how they reference each other to describe tables, columns, indexes, and statistics](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/storemy/storemy-cost-optimization.svg)

## Links

- [GitHub — StoreMy source code](https://github.com/utkarsh-pro/storemy)
