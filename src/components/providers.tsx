"use client";

import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/features/music/providers/music-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TooltipProvider delay={300}>
      <MusicProvider />
      {children}
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}
