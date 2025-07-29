"use client";
import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QCP client={queryClient}>{children}</QCP>;
}
