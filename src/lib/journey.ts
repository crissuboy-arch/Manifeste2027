// 21-day program content — three phases.
export type Day = { day: number; phase: string; lesson: string; exercise: string; affirmation: string; action: string };
const PHASES = ["Awareness & Clarity", "Awareness & Clarity", "Awareness & Clarity", "Awareness & Clarity", "Awareness & Clarity", "Awareness & Clarity", "Awareness & Clarity",
  "Intention & Alignment", "Intention & Alignment", "Intention & Alignment", "Intention & Alignment", "Intention & Alignment", "Intention & Alignment", "Intention & Alignment",
  "Action & Reflection", "Action & Reflection", "Action & Reflection", "Action & Reflection", "Action & Reflection", "Action & Reflection", "Action & Reflection"];
const LESSONS = [
  "Begin by noticing. Today is about honest observation — where you are, without judgment.",
  "Clarity starts with naming. Write what you truly want, in plain words.",
  "Your attention is a resource. Notice where it goes today.",
  "Gratitude rewires focus. List what is already working.",
  "Values first. What matters most to you — not to others?",
  "The quiet mind. Five minutes of stillness before the noise.",
  "Review your week. What surprised you about yourself?",
  "From clarity to intention. Choose one guiding intention for the weeks ahead.",
  "Words shape reality. Write your intention as a present-tense statement.",
  "Visualize gently. See one small scene of your intended 2027.",
  "Align your environment. Remove one friction, add one support.",
  "Affirmations with honesty. Choose words you can almost believe — then grow into them.",
  "Share your intention with one trusted person.",
  "Midpoint check. What is shifting? What needs adjusting?",
  "Action begins. One concrete step toward your intention — today.",
  "Small wins compound. Celebrate today's step, however small.",
  "Obstacles are information. What blocked you, and what does it teach?",
  "Build the habit. Attach your practice to something you already do daily.",
  "Serve someone. Generosity returns focus to what matters.",
  "Write a letter from your December 2027 self.",
  "Integration day. Review all 21 days. Choose what continues into 2027.",
];
export const JOURNEY: Day[] = LESSONS.map((lesson, i) => ({
  day: i + 1,
  phase: PHASES[i],
  lesson,
  exercise: "Journal for 10 minutes on today's lesson. Be specific and honest.",
  affirmation: "I am becoming the person my 2027 requires.",
  action: i < 7 ? "Observe and note." : i < 14 ? "Refine your intention." : "Take one real step.",
}));
