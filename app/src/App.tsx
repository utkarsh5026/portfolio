import { lazy, Suspense, useState } from "react";
import { ThemeProvider } from "./components/base/ThemeProvider";
import PersonalHeader from "./components/home/intro/PersonalHeader";
import NavigationBar from "./components/home/appbar/NavigationBar";
import InfiniteVoid from "./components/base/InfiniteVoid";

// Lazy loaded components
const Skills = lazy(() => import("./components/home/skills/Skills"));
const Projects = lazy(() => import("./components/home/projects/Projects"));
const Articles = lazy(() => import("./components/home/articles/Articles"));
const WorkExperience = lazy(
  () => import("./components/home/work/WorkExperience")
);
const ContactMe = lazy(() => import("./components/home/contact/ContactMe"));

const SectionLoader = () => (
  <div className="h-96 animate-pulse bg-[#1e293b33] rounded-lg" />
);

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isGridAnimationComplete, setIsGridAnimationComplete] = useState(false);

  const sections = {
    home: <PersonalHeader />,
    skills: <Skills />,
    projects: <Projects />,
    experience: <WorkExperience />,
    articles: <Articles />,
    contact: <ContactMe />,
  };

  return (
    <ThemeProvider defaultTheme="dark">
      {!isGridAnimationComplete ? (
        <InfiniteVoid
          onAnimationComplete={() => setIsGridAnimationComplete(true)}
        />
      ) : (
        <>
          <NavigationBar
            onNavClick={(section) => setActiveSection(section)}
            activeSection={activeSection}
          />
          <div className="min-h-screen bg-[#030712] w-full overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
            <main className="flex flex-col">
              <Suspense fallback={<SectionLoader />}>
                <div className="animate-fadeIn">
                  {sections[activeSection as keyof typeof sections]}
                </div>
              </Suspense>
            </main>
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
