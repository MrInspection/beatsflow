import { ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type WorkflowBlockHeaderProps = {
  label: string;
  durationMinutes: number;
  completed: boolean;
};

export function WorkflowBlockHeader({
  label,
  durationMinutes,
  completed,
}: WorkflowBlockHeaderProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className={cn("font-medium", completed && "text-muted-foreground")}>
        {label} <span className="font-normal text-muted-foreground">for</span>
      </span>
      <div className="flex items-center gap-1.5 rounded border-[1.4px] px-1.5 py-0.5 shadow-xs">
        <ClockIcon className="size-3.5 text-muted-foreground" />
        <span className="font-semibold text-muted-foreground text-xs">
          {durationMinutes}m
        </span>
      </div>
    </div>
  );
}
