import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DialogModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  handleChange: (isOpen: boolean) => void;
  blurIntensity?: "light" | "medium" | "heavy";
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  children,
  handleChange,
  blurIntensity = "medium",
}) => {
  const blurClasses = {
    light: "backdrop-blur-sm bg-ctp-crust/30",
    medium: "backdrop-blur-md bg-ctp-crust/50",
    heavy: "backdrop-blur-xl bg-ctp-crust/70",
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "fixed inset-0 z-[99998] transition-all duration-300",
            blurClasses[blurIntensity]
          )}
        />
        <DialogContent className="bg-ctp-mantle text-ctp-flamingo w-auto z-[99999] border-ctp-surface0 rounded-3xl overflow-auto max-w-[90%]">
          <DialogClose asChild={false} />
          <DialogDescription className="w-full flex flex-col gap-4">
            {children}
          </DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogModal;
