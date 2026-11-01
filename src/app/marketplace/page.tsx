import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogueGrid } from "@/components/catalogue/CatalogueGrid";
import { AdSlot } from "@/components/analytics/AdSlot";
import { marketplaceCategories, marketplaceServices } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "ENTRE-NOUS MARKETPLACE — Produits, services et artisanat",
  description:
    "Vendez ou trouvez des produits physiques comme numériques, réservez des prestations et échangez directement avec les vendeurs sur ENTRE-NOUS MARKETPLACE.",
};

export default function MarketplacePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative px-6 pb-10 pt-16">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
          <div className="relative mx-auto max-w-6xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              Marketplace
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              ENTRE-NOUS MARKETPLACE
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-mist sm:text-base">
              Produits physiques et numériques, services professionnels,
              commerce et artisanat : ouvert à tous, professionnels comme
              particuliers.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <AdSlot slot="2222222222" className="mb-10" />
            <CatalogueGrid services={marketplaceServices} categories={marketplaceCategories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
