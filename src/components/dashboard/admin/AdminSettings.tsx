"use client";

import { useState } from "react";

const SETTINGS_KEY = "entre-nous:admin-settings";

interface PlatformSettings {
  inscriptionsOuvertes: boolean;
  modeMaintenance: boolean;
  moderationAutomatique: boolean;
}

const defaultSettings: PlatformSettings = {
  inscriptionsOuvertes: true,
  modeMaintenance: false,
  moderationAutomatique: true,
};

function readSettings(): PlatformSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-0">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="mt-0.5 text-xs text-mist">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-violet" : "bg-white/10"
        }`}
        aria-pressed={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function AdminSettings() {
  const [settings, setSettings] = useState<PlatformSettings>(readSettings);

  const update = (key: keyof PlatformSettings, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch {
      // ignore — prototype storage only
    }
  };

  return (
    <div className="glass-card max-w-xl rounded-2xl p-6">
      <Toggle
        label="Inscriptions ouvertes"
        description="Autoriser la création de nouveaux comptes sur la plateforme."
        checked={settings.inscriptionsOuvertes}
        onChange={(v) => update("inscriptionsOuvertes", v)}
      />
      <Toggle
        label="Mode maintenance"
        description="Afficher un message de maintenance aux visiteurs (prototype — non appliqué)."
        checked={settings.modeMaintenance}
        onChange={(v) => update("modeMaintenance", v)}
      />
      <Toggle
        label="Modération automatique des annonces"
        description="Vérifier automatiquement les nouvelles annonces avant publication."
        checked={settings.moderationAutomatique}
        onChange={(v) => update("moderationAutomatique", v)}
      />

      <p className="mt-5 text-[11px] text-mist/60">
        Prototype — ces paramètres sont stockés localement et n&apos;affectent
        pas encore le comportement réel de la plateforme.
      </p>
    </div>
  );
}
