"use client"

import {ReactFlowProvider} from "@xyflow/react";
import {WorkflowSidebar} from "@/features/editor/components/workflow-sidebar";
import {WorkflowCanvas} from "@/features/editor/components/workflow-canvas";

export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <div className="flex h-full px-8 pb-6 pt-1 gap-6 relative">
        <WorkflowCanvas className="dark:border rounded-4xl" />
        <WorkflowSidebar />
      </div>
    </ReactFlowProvider>
  )
}
