import { Link } from "react-router-dom";

interface FooterProps {
  totalProviders?: number;
  totalCountries?: number;
}

export function Footer({ totalProviders, totalCountries }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/assets/aistudio/afrimoney-horizontal-primary_0604f76c.png"
                alt="Afrimoney"
                className="h-5 w-auto object-contain dark:hidden"
              />
              <img
                src="/assets/aistudio/afrimoney-horizontal-reversed_b391116d.png"
                alt="Afrimoney"
                className="hidden h-5 w-auto object-contain dark:block"
              />
            </Link>
            <p className="text-xs text-muted-foreground tabular-nums">
              {totalProviders && totalCountries
                ? `A directory of Africa's fintech ecosystem — ${totalProviders} providers across ${totalCountries} markets.`
                : "A directory of Africa's fintech ecosystem."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors whitespace-nowrap">
              Directory
            </Link>
            <Link to="/brand" className="hover:text-foreground transition-colors whitespace-nowrap">
              Brand Kit
            </Link>
            <Link to="/tools/logo-prep" className="hover:text-foreground transition-colors whitespace-nowrap">
              Logo Prep
            </Link>
            <a
              href="https://github.com/Amichael10/africa-money-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              GitHub
            </a>
            <span className="text-border" aria-hidden="true">|</span>
            <span>
              Built by{" "}
              <a
                href="https://amichael.design"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline underline-offset-4 decoration-border hover:decoration-primary hover:text-primary transition-colors"
              >
                Michael
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
