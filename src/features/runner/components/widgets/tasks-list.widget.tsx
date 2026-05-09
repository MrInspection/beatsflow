"use client";

import { SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import {
  getRunnableNodes,
  useSessionStore,
} from "@/features/runner/store/session.store";
import { playSound } from "@/lib/sounds";

export function TasksListWidget() {
  const nodes = useSessionStore((state) => state.nodes);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const completedTaskIds = useSessionStore((state) => state.completedTaskIds);
  const completeTask = useSessionStore((state) => state.completeTask);
  const status = useSessionStore((state) => state.status);

  const currentNode = getRunnableNodes(nodes)[currentBlockIndex];
  const isTaskBlock = currentNode?.type === "task";

  if (!isTaskBlock) return null;

  const taskNode = currentNode as TaskNodeType;
  const { tasks } = taskNode.data;
  const completedCount = tasks.filter((task) =>
    completedTaskIds.includes(task.id),
  ).length;

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" />}>
        <SquareCheck className="size-5" />
        {completedCount > 0 && (
          <span className="ml-1 text-xs tabular-nums">
            {completedCount}/{tasks.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="mb-2 max-h-[50svh] w-80 gap-0 overflow-hidden border p-0"
      >
        <PopoverHeader className="border-b px-6 py-5">
          <PopoverTitle>{taskNode.data.label}</PopoverTitle>
        </PopoverHeader>
        <div className="h-full overflow-y-auto p-6">
          <div className="space-y-2.5">
            {tasks.map((task) => {
              const isCompleted = completedTaskIds.includes(task.id);
              const isSessionRunning =
                status === "running" || status === "paused";
              return (
                <div className="flex items-start gap-2" key={task.id}>
                  <Checkbox
                    id={task.id}
                    checked={isCompleted}
                    disabled={!isSessionRunning || isCompleted}
                    onCheckedChange={() => {
                      playSound("task-complete", 0.4);
                      completeTask(task.id);
                    }}
                  />
                  <Label
                    htmlFor={task.id}
                    className={
                      isCompleted ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {task.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
