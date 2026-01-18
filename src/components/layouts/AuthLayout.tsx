import { Logo } from "@/components/ui/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Auth Layout
 * Calm, centered layout for login/signup
 * Minimal, professional, trustworthy
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center py-8">
        <Logo size="lg" />
      </header>

      {/* Main content - centered card */}
      <main className="flex-1 flex items-start justify-center px-4 pb-16 pt-8">
        <div className="w-full max-w-[400px] animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Built by Umar
        </p>
      </footer>
    </div>
  );
}
