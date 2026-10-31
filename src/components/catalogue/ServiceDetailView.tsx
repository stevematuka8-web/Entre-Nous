import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/lib/mock-data";
import { getRelatedServices } from "@/lib/mock-data";
import { ServiceCard } from "@/components/digital/ServiceCard";
import { ContactPanel } from "@/components/digital/ContactPanel";
import { ProviderCard } from "@/components/digital/ProviderCard";
import { AdSlot } from "@/components/analytics/AdSlot";

export function ServiceDetailView({
  service,
  backHref,
  backLabel,
}: {
  service: Service;
  backHref: string;
  backLabel: string;
}) {
  const related = getRelatedServices(service);

  return (
    <>
      <section className="relative">
        <div className="h-56 w-full sm:h-72" style={{ background: service.cover }} />

        <div className="mx-auto -mt-16 max-w-6xl px-6">
          <div className="glass-card-strong rounded-3xl p-6 sm:p-8">
            <nav className="flex items-center gap-1 text-xs text-mist">
              <Link href={backHref} className="hover:text-white">
                {backLabel}
              </Link>
              <ChevronRight size={12} />
              <span className="text-white">{service.category}</span>
            </nav>

            <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              {service.title}
            </h1>
            <p className="mt-2 text-sm font-medium text-violet-bright">
              {service.category}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">
              Description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
              {service.fullDescription ?? service.description}
            </p>

            {service.portfolio && service.portfolio.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-lg font-semibold text-white">
                  Portfolio
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {service.portfolio.map((item) => (
                    <div
                      key={item.title}
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

            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-white">
                Le prestataire
              </h2>
              <div className="mt-4">
                <ProviderCard service={service} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ContactPanel service={service} />
            <AdSlot slot="3333333333" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl font-semibold text-white">
              Services similaires
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
