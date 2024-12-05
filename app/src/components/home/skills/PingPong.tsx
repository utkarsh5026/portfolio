import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";

const PingPongAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const paddle1Ref = useRef<HTMLDivElement>(null);
  const paddle2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState({ left: 0, right: 0 });
  const gameStateRef = useRef({
    isPlaying: true,
    ballX: 50,
    ballY: 150,
    ballVX: 2.5,
    ballVY: 1,
    paddle1Y: 110,
    paddle2Y: 110,
    paddle1VY: 2,
    paddle2VY: 2,
    lastCollisionTime: 0, // To prevent multiple collisions
  });

  useEffect(() => {
    if (
      !containerRef.current ||
      !ballRef.current ||
      !paddle1Ref.current ||
      !paddle2Ref.current
    )
      return;

    const paddleHeight = 80;
    const containerWidth = 600;
    const containerHeight = 300;
    const ballSize = 20;
    const COLLISION_COOLDOWN = 500; // Minimum time between collisions in ms

    const initPositions = () => {
      const gameState = gameStateRef.current;
      if (!paddle1Ref.current || !paddle2Ref.current || !ballRef.current)
        return;

      anime.set(paddle1Ref.current, {
        translateX: 20,
        translateY: gameState.paddle1Y,
      });

      anime.set(paddle2Ref.current, {
        translateX: containerWidth - 28,
        translateY: gameState.paddle2Y,
      });

      anime.set(ballRef.current, {
        translateX: gameState.ballX,
        translateY: gameState.ballY,
      });
    };

    const createHitEffect = (x: number, y: number) => {
      const hitEffect = document.createElement("div");
      hitEffect.className =
        "absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60";
      hitEffect.style.left = `${x - 16}px`;
      hitEffect.style.top = `${y - 16}px`;
      containerRef.current?.appendChild(hitEffect);

      anime({
        targets: hitEffect,
        scale: [1, 2],
        opacity: [0.6, 0],
        duration: 400,
        easing: "easeOutExpo",
        complete: () => hitEffect.remove(),
      });
    };

    const predictBallPosition = (
      currentY: number,
      targetY: number,
      speed: number
    ) => {
      if (Math.abs(currentY - targetY) < speed) return currentY;
      return currentY + (targetY > currentY ? speed : -speed);
    };

    const handleScoring = (winner: "left" | "right") => {
      const gameState = gameStateRef.current;
      gameState.isPlaying = false;

      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));

      // Pause for 1 second before resetting
      setTimeout(() => {
        gameState.ballX = containerWidth / 2;
        gameState.ballY = containerHeight / 2;
        gameState.ballVX = 2.5 * (winner === "left" ? -1 : 1);
        gameState.ballVY = (Math.random() - 0.5) * 2;
        gameState.isPlaying = true;
      }, 1000);
    };

    const checkCollision = () => {
      const gameState = gameStateRef.current;
      const currentTime = Date.now();

      // Only check collisions if enough time has passed since last collision
      if (currentTime - gameState.lastCollisionTime < COLLISION_COOLDOWN) {
        return false;
      }

      // Paddle collision checks with proper bounds
      const leftPaddleCollision =
        gameState.ballX <= 30 &&
        gameState.ballX >= 20 &&
        gameState.ballY + ballSize >= gameState.paddle1Y &&
        gameState.ballY <= gameState.paddle1Y + paddleHeight;

      const rightPaddleCollision =
        gameState.ballX >= containerWidth - 38 &&
        gameState.ballX <= containerWidth - 28 &&
        gameState.ballY + ballSize >= gameState.paddle2Y &&
        gameState.ballY <= gameState.paddle2Y + paddleHeight;

      if (leftPaddleCollision || rightPaddleCollision) {
        gameState.lastCollisionTime = currentTime;
        createHitEffect(gameState.ballX, gameState.ballY);
        return true;
      }

      return false;
    };

    const updateGame = () => {
      const gameState = gameStateRef.current;

      if (!gameState.isPlaying) {
        requestAnimationFrame(updateGame);
        return;
      }

      // Update ball position
      gameState.ballX += gameState.ballVX;
      gameState.ballY += gameState.ballVY;

      // Ball collision with top and bottom
      if (
        gameState.ballY <= 0 ||
        gameState.ballY >= containerHeight - ballSize
      ) {
        gameState.ballVY *= -1.05;
        createHitEffect(gameState.ballX, gameState.ballY);
      }

      // Check for paddle collisions
      if (checkCollision()) {
        gameState.ballVX *= -1.05;
        gameState.ballVY += (Math.random() - 0.5) * 1; // Small random angle change
      }

      // Scoring
      if (gameState.ballX <= 0) {
        handleScoring("right");
      } else if (gameState.ballX >= containerWidth) {
        handleScoring("left");
      }

      // AI paddle movement
      const predictedY1 = gameState.ballY - paddleHeight / 2;
      gameState.paddle1Y = predictBallPosition(
        gameState.paddle1Y,
        predictedY1,
        gameState.paddle1VY
      );

      const timeToReach =
        (containerWidth - 38 - gameState.ballX) / Math.abs(gameState.ballVX);
      const predictedY2 =
        gameState.ballY + gameState.ballVY * timeToReach - paddleHeight / 2;
      gameState.paddle2Y = predictBallPosition(
        gameState.paddle2Y,
        predictedY2,
        gameState.paddle2VY
      );

      // Keep paddles within bounds
      gameState.paddle1Y = Math.max(
        0,
        Math.min(containerHeight - paddleHeight, gameState.paddle1Y)
      );
      gameState.paddle2Y = Math.max(
        0,
        Math.min(containerHeight - paddleHeight, gameState.paddle2Y)
      );

      // Update visual positions
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${gameState.ballX}px, ${gameState.ballY}px)`;
      }
      if (paddle1Ref.current) {
        paddle1Ref.current.style.transform = `translate(20px, ${gameState.paddle1Y}px)`;
      }
      if (paddle2Ref.current) {
        paddle2Ref.current.style.transform = `translate(${
          containerWidth - 28
        }px, ${gameState.paddle2Y}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gameState.ballX}px, ${gameState.ballY}px)`;
      }

      requestAnimationFrame(updateGame);
    };

    initPositions();
    updateGame();
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 p-4">
      <div
        ref={containerRef}
        className="relative w-[600px] h-[300px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden"
      >
        {/* Score display */}
        <div className="absolute top-4 left-0 w-full flex justify-center gap-8 text-2xl text-white/70 font-semibold z-10">
          <span>{score.left}</span>
          <span>{score.right}</span>
        </div>

        {/* Table lines */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20" />

        {/* Paddles */}
        <div
          ref={paddle1Ref}
          className="absolute w-2 h-20 rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
        />
        <div
          ref={paddle2Ref}
          className="absolute w-2 h-20 rounded-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600"
        />

        {/* Ball */}
        <div
          ref={ballRef}
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-white to-blue-200"
        />

        {/* Ball glow effect */}
        <div
          ref={glowRef}
          className="absolute w-12 h-12 rounded-full bg-blue-500/20 blur-xl pointer-events-none"
        />

        {/* Table border glow */}
        <div className="absolute inset-0 rounded-lg border border-blue-500/30" />
      </div>
    </div>
  );
};

export default PingPongAnimation;
