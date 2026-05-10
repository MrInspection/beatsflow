import type { BlockStatus } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";
import { cn } from "@/lib/utils";

type WorkflowConnectorLineProps = {
  status: BlockStatus;
};

export function WorkflowConnectorLine({ status }: WorkflowConnectorLineProps) {
  return (
    <div
      className={cn(
        "absolute top-10 left-4 h-[calc(100%-1.5rem)] w-0.5 -translate-x-1/2 rounded",
        status === "completed" ? "bg-emerald-400" : "bg-border",
      )}
    />
  );
}
