"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { lifePath, birthDay, expressionNumber, soulUrge, personality, MEANINGS } from "@/lib/numerology";

export default function Numerology() {
  const [birth, setBirth] = useState("");
  const [name, setName] = useState("");
  const [res, setRes] = useState<{ label: string; value: number }[] | null>(null);

  function calc(e: React.FormEvent) {
    e.preventDefault();
    if (!birth) return;
    const out = [
      { label: "Life Path Number", value: lifePath(birth) },
      { label: "Birth Day Number", value: birthDay(birth) },
    ];
    if (name.trim()) {
      out.push(
        { label: "Expression Number", value: expressionNumber(name) },
        { label: "Soul Urge Number", value: soulUrge(name) },
        { label: "Personality Number", value: personality(name) },
      );
    }
    setRes(out);
  }

  const inp = "w-full mb-4 px-4 py-3 rounded-lg bg-[#091426] border border-[#D7B56D]/20 outline-none";
  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-2">Numerology Calculator</h1>
      <p className="text-[#F7F3EA]/60 mb-8 text-sm">Symbolic self-reflection — calculations are deterministic and transparent, not predictions.</p>
      <form onSubmit={calc} className="bg-[#142B45] rounded-2xl p-8 mb-8">
        <label className="text-sm text-[#D7B56D]">Birth date</label>
        <input type="date" className={inp + " mt-1"} value={birth} onChange={e => setBirth(e.target.value)} required />
        <label className="text-sm text-[#D7B56D]">Full name (optional)</label>
        <input className={inp + " mt-1"} placeholder="Your full birth name" value={name} onChange={e => setName(e.target.value)} />
        <button className="w-full bg-[#D7B56D] text-[#091426] py-3 rounded-full font-medium">Calculate</button>
      </form>
      {res && (
        <div className="space-y-4">
          {res.map(r => (
            <div key={r.label} className="bg-[#142B45] rounded-2xl p-6 flex gap-6 items-center">
              <div className="text-4xl text-[#D7B56D] font-light w-16 text-center">{r.value}</div>
              <div><h3 className="text-lg">{r.label}</h3><p className="text-[#F7F3EA]/60 text-sm">{MEANINGS[r.value] ?? ""}</p></div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
