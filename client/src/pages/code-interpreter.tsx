import { Interpreter } from "@/components/interpreter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CodeInterpreter() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Code Interpreter</h1>
          <p className="text-muted-foreground">
            Write and execute code in multiple languages
          </p>
        </div>

        <Interpreter />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Multiple Languages</h3>
                <p className="text-sm text-muted-foreground">
                  Support for JavaScript, TypeScript, Python, and more
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Real-time Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Run code instantly and see results in real-time
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Error Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Clear error messages and debugging information
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
