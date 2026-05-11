"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ListTodo, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  NodeFormContent,
  NodeFormFooter,
  NodeFormHeader,
} from "@/features/editor/components/nodes/node-form";
import { SortableTaskItem } from "@/features/editor/components/nodes/task/sortable-task-item";
import {
  ADVANCE_CONDITIONS,
  type TaskItem,
  type TaskNodeType,
} from "@/features/shared/types/task-node.types";

interface TaskNodeFormProps {
  node: TaskNodeType;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function TaskNodeForm({ node, onUpdate, onDelete }: TaskNodeFormProps) {
  const { id, data } = node;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleUpdateTask(taskId: string, changes: Partial<TaskItem>) {
    const updatedTasks = data.tasks.map((task) =>
      task.id === taskId ? { ...task, ...changes } : task,
    );
    onUpdate(id, { tasks: updatedTasks });
  }

  function handleDeleteTask(taskId: string) {
    onUpdate(id, { tasks: data.tasks.filter((task) => task.id !== taskId) });
  }

  function handleDuplicateTask(taskId: string) {
    const source = data.tasks.find((task) => task.id === taskId);
    if (!source) return;
    const duplicate: TaskItem = {
      ...source,
      id: crypto.randomUUID(),
      completed: false,
    };
    onUpdate(id, { tasks: [...data.tasks, duplicate] });
  }

  function handleAddTask() {
    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      label: "",
      completed: false,
    };
    onUpdate(id, { tasks: [...data.tasks, newTask] });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.tasks.findIndex((task) => task.id === active.id);
    const newIndex = data.tasks.findIndex((task) => task.id === over.id);
    onUpdate(id, { tasks: arrayMove(data.tasks, oldIndex, newIndex) });
  }

  return (
    <>
      <NodeFormHeader
        title="task Node"
        description="Checklist with a time limit"
        icon={ListTodo}
      />

      <NodeFormContent>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.label}
            placeholder="E.g. Review PRs"
            onChange={(e) => onUpdate(id, { label: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <Label>Duration</Label>
            <span className="font-bold text-xl tabular-nums">
              {data.durationMinutes}m
            </span>
          </div>
          <Slider
            className="mt-3"
            min={5}
            max={60}
            step={5}
            value={[data.durationMinutes]}
            onValueChange={(value) => onUpdate(id, { durationMinutes: value })}
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">5m (MIN)</span>
            <span className="text-muted-foreground text-sm">60m (MAX)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Advances when</Label>
          <Select
            items={ADVANCE_CONDITIONS}
            value={data.advanceCondition}
            onValueChange={(value) => onUpdate(id, { advanceCondition: value })}
          >
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="mt-3 space-y-2">
                {data.tasks.map((task) => (
                  <SortableTaskItem
                    key={task.id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onDuplicate={handleDuplicateTask}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            size="sm"
            onClick={handleAddTask}
          >
            <PlusIcon className="size-4" /> Add task
          </Button>
        </div>
      </NodeFormContent>
      <NodeFormFooter>
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => onDelete(id)}
        >
          Delete Node
        </Button>
      </NodeFormFooter>
    </>
  );
}
