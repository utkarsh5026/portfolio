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
