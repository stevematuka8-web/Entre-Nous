"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createListing, type ListingSpace } from "@/lib/listings-store";
import { digitalCategories, marketplaceCategories } from "@/lib/mock-data";

export function PublierAnnonce({
  ownerId,
  onPublished,
}: {
  ownerId: string;
  onPublished: () => void;
}) {
  const [space, setSpace] = useState<ListingSpace>("digital");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(digitalCategories[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const categories = space === "digital" ? digitalCategories : marketplaceCategories;

  const handleSpaceChange = (next: ListingSpace) => {
    setSpace(next);
    setCategory(next === "digital" ? digitalCategories[0] : marketplaceCategories[0]);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (title.trim().length < 4) {
      setError("Donnez un titre un peu plus descriptif à votre annonce.");
      return;
    }
    if (price.trim().length === 0) {
      setError("Indiquez un tarif, même approximatif.");
      return;
    }
    if (description.trim().length < 10) {
      setError("Ajoutez une courte description de votre offre.");
      return;
    }

    setSubmitting(true);
    const listing = await createListing(ownerId, { title, category, space, price, description });
    setSubmitting(false);

    if (!listing) {
      setError("La publication a échoué — réessayez dans un instant.");
      return;
    }

    setTitle("");
    setPrice("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    onPublished();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card max-w-xl rounded-2xl p-6">
      <div className="flex gap-2">
        {(["digital", "marketplace"] as ListingSpace[]).map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => handleSpaceChange(s)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              space === s
                ? "border-transparent bg-violet text-white"
                : "border-white/10 text-mist hover:border-orange/50 hover:text-white"
            }`}
          >
            {s === "digital" ? "Digital" : "Marketplace"}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-mist">
          Titre de l&apos;annonce
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Création de logo & identité visuelle"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-violet-bright/50 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-nuit-soft">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">Tarif</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="à partir de 200 €"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-mist">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Décrivez votre service ou votre produit en quelques phrases."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-orange/30 bg-orange/10 p-3 text-xs text-orange-soft">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-violet-bright/20 bg-violet/10 p-3 text-xs text-mist">
          <CheckCircle2 size={15} className="text-violet-bright" />
          Annonce publiée dans votre boutique.
        </div>
      )}

      <Button type="submit" variant="primary" disabled={submitting} className="mt-5 w-full">
        {submitting ? "Publication en cours…" : "Publier l'annonce"}
      </Button>
    </form>
  );
}
