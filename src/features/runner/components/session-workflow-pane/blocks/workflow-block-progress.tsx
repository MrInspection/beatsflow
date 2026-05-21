import { ClockIcon, Loader, Pause, Scroll } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowBlockProgressProps = {
  secondsRemainingLabel: string;
  completedTasks?: number;
  totalTasks?: number;
  isRunning: boolean;
};

export function WorkflowBlockProgress({
  secondsRemainingLabel,
  completedTasks,
  totalTasks,
  isRunning,
}: WorkflowBlockProgressProps) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2.5">
      <div
        className={cn(
          "flex items-center gap-1.5",
          isRunning ? "text-orange-400" : "text-muted-foreground",
        )}
      >
        {isRunning ? (
          <Loader className="size-3.5 animate-spin" />
        ) : (
          <Pause className="size-3.5 fill-current" />
        )}
        <span className="font-semibold text-xs">
          {isRunning ? "Running..." : "Paused"}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-orange-400">
        <ClockIcon className="size-3.5" />
        <span className="font-semibold text-xs tabular-nums">
          {secondsRemainingLabel} left
        </span>
      </div>

      {typeof totalTasks === "number" && totalTasks > 0 && (
        <div className="flex items-center gap-1.5 text-orange-400">
          <Scroll className="size-3.5" />
          <span className="font-semibold text-xs">
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
      )}
    </div>
  );
}
