/**
 * GitHub Streak Card Generator
 *
 * Generates an animated SVG streak card with theme support.
 * Shows: Total Contributions, Current Streak, Longest Streak
 * Matches PHP github-readme-streak-stats implementation exactly
 */

import { parseBackground } from "./parseBackground.ts";
import {
  createRenderContext,
  FIRE_ICON_PATH,
  renderLine,
  renderSVGWrapper,
  renderText,
  type SVGRenderContext,
} from "./svgRenderer.ts";
import { formatDate, formatNumber, getTranslations } from "./translations.ts";

/**
 * Streak card data
 */
export interface StreakCardData {
  /** GitHub username */
  username: string;
  /** Total contributions */
  totalContributions: number;
  /** Current streak in days */
  currentStreak: number;
  /** Longest streak in days */
  longestStreak: number;
  /** Start date of current streak */
  streakStartDate: string;
  /** End date of current streak */
  streakEndDate: string;
  /** Start date of longest streak */
  longestStreakStartDate?: string;
  /** End date of longest streak */
  longestStreakEndDate?: string;
  /** First contribution date */
  firstContributionDate: string;
  /** Week streak (for week streak mode) */
  weekStreak?: number;
  /** Longest week streak */
  longestWeekStreak?: number;
}

// Backward compatibility alias
export type ProfileCardData = StreakCardData;

/**
 * Card generation options
 */
export interface CardOptions {
  /** Theme name */
  theme?: string;
  /** Hide border */
  hideBorder?: boolean;
  /** Enable animations */
  animate?: boolean;
  /** Card width */
  width?: number;
  /** Card height */
  height?: number;
  /** Border radius */
  borderRadius?: number;
  /** Date format string (M j[, Y], d/m[/Y], j M[, Y], etc.) */
  dateFormat?: string;
  /** Locale code for translations */
  locale?: string;
  /** Number format (short = K, M, B, T) */
  numberFormat?: "short" | "full";
  /** Exclude days from contribution count */
  excludeDays?: string[];
  /** Use week streak instead of day streak */
  weekStreak?: boolean;
  /** Ring stroke type (round or butt) */
  strokeType?: "round" | "butt";
  /** Fire color override */
  fire?: string;
  /** Ring color override */
  ring?: string;
  /** Current streak number color override */
  currStreakNum?: string;
  /** Side numbers color override */
  sideNums?: string;
  /** Current streak label color override */
  currStreakLabel?: string;
  /** Side labels color override */
  sideLabels?: string;
  /** Dates color override */
  dates?: string;
  /** Background color/gradient override */
  background?: string;
  /** Border/stroke color override */
  stroke?: string;
}

/**
 * Format a date range string matching PHP implementation
 */
function formatDateRange(
  start: string,
  end: string,
  dateFormat: string,
  locale: string,
): string {
  const translations = getTranslations(locale);

  // Handle "Present" from translations
  const startFormatted = formatDate(start, dateFormat, locale);
  const endFormatted =
    end === "Present"
      ? translations.Present
      : formatDate(end, dateFormat, locale);

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Generate the full SVG streak card (matching PHP card.php implementation)
 */
export function generateProfileCard(
  data: StreakCardData,
  options: CardOptions = {},
): string {
  const {
    theme = "default",
    hideBorder = false,
    animate = true,
    width = 495,
    height = 195,
    borderRadius = 4.5,
    dateFormat = "M j[, Y]",
    locale = "en",
    numberFormat = "full",
    strokeType = "round",
  } = options;

  // Create render context with theme
  const ctx = createRenderContext({
    theme,
    dimensions: { width, height, borderRadius, padding: 25 },
    animate,
    hideBorder,
  });

  // Apply color overrides if provided
  if (options.ring) {
    ctx.colors.ring = options.ring;
    // If ring is overridden but fire is not, match fire to ring
    if (!options.fire) {
      ctx.colors.fire = options.ring;
    }
  }
  if (options.fire) ctx.colors.fire = options.fire;
  if (options.currStreakNum) ctx.colors.currStreakNum = options.currStreakNum;
  if (options.sideNums) ctx.colors.sideNums = options.sideNums;
  if (options.currStreakLabel)
    ctx.colors.currStreakLabel = options.currStreakLabel;
  if (options.sideLabels) ctx.colors.sideLabels = options.sideLabels;
  if (options.dates) ctx.colors.dates = options.dates;
  if (options.background) {
    ctx.background = parseBackground(options.background, ctx.gradientId);
    ctx.colors.background = ctx.background.fill;
  }
  if (options.stroke) ctx.colors.stroke = options.stroke;

  // Generate card content
  const content = generateStreakContent(ctx, data, {
    dateFormat,
    locale,
    numberFormat,
    animate,
    strokeType,
  });

  // Wrap in SVG
  return renderSVGWrapper(ctx, content, { animate, hideBorder });
}

interface ContentOptions {
  dateFormat: string;
  locale: string;
  numberFormat: "short" | "full";
  animate: boolean;
  strokeType: "round" | "butt";
}

/**
 * Generate the streak stats content (matching PHP card.php layout exactly)
 */
function generateStreakContent(
  ctx: SVGRenderContext,
  data: StreakCardData,
  options: ContentOptions,
): string {
  const { colors, dimensions } = ctx;
  const { width, height } = dimensions;
  const { dateFormat, locale, numberFormat, animate, strokeType } = options;

  // Get translations
  const translations = getTranslations(locale);

  // Height offset for cards taller than 195px (like PHP implementation)
  const baseHeight = 195;
  const heightOffset = (height - baseHeight) / 2;

  // Calculate section positions (PHP: sectionWidth = cardWidth / 3)
  const sectionWidth = width / 3;
  const leftX = sectionWidth / 2;
  const centerX = width / 2;
  const rightX = width - sectionWidth / 2;

  // PHP-style Y-positions - Numbers at top, labels below, dates at bottom
  // Side sections (left & right): Number -> Label -> Date
  const sideNumberY = 79 + heightOffset; // Big number at top
  const sideLabelY = 130 + heightOffset; // Label below number
  const sideDateY = 158 + heightOffset; // Date at bottom

  // Center section: Fire -> Number in ring -> "Current Streak" -> "days" -> Date
  const ringCenterY = 72 + heightOffset; // Ring center Y
  const fireIconY = 18 + heightOffset; // Fire icon Y (above ring)
  const centerNumberY = 79 + heightOffset; // Number inside ring
  const centerLabelY = 130 + heightOffset; // "Current Streak" below ring
  const centerDateY = 158 + heightOffset; // Date at bottom

  // Animation delays (matching PHP exactly)
  const animDelays = {
    ring: 0.4,
    fire: 0.6,
    currNumber: 0.6,
    currSublabel: 0.9,
    currDates: 0.9,
    sideLabels: 0.65,
    sideNumbers: 0.5,
    sideDates: 0.8,
  };

  const lines: string[] = [];

  // === DEFS SECTION (Ring mask for fire icon) ===
  lines.push(`<defs>
    <mask id='ringMask'>
      <rect x='0' y='0' width='${width}' height='${height}' fill='white'/>
      <!-- Fire icon cutout -->
      <ellipse cx='${centerX}' cy='${fireIconY + 18}' rx='13' ry='18' fill='black'/>
    </mask>
  </defs>`);

  // === VERTICAL SEPARATORS ===
  const sepTop = 28 + heightOffset;
  const sepBottom = 170 + heightOffset;
  lines.push(
    renderLine(sectionWidth, sepTop, sectionWidth, sepBottom, {
      stroke: colors.stroke,
      strokeWidth: 1,
    }),
  );
  lines.push(
    renderLine(width - sectionWidth, sepTop, width - sectionWidth, sepBottom, {
      stroke: colors.stroke,
      strokeWidth: 1,
    }),
  );

  // === LEFT SECTION: Total Contributions ===
  // Number at top (large)
  const totalFormatted =
    numberFormat === "short"
      ? formatNumber(data.totalContributions, locale, true)
      : data.totalContributions.toLocaleString();

  lines.push(
    renderText(totalFormatted, leftX, sideNumberY, {
      fill: colors.sideNums,
      fontSize: 28,
      fontWeight: 700,
      textAnchor: "middle",
      animationDelay: animDelays.sideNumbers,
    }),
  );

  // Label below number
  lines.push(
    renderText(translations["Total Contributions"], leftX, sideLabelY, {
      fill: colors.sideLabels,
      fontSize: 14,
      fontWeight: 400,
      textAnchor: "middle",
      animationDelay: animDelays.sideLabels,
    }),
  );

  // Date range at bottom
  lines.push(
    renderText(
      formatDateRange(
        data.firstContributionDate,
        "Present",
        dateFormat,
        locale,
      ),
      leftX,
      sideDateY,
      {
        fill: colors.dates,
        fontSize: 12,
        fontWeight: 400,
        textAnchor: "middle",
        animationDelay: animDelays.sideDates,
      },
    ),
  );

  // === CENTER SECTION: Current Streak ===
  // Ring around streak (with mask to hide behind fire)
  const ringRadius = 40;
  const ringStrokeWidth = 5;
  const strokeLinecap = strokeType === "round" ? "round" : "butt";

  lines.push(`<g style='${animate ? `animation: fadein 0.5s linear forwards ${animDelays.ring}s; opacity: 0` : ""}'>
    <circle cx='${centerX}' cy='${ringCenterY}' r='${ringRadius}' fill='none' stroke='${colors.ring}' stroke-width='${ringStrokeWidth}' stroke-linecap='${strokeLinecap}' mask='url(#ringMask)'/>
  </g>`);

  // Fire icon (above ring)
  lines.push(`<g style='${animate ? `animation: fadein 0.5s linear forwards ${animDelays.fire}s; opacity: 0` : ""}'>
    <g transform='translate(${centerX}, ${fireIconY})'>
      <path d='${FIRE_ICON_PATH}' fill='${colors.fire}'/>
    </g>
  </g>`);

  // Current streak number inside ring (special animation)
  lines.push(
    `<text x='${centerX}' y='${centerNumberY}' stroke-width='0' text-anchor='middle' fill='${colors.currStreakNum}' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal'${animate ? ` style='animation: currstreak 0.6s linear forwards'` : ""}>${data.currentStreak}</text>`,
  );

  // "Current Streak" label below ring
  lines.push(
    renderText(translations["Current Streak"], centerX, centerLabelY, {
      fill: colors.currStreakLabel,
      fontSize: 14,
      fontWeight: 400,
      textAnchor: "middle",
      animationDelay: animDelays.currSublabel,
    }),
  );

  // Current streak date range at bottom
  lines.push(
    renderText(
      formatDateRange(
        data.streakStartDate,
        data.streakEndDate,
        dateFormat,
        locale,
      ),
      centerX,
      centerDateY,
      {
        fill: colors.dates,
        fontSize: 12,
        fontWeight: 400,
        textAnchor: "middle",
        animationDelay: animDelays.currDates,
      },
    ),
  );

  // === RIGHT SECTION: Longest Streak ===
  // Number at top (large)
  lines.push(
    renderText(data.longestStreak.toString(), rightX, sideNumberY, {
      fill: colors.sideNums,
      fontSize: 28,
      fontWeight: 700,
      textAnchor: "middle",
      animationDelay: animDelays.sideNumbers,
    }),
  );

  // Label below number
  lines.push(
    renderText(translations["Longest Streak"], rightX, sideLabelY, {
      fill: colors.sideLabels,
      fontSize: 14,
      fontWeight: 400,
      textAnchor: "middle",
      animationDelay: animDelays.sideLabels,
    }),
  );

  // Date range at bottom
  if (data.longestStreakStartDate && data.longestStreakEndDate) {
    lines.push(
      renderText(
        formatDateRange(
          data.longestStreakStartDate,
          data.longestStreakEndDate,
          dateFormat,
          locale,
        ),
        rightX,
        sideDateY,
        {
          fill: colors.dates,
          fontSize: 12,
          fontWeight: 400,
          textAnchor: "middle",
          animationDelay: animDelays.sideDates,
        },
      ),
    );
  }

  return lines.join("\n");
}

/**
 * Generate multiple cards with different themes for preview
 */
export function generateThemePreview(
  data: StreakCardData,
  themes: string[],
): Map<string, string> {
  const previews = new Map<string, string>();

  for (const theme of themes) {
    previews.set(theme, generateProfileCard(data, { theme }));
  }

  return previews;
}
