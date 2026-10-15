"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";

const CHAKRAS = [
  { name: "Root", sanskrit: "Muladhara", color: "#C0392B", meaning: "Grounding, safety, and belonging. The foundation of your inner life.", mantra: "LAM", reflection: "Where in my life do I feel safe — and where do I want more steadiness?", exercise: "Sit quietly for 3 minutes. Feel your feet on the floor. Breathe slowly and notice the sensation of being supported." },
  { name: "Sacral", sanskrit: "Svadhisthana", color: "#E67E22", meaning: "Creativity, emotion, and flow. The center of feeling and imagination.", mantra: "VAM", reflection: "What wants to be created through me right now?", exercise: "For 3 minutes, notice one emotion without judging it. Name it softly and let it move." },
  { name: "Solar Plexus", sanskrit: "Manipura", color: "#F1C40F", meaning: "Personal will, confidence, and direction. Your inner fire.", mantra: "RAM", reflection: "What decision have I been postponing — and what is one small step?", exercise: "Stand tall for 2 minutes. Breathe into your belly. Recall a moment you acted with courage." },
  { name: "Heart", sanskrit: "Anahata", color: "#27AE60", meaning: "Compassion, connection, and gratitude — for others and yourself.", mantra: "YAM", reflection: "Who (including myself) deserves a little more kindness from me today?", exercise: "Place a hand on your chest. Think of three things you are grateful for. Breathe with each one." },
  { name: "Throat", sanskrit: "Vishuddha", color: "#2980B9", meaning: "Expression and honest communication. Giving voice to your truth.", mantra: "HAM", reflection: "What truth of mine has been waiting to be spoken?", exercise: "Write one honest sentence you have not said aloud. Read it back to yourself, slowly." },
  { name: "Third Eye", sanskrit: "Ajna", color: "#6C3483", meaning: "Insight, intuition, and clear seeing beyond the obvious.", mantra: "OM", reflection: "If I trusted my quiet knowing, what would it tell me about 2027?", exercise: "Close your eyes for 3 minutes. Watch your thoughts pass like clouds, without following them." },
  { name: "Crown", sanskrit: "Sahasrara", color: "#8E44AD", meaning: "Connection to something larger — purpose, meaning, and stillness.", mantra: "Silence", reflection: "What gives my days meaning beyond achievement?", exercise: "Sit in stillness for 3 minutes. No goal. Simply be present with your breath." },
];

export default function Chakras() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl text-[#8B5CF6] mb-2">Chakra Explorer</h1>
      <p className="text-[#6B6580] mb-8 text-sm">Seven traditional centers, presented respectfully as cultural and reflective tools — not medical claims.</p>
      <div className="space-y-4">
        {CHAKRAS.map((c, i) => (
          <div key={c.name} className="bg-white rounded-2xl card-shadow overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center gap-4 p-6 text-left">
              <span className="w-8 h-8 rounded-full shrink-0" style={{ background: c.color }} />
              <span><span className="text-lg">{c.name}</span> <span className="text-[#6B6580] text-sm">· {c.sanskrit}</span></span>
            </button>
            {open === i && (
              <div className="px-6 pb-6 space-y-3 text-sm">
                <p className="text-[#1E1B2E]/80">{c.meaning}</p>
                <p><span className="text-[#8B5CF6]">Traditional mantra:</span> {c.mantra}</p>
                <p><span className="text-[#8B5CF6]">Reflect:</span> {c.reflection}</p>
                <p><span className="text-[#8B5CF6]">Practice:</span> {c.exercise}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
