export interface Provider {
  name: string;
  color: string; // bg color for logo placeholder
  textColor?: string;
  shortName?: string; // for logo display
}

export interface Country {
  name: string;
  flag: string;
  code: string;
  providers: Provider[];
}

export const countries: Country[] = [
  {
    name: "Nigeria", flag: "🇳🇬", code: "NG",
    providers: [
      { name: "OPay", color: "#1DBF73", shortName: "OP" },
      { name: "Palmpay", color: "#6C3BF5", shortName: "PP" },
      { name: "Kuda", color: "#40196D", shortName: "K" },
      { name: "Moniepoint", color: "#0066FF", shortName: "MP" },
      { name: "MTN MoMo (MoMo PSB)", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Airtel Money (SmartCash PSB)", color: "#ED1C24", shortName: "AM" },
      { name: "9PSB (9mobile)", color: "#006B3F", shortName: "9P" },
      { name: "Carbon", color: "#00C2B2", shortName: "C" },
      { name: "Fairmoney", color: "#00B5E2", shortName: "FM" },
    ],
  },
  {
    name: "Kenya", flag: "🇰🇪", code: "KE",
    providers: [
      { name: "M-Pesa (Safaricom)", color: "#4CAF50", shortName: "MP" },
      { name: "Airtel Money Kenya", color: "#ED1C24", shortName: "AM" },
      { name: "T-Kash (Telkom Kenya)", color: "#00AEEF", shortName: "TK" },
      { name: "Equitel (Equity Bank)", color: "#8B0000", shortName: "EQ" },
    ],
  },
  {
    name: "Ghana", flag: "🇬🇭", code: "GH",
    providers: [
      { name: "MTN MoMo Ghana", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "AirtelTigo Money", color: "#ED1C24", shortName: "AT" },
      { name: "Telecel Cash", color: "#E60000", shortName: "TC" },
    ],
  },
  {
    name: "Tanzania", flag: "🇹🇿", code: "TZ",
    providers: [
      { name: "M-Pesa Tanzania (Vodacom)", color: "#E60000", shortName: "MP" },
      { name: "Airtel Money Tanzania", color: "#ED1C24", shortName: "AM" },
      { name: "Tigo Pesa", color: "#004B93", shortName: "TP" },
      { name: "HaloPesa (Halotel)", color: "#FF6600", shortName: "HP" },
      { name: "TTCL M-Pesa", color: "#003366", shortName: "TM" },
    ],
  },
  {
    name: "Uganda", flag: "🇺🇬", code: "UG",
    providers: [
      { name: "MTN MoMo Uganda", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Airtel Money Uganda", color: "#ED1C24", shortName: "AM" },
    ],
  },
  {
    name: "Rwanda", flag: "🇷🇼", code: "RW",
    providers: [
      { name: "MTN MoMo Rwanda", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Airtel Money Rwanda", color: "#ED1C24", shortName: "AM" },
    ],
  },
  {
    name: "South Africa", flag: "🇿🇦", code: "ZA",
    providers: [
      { name: "MTN MoMo South Africa", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Vodacom M-Pesa", color: "#E60000", shortName: "VP" },
      { name: "Capitec Pay", color: "#003B70", shortName: "CP" },
      { name: "TymeBank", color: "#FFD700", textColor: "#000", shortName: "TB" },
      { name: "1voucher", color: "#FF4500", shortName: "1V" },
    ],
  },
  {
    name: "Egypt", flag: "🇪🇬", code: "EG",
    providers: [
      { name: "Vodafone Cash", color: "#E60000", shortName: "VC" },
      { name: "Etisalat Cash (e& money)", color: "#006B3F", shortName: "EC" },
      { name: "Orange Money Egypt", color: "#FF6600", shortName: "OM" },
      { name: "Fawry", color: "#FFB800", textColor: "#000", shortName: "FW" },
      { name: "WE Pay (Telecom Egypt)", color: "#6C3BF5", shortName: "WP" },
      { name: "InstaPay", color: "#0066FF", shortName: "IP" },
    ],
  },
  {
    name: "Senegal", flag: "🇸🇳", code: "SN",
    providers: [
      { name: "Orange Money Senegal", color: "#FF6600", shortName: "OM" },
      { name: "Free Money", color: "#CD1719", shortName: "FM" },
      { name: "Wave Senegal", color: "#1B2A4A", shortName: "WV" },
      { name: "Wari", color: "#0072CE", shortName: "WR" },
      { name: "Wizall Money", color: "#00B5E2", shortName: "WZ" },
      { name: "E-Money (Expresso)", color: "#FF9900", shortName: "EM" },
    ],
  },
  {
    name: "Côte d'Ivoire", flag: "🇨🇮", code: "CI",
    providers: [
      { name: "MTN MoMo Côte d'Ivoire", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Orange Money Côte d'Ivoire", color: "#FF6600", shortName: "OM" },
      { name: "Wave Côte d'Ivoire", color: "#1B2A4A", shortName: "WV" },
      { name: "Moov Money Côte d'Ivoire", color: "#0072CE", shortName: "MV" },
      { name: "YAS (MTN)", color: "#FFCC00", textColor: "#000", shortName: "YAS" },
    ],
  },
  {
    name: "Cameroon", flag: "🇨🇲", code: "CM",
    providers: [
      { name: "MTN MoMo Cameroon", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Orange Money Cameroon", color: "#FF6600", shortName: "OM" },
    ],
  },
  {
    name: "Zambia", flag: "🇿🇲", code: "ZM",
    providers: [
      { name: "MTN MoMo Zambia", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Airtel Money Zambia", color: "#ED1C24", shortName: "AM" },
      { name: "Zamtel Kwacha", color: "#006B3F", shortName: "ZK" },
      { name: "SpreadIt (Zoona)", color: "#00B5E2", shortName: "SI" },
    ],
  },
  {
    name: "Mozambique", flag: "🇲🇿", code: "MZ",
    providers: [
      { name: "M-Pesa Mozambique (Vodacom)", color: "#E60000", shortName: "MP" },
      { name: "Airtel Money Mozambique", color: "#ED1C24", shortName: "AM" },
      { name: "e-Mola (Movitel)", color: "#FF6600", shortName: "eM" },
    ],
  },
  {
    name: "Morocco", flag: "🇲🇦", code: "MA",
    providers: [
      { name: "CIH Pay", color: "#C8102E", shortName: "CH" },
      { name: "Orange Money Morocco", color: "#FF6600", shortName: "OM" },
      { name: "Inwi Money", color: "#6C3BF5", shortName: "IW" },
      { name: "M Walletee (Maroc Telecom)", color: "#0072CE", shortName: "MW" },
    ],
  },
  {
    name: "Algeria", flag: "🇩🇿", code: "DZ",
    providers: [
      { name: "BaridiMob (Algérie Poste)", color: "#FFB800", textColor: "#000", shortName: "BM" },
      { name: "EDAHABIA", color: "#006B3F", shortName: "ED" },
    ],
  },
  {
    name: "Tunisia", flag: "🇹🇳", code: "TN",
    providers: [
      { name: "Sobflous (Orange)", color: "#FF6600", shortName: "SF" },
      { name: "TTMoney (Tunisie Telecom)", color: "#0072CE", shortName: "TT" },
      { name: "Ooredoo Money", color: "#ED1C24", shortName: "OO" },
    ],
  },
  {
    name: "Mali", flag: "🇲🇱", code: "ML",
    providers: [
      { name: "Orange Money Mali", color: "#FF6600", shortName: "OM" },
      { name: "Moov Money Mali", color: "#0072CE", shortName: "MV" },
      { name: "Wave Mali", color: "#1B2A4A", shortName: "WV" },
    ],
  },
  {
    name: "Burkina Faso", flag: "🇧🇫", code: "BF",
    providers: [
      { name: "Orange Money Burkina Faso", color: "#FF6600", shortName: "OM" },
      { name: "Moov Money Burkina Faso", color: "#0072CE", shortName: "MV" },
      { name: "Wave Burkina Faso", color: "#1B2A4A", shortName: "WV" },
      { name: "Airtel Money Burkina Faso", color: "#ED1C24", shortName: "AM" },
    ],
  },
  {
    name: "Niger", flag: "🇳🇪", code: "NE",
    providers: [
      { name: "Airtel Money Niger", color: "#ED1C24", shortName: "AM" },
      { name: "Orange Money Niger", color: "#FF6600", shortName: "OM" },
      { name: "Moov Money Niger", color: "#0072CE", shortName: "MV" },
    ],
  },
  {
    name: "Chad", flag: "🇹🇩", code: "TD",
    providers: [
      { name: "Airtel Money Chad", color: "#ED1C24", shortName: "AM" },
      { name: "Moov Money Chad", color: "#0072CE", shortName: "MV" },
      { name: "Tigo Cash Chad", color: "#004B93", shortName: "TC" },
    ],
  },
  {
    name: "Guinea (Conakry)", flag: "🇬🇳", code: "GN",
    providers: [
      { name: "Orange Money Guinea", color: "#FF6600", shortName: "OM" },
      { name: "MTN MoMo Guinea", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Cellcom Money", color: "#0072CE", shortName: "CM" },
    ],
  },
  {
    name: "Guinea-Bissau", flag: "🇬🇼", code: "GW",
    providers: [
      { name: "Orange Money Guinea-Bissau", color: "#FF6600", shortName: "OM" },
      { name: "Moov Money Guinea-Bissau", color: "#0072CE", shortName: "MV" },
    ],
  },
  {
    name: "Sierra Leone", flag: "🇸🇱", code: "SL",
    providers: [
      { name: "Orange Money Sierra Leone", color: "#FF6600", shortName: "OM" },
      { name: "Africell Money", color: "#003366", shortName: "AC" },
      { name: "Qmoney (Airtel)", color: "#ED1C24", shortName: "QM" },
    ],
  },
  {
    name: "Liberia", flag: "🇱🇷", code: "LR",
    providers: [
      { name: "Lonestar Cell MTN MoMo", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Orange Money Liberia", color: "#FF6600", shortName: "OM" },
    ],
  },
  {
    name: "Gambia", flag: "🇬🇲", code: "GM",
    providers: [
      { name: "Africell Money Gambia", color: "#003366", shortName: "AC" },
      { name: "QMoney (Gamcel)", color: "#006B3F", shortName: "QM" },
      { name: "Wave Gambia", color: "#1B2A4A", shortName: "WV" },
    ],
  },
  {
    name: "Benin", flag: "🇧🇯", code: "BJ",
    providers: [
      { name: "MTN MoMo Benin", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Moov Money Benin", color: "#0072CE", shortName: "MV" },
    ],
  },
  {
    name: "Togo", flag: "🇹🇬", code: "TG",
    providers: [
      { name: "Flooz (Moov Africa Togo)", color: "#0072CE", shortName: "FL" },
      { name: "TMoney (Togocel)", color: "#006B3F", shortName: "TM" },
      { name: "Togo Pesa", color: "#FF6600", shortName: "TP" },
    ],
  },
  {
    name: "Congo (Brazzaville)", flag: "🇨🇬", code: "CG",
    providers: [
      { name: "MTN MoMo Congo", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Airtel Money Congo", color: "#ED1C24", shortName: "AM" },
      { name: "Moov Money Congo", color: "#0072CE", shortName: "MV" },
    ],
  },
  {
    name: "DR Congo", flag: "🇨🇩", code: "CD",
    providers: [
      { name: "M-Pesa DRC (Vodacom)", color: "#E60000", shortName: "MP" },
      { name: "Airtel Money DRC", color: "#ED1C24", shortName: "AM" },
      { name: "Orange Money DRC", color: "#FF6600", shortName: "OM" },
      { name: "Africell Money DRC", color: "#003366", shortName: "AC" },
    ],
  },
  {
    name: "Angola", flag: "🇦🇴", code: "AO",
    providers: [
      { name: "Unitel Money", color: "#FF6600", shortName: "UM" },
      { name: "Africell Money Angola", color: "#003366", shortName: "AC" },
      { name: "AfriMoney (Movicel)", color: "#006B3F", shortName: "AF" },
    ],
  },
  {
    name: "Zimbabwe", flag: "🇿🇼", code: "ZW",
    providers: [
      { name: "EcoCash (Econet)", color: "#006B3F", shortName: "EC" },
      { name: "OneMoney (NetOne)", color: "#0072CE", shortName: "OM" },
      { name: "Telecash (Telecel)", color: "#E60000", shortName: "TC" },
    ],
  },
  {
    name: "Botswana", flag: "🇧🇼", code: "BW",
    providers: [
      { name: "MyZaka (Mascom)", color: "#0072CE", shortName: "MZ" },
      { name: "Orange Money Botswana", color: "#FF6600", shortName: "OM" },
      { name: "Smega (BTC)", color: "#003366", shortName: "SM" },
    ],
  },
  {
    name: "Namibia", flag: "🇳🇦", code: "NA",
    providers: [
      { name: "MTC Money", color: "#FFCC00", textColor: "#000", shortName: "MC" },
      { name: "EasyWallet (Bank Windhoek)", color: "#003366", shortName: "EW" },
      { name: "Telecom Namibia e-Wallet", color: "#0072CE", shortName: "TN" },
    ],
  },
  {
    name: "Malawi", flag: "🇲🇼", code: "MW",
    providers: [
      { name: "Airtel Money Malawi", color: "#ED1C24", shortName: "AM" },
      { name: "TNM Mpamba", color: "#0072CE", shortName: "TM" },
    ],
  },
  {
    name: "Lesotho", flag: "🇱🇸", code: "LS",
    providers: [
      { name: "M-Pesa Lesotho (Vodacom)", color: "#E60000", shortName: "MP" },
      { name: "Econet Lesotho eMoney", color: "#006B3F", shortName: "EL" },
    ],
  },
  {
    name: "Eswatini", flag: "🇸🇿", code: "SZ",
    providers: [
      { name: "MTN MoMo Eswatini", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "E-Mali (Eswatini Mobile)", color: "#006B3F", shortName: "EM" },
    ],
  },
  {
    name: "Madagascar", flag: "🇲🇬", code: "MG",
    providers: [
      { name: "MVola (Telma)", color: "#FF6600", shortName: "MV" },
      { name: "Airtel Money Madagascar", color: "#ED1C24", shortName: "AM" },
      { name: "Orange Money Madagascar", color: "#FF6600", shortName: "OM" },
    ],
  },
  {
    name: "Mauritius", flag: "🇲🇺", code: "MU",
    providers: [
      { name: "MyT Money (Mauritius Telecom)", color: "#0072CE", shortName: "MT" },
      { name: "Juice (MCB Group)", color: "#FF4500", shortName: "JC" },
      { name: "MYT (Emtel Pay)", color: "#006B3F", shortName: "MY" },
    ],
  },
  {
    name: "Réunion / Mayotte", flag: "🇷🇪", code: "RE",
    providers: [
      { name: "Orange Money (DOM-COM)", color: "#FF6600", shortName: "OM" },
    ],
  },
  {
    name: "Ethiopia", flag: "🇪🇹", code: "ET",
    providers: [
      { name: "Telebirr (Ethio Telecom)", color: "#006B3F", shortName: "TB" },
      { name: "Amole (Dashen Bank)", color: "#0072CE", shortName: "AL" },
      { name: "CBEBirr", color: "#8B0000", shortName: "CB" },
      { name: "HelloCash", color: "#FFB800", textColor: "#000", shortName: "HC" },
    ],
  },
  {
    name: "Somalia / South Sudan", flag: "🇸🇴", code: "SO",
    providers: [
      { name: "EVC Plus (Hormuud)", color: "#FF6600", shortName: "EV" },
      { name: "Zaad (Telesom)", color: "#006B3F", shortName: "ZD" },
      { name: "E-Dahab (Golis)", color: "#FFB800", textColor: "#000", shortName: "ED" },
      { name: "DigiCash (South Sudan)", color: "#0072CE", shortName: "DC" },
      { name: "MoMo (MTN South Sudan)", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
    ],
  },
  {
    name: "Sudan", flag: "🇸🇩", code: "SD",
    providers: [
      { name: "MTN MoMo Sudan", color: "#FFCC00", textColor: "#000", shortName: "MTN" },
      { name: "Zain Cash Sudan", color: "#6C3BF5", shortName: "ZC" },
    ],
  },
  {
    name: "Djibouti", flag: "🇩🇯", code: "DJ",
    providers: [
      { name: "D-Money (Djibouti Telecom)", color: "#006B3F", shortName: "DM" },
    ],
  },
  {
    name: "Comoros", flag: "🇰🇲", code: "KM",
    providers: [
      { name: "Huri Money (Comores Telecom)", color: "#0072CE", shortName: "HM" },
    ],
  },
  {
    name: "Cabo Verde", flag: "🇨🇻", code: "CV",
    providers: [
      { name: "MVola (CV Móvel)", color: "#FF6600", shortName: "MV" },
    ],
  },
  {
    name: "São Tomé and Príncipe", flag: "🇸🇹", code: "ST",
    providers: [
      { name: "e-Kwanza (CST)", color: "#006B3F", shortName: "eK" },
    ],
  },
  {
    name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ",
    providers: [
      { name: "Orange Money Equatorial Guinea", color: "#FF6600", shortName: "OM" },
    ],
  },
  {
    name: "Gabon", flag: "🇬🇦", code: "GA",
    providers: [
      { name: "Airtel Money Gabon", color: "#ED1C24", shortName: "AM" },
      { name: "Moov Money Gabon", color: "#0072CE", shortName: "MV" },
    ],
  },
  {
    name: "Mauritania", flag: "🇲🇷", code: "MR",
    providers: [
      { name: "Masrvi (Mauritel)", color: "#006B3F", shortName: "MS" },
      { name: "Orange Money Mauritania", color: "#FF6600", shortName: "OM" },
      { name: "Mattel Money", color: "#0072CE", shortName: "MM" },
    ],
  },
  {
    name: "Libya", flag: "🇱🇾", code: "LY",
    providers: [
      { name: "Tadawul", color: "#003366", shortName: "TD" },
    ],
  },
];
