"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const PROMPTS = [
  "What are three things you're grateful for today?",
  "Who made your day better, and how?",
  "What small moment brought you peace today?",
  "What challenge taught you something this week?",
];

export default function Journal() {
  const [entries, setEntries] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");

  async function token() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = "/login"; return null; }
    return session.access_token;
  }
  async function load() {
    const t = await token(); if (!t) return;
    const r = await fetch("/api/journal", { headers: { Authorization: `Bearer ${t}` } });
    setEntries((await r.json()).entries ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!text.trim()) return;
    const t = await token(); if (!t) return;
    await fetch("/api/journal", { method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
      body: JSON.stringify({ content: text }) });
    setText(""); load();
  }
  async function del(id: string) {
    const t = await token(); if (!t) return;
    await fetch(`/api/journal?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
    load();
  }
  const shown = q ? entries.filter(e => e.content.toLowerCase().includes(q.toLowerCase())) : entries;

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-6">Gratitude Journal</h1>
      <form onSubmit={save} className="bg-[#142B45] rounded-2xl p-6 mb-4">
        <p className="text-sm text-[#D7B56D] mb-2">{PROMPTS[Math.floor(Math.random() * PROMPTS.length)]}</p>
        <textarea className="w-full px-4 py-3 rounded-lg bg-[#091426] border border-[#D7B56D]/20 outline-none mb-3" rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="Write freely — this is private." />
        <button className="bg-[#D7B56D] text-[#091426] px-6 py-2 rounded-full font-medium">Save entry</button>
      </form>
      <input className="w-full mb-6 px-4 py-2 rounded-lg bg-[#142B45] border border-[#D7B56D]/20 outline-none text-sm" placeholder="Search entries…" value={q} onChange={e => setQ(e.target.value)} />
      <div className="space-y-3">
        {shown.map(e => (
          <div key={e.id} className="bg-[#142B45] rounded-2xl p-5">
            <p className="text-xs text-[#F7F3EA]/50 mb-2">{e.entry_date}</p>
            <p className="text-sm whitespace-pre-wrap">{e.content}</p>
            <button onClick={() => del(e.id)} className="text-xs text-[#F7F3EA]/40 underline mt-2">Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
