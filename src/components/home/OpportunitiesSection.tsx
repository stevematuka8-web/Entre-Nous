"use client";

import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, Users } from "lucide-react";
import { opportunityRoles } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

const icons = {
  prestataire: ShoppingBag,
  acheteur: Users,
  apporteur: Briefcase,
};

export function OpportunitiesSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-bright/40 to-transparent" />

      <div className="mx-auto max-w-6xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange">
          Un seul compte, trois façons d&apos;avancer
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
          Développez vos opportunités
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-mist sm:text-base">
          Que vous proposiez un service, cherchiez un prestataire, ou mettiez
          les gens en relation : ENTRE-NOUS s&apos;adapte à votre rôle, sans
          jamais vous déconnecter.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {opportunityRoles.map((role, i) => {
            const Icon = icons[role.key as keyof typeof icons];
            const isOrange = role.accent === "orange";
            return (
              <motion.div
                key={role.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-7 text-left transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isOrange ? "bg-orange/15 text-orange-soft" : "bg-violet/15 text-violet-bright"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {role.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/inscription" variant="primary">
            Créer mon compte gratuitement
          </Button>
          <Button href="/business" variant="outline">
            Découvrir ENTRE-NOUS BUSINESS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
