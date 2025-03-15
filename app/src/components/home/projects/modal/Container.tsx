import { motion } from "framer-motion";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  color: string;
  title: string;
  icon: React.ReactNode;
}

/**
 * Container Component
 *
 * This component serves as a reusable container for displaying content with a title and an optional icon.
 * It utilizes Framer Motion for animations and is styled with Tailwind CSS.
 *
 * Props:
 * - children (React.ReactNode): The content to be displayed inside the container.
 * - color (string): The color theme for the container and its title. This should correspond to the color classes defined in your Tailwind CSS setup.
 * - title (string): The title to be displayed at the top of the container.
 * - icon (React.ReactNode): An optional icon to be displayed alongside the title. This icon will be styled according to the specified color.
 *
 * Example Usage:
 *
 * <Container color="peach" title="Project Overview" icon={<SomeIcon />}>
 *   <p>This is the content of the container.</p>
 * </Container>
 */
const Container: React.FC<ContainerProps> = ({
  children,
  color,
  title,
  icon,
}) => {
  const coloredIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: `text-ctp-${color} ${
          React.isValidElement(icon) && "className" in icon.props
            ? icon.props.className || ""
            : ""
        }`,
      } as React.HTMLAttributes<HTMLElement>)
    : icon;

  return (
    <motion.div
      className="bg-ctp-crust rounded-xl border border-ctp-surface0 overflow-hidden shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`py-3 px-5 border-b border-ctp-surface0 flex items-center gap-2 bg-ctp-${color}/10`}
      >
        {coloredIcon}
        <h4 className={`font-bold text-ctp-${color}`}>{title}</h4>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
};

export default Container;
