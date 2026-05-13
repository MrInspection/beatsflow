import type { LucideIcon } from "lucide-react";
import { Coffee, ListTodo, PencilLine, Zap } from "lucide-react";
import type { BreakNodeData } from "@/features/shared/types/break-node.types";
import type { FocusNodeData } from "@/features/shared/types/focus-node.types";
import type { IntentionNodeData } from "@/features/shared/types/intention-node.types";
import type { TaskNodeData } from "@/features/shared/types/task-node.types";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

export type WorkflowNodeDefinition = {
  type: WorkflowNode["type"];
  label: string;
  description: string;
  icon: LucideIcon;
  defaultData: FocusNodeData | BreakNodeData | TaskNodeData | IntentionNodeData;
};

export const WORKFLOW_NODE_DEFINITIONS: WorkflowNodeDefinition[] = [
  {
    type: "intention",
    label: "Set Intention",
    description: "Anchor your session with a goal",
    icon: PencilLine,
    defaultData: {
      prompt: "What do you want to accomplish today?",
      answer: "",
    } satisfies IntentionNodeData,
  },
  {
    type: "focus",
    label: "Focus Block",
    description: "Timed deep work sprint",
    icon: Zap,
    defaultData: {
      label: "Deep Work",
      durationMinutes: 25,
      intention: "",
    } satisfies FocusNodeData,
  },
  {
    type: "break",
    label: "Break Block",
    description: "Step away and recharge",
    icon: Coffee,
    defaultData: {
      label: "Short Break",
      durationMinutes: 5,
    } satisfies BreakNodeData,
  },
  {
    type: "task",
    label: "Task Block",
    description: "Checklist with a time limit",
    icon: ListTodo,
    defaultData: {
      label: "Tasks",
      durationMinutes: 20,
      advanceCondition: "timer",
      tasks: [],
    } satisfies TaskNodeData,
  },
];
