/**
 * GitHub Profile Card Theme System
 *
 * A fully data-driven theme system for animated SVG GitHub profile cards.
 * Written in TypeScript, compatible with Bun runtime, and designed for
 * GitHub README rendering.
 *
 * @example
 * ```ts
 * import { resolveTheme, parseBackground, createRenderContext, THEMES } from "./src";
 *
 * // Get a theme by name
 * const theme = resolveTheme("tokyonight");
 *
 * // Parse background for SVG rendering
 * const bg = parseBackground(theme.background, "my-gradient");
 *
 * // Create full render context
 * const ctx = createRenderContext({ theme: "dracula" });
 * ```
 */

// Card generator
export {
	type CardOptions,
	generateProfileCard,
	generateThemePreview,
	type ProfileCardData,
} from "./cardGenerator.ts";
// Background parsing
export {
	angleToCoordinates,
	generateGradientDefs,
	isGradient,
	isTransparent,
	isValidHexColor,
	normalizeColor,
	parseBackground,
	parseGradient,
} from "./parseBackground.ts";
// SVG rendering utilities
export {
	createRenderContext,
	DEFAULT_DIMENSIONS,
	renderBackground,
	renderLine,
	renderRing,
	renderSVGWrapper,
	renderText,
	type SVGRenderContext,
} from "./svgRenderer.ts";

// Theme resolution
export {
	createCustomTheme,
	DEFAULT_THEME,
	getThemeStats,
	getThemesByCategory,
	isValidTheme,
	resolveTheme,
	resolveThemeWithStatus,
	searchThemes,
} from "./themeResolver.ts";
// Theme registry
export { getThemeCount, getThemeNames, hasTheme, THEMES } from "./themes.ts";
// Type definitions
export type {
	BackgroundType,
	CardDimensions,
	GradientInfo,
	GradientStop,
	ParsedBackground,
	SVGRenderOptions,
	ThemeColors,
	ThemeRegistry,
} from "./types.ts";
