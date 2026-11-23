import { Github } from "lucide-react";

const GITHUB_URL = "https://github.com/Amichael10/africa-money-hub";

export function GithubLink() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-150 hover:border-foreground/25 hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title="View on GitHub"
      aria-label="View on GitHub"
    >
      <Github className="h-4 w-4" />
    </a>
  );
}
