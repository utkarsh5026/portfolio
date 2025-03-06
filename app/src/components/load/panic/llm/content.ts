export const humanMessage =
  "Help! I need to add animations to my portfolio ASAP. A visitor is looking at it right now! Can you give me some code for smooth section entrance animations using AnimeJS?";

export const aiNormalResponse =
  "I'll help you implement smooth section entrance animations with AnimeJS. Here's some code you can use immediately:";

export const aiCodeResponse = `useEffect(() => {
  const animate = () => {
    anime({
      targets: '.section-animate',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  };
  animate();
}, []);`;

export const conversationHistory = [
  { id: 1, title: "Portfolio Animation Ideas", date: "Today", isActive: true },
  {
    id: 2,
    title: "React Performance Tips",
    date: "Yesterday",
    isActive: false,
  },
  { id: 3, title: "CSS Grid vs Flexbox", date: "2 days ago", isActive: false },
  { id: 4, title: "Next.js API Routes", date: "4 days ago", isActive: false },
  {
    id: 5,
    title: "State Management Options",
    date: "1 week ago",
    isActive: false,
  },
  {
    id: 6,
    title: "Responsive Design Best Practices",
    date: "2 weeks ago",
    isActive: false,
  },
];
