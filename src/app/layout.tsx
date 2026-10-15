import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manifest 2027 AI — Your 2027 Begins With the Vision You Create Today",
  description: "Turn your intentions into meaningful daily actions with your personal AI manifestation companion.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Manifest 2027", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#091426",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#091426] text-[#F7F3EA] antialiased">{children}</body>
    </html>
  );
}
