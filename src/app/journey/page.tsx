"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { JOURNEY } from "@/lib/journey";

export default function Journey() {
  const [done, setDone] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  async function auth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = "/login"; return null; }
    return session.access_token;
  }
  useEffect(() => { (async () => {
    const t = await auth(); if (!t) return;
    const r = await fetch("/api/journey", { headers: { Authorization: `Bearer ${t}` } });
    const j = await r.json(); setDone(j.done ?? []);
  })(); }, []);

  async function complete(day: number) {
    const t = await auth(); if (!t) return;
    await fetch("/api/journey", { method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
      body: JSON.stringify({ day, notes }) });
    setDone(d => [...d, day]); setNotes(""); setOpen(null);
  }

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-2">21-Day Manifestation Journey</h1>
      <p className="text-[#F7F3EA]/60 mb-8 text-sm">{done.length} of 21 days complete.</p>
      <div className="space-y-3">
        {JOURNEY.map(d => (
          <div key={d.day} className="bg-[#142B45] rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === d.day ? null : d.day)} className="w-full flex items-center gap-4 p-5 text-left">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${done.includes(d.day) ? "bg-[#D7B56D] text-[#091426]" : "border border-[#D7B56D]/40"}`}>{d.day}</span>
              <span><span className="block">{d.phase}</span><span className="text-xs text-[#F7F3EA]/50">Day {d.day}</span></span>
            </button>
            {open === d.day && (
              <div className="px-6 pb-6 space-y-3 text-sm">
                <p><span className="text-[#D7B56D]">Lesson:</span> {d.lesson}</p>
                <p><span className="text-[#D7B56D]">Exercise:</span> {d.exercise}</p>
                <p><span className="text-[#D7B56D]">Affirmation:</span> <em>{d.affirmation}</em></p>
                <p><span className="text-[#D7B56D]">Action:</span> {d.action}</p>
                {!done.includes(d.day) && (<>
                  <textarea className="w-full px-4 py-3 rounded-lg bg-[#091426] border border-[#D7B56D]/20 outline-none" rows={2} placeholder="Your notes (private)" value={notes} onChange={e => setNotes(e.target.value)} />
                  <button onClick={() => complete(d.day)} className="bg-[#D7B56D] text-[#091426] px-6 py-2 rounded-full text-sm font-medium">Mark complete</button>
                </>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
