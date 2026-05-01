"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowCanvas } from "@/features/editor/components/workflow-canvas";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane";

export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <div className="relative flex h-full overflow-hidden px-6 pt-1 pb-4">
        <WorkflowCanvas className="rounded-l-4xl dark:border dark:border-r-0" />
        <WorkflowDetailsPane />
      </div>
    </ReactFlowProvider>
  );
}
