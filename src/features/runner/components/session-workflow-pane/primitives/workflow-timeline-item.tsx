import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type WorkflowTimelineItemProps = {
  connector?: ReactNode;
  indicator: ReactNode;
  children: ReactNode;
  className?: string;
  faded?: boolean;
};

export function WorkflowTimelineItem({
  connector,
  indicator,
  children,
  className,
  faded,
}: WorkflowTimelineItemProps) {
  return (
    <section
      className={cn(
        "relative flex items-start gap-4",
        faded && "opacity-70",
        className,
      )}
    >
      {connector}
      {indicator}
      <div className="mt-1.5 min-w-0 flex-1">{children}</div>
    </section>
  );
}
