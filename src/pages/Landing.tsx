import { Link } from "react-router-dom";
import { ArrowRight, Code2, Shield, Zap, Eye, Sparkles, Lock, BarChart3 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

/**
 * Landing Page - Premium, Professional
 * Like Linear, Vercel marketing sites
 */
export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="shadow-soft-sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        
        <div className="container relative py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Code Analysis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              Understand your code{" "}
              <span className="text-gradient">like never before</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              AI-powered code analysis that finds bugs, security vulnerabilities, and performance issues. 
              Get human-readable explanations and actionable fixes in seconds.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 text-base shadow-soft-lg hover:shadow-soft-xl transition-all">
                  Start analyzing free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base gap-2">
                <Eye className="h-5 w-5" />
                Watch demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">20+ Languages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-border bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to write <span className="text-gradient">better code</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis that goes beyond syntax checking. Powered by advanced AI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <FeatureCard
              icon={Eye}
              title="Bug Detection"
              description="Find potential bugs, logic errors, and edge cases before they reach production. AI understands your code's intent."
              gradient="from-destructive/20 to-destructive/5"
            />
            <FeatureCard
              icon={Shield}
              title="Security Analysis"
              description="Identify SQL injection, XSS, authentication flaws, and other security vulnerabilities with detailed remediation steps."
              gradient="from-warning/20 to-warning/5"
            />
            <FeatureCard
              icon={Zap}
              title="Performance Insights"
              description="Discover performance bottlenecks, memory leaks, and optimization opportunities. Get specific recommendations."
              gradient="from-success/20 to-success/5"
            />
            <FeatureCard
              icon={Code2}
              title="Code Quality"
              description="Detect code smells, anti-patterns, and maintainability issues. Suggestions follow industry best practices."
              gradient="from-info/20 to-info/5"
            />
            <FeatureCard
              icon={Sparkles}
              title="Human-Readable"
              description="No cryptic error messages. Get clear explanations written for humans, with examples and context."
              gradient="from-primary/20 to-primary/5"
            />
            <FeatureCard
              icon={BarChart3}
              title="Trend Analytics"
              description="Track your code quality over time. See improvements and catch regressions before they compound."
              gradient="from-chart-5/20 to-chart-5/5"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, fast, effective
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get insights in three simple steps. No setup required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard 
              number={1} 
              title="Paste your code" 
              description="Copy and paste your code into the editor. We support 20+ programming languages."
            />
            <StepCard 
              number={2} 
              title="AI analyzes" 
              description="Our AI examines your code for bugs, security issues, and performance problems."
            />
            <StepCard 
              number={3} 
              title="Get insights" 
              description="Receive detailed explanations and actionable fixes. Apply them with confidence."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border bg-gradient-mesh">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to write <span className="text-gradient">better code</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who trust CodeForensics to catch issues before they ship.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2 text-base shadow-soft-lg">
                Get started for free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • Free tier available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Umar • © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="card-interactive p-6 group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-soft-lg">
        {number}
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
