import { roleLabels, type UserProfile } from "@/lib/auth-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminUsers({ users, adminId }: { users: UserProfile[]; adminId: string }) {
  if (users.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center text-sm text-mist">
        Aucun utilisateur inscrit pour le moment.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-mist">
            <th className="px-5 py-3 font-medium">Utilisateur</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Activités</th>
            <th className="px-5 py-3 font-medium">Membre depuis</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-white/5 last:border-0">
              <td className="px-5 py-3.5 text-white">
                {u.name}
                {u.id === adminId && (
                  <span className="ml-2 rounded-full border border-orange/30 bg-orange/10 px-2 py-0.5 text-[10px] font-semibold text-orange-soft">
                    Administrateur
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5 text-mist">{u.email}</td>
              <td className="px-5 py-3.5 text-mist">
                {u.roles.length === 0
                  ? "—"
                  : u.roles.map((r) => roleLabels[r]).join(", ")}
              </td>
              <td className="px-5 py-3.5 text-mist">{formatDate(u.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
