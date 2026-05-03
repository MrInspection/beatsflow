import type { Edge } from "@xyflow/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";

interface UseWorkflowStore {
  workflowId: string;
  workflowName: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;

  setWorkflowName: (name: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: WorkflowNode) => { success: boolean; reason?: string };
  updateNode: (id: string, data: Record<string, unknown>) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
  resetWorkflow: () => void;
}

const DEFAULT_NODES: WorkflowNode[] = [];
const DEFAULT_EDGES: Edge[] = [];

function generateWorkflowId(): string {
  return `workflow-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useWorkflowStore = create<UseWorkflowStore>()(
  persist(
    (set, get) => ({
      workflowId: generateWorkflowId(),
      workflowName: "",
      nodes: DEFAULT_NODES,
      edges: DEFAULT_EDGES,
      selectedNodeId: null,

      setWorkflowName: (name) => set({ workflowName: name }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),

      addNode: (node) => {
        if (node.type === "intention") {
          const hasIntentionNode = get().nodes.some(
            (n) => n.type === "intention",
          );
          if (hasIntentionNode) {
            return {
              success: false,
              reason: "Only one Intention node is allowed per workflow.",
            };
          }
        }
        set((state) => ({ nodes: [...state.nodes, node] as WorkflowNode[] }));
        return { success: true };
      },

      updateNode: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...data } }
              : node,
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

      addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),

      deleteEdge: (id) =>
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== id),
        })),

      resetWorkflow: () =>
        set({
          workflowId: generateWorkflowId(),
          workflowName: "",
          nodes: DEFAULT_NODES,
          edges: DEFAULT_EDGES,
          selectedNodeId: null,
        }),
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
