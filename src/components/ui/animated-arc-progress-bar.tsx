import type React from "react";
import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedArcProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
  children,
}: AnimatedCircularProgressBarProps) {
  const radius = 45;
  const arcAngle = 270;
  const arcLength = (arcAngle / 360) * 2 * Math.PI * radius;
  const currentPercent = Math.max(
    0,
    Math.min(100, ((value - min) / (max - min)) * 100),
  );
  const progressLength = (currentPercent / 100) * arcLength;
  const remainderLength = arcLength - progressLength;

  const startAngleDeg = 135;
  const startAngleRad = (startAngleDeg * Math.PI) / 180;
  const startX = 50 + radius * Math.cos(startAngleRad);
  const startY = 50 + radius * Math.sin(startAngleRad);

  const endAngleDeg = startAngleDeg + arcAngle;
  const endAngleRad = (endAngleDeg * Math.PI) / 180;
  const endX = 50 + radius * Math.cos(endAngleRad);
  const endY = 50 + radius * Math.sin(endAngleRad);

  const arcPath = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 1 1 ${endX} ${endY}
  `;

  return (
    <div
      className={cn("relative size-40 font-semibold text-2xl", className)}
      style={{ transform: "translateZ(0)" }}
    >
      <svg fill="none" className="size-full" viewBox="0 0 100 100">
        <path
          d={arcPath}
          fill="none"
          stroke={gaugeSecondaryColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={arcPath}
          fill="none"
          stroke={gaugePrimaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${remainderLength + 1}`}
          style={{
            transition: "stroke-dasharray 1s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children ?? (
          <span className="fade-in animate-in">
            {Math.round(currentPercent)}
          </span>
        )}
      </div>
    </div>
  );
}
