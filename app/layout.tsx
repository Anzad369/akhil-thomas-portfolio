import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akhil Thomas — Video Editor Portfolio",
  description: "Commercial & Vertical Reels Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-black antialiased selection:bg-black selection:text-white`}>
        {children}
      </body>
    </html>
  );
}