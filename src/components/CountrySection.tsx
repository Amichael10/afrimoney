import { Country } from "@/data/providers";
import ProviderCard from "./ProviderCard";

interface CountrySectionProps {
  country: Country;
}

const CountrySection = ({ country }: CountrySectionProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-2xl leading-none">{country.flag}</span>
        <h2 className="font-display text-lg font-bold text-foreground">
          {country.name}
        </h2>
        <span className="rounded-md border-2 border-foreground bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-bold">
          {country.providers.length}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {country.providers.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default CountrySection;
