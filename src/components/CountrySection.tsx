import { Country } from "@/data/providers";
import ProviderCard from "./ProviderCard";

interface CountrySectionProps {
  country: Country;
}

const CountrySection = ({ country }: CountrySectionProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{country.flag}</span>
        <h2 className="font-display text-lg font-semibold text-foreground">
          {country.name}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {country.providers.length}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {country.providers.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default CountrySection;
