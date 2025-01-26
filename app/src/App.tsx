import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/base/ThemeProvider";
import PersonalHeader from "./components/home/intro/PersonalHeader";
import NavigationBar from "./components/home/appbar/NavigationBar";

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

// Reusable section component
const Section = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-16">
    <Suspense fallback={<SectionLoader />}>{children}</Suspense>
  </section>
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <NavigationBar />
      <div className="min-h-screen bg-[#030712] w-full overflow-y-auto scrollbar-hide p-4 pt-24 sm:p-8 sm:pt-28 md:p-16 md:pt-32 lg:p-32 lg:pt-40">
        <main className="flex flex-col gap-8 sm:gap-16 md:gap-24 lg:gap-32">
          <section id="home" className="scroll-mt-16">
            <PersonalHeader />
          </section>

          <Section id="skills">
            <Skills />
          </Section>

          <Section id="projects">
            <Projects />
          </Section>

          <Section id="experience">
            <WorkExperience />
          </Section>

          <Section id="articles">
            <Articles />
          </Section>

          <Section id="contact">
            <ContactMe />
          </Section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
