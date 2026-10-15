// Deterministic numerology — symbolic self-reflection, not predictive science.
const LETTER_VALUES: Record<string, number> = {
  a:1,j:1,s:1, b:2,k:2,t:2, c:3,l:3,u:3, d:4,m:4,v:4, e:5,n:5,w:5,
  f:6,o:6,x:6, g:7,p:7,y:7, h:8,q:8,z:8, i:9,r:9,
};
function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0);
  }
  return n;
}
export function lifePath(birthdate: string): number {
  const digits = birthdate.replace(/\D/g, "").split("").map(Number);
  return reduce(digits.reduce((a, b) => a + b, 0));
}
export function birthDay(birthdate: string): number {
  const day = Number(birthdate.split("-")[2]);
  return reduce(day);
}
function nameValue(name: string, filter: (ch: string) => boolean): number {
  const clean = name.toLowerCase().replace(/[^a-z]/g, "");
  let sum = 0;
  for (const ch of clean) if (filter(ch) && LETTER_VALUES[ch]) sum += LETTER_VALUES[ch];
  return reduce(sum || 0);
}
const isVowel = (ch: string) => "aeiou".includes(ch);
export function expressionNumber(name: string): number { return nameValue(name, () => true); }
export function soulUrge(name: string): number { return nameValue(name, isVowel); }
export function personality(name: string): number { return nameValue(name, (c) => !isVowel(c)); }

export const MEANINGS: Record<number, string> = {
  1: "Leadership, independence, new beginnings.",
  2: "Cooperation, balance, patience.",
  3: "Creativity, expression, optimism.",
  4: "Stability, discipline, foundations.",
  5: "Freedom, change, adventure.",
  6: "Responsibility, care, harmony.",
  7: "Reflection, analysis, inner wisdom.",
  8: "Ambition, organization, material mastery.",
  9: "Compassion, completion, generosity.",
  11: "Intuition and inspiration (master number).",
  22: "Vision turned into reality (master number).",
  33: "Service and healing through expression (master number).",
};
