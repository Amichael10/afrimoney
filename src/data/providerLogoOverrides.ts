import airtelAfricaLogo from "@/assets/provider-logos/repo/airtelafri.svg";
import mtnNigeriaLogo from "@/assets/provider-logos/repo/mtnn.svg";

export const getRepoProviderLogo = (providerName: string): string | null => {
  const normalizedName = providerName.toLowerCase();

  if (normalizedName.includes("mtn")) {
    return mtnNigeriaLogo;
  }

  if (normalizedName.includes("airtel")) {
    return airtelAfricaLogo;
  }

  return null;
};