import { useEffect, useRef } from "react";
import { SettingsModalProps } from "./Types";

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  children,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
};
