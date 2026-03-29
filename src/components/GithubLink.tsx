import { Github } from "lucide-react";

const GITHUB_URL = "https://github.com/Amichael10/africa-money-hub";

export function GithubLink() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border-2 border-foreground p-2 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all bg-card text-foreground"
      title="View on GitHub"
    >
      <Github className="h-[18px] w-[18px]" />
    </a>
  );
}
