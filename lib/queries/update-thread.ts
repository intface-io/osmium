import type { Thread } from "@/types/chat";
import { createClient } from "@/services/supabase/client";

export const updateThread = async (threadId: string, data: Partial<Thread>) => {
  const supabase = createClient();
  return await supabase
    .from("threads")
    .update(data)
    .eq("id", threadId)
    .single();
};
