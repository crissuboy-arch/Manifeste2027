"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Signing in…");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#120b22] text-[#f3ecdd] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-[#1a0f33] border border-[#d9b46c]/25 rounded-2xl p-8 shadow-2xl">
        <p className="text-center text-[11px] tracking-[0.25em] text-[#d9b46c] mb-2">MANIFEST 2027 AI</p>
        <h1 className="text-2xl text-[#d9b46c] mb-6 text-center font-semibold">Welcome back</h1>
        <input className="w-full mb-3 px-4 py-3 rounded-lg bg-[#120b22] border border-[#d9b46c]/20 outline-none placeholder:text-[#8f86a8] focus:border-[#7a4fd0]" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div className="relative mb-4">
          <input className="w-full px-4 py-3 pr-12 rounded-lg bg-[#120b22] border border-[#d9b46c]/20 outline-none placeholder:text-[#8f86a8] focus:border-[#7a4fd0]" placeholder="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d9b46c] text-lg">
            {showPw ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="w-full bg-gradient-to-r from-[#7a4fd0] to-[#d9b46c] text-[#120b22] py-3 rounded-full font-semibold hover:brightness-110 transition">Sign In</button>
        {msg && <p className="text-sm text-center mt-4 text-[#b9aec9]">{msg}</p>}
        <p className="text-sm text-center mt-4 text-[#b9aec9]">No account? <Link href="/signup" className="text-[#d9b46c] underline underline-offset-2">Sign up</Link></p>
      </form>
    </main>
  );
}
