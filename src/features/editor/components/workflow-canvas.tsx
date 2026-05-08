"use client";

import {
  Background,
  BackgroundVariant,
  type Connection,
  type Edge,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import type React from "react";
import { useEffect } from "react";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";
import { cn } from "@/lib/utils";
import { useWorkflowStore } from "../store/workflow.store";
import { CanvasActionbar } from "./controls/canvas-actionbar";
import { CanvasControls } from "./controls/canvas-controls";
import { BreakNode } from "./nodes/break/break-node";
import { FocusNode } from "./nodes/focus/focus-node";
import { IntentionNode } from "./nodes/intention/intention-node";
import { TaskNode } from "./nodes/task/task-node";

const nodeTypes = {
  focus: FocusNode,
  break: BreakNode,
  task: TaskNode,
  intention: IntentionNode,
};

export function WorkflowCanvas({ className }: { className?: string }) {
  const {
    nodes: storedNodes,
    edges: storedEdges,
    selectedNodeId,
    setSelectedNodeId,
    updateNodeData,
    updateNodePosition,
    deleteNode,
    addEdge,
  } = useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(storedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storedEdges);

  const selectedNode = (nodes.find((node) => node.id === selectedNodeId) ??
    null) as WorkflowNode | null;

  useEffect(() => {
    setNodes((prev) => {
      const prevIds = new Set(prev.map((n) => n.id));
      const storedIds = new Set(storedNodes.map((n) => n.id));
      const hasStructuralChange =
        storedNodes.some((n) => !prevIds.has(n.id)) ||
        prev.some((n) => !storedIds.has(n.id));

      if (!hasStructuralChange) {
        return prev.map((node) => {
          const stored = storedNodes.find((n) => n.id === node.id);
          return stored ? { ...node, data: stored.data } : node;
        }) as WorkflowNode[];
      }

      return storedNodes;
    });
  }, [storedNodes, setNodes]);

  useEffect(() => {
    setEdges(storedEdges);
  }, [storedEdges, setEdges]);

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

  return (
    <div className={cn("h-full w-full", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        onNodeClick={handleNodeClick}
        onNodeDragStop={handleNodeDragStop}
        onPaneClick={() => setSelectedNodeId(null)}
        onConnect={handleConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "var(--muted-foreground)",
            opacity: 0.5,
            strokeWidth: 1.5,
          },
          animated: true,
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          className="rounded-4xl bg-neutral-100 dark:bg-muted/10"
        />
        <CanvasControls />
        <CanvasActionbar />
        <WorkflowDetailsPane
          selectedNode={selectedNode}
          onUpdate={updateNodeData}
          onDelete={deleteNode}
        />
      </ReactFlow>
    </div>
  );
}
