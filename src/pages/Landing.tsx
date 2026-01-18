import { Link } from "react-router-dom";
import { ArrowRight, Code2, Shield, Zap, Eye } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

/**
 * Landing Page
 * Calm, professional, premium feel
 * Clear value proposition
 */
export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/auth">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance">
              Understand your code like never before
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              AI-powered code analysis that finds bugs, security issues, and performance problems. 
              Get human-readable explanations and actionable fixes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start analyzing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" disabled>
                View demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Everything you need to write better code
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Comprehensive analysis that goes beyond syntax checking.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <FeatureCard
              icon={Eye}
              title="Bug Detection"
              description="Find potential bugs and logic errors before they reach production."
            />
            <FeatureCard
              icon={Shield}
              title="Security Analysis"
              description="Identify security vulnerabilities and get recommendations to fix them."
            />
            <FeatureCard
              icon={Zap}
              title="Performance Insights"
              description="Discover performance bottlenecks and optimization opportunities."
            />
            <FeatureCard
              icon={Code2}
              title="Code Quality"
              description="Detect code smells and get suggestions for cleaner code."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Ready to improve your code?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join developers who use CodeForensics to write better, safer code.
          </p>
          <Link to="/auth">
            <Button size="lg">
              Get started for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            Built by Umar
          </p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="card-soft p-6">
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <h3 className="font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
