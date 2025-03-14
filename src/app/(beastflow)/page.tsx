"use client"

import { CircularTimer } from "@/components/workflow/circular-timer"
import { useWorkflowStore } from "@/stores/use-workflow"
import { playSound } from "@/lib/sounds"

export default function HomePage() {
  const { blocks, isExecuting, nextBlock, currentBlockIndex, stopExecution } = useWorkflowStore()

  const handleTimerComplete = () => {
    if (isExecuting) {
      const currentBlock = blocks[currentBlockIndex]

      if (currentBlock?.type === "end") {
        playSound("workflowEnd")
        stopExecution()
        return
      }

      nextBlock()
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">BeatsFlōw</h1>
        <CircularTimer onComplete={handleTimerComplete} />
      </div>
    </main>
  )
}

