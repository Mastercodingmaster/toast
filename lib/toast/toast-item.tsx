import { useEffect } from "react";
import type { Toast } from "./types";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  onRemove: (id: string) => void;
}

const variantIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const variantStyles = {
  success: "toast-variant-success",
  error: "toast-variant-error",
  warning: "toast-variant-warning",
  info: "toast-variant-info",
  loading: "toast-variant-loading",
};

const iconStyles = {
  success: "toast-icon-success",
  error: "toast-icon-error",
  warning: "toast-icon-warning",
  info: "toast-icon-info",
  loading: "toast-icon-loading animate-spin",
};

export function ToastItem({ toast, onDismiss, onRemove }: ToastItemProps) {
  const Icon = variantIcons[toast.variant];

  useEffect(() => {
    if (toast.isExiting) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [toast.isExiting, toast.id, onRemove]);

  const handleDismiss = () => {
    onDismiss(toast.id);
  };

  return (
    <div
      className={cn(
        "toast-item",
        variantStyles[toast.variant],
        toast.isExiting && "toast-exit",
        toast.className
      )}
      style={toast.style}
      data-testid={`toast-${toast.variant}`}
    >
      <div className="toast-content">
        {toast.icon !== undefined ? (
          <div className="toast-icon-wrapper">{toast.icon}</div>
        ) : (
          <Icon className={cn("toast-icon", iconStyles[toast.variant])} />
        )}
        <div className="toast-text">
          <div className="toast-title">
            {toast.title}
          </div>
          {toast.description && (
            <div className="toast-description">
              {toast.description}
            </div>
          )}
        </div>
        {toast.dismissible && (
          <button
            onClick={handleDismiss}
            className="toast-close-button"
            data-testid={`button-dismiss-toast-${toast.id}`}
          >
            <X className="toast-close-icon" />
          </button>
        )}
      </div>
    </div>
  );
}
