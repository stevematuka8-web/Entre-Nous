import { dealStatusLabels, type Deal } from "@/lib/business-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminDeals({
  deals,
  proposerNames,
}: {
  deals: Deal[];
  proposerNames: Record<string, string>;
}) {
  const validated = deals.filter((d) => d.status === "validee").length;

  if (deals.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center text-sm text-mist">
        Aucune mise en relation proposée pour le moment.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">{deals.length}</div>
          <div className="text-xs text-mist">Mises en relation</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">{validated}</div>
          <div className="text-xs text-mist">Commissions validées</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">
            {deals.length - validated}
          </div>
          <div className="text-xs text-mist">En attente</div>
        </div>
      </div>

      <div className="glass-card overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-mist">
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Prestataire</th>
              <th className="px-5 py-3 font-medium">Apporteur</th>
              <th className="px-5 py-3 font-medium">Commission</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Proposée le</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3.5 text-white">{deal.serviceTitle}</td>
                <td className="px-5 py-3.5 text-mist">{deal.provider}</td>
                <td className="px-5 py-3.5 text-mist">
                  {proposerNames[deal.proposerId] ?? "—"}
                </td>
                <td className="px-5 py-3.5 text-mist">{deal.commissionRate}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                      deal.status === "validee"
                        ? "bg-violet/15 text-violet-bright"
                        : "bg-white/5 text-mist"
                    }`}
                  >
                    {dealStatusLabels[deal.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-mist">{formatDate(deal.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
