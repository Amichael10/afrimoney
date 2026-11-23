import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const GITHUB_URL = "https://github.com/Amichael10/africa-money-hub";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Directory", to: "/" },
    { label: "Brand Kit", to: "/brand" },
    { label: "Logo Prep", to: "/tools/logo-prep" },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex shrink-0 items-center whitespace-nowrap transition-opacity duration-150 hover:opacity-85"
          aria-label="Afrimoney Home"
        >
          <img
            src="/assets/aistudio/afrimoney-horizontal-primary_0604f76c.png"
            alt="Afrimoney"
            className="h-6 w-auto object-contain dark:hidden"
          />
          <img
            src="/assets/aistudio/afrimoney-horizontal-reversed_b391116d.png"
            alt="Afrimoney"
            className="hidden h-6 w-auto object-contain dark:block"
          />
        </Link>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => {
            const active =
              item.to === "/"
                ? location.pathname === "/" || location.pathname.startsWith("/provider/")
                : location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                data-active={active}
                className={`fc-nav-link whitespace-nowrap shrink-0 py-1 transition-colors duration-150 ${
                  active ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fc-nav-link inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-foreground"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </nav>

        {/* Zone 3: Primary Action + Theme Switch */}
        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />
          <a
            href={`${GITHUB_URL}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="fc-btn-primary inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground whitespace-nowrap shrink-0 hover:bg-primary/90"
          >
            Suggest Provider
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
