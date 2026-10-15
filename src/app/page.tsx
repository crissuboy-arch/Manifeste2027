import Link from "next/link";

const STEPS = [
  { emoji: "☀️", c: "from-amber-400 to-orange-500", t: "Morning spark", d: "Open the app, read today's affirmation, feel the shift in 60 seconds." },
  { emoji: "💛", c: "from-pink-400 to-rose-500", t: "Gratitude hit", d: "Write 3 things you're grateful for. Watch your mood lift instantly." },
  { emoji: "🎯", c: "from-violet-500 to-purple-600", t: "Set your intention", d: "One clear intention. Your AI coach helps you turn it into action." },
];

const FEATURES = [
  { emoji: "🔥", c: "from-orange-400 to-red-500", t: "Streaks that stick", d: "Daily streaks, XP and levels. Your brain will beg you to come back." },
  { emoji: "💬", c: "from-violet-500 to-indigo-600", t: "AI Manifestation Coach", d: "A coach in your pocket — affirmations, clarity, action plans." },
  { emoji: "🗺️", c: "from-emerald-400 to-teal-600", t: "21-Day Journey", d: "Clarity → Intention → Action. A guided adventure, not a chore." },
  { emoji: "🌟", c: "from-amber-400 to-yellow-600", t: "Vision Board 2027", d: "Pin your dreams. Watch them every day until they're real." },
  { emoji: "📝", c: "from-sky-400 to-blue-600", t: "Gratitude Journal", d: "Your daily dopamine journal with prompts and history." },
  { emoji: "🔢", c: "from-fuchsia-500 to-pink-600", t: "Numerology + Chakras", d: "Playful self-discovery tools for reflection and fun." },
];

const FAQS = [
  ["Is it really free to start?", "Yes! Create your account free and explore the full experience. Premium unlocks the complete book library and extras."],
  ["Do I need to believe in manifestation for this to work?", "Nope. Think of it as a daily mindset gym: gratitude, clarity and intentional action are backed by real habit science."],
  ["How much time does it take daily?", "About 5 minutes. One affirmation, three gratitudes, one intention. That's the whole ritual."],
  ["Is my journal private?", "Completely. Your entries are yours alone — protected by your account, never shared, never sold."],
];

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="absolute -inset-4 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 rounded-[3rem] blur-2xl opacity-40 anim-blob" />
      <div className="relative bg-[#1E1B2E] rounded-[2.8rem] p-2.5 card-shadow">
        <div className="bg-[#FFF9F3] rounded-[2.2rem] overflow-hidden">
          <div className="pt-8 pb-4 px-5">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-[#1E1B2E]">Good morning ☀️</p>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">🔥 12</span>
            </div>
            <div className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 rounded-3xl p-5 mb-4 anim-floaty">
              <p className="text-[10px] text-white/80 font-semibold tracking-widest mb-1">TODAY'S AFFIRMATION</p>
              <p className="text-white font-bold text-lg leading-snug">"I am becoming the person my 2027 needs."</p>
            </div>
            <p className="text-xs font-bold text-[#1E1B2E] mb-2">Today's ritual</p>
            {[["✨", "Read affirmation", true], ["💛", "3 gratitudes", true], ["🎯", "Set intention", false]].map(([e, t, done]) => (
              <div key={t as string} className="flex items-center gap-2.5 bg-white rounded-2xl px-3 py-2.5 mb-2 card-shadow">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${done ? "bg-emerald-400 text-white" : "bg-gray-200"}`}>{done ? "✓" : ""}</span>
                <span className="text-xs">{e}</span>
                <span className={`text-xs font-medium ${done ? "line-through text-gray-400" : "text-[#1E1B2E]"}`}>{t}</span>
              </div>
            ))}
            <div className="bg-white rounded-2xl p-3 mt-3 card-shadow flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">68%</div>
              <div><p className="text-xs font-bold text-[#1E1B2E]">21-Day Journey</p><p className="text-[10px] text-gray-500">Day 14 of 21 — keep going!</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-16 top-16 bg-white rounded-2xl px-4 py-3 card-shadow-pink anim-floaty2 hidden sm:block">
        <p className="text-2xl">🎉</p><p className="text-xs font-bold text-[#1E1B2E]">Level 5!</p><p className="text-[10px] text-gray-500">You're on fire</p>
      </div>
      <div className="absolute -right-14 bottom-24 bg-white rounded-2xl px-4 py-3 card-shadow anim-floaty hidden sm:block">
        <p className="text-2xl">💜</p><p className="text-xs font-bold text-[#1E1B2E]">+30 XP</p><p className="text-[10px] text-gray-500">Ritual complete</p>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#FFF9F3] text-[#1E1B2E] overflow-hidden">
      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between max-w-6xl mx-auto px-6 py-5">
        <span className="text-xl font-extrabold">✨ Manifest <span className="text-shine">2027</span></span>
        <div className="flex gap-3 items-center">
          <Link href="/login" className="text-sm font-semibold text-[#6B6580] hover:text-[#8B5CF6] px-3 py-2">Log in</Link>
          <Link href="/signup" className="text-sm font-bold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition shadow-lg shadow-fuchsia-500/30">Start free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-fuchsia-300/30 rounded-full blur-[120px] -top-20 -left-20 anim-blob" />
          <div className="absolute w-[400px] h-[400px] bg-violet-400/30 rounded-full blur-[120px] top-40 right-0 anim-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute w-[300px] h-[300px] bg-amber-300/40 rounded-full blur-[100px] bottom-0 left-1/3 anim-blob" style={{ animationDelay: "6s" }} />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 card-shadow mb-6 anim-floaty">
            <span>🌅</span><span className="text-sm font-bold">The 5-minute morning ritual for your 2027</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6">
            Wake up <span className="text-shine">excited</span> about your future.
          </h1>
          <p className="text-lg text-[#6B6580] mb-8 max-w-md">
            Manifest 2027 turns your mornings into a dopamine ritual — affirmations, gratitude, intentions and an AI coach that keeps you moving. Five minutes a day. Zero boredom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/signup" className="text-center font-bold text-white text-lg px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 hover:scale-105 transition shadow-xl shadow-fuchsia-500/30">
              ✨ Start my ritual — free
            </Link>
          </div>
          <div className="flex gap-6 text-sm text-[#6B6580]">
            <span>✅ Free to start</span><span>✅ 5 min/day</span><span>✅ Private by design</span>
          </div>
        </div>
        <PhoneMock />
      </section>

      {/* MARQUEE */}
      <div className="bg-[#1E1B2E] py-4 overflow-hidden -rotate-1 scale-[1.02]">
        <div className="flex gap-8 whitespace-nowrap anim-marquee w-max">
          {Array(2).fill(["🔥 Daily streaks", "✨ Affirmations", "💛 Gratitude", "🎯 Intentions", "💬 AI Coach", "🗺️ 21-Day Journey", "🌟 Vision Board", "📝 Journal"]).flat().map((t, i) => (
            <span key={i} className="text-white font-bold">{t}</span>
          ))}
        </div>
      </div>

      {/* RITUAL STEPS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-3">Your morning in <span className="text-shine">5 minutes</span></h2>
        <p className="text-center text-[#6B6580] mb-12">So simple your brain will crave it.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.t} className="bg-white rounded-[2rem] p-8 card-shadow hover:-translate-y-2 transition-transform">
              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${s.c} flex items-center justify-center text-3xl mb-5 ${i === 1 ? "anim-floaty" : i === 2 ? "anim-floaty2" : ""}`}>{s.emoji}</div>
              <p className="text-xs font-bold text-[#8B5CF6] tracking-widest mb-2">STEP {i + 1}</p>
              <h3 className="text-xl font-bold mb-2">{s.t}</h3>
              <p className="text-[#6B6580]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-violet-50 to-fuchsia-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-3">An app you'll <span className="text-shine">actually open</span> daily</h2>
          <p className="text-center text-[#6B6580] mb-12">Designed like your favorite apps — not like a textbook.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.t} className="bg-white rounded-[2rem] p-7 card-shadow hover:scale-[1.03] transition-transform">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.c} flex items-center justify-center text-2xl mb-4`}>{f.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{f.t}</h3>
                <p className="text-[#6B6580] text-[15px]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="relative bg-[#1E1B2E] rounded-[2.5rem] p-10 md:p-14 overflow-hidden">
          <div className="absolute w-[400px] h-[400px] bg-fuchsia-500/25 rounded-full blur-[100px] -top-20 -right-20 anim-blob" />
          <div className="absolute w-[300px] h-[300px] bg-amber-400/20 rounded-full blur-[100px] -bottom-20 -left-20 anim-blob" style={{ animationDelay: "4s" }} />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-amber-300 font-bold tracking-widest text-xs mb-4">📖 INCLUDED WITH YOUR ACCOUNT</p>
              <h2 className="text-4xl font-extrabold text-white mb-3"><em>Manifest Your 2027</em></h2>
              <p className="text-white/60 mb-2">by <span className="text-white font-semibold">Cristiane Silva</span></p>
              <p className="text-white/70 mb-8">The complete 21-day journey to clarity, intention and personal transformation — the full digital book, inside your app.</p>
              <Link href="/signup" className="inline-block font-bold text-[#1E1B2E] bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-3.5 rounded-full hover:scale-105 transition shadow-lg shadow-amber-400/30">Get instant access 🎉</Link>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-48 h-64 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 rounded-2xl card-shadow rotate-6 anim-floaty flex flex-col justify-between p-5">
                <p className="text-white/80 text-xs font-bold tracking-widest">21-DAY JOURNEY</p>
                <div><p className="text-white font-extrabold text-2xl leading-tight">Manifest Your 2027</p><p className="text-white/70 text-sm mt-1">Cristiane Silva</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-extrabold text-center mb-10">Questions? <span className="text-shine">Answered.</span></h2>
        <div className="space-y-4">
          {FAQS.map(([q, a]) => (
            <details key={q} className="bg-white rounded-3xl p-6 card-shadow group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">{q}<span className="text-[#8B5CF6] text-xl group-open:rotate-45 transition">+</span></summary>
              <p className="text-[#6B6580] mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="absolute inset-0 -z-10"><div className="absolute w-[500px] h-[300px] bg-gradient-to-r from-violet-400/30 via-fuchsia-400/30 to-amber-300/30 rounded-full blur-[100px] left-1/2 -translate-x-1/2 anim-blob" /></div>
        <p className="text-6xl mb-6 anim-floaty">🚀</p>
        <h2 className="text-5xl font-extrabold mb-4">2027 hasn't happened <span className="text-shine">yet.</span></h2>
        <p className="text-[#6B6580] text-lg mb-10">That's exactly why the best moment to start is this morning.</p>
        <Link href="/signup" className="inline-block font-bold text-white text-xl px-14 py-5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 hover:scale-105 transition shadow-2xl shadow-fuchsia-500/40">✨ Begin free today</Link>
        <p className="text-sm text-[#6B6580] mt-5">No credit card · 5 minutes a day · Cancel anytime</p>
      </section>

      <footer className="border-t border-violet-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-extrabold">✨ Manifest <span className="text-shine">2027</span></span>
          <div className="flex gap-6 text-sm text-[#6B6580]">
            <Link href="/privacy" className="hover:text-[#8B5CF6]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#8B5CF6]">Terms</Link>
            <Link href="/contact" className="hover:text-[#8B5CF6]">Contact</Link>
          </div>
          <p className="text-xs text-[#6B6580]/70">© 2026 · For reflection and personal growth 💜</p>
        </div>
      </footer>
    </main>
  );
}
