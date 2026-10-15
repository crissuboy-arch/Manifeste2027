import { createClient } from '@supabase/supabase-js';

// Server-side only — uses service role. NEVER import in client components.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
