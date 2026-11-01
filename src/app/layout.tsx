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

export const metadata: Metadata = {
  title: "ENTRE-NOUS — SaaS",
  description:
    "La marketplace fintech nouvelle génération qui connecte prestataires, acheteurs et apporteurs d'affaires, dans le digital comme dans le business au quotidien.",
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
