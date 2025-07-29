import { createClient } from "@/services/supabase/client";

export const deleteThread = async (threadId: string) => {
  const supabase = createClient();
  return await supabase.from("threads").delete().eq("id", threadId);
};
