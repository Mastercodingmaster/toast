import { CSSProperties } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';

export declare const dismissToast: (id?: string) => void;

export declare interface Toast {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    position: ToastPosition;
    duration: number;
    icon?: ReactNode;
    className?: string;
    style?: CSSProperties;
    dismissible: boolean;
    createdAt: number;
    isExiting?: boolean;
}

export declare const toast: (options: ToastOptions) => Promise<string>;

export declare function ToastContainer({ position }: ToastContainerProps): ReactPortal | null;

declare interface ToastContainerProps {
    position?: ToastPosition;
}

export declare type ToastFunction = (options: ToastOptions) => Promise<string>;

declare type ToastListener = (toasts: Toast[]) => void;

declare class ToastManager {
    private toasts;
    private listeners;
    private notify;
    subscribe(listener: ToastListener): () => void;
    private addToast;
    startDismiss(id: string): void;
    remove(id: string): void;
    show(options: ToastOptions): Promise<string>;
    dismiss(id?: string): void;
    getToasts(): Toast[];
}

export declare const toastManager: ToastManager;

export declare interface ToastOptions {
    title: string;
    description?: string;
    variant: ToastVariant;
    position?: ToastPosition;
    duration?: number;
    icon?: ReactNode;
    className?: string;
    style?: CSSProperties;
    dismissible?: boolean;
    promise?: {
        promise: Promise<any>;
        loading: string;
        success: string;
        error: string;
    };
}

export declare type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export declare type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

export { }
