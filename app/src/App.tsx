import { ThemeProvider } from "./components/base/ThemeProvider";

import PersonalHeader from "./components/home/intro/PersonalHeader";
import NavigationBar from "./components/base/NavigationBar";
import Skills from "./components/home/skills/Skills";
import Projects from "./components/home/projects/Projects";
import Articles from "./components/home/articles/Articles";
import PingPong from "./components/home/games/PingPong";
import MemoryGame from "./components/home/games/MemoryGame";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-slate-950 w-full overflow-y-auto scrollbar-hide p-32">
        <NavigationBar />

        <main className="flex flex-col gap-32">
          <PersonalHeader />
          <PingPong />
          <Skills />
          <MemoryGame />
          <Projects />
          <Articles />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
