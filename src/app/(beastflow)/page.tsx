"use client"

import {CircularTimer} from "@/components/workflow/circular-timer"
import {useWorkflowStore} from "@/stores/use-workflow"
import {playSound} from "@/lib/sounds"

export default function HomePage() {
  const {blocks, isExecuting, nextBlock, currentBlockIndex, stopExecution} = useWorkflowStore()

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
    <section className="container mx-auto flex items-center justify-center h-[calc(100vh-56px)] relative">
      <CircularTimer onComplete={handleTimerComplete}/>
    </section>
  )
}
