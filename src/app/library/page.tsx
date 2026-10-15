"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Library() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => { (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/login"; return; }
    const { data } = await supabase.from("books").select("*").order("created_at");
    setBooks(data ?? []);
  })(); }, []);

  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl text-[#8B5CF6] mb-2">Digital Library</h1>
      <p className="text-[#6B6580] mb-8 text-sm">Your books, included with your account.</p>
      {books.length === 0 && (
        <div className="bg-white rounded-2xl card-shadow p-8 text-center">
          <p className="text-lg mb-2"><em>Manifest Your 2027</em></p>
          <p className="text-sm text-[#6B6580]">by Cristiane Silva — coming soon to your library.</p>
        </div>
      )}
      <div className="space-y-4">
        {books.map(b => (
          <div key={b.id} className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="text-lg">{b.title}</h3>
            <p className="text-sm text-[#6B6580]">{b.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
