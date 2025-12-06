import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

export function AnimatedBorderCard({
  children,
  className,
  borderRadius = "1rem",
  duration = 8000,
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-transparent p-px",
        className
      )}
      style={{ borderRadius }}
    >
      {/* animated border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder rx="30%" ry="30%" duration={duration}>
          <div
            className="h-12 w-30 
                       bg-[radial-gradient(#0ea5e9_40%,transparent_60%)]
                       opacity-60"
          />
        </MovingBorder>
      </div>

      {/* CONTENT */}
      <div
        className="relative bg-white dark:bg-[#1A202C] border border-slate-300 dark:border-slate-700"
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
