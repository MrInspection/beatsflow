"use client"

import { cn } from "@/lib/utils"
import { Flag, Play, Plus, X, PauseCircle, AlertCircle } from "lucide-react"
import { usePanelStore } from "@/stores/use-side-panel"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWorkflowStore } from "@/stores/use-workflow"
import { WorkflowBlockItem } from "@/components/workflow/workflow-block-item"
import { BlockProperties } from "@/components/workflow/block-properties"
import { WorkflowExecutor } from "@/components/workflow/workflow-executor"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Flame, Coffee, Brain, Trophy } from "lucide-react"


export function WorkflowPanel() {
  const { openPanel, setOpenPanel } = usePanelStore()
  const {
    blocks,
    selectedBlockId,
    addBlock,
    startExecution,
    isExecuting,
    stopExecution,
    canAddMoreBlocks,
    hasEndBlock,
  } = useWorkflowStore()

  // Check if we have at least 2 blocks AND an end block to enable execution
  const canExecuteWorkflow = blocks.length >= 2 && hasEndBlock()

  // Get reason why workflow can't be executed
  const getExecutionDisabledReason = () => {
    if (blocks.length < 2) {
      return "You need at least 2 workflow steps to execute"
    }
    if (!hasEndBlock()) {
      return "Your workflow must include an End Workflow block"
    }
    return ""
  }

  return (
    <>
      <section className={cn(openPanel === "workflow" ? "lg:w-2/6 relative" : "hidden")}>
        <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full relative">
          <div className="flex items-center justify-between px-4 py-3 border-b-2">
            <h1 className="font-semibold tracking-tight text-muted-foreground">BeatsFlōw Workflow</h1>
            <button
              className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer"
              onClick={() => setOpenPanel("workflow")}
              title="Close"
            >
              <X className="text-muted-foreground size-5 group-hover:text-destructive" />
            </button>
          </div>

          <div className="border-b p-4 w-full">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        className="w-full"
                        size="sm"
                        variant="outline"
                        onClick={() => (isExecuting ? stopExecution() : startExecution())}
                        disabled={!canExecuteWorkflow || blocks.length === 0}
                      >
                        {isExecuting ? (
                          <>
                            <PauseCircle className="size-4" /> <span>Stop Workflow</span>
                          </>
                        ) : (
                          <>
                            <Play className="size-4" /> <span>Execute Workflow</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canExecuteWorkflow && blocks.length > 0 && (
                    <TooltipContent>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="size-4 text-amber-500" />
                        <p>{getExecutionDisabledReason()}</p>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              {blocks.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">Add workflow steps to get started</p>
              )}
              {blocks.length > 0 && !canExecuteWorkflow && (
                <p className="text-xs text-muted-foreground mt-2 text-center">{getExecutionDisabledReason()}</p>
              )}
            </div>
          </div>

          <div className="flex flex-1 h-full divide-x">
            <div className="flex flex-col items-center w-2/4 ">
              <div className="border-b w-full p-2">
                <p className="flex items-center justify-center font-medium">Workflow Builder</p>
              </div>
              <section className="flex flex-col items-center w-full justify-start px-6 py-10 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <div className="border-2 px-6 py-2 rounded-full inline-flex items-center gap-2 text-muted-foreground shadow-md">
                  <Flag className="size-4 fill-primary stroke-primary" />
                </div>
                {blocks.length > 0 && (
                  <>
                    {blocks.map((block, index) => (
                      <WorkflowBlockItem
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        isLast={index === blocks.length - 1}
                      />
                    ))}
                  </>
                )}

                {canAddMoreBlocks() && !isExecuting && (
                  <>
                    <div className="w-px h-6 border border-dashed" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Button className="rounded-full" disabled={isExecuting}>
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => addBlock("focus")}>
                          <Flame className="size-4 text-muted-foreground" />
                          Focus Session
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock("break")}>
                          <Coffee className="size-4 text-muted-foreground" />
                          Break Session
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock("deep-work")}>
                          <Brain className="size-4 text-muted-foreground" />
                          Deep Work Session
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock("end")}>
                          <Trophy className="size-4 text-muted-foreground" />
                          End Workflow
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}

                {isExecuting && (
                  <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 w-full">
                    <AlertCircle className="size-4 flex-shrink-0" />
                    <p>Workflow is executing. Cannot add or modify blocks.</p>
                  </div>
                )}
              </section>
            </div>

            <section className="flex flex-col flex-1">
              <div className="border-b w-full p-2">
                <p className="flex items-center justify-center font-medium">Step Properties</p>
              </div>
              <div className="p-4">
                {selectedBlockId ? (
                  <BlockProperties />
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                    <p>Select a workflow step to edit its properties</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>

      {isExecuting && <WorkflowExecutor />}
    </>
  )
}
