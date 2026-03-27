export interface Provider {
  name: string;
  slug: string;
  color: string;
  textColor?: string;
  shortName?: string;
  domain?: string;
  // Enriched fields
  tagline?: string;
  aliases?: string[];
  parentCompany?: string;
  foundedYear?: number;
  status?: "active" | "inactive" | "acquired";
  website?: string;
  // Coverage
  coverage?: {
    regions?: string[];
    platforms?: ("USSD" | "Android" | "iOS" | "Web" | "Agent Network")[];
    ussdCode?: string;
    languages?: string[];
  };
  // Developer info
  developer?: {
    hasApi?: boolean | "unofficial";
    apiDocsUrl?: string;
    sdks?: { name: string; url: string }[];
    sandboxAvailable?: boolean;
    webhookSupport?: boolean | "unknown";
    integrationPlatforms?: string[];
  };
  // Transactions
  transactions?: {
    types?: string[];
    limits?: { min?: string; max?: string; daily?: string };
    feeStructure?: string;
    currency?: string;
  };
  // Brand
  brand?: {
    primaryColor: string;
    hasLightLogo?: boolean;
    hasDarkLogo?: boolean;
    hasIconOnly?: boolean;
  };
  // Meta
  meta?: {
    lastVerified?: string;
    sources?: { label: string; url: string }[];
  };
}

export interface Country {
  name: string;
  flag: string;
  code: string;
  providers: Provider[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Helper to create provider with auto-slug
function p(provider: Omit<Provider, "slug"> & { slug?: string }): Provider {
  return { ...provider, slug: provider.slug || slugify(provider.name) };
}

export const countries: Country[] = [
  {
    name: "Nigeria", flag: "🇳🇬", code: "NG",
    providers: [
      p({
        name: "OPay", color: "#1DBF73", shortName: "OP", domain: "opayweb.com",
        tagline: "Africa's leading mobile payment platform",
        parentCompany: "Opera (OPay Digital Services)",
        foundedYear: 2018,
        status: "active",
        website: "https://opayweb.com",
        coverage: {
          regions: ["Lagos", "Abuja", "Nationwide Nigeria"],
          platforms: ["Android", "iOS", "USSD", "Agent Network", "Web"],
          ussdCode: "*955#",
          languages: ["English"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://documentation.opayweb.com",
          sandboxAvailable: true,
          webhookSupport: true,
          integrationPlatforms: ["Flutterwave", "Paystack"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "International Remittance"],
          limits: { min: "₦50", max: "₦5,000,000", daily: "₦5,000,000" },
          feeStructure: "Free P2P transfers; merchant fees 1.5%",
          currency: "NGN",
        },
        brand: { primaryColor: "#1DBF73", hasLightLogo: true, hasDarkLogo: true, hasIconOnly: true },
        meta: { lastVerified: "2025-12-01", sources: [{ label: "OPay Official", url: "https://opayweb.com" }] },
      }),
      p({
        name: "Palmpay", color: "#6C3BF5", shortName: "PP", domain: "palmpay.com",
        tagline: "Fast, reliable mobile payments for everyone",
        parentCompany: "PalmPay Limited (Transsion Holdings)",
        foundedYear: 2019,
        status: "active",
        website: "https://palmpay.com",
        coverage: {
          platforms: ["Android", "iOS", "Agent Network"],
          languages: ["English"],
        },
        developer: {
          hasApi: true,
          sandboxAvailable: false,
          webhookSupport: "unknown",
          integrationPlatforms: ["Paystack"],
        },
        transactions: {
          types: ["P2P", "Bill Payments", "Airtime Top-up", "Merchant Payments"],
          currency: "NGN",
        },
        brand: { primaryColor: "#6C3BF5" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Kuda", color: "#40196D", shortName: "K", domain: "kuda.com", tagline: "The bank of the free", parentCompany: "Kuda Technologies", foundedYear: 2019, status: "active", website: "https://kuda.com", developer: { hasApi: true, apiDocsUrl: "https://developer.kuda.com", sandboxAvailable: true, webhookSupport: true, integrationPlatforms: ["Paystack", "Flutterwave"] }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "NGN" }, brand: { primaryColor: "#40196D" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moniepoint", color: "#0066FF", shortName: "MP", domain: "moniepoint.com", tagline: "Financial happiness for every business", parentCompany: "Moniepoint Inc.", foundedYear: 2019, status: "active", website: "https://moniepoint.com", developer: { hasApi: true, apiDocsUrl: "https://developer.moniepoint.com", sandboxAvailable: true, webhookSupport: true }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "NGN" }, brand: { primaryColor: "#0066FF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "MTN MoMo (MoMo PSB)", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com", tagline: "MTN's payment service bank for Nigeria", parentCompany: "MTN Group", foundedYear: 2022, status: "active", website: "https://mtn.ng", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*223#", languages: ["English"] }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com", sandboxAvailable: true, webhookSupport: true, integrationPlatforms: ["Flutterwave", "Paystack", "Chimoney", "Pawapay"] }, transactions: { types: ["P2P", "Airtime Top-up", "Bill Payments", "Merchant Payments"], currency: "NGN", feeStructure: "Tiered based on transaction value" }, brand: { primaryColor: "#FFCC00", hasLightLogo: true, hasDarkLogo: true, hasIconOnly: true }, meta: { lastVerified: "2025-12-01", sources: [{ label: "MTN MoMo Developer Portal", url: "https://momodeveloper.mtn.com" }] } }),
      p({ name: "Airtel Money (SmartCash PSB)", color: "#ED1C24", shortName: "AM", domain: "airtel.com.ng", tagline: "Airtel's payment service bank", parentCompany: "Airtel Africa", foundedYear: 2023, status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*185#" }, developer: { hasApi: true, integrationPlatforms: ["Pawapay"] }, transactions: { types: ["P2P", "Airtime Top-up", "Bill Payments"], currency: "NGN" }, brand: { primaryColor: "#ED1C24" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "9PSB (9mobile)", color: "#006B3F", shortName: "9P", domain: "9psb.com.ng", tagline: "9mobile's payment service bank", status: "active", transactions: { currency: "NGN" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Carbon", color: "#00C2B2", shortName: "C", domain: "getcarbon.co", tagline: "Instant loans and payments", parentCompany: "Carbon (formerly Paylater)", foundedYear: 2012, status: "active", website: "https://getcarbon.co", developer: { hasApi: true }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "NGN" }, brand: { primaryColor: "#00C2B2" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Fairmoney", color: "#00B5E2", shortName: "FM", domain: "fairmoney.io", tagline: "Fast loans & mobile banking", parentCompany: "FairMoney Microfinance Bank", foundedYear: 2017, status: "active", website: "https://fairmoney.io", transactions: { types: ["P2P", "Bill Payments"], currency: "NGN" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Kenya", flag: "🇰🇪", code: "KE",
    providers: [
      p({
        name: "M-Pesa (Safaricom)", color: "#4CAF50", shortName: "MP", domain: "safaricom.co.ke",
        tagline: "The world's most successful mobile money service",
        aliases: ["Safaricom M-Pesa", "M-PESA"],
        parentCompany: "Safaricom PLC (Vodafone Group)",
        foundedYear: 2007,
        status: "active",
        website: "https://www.safaricom.co.ke/personal/m-pesa",
        coverage: {
          regions: ["Nationwide Kenya", "Available in 7+ countries"],
          platforms: ["USSD", "Android", "iOS", "Web", "Agent Network"],
          ussdCode: "*334#",
          languages: ["English", "Swahili"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://developer.safaricom.co.ke",
          sdks: [
            { name: "Daraja API (Official)", url: "https://developer.safaricom.co.ke" },
            { name: "Node.js SDK", url: "https://github.com/safaricom/mpesa-node-library" },
          ],
          sandboxAvailable: true,
          webhookSupport: true,
          integrationPlatforms: ["Flutterwave", "Paystack", "Chimoney", "Pawapay", "Africa's Talking", "IntaSend"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments (Lipa Na M-Pesa)", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings & Loans (M-Shwari)"],
          limits: { min: "KES 1", max: "KES 150,000", daily: "KES 300,000" },
          feeStructure: "Tiered: free for small P2P, percentage for merchants",
          currency: "KES",
        },
        brand: { primaryColor: "#4CAF50", hasLightLogo: true, hasDarkLogo: true, hasIconOnly: true },
        meta: {
          lastVerified: "2025-12-01",
          sources: [
            { label: "Safaricom Developer Portal", url: "https://developer.safaricom.co.ke" },
            { label: "M-Pesa Official", url: "https://www.safaricom.co.ke/personal/m-pesa" },
          ],
        },
      }),
      p({ name: "Airtel Money Kenya", color: "#ED1C24", shortName: "AM", domain: "airtel.co.ke", tagline: "Simple, fast mobile money", parentCompany: "Airtel Africa", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*334#" }, developer: { hasApi: true, integrationPlatforms: ["Pawapay", "Flutterwave"] }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "KES" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "T-Kash (Telkom Kenya)", color: "#00AEEF", shortName: "TK", domain: "telkom.co.ke", tagline: "Telkom Kenya's mobile money", parentCompany: "Telkom Kenya", status: "active", coverage: { platforms: ["USSD", "Android"], ussdCode: "*522#" }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "KES" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Equitel (Equity Bank)", color: "#8B0000", shortName: "EQ", domain: "equitygroupholdings.com", tagline: "Banking on your phone", parentCompany: "Equity Group Holdings", status: "active", coverage: { platforms: ["Android", "iOS", "USSD"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "KES" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Ghana", flag: "🇬🇭", code: "GH",
    providers: [
      p({
        name: "MTN MoMo Ghana", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com.gh",
        tagline: "Ghana's leading mobile money service",
        parentCompany: "MTN Group",
        foundedYear: 2009,
        status: "active",
        website: "https://mtn.com.gh/momo",
        coverage: {
          regions: ["Nationwide Ghana"],
          platforms: ["USSD", "Android", "iOS", "Agent Network"],
          ussdCode: "*170#",
          languages: ["English"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://momodeveloper.mtn.com",
          sandboxAvailable: true,
          webhookSupport: true,
          integrationPlatforms: ["Flutterwave", "Paystack", "Hubtel", "Pawapay", "Chimoney"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"],
          currency: "GHS",
          feeStructure: "Tiered percentage based on amount",
        },
        brand: { primaryColor: "#FFCC00", hasLightLogo: true, hasDarkLogo: true, hasIconOnly: true },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "AirtelTigo Money", color: "#ED1C24", shortName: "AT", domain: "airteltigo.com.gh", tagline: "AirtelTigo's mobile money service", parentCompany: "AirtelTigo (now AT Ghana)", status: "active", coverage: { platforms: ["USSD", "Agent Network"], ussdCode: "*110#" }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "GHS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Telecel Cash", color: "#E60000", shortName: "TC", domain: "telecelgh.com", tagline: "Telecel Ghana's mobile money", parentCompany: "Telecel Group (formerly Vodafone Ghana)", status: "active", transactions: { types: ["P2P", "Bill Payments"], currency: "GHS" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Tanzania", flag: "🇹🇿", code: "TZ",
    providers: [
      p({
        name: "M-Pesa Tanzania (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.co.tz",
        tagline: "Tanzania's most widely used mobile money",
        parentCompany: "Vodacom Tanzania (Vodafone Group)",
        foundedYear: 2008,
        status: "active",
        website: "https://www.vodacom.co.tz/mpesa",
        coverage: {
          regions: ["Nationwide Tanzania"],
          platforms: ["USSD", "Android", "iOS", "Agent Network"],
          ussdCode: "*150*00#",
          languages: ["Swahili", "English"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://openapiportal.m-pesa.com",
          sandboxAvailable: true,
          webhookSupport: true,
          integrationPlatforms: ["Flutterwave", "Pawapay", "Selcom"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"],
          currency: "TZS",
        },
        brand: { primaryColor: "#E60000" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Airtel Money Tanzania", color: "#ED1C24", shortName: "AM", domain: "airtel.co.tz", tagline: "Airtel's mobile money in Tanzania", parentCompany: "Airtel Africa", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"] }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "TZS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Tigo Pesa", color: "#004B93", shortName: "TP", domain: "tigo.co.tz", tagline: "Tigo's mobile money service", parentCompany: "Millicom (now part of Axian)", status: "active", coverage: { platforms: ["USSD", "Agent Network"], ussdCode: "*150*01#" }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "TZS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "HaloPesa (Halotel)", color: "#FF6600", shortName: "HP", domain: "halotel.co.tz", tagline: "Halotel's mobile money", parentCompany: "Viettel Group", status: "active", coverage: { platforms: ["USSD", "Agent Network"] }, transactions: { types: ["P2P", "Airtime Top-up"], currency: "TZS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TTCL M-Pesa", color: "#003366", shortName: "TM", domain: "ttcl.co.tz", status: "active", transactions: { currency: "TZS" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Uganda", flag: "🇺🇬", code: "UG",
    providers: [
      p({
        name: "MTN MoMo Uganda", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.ug",
        tagline: "Uganda's most popular mobile money",
        parentCompany: "MTN Group",
        foundedYear: 2009,
        status: "active",
        website: "https://mtn.co.ug/momo",
        coverage: {
          regions: ["Nationwide Uganda"],
          platforms: ["USSD", "Android", "iOS", "Agent Network"],
          ussdCode: "*165#",
          languages: ["English", "Luganda"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://momodeveloper.mtn.com",
          sandboxAvailable: true,
          webhookSupport: true,
          integrationPlatforms: ["Flutterwave", "Paystack", "Pawapay", "Chimoney"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"],
          currency: "UGX",
        },
        brand: { primaryColor: "#FFCC00" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Airtel Money Uganda", color: "#ED1C24", shortName: "AM", domain: "airtel.co.ug", tagline: "Airtel's mobile money in Uganda", parentCompany: "Airtel Africa", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"] }, developer: { hasApi: true, integrationPlatforms: ["Pawapay", "Flutterwave"] }, transactions: { types: ["P2P", "Bill Payments", "Airtime Top-up"], currency: "UGX" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Rwanda", flag: "🇷🇼", code: "RW",
    providers: [
      p({ name: "MTN MoMo Rwanda", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.rw", tagline: "MTN Rwanda's mobile money", parentCompany: "MTN Group", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*182#" }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com", sandboxAvailable: true, webhookSupport: true }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "RWF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Rwanda", color: "#ED1C24", shortName: "AM", domain: "airtel.com.rw", status: "active", transactions: { currency: "RWF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Senegal", flag: "🇸🇳", code: "SN",
    providers: [
      p({ name: "Orange Money Senegal", color: "#FF6600", shortName: "OM", domain: "orange.sn", tagline: "Senegal's premier mobile money", parentCompany: "Orange Group", status: "active", website: "https://www.orange.sn", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "#144#", languages: ["French", "Wolof"] }, developer: { hasApi: true, integrationPlatforms: ["Pawapay", "Chimoney"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Free Money", color: "#CD1719", shortName: "FM", domain: "free.sn", tagline: "Free Senegal's mobile money", parentCompany: "Free (Tigo/Millicom)", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"] }, transactions: { types: ["P2P", "Airtime Top-up"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({
        name: "Wave Senegal", color: "#1B2A4A", shortName: "WV", domain: "wave.com",
        tagline: "Free mobile money for everyone",
        parentCompany: "Wave Mobile Money",
        foundedYear: 2018,
        status: "active",
        website: "https://wave.com",
        coverage: {
          regions: ["Nationwide Senegal"],
          platforms: ["Android", "iOS", "Agent Network"],
          languages: ["French", "Wolof"],
        },
        developer: {
          hasApi: "unofficial",
          integrationPlatforms: ["Pawapay"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments"],
          feeStructure: "1% flat fee on cash-out, free P2P",
          currency: "XOF",
        },
        brand: { primaryColor: "#1B2A4A" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Wari", color: "#0072CE", shortName: "WR", domain: "wari.com", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Wizall Money", color: "#00B5E2", shortName: "WZ", domain: "wizall.com", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "E-Money (Expresso)", color: "#FF9900", shortName: "EM", domain: "expressotelecom.com", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Côte d'Ivoire", flag: "🇨🇮", code: "CI",
    providers: [
      p({ name: "MTN MoMo Côte d'Ivoire", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.ci", tagline: "MTN's mobile money in Côte d'Ivoire", parentCompany: "MTN Group", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"] }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com" }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Côte d'Ivoire", color: "#FF6600", shortName: "OM", domain: "orange.ci", tagline: "Orange's mobile money in Côte d'Ivoire", parentCompany: "Orange Group", status: "active", transactions: { types: ["P2P", "Bill Payments", "International Remittance"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({
        name: "Wave Côte d'Ivoire", color: "#1B2A4A", shortName: "WV", domain: "wave.com",
        tagline: "Free, instant mobile money",
        parentCompany: "Wave Mobile Money",
        foundedYear: 2020,
        status: "active",
        website: "https://wave.com",
        coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["French"] },
        transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], feeStructure: "1% flat fee on cash-out", currency: "XOF" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Moov Money Côte d'Ivoire", color: "#0072CE", shortName: "MV", domain: "moov-africa.ci", status: "active", parentCompany: "Moov Africa (Maroc Telecom Group)", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "YAS (MTN)", color: "#FFCC00", textColor: "#000", shortName: "YAS", domain: "mtn.ci", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "South Africa", flag: "🇿🇦", code: "ZA",
    providers: [
      p({ name: "MTN MoMo South Africa", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.za", status: "active", parentCompany: "MTN Group", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Vodacom M-Pesa", color: "#E60000", shortName: "VP", domain: "vodacom.co.za", status: "inactive", parentCompany: "Vodacom (Vodafone Group)", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Capitec Pay", color: "#003B70", shortName: "CP", domain: "capitecbank.co.za", status: "active", parentCompany: "Capitec Bank", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TymeBank", color: "#FFD700", textColor: "#000", shortName: "TB", domain: "tymebank.co.za", status: "active", parentCompany: "TymeBank / African Rainbow Capital", foundedYear: 2018, transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "1voucher", color: "#FF4500", shortName: "1V", domain: "1voucher.co.za", status: "active", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "WIZZIT", color: "#7AB800", shortName: "WZ", domain: "wizzit.co.za", status: "active", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Egypt", flag: "🇪🇬", code: "EG",
    providers: [
      p({ name: "Vodafone Cash", color: "#E60000", shortName: "VC", domain: "vodafone.com.eg", tagline: "Egypt's leading mobile wallet", parentCompany: "Vodafone Egypt", status: "active", coverage: { platforms: ["USSD", "Android", "iOS"], ussdCode: "*9*8#", languages: ["Arabic", "English"] }, transactions: { types: ["P2P", "Bill Payments", "Merchant Payments"], currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Etisalat Cash (e& money)", color: "#006B3F", shortName: "EC", domain: "etisalat.eg", status: "active", parentCompany: "e& (Etisalat Group)", transactions: { currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Egypt", color: "#FF6600", shortName: "OM", domain: "orange.eg", status: "active", parentCompany: "Orange Group", transactions: { currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Fawry", color: "#FFB800", textColor: "#000", shortName: "FW", domain: "fawry.com", tagline: "Egypt's leading electronic payments network", parentCompany: "Fawry for Banking Technology and Electronic Payment", foundedYear: 2008, status: "active", website: "https://fawry.com", coverage: { platforms: ["Android", "iOS", "Web", "Agent Network"], languages: ["Arabic", "English"] }, transactions: { types: ["Bill Payments", "Merchant Payments", "Airtime Top-up"], currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "WE Pay (Telecom Egypt)", color: "#6C3BF5", shortName: "WP", domain: "te.eg", status: "active", parentCompany: "Telecom Egypt", transactions: { currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "InstaPay", color: "#0066FF", shortName: "IP", domain: "instapay.eg", status: "active", transactions: { currency: "EGP" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Cameroon", flag: "🇨🇲", code: "CM",
    providers: [
      p({ name: "MTN MoMo Cameroon", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.cm", parentCompany: "MTN Group", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Cameroon", color: "#FF6600", shortName: "OM", domain: "orange.cm", parentCompany: "Orange Group", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Zambia", flag: "🇿🇲", code: "ZM",
    providers: [
      p({ name: "MTN MoMo Zambia", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.zm", parentCompany: "MTN Group", status: "active", transactions: { currency: "ZMW" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Zambia", color: "#ED1C24", shortName: "AM", domain: "airtel.com.zm", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "ZMW" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Zamtel Kwacha", color: "#006B3F", shortName: "ZK", domain: "zamtel.co.zm", status: "active", parentCompany: "Zamtel", transactions: { currency: "ZMW" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "SpreadIt (Zoona)", color: "#00B5E2", shortName: "SI", domain: "zoona.com", status: "active", transactions: { currency: "ZMW" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Mozambique", flag: "🇲🇿", code: "MZ",
    providers: [
      p({ name: "M-Pesa Mozambique (Vodacom)", color: "#E60000", shortName: "MP", domain: "vm.co.mz", parentCompany: "Vodacom", status: "active", transactions: { currency: "MZN" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Mozambique", color: "#ED1C24", shortName: "AM", domain: "airtel.co.mz", status: "active", transactions: { currency: "MZN" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "e-Mola (Movitel)", color: "#FF6600", shortName: "eM", domain: "movitel.co.mz", status: "active", parentCompany: "Viettel Group", transactions: { currency: "MZN" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Morocco", flag: "🇲🇦", code: "MA",
    providers: [
      p({ name: "CIH Pay", color: "#C8102E", shortName: "CH", domain: "cihbank.ma", status: "active", parentCompany: "CIH Bank", transactions: { currency: "MAD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Morocco", color: "#FF6600", shortName: "OM", domain: "orange.ma", status: "active", parentCompany: "Orange Group", transactions: { currency: "MAD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Inwi Money", color: "#6C3BF5", shortName: "IW", domain: "inwi.ma", status: "active", parentCompany: "Inwi", transactions: { currency: "MAD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "M Walletee (Maroc Telecom)", color: "#0072CE", shortName: "MW", domain: "iam.ma", status: "active", parentCompany: "Maroc Telecom", transactions: { currency: "MAD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Algeria", flag: "🇩🇿", code: "DZ",
    providers: [
      p({ name: "BaridiMob (Algérie Poste)", color: "#FFB800", textColor: "#000", shortName: "BM", domain: "poste.dz", status: "active", parentCompany: "Algérie Poste", transactions: { currency: "DZD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "EDAHABIA", color: "#006B3F", shortName: "ED", domain: "poste.dz", status: "active", parentCompany: "Algérie Poste", transactions: { currency: "DZD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Tunisia", flag: "🇹🇳", code: "TN",
    providers: [
      p({ name: "Sobflous (Orange)", color: "#FF6600", shortName: "SF", domain: "orange.tn", status: "active", parentCompany: "Orange Group", transactions: { currency: "TND" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TTMoney (Tunisie Telecom)", color: "#0072CE", shortName: "TT", domain: "tunisietelecom.tn", status: "active", transactions: { currency: "TND" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Ooredoo Money", color: "#ED1C24", shortName: "OO", domain: "ooredoo.tn", status: "active", parentCompany: "Ooredoo Group", transactions: { currency: "TND" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Mali", flag: "🇲🇱", code: "ML",
    providers: [
      p({ name: "Orange Money Mali", color: "#FF6600", shortName: "OM", domain: "orange.ml", parentCompany: "Orange Group", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Mali", color: "#0072CE", shortName: "MV", domain: "moov-africa.ml", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Wave Mali", color: "#1B2A4A", shortName: "WV", domain: "wave.com", parentCompany: "Wave Mobile Money", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Burkina Faso", flag: "🇧🇫", code: "BF",
    providers: [
      p({ name: "Orange Money Burkina Faso", color: "#FF6600", shortName: "OM", domain: "orange.bf", parentCompany: "Orange Group", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Burkina Faso", color: "#0072CE", shortName: "MV", domain: "moov-africa.bf", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Wave Burkina Faso", color: "#1B2A4A", shortName: "WV", domain: "wave.com", parentCompany: "Wave Mobile Money", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Burkina Faso", color: "#ED1C24", shortName: "AM", domain: "airtel.bf", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Niger", flag: "🇳🇪", code: "NE",
    providers: [
      p({ name: "Airtel Money Niger", color: "#ED1C24", shortName: "AM", domain: "airtel.ne", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Niger", color: "#FF6600", shortName: "OM", domain: "orange.ne", parentCompany: "Orange Group", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Niger", color: "#0072CE", shortName: "MV", domain: "moov-africa.ne", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Chad", flag: "🇹🇩", code: "TD",
    providers: [
      p({ name: "Airtel Money Chad", color: "#ED1C24", shortName: "AM", domain: "airtel.td", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Chad", color: "#0072CE", shortName: "MV", domain: "moov-africa.td", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Tigo Cash Chad", color: "#004B93", shortName: "TC", domain: "tigo.td", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Guinea (Conakry)", flag: "🇬🇳", code: "GN",
    providers: [
      p({ name: "Orange Money Guinea", color: "#FF6600", shortName: "OM", domain: "orange.gn", parentCompany: "Orange Group", status: "active", transactions: { currency: "GNF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "MTN MoMo Guinea", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com.gn", parentCompany: "MTN Group", status: "active", transactions: { currency: "GNF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Cellcom Money", color: "#0072CE", shortName: "CM", domain: "cellcom.gn", status: "active", transactions: { currency: "GNF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Guinea-Bissau", flag: "🇬🇼", code: "GW",
    providers: [
      p({ name: "Orange Money Guinea-Bissau", color: "#FF6600", shortName: "OM", domain: "orange.gw", parentCompany: "Orange Group", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Guinea-Bissau", color: "#0072CE", shortName: "MV", domain: "moov-africa.gw", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Sierra Leone", flag: "🇸🇱", code: "SL",
    providers: [
      p({ name: "Orange Money Sierra Leone", color: "#FF6600", shortName: "OM", domain: "orange.sl", parentCompany: "Orange Group", status: "active", transactions: { currency: "SLL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Africell Money", color: "#003366", shortName: "AC", domain: "africell.com", parentCompany: "Africell", status: "active", transactions: { currency: "SLL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Qmoney (Airtel)", color: "#ED1C24", shortName: "QM", domain: "airtel.sl", status: "active", transactions: { currency: "SLL" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Liberia", flag: "🇱🇷", code: "LR",
    providers: [
      p({ name: "Lonestar Cell MTN MoMo", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "lonestarcell.com", parentCompany: "MTN Group", status: "active", transactions: { currency: "LRD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Liberia", color: "#FF6600", shortName: "OM", domain: "orange.lr", parentCompany: "Orange Group", status: "active", transactions: { currency: "LRD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Gambia", flag: "🇬🇲", code: "GM",
    providers: [
      p({ name: "Africell Money Gambia", color: "#003366", shortName: "AC", domain: "africell.gm", parentCompany: "Africell", status: "active", transactions: { currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "QMoney (Gamcel)", color: "#006B3F", shortName: "QM", domain: "gamcel.gm", status: "active", transactions: { currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Wave Gambia", color: "#1B2A4A", shortName: "WV", domain: "wave.com", parentCompany: "Wave Mobile Money", status: "active", transactions: { currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Benin", flag: "🇧🇯", code: "BJ",
    providers: [
      p({ name: "MTN MoMo Benin", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.bj", parentCompany: "MTN Group", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Benin", color: "#0072CE", shortName: "MV", domain: "moov-africa.bj", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Togo", flag: "🇹🇬", code: "TG",
    providers: [
      p({ name: "Flooz (Moov Africa Togo)", color: "#0072CE", shortName: "FL", domain: "moov-africa.tg", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TMoney (Togocel)", color: "#006B3F", shortName: "TM", domain: "togocel.tg", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Togo Pesa", color: "#FF6600", shortName: "TP", status: "active", transactions: { currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Congo (Brazzaville)", flag: "🇨🇬", code: "CG",
    providers: [
      p({ name: "MTN MoMo Congo", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.cg", parentCompany: "MTN Group", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Congo", color: "#ED1C24", shortName: "AM", domain: "airtel.cg", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Congo", color: "#0072CE", shortName: "MV", domain: "moov-africa.cg", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "DR Congo", flag: "🇨🇩", code: "CD",
    providers: [
      p({ name: "M-Pesa DRC (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.cd", parentCompany: "Vodacom", status: "active", transactions: { currency: "CDF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money DRC", color: "#ED1C24", shortName: "AM", domain: "airtel.cd", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "CDF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money DRC", color: "#FF6600", shortName: "OM", domain: "orange.cd", parentCompany: "Orange Group", status: "active", transactions: { currency: "CDF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Africell Money DRC", color: "#003366", shortName: "AC", domain: "africell.cd", parentCompany: "Africell", status: "active", transactions: { currency: "CDF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Angola", flag: "🇦🇴", code: "AO",
    providers: [
      p({ name: "Unitel Money", color: "#FF6600", shortName: "UM", domain: "unitel.co.ao", status: "active", transactions: { currency: "AOA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Africell Money Angola", color: "#003366", shortName: "AC", domain: "africell.ao", parentCompany: "Africell", status: "active", transactions: { currency: "AOA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "AfriMoney (Movicel)", color: "#006B3F", shortName: "AF", domain: "movicel.co.ao", status: "active", transactions: { currency: "AOA" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Zimbabwe", flag: "🇿🇼", code: "ZW",
    providers: [
      p({
        name: "EcoCash (Econet)", color: "#006B3F", shortName: "EC", domain: "econet.co.zw",
        tagline: "Zimbabwe's leading mobile money platform",
        parentCompany: "Econet Wireless / Cassava Technologies",
        foundedYear: 2011,
        status: "active",
        website: "https://www.econet.co.zw/ecocash",
        coverage: {
          regions: ["Nationwide Zimbabwe"],
          platforms: ["USSD", "Android", "iOS", "Agent Network"],
          ussdCode: "*151#",
          languages: ["English", "Shona", "Ndebele"],
        },
        developer: {
          hasApi: true,
          webhookSupport: true,
          integrationPlatforms: ["Pawapay"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Savings"],
          currency: "ZWL / USD",
        },
        brand: { primaryColor: "#006B3F" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "OneMoney (NetOne)", color: "#0072CE", shortName: "OM", domain: "netone.co.zw", parentCompany: "NetOne", status: "active", transactions: { currency: "ZWL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Telecash (Telecel)", color: "#E60000", shortName: "TC", domain: "telecel.co.zw", parentCompany: "Telecel Zimbabwe", status: "active", transactions: { currency: "ZWL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "WIMPAY", color: "#1E3A5F", shortName: "WP", domain: "wimpay.co.zw", status: "active", transactions: { currency: "ZWL" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Botswana", flag: "🇧🇼", code: "BW",
    providers: [
      p({ name: "MyZaka (Mascom)", color: "#0072CE", shortName: "MZ", domain: "mascom.bw", status: "active", parentCompany: "Mascom Wireless", transactions: { currency: "BWP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Botswana", color: "#FF6600", shortName: "OM", domain: "orange.co.bw", parentCompany: "Orange Group", status: "active", transactions: { currency: "BWP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Smega (BTC)", color: "#003366", shortName: "SM", domain: "btc.bw", status: "active", transactions: { currency: "BWP" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Namibia", flag: "🇳🇦", code: "NA",
    providers: [
      p({ name: "MTC Money", color: "#FFCC00", textColor: "#000", shortName: "MC", domain: "mtc.com.na", status: "active", parentCompany: "MTC Namibia", transactions: { currency: "NAD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "EasyWallet (Bank Windhoek)", color: "#003366", shortName: "EW", domain: "bankwindhoek.com.na", status: "active", transactions: { currency: "NAD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Telecom Namibia e-Wallet", color: "#0072CE", shortName: "TN", domain: "telecom.na", status: "active", transactions: { currency: "NAD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Malawi", flag: "🇲🇼", code: "MW",
    providers: [
      p({ name: "Airtel Money Malawi", color: "#ED1C24", shortName: "AM", domain: "airtel.mw", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "MWK" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TNM Mpamba", color: "#0072CE", shortName: "TM", domain: "tnm.co.mw", status: "active", parentCompany: "TNM PLC", transactions: { currency: "MWK" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Lesotho", flag: "🇱🇸", code: "LS",
    providers: [
      p({ name: "M-Pesa Lesotho (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.co.ls", parentCompany: "Vodacom", status: "active", transactions: { currency: "LSL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Econet Lesotho eMoney", color: "#006B3F", shortName: "EL", domain: "econet.co.ls", status: "active", transactions: { currency: "LSL" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Eswatini", flag: "🇸🇿", code: "SZ",
    providers: [
      p({ name: "MTN MoMo Eswatini", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.sz", parentCompany: "MTN Group", status: "active", transactions: { currency: "SZL" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "E-Mali (Eswatini Mobile)", color: "#006B3F", shortName: "EM", domain: "swazimobile.co.sz", status: "active", transactions: { currency: "SZL" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Madagascar", flag: "🇲🇬", code: "MG",
    providers: [
      p({ name: "MVola (Telma)", color: "#FF6600", shortName: "MV", domain: "telma.mg", parentCompany: "Telma (Axian Group)", status: "active", transactions: { currency: "MGA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Madagascar", color: "#ED1C24", shortName: "AM", domain: "airtel.mg", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "MGA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Madagascar", color: "#FF6600", shortName: "OM", domain: "orange.mg", parentCompany: "Orange Group", status: "active", transactions: { currency: "MGA" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Mauritius", flag: "🇲🇺", code: "MU",
    providers: [
      p({ name: "MyT Money (Mauritius Telecom)", color: "#0072CE", shortName: "MT", domain: "mauritiustelecom.com", status: "active", transactions: { currency: "MUR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Juice (MCB Group)", color: "#FF4500", shortName: "JC", domain: "mcb.mu", parentCompany: "MCB Group", status: "active", transactions: { currency: "MUR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "MYT (Emtel Pay)", color: "#006B3F", shortName: "MY", domain: "emtel.com", status: "active", transactions: { currency: "MUR" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Réunion / Mayotte", flag: "🇷🇪", code: "RE",
    providers: [
      p({ name: "Orange Money (DOM-COM)", color: "#FF6600", shortName: "OM", domain: "orange.re", parentCompany: "Orange Group", status: "active", transactions: { currency: "EUR" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Ethiopia", flag: "🇪🇹", code: "ET",
    providers: [
      p({
        name: "Telebirr (Ethio Telecom)", color: "#006B3F", shortName: "TB", domain: "ethiotelecom.et",
        tagline: "Ethiopia's largest mobile money service",
        parentCompany: "Ethio Telecom (Government owned)",
        foundedYear: 2021,
        status: "active",
        website: "https://www.ethiotelecom.et/telebirr",
        coverage: {
          regions: ["Nationwide Ethiopia"],
          platforms: ["USSD", "Android", "iOS", "Agent Network"],
          ussdCode: "*127#",
          languages: ["Amharic", "English", "Oromo"],
        },
        developer: {
          hasApi: true,
          sandboxAvailable: true,
          webhookSupport: true,
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "International Remittance"],
          currency: "ETB",
        },
        brand: { primaryColor: "#006B3F" },
        meta: { lastVerified: "2025-12-01" },
      }),
      p({ name: "Amole (Dashen Bank)", color: "#0072CE", shortName: "AL", domain: "dashenbanksc.com", status: "active", parentCompany: "Dashen Bank", transactions: { currency: "ETB" }, meta: { lastVerified: "2025-12-01" } }),
      p({
        name: "CBEBirr", aliases: ["CBE Birr", "CBE-Birr"], color: "#0033a0", shortName: "CB", domain: "combanketh.et", status: "active",
        parentCompany: "Commercial Bank of Ethiopia", foundedYear: 2017,
        tagline: "Mobile Money service by Commercial Bank of Ethiopia",
        website: "https://combanketh.et/cbe-birr/",
        coverage: {
          regions: ["Ethiopia"],
          platforms: ["USSD", "Android", "Agent Network"],
          ussdCode: "*847#",
          languages: ["Amharic", "English"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://developer.commercialbankofethiopia.com",
          sandboxAvailable: true,
          webhookSupport: true,
          sdks: [{ name: "Appdiv.Payment.CBEBirr (C#)", url: "" }],
          integrationPlatforms: ["Kispay", "YenePay", "WeBirr", "Marketbirr"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"],
          currency: "ETB",
          feeStructure: "See official site",
          limits: { min: "ETB 1", max: "ETB 300,000", daily: "ETB 600,000" },
        },
        meta: {
          lastVerified: "2025-12-01",
          sources: [
            { label: "Official Site", url: "https://combanketh.et/cbe-birr/" },
            { label: "Reporter Ethiopia", url: "https://www.thereporterethiopia.com/35007/" },
          ],
        },
      }),
      p({ name: "HelloCash", color: "#FFB800", textColor: "#000", shortName: "HC", domain: "belcash.com", status: "active", parentCompany: "BelCash Technology Solutions", transactions: { currency: "ETB" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Somalia / South Sudan", flag: "🇸🇴", code: "SO",
    providers: [
      p({ name: "EVC Plus (Hormuud)", color: "#FF6600", shortName: "EV", domain: "hormuud.com", parentCompany: "Hormuud Telecom", status: "active", transactions: { currency: "SOS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Zaad (Telesom)", color: "#006B3F", shortName: "ZD", domain: "telesom.com", parentCompany: "Telesom", status: "active", transactions: { currency: "SOS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "E-Dahab (Golis)", color: "#FFB800", textColor: "#000", shortName: "ED", domain: "golistelecom.com", parentCompany: "Golis Telecom", status: "active", transactions: { currency: "SOS" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "DigiCash (South Sudan)", color: "#0072CE", shortName: "DC", status: "active", transactions: { currency: "SSP" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "MoMo (MTN South Sudan)", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com", parentCompany: "MTN Group", status: "active", transactions: { currency: "SSP" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Sudan", flag: "🇸🇩", code: "SD",
    providers: [
      p({ name: "MTN MoMo Sudan", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.sd", parentCompany: "MTN Group", status: "active", transactions: { currency: "SDG" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Zain Cash Sudan", color: "#6C3BF5", shortName: "ZC", domain: "zain.com", parentCompany: "Zain Group", status: "active", transactions: { currency: "SDG" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Djibouti", flag: "🇩🇯", code: "DJ",
    providers: [
      p({ name: "D-Money (Djibouti Telecom)", color: "#006B3F", shortName: "DM", domain: "djiboutitelecom.dj", status: "active", transactions: { currency: "DJF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Comoros", flag: "🇰🇲", code: "KM",
    providers: [
      p({ name: "Huri Money (Comores Telecom)", color: "#0072CE", shortName: "HM", domain: "comorestelecom.km", status: "active", transactions: { currency: "KMF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Cabo Verde", flag: "🇨🇻", code: "CV",
    providers: [
      p({ name: "MVola (CV Móvel)", color: "#FF6600", shortName: "MV", domain: "cvmovel.cv", status: "active", transactions: { currency: "CVE" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "São Tomé and Príncipe", flag: "🇸🇹", code: "ST",
    providers: [
      p({ name: "e-Kwanza (CST)", color: "#006B3F", shortName: "eK", domain: "cst.st", status: "active", transactions: { currency: "STN" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ",
    providers: [
      p({ name: "Orange Money Equatorial Guinea", color: "#FF6600", shortName: "OM", domain: "orange.gq", parentCompany: "Orange Group", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Gabon", flag: "🇬🇦", code: "GA",
    providers: [
      p({ name: "Airtel Money Gabon", color: "#ED1C24", shortName: "AM", domain: "airtel.ga", parentCompany: "Airtel Africa", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov Money Gabon", color: "#0072CE", shortName: "MV", domain: "moov-africa.ga", parentCompany: "Moov Africa", status: "active", transactions: { currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Mauritania", flag: "🇲🇷", code: "MR",
    providers: [
      p({ name: "Masrvi (Mauritel)", color: "#006B3F", shortName: "MS", domain: "mauritel.mr", status: "active", transactions: { currency: "MRU" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Mauritania", color: "#FF6600", shortName: "OM", domain: "orange.mr", parentCompany: "Orange Group", status: "active", transactions: { currency: "MRU" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Mattel Money", color: "#0072CE", shortName: "MM", domain: "mattel.mr", status: "active", transactions: { currency: "MRU" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "Libya", flag: "🇱🇾", code: "LY",
    providers: [
      p({ name: "Tadawul", color: "#003366", shortName: "TD", status: "active", transactions: { currency: "LYD" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  // ── Other Regions ──
  {
    name: "Myanmar", flag: "🇲🇲", code: "MM",
    providers: [
      p({ name: "Wave Money", color: "#FFD100", textColor: "#000", shortName: "WM", domain: "wavemoney.com.mm", status: "active", transactions: { currency: "MMK" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
  {
    name: "South Korea", flag: "🇰🇷", code: "KR",
    providers: [
      p({ name: "Zero Pay", color: "#FF3B30", shortName: "ZP", domain: "zeropay.or.kr", status: "active", transactions: { currency: "KRW" }, meta: { lastVerified: "2025-12-01" } }),
    ],
  },
];

// Helper to find a provider by slug
export function findProviderBySlug(slug: string): { provider: Provider; country: Country } | null {
  for (const country of countries) {
    const provider = country.providers.find((p) => p.slug === slug);
    if (provider) return { provider, country };
  }
  return null;
}

// Get all providers flat
export function getAllProviders(): { provider: Provider; country: Country }[] {
  return countries.flatMap((country) =>
    country.providers.map((provider) => ({ provider, country }))
  );
}
