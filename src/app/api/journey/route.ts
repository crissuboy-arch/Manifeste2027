import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function client(req: NextRequest) {
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } });
}

export async function GET(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data } = await sb.from("journey_progress").select("day").eq("user_id", user.id);
  return NextResponse.json({ done: (data ?? []).map(d => d.day) });
}

export async function POST(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { day, notes } = await req.json();
  if (!day || day < 1 || day > 21) return NextResponse.json({ error: "Invalid day" }, { status: 400 });
  const { error } = await sb.from("journey_progress").upsert({ user_id: user.id, day, notes: notes ?? null });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
