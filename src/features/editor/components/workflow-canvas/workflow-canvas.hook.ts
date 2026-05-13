import {
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import type React from "react";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

export function useWorkflowCanvasHandlers() {
  const {
    nodes,
    edges,
    setSelectedNodeId,
    setNodes,
    setEdges,
    updateNodePosition,
    deleteNode,
    addEdge,
  } = useWorkflowStore();

  function handleNodesChange(changes: NodeChange[]) {
    const removedIds = changes
      .filter((change) => change.type === "remove")
      .map((change) => change.id);

    for (const id of removedIds) {
      deleteNode(id);
    }

    setNodes(applyNodeChanges(changes, nodes) as WorkflowNode[]);
  }

  function handleEdgesChange(changes: EdgeChange[]) {
    setEdges(applyEdgeChanges(changes, edges));
  }

  function handleNodeClick(_: React.MouseEvent, node: Node) {
    setSelectedNodeId(node.id);
  }

  function handleNodeDragStop(_: React.MouseEvent, node: Node) {
    updateNodePosition(node.id, node.position);
  }

  function handleConnect(connection: Connection) {
    const edge: Edge = {
      ...connection,
      id: `e-${connection.source}-${connection.target}`,
      type: "smoothstep",
    };
    addEdge(edge);
  }

  function handlePaneClick() {
    setSelectedNodeId(null);
  }

  return {
    handleNodesChange,
    handleEdgesChange,
    handleNodeClick,
    handleNodeDragStop,
    handleConnect,
    handlePaneClick,
  };
}
