import Link from "next/link";

const FEATURES = [
  { t: "AI Manifestation Coach", d: "A personal AI companion that helps you organize goals, craft affirmations, and turn intentions into daily actions.", icon: "✦" },
  { t: "21-Day Journey", d: "A guided three-week program — Clarity, Intention, Action — with daily lessons, exercises, and reflections.", icon: "☽" },
  { t: "Vision Board 2027", d: "Build your visual map of intentions, organized by love, career, money, growth, and wellbeing.", icon: "◈" },
  { t: "Numerology", d: "Discover your Life Path, Expression, and Soul Urge numbers through transparent, traditional calculations.", icon: "✧" },
  { t: "Gratitude Journal", d: "A private daily practice with guided prompts, search, and your complete history.", icon: "❧" },
  { t: "Chakra Explorer", d: "Seven interactive cards for reflection and mindfulness, rooted in traditional wisdom.", icon: "☀" },
];

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA] overflow-hidden">
      {/* Starfield backdrop */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(215,181,109,0.12), transparent)" }} />
        {[...Array(40)].map((_, i) => (
          <span key={i} className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: 1 + (i % 3), height: 1 + (i % 3),
              left: `${(i * 37) % 100}%`, top: `${(i * 53) % 60}%`,
              opacity: 0.15 + (i % 5) * 0.1,
              animationDelay: `${(i % 7) * 0.7}s`, animationDuration: `${3 + (i % 4)}s`,
            }} />
        ))}
      </div>

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between max-w-6xl mx-auto px-6 py-6">
        <span className="tracking-[0.35em] text-xs text-[#D7B56D]">MANIFEST&nbsp;2027</span>
        <div className="flex gap-3">
          <Link href="/login" className="text-sm text-[#F7F3EA]/70 hover:text-[#D7B56D] px-4 py-2">Sign in</Link>
          <Link href="/signup" className="text-sm bg-[#D7B56D] text-[#091426] px-5 py-2 rounded-full font-medium hover:brightness-110">Begin</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="text-[#D7B56D] tracking-[0.4em] text-[11px] mb-8">YOUR PERSONAL AI MANIFESTATION COMPANION</p>
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] mb-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Your 2027 Begins<br />
          With the Vision<br />
          <span className="italic text-[#D7B56D]">You Create Today.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#F7F3EA]/65 max-w-2xl mx-auto mb-12 font-light">
          Turn your intentions into meaningful daily actions — guided by AI, grounded in practice, designed for real life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="bg-[#D7B56D] text-[#091426] px-10 py-4 rounded-full font-medium text-lg hover:brightness-110 hover:scale-[1.02] transition shadow-[0_0_40px_rgba(215,181,109,0.25)]">
            Begin Your Journey
          </Link>
          <Link href="#features" className="text-[#F7F3EA]/70 hover:text-[#D7B56D] text-sm tracking-wide border-b border-[#D7B56D]/30 pb-1">
            Explore the experience
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6"><div className="h-px bg-gradient-to-r from-transparent via-[#D7B56D]/30 to-transparent" /></div>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "Georgia, serif" }}>Everything you need, <span className="italic text-[#D7B56D]">in one place</span></h2>
        <p className="text-center text-[#F7F3EA]/55 mb-14 max-w-xl mx-auto">Not another spiritual app — a complete practice for intentional living, powered by thoughtful AI.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.t} className="group bg-[#142B45]/60 backdrop-blur border border-[#D7B56D]/10 rounded-3xl p-8 hover:border-[#D7B56D]/35 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl text-[#D7B56D] mb-4">{f.icon}</div>
              <h3 className="text-xl mb-2 font-medium">{f.t}</h3>
              <p className="text-[#F7F3EA]/60 text-[15px] leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOK */}
      <section className="relative z-10 border-y border-[#D7B56D]/15 bg-[#0B1A30]/60">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-[#D7B56D] tracking-[0.35em] text-[11px] mb-6">INCLUDED WITH YOUR ACCOUNT</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "Georgia, serif" }}><em>Manifest Your 2027</em></h2>
          <p className="text-[#F7F3EA]/60 mb-2">by <span className="text-[#F7F3EA]">Cristiane Silva</span></p>
          <p className="text-[#F7F3EA]/55 max-w-xl mx-auto mb-8">A 21-day journey to clarity, intention, and personal transformation — the complete digital book, yours to keep.</p>
          <Link href="/signup" className="inline-block border border-[#D7B56D] text-[#D7B56D] px-8 py-3 rounded-full hover:bg-[#D7B56D] hover:text-[#091426] transition">Get instant access</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl font-light mb-12" style={{ fontFamily: "Georgia, serif" }}>Begin in <span className="italic text-[#D7B56D]">three steps</span></h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[["01", "Create your account", "Free to start. Your space is private and yours alone."], ["02", "Meet your AI coach", "Share your goals. Receive guidance shaped around your 2027."], ["03", "Practice daily", "Small rituals, real momentum — fifteen minutes a day."]].map(([n, t, d]) => (
            <div key={n}>
              <p className="text-[#D7B56D] text-sm tracking-[0.3em] mb-3">{n}</p>
              <h3 className="text-lg mb-2">{t}</h3>
              <p className="text-[#F7F3EA]/55 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 pt-8 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "Georgia, serif" }}>The year hasn't happened <span className="italic text-[#D7B56D]">yet.</span></h2>
        <p className="text-[#F7F3EA]/60 mb-10">That's exactly why now is the moment.</p>
        <Link href="/signup" className="inline-block bg-[#D7B56D] text-[#091426] px-12 py-4 rounded-full font-medium text-lg hover:brightness-110 shadow-[0_0_50px_rgba(215,181,109,0.3)]">Start free today</Link>
      </section>

      <footer className="relative z-10 border-t border-[#D7B56D]/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="tracking-[0.3em] text-[11px] text-[#D7B56D]/70">MANIFEST&nbsp;2027&nbsp;AI</span>
          <div className="flex gap-6 text-sm text-[#F7F3EA]/50">
            <Link href="/privacy" className="hover:text-[#D7B56D]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#D7B56D]">Terms</Link>
            <Link href="/contact" className="hover:text-[#D7B56D]">Contact</Link>
          </div>
          <p className="text-xs text-[#F7F3EA]/35">© 2026 · For reflection and personal growth.</p>
        </div>
      </footer>
    </main>
  );
}
