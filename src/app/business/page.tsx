import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BusinessClient } from "@/components/business/BusinessClient";
import { services } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "ENTRE-NOUS BUSINESS — Apporteurs d'affaires",
  description:
    "Devenez apporteur d'affaires sur ENTRE-NOUS : mettez en relation vendeurs et acheteurs, suivez vos opportunités et touchez une commission sur chaque affaire conclue.",
};

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BusinessClient services={services} />
      </main>
      <Footer />
    </>
  );
}
