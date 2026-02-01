import { normalizeColor, parseBackground } from "./parseBackground.ts";
import { resolveTheme } from "./themeResolver.ts";
import type {
  CardDimensions,
  ParsedBackground,
  SVGRenderOptions,
  ThemeColors,
} from "./types.ts";

/**
 * Default card dimensions
 */
export const DEFAULT_DIMENSIONS: CardDimensions = {
  width: 495,
  height: 195,
  borderRadius: 4.5,
  padding: 25,
};

/**
 * Fire icon SVG path
 */
export const FIRE_ICON_PATH =
  "M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z";

/**
 * SVG render context containing all theme-aware values
 */
export interface SVGRenderContext {
  theme: ThemeColors;
  background: ParsedBackground;
  dimensions: CardDimensions;
  colors: {
    background: string;
    border: string;
    stroke: string;
    ring: string;
    fire: string;
    currStreakNum: string;
    sideNums: string;
    currStreakLabel: string;
    sideLabels: string;
    dates: string;
    excludeDaysLabel: string;
  };
  gradientId: string;
}

/**
 * Create an SVG render context from options
 * @param options - Render options including theme name
 * @returns Complete render context with parsed colors
 */
export function createRenderContext(
  options: SVGRenderOptions,
): SVGRenderContext {
  const theme = resolveTheme(options.theme);
  const gradientId = `bg-gradient-${Date.now()}`;
  const background = parseBackground(theme.background, gradientId);

  const dimensions: CardDimensions = {
    ...DEFAULT_DIMENSIONS,
    ...options.dimensions,
  };

  return {
    theme,
    background,
    dimensions,
    gradientId,
    colors: {
      background: background.fill,
      border: normalizeColor(theme.border),
      stroke: normalizeColor(theme.stroke),
      ring: normalizeColor(theme.ring),
      fire: normalizeColor(theme.fire),
      currStreakNum: normalizeColor(theme.currStreakNum),
      sideNums: normalizeColor(theme.sideNums),
      currStreakLabel: normalizeColor(theme.currStreakLabel),
      sideLabels: normalizeColor(theme.sideLabels),
      dates: normalizeColor(theme.dates),
      excludeDaysLabel: normalizeColor(theme.excludeDaysLabel),
    },
  };
}

/**
 * Generate the SVG card background rectangle
 */
export function renderBackground(
  ctx: SVGRenderContext,
  hideBorder = false,
): string {
  const { dimensions, colors, background } = ctx;
  const strokeWidth = hideBorder ? 0 : 1;
  const strokeAttr = hideBorder ? 'stroke="none"' : `stroke="${colors.border}"`;

  return `<rect
    x="0.5"
    y="0.5"
    rx="${dimensions.borderRadius}"
    ry="${dimensions.borderRadius}"
    width="${dimensions.width - 1}"
    height="${dimensions.height - 1}"
    fill="${background.fill}"
    ${strokeAttr}
    stroke-width="${strokeWidth}"
  />`;
}

/**
 * Generate the complete SVG wrapper with defs
 */
export function renderSVGWrapper(
  ctx: SVGRenderContext,
  content: string,
  options?: {
    animate?: boolean;
    hideBorder?: boolean;
    direction?: "ltr" | "rtl";
  },
): string {
  const { dimensions, background } = ctx;
  const {
    animate = true,
    hideBorder = false,
    direction = "ltr",
  } = options || {};

  const defs = background.defs ? `\n  ${background.defs}` : "";
  const backgroundRect = renderBackground(ctx, hideBorder);

  // Animation styles
  const animationStyles = animate
    ? `
    <style>
      @keyframes currstreak {
        0% { font-size: 3px; opacity: 0.2; }
        80% { font-size: 34px; opacity: 1; }
        100% { font-size: 28px; opacity: 1; }
      }
      @keyframes fadein {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    </style>`
    : "";

  return `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
      style='isolation: isolate' viewBox='0 0 ${dimensions.width} ${dimensions.height}' direction='${direction}'>
  ${animationStyles}
  <defs>
    <clipPath id='outer_rectangle'>
      <rect width='${dimensions.width}' height='${dimensions.height}' rx='${dimensions.borderRadius}'/>
    </clipPath>${defs}
  </defs>
  <g clip-path='url(#outer_rectangle)'>
    <g style='isolation: isolate'>
      ${backgroundRect}
    </g>
    ${content}
  </g>
</svg>`;
}

/**
 * Generate a text element with theme colors
 */
export function renderText(
  text: string,
  x: number,
  y: number,
  options: {
    fill: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontFamily?: string;
    textAnchor?: "start" | "middle" | "end";
    className?: string;
    animationDelay?: number;
    animate?: boolean;
  },
): string {
  const {
    fill,
    fontSize = 14,
    fontWeight = 400,
    fontFamily = '"Segoe UI", Ubuntu, sans-serif',
    textAnchor = "start",
    animationDelay = 0,
    animate = true,
  } = options;

  const animStyle = animate
    ? `opacity: 0; animation: fadein 0.5s linear forwards ${animationDelay}s`
    : "";

  return `<text x='${x}' y='${y}' stroke-width='0' text-anchor='${textAnchor}' fill='${fill}' stroke='none' font-family='${fontFamily}' font-weight='${fontWeight}' font-size='${fontSize}px' font-style='normal'${animStyle ? ` style='${animStyle}'` : ""}>${escapeXml(text)}</text>`;
}

/**
 * Render fire icon
 */
export function renderFireIcon(
  x: number,
  y: number,
  color: string,
  animationDelay: number = 0.6,
  animate: boolean = true,
): string {
  const animStyle = animate
    ? `opacity: 0; animation: fadein 0.5s linear forwards ${animationDelay}s`
    : "";

  return `<g transform='translate(${x}, ${y})' stroke-opacity='0'${animStyle ? ` style='${animStyle}'` : ""}>
    <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
    <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z' fill='${color}' stroke-opacity='0'/>
  </g>`;
}

/**
 * Render ring with mask for fire icon
 */
export function renderStreakRing(
  cx: number,
  cy: number,
  radius: number,
  color: string,
  _maskCx: number,
  _maskCy: number,
  animationDelay: number = 0.4,
  animate: boolean = true,
): string {
  const animStyle = animate
    ? `opacity: 0; animation: fadein 0.5s linear forwards ${animationDelay}s`
    : "";

  return `<g mask='url(#mask_out_ring_behind_fire)'>
    <circle cx='${cx}' cy='${cy}' r='${radius}' fill='none' stroke='${color}' stroke-width='5'${animStyle ? ` style='${animStyle}'` : ""}></circle>
  </g>`;
}

/**
 * Render the ring mask definition for hiding ring behind fire
 */
export function renderRingMask(
  width: number,
  height: number,
  cx: number,
  cy: number,
): string {
  return `<mask id='mask_out_ring_behind_fire'>
    <rect width='${width}' height='${height}' fill='white'/>
    <ellipse id='mask-ellipse' cx='${cx}' cy='${cy}' rx='13' ry='18' fill='black'/>
  </mask>`;
}

/**
 * Generate a line/separator element
 */
export function renderLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: {
    stroke: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  },
): string {
  const { stroke, strokeWidth = 1, strokeDasharray } = options;

  return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' vector-effect='non-scaling-stroke' stroke-width='${strokeWidth}' stroke='${stroke}' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'${strokeDasharray ? ` stroke-dasharray='${strokeDasharray}'` : ""}/>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate a ring/arc SVG element (simple version without mask)
 */
export function renderRing(
  cx: number,
  cy: number,
  radius: number,
  strokeColor: string,
  progress: number = 1,
  options?: {
    strokeWidth?: number;
    backgroundColor?: string;
    className?: string;
  },
): string {
  const { strokeWidth = 5, backgroundColor, className = "" } = options || {};

  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  let bgCircle = "";
  if (backgroundColor) {
    bgCircle = `<circle cx='${cx}' cy='${cy}' r='${radius}' fill='none' stroke='${backgroundColor}' stroke-width='${strokeWidth}' opacity='0.2'/>`;
  }

  return `<g ${className ? `class='${className}'` : ""}>
    ${bgCircle}
    <circle cx='${cx}' cy='${cy}' r='${radius}' fill='none' stroke='${strokeColor}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-dasharray='${circumference}' stroke-dashoffset='${offset}' transform='rotate(-90 ${cx} ${cy})'/>
  </g>`;
}

/**
 * Render current streak number with animation (matching PHP)
 */
export function renderStreakNumber(
  value: string,
  x: number,
  y: number,
  fill: string,
  animate: boolean = true,
): string {
  const animStyle = animate ? "animation: currstreak 0.6s linear forwards" : "";

  return `<text x='${x}' y='${y}' stroke-width='0' text-anchor='middle' fill='${fill}' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal'${animStyle ? ` style='${animStyle}'` : ""}>${value}</text>`;
}
