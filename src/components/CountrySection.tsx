import { Country } from "@/data/providers";
import ProviderCard from "./ProviderCard";

interface CountrySectionProps {
  country: Country;
  viewMode?: "grid" | "list";
}

const CountrySection = ({ country, viewMode = "grid" }: CountrySectionProps) => {
  return (
    <section className="animate-fc-enter">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`fi fi-${country.code.toLowerCase()} rounded-[3px] text-xl leading-none shadow-sm`}
          aria-hidden="true"
        />
        <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
          {country.name}
        </h2>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {country.providers.length} {country.providers.length === 1 ? "provider" : "providers"}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {viewMode === "list" ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {country.providers.map((provider, idx) => (
            <ProviderCard
              key={`${country.code}-${provider.slug}-${idx}`}
              provider={provider}
              variant="row"
              countryName={country.name}
              countryCode={country.code}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {country.providers.map((provider, idx) => (
            <ProviderCard
              key={`${country.code}-${provider.slug}-${idx}`}
              provider={provider}
              variant="grid"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CountrySection;
