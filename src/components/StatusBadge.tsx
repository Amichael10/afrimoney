import { CheckCircle2, MinusCircle, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: "active" | "inactive" | "acquired";
  className?: string;
}

export function StatusBadge({ status = "active", className }: StatusBadgeProps) {
  const Icon =
    status === "active"
      ? CheckCircle2
      : status === "acquired"
      ? ArrowRightLeft
      : MinusCircle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium capitalize tracking-tight",
        status === "active" &&
          "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        status === "inactive" &&
          "border-border bg-muted text-muted-foreground",
        status === "acquired" &&
          "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span>{status}</span>
    </span>
  );
}
