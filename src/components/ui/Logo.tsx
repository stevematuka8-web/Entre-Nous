import { clsx } from "clsx";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center gap-2 select-none", className)}>
      <Image
        src="/brand/logo-mark.png"
        alt="ENTRE-NOUS"
        width={37}
        height={32}
        className="h-8 w-auto"
        priority
      />
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        ENTRE<span className="text-orange">-</span>NOUS
        <span className="ml-1 text-xs font-medium text-mist align-top">SaaS</span>
      </span>
    </div>
  );
}
