"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkflowBlockItem } from "@/components/workflow/workflow-block-item";
import { WorkflowHelpButton } from "@/components/workflow/workflow-panel";
import { useWorkflowStore } from "@/stores/use-workflow";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BrainCircuit, Coffee, Flag, Plus, Timer, Trophy } from "lucide-react";
import { useState } from "react";

export function WorkflowEditor() {
  const {
    blocks,
    selectedBlockId,
    addBlock,
    isExecuting,
    canAddMoreBlocks,
    moveBlock,
  } = useWorkflowStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = blocks.findIndex((block) => block.id === active.id);
      const overIndex = blocks.findIndex((block) => block.id === over.id);

      // Don't allow dragging end blocks
      if (blocks[activeIndex]?.type === "end") {
        setActiveId(null);
        return;
      }

      // Don't allow dropping before start or after end
      if (blocks[overIndex]?.type === "end") {
        setActiveId(null);
        return;
      }

      moveBlock(activeIndex, overIndex);
    }
    setActiveId(null);
  };

  // Find the active block for the drag overlay
  const activeBlock = blocks.find((block) => block.id === activeId);

  return (
    <>
      <section className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col items-center">
          <div className="border-2 px-6 py-2 rounded-3xl inline-flex items-center gap-2 shadow-sm bg-background">
            <Flag className="size-4 fill-muted-foreground stroke-muted-foreground" />
            <span>Start</span>
          </div>

          <div className="w-px h-6 border" />

          <div className="w-full">
            {blocks.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={blocks.map((block) => block.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col items-center">
                    {blocks.map((block, index) => (
                      <div
                        key={block.id}
                        className="w-full flex flex-col items-center"
                      >
                        <WorkflowBlockItem
                          block={block}
                          isSelected={selectedBlockId === block.id}
                          isLast={index === blocks.length - 1}
                          isExecuting={isExecuting}
                        />
                        {index < blocks.length - 1 && (
                          <div className="w-px h-6 border" />
                        )}
                      </div>
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {activeId && activeBlock ? (
                    <div className="w-full opacity-80">
                      <WorkflowBlockItem
                        block={activeBlock}
                        isSelected={false}
                        isLast={false}
                        isExecuting={isExecuting}
                        isDragOverlay
                      />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </div>
          {canAddMoreBlocks() && !isExecuting && (
            <>
              {blocks.length > 0 && <div className="w-px h-6 border" />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full" disabled={isExecuting}>
                    <Plus className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl mt-1">
                  <DropdownMenuItem
                    onClick={() => addBlock("focus")}
                    className="rounded-t-xl"
                  >
                    <Timer className="size-4" />
                    Focus Session
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("break")}>
                    <Coffee className="size-4" />
                    Break Session
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("deep-work")}>
                    <BrainCircuit className="size-4" />
                    Deep Work Session
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => addBlock("end")}
                    className="rounded-b-xl"
                  >
                    <Trophy className="size-4" />
                    End Workflow
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </section>
      <WorkflowHelpButton />
    </>
  );
}
