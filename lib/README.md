# Toast Notifications

A modern, feature-rich toast notification library for React with TypeScript support.

## Features

- 🎨 Multiple toast variants (success, error, warning, info, loading)
- 📍 6 positioning options (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- ⚡ Promise-based API for async operations
- 🎭 Smooth slide and fade animations
- 🎯 TypeScript-first with full type definitions
- 🎨 Customizable (icons, duration, className, styles)
- 🌓 Dark mode support
- 📦 Tiny bundle size
- 🚀 Zero dependencies (except React)

## Installation

### Via npm

```bash
npm install pixel-doez-planes
```

### Via CDN

```javascript
import { toast, ToastContainer } from 'https://cdn.jsdelivr.net/npm/pixel-doez-planes/dist/index.esm.js';
```

## Quick Start

```tsx
import { toast, ToastContainer } from 'pixel-doez-planes';
import 'pixel-doez-planes/dist/style.css';

function App() {
  return (
    <>
      <button onClick={() => toast({ title: 'Hello World!', variant: 'success' })}>
        Show Toast
      </button>
      <ToastContainer />
    </>
  );
}
```

## Usage

### Basic Toasts

```typescript
// Success toast
toast({ 
  title: 'Profile updated successfully!', 
  variant: 'success' 
});

// Error toast
toast({ 
  title: 'Failed to save changes', 
  variant: 'error' 
});

// Warning toast
toast({ 
  title: 'Your session will expire soon', 
  variant: 'warning' 
});

// Info toast
toast({ 
  title: 'New features available', 
  variant: 'info' 
});

// Loading toast
toast({ 
  title: 'Uploading files...', 
  variant: 'loading' 
});
```

### With Descriptions

```typescript
toast({
  title: 'Upload Complete',
  description: 'Your file has been uploaded successfully.',
  variant: 'success'
});
```

### Promise API

Perfect for async operations like API calls:

```typescript
const uploadFile = async () => {
  const uploadPromise = fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  toast({
    title: 'Uploading...',
    variant: 'loading',
    promise: {
      promise: uploadPromise,
      loading: 'Uploading file...',
      success: 'File uploaded successfully!',
      error: 'Upload failed. Please try again.'
    }
  });
};
```

The toast will automatically:
- Show loading state while the promise is pending
- Switch to success when the promise resolves
- Switch to error if the promise rejects

### Custom Options

```typescript
toast({
  title: 'Custom toast!',
  description: 'With extra customization',
  variant: 'success',
  duration: 5000,
  position: 'top-center',
  icon: '🎉',
  className: 'my-custom-toast',
  style: {
    background: '#333',
    color: '#fff',
  }
});
```

### Dismiss Toasts

```typescript
import { dismissToast } from 'pixel-doez-planes';

// Get toast ID (await the promise)
const toastId = await toast({ title: 'Processing...', variant: 'loading' });

// Dismiss specific toast
dismissToast(toastId);

// Dismiss all toasts
dismissToast();
```

## API Reference

### Toast Function

```typescript
toast(options: ToastOptions): Promise<string>
```

Returns a promise that resolves to a unique toast ID that can be used to dismiss it later.

### Toast Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Main toast message |
| `description` | `string` | ❌ | - | Optional subtitle/details |
| `variant` | `ToastVariant` | ✅ | - | Toast type: `'success'`, `'error'`, `'warning'`, `'info'`, `'loading'` |
| `position` | `ToastPosition` | ❌ | `'bottom-right'` | Toast position on screen |
| `duration` | `number` | ❌ | `4000` | Duration in milliseconds (`Infinity` = permanent, `0` for loading toasts) |
| `icon` | `ReactNode` | ❌ | - | Custom icon (emoji, string, or React element) |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `style` | `CSSProperties` | ❌ | - | Inline styles |
| `dismissible` | `boolean` | ❌ | `true` | Show dismiss button |
| `promise` | `PromiseOptions` | ❌ | - | Promise handling configuration |

### Promise Options

| Option | Type | Description |
|--------|------|-------------|
| `promise` | `Promise<any>` | The promise to track |
| `loading` | `string` | Message while promise is pending |
| `success` | `string` | Message when promise resolves |
| `error` | `string` | Message when promise rejects |

### ToastPosition Type

```typescript
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
```

## TypeScript

This library is written in TypeScript and includes complete type definitions.

```typescript
import { 
  toast, 
  ToastOptions, 
  ToastVariant, 
  ToastPosition 
} from 'pixel-doez-planes';

const options: ToastOptions = {
  title: 'Typed toast!',
  description: 'Full IntelliSense support',
  variant: 'success',
  duration: 5000,
  position: 'top-center',
};

toast(options);
```

### Type Definitions

```typescript
type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ToastOptions {
  title: string;
  description?: string;
  variant: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dismissible?: boolean;
  promise?: {
    promise: Promise<any>;
    loading: string;
    success: string;
    error: string;
  };
}
```

## License

MIT
