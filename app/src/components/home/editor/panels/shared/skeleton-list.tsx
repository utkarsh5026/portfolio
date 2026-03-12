import React from "react";

interface SkeletonListProps {
  component: React.ComponentType;
  count?: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  component: Component,
  count = 8,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </>
  );
};

export default SkeletonList;
