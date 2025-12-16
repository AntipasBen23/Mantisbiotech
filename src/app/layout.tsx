import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regulatory Readiness Radar (Demo)",
  description: "Frontend-only readiness + gap surfacing using mock JSON data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow-sm" />
                <div>
                  <div className="font-semibold tracking-tight">
                    Regulatory Readiness Radar
                  </div>
                  <div className="text-xs text-slate-300/80">
                    Next.js + Tailwind + TS • Frontend-only demo
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  MantisBiotech
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Demo
                </span>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-5 py-6 flex-1">
            {children}
          </main>

          <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-slate-400 flex flex-wrap justify-between gap-2">
              <span>No backend. No DB. No PHI. Just deterministic UI logic over JSON.</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
