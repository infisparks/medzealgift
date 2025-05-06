import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Scratch & Reveal Your Exclusive Coupon | MedZeal",
//   description: "Scratch the card to reveal your exclusive MedZeal discount coupon for 2025",
//   openGraph: {
//     title: "Scratch to Reveal Your Coupon!",
//     description: "Unlock your exclusive offer with Medzeal!",
//     images: ["https://raw.githubusercontent.com/infisparks/images/refs/heads/main/gift.png"],
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <Head>
        {/* Open Graph / WhatsApp Share */}

        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta property="og:title" content="Scratch to Reveal Your Coupons" />
        <meta
          property="og:description"
          content="Unlock your exclusive offer with Medzeal!"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/infisparks/images/refs/heads/main/gift.png"
        />
         <meta property="og:url" content="https://infispark.in" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scratch to Reveal Your Coupon!" />
        <meta
          name="twitter:description"
          content="Unlock your exclusive offer with Medzeal!"
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/infisparks/images/refs/heads/main/gift.png"
        />
      </Head>
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