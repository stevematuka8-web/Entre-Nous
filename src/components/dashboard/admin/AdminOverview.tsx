import { Handshake, LayoutList, Users, Wallet } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import { roleLabels, type UserProfile, type UserRole } from "@/lib/auth-store";

export function AdminOverview({
  users,
  listingsCount,
  catalogueCount,
  dealsValidated,
  dealsPending,
}: {
  users: UserProfile[];
  listingsCount: number;
  catalogueCount: number;
  dealsValidated: number;
  dealsPending: number;
}) {
  const roleCounts: Record<UserRole, number> = {
    prestataire: 0,
    acheteur: 0,
    apporteur: 0,
  };
  for (const u of users) {
    for (const r of u.roles) roleCounts[r] += 1;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Users} label="Comptes inscrits" value={String(users.length)} />
        <KpiCard
          icon={LayoutList}
          label="Annonces publiées"
          value={String(catalogueCount + listingsCount)}
          hint={`${catalogueCount} catalogue · ${listingsCount} utilisateurs`}
        />
        <KpiCard icon={Handshake} label="Mises en relation" value={String(dealsValidated + dealsPending)} />
        <KpiCard icon={Wallet} label="Commissions validées" value={String(dealsValidated)} />
      </div>

      <div className="mt-6">
        <MiniBarChart
          title="Comptes par rôle actif"
          data={(Object.keys(roleLabels) as UserRole[]).map((role) => ({
            label: roleLabels[role].split(" ")[0],
            value: roleCounts[role],
          }))}
        />
      </div>
    </div>
  );
}
