"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
        >
          <Sparkles size={14} className="text-orange" />
          Mise en relation nouvelle génération
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Le digital et le business,{" "}
          <span className="text-gradient-violet">entre nous</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl text-balance text-base text-mist sm:text-lg"
        >
          Une marketplace unique pour trouver des services numériques,
          proposer vos produits, et mettre en relation ceux qui cherchent
          avec ceux qui proposent — avec ou sans intermédiaire.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card-strong neon-ring mt-10 flex w-full max-w-2xl items-center gap-3 rounded-full p-2 pl-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={20} className="shrink-0 text-violet-bright" />
          <input
            type="text"
            placeholder="Rechercher un service, un produit, un prestataire…"
            className="w-full bg-transparent text-sm text-white placeholder:text-mist/60 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="btn-glow shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Rechercher
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-mist/70"
        >
          <span>Recherches populaires :</span>
          {["Intégration IA", "Développeur web", "Identité visuelle", "Apporteur d'affaires"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:border-orange/50 hover:text-white"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
