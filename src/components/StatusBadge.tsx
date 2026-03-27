import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: "active" | "inactive" | "acquired";
  className?: string;
}

export function StatusBadge({ status = "active", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border-2 border-foreground px-2 py-0.5 text-xs font-bold uppercase tracking-wide",
        status === "active" && "bg-accent text-accent-foreground",
        status === "inactive" && "bg-muted text-muted-foreground",
        status === "acquired" && "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {status}
    </span>
  );
}
