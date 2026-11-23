import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy, Globe, Terminal } from "lucide-react";
import { countries, Provider } from "@/data/providers";
import { getRepoProviderLogo } from "@/data/providerLogoOverrides";
import { toast } from "sonner";

type PreviewTab = "json" | "typescript" | "ussd";

const FEATURED_SLUGS = ["opay", "m-pesa-safaricom", "mtn-momo", "wave"];

interface FeaturedMatch {
  provider: Provider;
  countryName: string;
  countryCode: string;
}

export function DeveloperPreview() {
  const featured = useMemo<FeaturedMatch[]>(() => {
    const matches: FeaturedMatch[] = [];
    for (const c of countries) {
      for (const p of c.providers) {
        if (
          FEATURED_SLUGS.includes(p.slug) ||
          (p.name === "M-Pesa" && c.code === "KE") ||
          (p.name === "MTN MoMo" && c.code === "GH") ||
          (p.name === "Wave" && c.code === "SN")
        ) {
          if (!matches.some((m) => m.provider.slug === p.slug)) {
            matches.push({ provider: p, countryName: c.name, countryCode: c.code });
          }
        }
      }
    }
    return matches.slice(0, 4);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<PreviewTab>("json");
  const [copied, setCopied] = useState(false);

  const current = featured[selectedIndex] || featured[0];
  if (!current) return null;

  const { provider, countryName, countryCode } = current;
  const logoUrl = getRepoProviderLogo(provider.name);

  const jsonSnippet = JSON.stringify(
    {
      name: provider.name,
      slug: provider.slug,
      country: countryName,
      countryCode,
      status: provider.status || "active",
      ussdCode: provider.coverage?.ussdCode || null,
      currency: provider.transactions?.currency || null,
      developer: {
        hasApi: provider.developer?.hasApi ?? false,
        sandbox: provider.developer?.sandboxAvailable ?? false,
        webhooks: provider.developer?.webhookSupport ?? false,
        apiDocs: provider.developer?.apiDocsUrl || null,
      },
      platforms: provider.coverage?.platforms || [],
    },
    null,
    2
  );

  const tsSnippet = `import type { Provider } from "@/data/providers";

export const ${provider.slug.replace(/-/g, "_")}Provider: Provider = {
  name: "${provider.name}",
  slug: "${provider.slug}",
  color: "${provider.color}",
  status: "${provider.status || "active"}",
  website: "${provider.website || ""}",
  coverage: {
    ussdCode: ${provider.coverage?.ussdCode ? `"${provider.coverage.ussdCode}"` : "undefined"},
    platforms: ${JSON.stringify(provider.coverage?.platforms || [])},
  },
  transactions: {
    currency: "${provider.transactions?.currency || "N/A"}",
    feeStructure: "${provider.transactions?.feeStructure || "Standard"}",
  },
};`;

  const ussdSnippet = `# Quick integration & settlement reference
Provider      : ${provider.name} (${countryName})
USSD Channel  : ${provider.coverage?.ussdCode || "App / Web Only"}
Currency      : ${provider.transactions?.currency || "Local"}
Daily Limit   : ${provider.transactions?.limits?.daily || "Tier-dependent"}
Fee Model     : ${provider.transactions?.feeStructure || "Provider schedule"}
API Docs      : ${provider.developer?.apiDocsUrl || "Not publicly documented"}`;

  const codeContent =
    activeTab === "json"
      ? jsonSnippet
      : activeTab === "typescript"
      ? tsSnippet
      : ussdSnippet;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    toast.success("Snippet copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]">
      {/* Top Bar of Preview Window */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {featured.map((item, idx) => {
            const active = idx === selectedIndex;
            return (
              <button
                key={`${item.countryCode}-${item.provider.slug}-${idx}`}
                onClick={() => setSelectedIndex(idx)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                  active
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60 border border-transparent"
                }`}
              >
                <span className={`fi fi-${item.countryCode.toLowerCase()} rounded-[2px]`} />
                <span>{item.provider.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-background/80 p-0.5 border border-border">
          {(
            [
              { id: "json", label: "JSON" },
              { id: "typescript", label: "TypeScript" },
              { id: "ussd", label: "Spec" },
            ] as { id: PreviewTab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Content */}
      <div className="grid lg:grid-cols-12">
        {/* Left: Visual Card Inspection */}
        <div className="flex flex-col justify-between border-b border-border p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2 dark:bg-zinc-900">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={provider.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-display text-sm font-bold text-foreground">
                    {provider.shortName || provider.name.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-foreground truncate">
                    {provider.name}
                  </h3>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {countryName} · {provider.parentCompany || "Mobile Money"}
                </p>
              </div>
            </div>

            {provider.tagline && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {provider.tagline}
              </p>
            )}

            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
              <div>
                <dt className="text-muted-foreground">USSD Code</dt>
                <dd className="mt-0.5 font-mono font-semibold text-foreground tabular-nums">
                  {provider.coverage?.ussdCode || "App-based"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Currency</dt>
                <dd className="mt-0.5 font-mono font-semibold text-foreground">
                  {provider.transactions?.currency || "Local"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Developer API</dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {provider.developer?.hasApi === true
                    ? "Official API"
                    : provider.developer?.hasApi === "unofficial"
                    ? "Unofficial"
                    : "Not Listed"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Daily Limit</dt>
                <dd className="mt-0.5 font-mono font-semibold text-foreground tabular-nums truncate">
                  {provider.transactions?.limits?.daily || "Varies"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            {provider.website ? (
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                {provider.domain || "Official Site"}
              </a>
            ) : (
              <span />
            )}

            <Link
              to={`/provider/${provider.slug}`}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Inspect full profile
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Right: Dark Terminal Code Surface */}
        <div className="relative bg-[#111114] p-5 text-zinc-200 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>
                providers/{countryCode.toLowerCase()}/{provider.slug}.{activeTab === "typescript" ? "ts" : activeTab === "json" ? "json" : "txt"}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          <pre className="max-h-[260px] overflow-auto font-mono text-xs leading-relaxed text-zinc-300 scrollbar-hide">
            <code>{codeContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
