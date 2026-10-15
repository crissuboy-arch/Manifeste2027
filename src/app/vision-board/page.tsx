"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

const CATS = ["Love", "Career", "Money", "Personal Growth", "Wellbeing"];

export default function VisionBoard() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(CATS[3]);

  async function token() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = "/login"; return null; }
    return session.access_token;
  }
  async function load() {
    const t = await token(); if (!t) return;
    const r = await fetch("/api/vision-board", { headers: { Authorization: `Bearer ${t}` } });
    setItems((await r.json()).items ?? []);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault(); if (!title.trim()) return;
    const t = await token(); if (!t) return;
    await fetch("/api/vision-board", { method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
      body: JSON.stringify({ title, description: desc, category: cat }) });
    setTitle(""); setDesc(""); load();
  }
  async function toggle(id: string, done: boolean) {
    const t = await token(); if (!t) return;
    await fetch("/api/vision-board", { method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
      body: JSON.stringify({ id, done: !done }) });
    load();
  }
  async function del(id: string) {
    const t = await token(); if (!t) return;
    await fetch(`/api/vision-board?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
    load();
  }

  const inp = "w-full mb-3 px-4 py-3 rounded-lg bg-[#FFF9F3] border border-violet-300/20 outline-none";
  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#8B5CF6] mb-6">Vision Board 2027</h1>
      <form onSubmit={add} className="bg-white rounded-2xl card-shadow p-6 mb-8">
        <input className={inp} placeholder="Your intention (e.g. Launch my business)" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className={inp} rows={2} placeholder="Details (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
        <div className="flex gap-2 mb-4 flex-wrap">
          {CATS.map(c => (
            <button type="button" key={c} onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs border ${cat === c ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-violet-300" : "border-violet-300/30"}`}>{c}</button>
          ))}
        </div>
        <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-6 py-2 rounded-full font-medium">Add to board</button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it => (
          <div key={it.id} className={`rounded-2xl p-6 ${it.done ? "bg-white/50 opacity-70" : "bg-white"}`}>
            <p className="text-xs text-[#8B5CF6] mb-1">{it.category}</p>
            <h3 className={`text-lg mb-1 ${it.done ? "line-through" : ""}`}>{it.title}</h3>
            {it.description && <p className="text-sm text-[#6B6580] mb-3">{it.description}</p>}
            <div className="flex gap-3 text-xs">
              <button onClick={() => toggle(it.id, it.done)} className="text-[#8B5CF6] underline">{it.done ? "Reopen" : "Mark done"}</button>
              <button onClick={() => del(it.id)} className="text-[#1E1B2E]/40 underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
          <BottomNav />
    </main>
  );
}
