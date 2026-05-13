import { BreakNode } from "@/features/editor/components/nodes/break/break-node";
import { FocusNode } from "@/features/editor/components/nodes/focus/focus-node";
import { IntentionNode } from "@/features/editor/components/nodes/intention/intention-node";
import { TaskNode } from "@/features/editor/components/nodes/task/task-node";

export const nodeTypes = {
  focus: FocusNode,
  break: BreakNode,
  task: TaskNode,
  intention: IntentionNode,
};

export const defaultEdgeOptions = {
  type: "smoothstep",
  style: {
    stroke: "var(--muted-foreground)",
    opacity: 0.5,
    strokeWidth: 1.5,
  },
  animated: true,
};
