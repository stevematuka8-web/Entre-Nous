import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { getProviderIdForService, type Service } from "@/lib/mock-data";

export function ProviderCard({ service }: { service: Service }) {
  const initials = service.provider
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full btn-glow font-display text-lg font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="font-display text-base font-semibold text-white">
            {service.provider}
          </div>
          <div className="text-xs text-mist">{service.providerRole}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-mist">
        <span className="flex items-center gap-1 text-orange-soft">
          <Star size={12} fill="currentColor" />
          {service.rating} · {service.reviews} avis
        </span>
        {service.providerLocation && (
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {service.providerLocation}
          </span>
        )}
      </div>

      {service.providerBio && (
        <p className="mt-4 text-sm leading-relaxed text-mist">{service.providerBio}</p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-mist">
        <div className="flex gap-6">
          {service.providerSince && <span>{service.providerSince}</span>}
          {typeof service.providerCompleted === "number" && (
            <span>{service.providerCompleted} projets réalisés</span>
          )}
        </div>
        <Link
          href={`/profil/${getProviderIdForService(service)}`}
          className="flex items-center gap-1 font-semibold text-violet-bright hover:text-orange"
        >
          Voir le profil
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
