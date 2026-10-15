"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Simple admin gate via env email list (comma separated)
const ADMINS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "").split(",").map(s => s.trim());

export default function Admin() {
  const [ok, setOk] = useState<boolean | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => { (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMINS.includes(user.email ?? "")) { setOk(false); return; }
    setOk(true);
    const [u, j, v] = await Promise.all([
      supabase.from("profiles").select("user_id", { count: "exact", head: true }),
      supabase.from("journal_entries").select("id", { count: "exact", head: true }),
      supabase.from("vision_items").select("id", { count: "exact", head: true }),
    ]);
    setStats({ users: u.count, journal: j.count, vision: v.count });
  })(); }, []);

  if (ok === null) return <main className="min-h-screen bg-[#091426] text-[#F7F3EA] p-10">Loading…</main>;
  if (!ok) return <main className="min-h-screen bg-[#091426] text-[#F7F3EA] p-10">Access denied.</main>;

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#D7B56D] mb-8">Admin Panel</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[["Users", stats?.users], ["Journal entries", stats?.journal], ["Vision items", stats?.vision]].map(([t, v]) => (
          <div key={t as string} className="bg-[#142B45] rounded-2xl p-6">
            <p className="text-3xl text-[#D7B56D]">{v ?? "…"}</p>
            <p className="text-sm text-[#F7F3EA]/60">{t}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#F7F3EA]/50 mt-8">Book uploads: use Supabase Storage + insert into <code>books</code> table. Payment events: <code>payment_events</code> table (service_role only).</p>
    </main>
  );
}
