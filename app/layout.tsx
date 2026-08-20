import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "wh1t3-r4bb1t | CyberPrep",
  description: "CompTIA Network+ Study Matrix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents Grammarly/extensions from crashing the dev server */}
      <body 
        className="antialiased min-h-screen flex flex-col bg-black text-[#e0e0e0]"
        suppressHydrationWarning
      >
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}