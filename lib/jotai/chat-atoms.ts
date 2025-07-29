import { atomWithStorage } from "jotai/utils";

// Create an atom for the initial message with a thread ID
export const initialMessageAtom = atomWithStorage<{
  threadId: string | null;
  message: string | null;
}>("initialMessage", {
  threadId: null,
  message: null,
});
