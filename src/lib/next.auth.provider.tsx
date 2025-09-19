"use client";

import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";

export function NextAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </SessionProvider>
  );
}
