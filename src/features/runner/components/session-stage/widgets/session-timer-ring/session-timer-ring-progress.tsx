import type { ReactNode } from "react";

import { AnimatedArcProgressBar } from "@/components/ui/animated-arc-progress-bar";

type SessionTimerRingProgressProps = {
  min: number;
  max: number;
  value: number;
  colors: {
    primary: string;
    secondary: string;
  };
  children: ReactNode;
};

export function SessionTimerRingProgress({
  min,
  max,
  value,
  colors,
  children,
}: SessionTimerRingProgressProps) {
  return (
    <AnimatedArcProgressBar
      min={min}
      max={max}
      value={value}
      gaugePrimaryColor={colors.primary}
      gaugeSecondaryColor={colors.secondary}
      className="size-160"
    >
      {children}
    </AnimatedArcProgressBar>
  );
}
