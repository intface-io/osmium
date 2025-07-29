import { createClient } from "@/services/supabase/client";
import { Message } from "@/types/chat";

export const getMessages = async (threadId: string) => {
  const supabase = createClient();
  return (
    await supabase
      .from("messages")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at")
  ).data as Message[];
};
