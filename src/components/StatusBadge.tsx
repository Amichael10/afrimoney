import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: "active" | "inactive" | "acquired";
  className?: string;
}

export function StatusBadge({ status = "active", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "active" && "bg-accent/15 text-accent",
        status === "inactive" && "bg-muted text-muted-foreground",
        status === "acquired" && "bg-secondary/15 text-secondary",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-accent",
          status === "inactive" && "bg-muted-foreground",
          status === "acquired" && "bg-secondary"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
