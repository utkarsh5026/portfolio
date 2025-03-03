import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface CursorProps {
  isTyping: boolean;
  isEmpty: boolean;
}

const CursorComponent: React.FC<CursorProps> = ({ isTyping, isEmpty }) => {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    cursor.style.opacity = "1";

    if (!isTyping && isEmpty) {
      const animation = anime({
        targets: cursor,
        opacity: [1, 0],
        duration: 600,
        loop: true,
        easing: "steps(2, end)",
        direction: "alternate",
      });

      return () => {
        animation.pause();
        if (cursor) cursor.style.opacity = "1";
      };
    }
  }, [isTyping, isEmpty]);

  return (
    <span
      ref={cursorRef}
      className="text-[#cdd6f4] font-mono h-5 w-[2px] sm:w-[3px] inline-block bg-[#89b4fa] animate-pulse"
      style={{
        animationDuration: "1s",
        verticalAlign: "middle",
        transform: "translateY(1px)",
      }}
    ></span>
  );
};

const Cursor = React.memo(CursorComponent);
export default Cursor;
