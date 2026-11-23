import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Code2,
  ArrowRight,
  Image as ImageIcon,
  Palette,
} from "lucide-react";
import { countries } from "@/data/providers";
import CountrySection from "@/components/CountrySection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeveloperPreview } from "@/components/DeveloperPreview";

type SortOption = "region" | "alphabetical" | "country";
type StatusFilter = "all" | "active" | "inactive";
type ViewMode = "grid" | "list";

const QUICK_QUERIES = ["M-Pesa", "OPay", "MTN MoMo", "Wave", "Telebirr", "Orange Money"];

const WEST_AFRICA = ["NG", "GH", "SN", "CI", "ML", "BF", "NE", "GW", "GM", "SL", "LR", "TG", "BJ", "CV", "GN"];
const EAST_AFRICA = ["KE", "TZ", "UG", "RW", "ET", "SO", "SS", "SD", "ER", "DJ", "KM", "MG", "MU", "SC"];
const SOUTHERN_AFRICA = ["ZA", "ZW", "BW", "NA", "MZ", "ZM", "MW", "SZ", "LS"];
const CENTRAL_AFRICA = ["CD", "CG", "CM", "GA", "GQ", "CF", "TD", "ST", "AO"];
const NORTH_AFRICA = ["EG", "MA", "TN", "DZ", "LY", "MR"];

const ALL_AFRICAN_CODES = new Set([
  ...WEST_AFRICA,
  ...EAST_AFRICA,
  ...SOUTHERN_AFRICA,
  ...CENTRAL_AFRICA,
  ...NORTH_AFRICA,
]);

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("region");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [apiOnly, setApiOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        setSearch("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const regions = useMemo(() => {
    const regionMap: Record<string, typeof countries> = {
      "West Africa": [],
      "East Africa": [],
      "Southern Africa": [],
      "Central Africa": [],
      "North Africa": [],
    };
    countries.forEach((c) => {
      if (WEST_AFRICA.includes(c.code)) regionMap["West Africa"].push(c);
      else if (EAST_AFRICA.includes(c.code)) regionMap["East Africa"].push(c);
      else if (SOUTHERN_AFRICA.includes(c.code)) regionMap["Southern Africa"].push(c);
      else if (CENTRAL_AFRICA.includes(c.code)) regionMap["Central Africa"].push(c);
      else if (NORTH_AFRICA.includes(c.code)) regionMap["North Africa"].push(c);
    });
    return Object.fromEntries(Object.entries(regionMap).filter(([, v]) => v.length > 0));
  }, []);

  const africanCountries = useMemo(
    () => countries.filter((c) => ALL_AFRICAN_CODES.has(c.code)),
    []
  );

  const metrics = useMemo(() => {
    let totalProviders = 0;
    let apiCount = 0;
    let ussdCount = 0;
    africanCountries.forEach((c) => {
      c.providers.forEach((p) => {
        totalProviders += 1;
        if (p.developer?.hasApi === true) apiCount += 1;
        if (p.coverage?.ussdCode) ussdCount += 1;
      });
    });
    return {
      totalCountries: africanCountries.length,
      totalProviders,
      apiCount,
      ussdCount,
    };
  }, [africanCountries]);

  const filtered = useMemo(() => {
    let source =
      activeRegion && regions[activeRegion]
        ? regions[activeRegion]
        : africanCountries;

    if (statusFilter !== "all") {
      source = source
        .map((c) => ({
          ...c,
          providers: c.providers.filter((p) => (p.status || "active") === statusFilter),
        }))
        .filter((c) => c.providers.length > 0);
    }

    if (apiOnly) {
      source = source
        .map((c) => ({
          ...c,
          providers: c.providers.filter((p) => p.developer?.hasApi === true),
        }))
        .filter((c) => c.providers.length > 0);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      source = source
        .map((c) => ({
          ...c,
          providers: c.providers.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              c.name.toLowerCase().includes(q) ||
              p.tagline?.toLowerCase().includes(q) ||
              p.coverage?.ussdCode?.toLowerCase().includes(q) ||
              p.transactions?.currency?.toLowerCase().includes(q)
          ),
        }))
        .filter((c) => c.providers.length > 0);
    }

    if (sortBy === "alphabetical") {
      source = [...source].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "country") {
      source = [...source].sort((a, b) => b.providers.length - a.providers.length);
    }

    return source;
  }, [search, activeRegion, regions, sortBy, statusFilter, apiOnly, africanCountries]);

  const filteredProviders = filtered.reduce((s, c) => s + c.providers.length, 0);
  const hasActiveFilters = Boolean(search || activeRegion || statusFilter !== "all" || apiOnly);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setSearch("");
    setActiveRegion(null);
    setStatusFilter("all");
    setApiOnly(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Architectural grid backdrop with subtle radial mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fc-grid-surface [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,black_30%,transparent_100%)]"
        />
        {/* Subtle warm heat glow behind headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[340px] w-[720px] rounded-full bg-primary/10 blur-[110px] opacity-70 dark:opacity-45"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-20">
          {/* Crosshair architectural ticks */}
          <span aria-hidden="true" className="hidden lg:block absolute left-6 top-8 font-mono text-xs text-border select-none">+</span>
          <span aria-hidden="true" className="hidden lg:block absolute right-6 top-8 font-mono text-xs text-border select-none">+</span>

          <div className="mx-auto max-w-3xl text-center animate-fc-enter">
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-foreground text-balance">
              African mobile money,{" "}
              <span className="text-primary">indexed for builders.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              An open-source directory of mobile money operators, USSD codes, developer APIs, transaction limits, and vector logos across Africa.
            </p>

            {/* Elevated Command Search */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="group relative flex items-center rounded-xl border border-border bg-card shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] transition-all duration-150 focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10 dark:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]">
                <Search className="ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search providers, countries, USSD (*955#), or currencies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent py-3.5 pl-3 pr-24 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <div className="absolute right-2.5 flex items-center gap-1.5">
                  {search ? (
                    <button
                      onClick={() => setSearch("")}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-flex h-6 items-center rounded border border-border bg-muted/60 px-1.5 font-mono text-[11px] font-medium text-muted-foreground">
                      /
                    </kbd>
                  )}
                  <button
                    onClick={scrollToContent}
                    className="fc-btn-primary inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                  >
                    Browse
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick query suggestions */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                <span>Try:</span>
                {QUICK_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setSearch(q);
                      scrollToContent();
                    }}
                    className="font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Developer Showcase */}
          <DeveloperPreview />
        </div>
      </section>

      {/* Grounded 4-Column Metrics Strip */}
      <section className="border-b border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          <div className="px-6 py-5">
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {metrics.totalCountries}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">African countries indexed</div>
          </div>
          <div className="px-6 py-5">
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {metrics.totalProviders}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">Mobile money operators</div>
          </div>
          <div className="px-6 py-5">
            <div className="font-mono text-2xl font-semibold tracking-tight text-primary tabular-nums">
              {metrics.apiCount}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">Official developer APIs</div>
          </div>
          <div className="px-6 py-5">
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {metrics.ussdCount}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">USSD-accessible networks</div>
          </div>
        </div>
      </section>

      {/* Region Tabs + Filter Toolbar (sticky only on md+ to respect 15% mobile sticky cap) */}
      <div className="border-b border-border bg-background/95 backdrop-blur-md md:sticky md:top-14 md:z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => {
                  setActiveRegion(null);
                  scrollToContent();
                }}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                  activeRegion === null
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                All Regions
              </button>
              {Object.entries(regions).map(([region, regionCountries]) => {
                const active = activeRegion === region;
                return (
                  <button
                    key={region}
                    onClick={() => {
                      setActiveRegion(region);
                      scrollToContent();
                    }}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                      active
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{region}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        active ? "text-background/75" : "text-muted-foreground/75"
                      }`}
                    >
                      {regionCountries.length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => setApiOnly(!apiOnly)}
                className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  apiOnly
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                API Only
              </button>

              <div className="hidden sm:flex items-center rounded-lg border border-border bg-card p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Grid view"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Compact list view"
                  aria-label="Compact list view"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  showFilters
                    ? "border-foreground/30 bg-muted text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
                aria-expanded={showFilters}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border py-3 animate-fc-enter">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-medium text-muted-foreground">
                  Sort
                </span>
                <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-0.5">
                  {(["region", "alphabetical", "country"] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                        sortBy === opt
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt === "country"
                        ? "Most Providers"
                        : opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-medium text-muted-foreground">
                  Status
                </span>
                <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-0.5">
                  {(["all", "active", "inactive"] as StatusFilter[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setStatusFilter(opt)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                        statusFilter === opt
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setApiOnly(!apiOnly)}
                className={`sm:hidden inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                  apiOnly
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                API Only
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary Bar */}
      <div ref={contentRef} className="mx-auto max-w-6xl px-4 pt-8 pb-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tabular-nums">
            {hasActiveFilters ? (
              <>
                Showing <span className="font-semibold text-foreground">{filteredProviders}</span>{" "}
                {filteredProviders === 1 ? "provider" : "providers"} across{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "country" : "countries"}
              </>
            ) : (
              <>
                Directory index ·{" "}
                <span className="font-semibold text-foreground">{metrics.totalProviders}</span>{" "}
                providers in{" "}
                <span className="font-semibold text-foreground">{metrics.totalCountries}</span>{" "}
                countries
              </>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Reset filters
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Directory Content */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-2 sm:px-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              No matching providers
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Try searching by another operator name, country, USSD code, or clear your active filters.
            </p>
            <button
              onClick={resetFilters}
              className="fc-btn-primary mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filtered.map((country) => (
              <CountrySection key={country.code} country={country} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Developer Utilities Strip */}
        <section className="mt-20 border-t border-border pt-14">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Open-source tools & brand assets
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Prepare normalized 256×256 provider icons or download AfriPay brand guidelines.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/tools/logo-prep"
              className="fc-card group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Logo Prep Utility
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select any indexed provider, resize logos to 256×256 PNGs in-browser, and copy ready-to-paste TypeScript imports.
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>

            <Link
              to="/brand"
              className="fc-card group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
                  <Palette className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Afrimoney Brand Kit
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Download official horizontal, stacked, and icon marks, CSS color tokens, usage rules, and social templates.
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </div>
        </section>
      </main>

      <Footer totalProviders={metrics.totalProviders} totalCountries={metrics.totalCountries} />
    </div>
  );
};

export default Index;
