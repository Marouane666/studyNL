"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Role } from "@/lib/roles";

export type { Role };
export type AuthUser = { id: string; email: string; displayName: string; role: Role };

type AuthResult = { error?: string };

type Ctx = {
  user: AuthUser | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

async function parseJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await parseJson(res);
        if (!cancelled) setUser(data?.user ?? null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await parseJson(res);
    if (!res.ok) return { error: data?.error ?? "Something went wrong. Please try again." };
    setUser(data.user);
    return {};
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await parseJson(res);
      if (!res.ok) return { error: data?.error ?? "Something went wrong. Please try again." };

      if (data?.user) {
        setUser(data.user);
        return {};
      }

      // Account was created but the automatic sign-in right after didn't complete
      // (transient error), the account is real, so a normal login just works.
      return login(email, password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
