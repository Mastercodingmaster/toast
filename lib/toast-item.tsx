import { useEffect } from "react";
import type { Toast } from "@shared/toast-types";
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
  success: "bg-muted dark:bg-green-950/30 border-l-4 border-l-green-500",
  error: "bg-muted dark:bg-red-950/30 border-l-4 border-l-red-500",
  warning: "bg-muted dark:bg-amber-950/30 border-l-4 border-l-amber-500",
  info: "bg-muted dark:bg-blue-950/30 border-l-4 border-l-blue-500",
  loading: "bg-muted border-l-4 border-l-primary",
};

const iconStyles = {
  success: "text-green-600 dark:text-green-500",
  error: "text-red-600 dark:text-red-500",
  warning: "text-amber-600 dark:text-amber-500",
  info: "text-blue-600 dark:text-blue-500",
  loading: "text-primary animate-spin",
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
        "toast-item pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
        variantStyles[toast.variant],
        toast.isExiting && "toast-exit",
        toast.options.className
      )}
      style={toast.options.style}
      data-testid={`toast-${toast.variant}`}
    >
      <div className="flex items-start gap-3 p-4">
        {toast.options.icon !== undefined ? (
          toast.options.icon
        ) : (
          <Icon className={cn("h-5 w-5 flex-shrink-0", iconStyles[toast.variant])} />
        )}
        <div className="flex-1 text-sm font-medium text-foreground">
          {toast.message}
        </div>
        {toast.options.dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-md p-1 hover-elevate active-elevate-2 transition-colors"
            data-testid={`button-dismiss-toast-${toast.id}`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
