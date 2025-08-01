import type { Database } from "./supabase";

type Message = Omit<Database["public"]["Tables"]["messages"]["Row"], "role"> & {
  role: "user" | "assistant" | "system";
};

type Thread = Database["public"]["Tables"]["threads"]["Row"];

export type { Message, Thread };
