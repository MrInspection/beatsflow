import type { TaskNodeType } from "@/features/editor/types/task-node.types";

import {
  getRunnableNodes,
  useSessionStore,
} from "@/features/runner/store/session.store";

export function useTasksListModel() {
  const nodes = useSessionStore((state) => state.nodes);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const completedTaskIds = useSessionStore((state) => state.completedTaskIds);
  const completeTask = useSessionStore((state) => state.completeTask);
  const status = useSessionStore((state) => state.status);
  const currentNode = getRunnableNodes(nodes)[currentBlockIndex];
  const isTaskBlock = currentNode?.type === "task";

  if (!isTaskBlock) {
    return null;
  }

  const taskNode = currentNode as TaskNodeType;

  const tasks = taskNode.data.tasks.map((task) => ({
    id: task.id,
    label: task.label,
    completed: completedTaskIds.includes(task.id),
  }));

  return {
    title: taskNode.data.label,
    tasks,
    completedCount: tasks.filter((task) => task.completed).length,
    totalCount: tasks.length,
    isInteractive: status === "running" || status === "paused",
    completeTask,
  };
}
