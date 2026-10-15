"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Signing in…");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-[#142B45] rounded-2xl p-8">
        <h1 className="text-2xl text-[#D7B56D] mb-6 text-center">Welcome back</h1>
        <input className="w-full mb-3 px-4 py-3 rounded-lg bg-[#091426] border border-[#D7B56D]/20 outline-none" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full mb-4 px-4 py-3 rounded-lg bg-[#091426] border border-[#D7B56D]/20 outline-none" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="w-full bg-[#D7B56D] text-[#091426] py-3 rounded-full font-medium">Sign In</button>
        {msg && <p className="text-sm text-center mt-4 text-[#F7F3EA]/70">{msg}</p>}
        <p className="text-sm text-center mt-4 text-[#F7F3EA]/60">No account? <Link href="/signup" className="text-[#D7B56D]">Sign up</Link></p>
      </form>
    </main>
  );
}
