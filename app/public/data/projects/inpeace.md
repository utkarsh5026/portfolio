# InPeace

![InPeace blocked page showing the four-stage ritual interface with a dark, focused UI](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

> A Chrome extension that turns website blocking into a moment of self-awareness.

## The Problem

Most productivity tools try to remove friction entirely — but for digital distraction, friction _is_ the point. When someone reaches for Reddit mid-task, a simple "site blocked" page is ignored within seconds. The brain dismisses it as an obstacle and reroutes.

The average knowledge worker loses over two hours per day to digital distraction. Existing blockers do nothing to change the _impulse_ — they just delay it by milliseconds. Users learn to whitelist sites, disable extensions, or open incognito tabs without a second thought.

What's missing isn't a stronger lock — it's a mirror. People don't need to be _stopped_, they need to be made _conscious_ of what they're doing.

![A split comparison showing a standard "site blocked" page versus InPeace's multi-stage ritual](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/inpeace/inpeace-comp.svg)

## The Solution

InPeace is a Chrome extension built on **Manifest V3** that intercepts requests to blocked sites and routes them through a four-stage ritual before granting temporary access. The extension uses psychological friction — not technical walls — to make distraction a deliberate choice.

![High-level architecture: background service worker intercepts requests via Declarative Net Request, redirects to blocked.html, which runs the four-stage ritual before whitelisting the site for 30 minutes](https://pub-9e4c1f8428a244cf9603f534bdbe23e8.r2.dev/inpeace/inpeace-flow.svg)

### Stage 1 — Disappointment

The first page the user sees isn't aggressive — it's gently disappointing. A soft message, today's visit count for that site, and a choice: go back, or proceed and "lose your self-respect." The tone is never punitive, always reflective.

The visit counter is intentionally visible. Seeing "7 visits today" to a site you're supposed to be avoiding carries its own weight.

![Stage 1 blocked page showing the visit count and two-choice prompt](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Stage 2 — The Flashlight Hunt

If the user still wants to proceed, they must click a moving button **10 times** while the screen goes dark and only their cursor illuminates a small spotlight around it. Each click resets a 2-second countdown — letting it expire reduces progress.

The button jumps to a new random position after each click. It's not impossible, but it demands sustained, deliberate attention. It can't be done on autopilot.

![The flashlight hunt stage — dark screen with cursor-following spotlight and a moving target button](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Stages 3 & 4 — Reflection and Commitment

Stage 3 is a brief reflective message — auto-advancing after a few seconds. It gives the brain a moment to reconsider without demanding anything.

Stage 4 presents a single checkbox: "I acknowledge I'm wasting time." Checking it starts a 3-second countdown, then the site is whitelisted for **30 minutes** before the cycle resets.

## Key Features

- Four-stage psychological friction ritual before granting site access
- Flashlight Hunt minigame with moving target and 2-second countdown pressure
- 30-minute temporary whitelist after completing the ritual
- Daily visit counter per blocked site, with automatic midnight reset
- Cross-device settings sync via `chrome.storage.sync`
- Enable/disable toggle that preserves the blocked sites list
- 12 popular distraction sites pre-configured out of the box
- Built on Chrome Manifest V3 with the Declarative Net Request API
- Fully type-safe implementation in TypeScript with Vitest test coverage

## Results & Impact

| Metric              | Standard Blocker                   | InPeace                          |
| ------------------- | ---------------------------------- | -------------------------------- |
| Time to bypass      | < 5 seconds                        | 30–60 seconds minimum            |
| User awareness      | None                               | Explicit acknowledgment required |
| Temporary access    | All-or-nothing (disable extension) | Scoped 30-minute whitelist       |
| Visit tracking      | Not available                      | Daily counter per site           |
| Sync across devices | Rarely supported                   | Native via Chrome storage.sync   |
| Friction mechanism  | Technical wall                     | Psychological ritual             |

The goal was never to make distraction _impossible_ — that's a losing battle. The goal was to make it _uncomfortable enough to be conscious_. The ritual takes under a minute but creates enough of a pattern interrupt to change behavior over time.

## Under the Hood — Technical Deep Dive

The extension's architecture is deceptively simple on the surface, but several components required careful engineering to work reliably across browser states, device syncs, and concurrent events.

### Declarative Net Request Blocking

![Rule system architecture showing how the blocked sites list maps to Chrome DNR rules, with a whitelist allow-rule layer sitting on top](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

Chrome's **Declarative Net Request API** (DNR) is Manifest V3's replacement for the older `webRequest` API. It's faster and more privacy-preserving, but less flexible — rules must be declared as static JSON-like structures rather than handled in JavaScript.

InPeace builds DNR rules dynamically from the blocked sites list, assigns each site a unique numeric rule ID, and uses a redirect action to route matching requests to `blocked.html`. When a site is temporarily whitelisted, a corresponding allow-rule is layered on top to override the block — no rule deletion required during the session.

To prevent race conditions when storage changes trigger simultaneous rule updates (e.g. the user saves settings while a cleanup alarm fires), an `isUpdating` boolean flag gates rule recalculations. If an update is already in progress, the new trigger is silently dropped.

### The Flashlight Effect

![CSS custom property data flow: mousemove event → JS updates --mouse-x and --mouse-y → CSS radial-gradient reads values → spotlight renders over dark overlay](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

The flashlight effect is implemented entirely in CSS using custom properties (`--mouse-x`, `--mouse-y`), updated in real time via a `mousemove` listener. A `radial-gradient` on the overlay element reads these values to position the transparent "hole" in the dark mask — no canvas, no WebGL, no performance overhead.

The handler reference is stored explicitly so the listener can be removed cleanly when the stage advances, preventing memory leaks across stage transitions.

### Whitelist Expiration with Chrome Alarms

![Whitelist lifecycle diagram: site added with expiration timestamp → Chrome alarm fires every 5 minutes → expired entries purged from storage → DNR rules recalculated](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

Temporary whitelist entries are stored in `chrome.storage.local` as a map of `site → expiration timestamp`. Chrome Alarms fire every **5 minutes** to run cleanup — any entry whose timestamp has passed is removed, and the DNR ruleset is recalculated.

This design means the extension never holds a live timer for each entry. It's stateless between alarm firings, which makes it robust to browser restarts, system sleep, and service worker recycling — a known challenge in Manifest V3 where background scripts can be terminated at any time.

### Daily Visit Tracking

![Visit counter data model: each site key maps to an object with count and ISO date string; on each visit the stored date is compared to today and count is reset if stale](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

Each site visit is recorded in local storage as `{ count: number, date: string }`, where `date` is an ISO `YYYY-MM-DD` string. On every blocked page load, the stored date is compared to today's date — if they differ, the count resets to 1.

No scheduled jobs, no timers, no midnight event listeners. The approach handles timezone edge cases naturally, survives browser restarts cleanly, and requires no cleanup logic. The test suite covers 21 cases including midnight, month-end, and year-end transitions.

## Links

- [GitHub Repository](https://github.com/utkarshpriyadarshi/inpeace)
- [Chrome Web Store](https://chromewebstore.google.com/search/inpeace)
