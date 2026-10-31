"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function VendeurSettings({ shopName: initialShopName }: { shopName: string }) {
  const [shopName, setShopName] = useState(initialShopName);
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      window.localStorage.setItem(
        "entre-nous:shop-settings",
        JSON.stringify({ shopName, bio })
      );
    } catch {
      // ignore — prototype storage only
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card max-w-xl rounded-2xl p-6">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-mist">
          Nom de votre boutique
        </label>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-violet-bright/50 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-mist">
          Présentation courte
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Présentez votre activité en quelques phrases."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
        />
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-violet-bright/20 bg-violet/10 p-3 text-xs text-mist">
          <CheckCircle2 size={15} className="text-violet-bright" />
          Paramètres enregistrés.
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-5">
        Enregistrer
      </Button>
    </form>
  );
}
