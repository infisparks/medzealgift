// app/layout.tsx

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
        {/* Light-mode */}
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#55B7D3"
        />
        <meta
          name="msapplication-navbutton-color"
          media="(prefers-color-scheme: light)"
          content="#55B7D3"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          media="(prefers-color-scheme: light)"
          content="default"
        />

        {/* Dark-mode */}
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1A202C"
        />
        <meta
          name="msapplication-navbutton-color"
          media="(prefers-color-scheme: dark)"
          content="#1A202C"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          media="(prefers-color-scheme: dark)"
          content="black-translucent"
        />

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
