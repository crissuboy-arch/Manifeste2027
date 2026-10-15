"use client";
export const dynamic = "force-dynamic";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

type Msg = { role: "user" | "assistant"; content: string };

export default function Coach() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: "Welcome. I'm your Manifest 2027 coach. What's on your mind for 2027?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setMsgs(m => [...m, userMsg]);
    setInput(""); setBusy(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const r = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const j = await r.json();
      setMsgs(m => [...m, { role: "assistant", content: j.reply ?? j.error ?? "Something went wrong." }]);
    } catch { setMsgs(m => [...m, { role: "assistant", content: "Connection issue — try again." }]); }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] flex flex-col max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl text-[#8B5CF6] mb-6">AI Manifestation Coach</h1>
      <div className="flex-1 space-y-4 mb-6 min-h-[50vh]">
        {msgs.map((m, i) => (
          <div key={i} className={`rounded-2xl px-5 py-3 max-w-[85%] ${m.role === "user" ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white ml-auto" : "bg-white"}`}>{m.content}</div>
        ))}
        <div ref={bottom} />
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input className="flex-1 px-4 py-3 rounded-full bg-white border border-violet-300/20 outline-none" placeholder="Ask about your goals…" value={input} onChange={e => setInput(e.target.value)} />
        <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-6 rounded-full font-medium" disabled={busy}>{busy ? "…" : "Send"}</button>
      </form>
          <BottomNav />
    </main>
  );
}
