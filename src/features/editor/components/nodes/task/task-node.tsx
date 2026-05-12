import { Handle, type NodeProps, Position } from "@xyflow/react";
import { ClockIcon, ListTodo, SquareFunction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ADVANCE_CONDITIONS,
  type TaskNodeType,
} from "@/features/shared/types/task-node.types";
import { cn } from "@/lib/utils";

export function TaskNode({ data, selected }: NodeProps<TaskNodeType>) {
  return (
    <div
      className={cn(
        "h-fit w-84 overflow-hidden rounded-lg border bg-background transition-shadow",
        selected ? "border-ring shadow-md ring-3 ring-ring/30" : "",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="border! size-2! border-muted-foreground bg-input!"
      />
      <div className="flex items-center gap-2 p-4 py-3">
        <ListTodo className="size-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1 truncate font-medium">
          {data.label === "" ? "Untitled Node" : data.label}
        </div>
        <Badge
          className="ml-auto shrink-0 bg-emerald-100/80 dark:bg-emerald-800/25 dark:text-emerald-400"
          variant="secondary"
        >
          Task
        </Badge>
      </div>

      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <InputGroup>
            <InputGroupInput
              value={data.durationMinutes}
              readOnly
              tabIndex={-1}
            />
            <InputGroupAddon align="inline-start">
              <ClockIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">minutes</InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label>Advances when</Label>
          <Select
            value={data.advanceCondition}
            items={ADVANCE_CONDITIONS}
            disabled
          >
            <SelectTrigger className="w-full">
              <SquareFunction className="size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Condition</SelectLabel>
                {ADVANCE_CONDITIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-1 space-y-2.5">
          <Label>Tasks</Label>
          {data.tasks.length === 0 && (
            <div className="flex h-36 flex-col items-center justify-center rounded-xl bg-neutral-100 p-4 dark:bg-muted/40">
              <div className="font-medium text-sm">No tasks</div>
              <p className="mt-1 max-w-[75%] text-center text-muted-foreground text-xs">
                You don't have any tasks for this productivity session.
              </p>
            </div>
          )}

          {data.tasks.map((task) => (
            <div className="flex items-start gap-2" key={task.id}>
              <Checkbox id={task.id} checked={task.completed} disabled />
              <Label
                htmlFor={task.id}
                className={cn(
                  "leading-snug",
                  task.completed && "text-muted-foreground line-through",
                )}
              >
                {task.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="border! size-2! border-muted-foreground bg-input!"
      />
    </div>
  );
}
