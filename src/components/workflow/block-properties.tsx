"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useWorkflowStore } from "@/stores/use-workflow"
import { ChevronUp, ChevronDown, Trash2, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BlockProperties() {
  const { blocks, selectedBlockId, updateBlock, deleteBlock, moveBlockUp, moveBlockDown, isExecuting } =
    useWorkflowStore()

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId)

  if (!selectedBlock) return null

  const isFirstBlock = selectedBlock.position === 0
  const isLastBlock = selectedBlock.position === blocks.length - 1
  const isEndBlock = selectedBlock.type === "end"

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {selectedBlock.type === "focus" && "Focus Session"}
          {selectedBlock.type === "break" && "Break Session"}
          {selectedBlock.type === "deep-work" && "Deep Work Session"}
          {selectedBlock.type === "end" && "End of Workflow"}
        </h3>
        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveBlockUp(selectedBlock.id)}
                    disabled={isFirstBlock || isEndBlock || isExecuting}
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              {isExecuting && (
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-amber-500" />
                    <p>Cannot move blocks during workflow execution</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveBlockDown(selectedBlock.id)}
                    disabled={isLastBlock || isEndBlock || isExecuting}
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              {isExecuting && (
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-amber-500" />
                    <p>Cannot move blocks during workflow execution</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteBlock(selectedBlock.id)}
                    disabled={isExecuting}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              {isExecuting && (
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-amber-500" />
                    <p>Cannot delete blocks during workflow execution</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {isExecuting && (
        <div className="p-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2">
          <AlertCircle className="size-4 flex-shrink-0" />
          <p>Workflow is currently executing. Block properties cannot be modified.</p>
        </div>
      )}

      {selectedBlock.type !== "end" && !isExecuting && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="180"
              value={selectedBlock.duration}
              onChange={(e) => updateBlock(selectedBlock.id, { duration: Number.parseInt(e.target.value) || 1 })}
              disabled={isExecuting}
            />
          </div>

          {(selectedBlock.type === "focus" || selectedBlock.type === "deep-work") && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="intensity">Intensity</Label>
                <span className="text-sm font-medium">{selectedBlock.intensity}</span>
              </div>
              <Slider
                id="intensity"
                min={1}
                max={100}
                step={1}
                value={[selectedBlock.intensity || 30]}
                onValueChange={(values) => updateBlock(selectedBlock.id, { intensity: values[0] })}
                disabled={isExecuting}
              />
            </div>
          )}
        </div>
      )}

      {isEndBlock && (
        <div className="text-sm text-muted-foreground mt-4">
          <p>The End block marks the completion of your workflow.</p>
          <p className="mt-2">No additional properties can be configured for this block.</p>
        </div>
      )}
    </div>
  )
}

