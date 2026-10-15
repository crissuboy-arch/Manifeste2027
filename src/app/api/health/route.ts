import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, app: "manifest-2027-ai", time: new Date().toISOString() });
}
