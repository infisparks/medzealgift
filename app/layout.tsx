// app/layout.tsx (Next.js 13+ App Router)
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),  // ← your public HTTPS URL
  title: "Scratch & Reveal Your Exclusive Coupon | MedZeal",
  description: "Scratch the card to reveal your exclusive MedZeal discount coupon for 2025",
  openGraph: {
    title: "Scratch to Reveal Your Coupon!",
    description: "Unlock your exclusive offer with MedZeal!",
    url: "/",                                    // relative to metadataBase
    siteName: "MedZeal",
    type: "website",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMEUw3G85GnOphc2b7_y03GnmyoPhWCy8XA&s",
        width: 1200,
        height: 630,
        alt: "MedZeal Coupon Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scratch to Reveal Your Coupon!",
    description: "Unlock your exclusive offer with MedZeal!",
    images: [
      "https://raw.githubusercontent.com/infisparks/images/refs/heads/main/gift.png",
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
  )
}
