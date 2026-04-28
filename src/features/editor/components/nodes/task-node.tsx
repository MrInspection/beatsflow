// src/features/editor/components/nodes/TaskNode.tsx
"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
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
import {cn} from "@/lib/utils";
import {Empty, EmptyTitle} from "@/components/ui/empty";
import {Button} from "@/components/ui/button";

export type AdvanceCondition = "timer" | "all-tasks" | "any-task";

export type TaskItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type TaskNodeData = {
  label: string;
  durationMinutes: number;
  advanceCondition: AdvanceCondition;
  tasks: TaskItem[];
};

export type TaskNodeType = Node<TaskNodeData, "task">;

const ADVANCE_CONDITIONS = [
  { label: "Timer ends", value: "timer" },
  { label: "All tasks completed", value: "all-tasks" },
  { label: "Any task completed", value: "any-task" },
] as const;

export function TaskNode({ data, selected }: NodeProps<TaskNodeType>) {
  return (
    <div
      className={cn(
        "h-fit w-84 rounded-4xl border bg-background transition-shadow",
        selected ? "border-ring shadow-md ring-3 ring-ring/30" : "",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="border! size-2! border-muted-foreground bg-input!"
      />

      <div className="flex items-center gap-2 p-4 py-3">
        <ListTodo className="size-5 text-muted-foreground" />
        <div className="font-medium">{data.label}</div>
        <Badge className="ml-auto bg-emerald-100/80 dark:bg-emerald-800/25 text-emerald-400" variant="secondary">
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
          <Select value={data.advanceCondition} disabled>
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

        <div className="space-y-2.5 mb-1">
          <Label>Tasks</Label>
          {data.tasks.length === 0 && (
            <div className="bg-neutral-100 dark:bg-muted/40 p-4 rounded-xl flex flex-col items-center justify-center h-36">
              <div className="text-sm font-medium">No tasks</div>
              <p className="text-xs text-muted-foreground max-w-[75%] text-center mt-1">You don't have any tasks for this productivity session.</p>
            </div>
          )}

          {data.tasks.map((task) => (
            <div className="flex items-start gap-2" key={task.id}>
              <Checkbox id={task.id} checked={task.completed} disabled />
              <Label htmlFor={task.id}>{task.label}</Label>
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
