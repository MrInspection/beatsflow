import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

type TaskListItemProps = {
  id: string;
  label: string;
  completed: boolean;
  disabled: boolean;
  onComplete: () => void;
};

export function TaskListItem({
  id,
  label,
  completed,
  disabled,
  onComplete,
}: TaskListItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        checked={completed}
        disabled={disabled}
        onCheckedChange={onComplete}
      />

      <Label
        htmlFor={id}
        className={cn(
          "leading-snug",
          completed && "text-muted-foreground line-through",
        )}
      >
        {label}
      </Label>
    </div>
  );
}
