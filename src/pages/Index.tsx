import { useState, useMemo, useRef } from "react";
import { Search, Smartphone, Globe, X, ChevronRight } from "lucide-react";
import { countries } from "@/data/providers";
import CountrySection from "@/components/CountrySection";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Group countries by region
  const regions = useMemo(() => {
    const regionMap: Record<string, typeof countries> = {
      "West Africa": [],
      "East Africa": [],
      "Southern Africa": [],
      "Central Africa": [],
      "North Africa": [],
      "Other Regions": [],
    };

    const westAfrica = ["NG", "GH", "SN", "CI", "ML", "BF", "NE", "GW", "GM", "SL", "LR", "TG", "BJ", "CV", "GN"];
    const eastAfrica = ["KE", "TZ", "UG", "RW", "ET", "SO", "SS", "SD", "ER", "DJ", "KM", "MG", "MU", "SC"];
    const southernAfrica = ["ZA", "ZW", "BW", "NA", "MZ", "ZM", "MW", "SZ", "LS"];
    const centralAfrica = ["CD", "CG", "CM", "GA", "GQ", "CF", "TD", "ST"];
    const northAfrica = ["EG", "MA", "TN", "DZ", "LY", "MR"];

    countries.forEach((c) => {
      if (westAfrica.includes(c.code)) regionMap["West Africa"].push(c);
      else if (eastAfrica.includes(c.code)) regionMap["East Africa"].push(c);
      else if (southernAfrica.includes(c.code)) regionMap["Southern Africa"].push(c);
      else if (centralAfrica.includes(c.code)) regionMap["Central Africa"].push(c);
      else if (northAfrica.includes(c.code)) regionMap["North Africa"].push(c);
      else regionMap["Other Regions"].push(c);
    });

    // Remove empty regions
    return Object.fromEntries(Object.entries(regionMap).filter(([, v]) => v.length > 0));
  }, []);

  const filtered = useMemo(() => {
    let source = countries;
    if (activeRegion && regions[activeRegion]) {
      source = regions[activeRegion];
    }
    if (!search.trim()) return source;
    const q = search.toLowerCase();
    return source
      .map((c) => ({
        ...c,
        providers: c.providers.filter(
          (p) => p.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.providers.length > 0);
  }, [search, activeRegion, regions]);

  const totalProviders = countries.reduce((s, c) => s + c.providers.length, 0);
  const filteredProviders = filtered.reduce((s, c) => s + c.providers.length, 0);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/6" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />

        <div className="relative container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25 mb-5">
              <Smartphone className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl tracking-tight">
              Africa Mobile Money
            </h1>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-lg">
              The most comprehensive directory of mobile money providers across the African continent.
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
            <div className="relative w-full max-w-lg mt-8">
              <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search providers, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3.5 pl-11 pr-10 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Region Tabs */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => { setActiveRegion(null); scrollToContent(); }}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                activeRegion === null
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All Regions
            </button>
            {Object.entries(regions).map(([region, regionCountries]) => (
              <button
                key={region}
                onClick={() => { setActiveRegion(region); scrollToContent(); }}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeRegion === region
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {region}
                <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                  activeRegion === region
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {regionCountries.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results bar */}
      <div ref={contentRef} className="container mx-auto max-w-6xl px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {search || activeRegion ? (
              <>
                Showing <span className="font-semibold text-foreground">{filteredProviders}</span> providers
                in <span className="font-semibold text-foreground">{filtered.length}</span> countries
              </>
            ) : (
              <>
                Browse all <span className="font-semibold text-foreground">{totalProviders}</span> providers
              </>
            )}
          </p>
          {(search || activeRegion) && (
            <button
              onClick={() => { setSearch(""); setActiveRegion(null); }}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              Clear filters
              <X className="h-3.5 w-3.5" />
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
            <p className="mt-1 text-muted-foreground">
              Try a different search term or clear filters
            </p>
            <button
              onClick={() => { setSearch(""); setActiveRegion(null); }}
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
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Africa Mobile Money Directory — {totalProviders} providers across {countries.length} countries
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
