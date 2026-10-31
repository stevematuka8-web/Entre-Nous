"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProviderIdForService, type Service } from "@/lib/mock-data";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  getFavoriteIds,
  getServerFavoriteIds,
  subscribeToFavorites,
  toggleFavorite,
} from "@/lib/favorites-store";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { user } = useAuth();
  const router = useRouter();
  const favoriteIds = useSyncExternalStore(
    subscribeToFavorites,
    getFavoriteIds,
    getServerFavoriteIds
  );
  const favorite = favoriteIds.includes(service.id);

  const handleToggleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/connexion");
      return;
    }
    toggleFavorite(user.id, service.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group glass-card overflow-hidden rounded-2xl transition-shadow duration-300 hover:neon-ring"
    >
      <Link href={`/${service.space}/${service.id}`} className="relative block">
        <div className="h-32 w-full" style={{ background: service.cover }} />
        <button
          onClick={handleToggleFavorite}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <Heart
            size={15}
            className={favorite ? "text-orange" : "text-white"}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>
        <div className="px-5 pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-violet-bright">
            {service.category}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold leading-snug text-white">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mist">
            {service.description}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
        <div>
          <Link
            href={`/profil/${getProviderIdForService(service)}`}
            className="text-xs text-mist/70 hover:text-violet-bright hover:underline"
          >
            {service.provider}
          </Link>
          <div className="flex items-center gap-1 text-xs text-orange-soft">
            <Star size={12} fill="currentColor" />
            {service.rating} · {service.reviews} avis
          </div>
        </div>
        <Link
          href={`/${service.space}/${service.id}`}
          className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-violet/20"
        >
          {service.price}
        </Link>
      </div>
    </motion.div>
  );
}
