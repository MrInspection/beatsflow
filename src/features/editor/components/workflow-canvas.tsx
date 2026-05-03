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
import { useCallback } from "react";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";
import { cn } from "@/lib/utils";
import { useWorkflowStore } from "../store/use-workflow.store";
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
    nodes,
    edges,
    selectedNodeId,
    setSelectedNodeId,
    setNodes,
    setEdges,
    updateNode,
    deleteNode,
    addEdge,
  } = useWorkflowStore();

  const selectedNode = (nodes.find((n) => n.id === selectedNodeId) ??
    null) as WorkflowNode | null;

  const handleNodesChange = useCallback(
    (changes: NodeChange<WorkflowNode>[]) => {
      setNodes(applyNodeChanges(changes, nodes) as WorkflowNode[]);
    },
    [nodes, setNodes],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges],
  );

  function handleNodeClick(_: React.MouseEvent, node: Node) {
    setSelectedNodeId(node.id);
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
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      </ReactFlow>
    </div>
  );
}
