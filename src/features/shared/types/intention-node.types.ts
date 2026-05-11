import type { Node } from "@xyflow/react";

export type IntentionNodeData = {
  prompt: string;
  answer?: string;
};

export type IntentionNodeType = Node<IntentionNodeData, "intention">;
