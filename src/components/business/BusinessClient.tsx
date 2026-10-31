"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Handshake, Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OpportunitiesGrid } from "@/components/business/OpportunitiesGrid";
import { MyDeals } from "@/components/business/MyDeals";
import type { Service } from "@/lib/mock-data";

const steps = [
  {
    icon: Search,
    title: "Trouvez une opportunité",
    text: "Parcourez les services Digital et Marketplace ouverts à la mise en relation.",
  },
  {
    icon: Handshake,
    title: "Mettez en relation",
    text: "Proposez le service à un acheteur de votre réseau, ou laissez-le vous trouver.",
  },
  {
    icon: Wallet,
    title: "Touchez votre commission",
    text: "Une fois l'affaire conclue, votre commission est validée sur votre espace.",
  },
];

export function BusinessClient({ services }: { services: Service[] }) {
  const [tab, setTab] = useState<"opportunites" | "mes-mises-en-relation">("opportunites");

  return (
    <>
      <section className="relative px-6 pb-10 pt-16">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange">
            Apporteurs d&apos;affaires
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            ENTRE-NOUS BUSINESS
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-mist sm:text-base">
            Mettez en relation vendeurs et acheteurs sur ENTRE-NOUS et touchez
            une commission sur chaque affaire conclue — sans créer vous-même
            le service.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="glass-card rounded-2xl p-5">
                <step.icon size={20} className="text-violet-bright" />
                <h3 className="mt-3 font-display text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-mist">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/compte" variant="primary">
              Activer le rôle apporteur d&apos;affaires
            </Button>
          </div>
        </div>
      </section>

      <section id="opportunites" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-6 border-b border-white/10">
            <button
              onClick={() => setTab("opportunites")}
              className={clsx(
                "border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
                tab === "opportunites"
                  ? "border-violet-bright text-white"
                  : "border-transparent text-mist hover:text-white"
              )}
            >
              Opportunités
            </button>
            <button
              onClick={() => setTab("mes-mises-en-relation")}
              className={clsx(
                "border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
                tab === "mes-mises-en-relation"
                  ? "border-violet-bright text-white"
                  : "border-transparent text-mist hover:text-white"
              )}
            >
              Mes mises en relation
            </button>
          </div>

          <div className="mt-8">
            {tab === "opportunites" ? (
              <OpportunitiesGrid services={services} />
            ) : (
              <MyDeals />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
