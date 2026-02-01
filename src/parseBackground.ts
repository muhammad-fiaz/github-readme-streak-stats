import type { GradientInfo, GradientStop, ParsedBackground } from "./types.ts";

/**
 * Check if a color string represents a transparent background
 */
export function isTransparent(color: string): boolean {
	const normalized = color.toLowerCase().trim();
	return (
		normalized === "#0000" ||
		normalized === "#00000000" ||
		normalized === "transparent" ||
		normalized === "rgba(0,0,0,0)" ||
		normalized === "rgba(0, 0, 0, 0)" ||
		// Check for 4-digit hex with 0 alpha (e.g. #f000)
		/^#[0-9a-f]{3}0$/i.test(normalized) ||
		// Check for 8-digit hex with 00 alpha (e.g. #ff000000)
		/^#[0-9a-f]{6}00$/i.test(normalized)
	);
}

/**
 * Check if a background string represents a gradient
 * Gradient format: "ANGLE,COLOR1,COLOR2[,COLOR3...]"
 * Colors are hex values WITHOUT the # prefix
 */
export function isGradient(background: string): boolean {
	// Must contain at least 2 commas (angle + 2 colors minimum)
	const parts = background.split(",");
	if (parts.length < 3) return false;

	// First part should be a number (angle)
	const firstPart = parts[0]?.trim();
	if (!firstPart) return false;
	const angle = parseFloat(firstPart);
	if (Number.isNaN(angle)) return false;

	// Remaining parts should be valid hex colors (without #)
	for (let i = 1; i < parts.length; i++) {
		const color = parts[i]?.trim();
		if (!color || !/^[0-9A-Fa-f]{3,8}$/.test(color)) return false;
	}

	return true;
}

/**
 * Parse a gradient string into structured data
 * @param background - Gradient string in format "ANGLE,COLOR1,COLOR2[,...]"
 * @returns GradientInfo object with angle and color stops
 */
export function parseGradient(background: string): GradientInfo {
	const parts = background.split(",").map((p) => p.trim());
	const firstPart = parts[0] ?? "0";
	const angle = parseFloat(firstPart);
	const colors = parts.slice(1);

	const stops: GradientStop[] = colors.map((color, index) => ({
		color: `#${color}`,
		offset: colors.length === 1 ? 50 : (index / (colors.length - 1)) * 100,
	}));

	return { angle, stops };
}

/**
 * Convert angle to SVG linearGradient coordinates
 * SVG uses x1,y1 -> x2,y2 coordinate system
 */
export function angleToCoordinates(angle: number): {
	x1: string;
	y1: string;
	x2: string;
	y2: string;
} {
	// Normalize angle to 0-360
	const normalizedAngle = ((angle % 360) + 360) % 360;

	// Convert to radians and adjust for SVG coordinate system
	const radians = ((normalizedAngle - 90) * Math.PI) / 180;

	// Calculate coordinates on a 0-100 scale
	const x1 = Math.round(50 - Math.cos(radians) * 50);
	const y1 = Math.round(50 - Math.sin(radians) * 50);
	const x2 = Math.round(50 + Math.cos(radians) * 50);
	const y2 = Math.round(50 + Math.sin(radians) * 50);

	return {
		x1: `${x1}%`,
		y1: `${y1}%`,
		x2: `${x2}%`,
		y2: `${y2}%`,
	};
}

/**
 * Generate SVG gradient definition markup
 * @param gradientId - Unique ID for the gradient
 * @param gradientInfo - Parsed gradient information
 * @returns SVG defs markup string
 */
export function generateGradientDefs(
	gradientId: string,
	gradientInfo: GradientInfo,
): string {
	const coords = angleToCoordinates(gradientInfo.angle);

	const stops = gradientInfo.stops
		.map(
			(stop) =>
				`<stop offset="${stop.offset}%" stop-color="${stop.color}" stop-opacity="1"/>`,
		)
		.join("\n      ");

	return `<defs>
    <linearGradient id="${gradientId}" x1="${coords.x1}" y1="${coords.y1}" x2="${coords.x2}" y2="${coords.y2}">
      ${stops}
    </linearGradient>
  </defs>`;
}

/**
 * Parse a background value and return SVG-ready data
 * @param background - Background value from theme
 * @param gradientId - Unique ID to use for gradient (default: "gradient-bg")
 * @returns ParsedBackground with defs and fill value
 */
export function parseBackground(
	background: string,
	gradientId: string = "gradient-bg",
): ParsedBackground {
	// Check for transparent
	if (isTransparent(background)) {
		return {
			type: "transparent",
			defs: "",
			fill: "transparent",
		};
	}

	// Check for gradient
	if (isGradient(background)) {
		const gradientInfo = parseGradient(background);
		const defs = generateGradientDefs(gradientId, gradientInfo);

		return {
			type: "gradient",
			defs,
			fill: `url(#${gradientId})`,
		};
	}

	// Default: solid color
	// Ensure it has a # prefix
	const solidColor = background.startsWith("#") ? background : `#${background}`;

	return {
		type: "solid",
		defs: "",
		fill: solidColor,
	};
}

/**
 * Normalize a hex color to ensure it has # prefix
 */
export function normalizeColor(color: string): string {
	if (!color) return "#000000";
	return color.startsWith("#") ? color : `#${color}`;
}

/**
 * Check if a color is valid hex format
 */
export function isValidHexColor(color: string): boolean {
	return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(
		color,
	);
}
