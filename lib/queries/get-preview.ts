export const getPreview = async (threadId: string) => {
  return await fetch(
    process.env.NEXT_PUBLIC_PREVIEW_API_URL + `?threadId=${threadId}`
  ).then((res) => res.json());
};
