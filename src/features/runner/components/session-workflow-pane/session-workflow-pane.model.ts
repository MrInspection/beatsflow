import type { IntentionNodeType } from "@/features/editor/types/intention-node.types";
import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";
import type { SessionStatus } from "@/features/runner/store/session.store";

import { getRunnableNodes } from "@/features/runner/store/session.store";
import { formatSeconds } from "@/features/runner/utils/session.utils";

export type BlockStatus = "completed" | "active" | "upcoming";

export type WorkflowTaskModel = {
  id: string;
  label: string;
  completed: boolean;
};

export type WorkflowTaskProgressModel = {
  completed: number;
  total: number;
};

export type WorkflowBlockModel = {
  id: string;
  type: WorkflowNode["type"];
  label: string;
  typeLabel: string;
  durationMinutes: number;
  status: BlockStatus;
  secondsRemainingLabel: string | null;
  taskProgress: WorkflowTaskProgressModel | null;
  tasks: WorkflowTaskModel[] | null;
};

export type IntentionModel = {
  prompt: string;
  answer: string | null;
};

export type SessionWorkflowModel = {
  intention: IntentionModel | null;
  blocks: WorkflowBlockModel[];
};

function deriveBlockStatus(
  index: number,
  currentBlockIndex: number,
  sessionStatus: SessionStatus,
): BlockStatus {
  if (sessionStatus === "completed" || index < currentBlockIndex) {
    return "completed";
  }

  if (index === currentBlockIndex) {
    return "active";
  }

  return "upcoming";
}

export function deriveSessionWorkflowModel(
  nodes: WorkflowNode[],
  currentBlockIndex: number,
  secondsRemaining: number,
  completedTaskIds: string[],
  intentionAnswer: string,
  sessionStatus: SessionStatus,
): SessionWorkflowModel {
  const intentionNode = nodes.find((node) => node.type === "intention") as
    | IntentionNodeType
    | undefined;

  const intention: IntentionModel | null = intentionNode
    ? {
        prompt: intentionNode.data.prompt,
        answer: intentionAnswer.trim() || null,
      }
    : null;
  const runnableNodes = getRunnableNodes(nodes);

  const blocks: WorkflowBlockModel[] = runnableNodes.map((node, index) => {
    const status = deriveBlockStatus(index, currentBlockIndex, sessionStatus);
    const isActive = status === "active";
    const label =
      node.type === "intention"
        ? "Intention"
        : ((node.data as { label?: string }).label ?? node.type);

    const durationMinutes =
      node.type === "intention"
        ? 0
        : ((node.data as { durationMinutes?: number }).durationMinutes ?? 0);

    const typeLabel = node.type.charAt(0).toUpperCase() + node.type.slice(1);
    const secondsRemainingLabel = isActive
      ? formatSeconds(secondsRemaining)
      : null;

    let taskProgress: WorkflowTaskProgressModel | null = null;
    let tasks: WorkflowTaskModel[] | null = null;

    if (node.type === "task") {
      const taskNode = node as TaskNodeType;

      tasks = taskNode.data.tasks.map((task) => ({
        id: task.id,
        label: task.label,
        completed: completedTaskIds.includes(task.id),
      }));

      taskProgress = {
        completed: tasks.filter((task) => task.completed).length,
        total: tasks.length,
      };
    }

    return {
      id: node.id,
      type: node.type,
      label,
      typeLabel,
      durationMinutes,
      status,
      secondsRemainingLabel,
      taskProgress,
      tasks,
    };
  });

  return {
    intention,
    blocks,
  };
}
