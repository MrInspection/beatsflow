import { NodeFormRegistry } from "@/features/editor/registries/node-form.registry";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

interface WorkflowDetailsPaneContentProps {
  node: WorkflowNode;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function WorkflowDetailsPaneContent({
  node,
  onUpdate,
  onDelete,
}: WorkflowDetailsPaneContentProps) {
  return (
    <NodeFormRegistry node={node} onUpdate={onUpdate} onDelete={onDelete} />
  );
}
