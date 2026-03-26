// SVG logos from Nigerian-Bank-Logos repo
import airtelAfricaSvg from "@/assets/provider-logos/repo/airtelafri.svg";
import mtnNigeriaSvg from "@/assets/provider-logos/repo/mtnn.svg";

// PNG logos from PaymentAssets repo
import airtelMoneyPng from "@/assets/provider-logos/repo/airtel-money.png";
import airteltigoPng from "@/assets/provider-logos/repo/airteltigo.png";
import freeMoneyPng from "@/assets/provider-logos/repo/free-money.png";
import halopesaPng from "@/assets/provider-logos/repo/halopesa.png";
import mpesaPng from "@/assets/provider-logos/repo/mpesa.png";
import mtnMomoPng from "@/assets/provider-logos/repo/mtn-momo.png";
import moovAfricaPng from "@/assets/provider-logos/repo/moov-africa.png";
import movitelPng from "@/assets/provider-logos/repo/movitel.png";
import orangeMoneyPng from "@/assets/provider-logos/repo/orange-money.png";
import telecelCashPng from "@/assets/provider-logos/repo/telecel-cash.png";
import tigoPesaPng from "@/assets/provider-logos/repo/tigo-pesa.png";
import vodacomPng from "@/assets/provider-logos/repo/vodacom.png";
import celtiisPng from "@/assets/provider-logos/repo/celtiis.png";
import tnmPng from "@/assets/provider-logos/repo/tnm.png";
import zamtelPng from "@/assets/provider-logos/repo/zamtel.png";

// Map of provider name patterns to local logo assets
// Order matters: more specific patterns should come first
const logoMap: [RegExp, string][] = [
  // Specific matches first
  [/airteltigo/i, airteltigoPng],
  [/halopesa|halotel/i, halopesaPng],
  [/tigo pesa|tigo cash/i, tigoPesaPng],
  [/telecel cash/i, telecelCashPng],
  [/free money/i, freeMoneyPng],
  [/tnm mpamba/i, tnmPng],
  [/zamtel/i, zamtelPng],
  [/movitel|e-mola/i, movitelPng],
  [/celtiis/i, celtiisPng],
  // M-Pesa / Vodacom
  [/m-pesa|vodacom/i, mpesaPng],
  // Orange Money
  [/orange money/i, orangeMoneyPng],
  // Moov Money / Moov Africa
  [/moov/i, moovAfricaPng],
  // MTN MoMo (use PNG from PaymentAssets — higher quality match)
  [/mtn/i, mtnMomoPng],
  // Airtel Money (generic)
  [/airtel/i, airtelMoneyPng],
];

export const getRepoProviderLogo = (providerName: string): string | null => {
  for (const [pattern, logo] of logoMap) {
    if (pattern.test(providerName)) {
      return logo;
    }
  }
  return null;
};