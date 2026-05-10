import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

type WorkflowTaskItemProps = {
  label: string;
  completed: boolean;
};

export function WorkflowTaskItem({ label, completed }: WorkflowTaskItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox checked={completed} disabled />
      <Label className={cn(completed && "text-muted-foreground line-through")}>
        {label}
      </Label>
    </div>
  );
}
