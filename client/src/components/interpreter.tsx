import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Trash2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CODE_EXAMPLES = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  typescript: `// TypeScript Example
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
};

export function Interpreter() {
  const [code, setCode] = useState(CODE_EXAMPLES.javascript);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");

    try {
      if (language === "javascript" || language === "typescript") {
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalLog(...args);
        };

        console.error = (...args) => {
          logs.push('ERROR: ' + args.join(' '));
          originalError(...args);
        };

        console.warn = (...args) => {
          logs.push('WARN: ' + args.join(' '));
          originalWarn(...args);
        };

        try {
          const result = eval(code);
          if (result !== undefined && logs.length === 0) {
            logs.push(String(result));
          }
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
        }
      } else {
        setOutput(`${language.toUpperCase()} execution is simulated.\n\nIn a real implementation, this would send the code to a backend service for execution.\n\nCode:\n${code}`);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setTimeout(() => setIsRunning(false), 300);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    toast({
      title: "Cleared",
      description: "Code and output have been cleared",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(CODE_EXAMPLES[value as keyof typeof CODE_EXAMPLES] || "");
    setOutput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Code Editor</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40" data-testid="select-language">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            className="font-mono text-sm min-h-[400px] resize-y"
            data-testid="textarea-code"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleRun}
              disabled={isRunning || !code.trim()}
              className="flex-1"
              data-testid="button-run"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              data-testid="button-clear"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Output</CardTitle>
          {output && (
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              data-testid="button-copy-output"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div
            className="bg-muted rounded-md p-4 font-mono text-sm min-h-[400px] whitespace-pre-wrap overflow-auto"
            data-testid="output-display"
          >
            {output || (
              <span className="text-muted-foreground">
                Output will appear here...
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
