import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/base/ThemeProvider";
import PersonalHeader from "./components/home/intro/PersonalHeader";
import NavigationBar from "./components/base/NavigationBar";

// Replace direct imports with lazy imports
const Skills = lazy(() => import("./components/home/skills/Skills"));
const Projects = lazy(() => import("./components/home/projects/Projects"));
const Articles = lazy(() => import("./components/home/articles/Articles"));
const PingPong = lazy(() => import("./components/home/games/PingPong"));
const MemoryGame = lazy(() => import("./components/home/games/MemoryGame"));
const WorkExperience = lazy(
  () => import("./components/home/work/WorkExperience")
);
const ContactMe = lazy(() => import("./components/home/contact/ContactMe"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-slate-950 w-full overflow-y-auto scrollbar-hide p-32">
        <NavigationBar />

        <main className="flex flex-col gap-32">
          {/* Keep PersonalHeader eager loaded as it's above the fold */}
          <section id="home">
            <PersonalHeader />
          </section>

          {/* Wrap lazy loaded components in Suspense */}
          <section id="games">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <PingPong />
            </Suspense>
          </section>
          <section id="skills">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Skills />
            </Suspense>
          </section>
          <section id="memory">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <MemoryGame />
            </Suspense>
          </section>
          <section id="projects">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Projects />
            </Suspense>
          </section>
          <section id="experience">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <WorkExperience />
            </Suspense>
          </section>
          <section id="articles">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Articles />
            </Suspense>
          </section>
          <section id="contact">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <ContactMe />
            </Suspense>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
