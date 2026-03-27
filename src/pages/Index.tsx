import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Smartphone, Globe, X, SlidersHorizontal } from "lucide-react";
import { countries } from "@/data/providers";
import { ThemeToggle } from "@/components/ThemeToggle";
import CountrySection from "@/components/CountrySection";

type SortOption = "alphabetical" | "country" | "region";
type StatusFilter = "all" | "active" | "inactive";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("region");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const regions = useMemo(() => {
    const regionMap: Record<string, typeof countries> = {
      "West Africa": [], "East Africa": [], "Southern Africa": [],
      "Central Africa": [], "North Africa": [], "Other Regions": [],
    };
    const westAfrica = ["NG", "GH", "SN", "CI", "ML", "BF", "NE", "GW", "GM", "SL", "LR", "TG", "BJ", "CV", "GN"];
    const eastAfrica = ["KE", "TZ", "UG", "RW", "ET", "SO", "SS", "SD", "ER", "DJ", "KM", "MG", "MU", "SC"];
    const southernAfrica = ["ZA", "ZW", "BW", "NA", "MZ", "ZM", "MW", "SZ", "LS"];
    const centralAfrica = ["CD", "CG", "CM", "GA", "GQ", "CF", "TD", "ST", "AO"];
    const northAfrica = ["EG", "MA", "TN", "DZ", "LY", "MR"];

    countries.forEach((c) => {
      if (westAfrica.includes(c.code)) regionMap["West Africa"].push(c);
      else if (eastAfrica.includes(c.code)) regionMap["East Africa"].push(c);
      else if (southernAfrica.includes(c.code)) regionMap["Southern Africa"].push(c);
      else if (centralAfrica.includes(c.code)) regionMap["Central Africa"].push(c);
      else if (northAfrica.includes(c.code)) regionMap["North Africa"].push(c);
      else regionMap["Other Regions"].push(c);
    });
    return Object.fromEntries(Object.entries(regionMap).filter(([, v]) => v.length > 0));
  }, []);

  const filtered = useMemo(() => {
    let source = activeRegion && regions[activeRegion] ? regions[activeRegion] : countries;

    // Status filter
    if (statusFilter !== "all") {
      source = source
        .map((c) => ({
          ...c,
          providers: c.providers.filter((p) => p.status === statusFilter),
        }))
        .filter((c) => c.providers.length > 0);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      source = source
        .map((c) => ({
          ...c,
          providers: c.providers.filter(
            (p) => p.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || (p.tagline?.toLowerCase().includes(q))
          ),
        }))
        .filter((c) => c.providers.length > 0);
    }

    // Sort
    if (sortBy === "alphabetical") {
      source = [...source].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "country") {
      source = [...source].sort((a, b) => b.providers.length - a.providers.length);
    }

    return source;
  }, [search, activeRegion, regions, sortBy, statusFilter]);

  const totalProviders = countries.reduce((s, c) => s + c.providers.length, 0);
  const filteredProviders = filtered.reduce((s, c) => s + c.providers.length, 0);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hasActiveFilters = search || activeRegion || statusFilter !== "all";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />

        {/* Top nav */}
        <div className="relative container mx-auto max-w-6xl px-4 pt-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
              <Smartphone className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight hidden sm:inline">AfriPay Directory</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl tracking-tight">
              African Mobile Money <span className="text-primary">Directory</span>
            </h1>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-lg">
              The open-source reference for mobile money providers across Africa. Built for developers and designers building fintech products.
            </p>
            <div className="flex items-center gap-6 mt-5 text-sm">
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Globe className="h-4 w-4 text-primary" />
                <span>{countries.length} Countries</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Smartphone className="h-4 w-4 text-accent" />
                <span>{totalProviders} Providers</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-xl mt-8">
              <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search providers, countries, features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3.5 pl-11 pr-10 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Region Tabs + Filters */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 py-2">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => { setActiveRegion(null); scrollToContent(); }}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeRegion === null ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All
              </button>
              {Object.entries(regions).map(([region, regionCountries]) => (
                <button
                  key={region}
                  onClick={() => { setActiveRegion(region); scrollToContent(); }}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeRegion === region ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {region}
                  <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                    activeRegion === region ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {regionCountries.length}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 rounded-lg p-2 text-sm transition-all ${showFilters ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="pb-3 flex flex-wrap items-center gap-4 border-t border-border/50 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sort:</span>
                {(["region", "alphabetical", "country"] as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      sortBy === opt ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt === "country" ? "Most Providers" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status:</span>
                {(["all", "active", "inactive"] as StatusFilter[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStatusFilter(opt)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      statusFilter === opt ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results bar */}
      <div ref={contentRef} className="container mx-auto max-w-6xl px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {hasActiveFilters ? (
              <>Showing <span className="font-semibold text-foreground">{filteredProviders}</span> providers in <span className="font-semibold text-foreground">{filtered.length}</span> countries</>
            ) : (
              <>Browse all <span className="font-semibold text-foreground">{totalProviders}</span> providers</>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => { setSearch(""); setActiveRegion(null); setStatusFilter("all"); }}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              Clear filters <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto max-w-6xl px-4 pb-16 pt-2">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">No results found</h3>
            <p className="mt-1 text-muted-foreground">Try a different search term or clear filters</p>
            <button
              onClick={() => { setSearch(""); setActiveRegion(null); setStatusFilter("all"); }}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((country) => (
              <CountrySection key={country.code} country={country} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Smartphone className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">AfriPay Directory</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Open-source directory — {totalProviders} providers across {countries.length} countries
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
