"use client";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { CanvasActionbar } from "@/features/editor/components/controls/canvas-actionbar/canvas-actionbar";
import { CanvasControls } from "@/features/editor/components/controls/canvas-controls/canvas-controls";
import {
  defaultEdgeOptions,
  nodeTypes,
} from "@/features/editor/components/workflow-canvas/workflow-canvas.config";
import { useWorkflowCanvasHandlers } from "@/features/editor/components/workflow-canvas/workflow-canvas.hook";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane/workflow-details-pane";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";
import { cn } from "@/lib/utils";

export function WorkflowCanvas({ className }: { className?: string }) {
  const { nodes, edges, selectedNodeId, updateNodeData, deleteNode } =
    useWorkflowStore();

  const selectedNode = (nodes.find((node) => node.id === selectedNodeId) ??
    null) as WorkflowNode | null;

  const {
    handleNodesChange,
    handleEdgesChange,
    handleNodeClick,
    handleNodeDragStop,
    handleConnect,
    handlePaneClick,
  } = useWorkflowCanvasHandlers();

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
        onPaneClick={handlePaneClick}
        onConnect={handleConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={defaultEdgeOptions}
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
