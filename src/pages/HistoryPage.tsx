import { AppLayout } from "@/components/layouts/AppLayout";
import { History } from "lucide-react";

/**
 * History Page
 * List of past analyses
 * Will be implemented in Phase 5
 */
export default function HistoryPage() {
  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Analysis History
        </h1>
        <p className="mt-1 text-muted-foreground">
          View and compare your past code analyses.
        </p>
      </div>

      {/* Empty State */}
      <div className="card-soft p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <History className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-2">
          No history yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Your past analyses will appear here once you run your first analysis.
        </p>
      </div>
    </AppLayout>
  );
}
