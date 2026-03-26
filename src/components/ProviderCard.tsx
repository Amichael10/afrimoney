import { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import { Provider } from "@/data/providers";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const logoUrl = provider.domain
    ? `https://logo.clearbit.com/${provider.domain}`
    : null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(provider.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = async () => {
    if (logoUrl && !imgError) {
      // Try downloading the real logo
      try {
        const res = await fetch(logoUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${provider.name.replace(/[^a-zA-Z0-9]/g, "_")}_logo.png`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      } catch {
        // fall through to SVG
      }
    }
    // Fallback SVG download
    const size = 200;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="24" fill="${provider.color}"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" 
        font-family="Arial, sans-serif" font-weight="700" font-size="48" 
        fill="${provider.textColor || '#fff'}">${provider.shortName || provider.name.slice(0, 2)}</text>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${provider.name.replace(/[^a-zA-Z0-9]/g, "_")}_logo.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:shadow-md hover:border-primary/30">
      {/* Logo */}
      {logoUrl && !imgError ? (
        <img
          src={logoUrl}
          alt={`${provider.name} logo`}
          className="h-10 w-10 shrink-0 rounded-lg object-contain bg-background p-0.5"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold font-display"
          style={{
            backgroundColor: provider.color,
            color: provider.textColor || "#fff",
          }}
        >
          {provider.shortName || provider.name.slice(0, 2)}
        </div>
      )}

      {/* Name */}
      <span className="flex-1 truncate text-sm font-medium text-card-foreground">
        {provider.name}
      </span>

      {/* Actions */}
      <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Copy name"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={handleDownload}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Download logo"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
