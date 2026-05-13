import type { Edge } from "@xyflow/react";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

type WorkflowSharePayload = {
  workflowId: string;
  workflowName: string;
  nodes: WorkflowNode[];
  edges: Edge[];
};

export function buildShareUrl(payload: WorkflowSharePayload): string {
  const encoded = encodeURIComponent(JSON.stringify(payload));
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
}
