"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, GripVertical, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TaskItem } from "@/features/editor/types/task-node.types";
import { cn } from "@/lib/utils";

export function SortableTaskItem({
  task,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  task: TaskItem;
  onUpdate: (taskId: string, changes: Partial<TaskItem>) => void;
  onDelete: (taskId: string) => void;
  onDuplicate: (taskId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center rounded-full bg-input/50 px-2",
        isDragging && "opacity-50",
      )}
    >
      <Checkbox
        className="size-5 rounded-full"
        checked={task.completed}
        onCheckedChange={(value) => onUpdate(task.id, { completed: value })}
      />
      <Input
        className={cn(
          "mr-2 h-8 rounded-none bg-transparent px-2 text-xs",
          task.completed && "text-muted-foreground line-through",
        )}
        value={task.label}
        placeholder="Enter task name"
        onChange={(e) => onUpdate(task.id, { label: e.target.value })}
      />
      <div className="ml-auto flex items-center">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onDuplicate(task.id)}
              />
            }
          >
            <CopyIcon
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">Duplicate</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Duplicate</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onDelete(task.id)}
              />
            }
          >
            <TrashIcon
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">Delete</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
        <Button
          variant="ghost"
          size="icon-xs"
          className="cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
