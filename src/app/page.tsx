import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#091426] text-[#F7F3EA]">
      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <p className="text-[#D7B56D] tracking-[0.3em] text-xs mb-6">MANIFEST 2027 AI</p>
        <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
          Your 2027 Begins With the Vision<br />You Create Today.
        </h1>
        <p className="text-lg text-[#F7F3EA]/70 max-w-2xl mx-auto mb-10">
          Turn your intentions into meaningful daily actions with your personal AI manifestation companion.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="bg-[#D7B56D] text-[#091426] px-8 py-3 rounded-full font-medium hover:opacity-90">
            Begin Your Journey
          </Link>
          <Link href="/login" className="border border-[#D7B56D]/40 px-8 py-3 rounded-full hover:border-[#D7B56D]">
            Sign In
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          ["AI Manifestation Coach", "A personal AI companion to organize goals, generate affirmations, and guide your daily practice."],
          ["21-Day Journey", "A structured three-week program: Clarity, Intention, and Action — with daily lessons and reflections."],
          ["Vision Board 2027", "Create your visual map of intentions, organized by what matters most to you."],
        ].map(([t, d]) => (
          <div key={t} className="bg-[#142B45] rounded-2xl p-8">
            <h3 className="text-[#D7B56D] text-xl mb-3">{t}</h3>
            <p className="text-[#F7F3EA]/70">{d}</p>
          </div>
        ))}
      </section>

      {/* BOOK */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center border-t border-[#D7B56D]/20">
        <h2 className="text-3xl font-light mb-4">Includes the Digital Book</h2>
        <p className="text-[#F7F3EA]/70 mb-2"><em>Manifest Your 2027</em> by Cristiane Silva</p>
        <p className="text-[#F7F3EA]/60 max-w-xl mx-auto">A 21-day journey to clarity, intention, and personal transformation — included with your account.</p>
      </section>

      <footer className="text-center text-[#F7F3EA]/40 text-sm py-10 border-t border-[#D7B56D]/10">
        <div className="flex gap-6 justify-center mb-4">
          <Link href="/privacy" className="hover:text-[#D7B56D]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#D7B56D]">Terms</Link>
          <Link href="/contact" className="hover:text-[#D7B56D]">Contact</Link>
        </div>
        <p>© 2026 Manifest 2027 AI. For reflection and personal growth.</p>
      </footer>
    </main>
  );
}
