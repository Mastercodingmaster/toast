import { Toast, ToastContainer } from "pixel-doez-planes";
import "pixel-doez-planes/style.css";
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
    <div className="min-h-screen bg-background">
      <Interpreter />
      <ToastContainer />
    </div>
  )
}