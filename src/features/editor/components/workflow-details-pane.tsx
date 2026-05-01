"use client";

import {
  CopyIcon,
  GripVertical,
  ListTodo,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function WorkflowDetailsPane() {
  const ADVANCE_CONDITIONS = [
    { label: "Timer ends", value: "timer" },
    { label: "All tasks completed", value: "all-tasks" },
    { label: "Any task completed", value: "any-task" },
  ] as const;

  const [duration, setDuration] = useState(20);

  return (
    <div className="rounded-r-4xl bg-neutral-100 p-4 dark:border dark:border-l-0 dark:bg-muted/10">
      <aside className="flex h-full w-90 flex-1 shrink-0 flex-col overflow-hidden rounded-2xl border bg-background shadow-xs">
        <div className="flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ListTodo className="size-6 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium">Task Node</div>
            <p className="text-muted-foreground text-xs">
              Checklist while a time limit
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto border-t p-4 py-5">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="E.g. Review PRs" />
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label>Duration</Label>
              <span className="font-bold text-xl tabular-nums">{duration}m</span>
            </div>
            <Slider className="mt-3" defaultValue={[5, 60]} max={60} step={5} value={duration} onValueChange={(value) => setDuration(Array.isArray(value) ? value[0] : value)} />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">5m (MIN)</span>
              <span className="text-muted-foreground text-sm">60m (MAX)</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Advances when</Label>
            <Select items={ADVANCE_CONDITIONS}>
              <SelectTrigger className="w-full">
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
          <div>
            <Label>Tasks</Label>
            <div className="mt-3 space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <TaskItem key={index} />
              ))}
            </div>

            <Button
              className="mt-2 w-full border-dashed"
              variant="outline"
              size="sm"
            >
              <PlusIcon className="size-4" /> Add task
            </Button>
          </div>
        </div>
        <div className="border-t p-4">
          <Button className="w-full" variant="destructive">
            Delete Node
          </Button>
        </div>
      </aside>
    </div>
  );
}

function TaskItem() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center rounded-full bg-input/50 px-2">
      <Checkbox
        className="size-5 rounded-full"
        onCheckedChange={setChecked}
        checked={checked}
      />
      <Input
        className={cn(
          "mr-2 h-8 rounded-none bg-transparent px-2 text-xs",
          checked && "text-muted-foreground line-through",
        )}
        placeholder="Enter task name"
      />
      <div className="ml-auto flex items-center">
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-xs" />}>
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
          <TooltipTrigger render={<Button variant="ghost" size="icon-xs" />}>
            <TrashIcon
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">Duplicate</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="icon-xs" className="cursor-grab">
          <GripVertical className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
