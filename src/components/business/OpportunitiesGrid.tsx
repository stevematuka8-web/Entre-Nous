"use client";

import { useMemo, useState } from "react";
import type { Service, ServiceSpace } from "@/lib/mock-data";
import { OpportunityCard } from "@/components/business/OpportunityCard";

const filters: { key: ServiceSpace | "tous"; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "digital", label: "Digital" },
  { key: "marketplace", label: "Marketplace" },
];

export function OpportunitiesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState<ServiceSpace | "tous">("tous");

  const filtered = useMemo(
    () => (active === "tous" ? services : services.filter((s) => s.space === active)),
    [active, services]
  );

  return (
    <div>
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === f.key
                ? "border-transparent bg-violet text-white"
                : "border-white/10 text-mist hover:border-orange/50 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service, i) => (
          <OpportunityCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </div>
  );
}
