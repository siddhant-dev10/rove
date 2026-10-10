import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rove — Travel thoughtfully planned by AI",
  description: "Experience effortless travel planning. Rove balances budgets, selects boutique stays, optimizes routes, and adapts to your journey with human care and precision.",
  icons: {
    icon: "/rove-logo.png",
    apple: "/rove-app-icon.png",
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} font-sans antialiased bg-[#FAF9F5] text-[#1C1917] selection:bg-[#E8DCCF] selection:text-[#1C1917]`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
