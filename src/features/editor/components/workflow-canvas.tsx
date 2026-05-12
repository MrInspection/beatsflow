"use client";

import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  ReactFlow,
} from "@xyflow/react";
import type React from "react";
import { CanvasActionbar } from "@/features/editor/components/controls/canvas-actionbar";
import { CanvasControls } from "@/features/editor/components/controls/canvas-controls";
import { BreakNode } from "@/features/editor/components/nodes/break/break-node";
import { FocusNode } from "@/features/editor/components/nodes/focus/focus-node";
import { IntentionNode } from "@/features/editor/components/nodes/intention/intention-node";
import { TaskNode } from "@/features/editor/components/nodes/task/task-node";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";
import { cn } from "@/lib/utils";

const nodeTypes = {
  focus: FocusNode,
  break: BreakNode,
  task: TaskNode,
  intention: IntentionNode,
};

export function WorkflowCanvas({ className }: { className?: string }) {
  const {
    nodes,
    edges,
    selectedNodeId,
    setSelectedNodeId,
    setNodes,
    setEdges,
    updateNodeData,
    updateNodePosition,
    deleteNode,
    addEdge,
  } = useWorkflowStore();

  const selectedNode = (nodes.find((node) => node.id === selectedNodeId) ??
    null) as WorkflowNode | null;

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

  return (
    <div className={cn("h-full w-full", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
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
