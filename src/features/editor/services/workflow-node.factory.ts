import type { XYPosition } from "@xyflow/react";
import type { WorkflowNodeDefinition } from "@/features/editor/constants/workflow-node-definitions";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

export function createWorkflowNode(
  definition: WorkflowNodeDefinition,
  position: XYPosition,
): WorkflowNode {
  return {
    id: `${definition.type}-${Date.now()}`,
    type: definition.type,
    position,
    data: definition.defaultData,
  } as WorkflowNode;
}
