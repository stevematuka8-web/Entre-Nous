import { Heart, MessageSquare, Search, Users } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/Button";

export function AcheteurOverview({
  favoritesCount,
  providersCount,
  conversationsCount,
  firstName,
}: {
  favoritesCount: number;
  providersCount: number;
  conversationsCount: number;
  firstName: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <KpiCard icon={Heart} label="Services favoris" value={String(favoritesCount)} />
        <KpiCard icon={Users} label="Prestataires contactés" value={String(providersCount)} />
        <KpiCard icon={MessageSquare} label="Conversations" value={String(conversationsCount)} />
      </div>

      <div className="mt-6 glass-card rounded-2xl p-6">
        <h3 className="font-display text-base font-semibold text-white">
          Bonjour {firstName} 👋
        </h3>
        <p className="mt-2 text-sm text-mist">
          Trouvez un service, suivez vos favoris et échangez directement avec
          les prestataires depuis votre espace.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href="/digital" variant="outline">
            <Search size={14} />
            Explorer Digital
          </Button>
          <Button href="/marketplace" variant="outline">
            <Search size={14} />
            Explorer Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
}
