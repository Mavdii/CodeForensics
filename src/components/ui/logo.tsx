import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

/**
 * CodeForensics Logo
 * Clean, minimal, professional
 */
export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Icon - abstract code analysis symbol */}
      <div className={cn("relative", iconSizes[size])}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Outer bracket */}
          <path
            d="M8 6L4 16L8 26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          />
          <path
            d="M24 6L28 16L24 26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          />
          {/* Magnifying glass - forensics */}
          <circle
            cx="16"
            cy="14"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          />
          <path
            d="M19.5 17.5L23 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-muted-foreground"
          />
        </svg>
      </div>

      {showText && (
        <span className={cn("font-semibold tracking-tight text-foreground", textSizes[size])}>
          CodeForensics
        </span>
      )}
    </div>
  );
}
