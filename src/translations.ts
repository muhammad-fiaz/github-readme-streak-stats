/**
 * Locales and Translations
 *
 * Ported from PHP github-readme-streak-stats
 */

export interface TranslationStrings {
  "Total Contributions": string;
  "Current Streak": string;
  "Longest Streak": string;
  "Week Streak": string;
  "Longest Week Streak": string;
  Present: string;
  days?: string;
  weeks?: string;
  "Excluding {days}": string;
  rtl?: boolean;
  date_format?: string;
  comma_separator?: string;
}

type TranslationRegistry = Record<string, TranslationStrings | string>;

export const TRANSLATIONS: TranslationRegistry = {
  // "en" is the default locale
  en: {
    "Total Contributions": "Total Contributions",
    "Current Streak": "Current Streak",
    "Longest Streak": "Longest Streak",
    "Week Streak": "Week Streak",
    "Longest Week Streak": "Longest Week Streak",
    Present: "Present",
    days: "days",
    weeks: "weeks",
    "Excluding {days}": "Excluding {days}",
  },
  // Locales below are sorted alphabetically
  am: {
    "Total Contributions": "ጠቅላላ አስተዋጽዖዎች",
    "Current Streak": "የአሁን ድግግሞሽ",
    "Longest Streak": "በጣም ረጅሙ ድግግሞሽ",
    "Week Streak": "የሳምንት ድግግሞሽ",
    "Longest Week Streak": "በጣም ረጅሙ የሳምንት ድግግሞሽ",
    Present: "ያሁኑ",
    days: "ቀናት",
    weeks: "ሳምንታት",
    "Excluding {days}": "ሳይጨምር {days}",
  },
  ar: {
    rtl: true,
    "Total Contributions": "إجمالي المساهمات",
    "Current Streak": "السلسلة المتتالية الحالية",
    "Longest Streak": "أُطول سلسلة متتالية",
    "Week Streak": "السلسلة المتتالية الأُسبوعية",
    "Longest Week Streak": "أُطول سلسلة متتالية أُسبوعية",
    Present: "الحاضر",
    days: "أيام",
    weeks: "أسابيع",
    "Excluding {days}": "باستثناء {days}",
    comma_separator: "، ",
  },
  bg: {
    "Total Contributions": "Общ принос",
    "Current Streak": "Дневна серия",
    "Longest Streak": "Най-дълга дневна серия",
    "Week Streak": "Седмична серия",
    "Longest Week Streak": "Най-дълга седмична серия",
    Present: "Сега",
    days: "дни",
    weeks: "седмици",
    "Excluding {days}": "Изключвайки {days}",
  },
  bn: {
    "Total Contributions": "মোট অবদান",
    "Current Streak": "বর্তমান স্ট্রিক",
    "Longest Streak": "দীর্ঘতম স্ট্রিক",
    "Week Streak": "সপ্তাহ স্ট্রিক",
    "Longest Week Streak": "দীর্ঘতম সপ্তাহ স্ট্রিক",
    Present: "বর্তমান",
    "Excluding {days}": "{days} বাদে",
  },
  ca: {
    "Total Contributions": "Aportacions totals",
    "Current Streak": "Ratxa actual",
    "Longest Streak": "Ratxa més llarga",
    "Week Streak": "Ratxa setmanal",
    "Longest Week Streak": "Ratxa setmanal més llarga",
    Present: "Actual",
    "Excluding {days}": "Excloent {days}",
  },
  da: {
    "Total Contributions": "Samlet antal bidrag",
    "Current Streak": "Bidrag i træk",
    "Longest Streak": "Flest bidrag i træk",
    "Week Streak": "Ugentlige bidrag i træk",
    "Longest Week Streak": "Flest ugentlige bidrag i træk",
    Present: "Nuværende",
    "Excluding {days}": "Ekskluderer {days}",
  },
  de: {
    "Total Contributions": "Gesamte Beiträge",
    "Current Streak": "Aktuelle Serie",
    "Longest Streak": "Längste Serie",
    "Week Streak": "Wochenserie",
    "Longest Week Streak": "Längste Wochenserie",
    Present: "Heute",
    "Excluding {days}": "Ausgenommen {days}",
  },
  el: {
    "Total Contributions": "Συνολικές Συνεισφορές",
    "Current Streak": "Τρέχουσα Σειρά",
    "Longest Streak": "Μεγαλύτερη Σειρά",
    "Week Streak": "Εβδομαδιαία Σειρά",
    "Longest Week Streak": "Μεγαλύτερη Εβδομαδιαία Σειρά",
    Present: "Σήμερα",
    "Excluding {days}": "Εξαιρούνται {days}",
  },
  es: {
    "Total Contributions": "Contribuciones Totales",
    "Current Streak": "Racha Actual",
    "Longest Streak": "Racha Más Larga",
    "Week Streak": "Racha Semanal",
    "Longest Week Streak": "Racha Semanal Más Larga",
    Present: "Presente",
    "Excluding {days}": "Excluyendo {days}",
  },
  fa: {
    rtl: true,
    "Total Contributions": "مجموع مشارکت ها",
    "Current Streak": "پی‌رفت فعلی",
    "Longest Streak": "طولانی ترین پی‌رفت",
    "Week Streak": "پی‌رفت هفته",
    "Longest Week Streak": "طولانی ترین پی‌رفت هفته",
    Present: "اکنون",
    "Excluding {days}": "{days} مستثنی کردن",
    comma_separator: "، ",
  },
  fr: {
    "Total Contributions": "Contributions totales",
    "Current Streak": "Séquence actuelle",
    "Longest Streak": "Plus longue séquence",
    "Week Streak": "Séquence de la semaine",
    "Longest Week Streak": "Plus longue séquence hebdomadaire",
    Present: "Aujourd'hui",
    "Excluding {days}": "À l'exclusion de {days}",
  },
  he: {
    rtl: true,
    "Total Contributions": "סכום התרומות",
    "Current Streak": "רצף נוכחי",
    "Longest Streak": "רצף הכי ארוך",
    "Week Streak": "רצף שבועי",
    "Longest Week Streak": "רצף שבועי הכי ארוך",
    Present: "היום",
    "Excluding {days}": "לא כולל {days}",
  },
  hi: {
    "Total Contributions": "कुल योगदान",
    "Current Streak": "निरंतर दैनिक योगदान",
    "Longest Streak": "सबसे लंबा दैनिक योगदान",
    "Week Streak": "सप्ताहिक योगदान",
    "Longest Week Streak": "दीर्घ साप्ताहिक योगदान",
    Present: "आज तक",
    "Excluding {days}": "के सिवा {days}",
  },
  hu: {
    "Total Contributions": "Összes hozzájárulás",
    "Current Streak": "Jelenlegi sorozat",
    "Longest Streak": "Leghosszabb sorozat",
    "Week Streak": "Heti sorozat",
    "Longest Week Streak": "Leghosszabb heti sorozat",
    Present: "Jelen",
    "Excluding {days}": "Kivéve {days}",
  },
  id: {
    "Total Contributions": "Total Kontribusi",
    "Current Streak": "Aksi Saat Ini",
    "Longest Streak": "Aksi Terpanjang",
    "Week Streak": "Aksi Mingguan",
    "Longest Week Streak": "Aksi Mingguan Terpanjang",
    Present: "Sekarang",
    "Excluding {days}": "Kecuali {days}",
  },
  it: {
    "Total Contributions": "Contributi Totali",
    "Current Streak": "Serie Corrente",
    "Longest Streak": "Serie più Lunga",
    "Week Streak": "Serie Settimanale",
    "Longest Week Streak": "Serie Settimanale più Lunga",
    Present: "Presente",
    "Excluding {days}": "Escludendo {days}",
  },
  ja: {
    date_format: "[Y.]n.j",
    "Total Contributions": "総ｺﾝﾄﾘﾋﾞｭｰｼｮﾝ数",
    "Current Streak": "現在のストリーク",
    "Longest Streak": "最長のストリーク",
    "Week Streak": "週間ストリーク",
    "Longest Week Streak": "最長の週間ストリーク",
    Present: "今",
    "Excluding {days}": "{days}を除く",
    comma_separator: "・",
  },
  ko: {
    "Total Contributions": "총 기여 수",
    "Current Streak": "현재 연속 기여 수",
    "Longest Streak": "최장 연속 기여 수",
    "Week Streak": "주간 연속 기여 수",
    "Longest Week Streak": "최장 주간 연속 기여 수",
    Present: "현재",
    "Excluding {days}": "{days}를 제외하고",
  },
  nl: {
    "Total Contributions": "Totale Bijdrage",
    "Current Streak": "Huidige Serie",
    "Longest Streak": "Langste Serie",
    "Week Streak": "Week Serie",
    "Longest Week Streak": "Langste Week Serie",
    Present: "Vandaag",
    "Excluding {days}": "Exclusief {days}",
  },
  no: {
    "Total Contributions": "Totalt Antall Bidrag",
    "Current Streak": "Nåværende\nBidragsrekke",
    "Longest Streak": "Lengste Bidragsrekke",
    "Week Streak": "Ukentlig\nBidragsrekke",
    "Longest Week Streak": "Lengste Ukentlige\nBidragsrekke",
    Present: "I dag",
    "Excluding {days}": "Ekskluderer {days}",
  },
  pl: {
    "Total Contributions": "Suma Kontrybucji",
    "Current Streak": "Aktualna Seria",
    "Longest Streak": "Najdłuższa Seria",
    "Week Streak": "Seria Tygodni",
    "Longest Week Streak": "Najdłuższa Seria Tygodni",
    Present: "Dziś",
    "Excluding {days}": "Wykluczono {days}",
  },
  pt: {
    "Total Contributions": "Contribuições Totais",
    "Current Streak": "Sequência Atual",
    "Longest Streak": "Maior Sequência",
    "Week Streak": "Sequência da Semana",
    "Longest Week Streak": "Maior Sequência da Semana",
    Present: "Presente",
    "Excluding {days}": "Excluindo {days}",
  },
  pt_BR: {
    "Total Contributions": "Total de Contribuições",
    "Current Streak": "Sequência Atual",
    "Longest Streak": "Maior Sequência",
    "Week Streak": "Sequência Semanal",
    "Longest Week Streak": "Maior Sequência Semanal",
    Present: "Presente",
    "Excluding {days}": "Exceto {days}",
  },
  ru: {
    "Total Contributions": "Общий вклад",
    "Current Streak": "Текущая серия",
    "Longest Streak": "Самая длинная серия",
    "Week Streak": "Текущая серия недель",
    "Longest Week Streak": "Самая длинная серия недель",
    Present: "Сейчас",
    "Excluding {days}": "Не включая {days}",
  },
  sv: {
    "Total Contributions": "Totalt antal uppladningar",
    "Current Streak": "Dagar uppladdat i rad just nu",
    "Longest Streak": "Längst antal dagar uppladdat i rad",
    "Week Streak": "Antal veckor i rad",
    "Longest Week Streak": "Längst antal veckor i rad",
    Present: "Just nu",
    "Excluding {days}": "Utom {dagar}",
  },
  th: {
    "Total Contributions": "คอนทริบิ้วต์ทั้งหมด",
    "Current Streak": "สตรีคปัจจุบัน",
    "Longest Streak": "สตรีคที่ยาวนานที่สุด",
    "Week Streak": "สตรีคประจำสัปดาห์",
    "Longest Week Streak": "สตรีคประจำสัปดาห์\nที่ยาวนานที่สุด",
    Present: "ปัจจุบัน",
    "Excluding {days}": "ยกเว้น {days}",
  },
  tr: {
    "Total Contributions": "Toplam Katkı",
    "Current Streak": "Güncel Seri",
    "Longest Streak": "En Uzun Seri",
    "Week Streak": "Haftalık Seri",
    "Longest Week Streak": "En Uzun Haftalık Seri",
    Present: "Şu an",
    "Excluding {days}": "Hariç {days}",
  },
  uk: {
    "Total Contributions": "Загальний вклад",
    "Current Streak": "Поточна діяльність",
    "Longest Streak": "Найдовша діяльність",
    "Week Streak": "Діяльність за тиждень",
    "Longest Week Streak": "Найбільша к-сть тижнів",
    Present: "Наразі",
    "Excluding {days}": "Виключаючи {days}",
  },
  vi: {
    "Total Contributions": "Tổng số đóng góp",
    "Current Streak": "Chuỗi đóng góp\nhiện tại",
    "Longest Streak": "Chuỗi đóng góp lớn nhất",
    "Week Streak": "Chuỗi tuần",
    "Longest Week Streak": "Chuỗi tuần lớn nhất",
    Present: "Hiện tại",
    "Excluding {days}": "Ngoại trừ {days}",
  },
  zh: "zh_Hans",
  zh_Hans: {
    "Total Contributions": "合计贡献",
    "Current Streak": "目前连续贡献",
    "Longest Streak": "最长连续贡献",
    "Week Streak": "周连续贡献",
    "Longest Week Streak": "最长周连续贡献",
    Present: "至今",
    "Excluding {days}": "除外 {days}",
    comma_separator: "、",
  },
  zh_Hant: {
    "Total Contributions": "合計貢獻",
    "Current Streak": "目前連續貢獻",
    "Longest Streak": "最長連續貢獻",
    "Week Streak": "周連續貢獻",
    "Longest Week Streak": "最長周連續貢獻",
    Present: "至今",
    "Excluding {days}": "除外 {days}",
    comma_separator: "、",
  },
};

/**
 * Normalize a locale code
 */
export function normalizeLocaleCode(localeCode: string): string {
  const match = localeCode.match(
    /^([a-z]{2,3})(?:[_-]([a-z]{4}))?(?:[_-]([0-9]{3}|[a-z]{2}))?$/i,
  );
  if (!match || !match[1]) {
    return "en";
  }

  const language = match[1].toLowerCase();
  const script = match[2]
    ? match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase()
    : "";
  const region = match[3] ? match[3].toUpperCase() : "";

  return [language, script, region].filter(Boolean).join("_");
}

/**
 * Get translations for a locale code
 */
export function getTranslations(localeCode: string): TranslationStrings {
  const normalized = normalizeLocaleCode(localeCode);

  let translation = TRANSLATIONS[normalized];

  // Handle alias (string pointing to another locale)
  if (typeof translation === "string") {
    translation = TRANSLATIONS[translation] as TranslationStrings;
  }

  // If not found, try without script/region
  if (!translation) {
    const baseLang = normalized.split("_")[0] || "en";
    translation = TRANSLATIONS[baseLang] as TranslationStrings;
    if (typeof translation === "string") {
      translation = TRANSLATIONS[translation] as TranslationStrings;
    }
  }

  // Default to English
  const en = TRANSLATIONS.en as TranslationStrings;

  if (!translation) {
    return en;
  }

  // Merge with English defaults
  return { ...en, ...translation };
}

/**
 * Format a date for display
 */
export function formatDate(
  dateString: string,
  _dateFormat: string = "M j[, Y]",
  locale: string = "en",
): string {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  try {
    // If same year, show only month and day
    if (dateYear === currentYear) {
      return date.toLocaleDateString(locale.replace("_", "-"), {
        month: "short",
        day: "numeric",
      });
    }
    // Different year, show full date
    return date.toLocaleDateString(locale.replace("_", "-"), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    // Fallback to basic format
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    if (dateYear === currentYear) {
      return `${month} ${day}`;
    }
    return `${month} ${day}, ${dateYear}`;
  }
}

/**
 * Format a date range
 */
export function formatDateRange(
  start: string,
  end: string,
  locale: string = "en",
  presentText: string = "Present",
): string {
  const startFormatted = formatDate(start, locale);
  const endFormatted =
    end === "Present" ? presentText : formatDate(end, locale);

  if (startFormatted === endFormatted) {
    return startFormatted;
  }
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Format a number with locale-specific formatting
 */
export function formatNumber(
  num: number,
  locale: string = "en",
  useShortNumbers: boolean = false,
): string {
  if (useShortNumbers) {
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;
    let value = num;

    while (value >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }

    const formatted =
      unitIndex > 0 ? value.toFixed(1).replace(/\.0$/, "") : value.toString();
    return formatted + units[unitIndex];
  }

  try {
    return num.toLocaleString(locale.replace("_", "-"));
  } catch {
    return num.toLocaleString();
  }
}
