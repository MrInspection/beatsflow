import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";
import type { WorkflowNodeDefinition } from "@/features/editor/constants/workflow-node-definitions";
import { WORKFLOW_NODE_DEFINITIONS } from "@/features/editor/constants/workflow-node-definitions";
import { createWorkflowNode } from "@/features/editor/services/workflow-node.factory";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";

export function useAddNode() {
  const { screenToFlowPosition } = useReactFlow();
  const addNode = useWorkflowStore((state) => state.addNode);

  return useCallback(
    (definition: WorkflowNodeDefinition) => {
      const canvasEl = document.querySelector(".react-flow__renderer");
      const rect = canvasEl?.getBoundingClientRect();

      const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const centerY = rect
        ? rect.top + rect.height / 2
        : window.innerHeight / 2;

      const position = screenToFlowPosition({ x: centerX, y: centerY });
      const node = createWorkflowNode(definition, position);
      const result = addNode(node);

      if (!result.success) {
        toast.error(result.reason);
      }
    },
    [addNode, screenToFlowPosition],
  );
}

export { WORKFLOW_NODE_DEFINITIONS };
