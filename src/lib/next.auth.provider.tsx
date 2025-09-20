"use client";

import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { BookProvider } from "@/app/context/book.context";

export function NextAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <BookProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </BookProvider>
    </SessionProvider>
  );
}
