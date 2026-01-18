import { Link } from "react-router-dom";
import { FileCode2, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/loading-spinner";

/**
 * Dashboard Page
 * Clean overview with stats and recent analyses
 * Calm, professional, like Linear
 */
export default function Dashboard() {
  const { user } = useAuth();

  // Get first name or email prefix for greeting
  const displayName = user?.email?.split("@")[0] || "there";

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's an overview of your code analysis activity.
        </p>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Link to="/analyze">
          <Button size="lg" className="gap-2">
            <FileCode2 className="h-5 w-5" />
            New Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatsCard
          title="Total Analyses"
          value="0"
          description="All time"
          icon={FileCode2}
        />
        <StatsCard
          title="This Week"
          value="0"
          description="Analyses run"
          icon={Clock}
        />
        <StatsCard
          title="Issues Found"
          value="0"
          description="Across all analyses"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Analyses */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">
          Recent Analyses
        </h2>
        
        {/* Empty State */}
        <div className="card-soft p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileCode2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-medium text-foreground mb-2">
            No analyses yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Start by running your first code analysis. Paste your code and get AI-powered insights.
          </p>
          <Link to="/analyze">
            <Button variant="outline">
              Run your first analysis
            </Button>
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

/**
 * Skeleton loader for stats cards
 */
export function StatsCardSkeleton() {
  return (
    <div className="card-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-8 w-16 mb-1" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
