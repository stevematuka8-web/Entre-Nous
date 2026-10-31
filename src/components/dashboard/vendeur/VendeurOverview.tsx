import { Eye, FileText, Package, Wallet } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { MiniBarChart } from "@/components/dashboard/MiniBarChart";

const visitsByDay = [
  { label: "Lun", value: 18 },
  { label: "Mar", value: 24 },
  { label: "Mer", value: 31 },
  { label: "Jeu", value: 22 },
  { label: "Ven", value: 38 },
  { label: "Sam", value: 29 },
  { label: "Dim", value: 15 },
];

export function VendeurOverview({ listingCount }: { listingCount: number }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Eye} label="Visiteurs (7 jours)" value="177" hint="+12% vs semaine dernière" />
        <KpiCard icon={FileText} label="Demandes reçues" value="9" hint="3 en attente de réponse" />
        <KpiCard icon={Package} label="Commandes en cours" value="4" />
        <KpiCard icon={Wallet} label="Chiffre d'affaires (mois)" value="2 340 €" hint="Données fictives" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <MiniBarChart title="Visiteurs sur 7 jours" data={visitsByDay} />
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-display text-sm font-semibold text-white">Ma boutique</h3>
          <p className="mt-2 text-sm text-mist">
            {listingCount === 0
              ? "Vous n'avez encore publié aucune annonce."
              : `${listingCount} annonce${listingCount > 1 ? "s" : ""} publiée${listingCount > 1 ? "s" : ""}.`}
          </p>
          <p className="mt-3 text-xs text-mist/70">
            Rendez-vous dans « Ma boutique » pour gérer vos annonces, ou «
            Publier une annonce » pour en ajouter une nouvelle.
          </p>
        </div>
      </div>
    </div>
  );
}
