import type { Edge } from "@xyflow/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";

interface WorkflowStore {
  workflowId: string;
  workflowName: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;

  setWorkflowName: (name: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  addNode: (node: WorkflowNode) => { success: boolean; reason?: string };
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  updateNodePosition: (id: string, position: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
  resetWorkflow: () => void;
}

function generateWorkflowId(): string {
  return `workflow-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function createDefaultState() {
  return {
    workflowId: generateWorkflowId(),
    workflowName: "",
    nodes: [] as WorkflowNode[],
    edges: [] as Edge[],
    selectedNodeId: null,
  };
}

export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set, get) => ({
      ...createDefaultState(),

      setWorkflowName: (name) => set({ workflowName: name }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),

      addNode: (node) => {
        if (node.type === "intention") {
          const alreadyHasIntentionNode = get().nodes.some(
            (existingNode) => existingNode.type === "intention",
          );
          if (alreadyHasIntentionNode) {
            return {
              success: false,
              reason: "Only one Intention node is allowed per workflow.",
            };
          }
        }
        set((state) => ({
          nodes: [...state.nodes, node] as WorkflowNode[],
        }));
        return { success: true };
      },

      updateNodeData: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...data } }
              : node,
          ) as WorkflowNode[],
        })),

      updateNodePosition: (id, position) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, position } : node,
          ) as WorkflowNode[],
        })),

      deleteNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
          edges: state.edges.filter(
            (edge) => edge.source !== id && edge.target !== id,
          ),
          selectedNodeId:
            state.selectedNodeId === id ? null : state.selectedNodeId,
        })),

      addEdge: (edge) => {
        const { edges } = get();
        const isDuplicate = edges.some(
          (existingEdge) =>
            existingEdge.source === edge.source &&
            existingEdge.target === edge.target,
        );
        const isSelfConnection = edge.source === edge.target;
        if (isDuplicate || isSelfConnection) return;
        set((state) => ({ edges: [...state.edges, edge] }));
      },

      deleteEdge: (id) =>
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== id),
        })),

      resetWorkflow: () => set(createDefaultState()),
    }),
    {
      name: "beatsflow-workflow",
      partialize: (state) => ({
        workflowId: state.workflowId,
        workflowName: state.workflowName,
        nodes: state.nodes,
        edges: state.edges,
      }),
    },
  ),
);
