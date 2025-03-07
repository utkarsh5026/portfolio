export const browserTabs = [
  {
    id: "react-docs",
    title: "React Docs - Hooks API",
    url: "https://reactjs.org/docs/hooks-reference.html",
    content: {
      heading: "React Hooks - Building Blocks for Dynamic UIs",
      text: "Hooks let you use state and other React features without writing a class component. With useState and useEffect, you can quickly create responsive components.",
      code: "const [state, setState] = useState(initialState);\n\nuseEffect(() => {\n  document.title = `You clicked ${state} times`;\n});",
      note: "Perfect for creating the dynamic portfolio sections I need!",
    },
  },
  {
    id: "framer",
    title: "Framer Motion | Animation Library",
    url: "https://www.framer.com/motion/",
    content: {
      heading: "Framer Motion - Production-Ready Animations",
      text: "A simple but powerful animation library for React that makes creating smooth, interactive animations effortless.",
      code: 'const variants = {\n  hidden: { opacity: 0 },\n  visible: { opacity: 1 }\n};\n\n<motion.div\n  initial="hidden"\n  animate="visible"\n  variants={variants}\n/>',
      note: "This will make my portfolio feel alive and professional!",
    },
  },
  {
    id: "tailwind",
    title: "Tailwind CSS - Utility-first CSS",
    url: "https://tailwindcss.com/docs",
    content: {
      heading: "Tailwind CSS - Rapidly Build Modern Websites",
      text: "A utility-first CSS framework that allows you to build custom designs without ever leaving your HTML.",
      code: '<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">\n  <div class="flex-shrink-0">\n    <img class="h-12 w-12" src="/img/logo.svg" alt="Logo">\n  </div>\n</div>',
      note: "This will save hours of CSS work - exactly what I need now!",
    },
  },
  {
    id: "portfolio-examples",
    title: "10 Impressive Dev Portfolios 2023",
    url: "https://dev.to/top-portfolios-2023",
    content: {
      heading: "Stand-Out Developer Portfolios of 2023",
      text: "The most impressive and effective developer portfolios that are getting attention from top employers and clients.",
      examples: [
        "Interactive 3D elements",
        "Real-time project demonstrations",
        "Accessibility-first design",
        "Performance metrics displays",
      ],
      note: "Mine isn't even close to ready compared to these!",
    },
  },
];

export const chatMessages = [
  {
    role: "user",
    content:
      "URGENT! Need a React portfolio skeleton with animations that I can deploy in minutes. Someone's viewing my unfinished site!",
  },
  {
    role: "assistant",
    content:
      'I\'ve got you covered! Here\'s a minimal but impressive React portfolio skeleton:\n\n```jsx\nimport { motion } from \'framer-motion\';\n\nconst fadeIn = {\n  hidden: { opacity: 0, y: 20 },\n  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }\n};\n\nconst Portfolio = () => (\n  <div className="min-h-screen bg-slate-900 text-white">\n    <motion.header \n      initial="hidden" animate="visible" variants={fadeIn}\n      className="container mx-auto py-16 text-center"\n    >\n      <h1 className="text-5xl font-bold">Your Name</h1>\n      <p className="text-xl mt-4">Frontend Developer & Designer</p>\n    </motion.header>\n    \n    {/* This displays while you build the rest */}\n    <motion.div \n      initial="hidden" animate="visible" variants={fadeIn}\n      className="text-center py-12"\n    >\n      <p className="text-2xl">Portfolio projects loading soon...</p>\n    </motion.div>\n  </div>\n);\n```\n\nThis will look professional while you finish the rest. Do you need the full project setup instructions?',
  },
  {
    role: "user",
    content:
      "Yes! How do I set up the project structure and what else should I include for a minimum viable portfolio?",
  },
  {
    role: "assistant",
    content:
      'Here\'s the fastest way to get this live:\n\n1. Project structure:\n```\nsrc/\n  components/\n    Header.jsx     # Navigation + intro\n    Projects.jsx   # Portfolio items\n    Contact.jsx    # Contact form\n  App.jsx         # Main component\n  index.js        # Entry point\n```\n\n2. Add these essential elements:\n\n```jsx\n// Projects.jsx - Add this skeleton with placeholders\nconst Projects = () => (\n  <section className="py-16 bg-slate-800">\n    <div className="container mx-auto">\n      <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>\n      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n        {[1, 2, 3].map((_, i) => (\n          <motion.div \n            key={i}\n            whileHover={{ scale: 1.03 }}\n            className="bg-slate-700 rounded-lg p-6 shadow-lg"\n          >\n            <div className="h-40 bg-slate-600 rounded-md mb-4"></div>\n            <h3 className="text-xl font-bold">Project {i+1}</h3>\n            <p className="text-slate-300 mt-2">Coming soon...</p>\n          </motion.div>\n        ))}\n      </div>\n    </div>\n  </section>\n);\n```\n\n3. Immediate deployment:\n```bash\n# Install dependencies\nnpm install framer-motion tailwindcss\n\n# Configure Tailwind\nnpx tailwindcss init\n\n# Build and deploy\nnpm run build\n```\n\nThis gives you a clean, professional-looking foundation that visitors will see while you complete the actual content. You can gradually replace the placeholders with real projects.',
  },
];

export const commands = [
  "npm install framer-motion tailwindcss @headlessui/react --save",
  "mkdir -p src/components && touch src/components/{Header,Projects,Contact}.jsx",
  "npx tailwindcss init -p",
  "npm run build -- --profile",
  "DEPLOYING EMERGENCY PORTFOLIO BUILD...",
];

// Dramatic thought bubbles to enhance storytelling
export const thoughts = [
  "Oh no! Someone's viewing my unfinished portfolio!",
  "Need to find modern component patterns fast...",
  "Coding as fast as I can... this is so stressful!",
  "This AI is saving me... let's implement this now!",
  "Almost there... just need to deploy before they see the mess!",
];
