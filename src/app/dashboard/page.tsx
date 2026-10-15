"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const MODULES = [
  ["AI Coach", "/coach", "Your personal AI companion for goals and reflections."],
  ["21-Day Journey", "/journey", "Three weeks: Clarity, Intention, Action."],
  ["Vision Board", "/vision-board", "Your visual map of 2027 intentions."],
  ["Gratitude Journal", "/journal", "Daily entries, prompts, and history."],
  ["Numerology", "/numerology", "Symbolic numbers for self-reflection."],
  ["Chakra Explorer", "/chakras", "Seven centers for guided reflection."],
  ["Library", "/library", "Your digital books, including Manifest Your 2027."],
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
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-2">Welcome{name ? `, ${name}` : ""}</h1>
      <p className="text-[#F7F3EA]/60 mb-10">Your 2027 begins with the vision you create today.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(([t, href, d]) => (
          <Link key={t} href={href} className="bg-[#142B45] rounded-2xl p-8 hover:border hover:border-[#D7B56D]/40">
            <h3 className="text-xl text-[#D7B56D] mb-2">{t}</h3>
            <p className="text-[#F7F3EA]/60 text-sm">{d}</p>
          </Link>
        ))}
      </div>
      <button onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/"))}
        className="mt-10 text-sm text-[#F7F3EA]/60 underline">Sign out</button>
    </main>
  );
}
