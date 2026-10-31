"use client";

import { Briefcase, ShoppingBag, Users } from "lucide-react";
import { roleLabels, type UserRole } from "@/lib/auth-store";

const roleIcons: Record<UserRole, typeof ShoppingBag> = {
  prestataire: ShoppingBag,
  acheteur: Users,
  apporteur: Briefcase,
};

const roleDescriptions: Record<UserRole, string> = {
  prestataire: "Publier des services ou des produits",
  acheteur: "Rechercher et commander",
  apporteur: "Mettre en relation et toucher une commission",
};

export function RoleSelector({
  value,
  onChange,
}: {
  value: UserRole[];
  onChange: (roles: UserRole[]) => void;
}) {
  const toggle = (role: UserRole) => {
    if (value.includes(role)) {
      onChange(value.filter((r) => r !== role));
    } else {
      onChange([...value, role]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {(Object.keys(roleLabels) as UserRole[]).map((role) => {
        const Icon = roleIcons[role];
        const active = value.includes(role);
        return (
          <button
            type="button"
            key={role}
            onClick={() => toggle(role)}
            className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
              active
                ? "border-violet-bright/60 bg-violet/15"
                : "border-white/10 hover:border-white/25"
            }`}
          >
            <Icon
              size={18}
              className={active ? "text-violet-bright" : "text-mist"}
            />
            <span className="text-sm font-semibold text-white">
              {roleLabels[role]}
            </span>
            <span className="text-[11px] leading-snug text-mist">
              {roleDescriptions[role]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
