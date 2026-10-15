"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { affirmationOfTheDay, greeting, computeStreak, levelFor, RITUALS } from "@/lib/dopamine";

const QUICK = [
  ["🔢", "Numerology", "/numerology", "from-fuchsia-500 to-pink-600"],
  ["☀️", "Chakras", "/chakras", "from-amber-400 to-orange-500"],
  ["📚", "Library", "/library", "from-sky-400 to-blue-600"],
];

export default function Dashboard() {
  const [name, setName] = useState("");
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [journeyPct, setJourneyPct] = useState(0);
  const [journeyDay, setJourneyDay] = useState(1);
  const [done, setDone] = useState<string[]>([]);
  const [celebrate, setCelebrate] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const affirmation = affirmationOfTheDay();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data: p } = await supabase.from("profiles").select("name,onboarding_done").eq("user_id", user.id).single();
      if (!p?.onboarding_done) { window.location.href = "/onboarding"; return; }
      setName((p.name || "").split(" ")[0] || "friend");

      const { data: jp } = await supabase.from("journey_progress").select("day,completed_at").eq("user_id", user.id).eq("completed", true);
      const dates = (jp || []).map(r => (r.completed_at as string).slice(0, 10));
      setStreak(computeStreak(dates));
      const days = new Set((jp || []).map(r => r.day));
      setJourneyPct(Math.round((days.size / 21) * 100));
      setJourneyDay(Math.min(days.size + 1, 21));

      const [{ count: jc }, { count: vc }] = await Promise.all([
        supabase.from("journal_entries").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("vision_items").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setXp(days.size * 10 + (jc || 0) * 5 + (vc || 0) * 3 + RITUALS.filter(r => isDone(r.id)).length * 2);
    })();
    setDone(JSON.parse(localStorage.getItem("ritual-" + today) || "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDone = (id: string) => done.includes(id);
  const toggle = (id: string) => {
    const next = isDone(id) ? done.filter(d => d !== id) : [...done, id];
    setDone(next);
    localStorage.setItem("ritual-" + today, JSON.stringify(next));
    if (next.length === RITUALS.length && done.length !== RITUALS.length) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
    }
  };

  const lvl = levelFor(xp);
  const allDone = done.length === RITUALS.length;

  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] pb-32">
      <div className="max-w-md mx-auto px-5 pt-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-[#6B6580]">{greeting()} ☀️</p>
            <h1 className="text-2xl font-extrabold">{name ? `${name}!` : "Welcome!"}</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-white rounded-2xl px-3 py-2 card-shadow flex items-center gap-1.5">
              <span className="text-lg">🔥</span><span className="font-extrabold text-orange-500">{streak}</span>
            </div>
            <div className="bg-white rounded-2xl px-3 py-2 card-shadow flex items-center gap-1.5">
              <span className="text-lg">⭐</span><span className="font-extrabold text-[#8B5CF6]">Lv {lvl.level}</span>
            </div>
          </div>
        </div>

        {/* XP BAR */}
        <div className="bg-white rounded-2xl p-3.5 card-shadow mb-5">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-[#8B5CF6]">Level {lvl.level}</span>
            <span className="text-[#6B6580]">{lvl.nextAt} XP to next level</span>
          </div>
          <div className="h-2.5 bg-violet-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 rounded-full transition-all" style={{ width: `${Math.round(lvl.progress * 100)}%` }} />
          </div>
        </div>

        {/* CELEBRATION */}
        {celebrate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-[2rem] p-10 card-shadow text-center anim-pop">
              <p className="text-6xl mb-3">🎉</p>
              <p className="text-2xl font-extrabold">Ritual complete!</p>
              <p className="text-[#6B6580]">+30 XP · You're unstoppable</p>
            </div>
          </div>
        )}

        {/* AFFIRMATION */}
        <div className="relative bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 rounded-[2rem] p-7 mb-5 overflow-hidden">
          <div className="absolute w-40 h-40 bg-white/20 rounded-full blur-2xl -top-10 -right-10" />
          <p className="text-[11px] text-white/80 font-bold tracking-[0.25em] mb-2">✨ TODAY'S AFFIRMATION</p>
          <p className="text-white text-2xl font-extrabold leading-snug mb-4">"{affirmation}"</p>
          <p className="text-white/70 text-sm">Say it out loud. Mean it. Feel it. 💜</p>
        </div>

        {/* RITUAL CHECKLIST */}
        <div className="bg-white rounded-[2rem] p-6 card-shadow mb-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-lg">Today's ritual 🌅</h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${allDone ? "bg-emerald-100 text-emerald-600" : "bg-violet-100 text-[#8B5CF6]"}`}>
              {done.length}/{RITUALS.length} done
            </span>
          </div>
          <div className="space-y-3">
            {RITUALS.map(r => {
              const d = isDone(r.id);
              return (
                <button key={r.id} onClick={() => toggle(r.id)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all ${d ? "bg-emerald-50" : "bg-[#FFF9F3] hover:bg-violet-50"}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-all ${d ? "bg-emerald-400 text-white anim-pop" : "bg-white border-2 border-violet-200"}`}>{d ? "✓" : ""}</span>
                  <span className="text-xl">{r.emoji}</span>
                  <span className={`font-semibold text-[15px] ${d ? "line-through text-gray-400" : ""}`}>{r.label}</span>
                </button>
              );
            })}
          </div>
          {allDone && <p className="text-center text-emerald-600 font-bold mt-4">🎉 Amazing! Come back tomorrow to keep your streak!</p>}
        </div>

        {/* JOURNEY */}
        <Link href="/journey" className="block bg-white rounded-[2rem] p-6 card-shadow mb-5 hover:scale-[1.02] transition">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#F3EFFF" strokeWidth="10" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="url(#jg)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * (1 - journeyPct / 100)}`} />
                <defs><linearGradient id="jg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#EC4899" />
                </linearGradient></defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-extrabold text-[#8B5CF6]">{journeyPct}%</span>
            </div>
            <div>
              <h2 className="font-extrabold text-lg">21-Day Journey 🗺️</h2>
              <p className="text-[#6B6580] text-sm">Day {journeyDay} of 21 — tap to continue your adventure →</p>
            </div>
          </div>
        </Link>

        {/* QUICK LINKS */}
        <h2 className="font-extrabold text-lg mb-3">Explore 🔮</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {QUICK.map(([e, t, href, c]) => (
            <Link key={t as string} href={href as string} className="bg-white rounded-3xl p-4 card-shadow text-center hover:scale-105 transition">
              <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${c} flex items-center justify-center text-2xl mb-2`}>{e}</div>
              <p className="text-xs font-bold">{t}</p>
            </Link>
          ))}
        </div>

        <button onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/"))}
          className="w-full text-center text-sm text-[#6B6580] py-3">Sign out</button>
      </div>
      <BottomNav />
    </main>
  );
}
