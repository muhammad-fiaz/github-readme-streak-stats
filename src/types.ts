/**
 * Theme color definitions for GitHub Profile Card
 * All values must be valid CSS color strings
 */
export interface ThemeColors {
	/** Card background - solid color (#RRGGBB), transparent (#0000), or gradient (ANGLE,COLOR1,COLOR2,...) */
	background: string;
	/** Card border color */
	border: string;
	/** Stroke/separator line color */
	stroke: string;
	/** Ring/circle highlight color */
	ring: string;
	/** Fire/flame icon color */
	fire: string;
	/** Current streak number color */
	currStreakNum: string;
	/** Side stats numbers color */
	sideNums: string;
	/** Current streak label color */
	currStreakLabel: string;
	/** Side stats labels color */
	sideLabels: string;
	/** Date text color */
	dates: string;
	/** Excluded days label color */
	excludeDaysLabel: string;
}

/**
 * Background type enumeration
 */
export type BackgroundType = "solid" | "transparent" | "gradient";

/**
 * Parsed background result
 */
export interface ParsedBackground {
	/** Type of background */
	type: BackgroundType;
	/** SVG defs markup (empty string if not gradient) */
	defs: string;
	/** Fill value to use for the background */
	fill: string;
}

/**
 * Gradient stop definition
 */
export interface GradientStop {
	/** Color in hex format (with #) */
	color: string;
	/** Offset percentage (0-100) */
	offset: number;
}

/**
 * Parsed gradient information
 */
export interface GradientInfo {
	/** Angle in degrees */
	angle: number;
	/** Array of gradient color stops */
	stops: GradientStop[];
}

/**
 * Theme registry type - maps theme names to theme colors
 */
export type ThemeRegistry = Record<string, ThemeColors>;

/**
 * Card dimensions configuration
 */
export interface CardDimensions {
	width: number;
	height: number;
	borderRadius: number;
	padding: number;
}

/**
 * SVG render options
 */
export interface SVGRenderOptions {
	/** Theme name to use */
	theme: string;
	/** Card dimensions */
	dimensions?: Partial<CardDimensions>;
	/** Whether to include animations */
	animate?: boolean;
	/** Hide border */
	hideBorder?: boolean;
	/** Border width */
	borderWidth?: number;
}
