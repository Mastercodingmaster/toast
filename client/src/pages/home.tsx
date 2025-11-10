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
  Settings,
  MapPin,
} from "lucide-react";
import { toast, type ToastPosition } from "../../../lib/toast";
import "../../../lib/toast/styles.css";

export default function Home() {
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [duration, setDuration] = useState([4000]);

  const showToast = (type: "success" | "error" | "warning" | "info" | "loading") => {
    const messages = {
      success: { title: "Success!", description: "Your changes have been saved." },
      error: { title: "Error!", description: "Something went wrong." },
      warning: { title: "Warning!", description: "Please check your input." },
      info: { title: "Info", description: "Here's some helpful information." },
      loading: { title: "Loading...", description: "Please wait." },
    };

    toast({
      ...messages[type],
      variant: type,
      position,
      duration: duration[0],
    });
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve("Success!"), 2000);
    });

    toast({
      title: "Processing...",
      variant: "loading",
      position,
      duration: duration[0],
      promise: {
        promise,
        loading: "Processing your request...",
        success: "Request completed successfully!",
        error: "Request failed. Please try again.",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="mb-4">
            <Package className="h-3 w-3 mr-1" />
            pixel-doez-planes
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Modern Toast Notifications
            <span className="block text-primary mt-2">for React</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful, customizable toast notification library with TypeScript support.
            Multiple variants, positions, and a promise-based API.
          </p>
        </div>

        {/* Interactive Demo */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Try it out</h2>
              <Badge variant="secondary">Interactive Demo</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Toast Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                onClick={() => showToast("success")}
                variant="default"
                className="gap-2"
                data-testid="button-toast-success"
              >
                <CheckCircle2 className="h-4 w-4" />
                Success
              </Button>
              <Button
                onClick={() => showToast("error")}
                variant="destructive"
                className="gap-2"
                data-testid="button-toast-error"
              >
                <XCircle className="h-4 w-4" />
                Error
              </Button>
              <Button
                onClick={() => showToast("warning")}
                variant="outline"
                className="gap-2"
                data-testid="button-toast-warning"
              >
                <AlertTriangle className="h-4 w-4" />
                Warning
              </Button>
              <Button
                onClick={() => showToast("info")}
                variant="outline"
                className="gap-2"
                data-testid="button-toast-info"
              >
                <Info className="h-4 w-4" />
                Info
              </Button>
              <Button
                onClick={() => showToast("loading")}
                variant="outline"
                className="gap-2"
                data-testid="button-toast-loading"
              >
                <Loader2 className="h-4 w-4" />
                Loading
              </Button>
              <Button
                onClick={showPromiseToast}
                variant="secondary"
                className="gap-2"
                data-testid="button-toast-promise"
              >
                <Zap className="h-4 w-4" />
                Promise
              </Button>
            </div>

            {/* Position Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Position
              </label>
              <Select
                value={position}
                onValueChange={(value) => setPosition(value as ToastPosition)}
              >
                <SelectTrigger data-testid="select-position">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Duration
                </span>
                <span className="text-muted-foreground">{duration[0]}ms</span>
              </label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={1000}
                max={10000}
                step={500}
                data-testid="slider-duration"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Multiple Variants</h3>
              <p className="text-sm text-muted-foreground">
                5 beautiful toast variants: success, error, warning, info, and loading
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
                Handle async operations with automatic loading → success/error transitions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Full Customization</h3>
              <p className="text-sm text-muted-foreground">
                Customize duration, position, icons, and styles to match your design
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">6 Positions</h3>
              <p className="text-sm text-muted-foreground">
                Place toasts anywhere: all corners, top/bottom center positions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">TypeScript</h3>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with comprehensive type definitions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Zero Dependencies</h3>
              <p className="text-sm text-muted-foreground">
                Lightweight and fast with no external dependencies required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Installation</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Via npm
                </h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm">
                  npm install pixel-doez-planes
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Usage
                </h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                  <div>import &#123; toast, ToastContainer &#125; from 'pixel-doez-planes';</div>
                  <div>import 'pixel-doez-planes/style.css';</div>
                  <div className="pt-2">toast.success('Hello World!');</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com/pixel-doez-planes/pixel-doez-planes"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/pixel-doez-planes"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Package className="h-4 w-4" />
            npm
          </a>
        </div>
      </footer>
    </div>
  );
}
