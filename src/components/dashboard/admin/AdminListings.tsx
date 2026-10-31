import { Trash2 } from "lucide-react";
import { deleteListing, type UserListing } from "@/lib/listings-store";
import { digitalServices, marketplaceServices } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminListings({
  listings,
  ownerNames,
}: {
  listings: UserListing[];
  ownerNames: Record<string, string>;
}) {
  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">
            {digitalServices.length + marketplaceServices.length}
          </div>
          <div className="text-xs text-mist">Annonces du catalogue officiel</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">{listings.length}</div>
          <div className="text-xs text-mist">Annonces publiées par des utilisateurs</div>
        </div>
      </div>

      <h3 className="mb-3 font-display text-sm font-semibold text-white">
        Annonces publiées par les utilisateurs
      </h3>

      {listings.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-sm text-mist">
          Aucune annonce utilisateur pour le moment.
        </div>
      ) : (
        <div className="glass-card overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-mist">
                <th className="px-5 py-3 font-medium">Annonce</th>
                <th className="px-5 py-3 font-medium">Vendeur</th>
                <th className="px-5 py-3 font-medium">Espace</th>
                <th className="px-5 py-3 font-medium">Publiée le</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3.5 text-white">{listing.title}</td>
                  <td className="px-5 py-3.5 text-mist">
                    {ownerNames[listing.ownerId] ?? "Utilisateur supprimé"}
                  </td>
                  <td className="px-5 py-3.5 text-mist">
                    {listing.space === "digital" ? "Digital" : "Marketplace"}
                  </td>
                  <td className="px-5 py-3.5 text-mist">{formatDate(listing.createdAt)}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="inline-flex items-center gap-1 text-xs text-mist/70 hover:text-orange-soft"
                    >
                      <Trash2 size={13} />
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
