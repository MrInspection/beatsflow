import { ClockIcon, Loader, Scroll } from "lucide-react";

type WorkflowBlockProgressProps = {
  secondsRemainingLabel: string;
  completedTasks?: number;
  totalTasks?: number;
};

export function WorkflowBlockProgress({
  secondsRemainingLabel,
  completedTasks,
  totalTasks,
}: WorkflowBlockProgressProps) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2.5">
      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
        <Loader className="size-3.5 animate-spin" />

        <span className="font-semibold text-xs">Running...</span>
      </div>

      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
        <ClockIcon className="size-3.5" />

        <span className="font-semibold text-xs tabular-nums">
          {secondsRemainingLabel} left
        </span>
      </div>

      {typeof totalTasks === "number" && totalTasks > 0 && (
        <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
          <Scroll className="size-3.5" />

          <span className="font-semibold text-xs">
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
      )}
    </div>
  );
}
