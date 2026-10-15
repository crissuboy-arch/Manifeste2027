import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SYSTEM = `You are the Manifest 2027 AI Coach — a warm, grounded companion for intention-setting and personal growth.
Help the user organize goals, generate personal affirmations, create action plans, and reflect. Recommend practices from a 21-day manifestation program when relevant.
Rules: never present spiritual beliefs, numerology, or energy practices as scientifically proven or as medical advice. Never promise wealth, relationships, healing, or guaranteed outcomes. Never invent studies, testimonials, or credentials. Keep replies concise and in American English.`;

// Simple in-memory rate limit (per instance)
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip) ?? { n: 0, t: now };
  if (now - h.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1; hits.set(ip, h);
  return h.n > 20;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { messages } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0)
    return NextResponse.json({ error: "No messages" }, { status: 400 });

  // Persist user message
  const lastUser = [...messages].reverse().find((m: any) => m.role === "user");
  if (lastUser) await supabase.from("coach_messages").insert({ user_id: user.id, role: "user", content: String(lastUser.content).slice(0, 4000) });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 503 });

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM }, ...messages.slice(-12)],
      max_tokens: 600,
    }),
  });
  if (!r.ok) return NextResponse.json({ error: "AI error" }, { status: 502 });
  const j = await r.json();
  const reply = j.choices?.[0]?.message?.content ?? "I'm here — could you say that again?";

  await supabase.from("coach_messages").insert({ user_id: user.id, role: "assistant", content: String(reply).slice(0, 4000) });
  return NextResponse.json({ reply });
}
