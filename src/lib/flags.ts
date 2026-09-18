/** ISO 3166-1 alpha-3 -> alpha-2, used to build flag image URLs. */
const ISO3_TO_ISO2: Record<string, string> = {
  FJI: "fj", TZA: "tz", ESH: "eh", CAN: "ca", USA: "us", KAZ: "kz", UZB: "uz",
  PNG: "pg", IDN: "id", ARG: "ar", CHL: "cl", COD: "cd", SOM: "so", KEN: "ke",
  SDN: "sd", TCD: "td", HTI: "ht", DOM: "do", RUS: "ru", BHS: "bs", FLK: "fk",
  NOR: "no", GRL: "gl", ATF: "tf", TLS: "tl", ZAF: "za", LSO: "ls", MEX: "mx",
  URY: "uy", BRA: "br", BOL: "bo", PER: "pe", COL: "co", PAN: "pa", CRI: "cr",
  NIC: "ni", HND: "hn", SLV: "sv", GTM: "gt", BLZ: "bz", VEN: "ve", GUY: "gy",
  SUR: "sr", FRA: "fr", ECU: "ec", PRI: "pr", JAM: "jm", CUB: "cu", ZWE: "zw",
  BWA: "bw", NAM: "na", SEN: "sn", MLI: "ml", MRT: "mr", BEN: "bj", NER: "ne",
  NGA: "ng", CMR: "cm", TGO: "tg", GHA: "gh", CIV: "ci", GIN: "gn", GNB: "gw",
  LBR: "lr", SLE: "sl", BFA: "bf", CAF: "cf", COG: "cg", GAB: "ga", GNQ: "gq",
  ZMB: "zm", MWI: "mw", MOZ: "mz", SWZ: "sz", AGO: "ao", BDI: "bi", ISR: "il",
  LBN: "lb", MDG: "mg", PSE: "ps", GMB: "gm", TUN: "tn", DZA: "dz", JOR: "jo",
  ARE: "ae", QAT: "qa", KWT: "kw", IRQ: "iq", OMN: "om", VUT: "vu", KHM: "kh",
  THA: "th", LAO: "la", MMR: "mm", VNM: "vn", PRK: "kp", KOR: "kr", MNG: "mn",
  IND: "in", BGD: "bd", BTN: "bt", NPL: "np", PAK: "pk", AFG: "af", TJK: "tj",
  KGZ: "kg", TKM: "tm", IRN: "ir", SYR: "sy", ARM: "am", SWE: "se", BLR: "by",
  UKR: "ua", POL: "pl", AUT: "at", HUN: "hu", MDA: "md", ROU: "ro", LTU: "lt",
  LVA: "lv", EST: "ee", DEU: "de", BGR: "bg", GRC: "gr", TUR: "tr", ALB: "al",
  HRV: "hr", CHE: "ch", LUX: "lu", BEL: "be", NLD: "nl", PRT: "pt", ESP: "es",
  IRL: "ie", NCL: "nc", SLB: "sb", NZL: "nz", AUS: "au", LKA: "lk", CHN: "cn",
  TWN: "tw", ITA: "it", DNK: "dk", GBR: "gb", ISL: "is", AZE: "az", GEO: "ge",
  PHL: "ph", MYS: "my", BRN: "bn", SVN: "si", FIN: "fi", SVK: "sk", CZE: "cz",
  ERI: "er", JPN: "jp", PRY: "py", YEM: "ye", SAU: "sa", ATA: "aq", CYP: "cy",
  MAR: "ma", EGY: "eg", LBY: "ly", ETH: "et", DJI: "dj", UGA: "ug", RWA: "rw",
  BIH: "ba", MKD: "mk", SRB: "rs", MNE: "me", TTO: "tt", SSD: "ss",
};

export function hasFlag(iso3: string) {
  return Boolean(ISO3_TO_ISO2[iso3]);
}

export function flagUrl(iso3: string, width: 160 | 320 | 640 = 320) {
  const code = ISO3_TO_ISO2[iso3];
  return code ? `https://flagcdn.com/w${width}/${code}.png` : null;
}

/** Lowercase, strip accents/punctuation so "Cote d'Ivoire" matches "Côte d’Ivoire". */
export function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
