import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/digital/ServiceCard";
import { ProviderContactCard } from "@/components/profil/ProviderContactCard";
import { getProviderById, providers } from "@/lib/mock-data";

export function generateStaticParams() {
  return providers.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);
  return { title: provider ? `${provider.name} — ENTRE-NOUS` : "Profil introuvable" };
}

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = getProviderById(id);

  if (!provider) {
    notFound();
  }

  const initials = provider.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const digitalListings = provider.services.filter((s) => s.space === "digital");
  const marketplaceListings = provider.services.filter((s) => s.space === "marketplace");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative px-6 pb-10 pt-16">
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="glass-card-strong rounded-3xl p-8">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full btn-glow font-display text-2xl font-bold text-white">
                  {initials}
                </span>
                <div>
                  <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {provider.name}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-violet-bright">
                    {provider.role}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mist">
                    <span className="flex items-center gap-1 text-orange-soft">
                      <Star size={13} fill="currentColor" />
                      {provider.rating} · {provider.reviews} avis
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {provider.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {provider.memberSince}
                    </span>
                    <span>{provider.completedProjects} projets réalisés</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mist sm:text-base">
                {provider.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              {digitalListings.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">
                    Services — ENTRE-NOUS DIGITAL
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {digitalListings.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {marketplaceListings.length > 0 && (
                <div className={digitalListings.length > 0 ? "mt-10" : undefined}>
                  <h2 className="font-display text-lg font-semibold text-white">
                    Annonces — ENTRE-NOUS MARKETPLACE
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {marketplaceListings.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {provider.portfolio.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-lg font-semibold text-white">
                    Portfolio
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {provider.portfolio.map((item, i) => (
                      <div
                        key={`${item.title}-${i}`}
                        className="glass-card group overflow-hidden rounded-2xl"
                      >
                        <div
                          className="h-32 w-full transition-transform duration-300 group-hover:scale-105"
                          style={{ background: item.cover }}
                        />
                        <div className="p-3 text-xs text-mist">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <ProviderContactCard provider={provider} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
