import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { BlockStatus } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";
import { cn } from "@/lib/utils";

type WorkflowStatusDotProps = {
  status: BlockStatus;
  icon: LucideIcon;
  className?: string;
};

export function WorkflowStatusDot({
  status,
  icon: Icon,
  className,
}: WorkflowStatusDotProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-b-4 bg-background",
        status === "completed" && "border-emerald-400",
        className,
      )}
    >
      {status === "completed" ? (
        <Check className="size-4 text-emerald-500" aria-hidden="true" />
      ) : (
        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
      )}
    </div>
  );
}
