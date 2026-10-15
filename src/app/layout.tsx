import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Manifest 2027 AI — Ebook + App + AI Guide",
  description: "Manifest 2027 AI: an ebook, a mobile app and an AI guide for your 21-day journey of intention, confidence and personal transformation.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Manifest 2027", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#120b22",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className={`${nunito.variable} antialiased`}>{children}      <script dangerouslySetInnerHTML={{ __html: `if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js").catch(()=>{});}` }} />
    </body>
    </html>
  );
}
