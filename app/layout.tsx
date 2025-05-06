// app/layout.tsx (or RootLayout.tsx)

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scratch & Reveal Your Exclusive Coupon | MedZeal",
  description: "Scratch the card to reveal your exclusive MedZeal discount coupon for 2025",
  openGraph: {
    title: "Scratch to Reveal Your Coupon!",
    description: "Unlock your exclusive offer with Medzeal!",
    images: ["https://i.ibb.co/xKcg3KNv/cover-1.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Tab / theme color */}
        <meta name="theme-color" content="#FF5722" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#FF5722" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#FF5722" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
