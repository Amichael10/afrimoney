export interface Provider {
  name: string;
  color: string;
  textColor?: string;
  shortName?: string;
  domain?: string; // for logo fetching
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
      { name: "OPay", color: "#1DBF73", shortName: "OP", domain: "opayweb.com" },
      { name: "Palmpay", color: "#6C3BF5", shortName: "PP", domain: "palmpay.com" },
      { name: "Kuda", color: "#40196D", shortName: "K", domain: "kuda.com" },
      { name: "Moniepoint", color: "#0066FF", shortName: "MP", domain: "moniepoint.com" },
      { name: "MTN MoMo (MoMo PSB)", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com" },
      { name: "Airtel Money (SmartCash PSB)", color: "#ED1C24", shortName: "AM", domain: "airtel.com.ng" },
      { name: "9PSB (9mobile)", color: "#006B3F", shortName: "9P", domain: "9psb.com.ng" },
      { name: "Carbon", color: "#00C2B2", shortName: "C", domain: "getcarbon.co" },
      { name: "Fairmoney", color: "#00B5E2", shortName: "FM", domain: "fairmoney.io" },
    ],
  },
  {
    name: "Kenya", flag: "🇰🇪", code: "KE",
    providers: [
      { name: "M-Pesa (Safaricom)", color: "#4CAF50", shortName: "MP", domain: "safaricom.co.ke" },
      { name: "Airtel Money Kenya", color: "#ED1C24", shortName: "AM", domain: "airtel.co.ke" },
      { name: "T-Kash (Telkom Kenya)", color: "#00AEEF", shortName: "TK", domain: "telkom.co.ke" },
      { name: "Equitel (Equity Bank)", color: "#8B0000", shortName: "EQ", domain: "equitygroupholdings.com" },
    ],
  },
  {
    name: "Ghana", flag: "🇬🇭", code: "GH",
    providers: [
      { name: "MTN MoMo Ghana", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com.gh" },
      { name: "AirtelTigo Money", color: "#ED1C24", shortName: "AT", domain: "airteltigo.com.gh" },
      { name: "Telecel Cash", color: "#E60000", shortName: "TC", domain: "telecelgh.com" },
    ],
  },
  {
    name: "Tanzania", flag: "🇹🇿", code: "TZ",
    providers: [
      { name: "M-Pesa Tanzania (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.co.tz" },
      { name: "Airtel Money Tanzania", color: "#ED1C24", shortName: "AM", domain: "airtel.co.tz" },
      { name: "Tigo Pesa", color: "#004B93", shortName: "TP", domain: "tigo.co.tz" },
      { name: "HaloPesa (Halotel)", color: "#FF6600", shortName: "HP", domain: "halotel.co.tz" },
      { name: "TTCL M-Pesa", color: "#003366", shortName: "TM", domain: "ttcl.co.tz" },
    ],
  },
  {
    name: "Uganda", flag: "🇺🇬", code: "UG",
    providers: [
      { name: "MTN MoMo Uganda", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.ug" },
      { name: "Airtel Money Uganda", color: "#ED1C24", shortName: "AM", domain: "airtel.co.ug" },
    ],
  },
  {
    name: "Rwanda", flag: "🇷🇼", code: "RW",
    providers: [
      { name: "MTN MoMo Rwanda", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.rw" },
      { name: "Airtel Money Rwanda", color: "#ED1C24", shortName: "AM", domain: "airtel.com.rw" },
    ],
  },
  {
    name: "South Africa", flag: "🇿🇦", code: "ZA",
    providers: [
      { name: "MTN MoMo South Africa", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.za" },
      { name: "Vodacom M-Pesa", color: "#E60000", shortName: "VP", domain: "vodacom.co.za" },
      { name: "Capitec Pay", color: "#003B70", shortName: "CP", domain: "capitecbank.co.za" },
      { name: "TymeBank", color: "#FFD700", textColor: "#000", shortName: "TB", domain: "tymebank.co.za" },
      { name: "1voucher", color: "#FF4500", shortName: "1V", domain: "1voucher.co.za" },
    ],
  },
  {
    name: "Egypt", flag: "🇪🇬", code: "EG",
    providers: [
      { name: "Vodafone Cash", color: "#E60000", shortName: "VC", domain: "vodafone.com.eg" },
      { name: "Etisalat Cash (e& money)", color: "#006B3F", shortName: "EC", domain: "etisalat.eg" },
      { name: "Orange Money Egypt", color: "#FF6600", shortName: "OM", domain: "orange.eg" },
      { name: "Fawry", color: "#FFB800", textColor: "#000", shortName: "FW", domain: "fawry.com" },
      { name: "WE Pay (Telecom Egypt)", color: "#6C3BF5", shortName: "WP", domain: "te.eg" },
      { name: "InstaPay", color: "#0066FF", shortName: "IP", domain: "instapay.eg" },
    ],
  },
  {
    name: "Senegal", flag: "🇸🇳", code: "SN",
    providers: [
      { name: "Orange Money Senegal", color: "#FF6600", shortName: "OM", domain: "orange.sn" },
      { name: "Free Money", color: "#CD1719", shortName: "FM", domain: "free.sn" },
      { name: "Wave Senegal", color: "#1B2A4A", shortName: "WV", domain: "wave.com" },
      { name: "Wari", color: "#0072CE", shortName: "WR", domain: "wari.com" },
      { name: "Wizall Money", color: "#00B5E2", shortName: "WZ", domain: "wizall.com" },
      { name: "E-Money (Expresso)", color: "#FF9900", shortName: "EM", domain: "expressotelecom.com" },
    ],
  },
  {
    name: "Côte d'Ivoire", flag: "🇨🇮", code: "CI",
    providers: [
      { name: "MTN MoMo Côte d'Ivoire", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.ci" },
      { name: "Orange Money Côte d'Ivoire", color: "#FF6600", shortName: "OM", domain: "orange.ci" },
      { name: "Wave Côte d'Ivoire", color: "#1B2A4A", shortName: "WV", domain: "wave.com" },
      { name: "Moov Money Côte d'Ivoire", color: "#0072CE", shortName: "MV", domain: "moov-africa.ci" },
      { name: "YAS (MTN)", color: "#FFCC00", textColor: "#000", shortName: "YAS", domain: "mtn.ci" },
    ],
  },
  {
    name: "Cameroon", flag: "🇨🇲", code: "CM",
    providers: [
      { name: "MTN MoMo Cameroon", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.cm" },
      { name: "Orange Money Cameroon", color: "#FF6600", shortName: "OM", domain: "orange.cm" },
    ],
  },
  {
    name: "Zambia", flag: "🇿🇲", code: "ZM",
    providers: [
      { name: "MTN MoMo Zambia", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.zm" },
      { name: "Airtel Money Zambia", color: "#ED1C24", shortName: "AM", domain: "airtel.com.zm" },
      { name: "Zamtel Kwacha", color: "#006B3F", shortName: "ZK", domain: "zamtel.co.zm" },
      { name: "SpreadIt (Zoona)", color: "#00B5E2", shortName: "SI", domain: "zoona.com" },
    ],
  },
  {
    name: "Mozambique", flag: "🇲🇿", code: "MZ",
    providers: [
      { name: "M-Pesa Mozambique (Vodacom)", color: "#E60000", shortName: "MP", domain: "vm.co.mz" },
      { name: "Airtel Money Mozambique", color: "#ED1C24", shortName: "AM", domain: "airtel.co.mz" },
      { name: "e-Mola (Movitel)", color: "#FF6600", shortName: "eM", domain: "movitel.co.mz" },
    ],
  },
  {
    name: "Morocco", flag: "🇲🇦", code: "MA",
    providers: [
      { name: "CIH Pay", color: "#C8102E", shortName: "CH", domain: "cihbank.ma" },
      { name: "Orange Money Morocco", color: "#FF6600", shortName: "OM", domain: "orange.ma" },
      { name: "Inwi Money", color: "#6C3BF5", shortName: "IW", domain: "inwi.ma" },
      { name: "M Walletee (Maroc Telecom)", color: "#0072CE", shortName: "MW", domain: "iam.ma" },
    ],
  },
  {
    name: "Algeria", flag: "🇩🇿", code: "DZ",
    providers: [
      { name: "BaridiMob (Algérie Poste)", color: "#FFB800", textColor: "#000", shortName: "BM", domain: "poste.dz" },
      { name: "EDAHABIA", color: "#006B3F", shortName: "ED", domain: "poste.dz" },
    ],
  },
  {
    name: "Tunisia", flag: "🇹🇳", code: "TN",
    providers: [
      { name: "Sobflous (Orange)", color: "#FF6600", shortName: "SF", domain: "orange.tn" },
      { name: "TTMoney (Tunisie Telecom)", color: "#0072CE", shortName: "TT", domain: "tunisietelecom.tn" },
      { name: "Ooredoo Money", color: "#ED1C24", shortName: "OO", domain: "ooredoo.tn" },
    ],
  },
  {
    name: "Mali", flag: "🇲🇱", code: "ML",
    providers: [
      { name: "Orange Money Mali", color: "#FF6600", shortName: "OM", domain: "orange.ml" },
      { name: "Moov Money Mali", color: "#0072CE", shortName: "MV", domain: "moov-africa.ml" },
      { name: "Wave Mali", color: "#1B2A4A", shortName: "WV", domain: "wave.com" },
    ],
  },
  {
    name: "Burkina Faso", flag: "🇧🇫", code: "BF",
    providers: [
      { name: "Orange Money Burkina Faso", color: "#FF6600", shortName: "OM", domain: "orange.bf" },
      { name: "Moov Money Burkina Faso", color: "#0072CE", shortName: "MV", domain: "moov-africa.bf" },
      { name: "Wave Burkina Faso", color: "#1B2A4A", shortName: "WV", domain: "wave.com" },
      { name: "Airtel Money Burkina Faso", color: "#ED1C24", shortName: "AM", domain: "airtel.bf" },
    ],
  },
  {
    name: "Niger", flag: "🇳🇪", code: "NE",
    providers: [
      { name: "Airtel Money Niger", color: "#ED1C24", shortName: "AM", domain: "airtel.ne" },
      { name: "Orange Money Niger", color: "#FF6600", shortName: "OM", domain: "orange.ne" },
      { name: "Moov Money Niger", color: "#0072CE", shortName: "MV", domain: "moov-africa.ne" },
    ],
  },
  {
    name: "Chad", flag: "🇹🇩", code: "TD",
    providers: [
      { name: "Airtel Money Chad", color: "#ED1C24", shortName: "AM", domain: "airtel.td" },
      { name: "Moov Money Chad", color: "#0072CE", shortName: "MV", domain: "moov-africa.td" },
      { name: "Tigo Cash Chad", color: "#004B93", shortName: "TC", domain: "tigo.td" },
    ],
  },
  {
    name: "Guinea (Conakry)", flag: "🇬🇳", code: "GN",
    providers: [
      { name: "Orange Money Guinea", color: "#FF6600", shortName: "OM", domain: "orange.gn" },
      { name: "MTN MoMo Guinea", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com.gn" },
      { name: "Cellcom Money", color: "#0072CE", shortName: "CM", domain: "cellcom.gn" },
    ],
  },
  {
    name: "Guinea-Bissau", flag: "🇬🇼", code: "GW",
    providers: [
      { name: "Orange Money Guinea-Bissau", color: "#FF6600", shortName: "OM", domain: "orange.gw" },
      { name: "Moov Money Guinea-Bissau", color: "#0072CE", shortName: "MV", domain: "moov-africa.gw" },
    ],
  },
  {
    name: "Sierra Leone", flag: "🇸🇱", code: "SL",
    providers: [
      { name: "Orange Money Sierra Leone", color: "#FF6600", shortName: "OM", domain: "orange.sl" },
      { name: "Africell Money", color: "#003366", shortName: "AC", domain: "africell.com" },
      { name: "Qmoney (Airtel)", color: "#ED1C24", shortName: "QM", domain: "airtel.sl" },
    ],
  },
  {
    name: "Liberia", flag: "🇱🇷", code: "LR",
    providers: [
      { name: "Lonestar Cell MTN MoMo", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "lonestarcell.com" },
      { name: "Orange Money Liberia", color: "#FF6600", shortName: "OM", domain: "orange.lr" },
    ],
  },
  {
    name: "Gambia", flag: "🇬🇲", code: "GM",
    providers: [
      { name: "Africell Money Gambia", color: "#003366", shortName: "AC", domain: "africell.gm" },
      { name: "QMoney (Gamcel)", color: "#006B3F", shortName: "QM", domain: "gamcel.gm" },
      { name: "Wave Gambia", color: "#1B2A4A", shortName: "WV", domain: "wave.com" },
    ],
  },
  {
    name: "Benin", flag: "🇧🇯", code: "BJ",
    providers: [
      { name: "MTN MoMo Benin", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.bj" },
      { name: "Moov Money Benin", color: "#0072CE", shortName: "MV", domain: "moov-africa.bj" },
    ],
  },
  {
    name: "Togo", flag: "🇹🇬", code: "TG",
    providers: [
      { name: "Flooz (Moov Africa Togo)", color: "#0072CE", shortName: "FL", domain: "moov-africa.tg" },
      { name: "TMoney (Togocel)", color: "#006B3F", shortName: "TM", domain: "togocel.tg" },
      { name: "Togo Pesa", color: "#FF6600", shortName: "TP" },
    ],
  },
  {
    name: "Congo (Brazzaville)", flag: "🇨🇬", code: "CG",
    providers: [
      { name: "MTN MoMo Congo", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.cg" },
      { name: "Airtel Money Congo", color: "#ED1C24", shortName: "AM", domain: "airtel.cg" },
      { name: "Moov Money Congo", color: "#0072CE", shortName: "MV", domain: "moov-africa.cg" },
    ],
  },
  {
    name: "DR Congo", flag: "🇨🇩", code: "CD",
    providers: [
      { name: "M-Pesa DRC (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.cd" },
      { name: "Airtel Money DRC", color: "#ED1C24", shortName: "AM", domain: "airtel.cd" },
      { name: "Orange Money DRC", color: "#FF6600", shortName: "OM", domain: "orange.cd" },
      { name: "Africell Money DRC", color: "#003366", shortName: "AC", domain: "africell.cd" },
    ],
  },
  {
    name: "Angola", flag: "🇦🇴", code: "AO",
    providers: [
      { name: "Unitel Money", color: "#FF6600", shortName: "UM", domain: "unitel.co.ao" },
      { name: "Africell Money Angola", color: "#003366", shortName: "AC", domain: "africell.ao" },
      { name: "AfriMoney (Movicel)", color: "#006B3F", shortName: "AF", domain: "movicel.co.ao" },
    ],
  },
  {
    name: "Zimbabwe", flag: "🇿🇼", code: "ZW",
    providers: [
      { name: "EcoCash (Econet)", color: "#006B3F", shortName: "EC", domain: "econet.co.zw" },
      { name: "OneMoney (NetOne)", color: "#0072CE", shortName: "OM", domain: "netone.co.zw" },
      { name: "Telecash (Telecel)", color: "#E60000", shortName: "TC", domain: "telecel.co.zw" },
    ],
  },
  {
    name: "Botswana", flag: "🇧🇼", code: "BW",
    providers: [
      { name: "MyZaka (Mascom)", color: "#0072CE", shortName: "MZ", domain: "mascom.bw" },
      { name: "Orange Money Botswana", color: "#FF6600", shortName: "OM", domain: "orange.co.bw" },
      { name: "Smega (BTC)", color: "#003366", shortName: "SM", domain: "btc.bw" },
    ],
  },
  {
    name: "Namibia", flag: "🇳🇦", code: "NA",
    providers: [
      { name: "MTC Money", color: "#FFCC00", textColor: "#000", shortName: "MC", domain: "mtc.com.na" },
      { name: "EasyWallet (Bank Windhoek)", color: "#003366", shortName: "EW", domain: "bankwindhoek.com.na" },
      { name: "Telecom Namibia e-Wallet", color: "#0072CE", shortName: "TN", domain: "telecom.na" },
    ],
  },
  {
    name: "Malawi", flag: "🇲🇼", code: "MW",
    providers: [
      { name: "Airtel Money Malawi", color: "#ED1C24", shortName: "AM", domain: "airtel.mw" },
      { name: "TNM Mpamba", color: "#0072CE", shortName: "TM", domain: "tnm.co.mw" },
    ],
  },
  {
    name: "Lesotho", flag: "🇱🇸", code: "LS",
    providers: [
      { name: "M-Pesa Lesotho (Vodacom)", color: "#E60000", shortName: "MP", domain: "vodacom.co.ls" },
      { name: "Econet Lesotho eMoney", color: "#006B3F", shortName: "EL", domain: "econet.co.ls" },
    ],
  },
  {
    name: "Eswatini", flag: "🇸🇿", code: "SZ",
    providers: [
      { name: "MTN MoMo Eswatini", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.co.sz" },
      { name: "E-Mali (Eswatini Mobile)", color: "#006B3F", shortName: "EM", domain: "swazimobile.co.sz" },
    ],
  },
  {
    name: "Madagascar", flag: "🇲🇬", code: "MG",
    providers: [
      { name: "MVola (Telma)", color: "#FF6600", shortName: "MV", domain: "telma.mg" },
      { name: "Airtel Money Madagascar", color: "#ED1C24", shortName: "AM", domain: "airtel.mg" },
      { name: "Orange Money Madagascar", color: "#FF6600", shortName: "OM", domain: "orange.mg" },
    ],
  },
  {
    name: "Mauritius", flag: "🇲🇺", code: "MU",
    providers: [
      { name: "MyT Money (Mauritius Telecom)", color: "#0072CE", shortName: "MT", domain: "mauritiustelecom.com" },
      { name: "Juice (MCB Group)", color: "#FF4500", shortName: "JC", domain: "mcb.mu" },
      { name: "MYT (Emtel Pay)", color: "#006B3F", shortName: "MY", domain: "emtel.com" },
    ],
  },
  {
    name: "Réunion / Mayotte", flag: "🇷🇪", code: "RE",
    providers: [
      { name: "Orange Money (DOM-COM)", color: "#FF6600", shortName: "OM", domain: "orange.re" },
    ],
  },
  {
    name: "Ethiopia", flag: "🇪🇹", code: "ET",
    providers: [
      { name: "Telebirr (Ethio Telecom)", color: "#006B3F", shortName: "TB", domain: "ethiotelecom.et" },
      { name: "Amole (Dashen Bank)", color: "#0072CE", shortName: "AL", domain: "dashenbanksc.com" },
      { name: "CBEBirr", color: "#8B0000", shortName: "CB", domain: "combanketh.et" },
      { name: "HelloCash", color: "#FFB800", textColor: "#000", shortName: "HC", domain: "belcash.com" },
    ],
  },
  {
    name: "Somalia / South Sudan", flag: "🇸🇴", code: "SO",
    providers: [
      { name: "EVC Plus (Hormuud)", color: "#FF6600", shortName: "EV", domain: "hormuud.com" },
      { name: "Zaad (Telesom)", color: "#006B3F", shortName: "ZD", domain: "telesom.com" },
      { name: "E-Dahab (Golis)", color: "#FFB800", textColor: "#000", shortName: "ED", domain: "golistelecom.com" },
      { name: "DigiCash (South Sudan)", color: "#0072CE", shortName: "DC" },
      { name: "MoMo (MTN South Sudan)", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.com" },
    ],
  },
  {
    name: "Sudan", flag: "🇸🇩", code: "SD",
    providers: [
      { name: "MTN MoMo Sudan", color: "#FFCC00", textColor: "#000", shortName: "MTN", domain: "mtn.sd" },
      { name: "Zain Cash Sudan", color: "#6C3BF5", shortName: "ZC", domain: "zain.com" },
    ],
  },
  {
    name: "Djibouti", flag: "🇩🇯", code: "DJ",
    providers: [
      { name: "D-Money (Djibouti Telecom)", color: "#006B3F", shortName: "DM", domain: "djiboutitelecom.dj" },
    ],
  },
  {
    name: "Comoros", flag: "🇰🇲", code: "KM",
    providers: [
      { name: "Huri Money (Comores Telecom)", color: "#0072CE", shortName: "HM", domain: "comorestelecom.km" },
    ],
  },
  {
    name: "Cabo Verde", flag: "🇨🇻", code: "CV",
    providers: [
      { name: "MVola (CV Móvel)", color: "#FF6600", shortName: "MV", domain: "cvmovel.cv" },
    ],
  },
  {
    name: "São Tomé and Príncipe", flag: "🇸🇹", code: "ST",
    providers: [
      { name: "e-Kwanza (CST)", color: "#006B3F", shortName: "eK", domain: "cst.st" },
    ],
  },
  {
    name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ",
    providers: [
      { name: "Orange Money Equatorial Guinea", color: "#FF6600", shortName: "OM", domain: "orange.gq" },
    ],
  },
  {
    name: "Gabon", flag: "🇬🇦", code: "GA",
    providers: [
      { name: "Airtel Money Gabon", color: "#ED1C24", shortName: "AM", domain: "airtel.ga" },
      { name: "Moov Money Gabon", color: "#0072CE", shortName: "MV", domain: "moov-africa.ga" },
    ],
  },
  {
    name: "Mauritania", flag: "🇲🇷", code: "MR",
    providers: [
      { name: "Masrvi (Mauritel)", color: "#006B3F", shortName: "MS", domain: "mauritel.mr" },
      { name: "Orange Money Mauritania", color: "#FF6600", shortName: "OM", domain: "orange.mr" },
      { name: "Mattel Money", color: "#0072CE", shortName: "MM", domain: "mattel.mr" },
    ],
  },
  {
    name: "Libya", flag: "🇱🇾", code: "LY",
    providers: [
      { name: "Tadawul", color: "#003366", shortName: "TD" },
    ],
  },
  // ── Other Regions ──
  {
    name: "Myanmar", flag: "🇲🇲", code: "MM",
    providers: [
      { name: "Wave Money", color: "#FFD100", textColor: "#000", shortName: "WM", domain: "wavemoney.com.mm" },
    ],
  },
  {
    name: "South Africa (Other)", flag: "🇿🇦", code: "ZA-other",
    providers: [
      { name: "WIZZIT", color: "#7AB800", shortName: "WZ", domain: "wizzit.co.za" },
    ],
  },
  {
    name: "Zimbabwe (Other)", flag: "🇿🇼", code: "ZW-other",
    providers: [
      { name: "WIMPAY", color: "#1E3A5F", shortName: "WP", domain: "wimpay.co.zw" },
    ],
  },
  {
    name: "South Korea", flag: "🇰🇷", code: "KR",
    providers: [
      { name: "Zero Pay", color: "#FF3B30", shortName: "ZP", domain: "zeropay.or.kr" },
    ],
  },
];
