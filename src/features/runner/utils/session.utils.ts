import type { WorkflowNode } from "@/features/editor/types/workflow.types";

export function getRunnableNodes(nodes: WorkflowNode[]): WorkflowNode[] {
  return nodes.filter((node) => node.type !== "intention");
}

export function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export type NodeColor = {
  primary: string;
  secondary: string;
};

export function getNodeColors(type: WorkflowNode["type"]): NodeColor {
  switch (type) {
    case "focus":
      return {
        primary: "var(--primary)",
        secondary: "var(--border)",
      };
    case "break":
      return {
        primary: "var(--primary)",
        secondary: "var(--border)",
      };
    case "task":
      return {
        primary: "var(--color-indigo-500)",
        secondary: "var(--border)",
      };
    default:
      return {
        primary: "var(--primary)",
        secondary: "var(--border)",
      };
  }
}
