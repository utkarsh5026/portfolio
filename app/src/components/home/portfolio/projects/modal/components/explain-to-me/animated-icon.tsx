import { Cog, Lightbulb, Telescope } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedIconProps {
  IconComponent: React.ElementType;
  className?: string;
  isActive?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  IconComponent,
  className,
  isActive = false,
}) => {
  const getIconAnimation = () => {
    // Determine icon type based on the component
    if (IconComponent === Lightbulb) {
      return {
        animate: isActive
          ? {
              filter: [
                "brightness(1) drop-shadow(0 0 0px currentColor)",
                "brightness(1.5) drop-shadow(0 0 8px currentColor)",
                "brightness(1.2) drop-shadow(0 0 4px currentColor)",
                "brightness(1.8) drop-shadow(0 0 12px currentColor)",
                "brightness(1) drop-shadow(0 0 0px currentColor)",
              ],
              scale: [1, 1.1, 1, 1.15, 1],
            }
          : {
              filter: "brightness(1) drop-shadow(0 0 0px currentColor)",
              scale: 1,
            },
        transition: isActive
          ? {
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }
          : {
              duration: 0.3,
            },
      };
    } else if (IconComponent === Cog) {
      return {
        animate: isActive
          ? {
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }
          : {
              rotate: 0,
              scale: 1,
            },
        transition: isActive
          ? {
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut",
              },
            }
          : {
              duration: 0.3,
            },
      };
    } else if (IconComponent === Telescope) {
      return {
        animate: isActive
          ? {
              scaleX: [1, 1.2, 0.9, 1.1, 1],
              scaleY: [1, 0.9, 1.1, 0.95, 1],
              rotateZ: [0, -2, 2, -1, 0],
            }
          : {
              scaleX: 1,
              scaleY: 1,
              rotateZ: 0,
            },
        transition: isActive
          ? {
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }
          : {
              duration: 0.3,
            },
      };
    }

    // Default animation fallback
    return {
      animate: isActive
        ? {
            scale: [1, 1.1, 1],
            rotateY: [0, 360],
          }
        : {
            scale: 1,
            rotateY: 0,
          },
      transition: isActive
        ? {
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }
        : {
            duration: 0.3,
          },
    };
  };

  const animation = getIconAnimation();

  return (
    <motion.div
      animate={animation.animate}
      transition={animation.transition}
      className="relative z-10"
    >
      <IconComponent className={className} />
    </motion.div>
  );
};

export default AnimatedIcon;
