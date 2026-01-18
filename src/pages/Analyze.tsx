import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { FileCode2, Play, RotateCcw, Copy, Check } from "lucide-react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";

// Supported languages with Monaco language IDs
const LANGUAGES = [
  { id: "javascript", label: "JavaScript", extensions: [".js", ".jsx"] },
  { id: "typescript", label: "TypeScript", extensions: [".ts", ".tsx"] },
  { id: "python", label: "Python", extensions: [".py"] },
  { id: "java", label: "Java", extensions: [".java"] },
  { id: "csharp", label: "C#", extensions: [".cs"] },
  { id: "cpp", label: "C++", extensions: [".cpp", ".cc", ".cxx", ".h", ".hpp"] },
  { id: "c", label: "C", extensions: [".c", ".h"] },
  { id: "go", label: "Go", extensions: [".go"] },
  { id: "rust", label: "Rust", extensions: [".rs"] },
  { id: "php", label: "PHP", extensions: [".php"] },
  { id: "ruby", label: "Ruby", extensions: [".rb"] },
  { id: "swift", label: "Swift", extensions: [".swift"] },
  { id: "kotlin", label: "Kotlin", extensions: [".kt", ".kts"] },
  { id: "sql", label: "SQL", extensions: [".sql"] },
  { id: "html", label: "HTML", extensions: [".html", ".htm"] },
  { id: "css", label: "CSS", extensions: [".css"] },
  { id: "json", label: "JSON", extensions: [".json"] },
  { id: "yaml", label: "YAML", extensions: [".yaml", ".yml"] },
  { id: "markdown", label: "Markdown", extensions: [".md"] },
  { id: "shell", label: "Shell", extensions: [".sh", ".bash"] },
] as const;

// Language detection based on code patterns
function detectLanguage(code: string, filename: string): string {
  // First check filename extension
  const ext = filename.includes(".") ? `.${filename.split(".").pop()?.toLowerCase()}` : "";
  for (const lang of LANGUAGES) {
    if ((lang.extensions as readonly string[]).includes(ext)) {
      return lang.id;
    }
  }

  // Pattern-based detection
  const patterns: { pattern: RegExp; lang: string }[] = [
    { pattern: /^import\s+.*\s+from\s+['"]|^export\s+(default\s+)?/m, lang: "javascript" },
    { pattern: /:\s*(string|number|boolean|any)\s*[;=,)\]}]|interface\s+\w+\s*\{/m, lang: "typescript" },
    { pattern: /^def\s+\w+\s*\(|^import\s+\w+|^from\s+\w+\s+import/m, lang: "python" },
    { pattern: /^public\s+class\s+\w+|^package\s+\w+;/m, lang: "java" },
    { pattern: /^using\s+System;|^namespace\s+\w+/m, lang: "csharp" },
    { pattern: /^#include\s*<.*>|^int\s+main\s*\(/m, lang: "cpp" },
    { pattern: /^package\s+main|^func\s+\w+\s*\(/m, lang: "go" },
    { pattern: /^fn\s+\w+\s*\(|^use\s+\w+::/m, lang: "rust" },
    { pattern: /^<\?php/m, lang: "php" },
    { pattern: /^require\s+['"]|^class\s+\w+\s*<\s*\w+/m, lang: "ruby" },
    { pattern: /^import\s+\w+\s*$|^func\s+\w+\s*\(/m, lang: "swift" },
    { pattern: /^fun\s+\w+\s*\(|^val\s+\w+\s*=/m, lang: "kotlin" },
    { pattern: /^SELECT\s+|^CREATE\s+TABLE|^INSERT\s+INTO/im, lang: "sql" },
    { pattern: /^<!DOCTYPE\s+html>|^<html/im, lang: "html" },
    { pattern: /^\s*\{[\s\S]*"[\w]+"\s*:/m, lang: "json" },
    { pattern: /^---\s*$|^\w+:\s*$/m, lang: "yaml" },
  ];

  for (const { pattern, lang } of patterns) {
    if (pattern.test(code)) {
      return lang;
    }
  }

  return "javascript"; // Default
}

const EXAMPLE_CODE = `// Paste your code here or start typing
// Language will be auto-detected

function analyzeCode(input) {
  // Example function with potential issues
  var result = [];
  
  for (var i = 0; i <= input.length; i++) {
    if (input[i] == null) {
      result.push(input[i].toString());
    }
  }
  
  return result;
}`;

export default function Analyze() {
  const [code, setCode] = useState(EXAMPLE_CODE);
  const [filename, setFilename] = useState("untitled.js");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Handle code changes with language detection
  const handleCodeChange = useCallback((value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    
    // Auto-detect language when code changes significantly
    if (newCode.length > 20) {
      const detected = detectLanguage(newCode, filename);
      if (detected !== language) {
        setLanguage(detected);
      }
    }
  }, [filename, language]);

  // Handle filename change with extension-based language detection
  const handleFilenameChange = useCallback((newFilename: string) => {
    setFilename(newFilename);
    const detected = detectLanguage(code, newFilename);
    setLanguage(detected);
  }, [code]);

  // Analyze code (placeholder for now)
  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "No code to analyze",
        description: "Please paste or type some code first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay - will be replaced with actual AI call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Analysis complete",
      description: "AI analysis integration coming in the next phase.",
    });
    
    setIsAnalyzing(false);
  };

  // Reset editor
  const handleReset = () => {
    setCode(EXAMPLE_CODE);
    setFilename("untitled.js");
    setLanguage("javascript");
  };

  // Copy code
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            New Analysis
          </h1>
          <p className="mt-1 text-muted-foreground">
            Paste your code and get AI-powered insights.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !code.trim()}
            className="gap-2"
          >
            {isAnalyzing ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Analyze
          </Button>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 max-w-xs">
          <Label htmlFor="filename" className="sr-only">Filename</Label>
          <Input
            id="filename"
            value={filename}
            onChange={(e) => handleFilenameChange(e.target.value)}
            placeholder="filename.js"
            className="font-mono text-sm"
          />
        </div>
        
        <div className="w-40">
          <Label htmlFor="language" className="sr-only">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Split View Container */}
      <div className="grid lg:grid-cols-2 gap-4 min-h-[500px]">
        {/* Code Editor Panel */}
        <div className="card-soft overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Code Input</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {code.split("\n").length} lines
            </span>
          </div>
          
          <div className="flex-1 min-h-[400px]">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineNumbers: "on",
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto",
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
              }}
              loading={
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner size="lg" />
                </div>
              }
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="card-soft overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-medium text-foreground">Analysis Results</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Play className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Ready to analyze
              </h3>
              <p className="text-sm text-muted-foreground">
                Click "Analyze" to get AI-powered insights about bugs, security issues, and performance improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
