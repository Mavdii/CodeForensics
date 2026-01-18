import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { 
  FileCode2, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertTriangle, 
  Shield, 
  Zap, 
  Code2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Lightbulb
} from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Types
interface CodeIssue {
  type: "bug" | "security" | "performance" | "code_smell";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  line_start?: number;
  line_end?: number;
  suggestion: string;
  code_example?: string;
}

interface AnalysisResult {
  summary: string;
  overall_severity: "high" | "medium" | "low" | "clean";
  issues: CodeIssue[];
  stats: {
    total_issues: number;
    bugs: number;
    security: number;
    performance: number;
    code_smells: number;
  };
}

// Supported languages
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
  { id: "shell", label: "Shell", extensions: [".sh", ".bash"] },
] as const;

// Language detection
function detectLanguage(code: string, filename: string): string {
  const ext = filename.includes(".") ? `.${filename.split(".").pop()?.toLowerCase()}` : "";
  for (const lang of LANGUAGES) {
    if ((lang.extensions as readonly string[]).includes(ext)) {
      return lang.id;
    }
  }
  // Pattern detection
  const patterns: { pattern: RegExp; lang: string }[] = [
    { pattern: /^import\s+.*\s+from\s+['"]|^export\s+(default\s+)?/m, lang: "javascript" },
    { pattern: /:\s*(string|number|boolean|any)\s*[;=,)\]}]|interface\s+\w+\s*\{/m, lang: "typescript" },
    { pattern: /^def\s+\w+\s*\(|^import\s+\w+|^from\s+\w+\s+import/m, lang: "python" },
    { pattern: /^public\s+class\s+\w+|^package\s+\w+;/m, lang: "java" },
    { pattern: /^package\s+main|^func\s+\w+\s*\(/m, lang: "go" },
    { pattern: /^fn\s+\w+\s*\(|^use\s+\w+::/m, lang: "rust" },
  ];
  for (const { pattern, lang } of patterns) {
    if (pattern.test(code)) return lang;
  }
  return "javascript";
}

const EXAMPLE_CODE = `// Paste your code here for analysis
// CodeForensics will detect bugs, security issues, and performance problems

function getUserData(userId) {
  // Potential SQL injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + userId;
  
  // Missing null check - potential bug
  const result = database.query(query);
  return result.rows[0].name;
}

function processItems(items) {
  // Performance issue: O(n²) complexity
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[i] === items[j] && i !== j) {
        console.log("Duplicate found");
      }
    }
  }
}

// Code smell: magic numbers
function calculatePrice(quantity) {
  return quantity * 19.99 * 1.08;
}`;

export default function Analyze() {
  const [code, setCode] = useState(EXAMPLE_CODE);
  const [filename, setFilename] = useState("example.js");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const handleCodeChange = useCallback((value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    if (newCode.length > 20) {
      const detected = detectLanguage(newCode, filename);
      if (detected !== language) setLanguage(detected);
    }
  }, [filename, language]);

  const handleFilenameChange = useCallback((newFilename: string) => {
    setFilename(newFilename);
    const detected = detectLanguage(code, newFilename);
    setLanguage(detected);
  }, [code]);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({ title: "No code to analyze", description: "Please paste or type some code first.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-code", {
        body: { code, language, filename },
      });

      if (error) {
        console.error("Analysis error:", error);
        toast({ title: "Analysis failed", description: error.message || "Please try again.", variant: "destructive" });
        return;
      }

      if (data.error) {
        toast({ title: "Analysis failed", description: data.error, variant: "destructive" });
        return;
      }

      setResult(data);
      setExpandedIssues(new Set([0])); // Expand first issue by default
      
      toast({
        title: data.stats.total_issues === 0 ? "Code looks clean!" : `Found ${data.stats.total_issues} issue${data.stats.total_issues === 1 ? "" : "s"}`,
        description: data.summary,
      });
    } catch (err) {
      console.error("Analysis error:", err);
      toast({ title: "Analysis failed", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCode(EXAMPLE_CODE);
    setFilename("example.js");
    setLanguage("javascript");
    setResult(null);
    setExpandedIssues(new Set());
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleIssue = (index: number) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const issueTypeConfig = {
    bug: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Bug" },
    security: { icon: Shield, color: "text-warning", bg: "bg-warning/10", label: "Security" },
    performance: { icon: Zap, color: "text-info", bg: "bg-info/10", label: "Performance" },
    code_smell: { icon: Code2, color: "text-chart-5", bg: "bg-chart-5/10", label: "Code Smell" },
  };

  const severityConfig = {
    high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
    medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
    low: { color: "text-success", bg: "bg-success/10", border: "border-success/30" },
    clean: { color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">New Analysis</h1>
          <p className="mt-1 text-muted-foreground">Paste your code and get AI-powered insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()} className="gap-2">
            {isAnalyzing ? <LoadingSpinner size="sm" /> : <Play className="h-4 w-4" />}
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 max-w-xs">
          <Label htmlFor="filename" className="sr-only">Filename</Label>
          <Input id="filename" value={filename} onChange={(e) => handleFilenameChange(e.target.value)} placeholder="filename.js" className="font-mono text-sm" />
        </div>
        <div className="w-40">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Split View */}
      <div className="grid lg:grid-cols-2 gap-4 min-h-[600px]">
        {/* Code Editor */}
        <div className="card-elevated overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Code Input</span>
            <span className="text-xs text-muted-foreground ml-auto">{code.split("\n").length} lines</span>
          </div>
          <div className="flex-1 min-h-[500px]">
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
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                automaticLayout: true,
              }}
              loading={<div className="flex items-center justify-center h-full"><LoadingSpinner size="lg" /></div>}
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="card-elevated overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-medium text-foreground">Analysis Results</span>
            {result && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full ml-auto",
                severityConfig[result.overall_severity].bg,
                severityConfig[result.overall_severity].color
              )}>
                {result.stats.total_issues} issue{result.stats.total_issues !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-sm text-muted-foreground animate-pulse">Analyzing your code...</p>
              </div>
            ) : result ? (
              <div className="p-4 space-y-4">
                {/* Summary */}
                <div className={cn("p-4 rounded-xl border", severityConfig[result.overall_severity].bg, severityConfig[result.overall_severity].border)}>
                  <div className="flex items-start gap-3">
                    {result.overall_severity === "clean" ? (
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    ) : (
                      <AlertTriangle className={cn("h-5 w-5 mt-0.5", severityConfig[result.overall_severity].color)} />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{result.summary}</p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        {result.stats.bugs > 0 && <span>{result.stats.bugs} bugs</span>}
                        {result.stats.security > 0 && <span>{result.stats.security} security</span>}
                        {result.stats.performance > 0 && <span>{result.stats.performance} performance</span>}
                        {result.stats.code_smells > 0 && <span>{result.stats.code_smells} code smells</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                {result.issues.length > 0 ? (
                  <div className="space-y-2">
                    {result.issues.map((issue, index) => {
                      const typeConfig = issueTypeConfig[issue.type];
                      const TypeIcon = typeConfig.icon;
                      const isExpanded = expandedIssues.has(index);

                      return (
                        <div key={index} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleIssue(index)}
                            className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
                          >
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", typeConfig.bg)}>
                              <TypeIcon className={cn("h-4 w-4", typeConfig.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground truncate">{issue.title}</span>
                                <span className={cn(
                                  "text-xs px-2 py-0.5 rounded-full shrink-0",
                                  severityConfig[issue.severity].bg,
                                  severityConfig[issue.severity].color
                                )}>
                                  {issue.severity}
                                </span>
                              </div>
                              {issue.line_start && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Line {issue.line_start}{issue.line_end && issue.line_end !== issue.line_start ? `-${issue.line_end}` : ""}
                                </p>
                              )}
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-3 border-t border-border bg-muted/20">
                              <div className="pt-3">
                                <p className="text-sm text-foreground">{issue.description}</p>
                              </div>
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
                                <Lightbulb className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-success">Suggestion</p>
                                  <p className="text-sm text-foreground mt-1">{issue.suggestion}</p>
                                </div>
                              </div>
                              {issue.code_example && (
                                <div className="rounded-lg bg-muted p-3 overflow-x-auto">
                                  <pre className="text-sm font-mono text-foreground">{issue.code_example}</pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mb-4" />
                    <h3 className="font-medium text-foreground">No issues found!</h3>
                    <p className="text-sm text-muted-foreground mt-1">Your code looks clean and well-written.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Ready to analyze</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Click "Analyze" to get AI-powered insights about bugs, security issues, and performance improvements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
