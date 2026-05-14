"use client";

import { ListTodo } from "lucide-react";
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
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="h-16 flex-col gap-0.5 rounded-xl bg-neutral-100 px-4 py-2 dark:bg-muted/80"
          />
        }
      >
        <ListTodo className="size-4" />
        <span className="mt-0.5 text-[10px] text-muted-foreground">Tasks</span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={16}
        className="max-h-[80svh] w-72 gap-0 overflow-hidden border p-0"
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
