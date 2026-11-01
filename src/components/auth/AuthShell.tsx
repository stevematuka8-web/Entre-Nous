import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,black,transparent)]" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="glass-card-strong neon-ring mt-8 rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-mist">{subtitle}</p>

          <div className="mt-6">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-mist">{footer}</div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-mist/60">
          <ShieldCheck size={14} />
          Votre compte est réel et sécurisé — aucune transaction financière n&apos;est traitée à ce stade.
        </div>
      </div>
    </main>
  );
}
