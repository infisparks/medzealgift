// app/layout.tsx (RootLayout.tsx)

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
        {/* Dynamic theme color meta for dark/light mode */}
        <meta name="theme-color" content="#55B7D3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#55B7D3" media="(prefers-color-scheme: dark)" />

        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#55B7D3" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

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
