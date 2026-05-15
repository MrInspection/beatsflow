"use client";

import { NuqsAdapter } from "nuqs/adapters/next";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/features/music/providers/music-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <TooltipProvider delay={300}>
          <MusicProvider />
          {children}
          <Toaster position="top-center" />
        </TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
