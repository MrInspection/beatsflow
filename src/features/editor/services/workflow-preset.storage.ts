import type { Edge } from "@xyflow/react";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

const STORAGE_KEY = "beatsflow-custom-presets";

export type CustomPreset = {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  savedAt: string;
};

export function loadCustomPresets(): CustomPreset[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveCustomPreset(
  preset: Omit<CustomPreset, "id" | "savedAt">,
): CustomPreset {
  const existing = loadCustomPresets();
  const newPreset: CustomPreset = {
    ...preset,
    id: `custom-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newPreset]));
  return newPreset;
}
