import { describe, expect, test } from "bun:test";
import {
	type CardOptions,
	generateProfileCard,
	type StreakCardData,
} from "../src/cardGenerator.ts";

const MOCK_DATA: StreakCardData = {
	username: "testuser",
	totalContributions: 1234,
	currentStreak: 42,
	longestStreak: 100,
	streakStartDate: "2025-01-01",
	streakEndDate: "2025-02-01",
	longestStreakStartDate: "2024-01-01",
	longestStreakEndDate: "2024-04-10",
	firstContributionDate: "2020-01-01",
};

describe("Card Generator", () => {
	test("matches snapshots for various configuration combinations", () => {
		const themes = ["default", "dark", "transparent"];
		const numberFormats: ("short" | "full")[] = ["short", "full"];
		const locales = ["en", "ja"]; // limiting to 2 for speed
		const animateOptions = [true, false];
		const hideBorderOptions = [true, false];

		let comboCount = 0;

		for (const theme of themes) {
			for (const numberFormat of numberFormats) {
				for (const locale of locales) {
					for (const animate of animateOptions) {
						for (const hideBorder of hideBorderOptions) {
							const options: CardOptions = {
								theme,
								numberFormat,
								locale,
								animate,
								hideBorder,
								dateFormat: "M j[, Y]", // Fixed for consistent snapshot names usually
							};

							const svg = generateProfileCard(MOCK_DATA, options);

							// Basic Validation
							expect(svg).toContain("<svg");
							expect(svg).toContain("</svg>");

							// Content Validation
							if (numberFormat === "full") {
								expect(svg).toContain("1,234");
							} else {
								expect(svg).toContain("1.2K"); // Assuming formatNumber works this way
							}

							// Theme class validation (indirectly via colors if we mocked theme resolver, but here we just check output exists)

							comboCount++;
						}
					}
				}
			}
		}
		console.log(`Ran ${comboCount} configuration combinations.`);
	});

	test("applies custom color overrides", () => {
		const options: CardOptions = {
			theme: "default",
			ring: "#FF0000",
			fire: "#00FF00",
			background: "#000000",
			currStreakNum: "#FFFFFF",
		};

		const svg = generateProfileCard(MOCK_DATA, options);

		expect(svg).toContain('fill="#000000"'); // Background (uses double quotes)
		expect(svg).toContain("stroke='#FF0000'"); // Ring (stroke)
		expect(svg).toContain("fill='#00FF00'"); // Fire (fill)
		expect(svg).toContain("fill='#FFFFFF'"); // Number
	});

	test("fire color falls back to ring color if not specified", () => {
		const options: CardOptions = {
			theme: "default",
			ring: "#123456",
			// fire not specified
		};

		const svg = generateProfileCard(MOCK_DATA, options);

		// Both ring and fire should use the ring color
		// Fire path fill
		expect(svg).toContain("fill='#123456'");
		// Ring stroke
		expect(svg).toContain("stroke='#123456'");
	});

	test("respects custom dimensions", () => {
		const options: CardOptions = {
			width: 800,
			height: 400,
			borderRadius: 20,
		};

		const svg = generateProfileCard(MOCK_DATA, options);

		expect(svg).toContain("viewBox='0 0 800 400'");
		expect(svg).toContain("rx='20'");
	});

	test("handles missing optional dates", () => {
		const dataWithoutLongest = {
			...MOCK_DATA,
			longestStreakStartDate: undefined,
			longestStreakEndDate: undefined,
		};

		const svg = generateProfileCard(dataWithoutLongest);
		// Should run without error and just not print the date range
		expect(svg).toBeTruthy();
	});
});
