import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { toast } from "../../../lib/toast";
import "../../../lib/toast/styles.css";

interface OutputLine {
  type: 'log' | 'error' | 'result';
  content: string;
}

const EXAMPLE_CODE = `// Try the toast library!

// Basic toast
toast({
  title: "Welcome!",
  description: "Try editing this code",
  variant: "success"
});

// With custom position
toast({
  title: "Top Center Toast",
  variant: "info",
  position: "top-center",
  duration: 3000
});

// Promise example
const delay = (ms) => new Promise(r => setTimeout(r, ms));

toast({
  title: "Loading...",
  variant: "loading",
  promise: {
    promise: delay(2000),
    loading: "Processing...",
    success: "Complete!",
    error: "Failed!"
  }
});`;

export function Interpreter() {
  const [code, setCode] = useState(EXAMPLE_CODE);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make toast available globally for eval context
    (window as any).__toastLib__ = toast;
    return () => {
      delete (window as any).__toastLib__;
    };
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCode = () => {
    setOutput([]);
    const logs: OutputLine[] = [];
    
    // Capture console.log
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      logs.push({
        type: 'log',
        content: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
      });
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push({
        type: 'error',
        content: args.join(' ')
      });
      originalError(...args);
    };

    try {
      // Wrap code to make toast available
      const wrappedCode = `
        (async function() {
          const toast = window.__toastLib__;
          ${code}
        })()
      `;
      
      const result = eval(wrappedCode);
      
      if (result !== undefined && !(result instanceof Promise)) {
        logs.push({ type: 'result', content: String(result) });
      }
      
      setOutput(logs);
    } catch (error) {
      logs.push({
        type: 'error',
        content: error instanceof Error ? error.message : String(error)
      });
      setOutput(logs);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  const handleReset = () => {
    setCode(EXAMPLE_CODE);
    setOutput([]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      executeCode();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Code Playground</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              data-testid="button-copy-code"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              data-testid="button-reset-code"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              onClick={executeCode}
              variant="default"
              size="sm"
              className="gap-2"
              data-testid="button-run-code"
            >
              <Play className="h-4 w-4" />
              Run
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Editor</label>
              <span className="text-xs text-muted-foreground">
                Press Cmd/Ctrl+Enter to run
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-[500px] p-4 font-mono text-sm bg-muted rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write your code here..."
              spellCheck={false}
              data-testid="textarea-code-editor"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Console Output</label>
            <div
              ref={outputRef}
              className="w-full h-[500px] p-4 font-mono text-sm bg-muted rounded-md border overflow-auto"
              data-testid="console-output"
            >
              {output.length === 0 ? (
                <div className="text-muted-foreground italic">
                  Run your code to see output here...
                </div>
              ) : (
                output.map((line, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      line.type === 'error'
                        ? 'text-destructive'
                        : line.type === 'result'
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    {line.type === 'error' && (
                      <span className="text-destructive mr-2">✕</span>
                    )}
                    {line.type === 'result' && (
                      <span className="text-muted-foreground mr-2">→</span>
                    )}
                    {line.content}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-md bg-muted/50 border">
          <p className="text-xs text-muted-foreground">
            <strong>Tip:</strong> The <code className="px-1 py-0.5 rounded bg-background">toast</code> function is available globally. 
            Try different variants: success, error, warning, info, loading. Add descriptions, change positions, or test the promise API!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
