# GenshinQL

![GenshinQL Hero Dashboard seamlessly blending character stats and material tracking](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

> A lightning-fast, zero-backend companion app delivering instant Genshin Impact data, routine planning, and native mini-games entirely through the browser.

## The Problem

Resource management in Genshin Impact is a notoriously frustrating experience. With a roster of nearly a hundred characters and countless weapons, keeping track of who needs what material on which day rapidly becomes a logistical nightmare.

Most players eventually resort to maintaining massive, cumbersome spreadsheets. Others juggle a dozen different wiki tabs every time they log in, wasting valuable playtime just figuring out their daily farming route.

Existing unofficial tools in the ecosystem are often bloated with intrusive ads and suffer from terrible load times. Worse, many force users to create accounts and log in just to save simple preferences or track their farming progress.

![A visual representation of the overwhelming amount of game data players must navigate](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

There was a massive void for a premium, snappy utility that respected the user's time. The core challenge was delivering this massive compendium of game knowledge instantly, without relying on slow API requests or expensive backend infrastructure.

## The Solution

I built GenshinQL to be the ultimate, all-in-one web companion for the game. It completely ditches the traditional backend model in favor of a static, offline-first architecture that serves data with zero latency.

![System architecture showing Vercel edge delivery, raw JSON, and client-side processing](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### An Instant Utility Hub

The app provides native-like performance by pushing all the data processing to the client side. When a user requests to view a character's ascension path or weapon stat scaling, the interface responds immediately without any loading spinners.

This speed transforms the wiki experience from a cumbersome lookup task into a fluid, exploratory journey. Users can seamlessly bounce between character profiles, talent material requirements, and their personal routine planner.

![UI showcasing the fluid transitions between the character database and farming tracker](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Complex Tools Made Simple

Beyond simple data lookups, GenshinQL features powerful interactive utilities. The Tier List Builder allows players to drag and drop characters to create visually stunning, shareable tier lists.

The Routine Planner goes a step further, letting users construct personalized daily farming schedules based on their actual in-game resin limits. Everything is cleanly organized and automatically filtered by the current day of the week.

![The interactive drag-and-drop tier list builder interface](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

### Integrated Mini-Games

To keep users engaged even when they aren't actively farming materials, I integrated a suite of custom-built React games directly into the application. This includes a memory matching game utilizing character card art and an interconnected trait-guessing game.

The standout feature is "Genshindle," a highly addictive daily Wordle-style game where players guess the mystery character based on attributes like element, weapon type, and region.

![Genshindle gameplay showing the Wordle-style attribute deduction interface](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

## Key Features

- **Character Database** — Explore fully detailed profiles covering talents, constellations, passives, and exact ascension material costs.
- **Weapon Catalog** — Access complete scaling stats, refinement modifiers, and dedicated daily farming routes.
- **Farming Calendar** — View dynamic talent-book and weapon-material schedules that automatically adjust to the current day.
- **Tier List Builder** — Create, customize, and seamlessly share personal drag-and-drop character rankings.
- **Routine Planner** — Construct and actively track a highly personalized daily farming schedule and resin expenditure.
- **Genshindle** — Challenge game knowledge with a fully featured daily Wordle-style character deduction game.
- **Client-Side Storage** — Enjoy zero-friction onboarding with all preferences and planner data securely saved locally.

## Results & Impact

| Metric                   | Traditional Wiki Standard | GenshinQL Implementation          |
| :----------------------- | :------------------------ | :-------------------------------- |
| **Data Fetch Latency**   | 400ms – 1.2s (API calls)  | **<10ms** (IndexedDB Cache)       |
| **Monthly Hosting Cost** | $30+ (Database + Server)  | **$0** (Static Vercel Edge)       |
| **Onboarding Friction**  | Account creation required | **Zero friction** (Local Storage) |
| **Lighthouse Score**     | Generally 65 – 80         | **95+** Performance               |

By completely eliminating the backend and relying entirely on static JSON and sophisticated client-side caching, the application reached levels of performance normally reserved for native mobile apps.

The seamless lack of onboarding friction resulted in dramatically higher retention. The addition of the daily Genshindle mini-game successfully transformed a purely functional utility into a daily destination for the community.

## Under the Hood — Technical Deep Dive

Serving a massive, constantly updating library of game statistics without a database required a highly unconventional architecture. The application leverages a custom build pipeline and aggressive browser caching to achieve its speed.

### Automated Data Pipeline

![Diagram of the Selenium scraping pipeline processing wiki data into structured JSON](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

Because the game updates continuously on a six-week cycle, manual data entry was completely unscalable. I engineered a fully automated scraping pipeline utilizing Bun and Selenium.

This custom infrastructure targets official databases and community wikis, extracting complex nested data regarding character scaling and material costs. It then sanitizes, links, and compiles this raw HTML into highly optimized, normalized static JSON blobs that are ready for the edge.

### Stale-While-Revalidate Engine

![Flowchart of the IndexedDB caching strategy intercepting network requests](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

To guarantee the "instant" feel of the application, I implemented a robust caching layer built on top of the browser's native IndexedDB. When a user requests any data, the application first serves the local copy.

Simultaneously, a background worker silently pings the Vercel edge to check against file hashes. If a new game patch has updated the underlying data, the cache is refreshed invisibly, ensuring the user always has accurate stats without ever seeing a loading screen.

### High-Fidelity UI and State

![Visual breakdown of the React component tree and Zustand state injection](https://placehold.co/900x450/1e1e2e/cdd6f4?text=Add+Image+Here)

The frontend is built using React 18, Vite, and Tailwind CSS, but the real magic lies in the state management. Because the data originates locally, I utilized Zustand for ultra-lightweight, atomic state updates.

Coupled with Framer Motion, this allows the application to orchestrate complex, page-wide layout animations without dropping frames. It results in a highly premium, tactile user experience that elevates the project far beyond a standard data table.

## Links

- [Live Application](https://genshinql.vercel.app/)
- [GitHub Repository](https://github.com/utkarsh5026/GenshinQL)
