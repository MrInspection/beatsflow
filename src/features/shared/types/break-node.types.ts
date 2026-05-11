import type { Node } from "@xyflow/react";

export type BreakNodeData = {
  label: string;
  durationMinutes: number;
};

export type BreakNodeType = Node<BreakNodeData, "break">;
