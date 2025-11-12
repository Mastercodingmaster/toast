import type { Toast, ToastOptions, ToastVariant } from "./types";

type ToastListener = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<ToastListener> = new Set();

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private addToast(options: ToastOptions): string {
    const id = Math.random().toString(36).substring(2, 9);
    
    const toast: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "success",
      position: options.position ?? "bottom-right",
      duration: options.variant === "loading" ? 0 : (options.duration ?? 4000),
      dismissible: options.dismissible ?? true,
      icon: options.icon,
      className: options.className,
      style: options.style,
      createdAt: Date.now(),
      isExiting: false,
    };

    this.toasts.push(toast);
    this.notify();

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        this.startDismiss(id);
      }, toast.duration);
    }

    return id;
  }

  startDismiss(id: string): void {
    this.toasts = this.toasts.map((toast) =>
      toast.id === id && !toast.isExiting
        ? { ...toast, isExiting: true }
        : toast
    );
    this.notify();
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  async show(options: ToastOptions): Promise<string> {
    // Handle promise-based toasts
    if (options.promise) {
      const { promise, loading, success, error } = options.promise;
      
      // Show loading toast
      const toastId = this.addToast({
        ...options,
        title: loading,
        variant: "loading",
        promise: undefined, // Don't pass promise recursively
      });

      try {
        const result = await promise;
        
        // Dismiss loading toast
        this.startDismiss(toastId);
        
        // Show success toast after animation
        setTimeout(() => {
          this.addToast({
            ...options,
            title: success,
            variant: "success",
            promise: undefined,
          });
        }, 150);
        
        return toastId;
      } catch (err) {
        // Dismiss loading toast
        this.startDismiss(toastId);
        
        // Show error toast after animation
        setTimeout(() => {
          this.addToast({
            ...options,
            title: error,
            variant: "error",
            promise: undefined,
          });
        }, 150);
        
        throw err;
      }
    }

    // Regular toast
    return this.addToast(options);
  }

  dismiss(id?: string): void {
    if (id) {
      this.startDismiss(id);
    } else {
      this.toasts.forEach((toast) => {
        if (!toast.isExiting) {
          toast.isExiting = true;
        }
      });
      this.notify();
    }
  }

  getToasts(): Toast[] {
    return this.toasts;
  }
}

export const toastManager = new ToastManager();
export const toast = toastManager.show.bind(toastManager);
export const dismissToast = toastManager.dismiss.bind(toastManager);
