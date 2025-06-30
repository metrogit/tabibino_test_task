"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, ReactNode } from "react";
import { UserRole } from "@/types/roles";

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: UserRole;
    accessToken: string;
  } | null;
  hasRole: (role: UserRole) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user;

  const hasRole = (role: UserRole): boolean => {
    return (session?.user as any)?.role === role;
  };

  const value: AuthContextType = {
    isAuthenticated,
    user: session?.user && session.user.email ? {
      email: session.user.email,
      role: (session.user as any).role,
      accessToken: (session.user as any).accessToken,
    } : null,
    hasRole,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ 
  children, 
  session 
}: { 
  children: ReactNode;
  session?: any;
}) {
  return (
    <SessionProvider session={session}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
