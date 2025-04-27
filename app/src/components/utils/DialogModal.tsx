import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  handleChange: (isOpen: boolean) => void;
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  children,
  handleChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent className="bg-ctp-mantle text-ctp-flamingo w-[90%] max-w-[1000px] z-[99999] border-ctp-surface0 rounded-3xl">
        <DialogDescription className="z-10">{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
