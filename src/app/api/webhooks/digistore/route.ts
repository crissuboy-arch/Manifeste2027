import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

// Digistore24 IPN handler — structure ready. Validates SHA-256 signature,
// logs the event idempotently. Premium granting happens only here (server-side),
// never via page redirect.
function validSignature(body: string, sig: string | null): boolean {
  const secret = process.env.DIGISTORE_IPN_SECRET ?? "";
  if (!secret || !sig) return false;
  const expected = createHash("sha256").update(body + secret).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch { return false; }
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("x-digistore-signature");
  // TODO: confirm Digistore24's actual signature scheme before going live
  if (!validSignature(raw, sig)) return NextResponse.json({ error: "bad signature" }, { status: 401 });

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const payload = JSON.parse(raw);
  const externalId = payload.transaction_id ?? payload.order_id ?? null;

  // Idempotency: skip if already processed
  if (externalId) {
    const { data } = await admin.from("payment_events").select("id").eq("external_id", externalId).limit(1);
    if (data?.length) return NextResponse.json({ ok: true, deduped: true });
  }

  await admin.from("payment_events").insert({
    event_type: payload.event ?? "unknown",
    external_id: externalId,
    payload,
    processed: true,
  });
  // TODO: grant premium (profiles.premium = true) on approved payment events
  return NextResponse.json({ ok: true });
}
