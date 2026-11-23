import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Download, Check, ArrowUpRight } from "lucide-react";
import { Provider } from "@/data/providers";
import { getRepoProviderLogo } from "@/data/providerLogoOverrides";
import { toast } from "sonner";

interface ProviderCardProps {
  provider: Provider;
  variant?: "grid" | "row";
  countryName?: string;
  countryCode?: string;
}

const ProviderCard = ({
  provider,
  variant = "grid",
  countryName,
  countryCode,
}: ProviderCardProps) => {
  const [copied, setCopied] = useState(false);
  const [repoLogoFailed, setRepoLogoFailed] = useState(false);

  const repoLogoUrl = getRepoProviderLogo(provider.name);
  const logoUrl = !repoLogoFailed && repoLogoUrl ? repoLogoUrl : null;

  const handleLogoError = () => {
    setRepoLogoFailed(true);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(provider.name);
    setCopied(true);
    toast.success(`Copied "${provider.name}"`);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (logoUrl) {
      try {
        const res = await fetch(logoUrl);
        const blob = await res.blob();
        const extension = blob.type.includes("svg") ? "svg" : "png";
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${provider.slug}_logo.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Downloaded ${provider.slug}_logo.${extension}`);
        return;
      } catch {
        /* fall through to SVG fallback */
      }
    }
    const size = 200;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="12" fill="#F4F4F5"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="48" fill="#18181B">${provider.shortName || provider.name.slice(0, 2)}</text>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${provider.slug}_logo.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${provider.slug}_logo.svg`);
  };

  const hasApi = provider.developer?.hasApi === true;
  const ussd = provider.coverage?.ussdCode;
  const isInactive = provider.status && provider.status !== "active";

  if (variant === "row") {
    return (
      <Link
        to={`/provider/${provider.slug}`}
        className="group flex items-center gap-4 border-b border-border px-4 py-3 text-sm transition-colors duration-150 hover:bg-muted/50 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1 dark:bg-zinc-900">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${provider.name} logo`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain"
              onError={handleLogoError}
              loading="lazy"
            />
          ) : (
            <span className="font-display text-xs font-bold text-foreground">
              {provider.shortName || provider.name.slice(0, 2)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {provider.name}
            </span>
            {isInactive && (
              <span className="text-xs font-medium text-muted-foreground capitalize">
                · {provider.status}
              </span>
            )}
          </div>
          {provider.tagline && (
            <p className="truncate text-xs text-muted-foreground">{provider.tagline}</p>
          )}
        </div>

        {countryName && countryCode && (
          <div className="hidden md:flex items-center gap-1.5 w-36 shrink-0 text-xs text-muted-foreground">
            <span className={`fi fi-${countryCode.toLowerCase()} rounded-[2px]`} />
            <span className="truncate">{countryName}</span>
          </div>
        )}

        <div className="hidden sm:block w-24 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
          {ussd || "—"}
        </div>

        <div className="hidden sm:block w-20 shrink-0 font-mono text-xs">
          <span className={hasApi ? "text-primary font-medium" : "text-muted-foreground"}>
            {hasApi ? "API" : "—"}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={handleCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            title="Copy provider name"
            aria-label={`Copy ${provider.name}`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-primary"
            title="Download logo"
            aria-label={`Download ${provider.name} logo`}
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/provider/${provider.slug}`}
      className="fc-card group relative flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Logo */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-white p-1.5 transition-transform duration-150 group-hover:scale-[1.03] dark:bg-zinc-900">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${provider.name} logo`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain"
            onError={handleLogoError}
            loading="lazy"
          />
        ) : (
          <span className="font-display text-xs font-bold text-foreground">
            {provider.shortName || provider.name.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Info — zero pill sandwiches, clean inline typographic metadata */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {provider.name}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {provider.tagline || (provider.parentCompany ? provider.parentCompany : "Mobile money provider")}
        </p>
        <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground/90 tabular-nums">
          {ussd && <span>{ussd}</span>}
          {ussd && (hasApi || isInactive) && <span aria-hidden="true">·</span>}
          {hasApi && <span className="text-primary font-medium">API Ready</span>}
          {hasApi && isInactive && <span aria-hidden="true">·</span>}
          {isInactive && <span className="capitalize">{provider.status}</span>}
          {!ussd && !hasApi && !isInactive && (
            <span>{provider.transactions?.currency || "Mobile Wallet"}</span>
          )}
        </div>
      </div>

      {/* Quick micro-actions */}
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          onClick={handleCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
          title="Copy name"
          aria-label={`Copy ${provider.name}`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary"
          title="Download logo"
          aria-label={`Download ${provider.name} logo`}
        >
          <Download className="h-3.5 w-3.5" />
        </button>
        <ArrowUpRight className="ml-0.5 h-4 w-4 text-muted-foreground/60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
};

export default ProviderCard;
