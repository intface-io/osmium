import { createClient } from "@/services/supabase/client";
import type { Thread } from "@/types/chat";

export const getAllThreads = async (): Promise<Thread[] | null> => {
  const supabase = createClient();
  return (
    await supabase
      .from("threads")
      .select("*")
      .order("created_at", { ascending: false })
  ).data;
};
