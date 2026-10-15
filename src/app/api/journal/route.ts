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
  const { data } = await sb.from("journal_entries").select("*").eq("user_id", user.id).order("entry_date", { ascending: false }).limit(100);
  return NextResponse.json({ entries: data ?? [] });
}
export async function POST(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "Empty" }, { status: 400 });
  const { error } = await sb.from("journal_entries").insert({ user_id: user.id, content: content.slice(0, 5000) });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
export async function DELETE(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  await sb.from("journal_entries").delete().eq("id", id).eq("user_id", user.id);
  return NextResponse.json({ ok: true });
}
