import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  History, 
  Search, 
  Filter, 
  FileCode2, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  ArrowUpDown,
  ChevronRight,
  Trash2
} from "lucide-react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * History Page - Premium, Professional
 * Like Linear's issue list
 */

// Mock data
const mockAnalyses = [
  { id: "1", filename: "auth.ts", language: "TypeScript", severity: "high", issues: 5, securityIssues: 2, performanceIssues: 1, codeSmells: 2, createdAt: "2024-01-15T10:30:00Z" },
  { id: "2", filename: "api.py", language: "Python", severity: "medium", issues: 3, securityIssues: 0, performanceIssues: 2, codeSmells: 1, createdAt: "2024-01-15T09:15:00Z" },
  { id: "3", filename: "utils.js", language: "JavaScript", severity: "low", issues: 1, securityIssues: 0, performanceIssues: 0, codeSmells: 1, createdAt: "2024-01-14T16:45:00Z" },
  { id: "4", filename: "main.go", language: "Go", severity: "low", issues: 2, securityIssues: 0, performanceIssues: 1, codeSmells: 1, createdAt: "2024-01-14T14:20:00Z" },
  { id: "5", filename: "database.rs", language: "Rust", severity: "medium", issues: 4, securityIssues: 1, performanceIssues: 2, codeSmells: 1, createdAt: "2024-01-13T11:00:00Z" },
  { id: "6", filename: "handler.java", language: "Java", severity: "high", issues: 6, securityIssues: 3, performanceIssues: 1, codeSmells: 2, createdAt: "2024-01-12T09:30:00Z" },
];

const severityConfig = {
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  medium: { label: "Medium", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  low: { label: "Low", color: "text-success", bg: "bg-success/10", border: "border-success/20" },
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  // Filter analyses
  const filteredAnalyses = mockAnalyses.filter((analysis) => {
    const matchesSearch = analysis.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === "all" || analysis.severity === severityFilter;
    const matchesLanguage = languageFilter === "all" || analysis.language === languageFilter;
    return matchesSearch && matchesSeverity && matchesLanguage;
  });

  // Get unique languages
  const languages = [...new Set(mockAnalyses.map((a) => a.language))];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Analysis History
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and compare your past code analyses.
          </p>
        </div>
        <Link to="/analyze">
          <Button className="gap-2">
            <FileCode2 className="h-4 w-4" />
            New Analysis
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredAnalyses.length} {filteredAnalyses.length === 1 ? "analysis" : "analyses"}
        </p>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <ArrowUpDown className="h-4 w-4" />
          Sort by date
        </Button>
      </div>

      {/* Analyses List */}
      {filteredAnalyses.length > 0 ? (
        <div className="card-elevated overflow-hidden">
          <div className="divide-y divide-border">
            {filteredAnalyses.map((analysis, index) => {
              const severity = severityConfig[analysis.severity as keyof typeof severityConfig];
              
              return (
                <div
                  key={analysis.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {/* Severity indicator */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    severity.bg
                  )}>
                    {analysis.severity === "low" ? (
                      <CheckCircle2 className={cn("h-5 w-5", severity.color)} />
                    ) : (
                      <AlertTriangle className={cn("h-5 w-5", severity.color)} />
                    )}
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-foreground truncate">
                        {analysis.filename}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                        {analysis.language}
                      </span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full border shrink-0",
                        severity.bg, severity.color, severity.border
                      )}>
                        {severity.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{analysis.issues} issues</span>
                      {analysis.securityIssues > 0 && (
                        <span className="text-destructive">{analysis.securityIssues} security</span>
                      )}
                      {analysis.performanceIssues > 0 && (
                        <span className="text-warning">{analysis.performanceIssues} performance</span>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <Clock className="h-4 w-4" />
                    {formatDate(analysis.createdAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="card-soft p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5">
            <History className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No analyses found
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            {searchQuery || severityFilter !== "all" || languageFilter !== "all"
              ? "Try adjusting your filters to find what you're looking for."
              : "Your past analyses will appear here once you run your first analysis."}
          </p>
          {!searchQuery && severityFilter === "all" && languageFilter === "all" && (
            <Link to="/analyze">
              <Button>Run your first analysis</Button>
            </Link>
          )}
        </div>
      )}
    </AppLayout>
  );
}
