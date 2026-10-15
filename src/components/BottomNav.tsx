"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard", label: "Home", emoji: "🏠" },
  { href: "/journey", label: "Journey", emoji: "🗺️" },
  { href: "/coach", label: "Coach", emoji: "💬" },
  { href: "/journal", label: "Journal", emoji: "📝" },
  { href: "/vision-board", label: "Vision", emoji: "🌟" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-[#8B5CF6]/10 px-2 pt-2"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="max-w-md mx-auto flex justify-around">
        {TABS.map(t => {
          const active = path === t.href;
          return (
            <Link key={t.href} href={t.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${active ? "bg-gradient-to-br from-[#8B5CF6]/15 to-[#EC4899]/15 scale-105" : "opacity-60 hover:opacity-100"}`}>
              <span className="text-2xl">{t.emoji}</span>
              <span className={`text-[10px] font-semibold ${active ? "text-[#8B5CF6]" : "text-[#6B6580]"}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
