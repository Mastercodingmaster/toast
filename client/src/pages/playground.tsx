import { ToastContainer } from "../../../lib/toast";
import "../../../lib/toast/styles.css";
import { Interpreter } from "@/components/interpreter";
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

export default function Playground() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput("");
  }
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-3xl font-bold">Toast Library Playground</h1>
          <p className="text-muted-foreground">
            Test the <code className="px-1.5 py-0.5 rounded bg-muted">pixel-doez-planes</code> package in real-time
          </p>
        </div>
        <Interpreter />
      </div>
      <ToastContainer />
    </div>
  )
}