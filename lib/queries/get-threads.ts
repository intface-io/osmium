import { createClient } from "@/services/supabase/client";
import type { Thread } from "@/types/chat";

export const getThreads = async (userId?: string): Promise<Thread[] | null> => {
  if (!userId) {
    return [];
  }

  const supabase = createClient();
  return (
    await supabase
      .from("threads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
  ).data;
};
