"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, authStatusAtom } from "@/lib/jotai/auth-atoms";
import type { User } from "@supabase/supabase-js";

type AuthProviderProps = {
  children: React.ReactNode;
  user?: User | null;
};

export default function AuthProvider({ children, user }: AuthProviderProps) {
  const [, setUser] = useAtom(userAtom);
  const [, setAuthStatus] = useAtom(authStatusAtom);

  useEffect(() => {
    if (user) {
      setUser(user);
      setAuthStatus("authenticated");
    }
  }, [user, setUser, setAuthStatus]);

  return <>{children}</>;
}
