import Link from "next/link";
import { popularServices } from "@/lib/mock-data";
import { ServiceCard } from "@/components/digital/ServiceCard";

export function PopularServices() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              Sélection du moment
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Services populaires
            </h2>
          </div>
          <Link
            href="/digital"
            className="text-sm font-medium text-violet-bright transition-colors hover:text-orange"
          >
            Voir tout →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
