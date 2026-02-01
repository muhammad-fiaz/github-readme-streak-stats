import type { StreakCardData } from "./cardGenerator.ts";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
}

interface GraphQLResponse {
  data?: {
    user?: {
      createdAt: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: GraphQLError[];
}

/**
 * Fetch GitHub streak data for a user
 */
export async function fetchGitHubData(
  username: string,
  token: string,
): Promise<StreakCardData> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        createdAt
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: username },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API failed: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse;

  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const user = json.data?.user;
  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  // Process Contributions & Streaks
  const calendar = user.contributionsCollection.contributionCalendar;
  const days = calendar.weeks.flatMap((w) => w.contributionDays);

  // Sort days by date
  days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let currentStreakStart = "";
  let currentStreakEnd = "";
  let longestStreakStart = "";
  let longestStreakEnd = "";

  if (days.length === 0) {
    return {
      username,
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakStartDate: new Date().toISOString(),
      streakEndDate: new Date().toISOString(),
      longestStreakStartDate: new Date().toISOString(),
      longestStreakEndDate: new Date().toISOString(),
      firstContributionDate: user.createdAt,
    };
  }

  // Calculate current streak (from end backwards)
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (!day) continue;

    if (day.contributionCount > 0) {
      streak++;
      currentStreakEnd = currentStreakEnd || day.date;
      currentStreakStart = day.date;
    } else {
      // If today is 0, check if streak continues from yesterday
      if (i === days.length - 1) {
        continue;
      }
      break;
    }
  }
  currentStreak = streak;

  // Calculate longest streak with dates
  let tempStreak = 0;
  let tempStreakStart = "";
  for (const day of days) {
    if (day.contributionCount > 0) {
      if (tempStreak === 0) {
        tempStreakStart = day.date;
      }
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakStart = tempStreakStart;
        longestStreakEnd = days[days.indexOf(day) - 1]?.date || tempStreakStart;
      }
      tempStreak = 0;
      tempStreakStart = "";
    }
  }
  // Check if current streak is the longest
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
    longestStreakStart = tempStreakStart;
    longestStreakEnd = days[days.length - 1]?.date || tempStreakStart;
  }

  const fallbackDate = days[days.length - 1]?.date || new Date().toISOString();

  return {
    username,
    totalContributions: calendar.totalContributions,
    currentStreak,
    longestStreak,
    streakStartDate: currentStreakStart || fallbackDate,
    streakEndDate: currentStreakEnd || fallbackDate,
    longestStreakStartDate: longestStreakStart || fallbackDate,
    longestStreakEndDate: longestStreakEnd || fallbackDate,
    firstContributionDate: user.createdAt,
  };
}
