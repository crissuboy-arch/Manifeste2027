import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Manifest 2027 AI — Wake up excited about your future",
  description: "Your 5-minute morning ritual: affirmations, gratitude, intentions and an AI coach. Turn your 2027 dreams into daily dopamine.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Manifest 2027", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} bg-[#FFF9F3] text-[#1E1B2E] antialiased`}>{children}      <script dangerouslySetInnerHTML={{ __html: `if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js").catch(()=>{});}` }} />
    </body>
    </html>
  );
}
