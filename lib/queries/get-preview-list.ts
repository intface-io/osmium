export const getPreviewList = async () => {
  return await fetch(process.env.NEXT_PUBLIC_PREVIEW_LIST_API_URL!).then(
    (res) => res.json()
  );
};
