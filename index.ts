/**
 * GitHub Profile Card - Theme System Demo
 *
 * This demonstrates the theme system capabilities.
 * Run with: bun run index.ts
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
	generateProfileCard,
	getThemeNames,
	getThemeStats,
	type ProfileCardData,
	parseBackground,
	resolveTheme,
} from "./src";

// Sample streak data
const sampleData: ProfileCardData = {
	username: "octocat",
	totalContributions: 2847,
	currentStreak: 42,
	longestStreak: 156,
	streakStartDate: "2025-12-21",
	streakEndDate: "2026-02-01",
	longestStreakStartDate: "2024-05-10",
	longestStreakEndDate: "2024-10-12",
	firstContributionDate: "2020-01-15",
};

async function main() {
	console.log("🎨 GitHub Profile Card Theme System\n");

	// Display theme statistics
	const stats = getThemeStats();
	console.log(`📊 Theme Statistics:`);
	console.log(`   Total themes: ${stats.total}`);
	console.log(`   Gradient themes: ${stats.gradientThemes.length}`);
	console.log(`   Transparent themes: ${stats.transparentThemes.length}`);
	console.log(`   Dark themes: ${stats.darkThemes.length}`);
	console.log(`   Light themes: ${stats.lightThemes.length}`);
	console.log();

	// Show some theme examples
	console.log("🔍 Theme Examples:\n");

	const exampleThemes = [
		"default",
		"dark",
		"tokyonight",
		"dracula",
		"sunset-gradient",
	];

	for (const themeName of exampleThemes) {
		const theme = resolveTheme(themeName);
		const bg = parseBackground(theme.background);

		console.log(`   ${themeName}:`);
		console.log(`      Background: ${theme.background} (${bg.type})`);
		console.log(`      Ring: ${theme.ring}`);
		console.log(`      Fire: ${theme.fire}`);
		console.log();
	}

	// Generate sample cards
	console.log("📝 Generating sample SVG cards...\n");

	const outputDir = join(process.cwd(), "output");
	await mkdir(outputDir, { recursive: true });

	const samplesToGenerate = [
		"default",
		"dark",
		"tokyonight",
		"dracula",
		"catppuccin-mocha",
		"sunset-gradient",
		"ocean-gradient",
		"github-dark",
		"nord",
		"gruvbox",
	];

	for (const themeName of samplesToGenerate) {
		const svg = generateProfileCard(sampleData, { theme: themeName });
		const filename = `card-${themeName}.svg`;
		await writeFile(join(outputDir, filename), svg);
		console.log(`   ✅ Generated: ${filename}`);
	}

	console.log(`\n🎉 Done! Check the 'output' directory for generated cards.`);

	// List all available themes
	console.log("\n📋 All Available Themes:\n");
	const allThemes = getThemeNames();
	const columns = 4;
	const rows = Math.ceil(allThemes.length / columns);

	for (let i = 0; i < rows; i++) {
		const row = allThemes
			.slice(i * columns, (i + 1) * columns)
			.map((name) => name.padEnd(25))
			.join("");
		console.log(`   ${row}`);
	}

	console.log(`\n   Total: ${allThemes.length} themes`);
}

main().catch(console.error);
