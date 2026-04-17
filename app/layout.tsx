import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OxfordReserve — Oxford, MS Dining",
    template: "%s | OxfordReserve",
  },
  description:
    "Reserve tables at the best restaurants in Oxford, Mississippi. Fast, simple, no-hassle booking.",
  keywords: ["Oxford MS restaurants", "reservations", "dining", "Mississippi"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oxfordreserve.com",
    siteName: "OxfordReserve",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
