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
        duration: 800,
        loop: true,
        easing: "easeInOutQuad",
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
      className="text-emerald-300 font-extrabold w-2 sm:w-3"
    >
      |
    </span>
  );
};

const Cursor = React.memo(CursorComponent);
export default Cursor;
