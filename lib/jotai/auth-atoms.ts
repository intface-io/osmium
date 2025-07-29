import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { createClient } from "@/services/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

// Store the auth session with persistence
export const sessionAtom = atomWithStorage<Session | null>(
  "supabase-session",
  null,
);

// Atom for the current user
export const userAtom = atom<User | null>(null);

// Status atom to track auth state
export const authStatusAtom = atom<
  "loading" | "authenticated" | "unauthenticated"
>("loading");

// Function to fetch the current user
export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// Derived atom for loading user data
export const loadableUserAtom = atom(
  (get) => get(userAtom),
  async (get, set) => {
    set(authStatusAtom, "loading");

    const user = await fetchCurrentUser();
    set(userAtom, user);

    // Update the auth status based on user existence
    set(authStatusAtom, user ? "authenticated" : "unauthenticated");

    return user;
  },
);

// Computed atom that gives the full auth state
export const authStateAtom = atom((get) => {
  const user = get(userAtom);
  const session = get(sessionAtom);
  const status = get(authStatusAtom);

  return {
    user,
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
});
