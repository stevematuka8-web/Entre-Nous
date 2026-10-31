import type { LucideIcon } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <Icon size={18} className="text-violet-bright" />
      <div className="mt-3 font-display text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-mist">{label}</div>
      {hint && <div className="mt-1 text-[11px] text-orange-soft">{hint}</div>}
    </div>
  );
}
