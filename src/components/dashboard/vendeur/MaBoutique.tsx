"use client";

import { Store, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { deleteListing, type UserListing } from "@/lib/listings-store";

export function MaBoutique({
  listings,
  onPublishClick,
}: {
  listings: UserListing[];
  onPublishClick: () => void;
}) {
  if (listings.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
        <Store size={28} className="text-mist/40" />
        <h3 className="font-display text-base font-semibold text-white">
          Votre boutique est vide
        </h3>
        <p className="max-w-sm text-sm text-mist">
          Publiez votre premier service ou produit pour qu&apos;il apparaisse
          dans ENTRE-NOUS DIGITAL ou MARKETPLACE.
        </p>
        <Button variant="primary" onClick={onPublishClick} className="mt-2">
          Publier une annonce
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-mist">
          {listings.length} annonce{listings.length > 1 ? "s" : ""} publiée
          {listings.length > 1 ? "s" : ""}
        </p>
        <Button variant="primary" onClick={onPublishClick}>
          Publier une annonce
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div key={listing.id} className="glass-card overflow-hidden rounded-2xl">
            <div className="h-24 w-full" style={{ background: listing.cover }} />
            <div className="p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-violet-bright">
                {listing.category} · {listing.space === "digital" ? "Digital" : "Marketplace"}
              </span>
              <h3 className="mt-2 font-display text-sm font-semibold text-white">
                {listing.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-mist">{listing.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs font-semibold text-white">{listing.price}</span>
                <button
                  onClick={() => deleteListing(listing.id)}
                  className="flex items-center gap-1 text-xs text-mist/70 hover:text-orange-soft"
                >
                  <Trash2 size={13} />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
