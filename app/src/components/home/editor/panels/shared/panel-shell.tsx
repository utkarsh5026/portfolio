import React from "react";

import { cn } from "@/lib/utils";

import styles from "./shared-panel.module.css";

interface PanelShellProps {
  open: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

const PanelShell: React.FC<PanelShellProps> = ({
  open,
  onClose,
  width = "w-72",
  children,
}) => (
  <>
    <div
      className={cn(
        "fixed inset-0 z-40",
        styles.backdrop,
        open && styles.backdropOpen
      )}
      onClick={onClose}
    />
    <div
      className={cn(
        "fixed top-0 left-14 h-full z-50 flex flex-col bg-ctp-mantle border-r border-ctp-surface0 shadow-2xl font-source",
        width,
        styles.panel,
        open && styles.panelOpen
      )}
    >
      {children}
    </div>
  </>
);

export default PanelShell;
