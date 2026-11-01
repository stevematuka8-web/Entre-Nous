import { createClient } from "@/lib/supabase/client";

export type UserRole = "prestataire" | "acheteur" | "apporteur";

export const roleLabels: Record<UserRole, string> = {
  prestataire: "Prestataire",
  acheteur: "Acheteur",
  apporteur: "Apporteur d'affaires",
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  createdAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export type AuthResult =
  | { ok: true; pendingConfirmation?: boolean }
  | { ok: false; error: string };

function translateAuthError(message: string): string {
  if (/already registered|already exists|user_already_exists/i.test(message)) {
    return "Un compte existe déjà avec cet email.";
  }
  if (/invalid login credentials/i.test(message)) {
    return "Email ou mot de passe incorrect.";
  }
  if (/password should be at least/i.test(message)) {
    return "Le mot de passe est trop court (6 caractères minimum).";
  }
  if (/security purposes|rate limit/i.test(message)) {
    return "Trop de tentatives — réessayez dans quelques minutes.";
  }
  if (/email not confirmed/i.test(message)) {
    return "Confirmez votre email avant de vous connecter (vérifiez votre boîte de réception).";
  }
  return message;
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: { data: { name: input.name, roles: input.roles } },
  });

  if (error) return { ok: false, error: translateAuthError(error.message) };
  // With "Confirm email" enabled in Supabase Auth, signUp succeeds but
  // returns no session until the user clicks the confirmation link.
  if (!data.session) return { ok: true, pendingConfirmation: true };
  return { ok: true };
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: translateAuthError(error.message) };
  return { ok: true };
}

export async function logoutUser(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
  });
  if (error) return { ok: false, error: translateAuthError(error.message) };
  return { ok: true };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, error: translateAuthError(error.message) };
  return { ok: true };
}

export async function updateUserRoles(userId: string, roles: UserRole[]): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from("profiles").update({ roles }).eq("id", userId);
  return !error;
}

interface ProfileRow {
  id: string;
  name: string;
  email: string;
  roles: UserRole[] | null;
  created_at: string;
}

function toUserProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    roles: row.roles ?? [],
    createdAt: row.created_at,
  };
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, name, email, roles, created_at")
    .eq("id", userId)
    .maybeSingle();
  return data ? toUserProfile(data) : null;
}

/** All registered profiles, oldest first — used by the admin dashboard. */
export async function fetchAllProfiles(): Promise<UserProfile[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, name, email, roles, created_at")
    .order("created_at", { ascending: true });
  return (data ?? []).map(toUserProfile);
}

/**
 * Simple convention: the very first account ever registered is treated as
 * the platform administrator — there is no separate admin role or sign-up
 * flow (kept intentionally simple, as specified).
 */
export async function fetchAdminId(): Promise<string | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data?.id ?? null;
}
