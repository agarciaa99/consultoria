import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Consultoria",
  description:
    "Transformamos ideas en experiencias digitales excepcionales. Consultoria web especializada en desarrollo, diseno y estrategia digital.",
  keywords: ["consultoria web", "desarrollo web", "diseno digital"],
};

export const viewport: Viewport = {
  themeColor: "1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
