"use client";

import { SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskListItem } from "@/features/runner/components/session-stage/widgets/tasks-list/task-list-item";
import { useTasksListModel } from "@/features/runner/components/session-stage/widgets/tasks-list/tasks-list.model";
import { playSound } from "@/lib/sounds";

export function TasksListWidget() {
  const model = useTasksListModel();

  if (!model) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" />}>
        <SquareCheck className="size-5" />
        {model.completedCount > 0 && (
          <span className="ml-1 text-xs tabular-nums">
            {model.completedCount}/{model.totalCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="mb-2 max-h-[50svh] w-80 gap-0 overflow-hidden border p-0"
      >
        <PopoverHeader className="border-b px-6 py-5">
          <PopoverTitle>{model.title}</PopoverTitle>
        </PopoverHeader>
        <div className="h-full overflow-y-auto p-6">
          <div className="space-y-2.5">
            {model.tasks.map((task) => (
              <TaskListItem
                key={task.id}
                id={task.id}
                label={task.label}
                completed={task.completed}
                disabled={!model.isInteractive || task.completed}
                onComplete={() => {
                  playSound("task-complete", 0.5);
                  model.completeTask(task.id);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
