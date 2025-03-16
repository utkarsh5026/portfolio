import React from "react";

interface CursorProps {
  color: string;
}

const Cursor: React.FC<CursorProps> = ({ color }) => {
  return (
    <span
      className={`inline-block w-1 h-5 bg-ctp-${color} ml-0.5 animate-pulse`}
    />
  );
};

export default Cursor;
