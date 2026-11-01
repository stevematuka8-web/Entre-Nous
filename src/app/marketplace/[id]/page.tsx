import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetailView } from "@/components/catalogue/ServiceDetailView";
import { marketplaceServices, getServiceById } from "@/lib/mock-data";
import { categoryImages } from "@/lib/category-images";

export function generateStaticParams() {
  return marketplaceServices.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "Service introuvable" };
  return {
    title: `${service.title} — ENTRE-NOUS MARKETPLACE`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [categoryImages[service.category]],
    },
  };
}

export default async function MarketplaceServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service || service.space !== "marketplace") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceDetailView service={service} backHref="/marketplace" backLabel="Marketplace" />
      </main>
      <Footer />
    </>
  );
}
