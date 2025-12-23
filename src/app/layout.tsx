import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAD Import & Metadata Extractor — Mantis Biotech",
  description: "Automatically extract metadata and geometry data from STEP, STL, and IGES CAD files",
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