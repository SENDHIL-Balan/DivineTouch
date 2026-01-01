// src/components/ui/LoadingSpinner.tsx
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = "md", className, text = "Loading..." }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={cn(
            "rounded-full border-t-transparent border-primary animate-spin",
            sizeClasses[size]
          )}
          style={{ animationDuration: "1s" }}
        />
        
        {/* Inner decorative ring */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full border-b-transparent border-primary/30 animate-spin",
            sizeClasses[size]
          )}
          style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
        />
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;