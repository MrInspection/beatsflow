"use client";

import { CircularTimer } from "@/components/workflow/circular-timer";
import { WorkflowExecutor } from "@/components/workflow/workflow-executor";
import { playSound } from "@/lib/sounds";
import { useWorkflowStore } from "@/stores/use-workflow";

export default function HomePage() {
  const { blocks, isExecuting, nextBlock, currentBlockIndex, stopExecution } =
    useWorkflowStore();

  const handleTimerComplete = () => {
    if (isExecuting) {
      const currentBlock = blocks[currentBlockIndex];

      if (currentBlock?.type === "end") {
        playSound("workflowEnd");
        stopExecution();
        return;
      }
      nextBlock();
    }
  };

  return (
    <section className="container relative mx-auto flex h-[calc(100vh-56px)] items-center justify-center">
      <CircularTimer onComplete={handleTimerComplete} />
      {/* Single instance of WorkflowExecutor */}
      {isExecuting && <WorkflowExecutor />}
    </section>
  );
}
