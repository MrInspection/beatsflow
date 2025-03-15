"use client"

import {CircularTimer} from "@/components/workflow/circular-timer"
import {useWorkflowStore} from "@/stores/use-workflow"
import {playSound} from "@/lib/sounds"
import {BackgroundLines} from "@/components/ui/background-lines";

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
    <BackgroundLines className="rounded-2xl">
      <main className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center justify-center min-h-[85vh]">
          <CircularTimer onComplete={handleTimerComplete}/>
        </div>
      </main>
    </BackgroundLines>
  )
}
