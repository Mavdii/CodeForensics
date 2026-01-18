import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

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
      {/* Logo Image */}
      <img 
        src={logoImage} 
        alt="CodeForensics" 
        className={cn("object-contain", iconSizes[size])}
      />

      {showText && (
        <span className={cn("font-semibold tracking-tight text-foreground", textSizes[size])}>
          CodeForensics
        </span>
      )}
    </div>
  );
}
