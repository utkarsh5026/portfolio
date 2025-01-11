import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/base/ThemeProvider";
import PersonalHeader from "./components/home/intro/PersonalHeader";
import NavigationBar from "./components/home/appbar/NavigationBar";

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
      <NavigationBar />

      <div className="min-h-screen bg-slate-950 w-full overflow-y-auto scrollbar-hide p-4 sm:p-8 md:p-16 lg:p-32">
        <main className="flex flex-col gap-8 sm:gap-16 md:gap-24 lg:gap-32">
          <section id="home" className="scroll-mt-16">
            <PersonalHeader />
          </section>

          <section id="games" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <PingPong />
            </Suspense>
          </section>
          <section id="skills" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Skills />
            </Suspense>
          </section>
          <section id="memory" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <MemoryGame />
            </Suspense>
          </section>
          <section id="projects" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Projects />
            </Suspense>
          </section>
          <section id="experience" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <WorkExperience />
            </Suspense>
          </section>
          <section id="articles" className="scroll-mt-16">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse bg-slate-800/20 rounded-lg" />
              }
            >
              <Articles />
            </Suspense>
          </section>
          <section id="contact" className="scroll-mt-16">
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
