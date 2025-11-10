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
      <button onClick={() => toast.success('Hello World!')}>
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
toast.success('Profile updated successfully!');

// Error toast
toast.error('Failed to save changes');

// Warning toast
toast.warning('Your session will expire soon');

// Info toast
toast.info('New features available');

// Loading toast
toast.loading('Uploading files...');
```

### Promise API

```typescript
const myPromise = fetch('/api/data');

toast.promise(myPromise, {
  loading: 'Loading data...',
  success: 'Data loaded successfully!',
  error: 'Failed to load data',
});
```

### Custom Options

```typescript
toast.success('Custom toast!', {
  duration: 5000,
  position: 'top-center',
  icon: '🎉',
  className: 'my-custom-toast',
  style: {
    background: '#333',
    color: '#fff',
  },
});
```

### Dismiss Toasts

```typescript
// Get toast ID
const toastId = toast.loading('Processing...');

// Dismiss specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismiss();
```

## API Reference

### Toast Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `toast.success(message, options?)` | Show success toast | `string` |
| `toast.error(message, options?)` | Show error toast | `string` |
| `toast.warning(message, options?)` | Show warning toast | `string` |
| `toast.info(message, options?)` | Show info toast | `string` |
| `toast.loading(message, options?)` | Show loading toast | `string` |
| `toast.promise(promise, messages, options?)` | Handle promise states | `Promise` |
| `toast.dismiss(id?)` | Dismiss toast(s) | `void` |

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `3000` | Duration in milliseconds (0 = permanent) |
| `position` | `ToastPosition` | `'top-right'` | Toast position on screen |
| `icon` | `ReactNode` | - | Custom icon element |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |
| `dismissible` | `boolean` | `true` | Show dismiss button |

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
import { toast, ToastOptions, ToastPosition } from 'pixel-doez-planes';

const options: ToastOptions = {
  duration: 5000,
  position: 'top-center',
};

toast.success('Typed toast!', options);
```

## License

MIT
