# MANIFEST 2027 AI

American manifestation platform — book + PWA SaaS. 100% American English.

**Author:** Cristiane Silva
**Book:** *Manifest Your 2027* (included in the digital library)

## Stack
- Next.js 15 + Tailwind CSS (App Router)
- Supabase (auth, database, storage)
- OpenRouter (AI, server-side only)
- Vercel (deploy) + PWA

## Setup
```bash
npm install
cp .env.example .env.local
# fill in Supabase + OpenRouter keys (never commit them)
npm run dev
```

## Structure
- `src/app/page.tsx` — commercial landing page
- `src/app/(auth)/` — login, signup
- `src/app/dashboard/` — user dashboard (modules plug in here)
- `src/app/api/` — server routes (AI calls stay server-side)
- `src/lib/` — supabase clients

## Env vars (see .env.example)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `OPENROUTER_API_KEY`

## Status
FASE 2 in progress: base + auth + landing live. Modules next: AI Coach,
Numerology, 21-Day Journey, Gratitude Journal, Vision Board, Chakras, Library.
