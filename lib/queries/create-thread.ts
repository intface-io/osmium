import { createClient } from "@/services/supabase/client";
import { v4 as uuidv4 } from "uuid";

const createThread = async ({
  userId,
  title = "Untitled",
}: {
  userId?: string;
  title?: string;
}) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const supabase = createClient();
  return await supabase
    .from("threads")
    .insert({
      id: uuidv4(),
      user_id: userId,
      title: title,
    })
    .select("id, title, created_at, user_id")
    .single();
};

export { createThread };
