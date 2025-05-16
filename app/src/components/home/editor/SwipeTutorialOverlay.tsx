import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface SwipeTutorialOverlayProps {
  onDismiss: () => void;
  isOpen: boolean;
}

const SwipeTutorialOverlay: React.FC<SwipeTutorialOverlayProps> = ({
  onDismiss,
  isOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent className="sm:max-w-xs bg-ctp-crust border-ctp-surface0 z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-ctp-text text-center">
            Swipe to Navigate
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center my-6 relative">
          {/* Swipe animation */}
          <motion.div
            className="absolute inset-0 flex items-center"
            animate={{
              x: [-20, 20, -20],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-8 h-8 bg-ctp-peach/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-ctp-peach rounded-full" />
            </div>
          </motion.div>

          <div className="flex items-center justify-between w-full px-4">
            <FaChevronLeft className="text-ctp-mauve opacity-70" />
            <p className="text-ctp-subtext0 mx-4">Swipe to navigate sections</p>
            <FaChevronRight className="text-ctp-mauve opacity-70" />
          </div>
        </div>

        <div className="text-center text-ctp-subtext1 text-sm">
          <p>Swipe left to go to the next section</p>
          <p>Swipe right to go to the previous section</p>
        </div>

        <DialogFooter>
          <button
            onClick={onDismiss}
            className="w-full bg-ctp-mauve text-ctp-base px-4 py-2 rounded-md font-medium"
          >
            Got it
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SwipeTutorialOverlay;
