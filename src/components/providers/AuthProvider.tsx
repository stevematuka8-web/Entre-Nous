"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import {
  fetchAdminId,
  fetchProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRoles,
  type AuthResult,
  type RegisterInput,
  type UserProfile,
  type UserRole,
} from "@/lib/auth-store";
import { clearDeals, loadDeals } from "@/lib/business-store";
import { clearFavorites, loadFavorites } from "@/lib/favorites-store";
import { clearListings, loadListings } from "@/lib/listings-store";
import { clearConversations, loadConversations } from "@/lib/messages-store";

interface AuthContextValue {
  user: UserProfile | null;
  ready: boolean;
  isAdmin: boolean;
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  setRoles: (roles: UserRole[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Subscribes to Supabase's own auth store and reacts in the callback —
    // the one case an effect may call setState directly, per
    // react.dev/learn/you-might-not-need-an-effect ("subscribe to an
    // external system, call setState in the callback").
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        setIsAdmin(false);
        setReady(true);
        clearFavorites();
        clearListings();
        clearConversations();
        clearDeals();
        return;
      }

      const userId = session.user.id;
      Promise.all([
        fetchProfile(userId),
        fetchAdminId(),
        loadFavorites(),
        loadListings(),
        loadConversations(),
        loadDeals(),
      ]).then(([profile, adminId]) => {
        setUser(profile);
        setIsAdmin(adminId === userId);
        setReady(true);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = useCallback((input: RegisterInput) => registerUser(input), []);
  const login = useCallback(
    (email: string, password: string) => loginUser(email, password),
    []
  );
  const logout = useCallback(() => logoutUser(), []);

  const setRoles = useCallback(
    async (roles: UserRole[]) => {
      if (!user) return;
      const ok = await updateUserRoles(user.id, roles);
      if (ok) setUser((u) => (u ? { ...u, roles } : u));
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, ready, isAdmin, register, login, logout, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
