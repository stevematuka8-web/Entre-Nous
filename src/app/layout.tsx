import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AdSenseScript } from "@/components/analytics/AdSenseScript";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://www.entre-nous.shop";
const SITE_DESCRIPTION =
  "La marketplace fintech nouvelle génération qui connecte prestataires, acheteurs et apporteurs d'affaires, dans le digital comme dans le business au quotidien.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ENTRE-NOUS — SaaS",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "ENTRE-NOUS",
    title: "ENTRE-NOUS — SaaS",
    description: SITE_DESCRIPTION,
    images: ["/og/transformation-numerique.jpg"],
  },
  twitter: {
    card: "summary",
    title: "ENTRE-NOUS — SaaS",
    description: SITE_DESCRIPTION,
  },
  other: {
    "google-adsense-account": "ca-pub-1747662964156156",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nuit-gradient text-foreground">
        <AuthProvider>{children}</AuthProvider>
        <CookieBanner />
        <GoogleAnalytics />
        <AdSenseScript />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
