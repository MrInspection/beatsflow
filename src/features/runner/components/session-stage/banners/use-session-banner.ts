import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import type { SessionBannerModel } from "@/features/runner/components/session-stage/banners/session-banner.types";
import { SESSION_BANNER_CONTENT } from "@/features/runner/components/session-stage/banners/session-banner-content";
import { useSessionStore } from "@/features/runner/store/session.store";

export function useSessionBanner(): SessionBannerModel {
  const status = useSessionStore((state) => state.status);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const runnableNodes = useSessionStore((state) => state.runnableNodes);

  if (status === "paused") {
    return {
      ...SESSION_BANNER_CONTENT.paused,
      isVanished: false,
    };
  }

  if (status === "completed") {
    return {
      ...SESSION_BANNER_CONTENT.completed,
      isVanished: false,
    };
  }

  const currentNode = runnableNodes[currentBlockIndex];

  if (currentNode?.type === "task" && status === "running") {
    const taskNode = currentNode as TaskNodeType;
    const { advanceCondition, label } = taskNode.data;

    if (advanceCondition === "all-tasks") {
      return {
        label: `Finish every task in "${label}" to move forward.`,
        icon: SESSION_BANNER_CONTENT.allTasks.icon,
        variant: SESSION_BANNER_CONTENT.allTasks.variant,
        isVanished: false,
      };
    }

    if (advanceCondition === "any-task") {
      return {
        label: `Knock out one task in "${label}" and you're free to move on.`,
        icon: SESSION_BANNER_CONTENT.anyTask.icon,
        variant: SESSION_BANNER_CONTENT.anyTask.variant,
        isVanished: false,
      };
    }
  }

  return {
    ...SESSION_BANNER_CONTENT.hidden,
    isVanished: true,
  };
}
