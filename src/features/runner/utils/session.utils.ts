import type { WorkflowNode } from "@/features/editor/types/workflow.types";

export function getRunnableNodes(nodes: WorkflowNode[]): WorkflowNode[] {
  return nodes.filter((node) => node.type !== "intention");
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export type NodeColor = {
  primary: string;
  secondary: string;
};

export function getNodeColors(type: WorkflowNode["type"]): NodeColor {
  switch (type) {
    case "focus":
      return {
        primary: "var(--color-pink-500)",
        secondary: "var(--color-pink-200)",
      };
    case "break":
      return {
        primary: "var(--color-cyan-500)",
        secondary: "var(--color-cyan-200)",
      };
    case "task":
      return {
        primary: "var(--color-emerald-500)",
        secondary: "var(--color-emerald-200)",
      };
    default:
      return {
        primary: "var(--color-purple-500)",
        secondary: "var(--color-purple-200)",
      };
  }
}
