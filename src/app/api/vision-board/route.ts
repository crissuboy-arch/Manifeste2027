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
  const { data } = await sb.from("vision_items").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return NextResponse.json({ items: data ?? [] });
}
export async function POST(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, category } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: "Empty" }, { status: 400 });
  const { error } = await sb.from("vision_items").insert({ user_id: user.id, title: title.slice(0, 200), description: (description ?? "").slice(0, 1000), category: category ?? "Personal Growth" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
export async function PATCH(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, done } = await req.json();
  await sb.from("vision_items").update({ done }).eq("id", id).eq("user_id", user.id);
  return NextResponse.json({ ok: true });
}
export async function DELETE(req: NextRequest) {
  const sb = client(req);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  await sb.from("vision_items").delete().eq("id", id).eq("user_id", user.id);
  return NextResponse.json({ ok: true });
}
