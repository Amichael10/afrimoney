import { useState, useMemo } from "react";
import { Search, Smartphone } from "lucide-react";
import { countries } from "@/data/providers";
import CountrySection from "@/components/CountrySection";

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries
      .map((c) => ({
        ...c,
        providers: c.providers.filter((p) =>
          p.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.providers.length > 0);
  }, [search]);

  const totalProviders = countries.reduce((s, c) => s + c.providers.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Smartphone className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Africa Mobile Money
            </h1>
          </div>
          <p className="text-muted-foreground mb-6">
            {totalProviders} providers across {countries.length} countries — logos, names & details at your fingertips.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search provider or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-5xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No providers found for "{search}"
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((country) => (
              <CountrySection key={country.code} country={country} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
