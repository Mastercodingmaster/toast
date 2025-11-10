import type { Toast, ToastOptions, ToastVariant, PromiseMessages } from "@shared/toast-types";

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

  private addToast(message: string, variant: ToastVariant, options: ToastOptions = {}): string {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = {
      id,
      message,
      variant,
      options: {
        duration: options.duration ?? 3000,
        position: options.position ?? "top-right",
        dismissible: options.dismissible ?? true,
        ...options,
      },
      createdAt: Date.now(),
      isExiting: false,
    };

    this.toasts.push(toast);
    this.notify();

    if (toast.options.duration && toast.options.duration > 0) {
      setTimeout(() => {
        this.startDismiss(id);
      }, toast.options.duration);
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

  success(message: string, options?: ToastOptions): string {
    return this.addToast(message, "success", options);
  }

  error(message: string, options?: ToastOptions): string {
    return this.addToast(message, "error", options);
  }

  warning(message: string, options?: ToastOptions): string {
    return this.addToast(message, "warning", options);
  }

  info(message: string, options?: ToastOptions): string {
    return this.addToast(message, "info", options);
  }

  loading(message: string, options?: ToastOptions): string {
    return this.addToast(message, "loading", { ...options, duration: 0 });
  }

  async promise<T>(
    promise: Promise<T>,
    messages: PromiseMessages,
    options?: ToastOptions
  ): Promise<T> {
    const toastId = this.loading(messages.loading, options);

    try {
      const result = await promise;
      this.startDismiss(toastId);
      setTimeout(() => {
        this.success(messages.success, options);
      }, 150);
      return result;
    } catch (error) {
      this.startDismiss(toastId);
      setTimeout(() => {
        this.error(messages.error, options);
      }, 150);
      throw error;
    }
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
export const toast = {
  success: toastManager.success.bind(toastManager),
  error: toastManager.error.bind(toastManager),
  warning: toastManager.warning.bind(toastManager),
  info: toastManager.info.bind(toastManager),
  loading: toastManager.loading.bind(toastManager),
  promise: toastManager.promise.bind(toastManager),
  dismiss: toastManager.dismiss.bind(toastManager),
};
