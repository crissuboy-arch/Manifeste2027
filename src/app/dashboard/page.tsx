"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/login";
      else setEmail(data.user.email ?? null);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-2">Your 2027 Dashboard</h1>
      <p className="text-[#F7F3EA]/60 mb-10">{email ?? "…"}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {[["AI Coach", "Coming soon"], ["21-Day Journey", "Coming soon"], ["Vision Board", "Coming soon"], ["Gratitude Journal", "Coming soon"]].map(([t, s]) => (
          <div key={t} className="bg-[#142B45] rounded-2xl p-8">
            <h3 className="text-xl text-[#D7B56D] mb-2">{t}</h3>
            <p className="text-[#F7F3EA]/60">{s}</p>
          </div>
        ))}
      </div>
      <button onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/"))}
        className="mt-10 text-sm text-[#F7F3EA]/60 underline">Sign out</button>
    </main>
  );
}
