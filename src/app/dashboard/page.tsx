"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const MODULES = [
  ["AI Coach", "/coach", "Your personal AI companion for goals and reflections.", "✦"],
  ["21-Day Journey", "/journey", "Three weeks: Clarity, Intention, Action.", "☽"],
  ["Vision Board", "/vision-board", "Your visual map of 2027 intentions.", "◈"],
  ["Gratitude Journal", "/journal", "Daily entries, prompts, and history.", "❧"],
  ["Numerology", "/numerology", "Symbolic numbers for self-reflection.", "✧"],
  ["Chakra Explorer", "/chakras", "Seven centers for guided reflection.", "☀"],
  ["Library", "/library", "Your digital books, including Manifest Your 2027.", "❝"],
];

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data: p } = await supabase.from("profiles").select("name,onboarding_done").eq("user_id", user.id).single();
      if (!p?.onboarding_done) { window.location.href = "/onboarding"; return; }
      setName(p.name || user.email);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(215,181,109,0.1), transparent)" }} />
      <div className="relative max-w-5xl mx-auto px-6 py-14">
        <p className="text-[#D7B56D] tracking-[0.35em] text-[11px] mb-3">MANIFEST 2027 AI</p>
        <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "Georgia, serif" }}>Welcome{name ? `, ${name}` : ""}</h1>
        <p className="text-[#F7F3EA]/55 mb-12 italic">Your 2027 begins with the vision you create today.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map(([t, href, d, icon]) => (
            <Link key={t} href={href} className="group bg-[#142B45]/60 border border-[#D7B56D]/10 rounded-3xl p-7 hover:border-[#D7B56D]/35 hover:-translate-y-1 transition-all duration-300">
              <div className="text-2xl text-[#D7B56D] mb-3">{icon}</div>
              <h3 className="text-lg mb-1">{t}</h3>
              <p className="text-[#F7F3EA]/55 text-sm">{d}</p>
            </Link>
          ))}
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/"))}
          className="mt-12 text-sm text-[#F7F3EA]/50 underline hover:text-[#D7B56D]">Sign out</button>
      </div>
    </main>
  );
}
