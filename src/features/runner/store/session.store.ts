import type { Edge } from "@xyflow/react";
import { create } from "zustand";
import type { IntentionNodeType } from "@/features/editor/types/intention-node.types";
import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import type { WorkflowNode } from "@/features/editor/types/workflow.types";

export type SessionStatus =
  | "idle"
  | "intention"
  | "running"
  | "paused"
  | "completed";

export type BlockAdvanceReason = "timer" | "tasks" | "skip" | "none";

interface SessionStore {
  workflowName: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  status: SessionStatus;
  currentBlockIndex: number;
  secondsRemaining: number;
  intentionAnswer: string;
  completedTaskIds: string[];
  lastAdvanceReason: BlockAdvanceReason;

  initSession: (
    workflowName: string,
    nodes: WorkflowNode[],
    edges: Edge[],
  ) => void;
  setIntentionAnswer: (answer: string) => void;
  confirmIntention: () => void;
  startBlock: (index: number) => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  skipBlock: () => void;
  restartBlock: () => void;
  completeTask: (taskId: string) => void;
  advanceBlock: (reason: BlockAdvanceReason) => void;
  completeSession: () => void;
  resetSession: () => void;
}

export function getRunnableNodes(nodes: WorkflowNode[]): WorkflowNode[] {
  return nodes.filter((node) => node.type !== "intention");
}

function getBlockDurationSeconds(node: WorkflowNode | undefined): number {
  if (!node || node.type === "intention") return 0;
  const typedNode = node as Exclude<WorkflowNode, IntentionNodeType>;
  return typedNode.data.durationMinutes * 60;
}

function getPreCompletedTaskIds(nodes: WorkflowNode[]): string[] {
  const preCompletedIds: string[] = [];
  nodes.forEach((node) => {
    if (node.type === "task") {
      const taskNode = node as TaskNodeType;
      taskNode.data.tasks.forEach((task) => {
        if (task.completed) {
          preCompletedIds.push(task.id);
        }
      });
    }
  });
  return preCompletedIds;
}

function shouldTaskAdvance(
  node: WorkflowNode,
  completedTaskIds: string[],
): boolean {
  if (node.type !== "task") return false;
  const { advanceCondition, tasks } = node.data;
  if (advanceCondition === "all-tasks") {
    return (
      tasks.length > 0 &&
      tasks.every((task) => completedTaskIds.includes(task.id))
    );
  }
  if (advanceCondition === "any-task") {
    return tasks.some((task) => completedTaskIds.includes(task.id));
  }
  return false;
}

export const useSessionStore = create<SessionStore>()((set, get) => ({
  workflowName: "",
  nodes: [],
  edges: [],
  status: "idle",
  currentBlockIndex: 0,
  secondsRemaining: 0,
  intentionAnswer: "",
  completedTaskIds: [],
  lastAdvanceReason: "none",

  initSession: (workflowName, nodes, edges) => {
    const hasIntention = nodes.some((node) => node.type === "intention");
    const runnableNodes = getRunnableNodes(nodes);
    const preCompletedTaskIds = getPreCompletedTaskIds(nodes);
    set({
      workflowName,
      nodes,
      edges,
      status: hasIntention ? "intention" : "running",
      currentBlockIndex: 0,
      secondsRemaining: getBlockDurationSeconds(runnableNodes[0]),
      intentionAnswer: "",
      completedTaskIds: preCompletedTaskIds,
      lastAdvanceReason: "none",
    });
  },

  setIntentionAnswer: (answer) => set({ intentionAnswer: answer }),

  confirmIntention: () => {
    const runnableNodes = getRunnableNodes(get().nodes);
    const preCompletedTaskIds = getPreCompletedTaskIds(get().nodes);
    set({
      status: "running",
      currentBlockIndex: 0,
      secondsRemaining: getBlockDurationSeconds(runnableNodes[0]),
      completedTaskIds: preCompletedTaskIds,
      lastAdvanceReason: "none",
    });
  },

  startBlock: (index) => {
    const runnableNodes = getRunnableNodes(get().nodes);
    const node = runnableNodes[index];
    if (!node) return;
    set({
      currentBlockIndex: index,
      secondsRemaining: getBlockDurationSeconds(node),
      status: "running",
    });
  },

  tick: () => {
    const {
      status,
      secondsRemaining,
      nodes,
      currentBlockIndex,
      completedTaskIds,
    } = get();
    if (status !== "running") return;

    if (secondsRemaining <= 1) {
      set({ status: "paused", secondsRemaining: 0 });
      get().advanceBlock("timer");
      return;
    }

    const nextSeconds = secondsRemaining - 1;
    set({ secondsRemaining: nextSeconds });

    const currentNode = getRunnableNodes(nodes)[currentBlockIndex];
    if (currentNode && shouldTaskAdvance(currentNode, completedTaskIds)) {
      set({ status: "paused", secondsRemaining: 0 });
      get().advanceBlock("tasks");
    }
  },

  pause: () => set({ status: "paused" }),
  resume: () => set({ status: "running" }),

  skipBlock: () => {
    set({ status: "paused", secondsRemaining: 0 });
    get().advanceBlock("skip");
  },

  restartBlock: () => {
    const runnableNodes = getRunnableNodes(get().nodes);
    const node = runnableNodes[get().currentBlockIndex];
    if (!node) return;
    set({
      secondsRemaining: getBlockDurationSeconds(node),
      completedTaskIds: [],
      status: "running",
    });
  },

  completeTask: (taskId) => {
    const { completedTaskIds, status, nodes, currentBlockIndex } = get();
    if (completedTaskIds.includes(taskId)) return;

    const updatedCompletedTaskIds = [...completedTaskIds, taskId];
    set({ completedTaskIds: updatedCompletedTaskIds });

    if (status !== "running") return;
    const currentNode = getRunnableNodes(nodes)[currentBlockIndex];
    if (
      currentNode &&
      shouldTaskAdvance(currentNode, updatedCompletedTaskIds)
    ) {
      set({ status: "paused", secondsRemaining: 0 });
      get().advanceBlock("tasks");
    }
  },

  advanceBlock: (reason) => {
    const { nodes, currentBlockIndex } = get();
    const runnableNodes = getRunnableNodes(nodes);
    const isLastBlock = currentBlockIndex + 1 >= runnableNodes.length;

    set({ lastAdvanceReason: reason });

    if (isLastBlock) {
      get().completeSession();
      return;
    }

    get().startBlock(currentBlockIndex + 1);
  },

  completeSession: () => set({ status: "completed", secondsRemaining: 0 }),

  resetSession: () =>
    set({
      workflowName: "",
      nodes: [],
      edges: [],
      status: "idle",
      currentBlockIndex: 0,
      secondsRemaining: 0,
      intentionAnswer: "",
      completedTaskIds: [],
      lastAdvanceReason: "none",
    }),
}));
