// Dopamine engine: affirmations, streaks, XP levels.
export const AFFIRMATIONS = [
  "I am becoming the person my 2027 needs.",
  "Today I choose progress over perfection.",
  "My energy creates my reality.",
  "I am worthy of the life I'm building.",
  "Small steps today, extraordinary life tomorrow.",
  "I attract what I focus on — I focus on good.",
  "My dreams are valid and my timing is perfect.",
  "I release doubt and trust my path.",
  "Every morning is a fresh page of my story.",
  "I am magnetic to opportunities.",
  "Discipline today is freedom tomorrow.",
  "I celebrate how far I've already come.",
  "My intentions are clear and my heart is open.",
  "I turn obstacles into stepping stones.",
  "Abundance flows to me in expected and unexpected ways.",
  "I am the author of my 2027.",
  "Gratitude multiplies everything I love.",
  "I act today like the person I want to become.",
  "My vision is bigger than my fears.",
  "I am already enough — and I'm still growing.",
];

export function affirmationOfTheDay(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return AFFIRMATIONS[day % AFFIRMATIONS.length];
}

export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// dates: array of 'YYYY-MM-DD' (any order). Returns consecutive-day streak ending today or yesterday.
export function computeStreak(dates: string[]): number {
  const set = new Set(dates);
  const d = new Date();
  const fmt = (x: Date) => x.toISOString().slice(0, 10);
  // allow streak to count if last activity was yesterday
  if (!set.has(fmt(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (set.has(fmt(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

export function levelFor(xp: number): { level: number; progress: number; nextAt: number } {
  const level = Math.floor(xp / 30) + 1;
  const into = xp % 30;
  return { level, progress: into / 30, nextAt: 30 - into };
}

export const RITUALS = [
  { id: "affirmation", label: "Read today's affirmation", emoji: "✨" },
  { id: "gratitude", label: "Write 3 things you're grateful for", emoji: "💛" },
  { id: "intention", label: "Set one intention for today", emoji: "🎯" },
];
