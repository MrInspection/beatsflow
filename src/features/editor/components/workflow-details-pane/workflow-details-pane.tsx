import { Panel } from "@xyflow/react";
import { Activity } from "react";
import { WorkflowDetailsPaneContent } from "@/features/editor/components/workflow-details-pane/workflow-details-pane-content";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

interface WorkflowDetailsPaneProps {
  selectedNode: WorkflowNode | null;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function WorkflowDetailsPane({
  selectedNode,
  onUpdate,
  onDelete,
}: WorkflowDetailsPaneProps) {
  return (
    <Panel
      position="top-right"
      style={{ margin: 0, height: "100%" }}
      className="p-4"
    >
      <Activity mode={selectedNode ? "visible" : "hidden"}>
        <aside className="fade-in slide-in-from-right-10 flex h-full w-90 flex-1 shrink-0 animate-in flex-col overflow-hidden rounded-xl border bg-popover shadow-sm duration-150 ease-in-out">
          {selectedNode && (
            <WorkflowDetailsPaneContent
              node={selectedNode}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        </aside>
      </Activity>
    </Panel>
  );
}
