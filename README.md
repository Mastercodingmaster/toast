# pixel-doez-planes

A modern, feature-rich toast notification library for React applications with TypeScript support.

## Features

- 🎨 **5 Toast Variants**: Success, Error, Warning, Info, and Loading
- 📍 **6 Position Options**: All corners plus top/bottom center
- ⚡ **Promise API**: Automatic loading→success/error transitions
- 🎭 **Smooth Animations**: Beautiful slide and fade effects
- ⏱️ **Auto-dismiss**: Configurable duration with manual dismiss option
- 📚 **Stack Management**: Multiple toasts with proper spacing
- 🎯 **TypeScript**: Full type safety and IntelliSense support
- 🎨 **Customizable**: Custom icons, className, and style overrides

## Installation

### npm

```bash
npm install @pixel-doez-planes/toast
```

### CDN

```javascript
import { toast, ToastContainer } from 'https://cdn.jsdelivr.net/npm/@pixel-doez-planes/toast/dist/index.esm.js';
```

## Quick Start

### 1. Add ToastContainer to your app

```jsx
import { ToastContainer } from '@pixel-doez-planes/toast';
import '@pixel-doez-planes/toast/dist/style.css';

function App() {
  return (
    <>
      <YourApp />
      <ToastContainer />
    </>
  );
}
```

### 2. Use the toast function

```javascript
import { toast } from '@pixel-doez-planes/toast';

// Basic usage
toast({ 
  title: 'Success!', 
  variant: 'success' 
});
```

## API Reference

### Basic Usage

```javascript
toast({
  title: string,              // Required
  description?: string,       // Optional subtitle
  variant: ToastVariant,      // Required: "success" | "error" | "warning" | "info" | "loading"
  position?: ToastPosition,   // Optional: positioning (default: "bottom-right")
  duration?: number,          // Optional: auto-dismiss time in ms (default: 4000)
  icon?: ReactNode,           // Optional: custom icon (emoji, string, or React element)
  className?: string,         // Optional: custom CSS class
  style?: React.CSSProperties, // Optional: inline styles
  dismissible?: boolean       // Optional: show dismiss button (default: true)
}): Promise<string>           // Returns promise that resolves to toast ID
```

### Toast Variants

```javascript
// Success
toast({ 
  title: 'Upload Complete', 
  description: 'Your file has been uploaded successfully.',
  variant: 'success' 
});

// Error
toast({ 
  title: 'Error', 
  description: 'Failed to save changes.',
  variant: 'error' 
});

// Warning
toast({ 
  title: 'Warning', 
  description: 'Your session will expire soon.',
  variant: 'warning' 
});

// Info
toast({ 
  title: 'New Update', 
  description: 'Version 2.0 is now available.',
  variant: 'info' 
});

// Loading
toast({ 
  title: 'Processing...', 
  variant: 'loading' 
});
```

### Positioning

```javascript
toast({
  title: 'Positioned Toast',
  variant: 'info',
  position: 'top-center' // "top-left" | "top-center" | "top-right" 
                         // "bottom-left" | "bottom-center" | "bottom-right"
});
```

### Custom Duration

```javascript
toast({
  title: 'Quick Toast',
  variant: 'success',
  duration: 2000 // Auto-dismiss after 2 seconds
});

// Disable auto-dismiss
toast({
  title: 'Persistent Toast',
  variant: 'info',
  duration: Infinity
});
```

### Promise API

Perfect for async operations like API calls:

```javascript
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

### Dismissing Toasts

```javascript
import { dismissToast } from '@pixel-doez-planes/toast';

// Dismiss all toasts
dismissToast();

// Dismiss specific toast by ID (await the promise)
const toastId = await toast({ title: 'Hello', variant: 'info' });
dismissToast(toastId);
```

### Custom Styling

```javascript
toast({
  title: 'Custom Styled Toast',
  variant: 'success',
  icon: '🎉',
  className: 'my-custom-toast',
  style: {
    background: 'linear-gradient(to right, #667eea, #764ba2)'
  }
});
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import { 
  toast, 
  ToastOptions, 
  ToastVariant, 
  ToastPosition,
  ToastFunction 
} from '@pixel-doez-planes/toast';

const options: ToastOptions = {
  title: 'Typed Toast',
  description: 'Full IntelliSense support',
  variant: 'success',
  position: 'top-right',
  duration: 5000
};

// toast() returns Promise<string>
const toastId = await toast(options);
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

## Examples

### Form Submission

```javascript
const handleSubmit = async (data) => {
  toast({
    title: 'Saving...',
    variant: 'loading',
    promise: {
      promise: api.save(data),
      loading: 'Saving your changes...',
      success: 'Changes saved successfully!',
      error: 'Failed to save changes.'
    }
  });
};
```

### Multiple Toasts

```javascript
// Toasts stack automatically with proper spacing
toast({ title: 'First', variant: 'info' });
toast({ title: 'Second', variant: 'success' });
toast({ title: 'Third', variant: 'warning' });
```

### Persistent Notification

```javascript
toast({
  title: 'Important!',
  description: 'Please review your settings before continuing.',
  variant: 'warning',
  duration: Infinity, // Won't auto-dismiss
  position: 'top-center'
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/yourusername/pixel-doez-planes)
- [npm Package](https://www.npmjs.com/package/pixel-doez-planes)
- [Live Demo](https://your-demo-site.com)
