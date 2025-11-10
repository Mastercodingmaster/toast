import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Toast, ToastPosition } from "@shared/toast-types";
import { toastManager } from "./toast-manager";
import { ToastItem } from "./toast-item";
import { cn } from "@/lib/utils";
import "./styles.css";

interface ToastContainerProps {
  position?: ToastPosition;
}

const positionStyles: Record<ToastPosition, string> = {
  "top-left": "flex-col",
  "top-center": "flex-col items-center",
  "top-right": "flex-col",
  "bottom-left": "flex-col-reverse",
  "bottom-center": "flex-col-reverse items-center",
  "bottom-right": "flex-col-reverse",
};

const positionInlineStyles: Record<ToastPosition, React.CSSProperties> = {
  "top-left": { top: "1.5rem", left: "1.5rem" },
  "top-center": { top: "1.5rem", left: 0, right: 0 },
  "top-right": { top: "1.5rem", right: "1.5rem" },
  "bottom-left": { bottom: "1.5rem", left: "1.5rem" },
  "bottom-center": { bottom: "1.5rem", left: 0, right: 0 },
  "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
};

export function ToastContainer({ position = "top-right" }: ToastContainerProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((newToasts) => {
      setToasts(newToasts);
    });
    return unsubscribe;
  }, []);

  const toastsByPosition = toasts.reduce((acc, toast) => {
    const pos = toast.options.position || position;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos].push(toast);
    return acc;
  }, {} as Record<ToastPosition, Toast[]>);

  const content = (
    <>
      {Object.entries(toastsByPosition).map(([pos, posToasts]) => (
        <div
          key={pos}
          className={cn(
            "pointer-events-none fixed z-[100] flex max-h-screen gap-2 overflow-hidden",
            positionStyles[pos as ToastPosition]
          )}
          style={positionInlineStyles[pos as ToastPosition]}
          data-testid={`toast-container-${pos}`}
        >
          {posToasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={(id) => toastManager.dismiss(id)}
              onRemove={(id) => toastManager.remove(id)}
            />
          ))}
        </div>
      ))}
    </>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
