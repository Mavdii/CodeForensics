import { AppLayout } from "@/components/layouts/AppLayout";
import { FileCode2 } from "lucide-react";

/**
 * Analyze Page
 * Monaco editor + AI analysis
 * Will be implemented in Phase 4
 */
export default function Analyze() {
  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          New Analysis
        </h1>
        <p className="mt-1 text-muted-foreground">
          Paste your code and get AI-powered insights.
        </p>
      </div>

      {/* Placeholder for Monaco Editor */}
      <div className="card-soft p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileCode2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-2">
          Code Editor Coming Soon
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          The Monaco editor and AI analysis integration will be added in the next phase.
        </p>
      </div>
    </AppLayout>
  );
}
