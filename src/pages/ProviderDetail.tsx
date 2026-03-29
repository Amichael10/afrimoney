import { useParams, Link } from "react-router-dom";
import { findProviderBySlug } from "@/data/providers";
import { getRepoProviderLogo } from "@/data/providerLogoOverrides";
import { StatusBadge } from "@/components/StatusBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowLeft, Globe, ExternalLink, Copy, Download, Check,
  Smartphone, Hash, Code2, Webhook, TestTube, CreditCard,
  Building2, Calendar, MapPin, Languages, ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function ProviderDetail() {
  const { slug } = useParams<{ slug: string }>();
  const result = slug ? findProviderBySlug(slug) : null;
  const [copied, setCopied] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-black text-foreground uppercase">Provider not found</h1>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const { provider, country } = result;
  const logoUrl = getRepoProviderLogo(provider.name);
  const clearbitUrl = provider.domain ? `https://logo.clearbit.com/${provider.domain}` : null;
  const displayLogo = !logoFailed && logoUrl ? logoUrl : clearbitUrl;

  const handleCopyName = async () => {
    await navigator.clipboard.writeText(provider.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadLogo = async () => {
    const url = displayLogo;
    if (url) {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const ext = blob.type.includes("svg") ? "svg" : "png";
        const dl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dl;
        a.download = `${provider.slug}_logo.${ext}`;
        a.click();
        URL.revokeObjectURL(dl);
      } catch { /* fallback */ }
    }
  };

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="rounded-md border-2 border-foreground bg-card p-5 sm:p-6 shadow-brutal">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-foreground bg-primary/15">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-display text-base font-bold text-foreground uppercase tracking-wide">{title}</h2>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, isLink }: { label: string; value?: string | null; isLink?: boolean }) => {
    if (!value) return null;
    return (
      <div className="flex items-start justify-between gap-4 py-2.5 border-b-2 border-foreground/10 last:border-0">
        <span className="text-sm text-muted-foreground shrink-0 font-medium">{label}</span>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline flex items-center gap-1 text-right">
            {value.replace(/^https?:\/\//, "").slice(0, 40)}
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        ) : (
          <span className="text-sm font-bold text-foreground text-right">{value}</span>
        )}
      </div>
    );
  };

  const TagList = ({ items }: { items?: string[] }) => {
    if (!items?.length) return <span className="text-sm text-muted-foreground">—</span>;
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {items.map((item) => (
          <span key={item} className="rounded-md border-2 border-foreground/30 bg-muted px-2 py-0.5 text-xs font-bold text-foreground">
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <nav className="sticky top-0 z-20 border-b-2 border-foreground bg-card">
        <div className="container mx-auto max-w-5xl px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Directory</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5"><span className={`fi fi-${country.code.toLowerCase()}`} /> {country.name}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground truncate max-w-[120px] sm:max-w-none">{provider.name}</span>
          </div>
           <div className="flex items-center gap-2">
              <GithubLink />
              <ThemeToggle />
            </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="rounded-md border-2 border-foreground bg-card p-6 sm:p-8 mb-8 shadow-brutal-lg">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Logo */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-background overflow-hidden shadow-brutal-sm">
              {displayLogo && !logoFailed ? (
                <img src={displayLogo} alt={provider.name} className="h-full w-full object-contain p-2" onError={() => setLogoFailed(true)} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-black font-display bg-muted text-foreground">
                  {provider.shortName || provider.name.slice(0, 2)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground uppercase">{provider.name}</h1>
                <StatusBadge status={provider.status} />
              </div>
              {provider.tagline && <p className="text-muted-foreground mb-3">{provider.tagline}</p>}
              {provider.aliases?.length && (
                <p className="text-xs text-muted-foreground mb-3 font-medium">Also known as: {provider.aliases.join(", ")}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <button onClick={handleCopyName} className="inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold text-foreground shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy Name
                </button>
                <button onClick={handleDownloadLogo} className="inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold text-foreground shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <Download className="h-3.5 w-3.5" />
                  Download Logo
                </button>
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    <Globe className="h-3.5 w-3.5" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Identity */}
          <Section title="Identity" icon={Building2}>
            <InfoRow label="Full Name" value={provider.name} />
            <InfoRow label="Parent Company" value={provider.parentCompany} />
            <InfoRow label="Country" value={country.name} />
            <InfoRow label="Founded" value={provider.foundedYear?.toString()} />
            <InfoRow label="Website" value={provider.website} isLink />
          </Section>

          {/* Coverage */}
          <Section title="Coverage & Access" icon={MapPin}>
            {provider.coverage?.regions && (
              <div className="mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Regions</span>
                <TagList items={provider.coverage.regions} />
              </div>
            )}
            {provider.coverage?.platforms && (
              <div className="mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Platforms</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {provider.coverage.platforms.map((p) => (
                    <span key={p} className="inline-flex items-center gap-1 rounded-md border-2 border-primary/40 bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      <Smartphone className="h-3 w-3" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <InfoRow label="USSD Code" value={provider.coverage?.ussdCode} />
            {provider.coverage?.languages && (
              <div className="flex items-center gap-2 py-2.5">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Languages:</span>
                <span className="text-sm font-bold text-foreground">{provider.coverage.languages.join(", ")}</span>
              </div>
            )}
            {!provider.coverage && <p className="text-sm text-muted-foreground">Coverage data not yet available.</p>}
          </Section>

          {/* Developer */}
          <Section title="Developer Info" icon={Code2}>
            {provider.developer ? (
              <>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between py-2 border-b-2 border-foreground/10">
                    <span className="text-sm text-muted-foreground font-medium">Official API</span>
                    <span className={`text-sm font-bold ${provider.developer.hasApi === true ? "text-accent" : provider.developer.hasApi === "unofficial" ? "text-secondary" : "text-muted-foreground"}`}>
                      {provider.developer.hasApi === true ? "✓ Yes" : provider.developer.hasApi === "unofficial" ? "⚠ Unofficial" : "✗ No"}
                    </span>
                  </div>
                  <InfoRow label="API Docs" value={provider.developer.apiDocsUrl} isLink />
                  <div className="flex items-center justify-between py-2 border-b-2 border-foreground/10">
                    <div className="flex items-center gap-1.5">
                      <TestTube className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">Sandbox</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{provider.developer.sandboxAvailable ? "✓ Available" : "—"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b-2 border-foreground/10">
                    <div className="flex items-center gap-1.5">
                      <Webhook className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">Webhooks</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {provider.developer.webhookSupport === true ? "✓ Yes" : provider.developer.webhookSupport === false ? "✗ No" : "Unknown"}
                    </span>
                  </div>
                </div>
                {provider.developer.sdks?.length && (
                  <div className="mt-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SDKs & Libraries</span>
                    <div className="mt-1 space-y-1">
                      {provider.developer.sdks.map((sdk) => (
                        <a key={sdk.name} href={sdk.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md p-2 text-sm font-bold hover:bg-muted transition-colors">
                          <Hash className="h-3.5 w-3.5 text-primary" />
                          <span className="text-primary hover:underline">{sdk.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {provider.developer.integrationPlatforms?.length && (
                  <div className="mt-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Integration Platforms</span>
                    <TagList items={provider.developer.integrationPlatforms} />
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Developer info not yet available.</p>
            )}
          </Section>

          {/* Transactions */}
          <Section title="Transaction Details" icon={CreditCard}>
            {provider.transactions ? (
              <>
                {provider.transactions.types && (
                  <div className="mb-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Supported Types</span>
                    <TagList items={provider.transactions.types} />
                  </div>
                )}
                <InfoRow label="Currency" value={provider.transactions.currency} />
                <InfoRow label="Fee Structure" value={provider.transactions.feeStructure} />
                {provider.transactions.limits && (
                  <div className="mt-2 rounded-md border-2 border-foreground/20 bg-muted/50 p-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction Limits</span>
                    <div className="mt-1 grid grid-cols-3 gap-2 text-center">
                      {provider.transactions.limits.min && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Min</div>
                          <div className="text-sm font-black text-foreground">{provider.transactions.limits.min}</div>
                        </div>
                      )}
                      {provider.transactions.limits.max && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Max</div>
                          <div className="text-sm font-black text-foreground">{provider.transactions.limits.max}</div>
                        </div>
                      )}
                      {provider.transactions.limits.daily && (
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Daily</div>
                          <div className="text-sm font-black text-foreground">{provider.transactions.limits.daily}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Transaction data not yet available.</p>
            )}
          </Section>
        </div>

        {/* Meta */}
        {provider.meta && (
          <div className="mt-6 rounded-md border-2 border-foreground bg-card p-5 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground font-medium">
                {provider.meta.lastVerified && (
                  <span>Last verified: <span className="font-bold text-foreground">{provider.meta.lastVerified}</span></span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {provider.meta.sources?.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                    {s.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
                <a
                  href={`https://github.com/issues/new?title=Edit: ${encodeURIComponent(provider.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border-2 border-foreground px-3 py-1.5 text-xs font-bold text-foreground shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Suggest an edit
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
