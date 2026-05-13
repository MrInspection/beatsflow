"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowCanvas } from "@/features/editor/components/workflow-canvas/workflow-canvas";

export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <div className="relative flex h-full overflow-hidden px-6 pt-1 pb-4">
        <WorkflowCanvas className="rounded-4xl dark:border" />
      </div>
    </ReactFlowProvider>
  );
}
