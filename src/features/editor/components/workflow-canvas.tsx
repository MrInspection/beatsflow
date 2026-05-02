"use client";

import {
  Background,
  BackgroundVariant,
  type Edge,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useState } from "react";
import {
  BreakNode,
  type BreakNodeType,
} from "@/features/editor/components/nodes/break-node";
import {
  FocusNode,
  type FocusNodeType,
} from "@/features/editor/components/nodes/focus-node";
import {
  IntentionNode,
  type IntentionNodeType,
} from "@/features/editor/components/nodes/intention-node";
import {
  TaskNode,
  type TaskNodeType,
} from "@/features/editor/components/nodes/task-node";
import { WorkflowDetailsPane } from "@/features/editor/components/workflow-details-pane";
import { cn } from "@/lib/utils";
import { CanvasActionbar } from "./controls/canvas-actionbar";
import { CanvasControls } from "./controls/canvas-controls";

const nodeTypes = {
  focus: FocusNode,
  break: BreakNode,
  task: TaskNode,
  intention: IntentionNode,
};

type WorkflowNode =
  | FocusNodeType
  | BreakNodeType
  | TaskNodeType
  | IntentionNodeType;

const initialNodes: Node[] = [
  {
    id: "intention-1",
    type: "intention",
    position: { x: 0, y: 0 },
    data: {
      prompt: "What do you want to accomplish today?",
      answer: "",
    },
  },
  {
    id: "focus-1",
    type: "focus",
    position: { x: 0, y: 220 },
    data: {
      label: "Deep Work",
      durationMinutes: 25,
      intention: "Design the onboarding flow for the dashboard",
    },
  },
  {
    id: "break-1",
    type: "break",
    position: { x: 0, y: 480 },
    data: {
      label: "Short Break",
      durationMinutes: 5,
    },
  },
  {
    id: "task-1",
    type: "task",
    position: { x: 0, y: 660 },
    data: {
      label: "Review PRs",
      durationMinutes: 20,
      advanceCondition: "timer",
      tasks: [
        { id: "t1", label: "Merge PR#25 from @MrInspection", completed: false },
        {
          id: "t2",
          label: "Fix issue #15 on payment gateway",
          completed: true,
        },
        { id: "t3", label: "Generate specs.md with Claude", completed: false },
      ],
    },
  },
] satisfies WorkflowNode[];

const initialEdges: Edge[] = [
  {
    id: "e-intention-focus",
    source: "intention-1",
    target: "focus-1",
    type: "smoothstep",
  },
  {
    id: "e-focus-break",
    source: "focus-1",
    target: "break-1",
    type: "smoothstep",
  },
  {
    id: "e-break-task",
    source: "break-1",
    target: "task-1",
    type: "smoothstep",
  },
];

export function WorkflowCanvas({ className }: { className?: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  function handleNodeClick(_: React.MouseEvent, node: Node) {
    setSelectedNodeId(node.id);
    setSheetOpen(true);
  }

  function handleUpdateNode(id: string, data: Record<string, unknown>) {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    );
  }

  function handleDeleteNode(id: string) {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== id && edge.target !== id),
    );
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
        onPaneClick={() => {
          setSheetOpen(false);
          setSelectedNodeId(null);
        }}
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
        <WorkflowDetailsPane />
      </ReactFlow>
    </div>
  );
}
