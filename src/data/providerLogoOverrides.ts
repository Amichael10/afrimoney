// === SVG logos (Nigerian-Bank-Logos repo) ===
import airtelAfricaSvg from "@/assets/provider-logos/repo/airtelafri.svg";
import mtnNigeriaSvg from "@/assets/provider-logos/repo/mtnn.svg";

// === User-uploaded logos ===
import afrimoneyPng from "@/assets/provider-logos/repo/afrimoney.png";
import airtelMoneyUploadPng from "@/assets/provider-logos/repo/airtel-money-upload.png";
import amolePng from "@/assets/provider-logos/repo/amole.png";
import baridimobPng from "@/assets/provider-logos/repo/baridimob.png";
import cashPlusPng from "@/assets/provider-logos/repo/cash-plus.png";

// === PNG logos (PaymentAssets repo — high quality) ===
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

// === Favicon logos (Google Favicons) ===
import opayPng from "@/assets/provider-logos/repo/opay.png";
import kudaPng from "@/assets/provider-logos/repo/kuda.png";
import palmpayPng from "@/assets/provider-logos/repo/palmpay.png";
import moniepointPng from "@/assets/provider-logos/repo/moniepoint.png";
import carbonPng from "@/assets/provider-logos/repo/carbon.png";
import fairmoneyPng from "@/assets/provider-logos/repo/fairmoney.png";
import ninePsbPng from "@/assets/provider-logos/repo/9psb.png";
import safaricomPng from "@/assets/provider-logos/repo/safaricom.png";
import capitecPng from "@/assets/provider-logos/repo/capitec.png";
import tymebankPng from "@/assets/provider-logos/repo/tymebank.png";
import vodafoneEgPng from "@/assets/provider-logos/repo/vodafone-eg.png";
import etisalatPng from "@/assets/provider-logos/repo/etisalat.png";
import wizallPng from "@/assets/provider-logos/repo/wizall.png";
import zainPng from "@/assets/provider-logos/repo/zain.png";
import africellPng from "@/assets/provider-logos/repo/africell.png";
import ooredooPng from "@/assets/provider-logos/repo/ooredoo.png";
import cihPng from "@/assets/provider-logos/repo/cih.png";
import inwiPng from "@/assets/provider-logos/repo/inwi.png";
import telmaPng from "@/assets/provider-logos/repo/telma.png";
import mcbPng from "@/assets/provider-logos/repo/mcb.png";
import hormuudPng from "@/assets/provider-logos/repo/hormuud.png";
import wavePng from "@/assets/provider-logos/repo/wave.png";
import dMoneyPng from "@/assets/provider-logos/repo/d-money.png";
import eMolaPng from "@/assets/provider-logos/repo/e-mola.png";
import expressoPng from "@/assets/provider-logos/repo/expresso.png";
import mkeshPng from "@/assets/provider-logos/repo/mkesh.png";

// Map of provider name patterns to local logo assets
// Order matters: more specific patterns should come first
const logoMap: [RegExp, string][] = [
  // Nigerian fintechs
  [/opay/i, opayPng],
  [/palmpay/i, palmpayPng],
  [/kuda/i, kudaPng],
  [/moniepoint/i, moniepointPng],
  [/carbon/i, carbonPng],
  [/fairmoney/i, fairmoneyPng],
  [/9psb|9mobile/i, ninePsbPng],
  // User-uploaded logos
  [/afrimoney|movicel/i, afrimoneyPng],
  [/amole/i, amolePng],
  [/baridimob|algérie poste/i, baridimobPng],
  [/cash\s*plus/i, cashPlusPng],
  // Specific telco/payment brands
  [/airteltigo/i, airteltigoPng],
  [/halopesa|halotel/i, halopesaPng],
  [/tigo pesa|tigo cash/i, tigoPesaPng],
  [/telecel cash/i, telecelCashPng],
  [/free money/i, freeMoneyPng],
  [/tnm mpamba/i, tnmPng],
  [/zamtel/i, zamtelPng],
  [/movitel/i, movitelPng],
  [/e-mola/i, eMolaPng],
  [/celtiis/i, celtiisPng],
  [/capitec/i, capitecPng],
  [/tymebank/i, tymebankPng],
  [/vodafone cash/i, vodafoneEgPng],
  [/etisalat|e& money/i, etisalatPng],
  [/wizall/i, wizallPng],
  [/zain/i, zainPng],
  [/africell/i, africellPng],
  [/ooredoo/i, ooredooPng],
  [/cih pay/i, cihPng],
  [/inwi/i, inwiPng],
  [/mvola.*telma|telma/i, telmaPng],
  [/juice.*mcb|mcb/i, mcbPng],
  [/evc plus|hormuud/i, hormuudPng],
  [/safaricom/i, safaricomPng],
  [/wave/i, wavePng],
  [/d-money|djibouti telecom/i, dMoneyPng],
  [/expresso/i, expressoPng],
  // M-Pesa / Vodacom
  [/m-pesa|vodacom/i, mpesaPng],
  // Orange Money
  [/orange money/i, orangeMoneyPng],
  // Moov Money / Moov Africa
  [/moov/i, moovAfricaPng],
  // MTN MoMo
  [/mtn/i, mtnMomoPng],
  // Airtel Money (generic)
  [/airtel/i, airtelMoneyUploadPng],
];

export const getRepoProviderLogo = (providerName: string): string | null => {
  for (const [pattern, logo] of logoMap) {
    if (pattern.test(providerName)) {
      return logo;
    }
  }
  return null;
};