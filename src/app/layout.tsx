import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Radar — Afori-style Demo",
  description: "Frontend-only MVP: Inbox → Extraction → Timeline → Signals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
