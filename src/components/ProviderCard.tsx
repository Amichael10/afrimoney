import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Download, Check, ChevronRight } from "lucide-react";
import { Provider } from "@/data/providers";
import { getRepoProviderLogo } from "@/data/providerLogoOverrides";
import { StatusBadge } from "@/components/StatusBadge";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const [copied, setCopied] = useState(false);
  const [repoLogoFailed, setRepoLogoFailed] = useState(false);
  const [clearbitLogoFailed, setClearbitLogoFailed] = useState(false);

  const repoLogoUrl = getRepoProviderLogo(provider.name);
  const clearbitLogoUrl = provider.domain ? `https://logo.clearbit.com/${provider.domain}` : null;
  const logoUrl = !repoLogoFailed && repoLogoUrl ? repoLogoUrl : !clearbitLogoFailed && clearbitLogoUrl ? clearbitLogoUrl : null;

  const handleLogoError = () => {
    if (repoLogoUrl && !repoLogoFailed) { setRepoLogoFailed(true); return; }
    setClearbitLogoFailed(true);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(provider.name);
    setCopied(true);
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
        return;
      } catch { /* fall through */ }
    }
    const size = 200;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="8" fill="${provider.color}"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="48" fill="${provider.textColor || '#fff'}">${provider.shortName || provider.name.slice(0, 2)}</text>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${provider.slug}_logo.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Link
      to={`/provider/${provider.slug}`}
      className="group relative flex items-center gap-3.5 rounded-md border-2 border-foreground bg-card p-3.5 shadow-brutal-sm transition-all duration-150 hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none active:translate-x-0 active:translate-y-0"
    >
      {/* Logo */}
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${provider.name} logo`}
          className="h-11 w-11 shrink-0 rounded-md object-contain bg-background p-0.5 border-2 border-foreground"
          onError={handleLogoError}
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xs font-bold font-display border-2 border-foreground bg-muted text-foreground"
        >
          {provider.shortName || provider.name.slice(0, 2)}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-card-foreground leading-tight">{provider.name}</span>
          {provider.status && provider.status !== "active" && <StatusBadge status={provider.status} className="scale-90" />}
        </div>
        {provider.tagline && (
          <p className="truncate text-xs text-muted-foreground mt-0.5">{provider.tagline}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-0.5">
        <button onClick={handleCopy} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="Copy name">
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        </button>
        <button onClick={handleDownload} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary" title="Download logo">
          <Download className="h-4 w-4" />
        </button>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
};

export default ProviderCard;
