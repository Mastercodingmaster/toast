import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OutputLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

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
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [history, setHistory] = useState<OutputLine[]>([
    { type: 'output', content: 'Welcome to the Code Interpreter! Type your code and press Enter to execute.' }
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCode = (code: string) => {
    if (!code.trim()) return;

    const newHistory: OutputLine[] = [...history, { type: 'input', content: code }];

    try {
      if (language === "javascript" || language === "typescript") {
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalLog(...args);
        };

        console.error = (...args) => {
          logs.push(args.join(' '));
          originalError(...args);
        };

        try {
          const result = eval(code);
          if (result !== undefined) {
            logs.push(String(result));
          }
          
          if (logs.length > 0) {
            newHistory.push({ type: 'output', content: logs.join('\n') });
          }
        } catch (error) {
          newHistory.push({ 
            type: 'error', 
            content: error instanceof Error ? error.message : String(error) 
          });
        } finally {
          console.log = originalLog;
          console.error = originalError;
        }
      } else {
        newHistory.push({ 
          type: 'output', 
          content: `${language.toUpperCase()} execution requires backend service` 
        });
      }
    } catch (error) {
      newHistory.push({ 
        type: 'error', 
        content: error instanceof Error ? error.message : String(error) 
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCode(input);
      setInput("");
    }
  };

  const handleClear = () => {
    setHistory([
      { type: 'output', content: 'Console cleared. Ready for new commands.' }
    ]);
    setInput("");
    toast({
      title: "Cleared",
      description: "Console has been cleared",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setHistory([
      { type: 'output', content: `Language changed to ${value.toUpperCase()}. Ready for commands.` }
    ]);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Interactive Console</CardTitle>
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
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            data-testid="button-clear"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={outputRef}
          className="bg-muted rounded-md p-4 font-mono text-sm min-h-[500px] max-h-[500px] overflow-auto"
          data-testid="console-output"
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={`mb-2 ${
                line.type === 'input'
                  ? 'text-primary font-semibold'
                  : line.type === 'error'
                  ? 'text-destructive'
                  : 'text-foreground'
              }`}
            >
              {line.type === 'input' && <span className="text-muted-foreground mr-2">&gt;</span>}
              {line.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground font-mono text-sm flex items-center">&gt;</span>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type code and press Enter to execute..."
            className="font-mono text-sm"
            data-testid="input-code"
            autoFocus
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1 py-0.5 rounded bg-muted border">Enter</kbd> to execute
        </p>
      </CardContent>
    </Card>
  );
}
