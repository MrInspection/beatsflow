"use client"

import { cn } from "@/lib/utils"
import { Flame, Timer, Coffee, Brain, Trophy } from "lucide-react"
import { useWorkflowStore, type WorkflowBlock, type WorkflowBlockType } from "@/stores/use-workflow"

interface WorkflowBlockItemProps {
  block: WorkflowBlock
  isSelected: boolean
  isLast: boolean
}

export function WorkflowBlockItem({ block, isSelected, isLast }: WorkflowBlockItemProps) {
  const { selectBlock } = useWorkflowStore()

  const getBlockColor = (type: WorkflowBlockType) => {
    switch (type) {
      case "focus":
        return "border-b-red-400"
      case "break":
        return "border-b-green-400"
      case "deep-work":
        return "border-b-violet-500"
      case "end":
        return "border-b-yellow-500"
      default:
        return "border-b-muted-foreground"
    }
  }

  const getBlockIcon = (type: WorkflowBlockType) => {
    switch (type) {
      case "focus":
        return <Flame className="size-4 fill-red-500 text-red-500" />
      case "break":
        return <Coffee className="size-4 text-green-500" />
      case "deep-work":
        return <Brain className="size-4 text-violet-500" />
      case "end":
        return <Trophy className="size-4 text-yellow-500" />
      default:
        return <Timer className="size-4" />
    }
  }

  const getBlockTitle = (type: WorkflowBlockType, position: number) => {
    switch (type) {
      case "focus":
        return `Focus Session`
      case "break":
        return `Break Session`
      case "deep-work":
        return `Deep Work Session`
      case "end":
        return `End of Workflow`
      default:
        return `Session #${position}`
    }
  }

  if (block.type === "end") {
    return (
      <>
        <div className="w-px h-4 border border-dashed" />
        <div
          className={cn(
            "border-2 px-6 py-2 rounded-full inline-flex items-center gap-2 text-muted-foreground shadow-md cursor-pointer",
            isSelected && "border-3 dark:border-blue-700 border-blue-500 bg-blue-50 dark:bg-blue-700/25 transition",
          )}
          onClick={() => selectBlock(block.id)}
        >
          <Trophy className="size-4 text-muted-foreground" />
          <span className="font-medium">The End</span>
        </div>
      </>
    )
  }

  if (block.type === "break") {
    return (
      <>
        <div className="w-px h-4 border border-dashed" />
        <div
          className={cn(
            "border-2 px-4 py-2 rounded-4xl inline-flex items-center justify-center gap-2 shadow-sm text-sm cursor-pointer",
            isSelected && "border-3 dark:border-blue-700 border-blue-500 bg-blue-50 dark:bg-blue-700/25 transition",
          )}
          onClick={() => selectBlock(block.id)}
        >
          <Coffee className="size-4 text-muted-foreground" />
          <span className="font-medium">{block.duration} Minutes break</span>
        </div>
        {!isLast && <div className="w-px h-4 border border-dashed" />}
      </>
    )
  }

  return (
    <>
      <div className="w-px h-4 border border-dashed" />
      <div
        className={cn(
          "border-2 p-4 w-[85%] rounded-4xl border-b-6",
          getBlockColor(block.type),
          isSelected && "border-3 dark:border-blue-700 border-b-6 border-blue-500 bg-blue-50 dark:bg-blue-700/25 transition",
          "cursor-pointer",
        )}
        onClick={() => selectBlock(block.id)}
      >
        <h5 className="text-muted-foreground text-center text-sm">{getBlockTitle(block.type, block.position)}</h5>
        <section className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1 font-medium">
            <Timer className="size-4" /> <span>{block.duration}min</span>
          </div>
          {block.intensity && (
            <div
              className={cn(
                "flex items-center gap-1 font-medium",
                block.type === "focus" ? "text-red-500" : "text-violet-500",
              )}
            >
              {getBlockIcon(block.type)} <span>{block.intensity}</span>
            </div>
          )}
        </section>
      </div>
      {!isLast && <div className="w-px h-4 border border-dashed" />}
    </>
  )
}

