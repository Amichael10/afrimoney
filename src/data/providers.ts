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
      p({ name: "9PSB (9mobile)", color: "#2E7D32", shortName: "9P", domain: "9psb.com.ng", tagline: "9mobile's payment service bank", status: "active", transactions: { currency: "NGN" }, meta: { lastVerified: "2025-12-01" } }),
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
      p({ name: "Airtel Money Kenya", color: "#ff6600", shortName: "AM", domain: "airtel.co.ke", tagline: "Airtel Money, Simply Everything", aliases: ["Airtel Money Kenya"], parentCompany: "Airtel Money Kenya Ltd", status: "active", website: "https://www.airtel.com/kenya/airtel-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*222#", languages: ["English", "Swahili"] }, developer: { hasApi: "unofficial", integrationPlatforms: ["ClickPesa", "dLocal (via Google Play)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], limits: { min: "KES 1", max: "KES 250,000", daily: "KES 250,000" }, currency: "KES" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.com/kenya/airtel-money/" }] } }),
      p({ name: "T-Kash (Telkom Kenya)", color: "#00a0d2", shortName: "TK", domain: "telkom.co.ke", tagline: "Mobile Money Service by Telkom Kenya", parentCompany: "Telkom Kenya", foundedYear: 2018, status: "active", website: "https://telkom.co.ke/t-kash/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*234#", languages: ["English", "Swahili"] }, developer: { hasApi: true, apiDocsUrl: "https://telkom.co.ke/t-kash/", sandboxAvailable: true, webhookSupport: true, sdks: [{ name: "TKash-API (PHP)", url: "https://github.com/3xplisit/TKash-API" }], integrationPlatforms: ["Miden Kenya"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], limits: { min: "KES 1", max: "KES 70,000", daily: "KES 200,000" }, currency: "KES" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://telkom.co.ke/t-kash/" }] } }),
      p({ name: "Equitel (Equity Bank)", color: "#005b96", shortName: "EQ", domain: "equitygroupholdings.com", tagline: "Mobility Meets Money", aliases: ["Equitel", "Equity Equitel", "Equity Mobile Money"], parentCompany: "Equity Bank Limited", foundedYear: 2014, status: "active", website: "https://www.equitybank.co.ke/", coverage: { platforms: ["USSD", "Android", "iOS", "Web", "Agent Network"], ussdCode: "*247#", languages: ["English", "Swahili"] }, developer: { hasApi: true, apiDocsUrl: "https://developer.equitybank.co.ke", sandboxAvailable: true, webhookSupport: true, sdks: [{ name: "Mobile Money Payments API (PHP)", url: "https://github.com/agweria/mobile-money" }], integrationPlatforms: ["Tuma Payments", "PesaPal", "M-Pesa (inter-operator)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], limits: { min: "KES 10", max: "KES 500,000", daily: "KES 500,000" }, currency: "KES" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.equitybank.co.ke/" }, { label: "Developer Portal", url: "https://developer.equitybank.co.ke" }] } }),
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
      p({ name: "AirtelTigo Money", color: "#000000", shortName: "AT", domain: "tigo.com.gh", tagline: "Easy, convenient and secure way of sending money, making payments and buying airtime", aliases: ["AirtelTigo Money", "ATMoney"], parentCompany: "AirtelTigo Ghana", foundedYear: 2017, status: "active", website: "https://www.tigo.com.gh/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*110#", languages: ["English"] }, developer: { integrationPlatforms: ["WorldRemit", "Remitly", "ACE Money Transfer"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], currency: "GHS" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.tigo.com.gh/" }] } }),
      p({ name: "Telecel Cash", color: "#e60013", shortName: "TC", domain: "telecel.com.gh", tagline: "Fast and secure mobile money service", aliases: ["Telecel Cash", "Telecel Cash Ghana"], parentCompany: "Telecel Ghana", status: "active", website: "https://www.telecel.com.gh/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*110#", languages: ["English"] }, developer: { integrationPlatforms: ["Cellulant (for Google Play payments)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "GHS" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.telecel.com.gh/" }] } }),
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
      p({ name: "Airtel Money Tanzania", color: "#00ccff", shortName: "AM", domain: "airtel.co.tz", tagline: "Everyday life made simple", aliases: ["Airtel Money", "Airtel Money Tanzania"], parentCompany: "Airtel Tanzania", status: "active", website: "https://www.airtel.co.tz/airtelmoney", coverage: { platforms: ["USSD", "Android", "iOS"], ussdCode: "*150#", languages: ["English", "Swahili"] }, developer: { hasApi: true, apiDocsUrl: "https://www.airtel.africa/mobile-money", integrationPlatforms: ["Remitly", "Xsolla", "I&M Bank Tanzania"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], limits: { min: "TZS 1", max: "TZS 5,000,000" }, currency: "TZS" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.co.tz/airtelmoney" }] } }),
      p({ name: "Tigo Pesa", color: "#0066ff", shortName: "TP", domain: "tigo.co.tz", tagline: "Mobile money service by Tigo Tanzania", parentCompany: "Tigo Tanzania", status: "active", website: "https://www.tigo.co.tz/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*150#", languages: ["English", "Swahili"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "TZS" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.tigo.co.tz/" }] } }),
      p({ name: "HaloPesa (Halotel)", color: "#000000", shortName: "HP", domain: "halopesa.co.tz", tagline: "Mobile money service that brings you the best mobile money experience", parentCompany: "Halotel Tanzania Limited", foundedYear: 2015, status: "active", website: "https://halopesa.co.tz", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["English", "Swahili"] }, developer: { integrationPlatforms: ["T-Pesa"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], currency: "TZS" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://halopesa.co.tz" }] } }),
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
      p({ name: "Airtel Money Uganda", color: "#00ccff", shortName: "AM", domain: "airtel.co.ug", tagline: "Mobile money service by Airtel Uganda", aliases: ["Airtel Money Uganda"], parentCompany: "Airtel Uganda Limited", status: "active", website: "https://www.airtel.com/ug/airtel-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*185#", languages: ["English"] }, developer: { hasApi: true, integrationPlatforms: ["Pawapay", "Flutterwave"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "UGX" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.com/ug/airtel-money/" }] } }),
    ],
  },
  {
    name: "Rwanda", flag: "🇷🇼", code: "RW",
    providers: [
      p({ name: "MTN MoMo Rwanda", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.rw", tagline: "MTN Rwanda's mobile money", parentCompany: "MTN Group", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*182#" }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com", sandboxAvailable: true, webhookSupport: true }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "RWF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Rwanda", color: "#00ccff", shortName: "AM", domain: "airtel.com.rw", tagline: "Mobile money service by Airtel Rwanda", aliases: ["Airtel Money Rwanda"], parentCompany: "Airtel Rwanda", status: "active", website: "https://www.airtel.com/rwanda/airtel-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*999#", languages: ["English", "Kinyarwanda"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "RWF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.com/rwanda/airtel-money/" }] } }),
    ],
  },
  {
    name: "Senegal", flag: "🇸🇳", code: "SN",
    providers: [
      p({ name: "Orange Money Senegal", color: "#FF6600", shortName: "OM", domain: "orange.sn", tagline: "Mobile money service by Orange Senegal", parentCompany: "Orange Senegal", status: "active", website: "https://www.orange.sn/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French", "English"] }, developer: { hasApi: true, apiDocsUrl: "https://developer.orange.com/", sandboxAvailable: true, webhookSupport: true, integrationPlatforms: ["Pawapay", "Chimoney"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.orange.sn/" }, { label: "Developer Portal", url: "https://developer.orange.com/" }] } }),
      p({ name: "Free Money", color: "#ff0000", shortName: "FM", domain: "free.sn", tagline: "La plateforme mobile money de Free Senegal", parentCompany: "Free Senegal", foundedYear: 2014, status: "active", website: "https://www.free.sn/free-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French", "English"] }, developer: { hasApi: true, apiDocsUrl: "https://www.comviva.com", integrationPlatforms: ["Comviva (mobiquity® Money platform)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.free.sn/free-money/" }] } }),
      p({
        name: "Wave Senegal", color: "#1B2A4A", shortName: "WV", domain: "wave.com",
        tagline: "Mobile money, reinvented. Deposit, withdraw, pay bills for free. Send for only 1%.",
        parentCompany: "Wave Mobile Money Group",
        foundedYear: 2017,
        status: "active",
        website: "https://www.wave.com",
        coverage: {
          regions: ["Nationwide Senegal"],
          platforms: ["Android", "iOS", "Agent Network"],
          languages: ["French", "English"],
        },
        developer: {
          hasApi: true,
          apiDocsUrl: "https://www.wave.com/en/business/",
          webhookSupport: true,
          integrationPlatforms: ["Pawapay", "Wave Business"],
        },
        transactions: {
          types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"],
          feeStructure: "1% flat fee on cash-out, free P2P",
          currency: "XOF",
        },
        brand: { primaryColor: "#1B2A4A" },
        meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.wave.com" }, { label: "Wave Business", url: "https://www.wave.com/en/business/" }] },
      }),
      p({ name: "Wari", color: "#009933", shortName: "WR", domain: "wari.com", tagline: "Digital financial services and mobile money platform in Senegal", parentCompany: "Wari", status: "active", website: "https://www.wari.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French", "English"] }, developer: { hasApi: true, apiDocsUrl: "https://www.wari.com" }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.wari.com/" }] } }),
      p({ name: "Wizall Money", color: "#0066cc", shortName: "WZ", domain: "wizall.money", tagline: "Le compte qui facilite la vie", parentCompany: "Banque Centrale Populaire group (BCP)", foundedYear: 2015, status: "active", website: "https://www.wizall.money/", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["French", "English"] }, developer: { hasApi: true, integrationPlatforms: ["WorldRemit"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.wizall.money/" }] } }),
      p({ name: "E-Money (Expresso)", color: "#009933", shortName: "EM", domain: "expresso.sn", tagline: "Un service de transfert et de paiement mobile accessible à tous", parentCompany: "Expresso (Sudatel Group)", foundedYear: 2018, status: "active", website: "https://www.expresso.sn/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "#444#", languages: ["French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.expresso.sn/" }] } }),
    ],
  },
  {
    name: "Côte d'Ivoire", flag: "🇨🇮", code: "CI",
    providers: [
      p({ name: "MTN MoMo Côte d'Ivoire", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.ci", tagline: "MTN's mobile money in Côte d'Ivoire", parentCompany: "MTN Group", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"] }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com" }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Orange Money Côte d'Ivoire", color: "#ff6600", shortName: "OM", domain: "orange.ci", tagline: "Mobile money service by Orange Côte d'Ivoire", parentCompany: "Orange Côte d'Ivoire", status: "active", website: "https://www.orange-ci.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"] }, developer: { hasApi: true, apiDocsUrl: "https://developer.orange.com/" }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.orange-ci.com/" }] } }),
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
      p({ name: "Moov Money Côte d'Ivoire", color: "#00b0f0", shortName: "MV", domain: "moov.ci", tagline: "Mobile money service by Moov Africa Côte d'Ivoire", parentCompany: "Moov Africa Côte d'Ivoire", status: "active", website: "https://www.moov.ci/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*126#", languages: ["French"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.moov.ci/" }] } }),
      p({ name: "YAS (MTN)", color: "#00cc00", shortName: "YAS", domain: "mtn.ci", tagline: "MTN Mobile Money service in Côte d'Ivoire", aliases: ["YAS MTN", "YAS Mobile Money", "MTN YAS Côte d'Ivoire"], parentCompany: "MTN Côte d'Ivoire", status: "active", website: "https://www.mtn.ci/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*126#", languages: ["French"] }, developer: { hasApi: true, apiDocsUrl: "https://www.mtn.com", integrationPlatforms: ["WorldRemit"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.mtn.ci/" }] } }),
    ],
  },
  {
    name: "South Africa", flag: "🇿🇦", code: "ZA",
    providers: [
      p({ name: "MTN MoMo South Africa", color: "#00cc00", textColor: "#fff", shortName: "MTN", domain: "mtn.co.za", tagline: "The future of banking", parentCompany: "MTN South Africa", status: "active", website: "https://www.mtn.co.za/home/momo/", coverage: { regions: ["South Africa"], platforms: ["Android", "iOS", "USSD", "Agent Network"], languages: ["English"] }, developer: { hasApi: true, apiDocsUrl: "https://momo.mtn.com/home-page/", integrationPlatforms: ["MFS Africa", "Saana Capital LLC", "African Bank"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "ZAR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.mtn.co.za/home/momo/" }] } }),
      p({ name: "Vodacom M-Pesa", color: "#E60000", shortName: "VP", domain: "vodacom.co.za", status: "inactive", parentCompany: "Vodacom (Vodafone Group)", transactions: { currency: "ZAR" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Capitec Pay", color: "#0066cc", shortName: "CP", domain: "capitecbank.co.za", tagline: "Instant, card-free payments from Capitec accounts", parentCompany: "Capitec Bank", status: "active", website: "https://www.capitecbank.co.za/personal/transact/app-payments/", coverage: { regions: ["South Africa"], platforms: ["Android", "iOS", "Web"], languages: ["English"] }, developer: { hasApi: true, apiDocsUrl: "https://docs.ebanx.com/docs/payments/guides/accept-payments/api/south-africa/capitec-pay", integrationPlatforms: ["Netcash", "Payfast", "Pay@", "Ozow", "EBANX Direct API"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments"], currency: "ZAR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.capitecbank.co.za/personal/transact/app-payments/" }] } }),
      p({ name: "TymeBank", color: "#000000", textColor: "#fff", shortName: "TB", domain: "tymebank.co.za", tagline: "Take Your Money Everywhere", parentCompany: "TymeBank Limited", foundedYear: 2015, status: "active", website: "https://www.tymebank.com/", coverage: { regions: ["South Africa"], platforms: ["Android", "iOS", "Web", "Agent Network"], ussdCode: "*120*543#", languages: ["English"] }, developer: { integrationPlatforms: ["PayShap instant payments", "Boxer and Pick n Pay till-point network"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], currency: "ZAR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.tymebank.com/" }] } }),
      p({ name: "1voucher", color: "#0066cc", shortName: "1V", domain: "1voucher.co.za", tagline: "Your Cash. Your Way.", parentCompany: "Flash Group", status: "active", website: "https://www.1voucher.co.za", coverage: { regions: ["South Africa"], platforms: ["Android", "Web"], languages: ["English"] }, developer: { integrationPlatforms: ["Ecentric"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up"], limits: { min: "ZAR 2", max: "ZAR 2,500" }, currency: "ZAR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.1voucher.co.za" }] } }),
      p({ name: "WIZZIT", color: "#000000", shortName: "WZ", domain: "bankzero.co.za", tagline: "Banking without the bank", parentCompany: "Bank Zero", foundedYear: 2004, status: "acquired", website: "https://www.bankzero.co.za/", coverage: { regions: ["South Africa"], platforms: ["Android", "iOS", "Web"], languages: ["English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "ZAR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Bank Zero", url: "https://www.bankzero.co.za/" }] } }),
    ],
  },
  {
    name: "Egypt", flag: "🇪🇬", code: "EG",
    providers: [
      p({ name: "Vodafone Cash", color: "#ee0000", shortName: "VC", domain: "vodafone.com.eg", tagline: "Digital wallet and mobile money service by Vodafone Egypt", parentCompany: "Vodafone Egypt", status: "active", website: "https://www.vodafone.com.eg/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*900#", languages: ["Arabic", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.vodafone.com.eg/" }] } }),
      p({ name: "Etisalat Cash (e& money)", color: "#0099cc", shortName: "EC", domain: "eandegypt.com", tagline: "Mobile money and digital wallet service by e& Egypt", aliases: ["Etisalat Cash", "e& money Egypt"], parentCompany: "e& Egypt (Etisalat Misr)", status: "active", website: "https://www.eandegypt.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*999#", languages: ["Arabic", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.eandegypt.com/" }] } }),
      p({ name: "Orange Money Egypt", color: "#ff6600", shortName: "OM", domain: "orange.eg", tagline: "Mobile money wallet by Orange Egypt", parentCompany: "Orange Egypt", status: "active", website: "https://www.orange.eg/en/services/orange-financial-services", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "#7115#", languages: ["Arabic", "English"] }, developer: { integrationPlatforms: ["Fawry", "Meeza"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.orange.eg/en/services/orange-financial-services" }] } }),
      p({ name: "Fawry", color: "#0033a0", shortName: "FW", domain: "fawry.com", tagline: "Egypt's leading digital payments infrastructure platform", parentCompany: "Fawry Technology", foundedYear: 2008, status: "active", website: "https://www.fawry.com/", coverage: { platforms: ["Android", "iOS", "Web", "Agent Network"], languages: ["Arabic", "English"] }, developer: { hasApi: true, apiDocsUrl: "https://www.fawry.com/developers", sandboxAvailable: true, webhookSupport: true }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.fawry.com/" }, { label: "Developer Portal", url: "https://www.fawry.com/developers" }] } }),
      p({ name: "WE Pay (Telecom Egypt)", color: "#009933", shortName: "WP", domain: "telecom.com.eg", tagline: "Digital wallet and mobile money service by Telecom Egypt", parentCompany: "Telecom Egypt", status: "active", website: "https://www.telecom.com.eg/", coverage: { platforms: ["USSD", "Android", "iOS", "Web", "Agent Network"], ussdCode: "*888#", languages: ["Arabic", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.telecom.com.eg/" }] } }),
      p({ name: "InstaPay", color: "#0066cc", shortName: "IP", domain: "instapay.com.eg", tagline: "Digital payment gateway and mobile money service in Egypt", parentCompany: "InstaPay", status: "active", website: "https://www.instapay.com.eg/", coverage: { platforms: ["Web", "Android", "iOS", "Agent Network"], languages: ["Arabic", "English"] }, developer: { hasApi: true, apiDocsUrl: "https://www.instapay.com.eg/developers", sandboxAvailable: true, webhookSupport: true }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up"], currency: "EGP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.instapay.com.eg/" }] } }),
    ],
  },
  {
    name: "Cameroon", flag: "🇨🇲", code: "CM",
    providers: [
      p({ name: "MTN MoMo Cameroon", color: "#00cc00", shortName: "MTN", domain: "mtn.cm", tagline: "Secure and reliable mobile money services in Cameroon", aliases: ["MTN MoMo CAMEROON", "MTN Mobile Money Cameroon", "MoMo from MTN CM"], parentCompany: "Mobile Money Corporation (MTN Cameroon)", status: "active", website: "https://momo.mtn.com/personal/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*126#", languages: ["English", "French"] }, developer: { hasApi: true, apiDocsUrl: "https://momo.mtn.com/", integrationPlatforms: ["MFS Africa", "Access Bank Cameroon", "Mastercard (virtual MoMo prepaid card)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "XAF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://momo.mtn.com/personal/" }] } }),
      p({ name: "Orange Money Cameroon", color: "#ff6600", shortName: "OM", domain: "orange.cm", tagline: "Electronic wallet for simple and secure financial transactions", aliases: ["Orange Money Cameroun", "Orange Money CM"], parentCompany: "Orange Cameroon", foundedYear: 2019, status: "active", website: "https://orangemoney.orange.cm/en", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*150#", languages: ["English", "French"] }, developer: { integrationPlatforms: ["Remitly", "Max it (Orange Cameroon finance app)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], currency: "XAF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://orangemoney.orange.cm/en" }] } }),
    ],
  },
  {
    name: "Zambia", flag: "🇿🇲", code: "ZM",
    providers: [
      p({ name: "MTN MoMo Zambia", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.zm", parentCompany: "MTN Zambia", status: "active", tagline: "Mobile Money", coverage: { regions: ["Zambia"], platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*303#", languages: ["en"] }, developer: { hasApi: true, apiDocsUrl: "https://momodevelopercommunity.mtn.com", sandboxAvailable: true, webhookSupport: true, sdks: [{ name: "mtnmomoapi (Python)", url: "https://github.com/sikaili99/mtnmomoapi" }], integrationPlatforms: ["JUMO", "Kwanisa Na MoMo"] }, transactions: { currency: "ZMW", types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], limits: { min: "ZMW 5", max: "ZMW 300,000", daily: "ZMW 300,000" }, feeStructure: "https://canyouempower.com/mtn-mobile-money-charges-in-zambia/" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "MTN Zambia", url: "https://www.mtn.zm" }, { label: "Fee Structure", url: "https://canyouempower.com/mtn-mobile-money-charges-in-zambia/" }, { label: "MoMo Developer Community", url: "https://momodevelopercommunity.mtn.com" }] } }),
      p({ name: "Airtel Money Zambia", color: "#00ccff", shortName: "AM", domain: "airtel.com.zm", tagline: "Mobile money service by Airtel Zambia", parentCompany: "Airtel Zambia", status: "active", website: "https://www.airtel.com/zm/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*150#", languages: ["English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "ZMW" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.com/zm/" }] } }),
      p({ name: "Zamtel Kwacha", color: "#003399", shortName: "ZK", domain: "zamtel.com.zm", tagline: "Convenient mobile money service by Zamtel", parentCompany: "Zamtel", status: "active", website: "https://www.zamtel.com.zm/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*115#", languages: ["English"] }, developer: { integrationPlatforms: ["Chipper Cash", "Noveba", "Lendsqr"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "ZMW" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.zamtel.com.zm/" }] } }),
      p({ name: "SpreadIt (Zoona)", color: "#0066cc", shortName: "SI", domain: "zoona.com", tagline: "Mobile money and financial services platform for underserved communities in Zambia", parentCompany: "Zoona (formerly Mobile Transactions International)", status: "active", website: "https://www.zoona.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["English"] }, developer: { integrationPlatforms: ["Lendsqr"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "ZMW" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.zoona.com/" }] } }),
    ],
  },
  {
    name: "Mozambique", flag: "🇲🇿", code: "MZ",
    providers: [
      p({ name: "M-Pesa Mozambique (Vodacom)", color: "#0099cc", shortName: "MP", domain: "vodacom.co.mz", tagline: "M-Pesa mobile money service by Vodacom in Mozambique", parentCompany: "Vodacom Mozambique", status: "active", website: "https://www.vodacom.co.mz/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["Portuguese", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MZN" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.vodacom.co.mz/" }] } }),
      p({ name: "Airtel Money Mozambique", color: "#00ccff", shortName: "AM", domain: "airtel.africa", tagline: "Mobile money service by Airtel in Mozambique", parentCompany: "Airtel Mozambique", status: "active", website: "https://www.airtel.africa/mobile-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*115#", languages: ["Portuguese", "English"] }, developer: { integrationPlatforms: ["WorldRemit"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MZN" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.airtel.africa/mobile-money/" }] } }),
      p({ name: "e-Mola (Movitel)", color: "#009933", shortName: "eM", domain: "movitel.co.mz", tagline: "Movitel's mobile wallet service", parentCompany: "Movitel, SA", status: "active", website: "https://www.movitel.co.mz/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*898#", languages: ["Portuguese"] }, developer: { integrationPlatforms: ["Moza Banco (interoperability)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MZN" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.movitel.co.mz/" }] } }),
    ],
  },
  {
    name: "Morocco", flag: "🇲🇦", code: "MA",
    providers: [
      p({ name: "CIH Pay", color: "#0066cc", shortName: "CH", domain: "cihpay.ma", tagline: "Innovative mobile payment solution by CIH Bank", parentCompany: "CIH Bank", foundedYear: 2022, status: "active", website: "https://cihpay.ma", coverage: { regions: ["Morocco"], platforms: ["Android", "iOS", "Web"], languages: ["Arabic", "French", "English"] }, developer: { integrationPlatforms: ["Mastercard", "Dejamobile"] }, transactions: { types: ["P2P", "Merchant Payments", "Airtime Top-up"], limits: { max: "MAD 6,000" }, currency: "MAD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://cihpay.ma" }] } }),
      p({ name: "Orange Money Morocco", color: "#ff6600", shortName: "OM", domain: "orange.ma", tagline: "Mobile money wallet by Orange Maroc", parentCompany: "Orange Maroc", status: "active", website: "https://www.orange-money.ma", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MAD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.orange-money.ma" }] } }),
      p({ name: "Inwi Money", color: "#009933", shortName: "IW", domain: "inwi.ma", tagline: "Mobile money wallet by Inwi", parentCompany: "Inwi", status: "active", website: "https://www.inwi.ma", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MAD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.inwi.ma" }] } }),
      p({ name: "M Walletee (Maroc Telecom)", color: "#e60012", shortName: "MW", domain: "iam.ma", tagline: "Mobile money and digital wallet service by Maroc Telecom", parentCompany: "Maroc Telecom", status: "active", website: "https://www.iam.ma", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MAD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.iam.ma" }] } }),
    ],
  },
  {
    name: "Algeria", flag: "🇩🇿", code: "DZ",
    providers: [
      p({ name: "BaridiMob (Algérie Poste)", color: "#003366", shortName: "BM", domain: "poste.dz", tagline: "Mobile banking and financial services app by Algérie Poste", parentCompany: "Algérie Poste", status: "active", website: "https://www.poste.dz/", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["Arabic", "French"] }, developer: { integrationPlatforms: ["Edahabia cardholders", "Algérie Télécom", "SEAAL", "ADE"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "DZD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.poste.dz/" }] } }),
      p({ name: "EDAHABIA", color: "#ffc107", textColor: "#000", shortName: "ED", domain: "edahabia.com.dz", tagline: "Prepaid card and e-money service by Algérie Poste", parentCompany: "Algérie Poste", status: "active", website: "https://www.edahabia.com.dz/", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["Arabic", "French"] }, developer: { integrationPlatforms: ["BaridiMob and BaridiWeb"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "DZD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.edahabia.com.dz/" }] } }),
      p({ name: "TTMoney (Tunisie Telecom)", color: "#009933", shortName: "TT2", domain: "tunisietelecom.tn", tagline: "Mobile money and digital wallet service by Tunisie Telecom", parentCompany: "Tunisie Telecom", status: "active", website: "https://www.tunisietelecom.tn/", coverage: { platforms: ["Android", "iOS", "Web", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "DZD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.tunisietelecom.tn/" }] } }),
    ],
  },
  {
    name: "Tunisia", flag: "🇹🇳", code: "TN",
    providers: [
      p({ name: "Sobflous (Orange)", color: "#f39c12", shortName: "SF", domain: "sobflous.tn", tagline: "Mobile virtual wallet and online payment platform in Tunisia", aliases: ["Sobflous", "Sobflous Tunisia", "Sobflous Orange Tunisia"], parentCompany: "HAMTEL (Sobflous Technologies)", status: "active", website: "https://www.sobflous.tn", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["Arabic", "French", "English"] }, developer: { integrationPlatforms: ["e-Dinar", "Mobile operators including Orange Tunisia"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "TND" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.sobflous.tn" }] } }),
      p({ name: "TTMoney (Tunisie Telecom)", color: "#009933", shortName: "TT", domain: "tunisietelecom.tn", tagline: "Mobile money and digital wallet service by Tunisie Telecom", parentCompany: "Tunisie Telecom", status: "active", website: "https://www.tunisietelecom.tn/", coverage: { platforms: ["Android", "iOS", "Web", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "French", "English"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "TND" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Official Site", url: "https://www.tunisietelecom.tn/" }] } }),
      p({ name: "Ooredoo Money", color: "#000080", shortName: "OO", domain: "ooredoo.tn", tagline: "Digital wallet and mobile money service by Ooredoo Fintech", aliases: ["Ooredoo Money Tunisia", "walletii by Ooredoo Tunisia"], parentCompany: "Ooredoo Group (via Ooredoo Fintech / OFTI)", status: "active", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["Arabic", "French", "English"] }, developer: { integrationPlatforms: ["QNB Group", "Monétique Tunisie", "Western Union"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "TND" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "Ooredoo", url: "https://www.ooredoo.com" }] } }),
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
      p({ name: "QMoney (Gamcel)", color: "#6A1B9A", shortName: "QM", domain: "gamcel.gm", status: "active", transactions: { currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
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
