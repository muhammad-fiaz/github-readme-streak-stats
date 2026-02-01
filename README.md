# GitHub Readme Streak Stats

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/muhammad-fiaz/github-readme-streak-stats)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test](https://github.com/muhammad-fiaz/github-readme-streak-stats/actions/workflows/test.yml/badge.svg)](https://github.com/muhammad-fiaz/github-readme-streak-stats/actions/workflows/test.yml)

Display your total contributions, current streak, and longest streak on your GitHub profile README with beautiful themes and animations!

## Features

- **150+ Predefined Themes** - From popular editor themes to custom gradients
- **Gradient Support** - Linear gradients with customizable angles
- **Transparent Backgrounds** - Perfect for any README background
- **Bun Runtime** - Fast and modern JavaScript runtime
- **Zero Dependencies** - Pure TypeScript, no external packages needed
- **Animated SVG** - Smooth fade-in and pulse animations
- **Type-Safe** - Full TypeScript support with strict types

## Usage

Use this GitHub Action to generate your streak stats card and save it to your repository.

### Workflow Example

This workflow will generate two versions of your streak stats (Dark & Light) and push them to an `output` branch. You can then use them in your README.

Create a workflow file (e.g., `.github/workflows/streak-stats.yml`):

```yaml
name: Generate Streak Stats

on:
  schedule:
    - cron: "0 0 * * *" # Run daily at midnight
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3

      - name: Generate Streak Stats (Dark)
        uses: muhammad-fiaz/github-readme-streak-stats@v1.0.0
        with:
          USERNAME: ${{ secrets.USER_NAME }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          THEME: tokyonight
          OUTPUT_PATH: github-streak-stats-dark.svg

      - name: Generate Streak Stats (Light)
        uses: muhammad-fiaz/github-readme-streak-stats@v1.0.0
        with:
          USERNAME: ${{ secrets.USER_NAME }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          THEME: default
          OUTPUT_PATH: github-streak-stats-light.svg

      - name: Push to output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: .
          keep_history: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Embed in README

Once the `output` branch is created (after the first run of the workflow), you can use the following HTML to display the card with automatic dark/light mode support:

```html
<div style="display: flex; justify-content: center; align-items: center;">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="
        https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/output/github-streak-stats-dark.svg
      "
    />
    <source
      media="(prefers-color-scheme: light)"
      srcset="
        https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/output/github-streak-stats-light.svg
      "
    />
    <img
      alt="github-streak-stats"
      src="https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/output/github-streak-stats-dark.svg"
    />
  </picture>
</div>
```

> **Note**: Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual details.

## Demo

A demo workflow is available in [workflow-demo.yml](workflow-demo.yml) that showcases the action running daily to generate streak stats and push them to a demo branch.

## Inputs

| Input           | Description                             | Required | Default             |
| --------------- | --------------------------------------- | -------- | ------------------- |
| `USERNAME`      | Your GitHub username                    | **Yes**  | N/A                 |
| `GITHUB_TOKEN`  | Your GitHub token (PAT or GITHUB_TOKEN) | **Yes**  | N/A                 |
| `THEME`         | Theme name (e.g., `default`, `dracula`) | No       | `default`           |
| `OUTPUT_PATH`   | Path to save the SVG file               | No       | `github-streak.svg` |
| `ANIMATED`      | Enable animations (`true` or `false`)   | No       | `true`              |
| `LOCALE`        | Locale code (e.g., `en`, `ja`)          | No       | `en`                |
| `DATE_FORMAT`   | Date format string                      | No       | `M j[, Y]`          |
| `HIDE_BORDER`   | Hide the border (`true` or `false`)     | No       | `false`             |
| `BORDER_RADIUS` | Corner radius                           | No       | `4.5`               |
| `CARD_WIDTH`    | Card width                              | No       | `495`               |
| `CARD_HEIGHT`   | Card height                             | No       | `195`               |

### Custom Color Overrides

You can also override specific colors:

| Input               | Description                  |
| ------------------- | ---------------------------- |
| `RING`              | Ring/Circle color            |
| `FIRE`              | Fire icon color              |
| `BACKGROUND`        | Background color or gradient |
| `STROKE`            | Border color                 |
| `CURR_STREAK_NUM`   | Current streak number color  |
| `SIDE_NUMS`         | Side stats numbers color     |
| `CURR_STREAK_LABEL` | All label texts color        |
| `DATES`             | Dates text color             |

## Available Themes

### Popular Themes

| Theme        | Description                     |
| ------------ | ------------------------------- |
| `default`    | Light theme with orange accents |
| `dark`       | Dark theme with orange accents  |
| `tokyonight` | Tokyo Night color scheme        |
| `dracula`    | Dracula color scheme            |
| `nord`       | Nord color scheme               |
| `gruvbox`    | Gruvbox color scheme            |

### Gradient Themes

| Theme               | Description                |
| ------------------- | -------------------------- |
| `sunset-gradient`   | Orange-pink-purple sunset  |
| `ocean-gradient`    | Blue-cyan ocean vibes      |
| `ambient-gradient`  | Purple-pink-yellow ambient |
| `telegram-gradient` | Telegram brand colors      |
| `cyber-streakglow`  | Cyberpunk neon colors      |

### Checks for Gradient Background

It supports 3 types of background:

- **Solid**: `#ff0000`
- **Transparent**: `transparent` or `#0000`
- **Gradient**: `45,ff0000,00ff00` (Angle, Start Color, End Color)

## License

MIT License - feel free to use in your own projects!
