import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BusinessClient } from "@/components/business/BusinessClient";
import { services } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "ENTRE-NOUS BUSINESS — Apporteurs d'affaires",
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
