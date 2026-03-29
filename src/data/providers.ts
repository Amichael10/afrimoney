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
      p({ name: "Orange Money Mali", color: "#888888", shortName: "OMM", domain: "orange-mali.com", tagline: "Mobile money service by Orange Mali", aliases: ["Orange Money Mali", "Orange Money Western Africa - Mali"], parentCompany: "Orange Mali", status: "active", website: "https://www.orange-mali.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Mali"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange-mali.com", url: "https://www.orange-mali.com/" }] } }),
      p({ name: "Moov Money Mali", color: "#888888", shortName: "MMM", aliases: ["Moov Money Mali", "Moov Money Western Africa - Mali"], parentCompany: "Moov Africa Mali", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], languages: ["French"], regions: ["Mali"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Wave Mali", color: "#888888", shortName: "WM", domain: "wavelabs.co", tagline: "Mobile money service enabling fast and affordable money transfers in Mali", aliases: ["Wave Mali", "Wave Mobile Money Mali"], parentCompany: "Wave Mobile Money", foundedYear: 2018, status: "active", website: "https://wavelabs.co/", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Mali"] }, transactions: { types: ["P2P", "Merchant Payments", "International Remittance", "Airtime Top-up"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "wavelabs.co", url: "https://wavelabs.co/" }, { label: "en.wikipedia.org", url: "https://en.wikipedia.org/wiki/Wave_Mobile_Money" }] } })
    ],
  },
  {
    name: "Burkina Faso", flag: "🇧🇫", code: "BF",
    providers: [
      p({ name: "Orange Money Burkina Faso", color: "#888888", shortName: "OMB", domain: "orange.bf", tagline: "Mobile money service by Orange Burkina Faso", aliases: ["Orange Money Burkina Faso", "Orange Money West Africa - Burkina Faso"], parentCompany: "Orange Burkina Faso", status: "active", website: "https://www.orange.bf/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Burkina Faso"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.bf", url: "https://www.orange.bf/" }] } }),
      p({ name: "Moov Money Burkina Faso", color: "#888888", shortName: "MMB", domain: "moov.com", tagline: "Mobile money service by Moov Africa Burkina Faso", aliases: ["Moov Money Burkina Faso", "Moov Money Western Africa - Burkina Faso"], parentCompany: "Moov Africa Burkina Faso", status: "active", website: "https://www.moov.com/afriqueburkina/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Burkina Faso"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "moov.com", url: "https://www.moov.com/afriqueburkina/" }] } }),
      p({ name: "Wave Burkina Faso", color: "#888888", shortName: "WBF", domain: "wave.com", tagline: "The most affordable mobile money network in Burkina Faso", aliases: ["Wave Money Burkina Faso", "Wave Mobile Money Burkina Faso"], parentCompany: "Wave Mobile Money Group", status: "active", website: "https://www.wave.com/en/", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Burkina Faso"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "XOF", feeStructure: "Send money for 1%; deposits and withdrawals free at agents; bill payments without fees where indicated", limits: { min: "1" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "wave.com", url: "https://www.wave.com/en/" }, { label: "apps.apple.com", url: "https://apps.apple.com/us/app/wave-mobile-money/id1523884528" }, { label: "play.google.com", url: "https://play.google.com/store/apps/details/Wave_Mobile_Money?id=com.wave.personal&hl=ln" }] } }),
      p({ name: "Airtel Money Burkina Faso", color: "#888888", shortName: "AMB", domain: "airtel.bf", tagline: "Mobile money service by Airtel Burkina Faso", aliases: ["Airtel Money Burkina Faso", "Airtel Money West Africa - Burkina Faso"], parentCompany: "Airtel Burkina Faso", status: "active", website: "https://www.airtel.bf/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*555#", languages: ["French"], regions: ["Burkina Faso"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.bf", url: "https://www.airtel.bf/" }] } })
    ],
  },
  {
    name: "Niger", flag: "🇳🇪", code: "NE",
    providers: [
      p({ name: "Airtel Money Niger", color: "#888888", shortName: "AMN", domain: "airtel.africa", tagline: "Mobile money service by Airtel Niger", aliases: ["Airtel Money Niger", "Airtel Money West Africa - Niger"], parentCompany: "Airtel Niger", status: "active", website: "https://www.airtel.africa/niger/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*555#", languages: ["French"], regions: ["Niger"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.africa", url: "https://www.airtel.africa/niger/" }] } }),
      p({ name: "Orange Money Niger", color: "#888888", shortName: "OMN", domain: "orange.ni", tagline: "Mobile money service by Orange Niger", aliases: ["Orange Money Niger", "Orange Money West Africa - Niger"], parentCompany: "Orange Niger", status: "active", website: "https://www.orange.ni/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Niger"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.ni", url: "https://www.orange.ni/" }] } }),
      p({ name: "Moov Money Niger", color: "#888888", shortName: "MMN", domain: "moov.com", tagline: "Mobile money service by Moov Africa Niger", aliases: ["Moov Money Niger", "Moov Money West Africa - Niger"], parentCompany: "Moov Africa Niger", status: "active", website: "https://www.moov.com/afriqueniger/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Niger"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "moov.com", url: "https://www.moov.com/afriqueniger/" }] } })
    ],
  },
  {
    name: "Chad", flag: "🇹🇩", code: "TD",
    providers: [
      p({ name: "Moov Money Chad", color: "#888888", shortName: "MMC", domain: "moov.com", tagline: "Mobile money service by Moov Africa Chad", aliases: ["Moov Money Chad", "Moov Money Africa Chad"], parentCompany: "Moov Africa Chad", status: "active", website: "https://www.moov.com/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Chad"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XAF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "moov.com", url: "https://www.moov.com/" }] } }),
      p({ name: "Airtel Money Chad", color: "#888888", shortName: "AMC", domain: "airtel.td", tagline: "Mobile money service by Airtel Chad", aliases: ["Airtel Money Chad", "Airtel Money Tchad"], parentCompany: "Airtel Chad", status: "active", website: "https://www.airtel.td/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*436#", languages: ["French"], regions: ["Chad"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XAF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.td", url: "https://www.airtel.td/" }, { label: "airtel.africa", url: "https://www.airtel.africa" }, { label: "bizcommunity.com", url: "https://www.bizcommunity.com/Article/43/78/77110.html" }] } }),
      p({ name: "Tigo Cash Chad", color: "#888888", shortName: "TCC", domain: "millicom.com", tagline: "Mobile money service formerly offered by Tigo Chad", aliases: ["Tigo Cash Tchad", "Tigo Cash Mobile Money Chad"], parentCompany: "Tigo Chad (now Moov Africa Chad)", foundedYear: 2012, status: "inactive", website: "https://www.millicom.com/", coverage: { platforms: ["USSD", "Agent Network"], ussdCode: "*888#", languages: ["French"], regions: ["Chad"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XAF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "agenceecofin.com", url: "https://www.agenceecofin.com/mobile/1001-8375-tchad-orabank-et-tigo-lance-tigo-cash" }, { label: "gsma.com", url: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/programme/connected-women/blending-tradition-with-digital-finance-innovation-a-mobile-group-savings-product-in-chad-part-1" }, { label: "trade.gov", url: "https://www.trade.gov/country-commercial-guides/chad-ecommerce" }] } })
    ],
  },
  {
    name: "Guinea (Conakry)", flag: "🇬🇳", code: "GN",
    providers: [
      p({ name: "Orange Money Guinea", color: "#888888", shortName: "OMG", domain: "orange.com.gn", tagline: "Mobile money service by Orange Guinea", aliases: ["Orange Money Conakry", "Orange Money Guinea Conakry"], parentCompany: "Orange Guinea (Orange Guinée)", status: "active", website: "https://www.orange.com.gn/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Guinea"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "GNF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.com.gn", url: "https://www.orange.com.gn/" }] } }),
      p({ name: "MTN MoMo", color: "#888888", shortName: "MM", domain: "mtn.com.gn", tagline: "Mobile money service by MTN Guinea", aliases: ["MTN MoMo Guinea", "MTN Mobile Money Guinea"], parentCompany: "MTN Guinea", status: "active", website: "https://www.mtn.com.gn/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Guinea"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "GNF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mtn.com.gn", url: "https://www.mtn.com.gn/" }] } })
    ],
  },
  {
    name: "Guinea-Bissau", flag: "🇬🇼", code: "GW",
    providers: [
      p({ name: "Orange Money Guinea-Bissau", color: "#888888", shortName: "OMG", domain: "orange.com.gw", tagline: "Mobile money service by Orange Guinea-Bissau", aliases: ["Orange Money Guinea-Bissau", "Orange Money Guiné-Bissau"], parentCompany: "Orange Guinea-Bissau", status: "active", website: "https://www.orange.com.gw/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["Portuguese"], regions: ["Guinea-Bissau"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.com.gw", url: "https://www.orange.com.gw/" }] } }),
      p({ name: "Moov Money Guinea-Bissau", color: "#888888", shortName: "MMG", domain: "moovmoney.ga", tagline: "Mobile money service by Moov Africa in Guinea-Bissau", aliases: ["Moov Money Guiné-Bissau", "Moov Money Bissau-Guinea"], parentCompany: "Moov Africa Guinea-Bissau", status: "active", website: "https://moovmoney.ga/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*855#", languages: ["Portuguese"], regions: ["Guinea-Bissau"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "moovmoney.ga", url: "https://moovmoney.ga/" }, { label: "moovmoney.ga", url: "https://moovmoney.ga/client/" }, { label: "biic-bank.com", url: "https://www.biic-bank.com/en/news/biic-and-moov-money-join-forces-to-promote-financial-inclusion-with-the-launch-of-a-new-service" }] } })
    ],
  },
  {
    name: "Sierra Leone", flag: "🇸🇱", code: "SL",
    providers: [
      p({ name: "Orange Money Sierra Leone", color: "#888888", shortName: "OMS", domain: "orange.sl", tagline: "Mobile money service by Orange Sierra Leone", aliases: ["Orange Money SL", "Orange Money Sierra Leone"], parentCompany: "Orange Sierra Leone", status: "active", website: "https://www.orange.sl/en/orange-money.html", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["English"], regions: ["Sierra Leone"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "SLL" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.sl", url: "https://www.orange.sl/en/orange-money.html" }, { label: "orange.sl", url: "https://www.orange.sl/en/orange-money-presentation.html" }, { label: "africaoutlookmag.com", url: "https://www.africaoutlookmag.com/technology/telecoms/orange-mobile-finance-sierra-leone-redefining-sierra-leones-financial-future" }] } }),
      p({ name: "Africell Money", color: "#888888", shortName: "AM", domain: "africell.sl", tagline: "Mobile money service by Africell in Sierra Leone", aliases: ["Africell Money Sierra Leone", "Afrimoney Sierra Leone"], parentCompany: "Africell Sierra Leone", status: "active", website: "https://www.africell.sl/afrimoney/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*161#", languages: ["English"], regions: ["Sierra Leone"] }, developer: { integrationPlatforms: ["MFS Africa hub (MoneyGram, WorldRemit, Xoom, etc)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SLL", limits: { max: "15000000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "africell.sl", url: "https://www.africell.sl/afrimoney/" }, { label: "africell.sl", url: "https://www.africell.sl/afrimoney_services/my-account/" }, { label: "africell.com", url: "https://www.africell.com/market/sierra-leone/" }] } }),
      p({ name: "QMoney (Airtel)", color: "#888888", shortName: "QM", domain: "qmoney.sl", tagline: "Mobile money service by QCell (Airtel) in Sierra Leone", aliases: ["QMoney Sierra Leone", "QM Salone", "QMoney Airtel Sierra Leone"], parentCompany: "QCell Sierra Leone Limited (Airtel Sierra Leone)", status: "active", website: "https://qmoney.sl/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*323#", languages: ["English"], regions: ["Sierra Leone"] }, developer: { integrationPlatforms: ["Utility billers and merchants integrated via QMoney", "Cross‑border transfers to The Gambia via QMoney platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SLL", limits: { min: "10" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "qmoney.sl", url: "https://qmoney.sl/" }, { label: "qmoney.sl", url: "https://qmoney.sl/help-page/" }, { label: "qmoney.sl", url: "https://qmoney.sl/services/" }] } })
    ],
  },
  {
    name: "Liberia", flag: "🇱🇷", code: "LR",
    providers: [
      p({ name: "Lonestar Cell MTN MoMo", color: "#888888", shortName: "LCM", domain: "lonestarcell.com", tagline: "Mobile money service by Lonestar Cell MTN in Liberia", aliases: ["MTN MoMo Liberia", "Lonestar Cell MTN Mobile Money", "MoMo Liberia"], parentCompany: "Lonestar Cell MTN", foundedYear: 2011, status: "active", website: "https://lonestarcell.com/momo/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*156#", languages: ["English"], regions: ["Liberia"] }, developer: { hasApi: true, apiDocsUrl: "https://momoapi.mtn.com", sandboxAvailable: true, webhookSupport: true, sdks: [{ name: "MTN MoMo SDK", url: "" }, { name: "MTN MoMo SDK", url: "" }], integrationPlatforms: ["International remittances via MTN MoMo API", "Utility bill payments integrated through MoMo", "Merchants and e‑commerce platforms accepting MTN MoMo payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "LRD", limits: { min: "1" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "lonestarcell.com", url: "https://lonestarcell.com/momo/" }, { label: "lonestarcell.com", url: "https://lonestarcell.com" }] } }),
      p({ name: "Orange Money", color: "#888888", shortName: "OM", domain: "orange.com.lr", tagline: "Mobile money service by Orange Liberia that enables secure financial transactions from your mobile phone", aliases: ["Orange Money Liberia", "Orange Money Liberia (Orange Liberia)"], parentCompany: "Orange Liberia", status: "active", website: "https://www.orange.com.lr/en/orange-money.html", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["English"], regions: ["Liberia"] }, developer: { integrationPlatforms: ["Liberia Revenue Authority (LRA) for tax and fee payments", "UBA Liberia for bank‑to‑wallet and wallet‑to‑bank transfers", "Various merchants and billers accepting Orange Money payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "LRD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.com.lr", url: "https://www.orange.com.lr/en/orange-money.html" }, { label: "wearetech.africa", url: "https://www.wearetech.africa/en/fils-uk/news/public-management/liberia-rolls-out-ussd-tax-payments-in-partnership-with-orange-and-ecobank" }, { label: "inquirernewspaper.com", url: "https://inquirernewspaper.com/orange-money-revolutionizes-liberias-financial-access/" }] } })
    ],
  },
  {
    name: "Gambia", flag: "🇬🇲", code: "GM",
    providers: [
      p({ name: "Africell Money", color: "#888888", shortName: "AM", tagline: "Mobile money service by Africell in The Gambia", aliases: ["Africell Money Gambia", "Africell Mobile Money Gambia"], parentCompany: "Africell Gambia", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], languages: ["English"], regions: ["Gambia"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "QMoney (Gamcel)", color: "#888888", shortName: "QM", tagline: "Mobile money service by Gamcel in The Gambia", aliases: ["QMoney Gambia", "QMoney Gamcel", "QMoney Mobile Money Gambia"], parentCompany: "Gamcel", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], languages: ["English"], regions: ["Gambia"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "GMD" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "WAVE (Gamcel)", color: "#888888", shortName: "WA", tagline: "Mobile money service by Gamcel in The Gambia branded as WAVE", aliases: ["WAVE Mobile Money Gambia", "WAVE Gamcel"], parentCompany: "Gamcel", status: "active", coverage: { platforms: ["USSD", "Android", "Agent Network"], languages: ["English"], regions: ["Gambia"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "GMD" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "Benin", flag: "🇧🇯", code: "BJ",
    providers: [
      p({ name: "MTN MoMo", color: "#888888", shortName: "MM", tagline: "Mobile money service by MTN Benin", aliases: ["MTN MoMo Benin", "MTN Mobile Money Benin"], parentCompany: "MTN Benin", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Benin"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Moov MoneyMoMo", color: "#888888", shortName: "MM", tagline: "Mobile money service by Moov Africa in Benin", aliases: ["Moov MoneyMoMo Benin", "Moov Money Benin", "Moov Mobile Money Benin"], parentCompany: "Moov Africa Benin", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Benin"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "Togo", flag: "🇹🇬", code: "TG",
    providers: [
      p({ name: "Flooz (Moov Africa Togo)", color: "#888888", shortName: "FL", tagline: "Mobile money service by Moov Africa in Togo", aliases: ["Flooz", "Flooz Togo", "Flooz Mobile Money Togo"], parentCompany: "Moov Africa Togo", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Togo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "TMoney (Togocel)", color: "#888888", shortName: "TM", tagline: "Mobile money service by Togocel in Togo", aliases: ["TMoney Togocel", "TMoney Mobile Money Togo"], parentCompany: "Togocel", status: "active", coverage: { platforms: ["USSD", "Agent Network"], languages: ["French"], regions: ["Togo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Togo Pesa", color: "#888888", shortName: "TP", aliases: ["Togo Pesa Mobile Money", "Togo Pesa Togo"], status: "active", coverage: { platforms: ["USSD", "Agent Network"], languages: ["French"], regions: ["Togo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XOF" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "Congo (Brazzaville)", flag: "🇨🇬", code: "CG",
    providers: [
      p({ name: "MTN MoMo Congo", color: "#888888", shortName: "MMC", tagline: "Mobile money service by MTN in the Republic of the Congo", aliases: ["MTN MoMo Congo", "MTN Mobile Money Congo"], parentCompany: "MTN Congo", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Congo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XAF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money Congo", color: "#888888", shortName: "AMC", domain: "airtel.africa", tagline: "Mobile money service by Airtel in the Democratic Republic of the Congo", aliases: ["Airtel Money Congo S.A. RDC", "Airtel Money DRC"], parentCompany: "Airtel Congo S.A. (Airtel Africa)", foundedYear: 2012, status: "active", website: "https://www.airtel.africa/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*128#", languages: ["French"], regions: ["Democratic Republic of the Congo"] }, developer: { integrationPlatforms: ["WorldRemit for international remittances", "Various local billers and merchants accepting Airtel Money payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.africa", url: "https://www.airtel.africa" }, { label: "ecofinagency.com", url: "https://www.ecofinagency.com/telecom/2303-33908-congo-airtel-money-users-can-now-receive-money-from-outside-via-worldremit" }, { label: "kt.cd", url: "https://kt.cd/2024/04/09/airtel-money-congo-s-a-rdc-reduit-ses-tarifs-sur-le-marche-et-confirme-son-engagement-en-faveur-de-linc" }] } }),
      p({ name: "Moov Money Congo", color: "#888888", shortName: "MMC", tagline: "Mobile money service by Moov Africa in the Democratic Republic of the Congo", aliases: ["Moov Money Congo", "Moov Money Democratic Republic of the Congo"], parentCompany: "Moov Africa Congo", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["French"], regions: ["Democratic Republic of the Congo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "DR Congo", flag: "🇨🇩", code: "CD",
    providers: [
      p({ name: "M-Pesa DRC (Vodacom)", color: "#888888", shortName: "MD", tagline: "Mobile money service by Vodacom in the Democratic Republic of the Congo", aliases: ["M-Pesa DRC", "M-Pesa Vodacom DRC", "M-Pesa Vodacom Congo"], parentCompany: "Vodacom DRC", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*150*01#", languages: ["French"], regions: ["Democratic Republic of the Congo"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Airtel Money DRC", color: "#888888", shortName: "AMD", domain: "airtel.africa", tagline: "Mobile money service by Airtel in the Democratic Republic of the Congo", aliases: ["Airtel Money Congo S.A. RDC", "Airtel Money DRC", "Airtel Money Democratic Republic of the Congo"], parentCompany: "Airtel Congo S.A. (Bharti Airtel / Airtel Africa)", foundedYear: 2012, status: "active", website: "https://www.airtel.africa/mobile-money/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*111#", languages: ["French"], regions: ["Democratic Republic of the Congo"] }, developer: { integrationPlatforms: ["Mastercard virtual card linked to Airtel Money wallets (DRC users eligible where deployed)", "Various local billers and merchants accepting Airtel Money payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF", feeStructure: "Bundle‑based and transaction‑based fees; subject to local tariff revisions as announced by Airtel Money DRC" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.africa", url: "https://www.airtel.africa/mobile-money/" }, { label: "une.cd", url: "https://www.une.cd/airtel-money-congo-sa-rdc-reduit-ses-tarifs-sur-le-marche-et-confirme-son-engagement-en-faveur-de-linclusion" }, { label: "mobileworldlive.com", url: "https://www.mobileworldlive.com/airtel/airtel-money-1m-revenue-earning-users-drc/" }] } }),
      p({ name: "Orange Money DRC", color: "#888888", shortName: "OMD", domain: "orange.cd", tagline: "Mobile money service by Orange in the Democratic Republic of the Congo", aliases: ["Orange Money Congo", "Orange Money Democratic Republic of the Congo"], parentCompany: "Orange République Démocratique du Congo (Orange RDC)", status: "active", website: "https://www.orange.cd/fr/orange-money-new.html", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Democratic Republic of the Congo"] }, developer: { hasApi: true, apiDocsUrl: "https://developer.orange.com/apis/om-webpay", sandboxAvailable: true, webhookSupport: true, integrationPlatforms: ["Merchants using Orange Money Web Payment API", "Flash International / CFC agents as Orange Money distributors", "Bank‑to‑phone transfers via Bank na Phone", "Visa virtual card linked to Orange Money accounts (DRC rollout planned)"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.cd", url: "https://www.orange.cd/fr/orange-money-new.html" }, { label: "developer.orange.com", url: "https://developer.orange.com/apis/om-webpay" }, { label: "lendsqr.com", url: "https://lendsqr.com/providers/orange%20money%20congo" }] } }),
      p({ name: "Africell Money DRC", color: "#888888", shortName: "AMD", domain: "africell.com", tagline: "Mobile money service by Africell in the Democratic Republic of the Congo", aliases: ["Africell Money DRC", "Afrimoney DRC", "Afrimoney Democratic Republic of the Congo"], parentCompany: "Africell Democratic Republic of the Congo", status: "active", website: "https://www.africell.com/afrimoney/", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*544#", languages: ["French"], regions: ["Democratic Republic of the Congo"] }, developer: { integrationPlatforms: ["Emergency cash‑transfer programs in Kinshasa via World Bank and DRC Social Fund", "Utility and billers accepting Afrimoney payments", "International remittance inflows through partner corridors"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "CDF" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "africell.com", url: "https://www.africell.com/afrimoney/" }, { label: "africell.com", url: "https://www.africell.com/market/drc/" }, { label: "africell.com", url: "https://www.africell.com" }] } })
    ],
  },
  {
    name: "Angola", flag: "🇦🇴", code: "AO",
    providers: [
      p({ name: "Unitel Money", color: "#888888", shortName: "UM", tagline: "Mobile money service by Unitel in Angola", aliases: ["Unitel Money Angola", "Unitel Mobile Money Angola"], parentCompany: "Unitel", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["Portuguese"], regions: ["Angola"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "AOA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Africell Money", color: "#888888", shortName: "AM", tagline: "Mobile money service by Africell in Angola", aliases: ["Africell Money Angola", "Africell Mobile Money Angola"], parentCompany: "Africell Angola", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["Portuguese"], regions: ["Angola"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "AOA" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "AfriMoney (Movicel)", color: "#888888", shortName: "AF", tagline: "Mobile money service by Movicel in Angola", aliases: ["AfriMoney Movicel", "AfriMoney Angola", "AfriMoney Mobile Money Angola"], parentCompany: "Movicel", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], languages: ["Portuguese"], regions: ["Angola"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "AOA" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "Zimbabwe", flag: "🇿🇼", code: "ZW",
    providers: [
      p({ name: "EcoCash", color: "#888888", shortName: "EC", domain: "ecocash.co.zw", tagline: "Zimbabwe's leading mobile money service", aliases: ["EcoCash Zimbabwe", "EcoCash Mobile Money"], parentCompany: "Econet Wireless Zimbabwe", foundedYear: 2011, status: "active", website: "https://ecocash.co.zw/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*151#", languages: ["English"], regions: ["Zimbabwe"] }, developer: { integrationPlatforms: ["MoneyGram for international remittances", "PayPal integration for selected transactions", "Numerous merchants and merchants platforms accepting EcoCash QR payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "USD", limits: { min: "1" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "ecocash.co.zw", url: "https://ecocash.co.zw/" }, { label: "en.wikipedia.org", url: "https://en.wikipedia.org/wiki/EcoCash" }, { label: "apps.apple.com", url: "https://apps.apple.com/ke/app/ecocash-zimbabwe/id6478928861" }] } }),
      p({ name: "OneMoney", color: "#888888", shortName: "ON", tagline: "Mobile money service by NetOne in Zimbabwe", aliases: ["OneMoney Zimbabwe", "OneMoney Mobile Money"], parentCompany: "NetOne Cellular", status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*111#", languages: ["English"], regions: ["Zimbabwe"] }, developer: { integrationPlatforms: ["ZIPIT bank transfers into OneMoney account", "EcoCash and other banks for fund transfers", "Merchants and billers accepting OneMoney payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "USD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "facebook.com", url: "https://www.facebook.com/netonezimbabwe" }, { label: "facebook.com", url: "https://www.facebook.com/onemoneyzw" }] } }),
      p({ name: "Telecash (Telecel)", color: "#888888", shortName: "TE", tagline: "Mobile money service by Telecel Zimbabwe", aliases: ["Telecash", "Telecash Zimbabwe", "Telecel Telecash"], parentCompany: "Telecel Zimbabwe", foundedYear: 2014, status: "active", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*888#", languages: ["English"], regions: ["Zimbabwe"] }, developer: { integrationPlatforms: ["ZimSwitch rails for interoperable bank and card‑based payments", "Utilities and billers accepting Telecash payments", "Merchants and payment processors using Telecash as a payment method"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "USD", feeStructure: "Competitive transaction charges as announced by Telecel; no monthly wallet fees" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "humanipo.com", url: "http://humanipo.com/news/39360/telecel-launches-telecash-mobile-money-service/" }, { label: "electronicpaymentsinternational.com", url: "https://www.electronicpaymentsinternational.com/news/telcel-zimbabwe-launches-mobile-money-service-telecash-4167831/" }, { label: "itnewsafrica.com", url: "https://www.itnewsafrica.com/2014/01/zimbabwes-telecel-launched-electronic-wallet/" }] } }),
      p({ name: "WIMPAY", color: "#888888", shortName: "WI", tagline: "Digital wallet and mobile payment service in Zimbabwe", aliases: ["WIMPAY Zimbabwe"], status: "active", coverage: { platforms: ["Android", "iOS"], languages: ["English"], regions: ["Zimbabwe"] }, developer: { integrationPlatforms: ["Connected to Zimbabwe’s ZIPIT/Zimswitch instant‑payment rail for cross‑bank and wallet transfers", "Merchants and e‑commerce platforms accepting WIMPAY as a digital‑wallet payment method"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "USD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "transfi.com", url: "https://www.transfi.com/blog/zimbabwes-payment-rails-how-they-work---zipit-mobile-money-instant-payment-integration" }, { label: "irglobal.com", url: "https://irglobal.com/article/the-legal-and-regulatory-framework-of-mobile-payments-in-zimbabwe/" }] } })
    ],
  },
  {
    name: "Botswana", flag: "🇧🇼", code: "BW",
    providers: [
      p({ name: "MyZaka (Mascom)", color: "#888888", shortName: "MY", domain: "online.mascom.bw", tagline: "Digital wallet and mobile money service by Mascom in Botswana", aliases: ["MyZaka", "MyZaka Pay", "MyZaka Mascom Botswana"], parentCompany: "Mascom Wireless Botswana", status: "active", website: "https://online.mascom.bw/", coverage: { platforms: ["USSD", "Android", "Web"], ussdCode: "*167#", languages: ["English"], regions: ["Botswana"] }, developer: { integrationPlatforms: ["Bank‑to‑wallet transfers via Mascom Online", "Merchants and SMMEs around Botswana accepting MyZaka Pay", "Smartphone‑purchase‑through‑installments via MyZaka Flexi"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "BWP" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "online.mascom.bw", url: "https://online.mascom.bw/" }, { label: "facebook.com", url: "https://www.facebook.com/mascom.bw/videos/mascom-online-transfer-money-from-bank-to-myzaka/913968732456957/" }, { label: "facebook.com", url: "https://www.facebook.com/mascom.bw/videos/mascom-online-myzaka/336979297340982/" }] } }),
      p({ name: "Orange Money Botswana", color: "#888888", shortName: "OMB", domain: "orange.co.bw", tagline: "Mobile money service by Orange Botswana", aliases: ["Orange Money Botswana", "Orange Money BW"], parentCompany: "Orange Botswana", foundedYear: 2011, status: "active", website: "https://www.orange.co.bw/en/orange-money.html", coverage: { platforms: ["USSD", "Android", "iOS", "Web", "Agent Network"], ussdCode: "*166#", languages: ["English"], regions: ["Botswana"] }, developer: { integrationPlatforms: ["Card‑to‑wallet transfers via partnership with Cellulant and 8 banks in Botswana", "Visa‑enabled payments and prepaid‑Visa cards linked to Orange Money wallets", "Various merchants, utilities, and service providers accepting Orange Money payments"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "BWP", limits: { min: "10", max: "9500" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.co.bw", url: "https://www.orange.co.bw/en/orange-money.html" }, { label: "bizcommunity.africa", url: "https://www.bizcommunity.africa/Article/410/78/60307.html" }, { label: "mobilemoneybw.co.bw", url: "https://www.mobilemoneybw.co.bw/omoney/about" }] } }),
      p({ name: "Smega (BTC)", color: "#888888", shortName: "SM", domain: "mobilemoneybw.co.bw", tagline: "Mobile money service by BTC in Botswana", aliases: ["Smega BTC", "Smega Mobile Money", "SMEGA Botswana"], parentCompany: "Botswana Telecommunications Corporation Limited (BTC)", foundedYear: 2019, status: "active", website: "https://www.mobilemoneybw.co.bw/smega/about", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*173#", languages: ["English"], regions: ["Botswana"] }, developer: { integrationPlatforms: ["Visa‑linked Smega Mobile Money cards for cash withdrawal and online payments", "Bulk‑payment features for businesses to pay salaries and allowances", "Motshelo Club group savings enabled via Smega wallets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "BWP", feeStructure: "Fee‑based per transaction; details as published by BTC and Smega platform", limits: { max: "10000", daily: "30000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mobilemoneybw.co.bw", url: "https://www.mobilemoneybw.co.bw/smega/about" }, { label: "thepatriot.co.bw", url: "https://thepatriot.co.bw/btc-launches-revamped-smega/amp/" }, { label: "cioafrica.co", url: "https://cioafrica.co/btc-launches-mobile-money-wallet-smega-powered-by-comvivas-mobiquity-money-platform/" }] } })
    ],
  },
  {
    name: "Namibia", flag: "🇳🇦", code: "NA",
    providers: [
      p({ name: "MTC Money", color: "#888888", shortName: "MM", domain: "mtc.com.na", tagline: "Mobile money and digital wallet service by MTC Namibia", aliases: ["MTC Money Namibia", "MTC Mobile Money Namibia"], parentCompany: "Mobile Telecommunications Limited (MTC) Namibia", foundedYear: 2014, status: "active", website: "https://www.mtc.com.na/index.php/services/mtcmoney", coverage: { platforms: ["USSD", "Agent Network"], ussdCode: "*140*682#", languages: ["English"], regions: ["Namibia"] }, developer: { integrationPlatforms: ["MobiPay payment‑processing platform powering MTC Money", "Utility and billers (airtime, electricity, TV, MTC invoices) accepting MTC Money payments", "Merchants and POS points at MTC Mobile Home, Woermann Brock, Pick‘n Pay, and NamPost outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "NAD", feeStructure: "Usage‑based transaction fees as published by MTC; no monthly wallet fees mentioned" }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "Easywallet (Bank Windhoek)", color: "#888888", shortName: "EA", domain: "bankwindhoek.com.na", tagline: "Bank Windhoek's e‑money wallet for instant mobile money transfers", aliases: ["EasyWallet", "Bank Windhoek EasyWallet", "Easywallet Bank Windhoek"], parentCompany: "Bank Windhoek", foundedYear: 2017, status: "active", website: "https://www.bankwindhoek.com.na", coverage: { platforms: ["USSD", "Android", "iOS"], ussdCode: "*140*295#", languages: ["English"], regions: ["Namibia"] }, developer: { integrationPlatforms: ["MTC mobile numbers for receiving and sending EasyWallet funds", "Bank Windhoek ATMs and CashExpress machines for cardless withdrawals", "Prepaid airtime and electricity vendors accepting EasyWallet payments"] }, transactions: { types: ["P2P", "Airtime Top-up", "Bill Payments", "Savings"], currency: "NAD", feeStructure: "Usage‑based charges for transfers and withdrawals as published by Bank Windhoek", limits: { max: "20000", daily: "5000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "namibian.com.na", url: "https://www.namibian.com.na/bank-windhoek-launches-easywallet/" }, { label: "namibiansun.com", url: "https://www.namibiansun.com/news/bank-windhoek-launches-easywallet" }, { label: "bankwindhoek.com.na", url: "https://www.bankwindhoek.com.na" }] } }),
      p({ name: "Telecom Namibia e-wallet", color: "#888888", shortName: "TNE", domain: "telecom.na", tagline: "Electronic wallet service by Telecom Namibia", aliases: ["Telecom Namibia e-wallet", "TN e-wallet", "Telecom Namibia electronic wallet"], parentCompany: "Telecom Namibia", status: "active", website: "https://www.telecom.na", coverage: { platforms: ["USSD", "Android", "iOS"], languages: ["English"], regions: ["Namibia"] }, transactions: { types: ["P2P", "Airtime Top-up", "Bill Payments"], currency: "NAD" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "telecom.na", url: "https://www.telecom.na" }] } })
    ],
  },
  {
    name: "Malawi", flag: "🇲🇼", code: "MW",
    providers: [
      p({ name: "Airtel Money Malawi", color: "#888888", shortName: "AMM", domain: "airtel.com.mw", tagline: "Mobile money service by Airtel Malawi", aliases: ["Airtel Money Malawi", "Airtel Money Malawi mobile money"], parentCompany: "Airtel Malawi Limited", foundedYear: 2010, status: "active", website: "https://www.airtel.com.mw/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*284#", languages: ["English"], regions: ["Malawi"] }, developer: { integrationPlatforms: ["Airtime and data top‑up for Airtel numbers", "Bill payments for utilities and other services via Airtel Money", "Merchant payments at participating outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "MWK", feeStructure: "Usage‑based transaction fees as published by Airtel Malawi" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.com.mw", url: "https://www.airtel.com.mw/airtel-money/" }, { label: "airtel.com.mw", url: "https://www.airtel.com.mw/" }, { label: "mwananchi.co.tz", url: "https://www.mwananchi.co.tz/airtel-money/airtel-money-malawi-features-and-services" }] } }),
      p({ name: "TNM Mpamba", color: "#888888", shortName: "TM", domain: "tnm.co.mw", tagline: "Mobile money service by TNM Malawi", aliases: ["Mpamba", "Mpamba by TNM", "TNM Mpamba mobile money"], parentCompany: "Telekom Networks Malawi (TNM) Limited", status: "active", website: "https://www.tnm.co.mw/mpamba/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*222#", languages: ["English"], regions: ["Malawi"] }, developer: { integrationPlatforms: ["Airtime and data top‑up for TNM numbers", "Bill payments for utilities and other services via Mpamba", "Merchant payments at participating outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MWK" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "tnm.co.mw", url: "https://www.tnm.co.mw/mpamba/" }] } })
    ],
  },
  {
    name: "Lesotho", flag: "🇱🇸", code: "LS",
    providers: [
      p({ name: "M-Pesa Lesotho", color: "#888888", shortName: "ML", domain: "vodacom.co.ls", tagline: "Mobile money service by Vodacom Lesotho", aliases: ["M-Pesa Lesotho", "M-Pesa in Lesotho", "Vodacom M-Pesa Lesotho"], parentCompany: "Vodacom Lesotho (Vodacom Group)", foundedYear: 2013, status: "active", website: "https://www.vodacom.co.ls/services/m-pesa", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*182#", languages: ["English"], regions: ["Lesotho"] }, developer: { integrationPlatforms: ["Bill payments for utilities and other services via M-Pesa", "Merchant payments at participating outlets", "Airtime and data top‑up for Vodacom numbers"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "LSL" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "vodacom.co.ls", url: "https://www.vodacom.co.ls/services/m-pesa" }] } }),
      p({ name: "Econet Lesotho", color: "#888888", shortName: "EL", domain: "econet.co.ls", tagline: "Mobile money service by Econet Wireless Lesotho", aliases: ["Econet Lesotho mobile money", "EcoCash Lesotho", "Econet Money Lesotho"], parentCompany: "Econet Wireless Lesotho", status: "active", website: "https://www.econet.co.ls/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*151*1#", languages: ["English"], regions: ["Lesotho"] }, developer: { integrationPlatforms: ["Bill payments for utilities and other services via Econet mobile money", "Merchant payments at participating outlets", "Airtime and data top‑up for Econet numbers"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "LSL" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "econet.co.ls", url: "https://www.econet.co.ls/" }] } })
    ],
  },
  {
    name: "Eswatini", flag: "🇸🇿", code: "SZ",
    providers: [
      p({ name: "MTN MoMO Eswatini", color: "#888888", shortName: "MME", domain: "mtn.co.sz", tagline: "MTN Mobile Money (MoMo) makes sending, receiving and managing money fast, safe and easy in Eswatini", aliases: ["MTN MoMo Eswatini", "MTN Mobile Money Eswatini", "MoMo Eswatini"], parentCompany: "MTN Eswatini (MTN Group)", status: "active", website: "https://www.mtn.co.sz/momo/financial-services/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*007#", languages: ["English"], regions: ["Eswatini"] }, developer: { integrationPlatforms: ["International remittance platforms such as Mama Money and Mukuru for cross‑border inflows", "ATM withdrawals via Eswatini Building Society and Eswatini Bank ATMs using MoMo wallets", "Billers and merchants accepting MoMo payments for utilities, school fees, and retail purchases"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SZL", feeStructure: "Usage‑based fees as published by MTN Eswatini; international remittance and bill‑pay rates disclosed at point of transaction", limits: { max: "50000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mtn.co.sz", url: "https://www.mtn.co.sz/momo/financial-services/" }, { label: "mtn.co.sz", url: "https://www.mtn.co.sz" }, { label: "eswatinipositivenews.online", url: "https://eswatinipositivenews.online/you-can-now-receive-money-from-sa-through-mtn-momo/" }] } }),
      p({ name: "E-Mali Eswatini Mobile", color: "#888888", shortName: "EEM", domain: "eswatinimobile.co.sz", tagline: "Your one stop mobile wallet by Eswatini Mobile", aliases: ["e-Mali", "E-Mali Eswatini", "Eswatini Mobile e-Mali"], parentCompany: "Eswatini Mobile", status: "active", website: "https://eswatinimobile.co.sz/about-e-mali/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*232#", languages: ["English"], regions: ["Eswatini"] }, developer: { integrationPlatforms: ["Electricity bill payments via e-Mali", "Bank‑linked deposits and withdrawals using e-Mali wallets", "Retail and merchant payments at participating outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "SZL", feeStructure: "Usage‑based transaction fees; transfers and withdrawals reported as up to 33% cheaper than MoMo for comparable services", limits: { daily: "10000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "eswatinimobile.co.sz", url: "https://eswatinimobile.co.sz/about-e-mali/" }, { label: "eswatinimobile.co.sz", url: "https://eswatinimobile.co.sz/wp-content/uploads/2023/01/Customer-Brochure-002.pdf" }, { label: "times.co.sz", url: "https://www.times.co.sz/business/121345-e-mali-33-per-cent-cheaper-than-momo.html" }] } })
    ],
  },
  {
    name: "Madagascar", flag: "🇲🇬", code: "MG",
    providers: [
      p({ name: "MVola (Telma)", color: "#888888", shortName: "MV", domain: "mvola.mg", tagline: "MVola simplifie votre quotidien : envoyez et recevez de l'argent, empruntez, épargnez, et payez vos factures", aliases: ["MVola", "MVola Telma", "MVola mobile money Madagascar"], parentCompany: "Telma Madagascar", foundedYear: 2010, status: "active", website: "https://www.mvola.mg", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Madagascar"] }, developer: { integrationPlatforms: ["Cashpoint / Telma Shop network for cash‑in and cash‑out", "Bank to MVola services via partner banks in Madagascar", "Visa‑linked MVola card for international payments and online purchases"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "MGA", feeStructure: "Usage‑based transaction and transfer fees as published by Telma; fees vary by service and channel" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mvola.mg", url: "https://www.mvola.mg" }, { label: "mvola.mg", url: "https://www.mvola.mg/MVola_mobile_money.php" }, { label: "facebook.com", url: "https://www.facebook.com/MvolaMobileMoney/" }] } }),
      p({ name: "Airtel Money Madagascar", color: "#888888", shortName: "AMM", domain: "airtel.mg", tagline: "Mobile money service by Airtel Madagascar", aliases: ["Airtel Money", "Airtel Money Madagascar", "Airtel Money mobile money Madagascar"], parentCompany: "Airtel Madagascar (Airtel Africa)", status: "active", website: "https://www.airtel.mg/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*142#", languages: ["French"], regions: ["Madagascar"] }, developer: { integrationPlatforms: ["Airtime and data top‑up for Airtel customers", "Bill payments for utilities and other services via Airtel Money", "Merchant payments at participating outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "MGA" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.mg", url: "https://www.airtel.mg/" }] } }),
      p({ name: "Orange Money Madagascar", color: "#888888", shortName: "OMM", domain: "orange.mg", tagline: "Mobile money service by Orange Madagascar", aliases: ["Orange Money", "Orange Money Madagascar", "Orange Money mobile money Madagascar"], parentCompany: "Orange Madagascar (Orange Group)", status: "active", website: "https://www.orange.mg/orange-money/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French"], regions: ["Madagascar"] }, developer: { integrationPlatforms: ["Airtime and data top‑up for Orange customers", "Bill payments for utilities and other services via Orange Money", "Merchant payments at participating outlets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "MGA" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.mg", url: "https://www.orange.mg/orange-money/" }] } })
    ],
  },
  {
    name: "Mauritius", flag: "🇲🇺", code: "MU",
    providers: [
      p({ name: "MyT Money Mauritius", color: "#888888", shortName: "MMM", domain: "mauritiustelecom.mu", tagline: "Mobile money service by Mauritius Telecom", aliases: ["MyT Money", "MyT Money mobile money Mauritius"], parentCompany: "Mauritius Telecom", status: "active", website: "https://www.mauritiustelecom.mu/en/mobile/myt", coverage: { platforms: ["Android", "iOS"], languages: ["English"], regions: ["Mauritius"] }, developer: { integrationPlatforms: ["Bill payments for utilities and other services via MyT Money", "Merchant payments at participating outlets", "Airtime and data top‑up for Mauritius Telecom customers"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MUR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mauritiustelecom.mu", url: "https://www.mauritiustelecom.mu/en/mobile/myt" }] } }),
      p({ name: "Juice (MCB Group)", color: "#888888", shortName: "JU", domain: "mcb.com", tagline: "Digital wallet by MCB Group for convenient mobile payments in Mauritius", aliases: ["Juice Mobile Wallet", "Juice Mauritius", "MCB Juice"], parentCompany: "MCB Group", status: "active", website: "https://www.mcb.com/local/juice-mobile-wallet", coverage: { platforms: ["Android", "iOS", "Web", "Agent Network"], languages: ["English"], regions: ["Mauritius"] }, developer: { integrationPlatforms: ["Integrated payments with MCB banking services", "Merchant payments via QR code and online", "P2P transfers and airtime top‑ups using Juice wallet"] }, transactions: { types: ["P2P", "Merchant Payments", "Airtime Top-up", "Savings"], currency: "MUR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mcb.com", url: "https://www.mcb.com/local/juice-mobile-wallet" }] } }),
      p({ name: "MYT (Emtel Pay)", color: "#888888", shortName: "MY", domain: "emtel.com", tagline: "Mobile wallet by Emtel Mauritius for fast and secure digital payments", aliases: ["MYT by Emtel Pay", "Emtel Pay MYT", "Emtel MYT Mobile Wallet"], parentCompany: "Emtel Ltd (Emtel Group)", status: "active", website: "https://www.emtel.com/Publications/Whats-New/Emtel-Pay.html", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["English"], regions: ["Mauritius"] }, developer: { integrationPlatforms: ["Airtime and data top‑up for Emtel customers", "Merchant payments at participating outlets", "Bill payments for utilities and other services via MYT"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MUR" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "emtel.com", url: "https://www.emtel.com/Publications/Whats-New/Emtel-Pay.html" }, { label: "emtel.com", url: "https://www.emtel.com" }] } })
    ],
  },
  {
    name: "Réunion / Mayotte", flag: "🇾🇹", code: "YT",
    providers: [
      p({ name: "Orange Money Mayotte", color: "#888888", shortName: "OMM", domain: "orange.mayotte.fr", tagline: "Mobile money wallet by Orange available in Mayotte", aliases: ["Orange Money", "Orange Money Mayotte"], parentCompany: "Orange Mayotte", status: "active", website: "https://www.orange.mayotte.fr", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*123#", languages: ["French"], regions: ["Mayotte"] }, developer: { integrationPlatforms: ["Orange billing and prepaid credit top‑ups via Orange Money in Mayotte", "Domestic money transfers and cash‑in / cash‑out through Orange‑authorized agents and shops", "Bill payments accepted via Orange Money wallets in the Mayotte / Réunion‑area ecosystem"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "EUR", feeStructure: "Usage‑based transaction fees as published by Orange Money Europe for Mayotte‑linked accounts" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.mayotte.fr", url: "https://www.orange.mayotte.fr" }, { label: "orangemoney.eu", url: "https://www.orangemoney.eu/en-help" }] } })
    ],
  },
  {
    name: "Ethiopia", flag: "🇪🇹", code: "ET",
    providers: [
      p({ name: "Telebirr (Ethio Telecom)", color: "#888888", shortName: "TE", domain: "ethiotelecom.et", tagline: "Digital mobile money platform by Ethio Telecom for cashless payments across Ethiopia", aliases: ["Telebirr", "Telebirr Ethiopia", "Ethio Telecom Telebirr"], parentCompany: "Ethio Telecom", foundedYear: 2021, status: "active", website: "https://www.ethiotelecom.et/telebirr/", coverage: { platforms: ["USSD", "Android", "iOS"], ussdCode: "*127#", languages: ["Amharic", "English", "Tigrinya", "Oromo", "Somali"], regions: ["Ethiopia"] }, developer: { integrationPlatforms: ["E‑commerce and digital‑service payments via the Telebirr SuperApp", "Government services and utility bill payments accepted through Telebirr", "Merchant payments at retail outlets, cafes, restaurants, fuel stations and transport services"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings", "Loans"], currency: "ETB", feeStructure: "Usage‑based transaction fees as published by Ethio Telecom; fees vary by service and channel" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "en.wikipedia.org", url: "https://en.wikipedia.org/wiki/Telebirr" }, { label: "ethiotelecom.et", url: "https://www.ethiotelecom.et/telebirr/" }, { label: "thestar.com.my", url: "https://www.thestar.com.my/news/world/2023/03/25/ethiopia039s-mobile-money-platform-telebirr-upgraded" }] } }),
      p({ name: "Amole (Dashen Bank)", color: "#888888", shortName: "AM", domain: "dashenbanksc.com", tagline: "Mobile banking and digital wallet service by Dashen Bank in Ethiopia", aliases: ["Amole", "Amole Ethiopia", "Dashen Bank Amole"], parentCompany: "Dashen Bank", status: "active", website: "https://www.dashenbanksc.com", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["English", "Amharic"], regions: ["Ethiopia"] }, developer: { integrationPlatforms: ["Banking and payment services integrated with Dashen Bank accounts", "Merchant payments at participating outlets accepting Amole", "Bill payment and airtime top‑up via the Amole platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "ETB", feeStructure: "Usage‑based transaction fees as published by Dashen Bank" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "dashenbanksc.com", url: "https://www.dashenbanksc.com" }] } }),
      p({ name: "CBEBirr", color: "#888888", shortName: "CB", domain: "cbe.com.et", tagline: "Mobile money and digital banking service by Commercial Bank of Ethiopia", aliases: ["CBEBirr Ethiopia", "CBE Birr", "CBEBirr mobile money"], parentCompany: "Commercial Bank of Ethiopia", status: "active", website: "https://www.cbe.com.et", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["English", "Amharic"], regions: ["Ethiopia"] }, developer: { integrationPlatforms: ["Payments and transfers linked to Commercial Bank of Ethiopia accounts", "Merchant payments at outlets accepting CBEBirr", "Bill payments and airtime top‑up through the CBEBirr platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "ETB", feeStructure: "Usage‑based transaction fees as published by Commercial Bank of Ethiopia" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "cbe.com.et", url: "https://www.cbe.com.et" }] } }),
      p({ name: "HelloCash", color: "#888888", shortName: "HE", domain: "portal.hellocash.net", tagline: "Interoperable mobile money platform for financial inclusion in Ethiopia", aliases: ["HelloCash Ethiopia", "HelloCash mobile money", "HelloCash mobile banking"], parentCompany: "BelCash Technology Solution PLC", foundedYear: 2015, status: "active", website: "https://portal.hellocash.net", coverage: { platforms: ["USSD", "Android", "iOS", "Web", "Agent Network"], ussdCode: "*123#", languages: ["English"], regions: ["Ethiopia"] }, developer: { integrationPlatforms: ["Integrated payouts and bill payments for multiple banks and MFIs on the HelloCash network", "Telegram‑based ChatBot channel for account access and payments", "Agent network enabling cash‑in and cash‑out at tens of thousands of locations across Ethiopia"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "ETB", feeStructure: "Usage‑based transaction fees consistent with National Bank of Ethiopia mobile‑money directives" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "finextra.com", url: "https://www.finextra.com/pressarticle/58590/hellocash-financial-services-platform-goes-live-in-ethiopia" }, { label: "appsafrica.com", url: "https://www.appsafrica.com/interoperable-mobile-money-service-goes-live-in-ethiopia/" }, { label: "portal.hellocash.net", url: "https://portal.hellocash.net" }] } })
    ],
  },
  {
    name: "Somalia", flag: "🇸🇴", code: "SO",
    providers: [
      p({ name: "Zaad (Telesom)", color: "#888888", shortName: "ZA", domain: "telesom.net", tagline: "Mobile money service by Telesom for secure payments and transfers in Somaliland and beyond", aliases: ["Zaad", "Zaad mobile money", "Telesom ZAAD", "Zaad Somalia", "Zaad Somaliland"], parentCompany: "Telesom", foundedYear: 2009, status: "active", website: "https://telesom.net/business/mobile_money_exchange", coverage: { platforms: ["USSD", "Agent Network"], ussdCode: "*100#", languages: ["Somali", "English"], regions: ["Somaliland", "Somalia"] }, developer: { integrationPlatforms: ["WorldRemit and other international remittance platforms for ZAAD‑linked payouts", "Somaliland and Somaliland‑linked billers and merchants accepting ZAAD", "Cash‑in/cash‑out via Telesom‑authorized agents and exchange points"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SLSH", feeStructure: "No customer‑facing transaction fees in many cases; exchange and service‑related charges applied at agent and remittance levels", limits: { max: "5000" } }, meta: { lastVerified: "2025-12-01" } }),
      p({ name: "EVC Plus (Hormuud)", color: "#888888", shortName: "EP", domain: "hormuud.com", tagline: "The easiest and most convenient way to transact in Somalia and send remittances from abroad", aliases: ["EVC Plus", "EVC Plus mobile money", "EVC Plus Somalia"], parentCompany: "Hormuud Telecom", foundedYear: 2011, status: "active", website: "https://hormuud.com/EvcPlus", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*264#", languages: ["Somali", "Arabic", "English"], regions: ["Somalia"] }, developer: { integrationPlatforms: ["WorldRemit and other international remittance platforms for EVC Plus payouts", "Merchant payments at retail outlets accepting EVC Plus", "Bill payments and airtime top‑up via EVC Plus"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "USD", feeStructure: "Usage‑based transaction fees as published by Hormuud Telecom" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "hormuud.com", url: "https://hormuud.com/EvcPlus" }, { label: "hormuud.com", url: "https://hormuud.com" }, { label: "economictimes.indiatimes.com", url: "https://www.economictimes.indiatimes.com/telecom/news/hormuud-telecom-awarded-somalias-first-mobile-money-licence/articleshow/81245841.cms" }] } }),
      p({ name: "E-Dahab (Golis)", color: "#888888", shortName: "E-", domain: "somtelnetwork.net", tagline: "Mobile money and digital payments service by Somtel in Somalia and Somaliland", aliases: ["E-Dahab", "eDahab", "E-Dahab mobile money", "E-Dahab Somtel"], parentCompany: "Somtel International Limited (Dahabshiil Group)", foundedYear: 2014, status: "active", website: "https://www.somtelnetwork.net/eDahab", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*111#", languages: ["Somali", "English"], regions: ["Somalia", "Somaliland"] }, developer: { integrationPlatforms: ["Golis‑Somtel eMoney Exchange app enabling transfers between Golis Sahal eMoney and Somtel eDahab eMoney", "Large‑volume payout and salary‑payment schemes for businesses and humanitarian organizations", "Agent‑based cash‑in and cash‑out networks across Somalia and Somaliland"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings", "Loans"], currency: "USD", feeStructure: "Usage‑based transaction fees as set by Somtel and Dahabshiil; small‑value transfers may be done in Somaliland shillings under local regulations" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "somtelnetwork.net", url: "https://www.somtelnetwork.net/eDahab" }, { label: "somtelsomalia.com", url: "https://somtelsomalia.com/eDahab" }, { label: "somalilandcurrent.com", url: "https://www.somalilandcurrent.com/somalilandsomtel-launches-e-dahab-mobile-money-services/" }] } })
    ],
  },
  {
    name: "South Sudan", flag: "🇸🇸", code: "SS",
    providers: [
      p({ name: "DigiCash", color: "#888888", shortName: "DI", domain: "digicashss.com", tagline: "Mobile money and digital wallet service by Digitel in South Sudan", aliases: ["Digicash", "DigiCash mobile money", "Digicash South Sudan"], parentCompany: "Digitel (Digitel Telecom)", status: "active", website: "https://www.digicashss.com", coverage: { platforms: ["USSD", "Android", "Agent Network"], languages: ["English"], regions: ["South Sudan"] }, developer: { integrationPlatforms: ["P2P transfers to non‑Digicash mobile‑money networks such as Zain and MTN", "Merchant payments at retail and service‑point outlets", "International remittance inflows integrated into Digicash wallets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "SSP", feeStructure: "Usage‑based transaction fees charged by Digitel for Digicash services" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "digicashss.com", url: "https://www.digicashss.com" }, { label: "facebook.com", url: "https://www.facebook.com/DigitelSS" }, { label: "facebook.com", url: "https://www.facebook.com/DigitelSS/posts/-send-money-to-anyone-with-digicash-with-digicash-you-can-send-money-to-non-memb/688373" }] } }),
      p({ name: "MoMo (MTN South Sudan)", color: "#888888", shortName: "MO", domain: "mtn.com.ss", tagline: "MTN’s flagship mobile money platform enabling fast, secure digital payments in South Sudan", aliases: ["MoMo MTN South Sudan", "MTN MoMo South Sudan", "MTN Mobile Money South Sudan"], parentCompany: "MTN South Sudan", status: "active", website: "https://www.mtn.com.ss/helppersonal/how-do-we-tell-if-a-sim-is-registered-or-unregistered/", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*200#", languages: ["English"], regions: ["South Sudan"] }, developer: { hasApi: true, apiDocsUrl: "https://momodeveloper.mtn.com/content/html_widgets/doy1e.html", integrationPlatforms: ["MTN‑to‑MTN and cross‑network money transfers", "International remittance inflows into MTN MoMo wallets from multiple countries", "Merchant payments and bill payments via MTN‑linked digital channels"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SSP", feeStructure: "Usage‑based transaction and service fees as published by MTN South Sudan" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mtn.com.ss", url: "https://www.mtn.com.ss/helppersonal/how-do-we-tell-if-a-sim-is-registered-or-unregistered/" }, { label: "momodeveloper.mtn.com", url: "https://momodeveloper.mtn.com/content/html_widgets/doy1e.html" }, { label: "sudanspost.com", url: "https://www.sudanspost.com/mtn-apologizes-after-agent-rejects-momo-payment/" }] } })
    ],
  },
  {
    name: "Sudan", flag: "🇸🇩", code: "SD",
    providers: [
      p({ name: "MoMo (MTN Sudan)", color: "#888888", shortName: "MO", domain: "mtn.sd", tagline: "MTN’s mobile money platform making financial services easier and more accessible in Sudan", aliases: ["MoMo MTN Sudan", "MTN MoMo Sudan", "MoMo Sudan"], parentCompany: "MTN Sudan Fintech Company Limited", foundedYear: 2021, status: "active", website: "https://www.mtn.sd/mtn/momo-services/", coverage: { platforms: ["USSD", "Android", "iOS"], ussdCode: "*200#", languages: ["Arabic", "English"], regions: ["Sudan"] }, developer: { hasApi: true, apiDocsUrl: "https://momo.mtn.com", integrationPlatforms: ["International remittance inflows into MoMo Sudan wallets", "Bill payments such as electricity units via MTN MoMo", "Merchant and retail payments using the MoMo platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "SDG", feeStructure: "Usage‑based transaction fees as published by MTN Sudan" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mtn.sd", url: "https://www.mtn.sd/mtn/momo-services/" }, { label: "linkedin.com", url: "https://www.linkedin.com/company/momo-sudan" }, { label: "momo.mtn.com", url: "https://momo.mtn.com" }] } }),
      p({ name: "Zain Cash Sudan", color: "#888888", shortName: "ZCS", domain: "zain.sv", tagline: "Mobile money wallet by Zain Sudan for convenient digital payments", aliases: ["Zain Cash", "Zain Cash mobile money Sudan"], parentCompany: "Zain Sudan", status: "active", website: "https://www.zain.sv", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*123#", languages: ["Arabic", "English"], regions: ["Sudan"] }, developer: { integrationPlatforms: ["P2P transfers via Zain Cash", "Merchant payments at participating outlets", "Bill payments and utility top‑ups supported on the platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "SDG", feeStructure: "Usage‑based transaction and service fees as set by Zain Sudan" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "zain.sv", url: "https://www.zain.sv" }] } })
    ],
  },
  {
    name: "Djibouti", flag: "🇩🇯", code: "DJ",
    providers: [
      p({ name: "D-Money", color: "#888888", shortName: "D-", domain: "d-money.dj", tagline: "Digital Mobile Money: an innovative, secure and fast mobile‑money wallet in Djibouti", aliases: ["D Money Djibouti", "Djibouti Money", "D-Money Djibouti"], parentCompany: "Djibouti Telecom", foundedYear: 2015, status: "active", website: "https://d-money.dj", coverage: { platforms: ["USSD", "Android", "iOS"], languages: ["French", "Arabic", "English"], regions: ["Djibouti"] }, developer: { integrationPlatforms: ["Digital payments and money transfers for port‑worker wage disbursement", "E‑commerce and merchant payments via D‑Money mobile wallets", "Bill payments and utility top‑ups integrated with the D‑Money platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "DJF", feeStructure: "Usage‑based transaction fees as published by Djibouti Telecom for D‑Money services" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "d-money.dj", url: "https://d-money.dj" }, { label: "play.google.com", url: "https://play.google.com/store/apps/details?id=com.djiboutitelecom.dmoney.customer&hl=en" }, { label: "developingtelecoms.com", url: "https://developingtelecoms.com/telecom-technology/financial-services/15938-digital-money-transfer-system-comes-to-djibouti-s-ports" }] } })
    ],
  },
  {
    name: "Comoros", flag: "🇰🇲", code: "KM",
    providers: [
      p({ name: "Huri Money", color: "#888888", shortName: "HM", domain: "hurimoney.com", tagline: "Mobile money wallet by Huri for fast and secure digital payments in the Comoros", aliases: ["Huri Money KM", "Huri Money Comoros"], parentCompany: "Comores Telecom (HURI)", foundedYear: 2021, status: "active", website: "https://www.hurimoney.com", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French", "Arabic"], regions: ["Union of the Comoros"] }, developer: { integrationPlatforms: ["Bill payments for utilities such as Sonelec and other approved partners via Huri Money", "Cash‑in/cash‑out through Comores Telecom‑authorized agents", "P2P transfers and merchant payments linked to Huri Money wallets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "KMF", feeStructure: "Usage‑based transaction fees as published by Comores Telecom for Huri Money" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "hurimoney.com", url: "https://www.hurimoney.com" }, { label: "comorestelecom.km", url: "https://www.comorestelecom.km" }, { label: "wakati.km", url: "https://www.wakati.km" }] } })
    ],
  },
  {
    name: "Cabo Verde", flag: "🇨🇻", code: "CV",
    providers: [
      p({ name: "MVola (CV Movel)", color: "#888888", shortName: "MV", domain: "cvtelecom.cv", tagline: "Mobile money service by MVola enabling fast and secure digital payments in Cabo Verde", aliases: ["MVola Cabo Verde", "MVola CV Móvel", "MVola Cape Verde"], parentCompany: "Cabo Verde Telecom (CV Telecom)", status: "active", website: "https://www.cvtelecom.cv", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["Portuguese", "English"], regions: ["Cabo Verde"] }, developer: { integrationPlatforms: ["International remittance inflows into MVola Cabo Verde wallets", "Merchant payments at participating outlets across the islands", "Bill payments and utility top‑ups via MVola Mobile Money"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "CVE", feeStructure: "Usage‑based transaction fees as set by CV Móvel (MVola) in Cabo Verde" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "cvtelecom.cv", url: "https://www.cvtelecom.cv" }, { label: "mvola.km", url: "https://www.mvola.km" }, { label: "prepaid-data-sim-card.fandom.com", url: "https://prepaid-data-sim-card.fandom.com/wiki/Cape_Verde" }] } })
    ],
  },
  {
    name: "São Tomé and Príncipe", flag: "🇸🇹", code: "ST",
    providers: [
      p({ name: "e-Kwanza", color: "#888888", shortName: "E-", domain: "e-kwanza.ao", tagline: "Digital wallet service enabling mobile money transfers and payments in Sao Tome and Principe", aliases: ["é-Kwanza", "e-Kwanza Sao Tome and Principe", "e-Kwanza mobile money"], parentCompany: "Angolan Bank for Investment and Foreign Trade (BAI) via regional e‑money partnership", status: "active", website: "https://e-kwanza.ao", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["Portuguese"], regions: ["Sao Tome and Principe"] }, developer: { integrationPlatforms: ["P2P transfers and mobile‑money payments via the e‑Kwanza wallet", "ATM and agent‑based cash‑in/cash‑out services in partner markets", "Bill payments and airtime top‑ups available through the e‑Kwanza platform"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "STN", feeStructure: "Usage‑based transaction fees as set by the e‑Kwanza operator in Sao Tome and Principe" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "e-kwanza.ao", url: "https://e-kwanza.ao" }, { label: "cliente.e-kwanza.ao", url: "https://cliente.e-kwanza.ao" }, { label: "apps.apple.com", url: "https://apps.apple.com/us/app/é-kwanza-cliente/id1601662332" }] } })
    ],
  },
  {
    name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ",
    providers: [
      p({ name: "Orange Money", color: "#888888", shortName: "OM", domain: "orange.com", tagline: "Mobile money service by Orange in Equatorial Guinea", aliases: ["Orange Money Equatorial Guinea", "Orange Money Guinea Ecuatorial"], parentCompany: "Orange Guinea Ecuatorial (Orange Group)", status: "active", website: "https://www.orange.com", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["es", "French"], regions: ["Equatorial Guinea"] }, developer: { integrationPlatforms: ["International remittance inflows via Orange Money in Equatorial Guinea", "Merchant payments at participating outlets using Orange Money", "Bill payments and airtime top‑up via Orange Money wallets"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XAF", feeStructure: "Usage‑based transaction fees consistent with Orange Money‑tariff structure in Equatorial Guinea" }, meta: { lastVerified: "2025-12-01" } })
    ],
  },
  {
    name: "Gabon", flag: "🇬🇦", code: "GA",
    providers: [
      p({ name: "Airtel Money Gabon", color: "#888888", shortName: "AMG", domain: "airtel.ga", tagline: "Mobile money service by Airtel Gabon enabling fast and secure digital payments across the country", aliases: ["Airtel Money Gabon", "Airtel Money"], parentCompany: "Airtel Gabon (Airtel Africa)", status: "active", website: "https://www.airtel.ga/airtel_money", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*150#", languages: ["French"], regions: ["Gabon"] }, developer: { integrationPlatforms: ["ECOBANK and other bank‑to‑wallet linkages for Airtel Money users", "International remittance inflows and partner‑based cross‑border transfers", "Merchant payments at major retail outlets including Géant Casino and other chains"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "XAF", feeStructure: "Usage‑based fees with a 2.5% charge on bank‑to‑wallet transfers, capped at 5000 XAF per transaction", limits: { min: "1000", max: "250000", daily: "500000" } }, meta: { lastVerified: "2025-12-01", sources: [{ label: "airtel.ga", url: "https://www.airtel.ga/airtel_money" }, { label: "airtel.ga", url: "https://www.airtel.ga" }, { label: "airtel.africa", url: "https://www.airtel.africa/mobile-money" }] } }),
      p({ name: "Moov Money Gabon", color: "#888888", shortName: "MMG", domain: "moovmoney.ga", tagline: "Mobile money service by Moov Africa Gabon Telecom enabling fast and secure digital payments in Gabon", aliases: ["Moov Money Gabon", "Moov Money", "Moov Money GABON"], parentCompany: "Moov Africa Gabon Telecom (GABON TELECOM)", status: "active", website: "https://moovmoney.ga", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*100#", languages: ["French"], regions: ["Gabon"] }, developer: { integrationPlatforms: ["Interbank transfers and Moov Money Banking services with partner banks such as BGFIBank", "GIMAC Pay and other merchant‑payment platforms accepting Moov Money", "Online payments via Moov Money Online at selected e‑commerce sites"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "XAF", feeStructure: "Usage‑based fees as published by Moov Africa Gabon Telecom; some services may be free up to certain thresholds" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "moovmoney.ga", url: "https://moovmoney.ga" }, { label: "moovmoney.ga", url: "https://moovmoney.ga/moov-money-banking/" }, { label: "apps.apple.com", url: "https://apps.apple.com/by/app/moov-money-gabon/id6504250574" }] } })
    ],
  },
  {
    name: "Mauritania", flag: "🇲🇷", code: "MR",
    providers: [
      p({ name: "Masrvi (Mauritel)", color: "#888888", shortName: "MA", domain: "masrvi.mr", tagline: "Digital banking and mobile money service by Masrvi for safe and accessible financial transactions in Mauritania", aliases: ["Masrvi", "Masrvi mobile money", "Masrvi Mauritel"], parentCompany: "Mauritel (Mauritel Telecom)", foundedYear: 2021, status: "active", website: "https://www.masrvi.mr", coverage: { platforms: ["Android", "iOS", "Agent Network"], languages: ["French", "Arabic"], regions: ["Mauritania"] }, developer: { integrationPlatforms: ["Remote account opening and digital banking via the Masrvi application", "International money transfers from abroad (e.g., the US) into Mauritanian Masrvi wallets", "Bill payments and merchant payments at partner outlets across Mauritania"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MRO", feeStructure: "Usage‑based transaction fees as set by BMCI and Masrvi for digital banking and mobile‑money services" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "masrvi.mr", url: "https://www.masrvi.mr" }, { label: "spark.mwm.ai", url: "https://spark.mwm.ai/en/apps/masrvi/1540766096" }, { label: "africa-newsroom.com", url: "https://www.africa-newsroom.com/press/mauritanian-bank-for-international-trade-launches-digital-bank-masrvi-powered-by-tagpay" }] } }),
      p({ name: "Orange Money Mauritania", color: "#888888", shortName: "OMM", domain: "orange.mr", tagline: "Mobile money service by Orange offering fast, secure digital payments in Mauritania", aliases: ["Orange Money", "Orange Money Mauritania"], parentCompany: "Orange Mauritania", status: "active", website: "https://www.orange.mr", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*144#", languages: ["French", "Arabic"], regions: ["Mauritania"] }, developer: { integrationPlatforms: ["Remittance inflows into Orange Money wallets in Mauritania", "Bill payments for utilities and other services via Orange Money", "Merchant payments at participating outlets accepting Orange Money"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up", "Savings"], currency: "MRO", feeStructure: "Usage‑based transaction fees as published by Orange Mauritania" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "orange.mr", url: "https://www.orange.mr" }, { label: "orange.com", url: "https://www.orange.com/en/our-group/our-international-presence/africa-and-middle-east" }, { label: "en.wikipedia.org", url: "https://en.wikipedia.org/wiki/Orange_Money" }] } }),
      p({ name: "Mattel Money", color: "#888888", shortName: "MM", domain: "mattel.mr", tagline: "Mobile money service by Mattel for fast and secure digital payments in Mauritania", aliases: ["Mattel Money", "Mattel Mobile Money", "Mattel Money Mauritania"], parentCompany: "Mauritano‑Tunisienne de Télécommunications (MATTel)", status: "active", website: "https://www.mattel.mr", coverage: { platforms: ["USSD", "Android", "Agent Network"], ussdCode: "*144#", languages: ["French", "Arabic"], regions: ["Mauritania"] }, developer: { integrationPlatforms: ["P2P transfers and mobile‑money payments via Mattel Money", "Airtime top‑up and balance transfer services for Mattel subscribers", "Integration with partner platforms for digital payments and recharges"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up", "Savings"], currency: "MRO", feeStructure: "Usage‑based transaction fees as set by Mattel for its mobile‑money services" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "mattel.mr", url: "https://www.mattel.mr" }, { label: "watra.org", url: "https://watra.org/mauritania/" }, { label: "financialafrik.com", url: "https://www.financialafrik.com/en/2019/05/03/mauritania-telecoms-new-ceo-at-mattel/" }] } })
    ],
  },
  {
    name: "Libya", flag: "🇱🇾", code: "LY",
    providers: [
      p({ name: "Tadawul", color: "#888888", shortName: "TA", domain: "tadawul.ly", tagline: "Electronic payment platform and e‑wallet services enabling secure digital transactions in Libya", aliases: ["Tadawul Tech", "Tadawul Libya", "Tadawul Electronic Payment Platform"], parentCompany: "Tadawul Technology Company", foundedYear: 2008, status: "active", website: "https://tadawul.ly", coverage: { platforms: ["Android", "Web", "Agent Network"], languages: ["Arabic", "English"], regions: ["Libya"] }, developer: { hasApi: true, apiDocsUrl: "https://tadawul.ly/value-added-services", integrationPlatforms: ["Payment gateway integration for e‑commerce and online billing platforms", "Card‑to‑card and wallet‑to‑wallet money‑transfer services", "POS and bank‑card acceptance on the Tadawul network"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up"], currency: "LYD", feeStructure: "Usage‑based transaction and service fees compliant with Central Bank of Libya regulations" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "tadawul.ly", url: "https://tadawul.ly" }, { label: "tadawul.ly", url: "https://tadawul.ly/en/about-us" }, { label: "tadawul.ly", url: "https://tadawul.ly/value-added-services" }] } })
    ],
  },
  {
    name: "Myanmar", flag: "🇲🇲", code: "MM",
    providers: [
      p({ name: "Wave Money", color: "#888888", shortName: "WM", domain: "wavemoney.com.mm", tagline: "Myanmar’s leading mobile financial services and digital payments company", aliases: ["Wave Money Myanmar", "Wave Money", "Wave Mobile Money Myanmar"], parentCompany: "Digital Money Myanmar Ltd", foundedYear: 2015, status: "active", website: "https://www.wavemoney.com.mm", coverage: { platforms: ["USSD", "Android", "iOS", "Agent Network"], ussdCode: "*17177#", languages: ["my", "English"], regions: ["Myanmar"] }, developer: { integrationPlatforms: ["International remittance inflows via Wave Money wallets", "P2P transfers and merchant payments on the Wave mobile wallet platform", "Agent‑based cash‑in/cash‑out services through Wave shops across Myanmar"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "International Remittance", "Airtime Top-up"], currency: "MMK", feeStructure: "Usage‑based fees with capped charges for many domestic services and international remittances" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "wavemoney.com.mm", url: "https://www.wavemoney.com.mm" }, { label: "wavemoney.com.mm", url: "https://www.wavemoney.com.mm/about-us/" }, { label: "en.wikipedia.org", url: "https://en.wikipedia.org/wiki/Wave_Money" }] } })
    ],
  },
  {
    name: "South Korea", flag: "🇰🇷", code: "KR",
    providers: [
      p({ name: "Zero Pay", color: "#888888", shortName: "ZP", domain: "zeropay.or.kr", tagline: "State‑led mobile QR payment system supporting small businesses in South Korea", aliases: ["ZeroPay", "Zero Pay Korea", "제로페이"], parentCompany: "Korea Easy Payment Foundation (중소벤처기업부 및 서울특별시 후원 프로젝트)", foundedYear: 2018, status: "active", website: "https://www.zeropay.or.kr", coverage: { platforms: ["Android", "iOS", "Web"], languages: ["ko", "English"], regions: ["South Korea"] }, developer: { integrationPlatforms: ["Alipay+ and international e‑wallet apps such as Alipay, AlipayHK, and Touch ‘n Go scanning ZeroPay‑branded QR codes", "Domestic mobile‑bank and e‑wallet apps (e.g., Bank Pay, Naver Pay, Payco) acting as ZeroPay payment‑channel clients", "Merchant‑support and reporting platforms operated by the Korea Easy Payment Foundation"] }, transactions: { types: ["P2P", "Merchant Payments", "Bill Payments", "Airtime Top-up"], currency: "KRW", feeStructure: "Near‑zero transaction fees for small merchants (often 0–0.5% depending on annual sales), with consumers enjoying tax‑deduction incentives" }, meta: { lastVerified: "2025-12-01", sources: [{ label: "zeropay.or.kr", url: "https://www.zeropay.or.kr" }, { label: "koreaherald.com", url: "https://www.koreaherald.com/article/1870639" }, { label: "koreaherald.com", url: "https://www.koreaherald.com/article/1929002" }] } })
    ],
  },  // ── Other Regions ──
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
