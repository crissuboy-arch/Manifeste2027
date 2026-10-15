"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Creating account…");
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : "Check your email to confirm your account.");
  }

  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl p-8">
        <h1 className="text-2xl text-[#8B5CF6] mb-6 text-center">Begin your 2027</h1>
        <input className="w-full mb-3 px-4 py-3 rounded-lg bg-[#FFF9F3] border border-[#D7B56D]/20 outline-none" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full mb-4 px-4 py-3 rounded-lg bg-[#FFF9F3] border border-[#D7B56D]/20 outline-none" placeholder="Password (min 6 chars)" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3 rounded-full font-medium">Create Account</button>
        {msg && <p className="text-sm text-center mt-4 text-[#6B6580]">{msg}</p>}
        <p className="text-sm text-center mt-4 text-[#6B6580]">Have an account? <Link href="/login" className="text-[#8B5CF6]">Sign in</Link></p>
      </form>
    </main>
  );
}
