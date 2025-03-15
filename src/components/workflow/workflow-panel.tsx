"use client";

import {cn} from "@/lib/utils";
import {Flag, Play, Plus, X, Pause, EyeOff} from "lucide-react";
import {usePanelStore} from "@/stores/use-side-panel";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useWorkflowStore} from "@/stores/use-workflow";
import {WorkflowBlockItem} from "@/components/workflow/workflow-block-item";
import {BlockProperties} from "@/components/workflow/block-properties";
import {WorkflowExecutor} from "@/components/workflow/workflow-executor";
import {Flame, Coffee, Brain, Trophy} from "lucide-react";

export function WorkflowPanel() {
  const {openPanel, setOpenPanel} = usePanelStore();
  const {
    blocks,
    selectedBlockId,
    addBlock,
    startExecution,
    isExecuting,
    stopExecution,
    canAddMoreBlocks,
    hasEndBlock,
  } = useWorkflowStore();

  const canExecuteWorkflow = blocks.length >= 2 && hasEndBlock();

  return (
    <>
      <div className={cn(openPanel === "workflow" ? "lg:w-2/6" : "hidden")}>
        <div
          className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full w-full overflow-hidden flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b-2 sticky top-0 bg-background z-10">
            <h1 className="font-semibold tracking-tight text-muted-foreground">
              BeatsFlōw Workflow
            </h1>
            <button
              className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer"
              onClick={() => setOpenPanel("workflow")}
              title="Close"
            >
              <X className="text-muted-foreground size-5 group-hover:text-destructive"/>
            </button>
          </div>
          {/* Execution Button */}
          <div className="border-b p-4 sticky top-12 bg-background z-10">
            <Button
              className="w-full"
              variant={isExecuting ? "destructive" : "default"}
              onClick={() => (isExecuting ? stopExecution() : startExecution())}
              disabled={!canExecuteWorkflow || blocks.length === 0}
            >
              {isExecuting ? (
                <>
                  <Pause className="size-4 fill-background"/>
                  <span>Stop Workflow</span>
                </>
              ) : (
                <>
                  <Play className="size-4 fill-background"/>
                  <span>Start Workflow</span>
                </>
              )}
            </Button>
          </div>

          {/* Workflow Builder */}
          <section className="flex flex-1 divide-x min-h-0" id="workflow-builder">
            <div className="flex flex-col w-2/4 min-h-0 bg-muted/25">
              <div className="border-b w-full p-2">
                <p className="text-center font-medium">Workflow Builder</p>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-14">
                <section className="flex flex-col items-center">
                  <div
                    className="border-2 px-6 py-2 rounded-full inline-flex items-center gap-2 text-muted-foreground shadow-md">
                    <Flag className="size-4 fill-primary stroke-primary"/>
                  </div>
                  {blocks.length > 0 && blocks.map((block, index) => (
                    <WorkflowBlockItem
                      key={block.id} block={block}
                      isSelected={selectedBlockId === block.id}
                      isLast={index === blocks.length - 1}
                    />
                  ))}
                  {canAddMoreBlocks() && !isExecuting && (
                    <>
                      <div className="w-px h-6 border border-dashed"/>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="rounded-full" disabled={isExecuting}>
                            <Plus className="size-4"/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-2xl mt-1">
                          <DropdownMenuItem
                            onClick={() => addBlock("focus")}
                            className="rounded-t-xl"
                          >
                            <Flame className="size-4 text-muted-foreground"/>
                            Focus Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addBlock("break")}>
                            <Coffee className="size-4 text-muted-foreground"/>
                            Break Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addBlock("deep-work")}>
                            <Brain className="size-4 text-muted-foreground"/>
                            Deep Work Session
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => addBlock("end")}
                            className="rounded-b-xl"
                          >
                            <Trophy className="size-4 text-muted-foreground"/>
                            End Workflow
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </section>
              </div>
            </div>
            <section className="flex flex-col flex-1 min-h-0" id="step-properties">
              <div className="border-b w-full p-2">
                <p className="text-center font-medium">Step Properties</p>
              </div>
              <div className="px-6 py-4 overflow-y-auto flex-1">
                {selectedBlockId ? (
                  <BlockProperties/>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground pt-10">
                    <EyeOff className="size-8 text-muted-foreground mb-2"/>
                    <h2 className="font-medium">No Workflow Block</h2>
                    <p className="text-sm text-muted-foreground text-center w-[90%]">
                    Select a workflow step inside the workflow builder to edit its properties.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </div>
      {isExecuting && <WorkflowExecutor/>}
    </>
  );
}
