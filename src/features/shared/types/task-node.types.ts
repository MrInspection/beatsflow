import type { Node } from "@xyflow/react";

export type AdvanceCondition = "timer" | "all-tasks" | "any-task";

export type TaskItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type TaskNodeData = {
  label: string;
  durationMinutes: number;
  advanceCondition: AdvanceCondition;
  tasks: TaskItem[];
};

export type TaskNodeType = Node<TaskNodeData, "task">;

export const ADVANCE_CONDITIONS = [
  { label: "Timer ends", value: "timer" },
  { label: "All tasks completed", value: "all-tasks" },
  { label: "Any task completed", value: "any-task" },
] as const;
