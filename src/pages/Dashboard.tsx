import { Link } from "react-router-dom";
import { 
  FileCode2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Zap,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Dashboard Page - Premium, Professional
 * Like Linear, Vercel, Notion dashboards
 */
export default function Dashboard() {
  const { user } = useAuth();
  const displayName = user?.email?.split("@")[0] || "there";

  // Mock data for demo
  const stats = {
    totalAnalyses: 24,
    thisWeek: 8,
    issuesFound: 47,
    issuesFixed: 32,
  };

  const recentAnalyses = [
    { id: 1, filename: "auth.ts", language: "TypeScript", severity: "medium", issues: 3, time: "2 hours ago" },
    { id: 2, filename: "api.py", language: "Python", severity: "high", issues: 5, time: "5 hours ago" },
    { id: 3, filename: "utils.js", language: "JavaScript", severity: "low", issues: 1, time: "1 day ago" },
    { id: 4, filename: "main.go", language: "Go", severity: "low", issues: 2, time: "2 days ago" },
  ];

  const severityConfig = {
    high: { color: "text-destructive", bg: "bg-destructive/10", icon: AlertTriangle },
    medium: { color: "text-warning", bg: "bg-warning/10", icon: AlertTriangle },
    low: { color: "text-success", bg: "bg-success/10", icon: CheckCircle2 },
  };

  return (
    <AppLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Welcome back, <span className="text-gradient">{displayName}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here's what's happening with your code analyses.
            </p>
          </div>
          <Link to="/analyze">
            <Button size="lg" className="gap-2 shadow-soft-md hover:shadow-soft-lg transition-shadow">
              <FileCode2 className="h-5 w-5" />
              New Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid - Premium Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Analyses"
          value={stats.totalAnalyses}
          change="+12%"
          changeType="positive"
          icon={BarChart3}
          description="All time"
        />
        <StatsCard
          title="This Week"
          value={stats.thisWeek}
          change="+3"
          changeType="positive"
          icon={Clock}
          description="vs last week"
        />
        <StatsCard
          title="Issues Found"
          value={stats.issuesFound}
          change="-8%"
          changeType="positive"
          icon={AlertTriangle}
          description="Getting better"
        />
        <StatsCard
          title="Issues Fixed"
          value={stats.issuesFixed}
          change="68%"
          changeType="neutral"
          icon={CheckCircle2}
          description="Resolution rate"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Analyses - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Recent Analyses</h2>
                  <p className="text-sm text-muted-foreground">Your latest code reviews</p>
                </div>
              </div>
              <Link to="/history" className="text-sm text-primary hover:underline underline-offset-4">
                View all
              </Link>
            </div>

            <div className="divide-y divide-border">
              {recentAnalyses.map((analysis, index) => {
                const severity = severityConfig[analysis.severity as keyof typeof severityConfig];
                const SeverityIcon = severity.icon;
                
                return (
                  <div 
                    key={analysis.id} 
                    className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", severity.bg)}>
                      <SeverityIcon className={cn("h-5 w-5", severity.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">{analysis.filename}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {analysis.language}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {analysis.issues} issues found • {analysis.time}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          {/* Issue Breakdown */}
          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Issue Breakdown
            </h3>
            <div className="space-y-4">
              <IssueTypeRow 
                label="Security" 
                count={12} 
                total={47} 
                color="bg-destructive" 
              />
              <IssueTypeRow 
                label="Performance" 
                count={18} 
                total={47} 
                color="bg-warning" 
              />
              <IssueTypeRow 
                label="Code Quality" 
                count={17} 
                total={47} 
                color="bg-info" 
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link to="/analyze" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileCode2 className="h-4 w-4" />
                  Analyze New Code
                </Button>
              </Link>
              <Link to="/history" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Clock className="h-4 w-4" />
                  View History
                </Button>
              </Link>
              <Link to="/settings" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <TrendingUp className="h-4 w-4" />
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

function StatsCard({ title, value, change, changeType, icon: Icon, description }: StatsCardProps) {
  return (
    <div className="card-interactive p-5 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          changeType === "positive" && "bg-success/10 text-success",
          changeType === "negative" && "bg-destructive/10 text-destructive",
          changeType === "neutral" && "bg-muted text-muted-foreground"
        )}>
          {change}
        </span>
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="text-3xl font-semibold text-foreground tabular-nums">{value}</div>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

interface IssueTypeRowProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

function IssueTypeRow({ label, count, total, color }: IssueTypeRowProps) {
  const percentage = Math.round((count / total) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{count}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
