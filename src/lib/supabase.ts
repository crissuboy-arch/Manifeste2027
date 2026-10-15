import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error('Supabase env vars missing');
  _client = createClient(url, anon);
  return _client;
}

// Lazy proxy — safe to import at build time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    const c = getSupabase() as any;
    const v = c[prop];
    return typeof v === 'function' ? v.bind(c) : v;
  },
});
