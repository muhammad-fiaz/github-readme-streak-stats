import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { type CardOptions, generateProfileCard } from "./cardGenerator.ts";
import { fetchGitHubData } from "./github-api.ts";

async function run() {
	try {
		// Get Inputs
		const username = process.env.INPUT_USERNAME;
		const token = process.env.INPUT_GITHUB_TOKEN;
		const theme = process.env.INPUT_THEME || "default";
		const outputPath = process.env.INPUT_OUTPUT_PATH || "github-streak.svg";
		const animated = process.env.INPUT_ANIMATED !== "false";

		// New inputs matching PHP implementation
		const locale = process.env.INPUT_LOCALE || "en";
		const dateFormat = process.env.INPUT_DATE_FORMAT || "M j[, Y]";
		const borderRadius = parseFloat(process.env.INPUT_BORDER_RADIUS || "4.5");
		const hideBorder = process.env.INPUT_HIDE_BORDER === "true";
		const cardWidth = parseInt(process.env.INPUT_CARD_WIDTH || "495", 10);
		const cardHeight = parseInt(process.env.INPUT_CARD_HEIGHT || "195", 10);
		const numberFormat = (process.env.INPUT_NUMBER_FORMAT || "full") as
			| "short"
			| "full";
		const strokeType = (process.env.INPUT_STROKE_TYPE || "round") as
			| "round"
			| "butt";

		// Color overrides
		const fire = process.env.INPUT_FIRE;
		const ring = process.env.INPUT_RING;
		const currStreakNum = process.env.INPUT_CURR_STREAK_NUM;
		const sideNums = process.env.INPUT_SIDE_NUMS;
		const currStreakLabel = process.env.INPUT_CURR_STREAK_LABEL;
		const sideLabels = process.env.INPUT_SIDE_LABELS;
		const dates = process.env.INPUT_DATES;
		const background = process.env.INPUT_BACKGROUND;
		const stroke = process.env.INPUT_STROKE;

		if (!username || !token) {
			throw new Error("Missing required inputs: USERNAME or GITHUB_TOKEN");
		}

		console.log(`🚀 Generating Streak Card for ${username}...`);
		console.log(`   Theme: ${theme}`);
		console.log(`   Locale: ${locale}`);
		console.log(`   Output: ${outputPath}`);

		// Fetch Data
		console.log("📡 Fetching GitHub data...");
		const data = await fetchGitHubData(username, token);
		console.log(`   Total Contributions: ${data.totalContributions}`);
		console.log(`   Current Streak: ${data.currentStreak} days`);
		console.log(`   Longest Streak: ${data.longestStreak} days`);

		// Generate Card
		console.log("🎨 Generating SVG...");
		const options: CardOptions = {
			theme,
			animate: animated,
			hideBorder,
			width: cardWidth,
			height: cardHeight,
			borderRadius,
			locale,
			dateFormat,
			numberFormat,
			strokeType,
			// Color overrides (only if provided)
			...(fire && { fire }),
			...(ring && { ring }),
			...(currStreakNum && { currStreakNum }),
			...(sideNums && { sideNums }),
			...(currStreakLabel && { currStreakLabel }),
			...(sideLabels && { sideLabels }),
			...(dates && { dates }),
			...(background && { background }),
			...(stroke && { stroke }),
		};

		const svg = generateProfileCard(data, options);

		// Save File
		const fullPath = resolve(process.cwd(), outputPath);
		await writeFile(fullPath, svg);
		console.log(`✅ Saved streak card to ${fullPath}`);
	} catch (error) {
		console.error("❌ Action failed:", error);
		process.exit(1);
	}
}

run();
