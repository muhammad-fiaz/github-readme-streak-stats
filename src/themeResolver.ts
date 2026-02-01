import { getThemeCount, getThemeNames, hasTheme, THEMES } from "./themes.ts";
import type { ThemeColors } from "./types.ts";

/**
 * Default theme name used as fallback
 */
export const DEFAULT_THEME = "default";

/**
 * Resolve a theme by name with fallback to default
 * @param themeName - Name of the theme to resolve (case-insensitive)
 * @returns The resolved theme colors
 */
export function resolveTheme(themeName?: string | null): ThemeColors {
  const defaultTheme = THEMES[DEFAULT_THEME];
  if (!defaultTheme) {
    throw new Error(`Default theme '${DEFAULT_THEME}' not found`);
  }

  if (!themeName) {
    return defaultTheme;
  }

  const normalizedName = themeName.toLowerCase().trim();

  if (hasTheme(normalizedName)) {
    const theme = THEMES[normalizedName];
    if (theme) return theme;
  }

  // Try with hyphens replaced by underscores and vice versa
  const altName1 = normalizedName.replace(/-/g, "_");
  const altName2 = normalizedName.replace(/_/g, "-");

  if (hasTheme(altName1)) {
    const theme = THEMES[altName1];
    if (theme) return theme;
  }

  if (hasTheme(altName2)) {
    const theme = THEMES[altName2];
    if (theme) return theme;
  }

  // Fallback to default
  return defaultTheme;
}

/**
 * Resolve a theme and return both the theme and whether it was found
 * @param themeName - Name of the theme to resolve
 * @returns Object with theme colors and found status
 */
export function resolveThemeWithStatus(themeName?: string | null): {
  theme: ThemeColors;
  found: boolean;
  resolvedName: string;
} {
  const defaultTheme = THEMES[DEFAULT_THEME];
  if (!defaultTheme) {
    throw new Error(`Default theme '${DEFAULT_THEME}' not found`);
  }

  if (!themeName) {
    return {
      theme: defaultTheme,
      found: true,
      resolvedName: DEFAULT_THEME,
    };
  }

  const normalizedName = themeName.toLowerCase().trim();

  if (hasTheme(normalizedName)) {
    const theme = THEMES[normalizedName];
    if (theme) {
      return {
        theme,
        found: true,
        resolvedName: normalizedName,
      };
    }
  }

  // Try alternatives
  const altName1 = normalizedName.replace(/-/g, "_");
  const altName2 = normalizedName.replace(/_/g, "-");

  if (hasTheme(altName1)) {
    const theme = THEMES[altName1];
    if (theme) {
      return {
        theme,
        found: true,
        resolvedName: altName1,
      };
    }
  }

  if (hasTheme(altName2)) {
    const theme = THEMES[altName2];
    if (theme) {
      return {
        theme,
        found: true,
        resolvedName: altName2,
      };
    }
  }

  return {
    theme: defaultTheme,
    found: false,
    resolvedName: DEFAULT_THEME,
  };
}

/**
 * Search for themes matching a pattern
 * @param pattern - Search pattern (supports partial matching)
 * @returns Array of matching theme names
 */
export function searchThemes(pattern: string): string[] {
  const normalizedPattern = pattern.toLowerCase().trim();
  const allThemes = getThemeNames();

  return allThemes.filter((name) => name.includes(normalizedPattern));
}

/**
 * Get themes by category/prefix
 * @param prefix - Category prefix (e.g., "catppuccin", "shadow", "github")
 * @returns Array of theme names in that category
 */
export function getThemesByCategory(prefix: string): string[] {
  const normalizedPrefix = prefix.toLowerCase().trim();
  const allThemes = getThemeNames();

  return allThemes.filter((name) => name.startsWith(normalizedPrefix));
}

/**
 * Validate if a theme object has all required properties
 * @param theme - Object to validate
 * @returns True if valid theme structure
 */
export function isValidTheme(theme: unknown): theme is ThemeColors {
  if (!theme || typeof theme !== "object") {
    return false;
  }

  const requiredKeys: (keyof ThemeColors)[] = [
    "background",
    "border",
    "stroke",
    "ring",
    "fire",
    "currStreakNum",
    "sideNums",
    "currStreakLabel",
    "sideLabels",
    "dates",
    "excludeDaysLabel",
  ];

  return requiredKeys.every(
    (key) =>
      key in theme &&
      typeof (theme as Record<string, unknown>)[key] === "string",
  );
}

/**
 * Create a custom theme by merging with an existing theme
 * @param baseName - Name of the base theme to extend
 * @param overrides - Color overrides to apply
 * @returns New theme colors object
 */
export function createCustomTheme(
  baseName: string,
  overrides: Partial<ThemeColors>,
): ThemeColors {
  const baseTheme = resolveTheme(baseName);
  return { ...baseTheme, ...overrides };
}

/**
 * Get theme statistics
 */
export function getThemeStats(): {
  total: number;
  gradientThemes: string[];
  transparentThemes: string[];
  darkThemes: string[];
  lightThemes: string[];
} {
  const allThemes = getThemeNames();
  const gradientThemes: string[] = [];
  const transparentThemes: string[] = [];
  const darkThemes: string[] = [];
  const lightThemes: string[] = [];

  for (const name of allThemes) {
    const theme = THEMES[name];
    if (!theme) continue;
    const bg = theme.background;

    // Check for gradient (contains commas and first part is a number)
    if (bg.includes(",")) {
      const firstPart = bg.split(",")[0];
      if (firstPart && !Number.isNaN(parseFloat(firstPart))) {
        gradientThemes.push(name);
        continue;
      }
    }

    // Check for transparent
    if (
      bg === "#0000" ||
      bg === "#00000000" ||
      bg.toLowerCase().endsWith("00") ||
      bg === "transparent"
    ) {
      transparentThemes.push(name);
      continue;
    }

    // Categorize by brightness (simplified heuristic)
    if (name.includes("dark") || name.includes("night")) {
      darkThemes.push(name);
    } else if (name.includes("light")) {
      lightThemes.push(name);
    } else {
      // Check background color brightness
      const hex = bg.replace("#", "");
      if (hex.length >= 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        if (brightness < 128) {
          darkThemes.push(name);
        } else {
          lightThemes.push(name);
        }
      }
    }
  }

  return {
    total: getThemeCount(),
    gradientThemes,
    transparentThemes,
    darkThemes,
    lightThemes,
  };
}

export { THEMES, hasTheme, getThemeNames, getThemeCount };
