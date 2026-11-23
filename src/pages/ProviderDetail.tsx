import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { countries, findProviderBySlug, getAllProviders } from "@/data/providers";
import { getRepoProviderLogo } from "@/data/providerLogoOverrides";
import { StatusBadge } from "@/components/StatusBadge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe,
  ExternalLink,
  Copy,
  Download,
  Check,
  Smartphone,
  Hash,
  Webhook,
  TestTube,
  Building2,
  MapPin,
  Languages,
  ChevronRight,
  Terminal,
  Sun,
  Moon,
  Grid,
  Palette,
  Store,
  Monitor,
  CheckCircle2,
  MinusCircle,
  ShieldCheck,
  Code2,
} from "lucide-react";

type LogoSurface = "light" | "dark" | "brand" | "checker";
type CodeTab = "json" | "typescript";

const ALL_PLATFORMS = ["USSD", "Android", "iOS", "Web", "Agent Network"] as const;

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "USSD":
      return Hash;
    case "Android":
    case "iOS":
      return Smartphone;
    case "Web":
      return Monitor;
    case "Agent Network":
      return Store;
    default:
      return Globe;
  }
}

export default function ProviderDetail() {
  const { slug } = useParams<{ slug: string }>();
  const result = slug ? findProviderBySlug(slug) : null;

  const [copiedName, setCopiedName] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedColor, setCopiedColor] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [logoSurface, setLogoSurface] = useState<LogoSurface>("light");
  const [codeTab, setCodeTab] = useState<CodeTab>("json");

  useEffect(() => {
    setLogoFailed(false);
    setCopiedName(false);
    setCopiedUssd(false);
    setCopiedCode(false);
    setCopiedColor(false);
  }, [slug]);

  const { prevItem, nextItem, currentIndex, totalIndexed } = useMemo(() => {
    const all = getAllProviders();
    // Deduplicate by slug keeping first occurrence so prev/next matches findProviderBySlug
    const unique: typeof all = [];
    const seen = new Set<string>();
    for (const item of all) {
      if (!seen.has(item.provider.slug)) {
        seen.add(item.provider.slug);
        unique.push(item);
      }
    }
    const idx = slug ? unique.findIndex((item) => item.provider.slug === slug) : -1;
    return {
      prevItem: idx > 0 ? unique[idx - 1] : null,
      nextItem: idx >= 0 && idx < unique.length - 1 ? unique[idx + 1] : null,
      currentIndex: idx >= 0 ? idx + 1 : 0,
      totalIndexed: unique.length,
    };
  }, [slug]);

  const siblingProviders = useMemo(() => {
    if (!result) return [];
    const countryObj = countries.find((c) => c.code === result.country.code);
    if (!countryObj) return [];
    return countryObj.providers
      .filter((p) => p.slug !== result.provider.slug)
      .slice(0, 6);
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md text-center">
            <p className="font-mono text-xs text-primary font-medium">404 · Not Found</p>
            <h1 className="mt-2 font-display text-2xl font-bold text-foreground">
              Provider not found
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This mobile money provider doesn't exist in the directory or may have moved.
            </p>
            <Link
              to="/"
              className="fc-btn-primary mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to directory
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { provider, country } = result;
  const logoUrl = getRepoProviderLogo(provider.name);
  const displayLogo = !logoFailed && logoUrl ? logoUrl : null;
  const brandColor = provider.brand?.primaryColor || provider.color || "#FF4C00";

  const jsonPayload = JSON.stringify(
    {
      name: provider.name,
      slug: provider.slug,
      country: country.name,
      countryCode: country.code,
      status: provider.status || "active",
      parentCompany: provider.parentCompany || null,
      foundedYear: provider.foundedYear || null,
      website: provider.website || null,
      coverage: provider.coverage || null,
      developer: provider.developer || null,
      transactions: provider.transactions || null,
    },
    null,
    2
  );

  const tsPayload = `import type { Provider } from "@/data/providers";

export const ${provider.slug.replace(/[^a-zA-Z0-9]/g, "_")} = ${jsonPayload} as const satisfies Partial<Provider>;`;

  const activeCode = codeTab === "json" ? jsonPayload : tsPayload;

  const handleCopyName = async () => {
    await navigator.clipboard.writeText(provider.name);
    setCopiedName(true);
    toast.success(`Copied "${provider.name}"`);
    setTimeout(() => setCopiedName(false), 1500);
  };

  const handleCopyUssd = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedUssd(true);
    toast.success(`Copied USSD code ${code}`);
    setTimeout(() => setCopiedUssd(false), 1500);
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(brandColor.toUpperCase());
    setCopiedColor(true);
    toast.success(`Copied color ${brandColor.toUpperCase()}`);
    setTimeout(() => setCopiedColor(false), 1500);
  };

  const handleCopyCode = async (overrideText?: string) => {
    await navigator.clipboard.writeText(overrideText ?? activeCode);
    setCopiedCode(true);
    toast.success("Copied provider specification");
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const handleDownloadLogo = async () => {
    if (displayLogo) {
      try {
        const res = await fetch(displayLogo);
        const blob = await res.blob();
        const ext = blob.type.includes("svg") ? "svg" : "png";
        const dl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dl;
        a.download = `${provider.slug}_logo.${ext}`;
        a.click();
        URL.revokeObjectURL(dl);
        toast.success(`Downloaded ${provider.slug}_logo.${ext}`);
        return;
      } catch {
        /* fall through to SVG fallback */
      }
    }
    const size = 200;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="12" fill="#F7F7F7"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="48" fill="#0E0E0E">${provider.shortName || provider.name.slice(0, 2)}</text>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const dl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = dl;
    a.download = `${provider.slug}_logo.svg`;
    a.click();
    URL.revokeObjectURL(dl);
    toast.success(`Downloaded ${provider.slug}_logo.svg`);
  };

  const apiLabel =
    provider.developer?.hasApi === true
      ? "Official API"
      : provider.developer?.hasApi === "unofficial"
      ? "Unofficial"
      : "Not Listed";

  const hasRegions = (provider.coverage?.regions?.length ?? 0) > 0;
  const hasLanguages = (provider.coverage?.languages?.length ?? 0) > 0;
  const hasTxTypes = (provider.transactions?.types?.length ?? 0) > 0;
  const hasIntegrations = (provider.developer?.integrationPlatforms?.length ?? 0) > 0;
  const hasSdks = (provider.developer?.sdks?.length ?? 0) > 0;
  const hasSources = (provider.meta?.sources?.length ?? 0) > 0;
  const hasAliases = (provider.aliases?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Top Breadcrumb + Directory Pager */}
      <div className="border-b border-border bg-card/60">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 text-xs">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Directory
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-border" />
            <span className="inline-flex items-center gap-1.5 text-muted-foreground shrink-0">
              <span className={`fi fi-${country.code.toLowerCase()} rounded-[2px]`} />
              <span className="hidden sm:inline">{country.name}</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-border" />
            <span className="truncate font-semibold text-foreground">
              {provider.name}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs">
            {prevItem && (
              <Link
                to={`/provider/${prevItem.provider.slug}`}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title={`Previous: ${prevItem.provider.name}`}
              >
                <ArrowLeft className="h-3 w-3" />
                <span className="hidden md:inline max-w-[110px] truncate">
                  {prevItem.provider.name}
                </span>
              </Link>
            )}
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums px-1">
              {currentIndex}/{totalIndexed}
            </span>
            {nextItem && (
              <Link
                to={`/provider/${nextItem.provider.slug}`}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title={`Next: ${nextItem.provider.name}`}
              >
                <span className="hidden md:inline max-w-[110px] truncate">
                  {nextItem.provider.name}
                </span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Header Band */}
      <section className="relative overflow-hidden border-b border-border bg-card/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fc-grid-surface opacity-70 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_25%,transparent_100%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-8 sm:px-6 sm:pt-11 sm:pb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between animate-fc-enter">
            {/* Brand Mark + Title */}
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm dark:bg-zinc-900">
                {displayLogo ? (
                  <img
                    src={displayLogo}
                    alt={`${provider.name} logo`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <span
                    className="font-display text-xl font-extrabold"
                    style={{ color: brandColor }}
                  >
                    {provider.shortName || provider.name.slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {provider.name}
                  </h1>
                  <StatusBadge status={provider.status} />
                </div>

                {provider.tagline && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {provider.tagline}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <span className={`fi fi-${country.code.toLowerCase()} rounded-[2px]`} />
                    {country.name}
                  </span>
                  {provider.parentCompany && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{provider.parentCompany}</span>
                    </>
                  )}
                  {provider.foundedYear && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        Est. {provider.foundedYear}
                      </span>
                    </>
                  )}
                  {provider.domain && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-muted-foreground">{provider.domain}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Primary CTA Cluster */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fc-btn-primary inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Visit Website
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              <button
                onClick={handleDownloadLogo}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5" />
                Download Logo
              </button>
              <button
                onClick={() => handleCopyCode(jsonPayload)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted whitespace-nowrap"
              >
                {copiedCode ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Code2 className="h-3.5 w-3.5" />
                )}
                {copiedCode ? "Copied JSON" : "Copy JSON"}
              </button>
            </div>
          </div>
        </div>

        {/* 4-Cell Key-Spec Strip */}
        <div className="relative border-t border-border bg-card/80">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-4 sm:px-6">
              <div className="text-[11px] font-medium text-muted-foreground">Market</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className={`fi fi-${country.code.toLowerCase()} rounded-[2px]`} />
                <span className="truncate">{country.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{country.code}</span>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="text-[11px] font-medium text-muted-foreground">USSD Channel</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                  {provider.coverage?.ussdCode || "App / Web Only"}
                </span>
                {provider.coverage?.ussdCode && (
                  <button
                    onClick={() => handleCopyUssd(provider.coverage!.ussdCode!)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                    title="Copy USSD shortcode"
                    aria-label="Copy USSD shortcode"
                  >
                    {copiedUssd ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="text-[11px] font-medium text-muted-foreground">
                Settlement Currency
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-foreground tabular-nums">
                {provider.transactions?.currency || "Local Currency"}
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="text-[11px] font-medium text-muted-foreground">Developer API</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                <span
                  className={
                    provider.developer?.hasApi === true
                      ? "text-emerald-600 dark:text-emerald-400"
                      : provider.developer?.hasApi === "unofficial"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-muted-foreground"
                  }
                >
                  {apiLabel}
                </span>
                {provider.developer?.sandboxAvailable && (
                  <span className="font-mono text-[11px] font-normal text-muted-foreground">
                    · Sandbox
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Specification Workspace */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Borderless Editorial Spec Document */}
          <div className="min-w-0 lg:col-span-8">
            {/* Section Jump Nav */}
            <nav
              aria-label="Specification sections"
              className="mb-8 flex items-center gap-5 overflow-x-auto border-b border-border pb-3 text-xs font-medium text-muted-foreground scrollbar-hide"
            >
              <a href="#overview" className="whitespace-nowrap transition-colors hover:text-primary">
                01. Overview
              </a>
              <a href="#channels" className="whitespace-nowrap transition-colors hover:text-primary">
                02. Channels & Coverage
              </a>
              <a
                href="#transactions"
                className="whitespace-nowrap transition-colors hover:text-primary"
              >
                03. Transactions & Limits
              </a>
              <a href="#developer" className="whitespace-nowrap transition-colors hover:text-primary">
                04. Developer Spec
              </a>
            </nav>

            <div className="space-y-12">
              {/* 01. Overview */}
              <section id="overview" className="scroll-mt-20">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                    01
                  </span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                    Corporate Identity & Profile
                  </h2>
                </div>

                <dl className="divide-y divide-border border-y border-border">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground/70" />
                      Operator Name
                    </dt>
                    <dd className="text-xs font-semibold text-foreground sm:col-span-2">
                      {provider.name}
                    </dd>
                  </div>

                  {provider.parentCompany && (
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-xs font-medium text-muted-foreground">
                        Parent Organization
                      </dt>
                      <dd className="text-xs font-semibold text-foreground sm:col-span-2">
                        {provider.parentCompany}
                      </dd>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-medium text-muted-foreground">Directory Slug</dt>
                    <dd className="font-mono text-xs font-medium text-foreground sm:col-span-2">
                      {provider.slug}
                    </dd>
                  </div>

                  {provider.foundedYear && (
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-xs font-medium text-muted-foreground">Year Founded</dt>
                      <dd className="font-mono text-xs font-semibold text-foreground tabular-nums sm:col-span-2">
                        {provider.foundedYear}
                      </dd>
                    </div>
                  )}

                  {provider.website && (
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-xs font-medium text-muted-foreground">
                        Official Website
                      </dt>
                      <dd className="sm:col-span-2">
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs font-medium text-primary hover:underline"
                        >
                          {provider.website.replace(/^https?:\/\//, "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </dd>
                    </div>
                  )}

                  {hasAliases && (
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-xs font-medium text-muted-foreground">Known Aliases</dt>
                      <dd className="text-xs text-foreground sm:col-span-2">
                        {provider.aliases!.join(" · ")}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>

              {/* 02. Channels & Coverage */}
              <section id="channels" className="scroll-mt-20">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                    02
                  </span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                    Access Channels & Geographic Reach
                  </h2>
                </div>

                {provider.coverage ? (
                  <div className="space-y-6">
                    {provider.coverage.ussdCode && (
                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground">
                            Direct USSD Dial Code
                          </div>
                          <div className="mt-0.5 font-mono text-2xl font-bold tracking-tight text-foreground tabular-nums">
                            {provider.coverage.ussdCode}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyUssd(provider.coverage!.ussdCode!)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                        >
                          {copiedUssd ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          {copiedUssd ? "Copied" : "Copy shortcode"}
                        </button>
                      </div>
                    )}

                    <div>
                      <h3 className="mb-2.5 text-xs font-semibold text-muted-foreground">
                        Supported Interfaces
                      </h3>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                        {ALL_PLATFORMS.map((platform) => {
                          const supported =
                            provider.coverage?.platforms?.includes(platform) ?? false;
                          const Icon = getPlatformIcon(platform);
                          return (
                            <div
                              key={platform}
                              className={`flex flex-col gap-1.5 rounded-xl border p-3 ${
                                supported
                                  ? "border-border bg-card text-foreground"
                                  : "border-border/60 bg-muted/20 text-muted-foreground/60"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <Icon
                                  className={`h-4 w-4 ${
                                    supported ? "text-primary" : "text-muted-foreground/50"
                                  }`}
                                />
                                {supported ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <MinusCircle className="h-3.5 w-3.5 opacity-40" />
                                )}
                              </div>
                              <span className="text-xs font-semibold">{platform}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <dl className="divide-y divide-border border-y border-border">
                      {hasRegions && (
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                            Operating Regions
                          </dt>
                          <dd className="text-xs font-medium leading-relaxed text-foreground sm:col-span-2">
                            {provider.coverage.regions!.join(" · ")}
                          </dd>
                        </div>
                      )}

                      {hasLanguages && (
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Languages className="h-3.5 w-3.5 text-muted-foreground/70" />
                            Languages
                          </dt>
                          <dd className="text-xs font-medium text-foreground sm:col-span-2">
                            {provider.coverage.languages!.join(", ")}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-border px-4 py-6 text-xs text-muted-foreground">
                    Coverage and channel metadata have not been documented yet for this provider.
                  </p>
                )}
              </section>

              {/* 03. Transactions & Limits */}
              <section id="transactions" className="scroll-mt-20">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                    03
                  </span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                    Transactions, Fees & Limits
                  </h2>
                </div>

                {provider.transactions ? (
                  <div className="space-y-6">
                    {provider.transactions.feeStructure && (
                      <div className="rounded-xl border border-border bg-card p-4">
                        <div className="text-[11px] font-medium text-muted-foreground">
                          Fee Structure
                        </div>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">
                          {provider.transactions.feeStructure}
                        </p>
                      </div>
                    )}

                    {provider.transactions.limits && (
                      <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        <div className="p-4">
                          <div className="text-[11px] font-medium text-muted-foreground">
                            Minimum Transaction
                          </div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground tabular-nums">
                            {provider.transactions.limits.min || "—"}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-[11px] font-medium text-muted-foreground">
                            Single Transaction Max
                          </div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground tabular-nums">
                            {provider.transactions.limits.max || "—"}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-[11px] font-medium text-muted-foreground">
                            Daily Wallet Cap
                          </div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground tabular-nums">
                            {provider.transactions.limits.daily || "—"}
                          </div>
                        </div>
                      </div>
                    )}

                    {hasTxTypes && (
                      <div>
                        <h3 className="mb-2.5 text-xs font-semibold text-muted-foreground">
                          Supported Payment Capabilities
                        </h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {provider.transactions.types!.map((txType) => (
                            <div
                              key={txType}
                              className="flex items-center gap-2.5 rounded-lg border border-border bg-card/70 px-3.5 py-2.5 text-xs font-medium text-foreground"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                              <span>{txType}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-border px-4 py-6 text-xs text-muted-foreground">
                    Transaction limits and fee details have not been documented yet.
                  </p>
                )}
              </section>

              {/* 04. Developer & Integration Spec */}
              <section id="developer" className="scroll-mt-20">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                    04
                  </span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                    Developer & Integration Readiness
                  </h2>
                </div>

                {provider.developer ? (
                  <div className="space-y-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Official API</span>
                          <Code2 className="h-3.5 w-3.5" />
                        </div>
                        <div
                          className={`mt-1.5 text-sm font-bold ${
                            provider.developer.hasApi === true
                              ? "text-emerald-600 dark:text-emerald-400"
                              : provider.developer.hasApi === "unofficial"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {apiLabel}
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Sandbox</span>
                          <TestTube className="h-3.5 w-3.5" />
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-foreground">
                          {provider.developer.sandboxAvailable ? "Available" : "Not listed"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Webhooks</span>
                          <Webhook className="h-3.5 w-3.5" />
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-foreground">
                          {provider.developer.webhookSupport === true
                            ? "Supported"
                            : provider.developer.webhookSupport === false
                            ? "Not supported"
                            : "Unknown"}
                        </div>
                      </div>
                    </div>

                    {provider.developer.apiDocsUrl && (
                      <a
                        href={provider.developer.apiDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fc-card flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3.5 hover:border-primary/40"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-foreground">
                            Developer Portal & API Reference
                          </div>
                          <div className="truncate font-mono text-xs text-primary">
                            {provider.developer.apiDocsUrl}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 shrink-0 text-primary" />
                      </a>
                    )}

                    {hasIntegrations && (
                      <div>
                        <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
                          Aggregators & Integration Pathways
                        </h3>
                        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                          {provider.developer.integrationPlatforms!.map((item, idx) => (
                            <li
                              key={`${item}-${idx}`}
                              className="flex items-start gap-2.5 px-4 py-2.5 text-xs leading-relaxed text-foreground"
                            >
                              <span className="mt-1 font-mono text-[10px] text-primary tabular-nums">
                                0{idx + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hasSdks && (
                      <div>
                        <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
                          Official & Community SDKs
                        </h3>
                        <div className="space-y-2">
                          {provider.developer.sdks!.map((sdk, idx) =>
                            sdk.url ? (
                              <a
                                key={`${sdk.name}-${idx}`}
                                href={sdk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <Hash className="h-3.5 w-3.5 text-primary" />
                                  {sdk.name}
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                              </a>
                            ) : (
                              <div
                                key={`${sdk.name}-${idx}`}
                                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-xs font-medium text-foreground"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                                  {sdk.name}
                                </span>
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  Reference listed
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-border px-4 py-6 text-xs text-muted-foreground">
                    Developer API metadata is not yet available for this operator.
                  </p>
                )}
              </section>
            </div>
          </div>

          {/* Right Sticky Inspector Rail */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-20 self-start">
            {/* Logo Asset Studio */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-primary" />
                  <h2 className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                    Brand Asset Studio
                  </h2>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
                  <button
                    onClick={() => setLogoSurface("light")}
                    className={`rounded p-1 transition-colors ${
                      logoSurface === "light"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Light canvas"
                    aria-label="Light canvas"
                  >
                    <Sun className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setLogoSurface("dark")}
                    className={`rounded p-1 transition-colors ${
                      logoSurface === "dark"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Dark canvas"
                    aria-label="Dark canvas"
                  >
                    <Moon className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setLogoSurface("brand")}
                    className={`rounded p-1 transition-colors ${
                      logoSurface === "brand"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Brand tint canvas"
                    aria-label="Brand tint canvas"
                  >
                    <span
                      className="block h-3 w-3 rounded-sm border border-black/15"
                      style={{ backgroundColor: brandColor }}
                    />
                  </button>
                  <button
                    onClick={() => setLogoSurface("checker")}
                    className={`rounded p-1 transition-colors ${
                      logoSurface === "checker"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Transparency grid"
                    aria-label="Transparency grid"
                  >
                    <Grid className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div
                className={`flex h-40 items-center justify-center p-8 transition-colors duration-150 ${
                  logoSurface === "light"
                    ? "bg-[#F7F7F7]"
                    : logoSurface === "dark"
                    ? "bg-[#0E0E0E]"
                    : logoSurface === "checker"
                    ? "fc-checkerboard"
                    : ""
                }`}
                style={
                  logoSurface === "brand"
                    ? { backgroundColor: brandColor }
                    : undefined
                }
              >
                {displayLogo ? (
                  <img
                    src={displayLogo}
                    alt={`${provider.name} asset preview`}
                    referrerPolicy="no-referrer"
                    className="max-h-24 max-w-full object-contain"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <span
                    className={`font-display text-3xl font-extrabold ${
                      logoSurface === "dark" || logoSurface === "brand"
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {provider.shortName || provider.name.slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="space-y-3 border-t border-border p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Primary Color</span>
                  <button
                    onClick={handleCopyColor}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <span
                      className="h-3 w-3 rounded-sm border border-black/15"
                      style={{ backgroundColor: brandColor }}
                    />
                    <span>{brandColor.toUpperCase()}</span>
                    {copiedColor ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadLogo}
                    className="fc-btn-primary inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button
                    onClick={handleCopyName}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    {copiedName ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedName ? "Copied" : "Copy Name"}
                  </button>
                </div>
              </div>
            </section>

            {/* Dark Live Record Terminal */}
            <section className="overflow-hidden rounded-2xl border border-border bg-[#111114] text-zinc-200">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate max-w-[130px]">
                    {provider.slug}.{codeTab === "json" ? "json" : "ts"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center rounded-md border border-white/10 bg-white/5 p-0.5">
                    <button
                      onClick={() => setCodeTab("json")}
                      className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${
                        codeTab === "json"
                          ? "bg-primary text-primary-foreground"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setCodeTab("typescript")}
                      className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${
                        codeTab === "typescript"
                          ? "bg-primary text-primary-foreground"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      TS
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopyCode()}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Copy code snippet"
                  >
                    {copiedCode ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
              <pre className="max-h-[280px] overflow-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300 scrollbar-hide">
                <code>{activeCode}</code>
              </pre>
            </section>

            {/* Verification & Data Provenance */}
            <section className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Data Provenance</span>
                </div>
                {provider.meta?.lastVerified && (
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {provider.meta.lastVerified}
                  </span>
                )}
              </div>

              {hasSources ? (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-border pt-3 text-xs">
                  {provider.meta!.sources!.map((s, idx) => (
                    <a
                      key={`${s.url}-${idx}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      {s.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  Community-maintained directory entry.
                </p>
              )}

              <a
                href={`https://github.com/Amichael10/africa-money-hub/issues/new?title=Edit:%20${encodeURIComponent(
                  provider.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Suggest an edit on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </section>
          </aside>
        </div>

        {/* Same-Country Operators */}
        {siblingProviders.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className={`fi fi-${country.code.toLowerCase()} rounded-[2px] text-lg`} />
                <h2 className="font-display text-lg font-bold text-foreground">
                  More operators in {country.name}
                </h2>
              </div>
              <Link to="/" className="text-xs font-semibold text-primary hover:underline">
                View all markets
              </Link>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {siblingProviders.map((sib, idx) => (
                <ProviderCard
                  key={`${country.code}-${sib.slug}-${idx}`}
                  provider={sib}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
