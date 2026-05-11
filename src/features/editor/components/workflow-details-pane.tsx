import { Panel } from "@xyflow/react";
import { Activity } from "react";
import { BreakNodeForm } from "@/features/editor/components/nodes/break/break-node.form";
import { FocusNodeForm } from "@/features/editor/components/nodes/focus/focus-node.form";
import { IntentionNodeForm } from "@/features/editor/components/nodes/intention/intention-node.form";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";
import { TaskNodeForm } from "./nodes/task/task-node.form";

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
        <aside className="fade-in slide-in-from-right-10 flex h-full w-90 flex-1 shrink-0 animate-in flex-col overflow-hidden rounded-2xl border bg-popover shadow-sm duration-150 ease-in-out">
          {selectedNode && (
            <NodeDetailsContent
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

interface NodeDetailsContentProps {
  node: WorkflowNode;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

function NodeDetailsContent({
  node,
  onUpdate,
  onDelete,
}: NodeDetailsContentProps) {
  switch (node.type) {
    case "task":
      return (
        <TaskNodeForm node={node} onUpdate={onUpdate} onDelete={onDelete} />
      );
    case "intention":
      return (
        <IntentionNodeForm
          node={node}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      );
    case "break":
      return (
        <BreakNodeForm node={node} onUpdate={onUpdate} onDelete={onDelete} />
      );
    case "focus":
      return (
        <FocusNodeForm node={node} onUpdate={onUpdate} onDelete={onDelete} />
      );
    default:
      return null;
  }
}
