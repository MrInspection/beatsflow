import type { Node } from "@xyflow/react";

export type FocusNodeData = {
  label: string;
  durationMinutes: number;
  intention?: string;
};

export type FocusNodeType = Node<FocusNodeData, "focus">;
