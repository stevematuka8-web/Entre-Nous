import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogueGrid } from "@/components/catalogue/CatalogueGrid";
import { digitalCategories, digitalServices } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "ENTRE-NOUS DIGITAL — Services tech, IA & transformation numérique",
};

export default function DigitalPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative px-6 pb-10 pt-16">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
          <div className="relative mx-auto max-w-6xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              Espace digital
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              ENTRE-NOUS DIGITAL
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-mist sm:text-base">
              IA, développement, solutions SaaS, intégration et produits
              numériques : trouvez le bon prestataire ou publiez vos propres
              services en quelques minutes.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <CatalogueGrid services={digitalServices} categories={digitalCategories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
