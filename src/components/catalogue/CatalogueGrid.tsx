"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Service, ServiceCategory } from "@/lib/mock-data";
import { ServiceCard } from "@/components/digital/ServiceCard";

export function CatalogueGrid({
  services,
  categories,
  emptyLabel = "Aucun service dans cette catégorie pour le moment.",
}: {
  services: Service[];
  categories: ServiceCategory[];
  emptyLabel?: string;
}) {
  const [active, setActive] = useState<ServiceCategory | "Tous">("Tous");

  const filtered = useMemo(
    () => (active === "Tous" ? services : services.filter((s) => s.category === active)),
    [active, services]
  );

  return (
    <div>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
        {(["Tous", ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "border-transparent bg-violet text-white"
                : "border-white/10 text-mist hover:border-orange/50 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-mist">{emptyLabel}</p>
      )}
    </div>
  );
}
