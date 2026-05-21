"use client";

import type { PropsWithChildren } from "react";
import { MobileUnsupported } from "@/components/mobile-unsupported";
import { useMediaQuery } from "@/hooks/use-media-query";

export function MobileGuard({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (isMobile) return <MobileUnsupported />;
  return <>{children}</>;
}
