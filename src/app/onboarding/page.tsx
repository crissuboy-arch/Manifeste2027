"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const AREAS = ["Love", "Career", "Money", "Personal Growth", "Wellbeing"];

export default function Onboarding() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [habits, setHabits] = useState("");
  const [msg, setMsg] = useState("");

  function toggle(list: string[], v: string, set: (x: string[]) => void) {
    set(list.includes(v) ? list.filter(i => i !== v) : [...list, v]);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Saving…");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/login"; return; }
    const { error } = await supabase.from("profiles").upsert({
      user_id: user.id, name, goal_2027: goal, interests,
      habits: habits.split(",").map(h => h.trim()).filter(Boolean),
      onboarding_done: true,
    });
    if (error) setMsg(error.message);
    else window.location.href = "/dashboard";
  }

  const inp = "w-full mb-4 px-4 py-3 rounded-lg bg-[#FFF9F3] border border-violet-300/20 outline-none";
  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] px-6 py-16">
      <form onSubmit={save} className="max-w-lg mx-auto bg-white rounded-2xl card-shadow p-8">
        <h1 className="text-2xl text-[#8B5CF6] mb-2">Welcome — let's personalize your 2027</h1>
        <p className="text-[#6B6580] mb-6 text-sm">Answer once. Your dashboard adapts to you.</p>
        <input className={inp} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
        <textarea className={inp} placeholder="Your main goal for 2027" rows={3} value={goal} onChange={e => setGoal(e.target.value)} required />
        <p className="text-sm text-[#8B5CF6] mb-2">Areas of interest</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {AREAS.map(a => (
            <button type="button" key={a} onClick={() => toggle(interests, a, setInterests)}
              className={`px-4 py-2 rounded-full text-sm border ${interests.includes(a) ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-violet-300" : "border-violet-300/30"}`}>{a}</button>
          ))}
        </div>
        <input className={inp} placeholder="Habits you want to build (comma separated)" value={habits} onChange={e => setHabits(e.target.value)} />
        <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3 rounded-full font-medium mt-2">Create My Dashboard</button>
        {msg && <p className="text-sm text-center mt-4 text-[#6B6580]">{msg}</p>}
      </form>
    </main>
  );
}
