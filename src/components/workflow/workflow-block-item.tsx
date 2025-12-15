"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BrainCircuit,
  Clock1,
  Clock3,
  Clock6,
  Coffee,
  Edit3,
  GripVertical,
  Timer,
  Trash2,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  useWorkflowStore,
  type WorkflowBlock,
  type WorkflowBlockType,
} from "@/stores/use-workflow";

interface WorkflowBlockItemProps {
  block: WorkflowBlock;
  isSelected: boolean;
  isLast: boolean;
  isExecuting: boolean;
  isDragOverlay?: boolean;
}

export function WorkflowBlockItem({
  block,
  isSelected,
  isExecuting,
  isDragOverlay = false,
}: WorkflowBlockItemProps) {
  const { selectBlock, deleteBlock, updateBlock } = useWorkflowStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const isDraggable = !isExecuting && block.type !== "end" && !isDragOverlay;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const getBlockIcon = (type: WorkflowBlockType) => {
    switch (type) {
      case "focus":
        return <Timer className="size-7 shrink-0" />;
      case "break":
        return <Coffee className="size-7 shrink-0" />;
      case "deep-work":
        return <BrainCircuit className="size-7 shrink-0" />;
      default:
        return <Timer className="size-7 shrink-0" />;
    }
  };

  const getBlockTitle = (type: WorkflowBlockType) => {
    switch (type) {
      case "focus":
        return "Focus Session";
      case "break":
        return "Break Session";
      case "deep-work":
        return "Deep Work Session";
      case "end":
        return "End of Workflow";
      default:
        return "Session";
    }
  };

  const getBlockDescription = (type: WorkflowBlockType) => {
    switch (type) {
      case "focus":
        return "Focused work with minimal distractions";
      case "break":
        return "Rest and recharge between sessions";
      case "deep-work":
        return "Extended period of high-intensity focus";
      case "end":
        return "Marks the completion of your workflow";
      default:
        return "";
    }
  };

  const handleDelete = () => deleteBlock(block.id);
  const handleEdit = () => setIsEditDialogOpen(true);

  if (block.type === "end") {
    return (
      <div className="w-full">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "inline-flex w-full cursor-pointer select-none items-center gap-3 rounded-3xl border-2 bg-background px-6 py-4 shadow-sm",
                isSelected && "border-4 border-cyan-500 dark:border-cyan-700",
              )}
              onClick={() => selectBlock(block.id)}
            >
              <Trophy className="size-7 shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium">End of Workflow</span>
                <span className="text-muted-foreground text-xs">
                  Marks the completion of your workflow
                </span>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="rounded-xl">
            <ContextMenuItem
              onClick={handleDelete}
              disabled={isExecuting}
              className="cursor-pointer rounded-lg"
            >
              <Trash2 className="size-4" /> Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={isDragOverlay ? undefined : style}
      className="w-full"
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              "cursor-pointer select-none rounded-3xl border-2 bg-background px-3 py-4 shadow-sm",
              isSelected && "border-4 border-cyan-500 dark:border-cyan-700",
              isExecuting && "px-6",
            )}
            onClick={() => selectBlock(block.id)}
          >
            <div className="flex items-center gap-1.5">
              {isDraggable && (
                <div
                  className="h-full cursor-grab touch-none p-1"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical className="size-4 text-muted-foreground" />
                </div>
              )}
              <section className="flex flex-1 items-center gap-2">
                {getBlockIcon(block.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">
                        {getBlockTitle(block.type)}
                      </h3>
                      <p className="line-clamp-1 text-muted-foreground text-xs">
                        {getBlockDescription(block.type)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-cyan-100/80 px-2 py-0.5 text-cyan-900 text-xs dark:bg-cyan-700/15 dark:text-cyan-400">
                      {block.duration}min
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="rounded-xl">
          <ContextMenuItem
            onClick={handleEdit}
            disabled={isExecuting}
            className="curosr-pointer rounded-t-lg text-sm"
          >
            <Edit3 className="size-4" />
            Edit Block
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={handleDelete}
            disabled={isExecuting}
            className="curosr-pointer rounded-b-lg text-sm"
          >
            <Trash2 className="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-3xl p-0 sm:max-w-[425px]">
          <DialogHeader className="border-b p-6">
            <DialogTitle>Edit {getBlockTitle(block.type)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 px-6 py-4">
            {block.type === "focus" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="duration">Timer Duration</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="duration"
                      min={5}
                      max={50}
                      step={5}
                      value={[block.duration]}
                      onValueChange={(values) =>
                        updateBlock(block.id, { duration: values[0] })
                      }
                      className="flex-1"
                    />
                    <span className="w-12 text-center">
                      {block.duration}min
                    </span>
                  </div>
                </div>
              </>
            )}

            {block.type === "break" && (
              <div className="space-y-2">
                <Label htmlFor="duration">Timer Duration</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="duration"
                    min={3}
                    max={30}
                    step={1}
                    value={[block.duration]}
                    onValueChange={(values) =>
                      updateBlock(block.id, { duration: values[0] })
                    }
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{block.duration}min</span>
                </div>
              </div>
            )}

            {block.type === "deep-work" && (
              <>
                <div className="space-y-2">
                  <RadioGroup
                    value={String(block.duration)}
                    onValueChange={(value) =>
                      updateBlock(block.id, {
                        duration: Number.parseInt(value),
                      })
                    }
                    className="grid gap-4"
                  >
                    {[
                      {
                        value: 60,
                        icon: "Clock1",
                        description: "Structured focus session",
                      },
                      {
                        value: 90,
                        icon: "Clock3",
                        description: "Optimal deep work block",
                      },
                      {
                        value: 120,
                        icon: "Clock6",
                        description: "Maximized deep concentration",
                      },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`r${option.value}`}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border-2 px-6 py-4 transition-all hover:bg-accent ${
                          String(block.duration) === String(option.value)
                            ? "border-cyan-500 bg-cyan-50/80 dark:border-cyan-400 dark:bg-cyan-700/20"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        <RadioGroupItem
                          value={String(option.value)}
                          id={`r${option.value}`}
                          className="sr-only"
                        />
                        <div>
                          {option.icon === "Clock1" && (
                            <Clock1 className="size-8 text-primary" />
                          )}
                          {option.icon === "Clock3" && (
                            <Clock3 className="size-8 text-primary" />
                          )}
                          {option.icon === "Clock6" && (
                            <Clock6 className="size-8 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-lg">
                            {option.value} minutes
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {option.description}
                          </p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end border-t px-6 pt-4 pb-6">
            <Button
              className="w-full"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
