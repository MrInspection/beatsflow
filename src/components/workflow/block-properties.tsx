"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"
import {useWorkflowStore} from "@/stores/use-workflow"
import {Trash2, ArrowBigUp, ArrowBigDown} from "lucide-react"


export function BlockProperties() {
  const {blocks, selectedBlockId, updateBlock, deleteBlock, moveBlockUp, moveBlockDown, isExecuting} =
    useWorkflowStore()

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId)
  if (!selectedBlock) return null

  const isFirstBlock = selectedBlock.position === 0
  const isLastBlock = selectedBlock.position === blocks.length - 1
  const isEndBlock = selectedBlock.type === "end"

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-base">
          {selectedBlock.type === "focus" && "Focus Session"}
          {selectedBlock.type === "break" && "Break Session"}
          {selectedBlock.type === "deep-work" && "Deep Work Session"}
          {selectedBlock.type === "end" && "End of Workflow"}
        </h3>
        <div className="flex" id="block-controls">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => moveBlockUp(selectedBlock.id)}
            disabled={isFirstBlock || isEndBlock || isExecuting}
            hidden={isFirstBlock || isEndBlock}
          >
            <ArrowBigUp className="size-4"/>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => moveBlockDown(selectedBlock.id)}
            disabled={isLastBlock || isEndBlock || isExecuting}
            hidden={isLastBlock}
          >
            <ArrowBigDown className="size-4"/>
          </Button>
          <Button
            variant="ghost" size="icon"
            onClick={() => deleteBlock(selectedBlock.id)}
            disabled={isExecuting}
          >
            <Trash2 className="size-4"/>
          </Button>
        </div>
      </div>

      {selectedBlock.type !== "end" && (
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="duration">Timer Duration</Label>
            <div className="relative flex items-center gap-2">
              <Input
                id="duration"
                type="number"
                min="1"
                max="180"
                value={selectedBlock.duration}
                onChange={(e) => updateBlock(selectedBlock.id, {duration: Number.parseInt(e.target.value) || 1})}
                disabled={isExecuting}
                className="relative [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="absolute right-4 text-muted-foreground text-sm font-medium">Minutes</p>
            </div>
          </div>
          {(selectedBlock.type === "focus" || selectedBlock.type === "deep-work") && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="intensity">Intensity</Label>
                <span className="text-sm font-medium text-muted-foreground">{selectedBlock.intensity + "%"}</span>
              </div>
              <p className="border text-sm text-muted-foreground px-4 py-3 rounded-lg mb-6">
                Intensity represents the cognitive effort required for the session, with higher values indicating deeper
                focus and mental strain.
              </p>
              <Slider
                id="intensity"
                min={1}
                max={100}
                step={10}
                value={[selectedBlock.intensity || 30]}
                onValueChange={(values) => updateBlock(selectedBlock.id, {intensity: values[0]})}
                disabled={isExecuting}
              />
            </div>
          )}
        </div>
      )}
      {isEndBlock && (
        <div className="text-sm text-muted-foreground border p-4 rounded-lg">
          <p>
            The <span className="font-medium">End Block</span> marks the completion of your workflow.
            No additional properties can be configured for this block.
          </p>
        </div>
      )}
    </div>
  )
}

