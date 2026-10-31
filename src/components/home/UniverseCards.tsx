"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Store } from "lucide-react";
import Link from "next/link";

const universes = [
  {
    key: "digital",
    title: "ENTRE-NOUS DIGITAL",
    tagline: "IA, développement, transformation numérique",
    description:
      "Trouvez un développeur, une agence ou une solution SaaS. Créez votre boutique et publiez vos services tech en quelques minutes.",
    href: "/digital",
    icon: Cpu,
    accent: "violet" as const,
    stats: [
      { label: "Catégories", value: "6" },
      { label: "Prestataires actifs", value: "240+" },
    ],
  },
  {
    key: "marketplace",
    title: "ENTRE-NOUS MARKETPLACE",
    tagline: "Produits, services et artisanat pour tous",
    description:
      "Vendez ou trouvez des produits physiques comme numériques, réservez des prestations et échangez directement avec les vendeurs.",
    href: "/marketplace",
    icon: Store,
    accent: "orange" as const,
    stats: [
      { label: "Annonces", value: "1 800+" },
      { label: "Vendeurs", value: "530+" },
    ],
  },
];

export function UniverseCards() {
  return (
    <section className="relative px-6 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {universes.map((u, i) => (
          <motion.div
            key={u.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8, rotateX: 2 }}
            className="group relative"
          >
            <Link href={u.href} className="block h-full">
              <div
                className={`glass-card-strong relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-300 ${
                  u.accent === "violet" ? "group-hover:neon-ring" : "group-hover:neon-ring-orange"
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-opacity duration-300 opacity-40 group-hover:opacity-70 ${
                    u.accent === "violet" ? "bg-violet" : "bg-orange"
                  }`}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      u.accent === "violet"
                        ? "bg-violet/15 text-violet-bright"
                        : "bg-orange/15 text-orange-soft"
                    }`}
                  >
                    <u.icon size={26} />
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-mist transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <h3 className="relative mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
                  {u.title}
                </h3>
                <p
                  className={`relative mt-1 text-sm font-medium ${
                    u.accent === "violet" ? "text-violet-bright" : "text-orange-soft"
                  }`}
                >
                  {u.tagline}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-mist">
                  {u.description}
                </p>

                <div className="relative mt-8 flex gap-8 border-t border-white/10 pt-5">
                  {u.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-xl font-bold text-white">
                        {s.value}
                      </div>
                      <div className="text-xs text-mist/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
