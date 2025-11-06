import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  Github,
  Package,
  Zap,
  Palette,
  Code2,
  Moon,
  Sun,
} from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast, type ToastPosition } from "../../../lib/toast";

export default function Home() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [duration, setDuration] = useState([3000]);

  const showToast = (type: string) => {
    const options = {
      position,
      duration: duration[0],
    };

    switch (type) {
      case "success":
        toast.success("Profile updated successfully!", options);
        break;
      case "error":
        toast.error("Failed to save changes", options);
        break;
      case "warning":
        toast.warning("Your session will expire soon", options);
        break;
      case "info":
        toast.info("New features available", options);
        break;
      case "loading":
        toast.loading("Uploading files...", options);
        break;
      case "promise":
        const myPromise = new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        toast.promise(
          myPromise,
          {
            loading: "Loading data...",
            success: "Data loaded successfully!",
            error: "Failed to load data",
          },
          options
        );
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold leading-none">
                Toast Notifications
              </span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid="button-github"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="default" asChild data-testid="button-get-started">
              <a href="#installation">Get Started</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-6" variant="secondary">
                TypeScript-First
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                Beautiful Toast Notifications for React
              </h1>
              <p className="mb-12 text-lg text-muted-foreground md:text-xl">
                A modern, feature-rich toast notification library with
                TypeScript support, flexible positioning, and delightful
                animations. Available via npm and CDN.
              </p>

              <Card className="mx-auto max-w-2xl">
                <CardHeader className="pb-4">
                  <h3 className="text-center text-lg font-semibold">
                    Try It Out
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    <Button
                      onClick={() => showToast("success")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-success"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Success
                    </Button>
                    <Button
                      onClick={() => showToast("error")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-error"
                    >
                      <XCircle className="h-4 w-4 text-red-600" />
                      Error
                    </Button>
                    <Button
                      onClick={() => showToast("warning")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-warning"
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Warning
                    </Button>
                    <Button
                      onClick={() => showToast("info")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-info"
                    >
                      <Info className="h-4 w-4 text-blue-600" />
                      Info
                    </Button>
                    <Button
                      onClick={() => showToast("loading")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-loading"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading
                    </Button>
                    <Button
                      onClick={() => showToast("promise")}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-toast-promise"
                    >
                      <Code2 className="h-4 w-4" />
                      Promise
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Position</label>
                      <Select
                        value={position}
                        onValueChange={(value: ToastPosition) =>
                          setPosition(value)
                        }
                      >
                        <SelectTrigger data-testid="select-position">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top-left">Top Left</SelectItem>
                          <SelectItem value="top-center">Top Center</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="bottom-left">
                            Bottom Left
                          </SelectItem>
                          <SelectItem value="bottom-center">
                            Bottom Center
                          </SelectItem>
                          <SelectItem value="bottom-right">
                            Bottom Right
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Duration: {duration[0]}ms
                      </label>
                      <Slider
                        value={duration}
                        onValueChange={setDuration}
                        min={1000}
                        max={10000}
                        step={500}
                        className="mt-2"
                        data-testid="slider-duration"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b py-20" id="features">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
              <p className="text-muted-foreground">
                Packed with features to handle any notification scenario
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Multiple Variants
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Success, error, warning, info, and loading states with
                    beautiful icons and colors
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Promise API</h3>
                  <p className="text-sm text-muted-foreground">
                    Handle async operations with automatic loading, success, and
                    error states
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    TypeScript First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Full TypeScript support with comprehensive type definitions
                    and autocompletion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Flexible Positioning
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    6 positions available: top-left, top-center, top-right,
                    bottom variants
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Smooth Animations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Beautiful slide and fade animations with performant CSS
                    transitions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom icons, className, duration, and style overrides for
                    complete control
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b py-20" id="installation">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold">Installation</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Via npm</h3>
                  <CodeBlock
                    code="npm install @your-org/toast-notifications"
                    language="bash"
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Via CDN</h3>
                  <CodeBlock
                    code={`import { toast, ToastContainer } from 'https://cdn.jsdelivr.net/npm/@your-org/toast-notifications/dist/index.esm.js';`}
                    language="javascript"
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Quick Start</h3>
                  <CodeBlock
                    code={`import { toast, ToastContainer } from '@your-org/toast-notifications';
import '@your-org/toast-notifications/dist/style.css';

function App() {
  return (
    <>
      <button onClick={() => toast.success('Hello World!')}>
        Show Toast
      </button>
      <ToastContainer />
    </>
  );
}`}
                    language="tsx"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b py-20" id="examples">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold">Usage Examples</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Basic Toasts</h3>
                  <CodeBlock
                    code={`// Success toast
toast.success('Profile updated successfully!');

// Error toast
toast.error('Failed to save changes');

// Warning toast
toast.warning('Your session will expire soon');

// Info toast
toast.info('New features available');

// Loading toast
toast.loading('Uploading files...');`}
                    language="typescript"
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Promise API</h3>
                  <CodeBlock
                    code={`const myPromise = fetch('/api/data');

toast.promise(myPromise, {
  loading: 'Loading data...',
  success: 'Data loaded successfully!',
  error: 'Failed to load data',
});`}
                    language="typescript"
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Custom Options
                  </h3>
                  <CodeBlock
                    code={`toast.success('Custom toast!', {
  duration: 5000,
  position: 'top-center',
  icon: '🎉',
  className: 'my-custom-toast',
  style: {
    background: '#333',
    color: '#fff',
  },
});`}
                    language="typescript"
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Dismiss Toasts
                  </h3>
                  <CodeBlock
                    code={`// Get toast ID
const toastId = toast.loading('Processing...');

// Dismiss specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismiss();`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" id="api">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold">API Reference</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">
                    Toast Methods
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">
                                Method
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                Description
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                Return
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.success(message, options?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Show success toast
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.error(message, options?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Show error toast
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.warning(message, options?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Show warning toast
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.info(message, options?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Show info toast
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.loading(message, options?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Show loading toast
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.promise(promise, messages)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Handle promise states
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                Promise
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                toast.dismiss(id?)
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Dismiss toast(s)
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                void
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Toast Options</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">
                                Option
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                Type
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                Default
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                duration
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                number
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                3000
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Duration in milliseconds
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                position
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                Position
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                top-right
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Toast position
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                icon
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                ReactNode
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">-</td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Custom icon
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                className
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                string
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">-</td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Custom CSS class
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-xs">
                                style
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">
                                CSSProperties
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">-</td>
                              <td className="px-4 py-3 text-muted-foreground">
                                Inline styles
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    npm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    MIT License
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2024 Toast Notifications. Built with React and TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
