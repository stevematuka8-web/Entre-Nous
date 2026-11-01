import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ConnectClient } from "@/components/connect/ConnectClient";

export const metadata: Metadata = {
  title: "ENTRE-NOUS CONNECT — Messagerie",
  description:
    "Échangez directement avec les prestataires et acheteurs via ENTRE-NOUS CONNECT, la messagerie intégrée à la marketplace.",
};

export default function ConnectPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="px-6 py-24 text-center text-sm text-mist">
              Chargement de votre messagerie…
            </div>
          }
        >
          <ConnectClient />
        </Suspense>
      </main>
    </>
  );
}
