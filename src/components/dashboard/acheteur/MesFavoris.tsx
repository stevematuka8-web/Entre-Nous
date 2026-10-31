import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/digital/ServiceCard";
import type { Service } from "@/lib/mock-data";

export function MesFavoris({ favorites }: { favorites: Service[] }) {
  if (favorites.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
        <Heart size={28} className="text-mist/40" />
        <h3 className="font-display text-base font-semibold text-white">
          Aucun favori pour le moment
        </h3>
        <p className="max-w-sm text-sm text-mist">
          Cliquez sur le cœur d&apos;un service dans Digital ou Marketplace
          pour le retrouver ici.
        </p>
        <div className="mt-2 flex gap-3">
          <Button href="/digital" variant="primary">
            Explorer Digital
          </Button>
          <Button href="/marketplace" variant="outline">
            Explorer Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}
    </div>
  );
}
