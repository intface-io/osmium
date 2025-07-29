import { createClient } from "@/services/supabase/client";

const generateCode = async ({
  threadId,
  userPrompt,
  signal,
}: {
  threadId: string;
  userPrompt: string;
  signal?: AbortSignal;
}) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return await fetch(process.env.NEXT_PUBLIC_CODEGEN_API_URL!, {
    method: "POST",
    body: JSON.stringify({ threadId, userPrompt }),
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
    signal,
  });
};

export { generateCode };
