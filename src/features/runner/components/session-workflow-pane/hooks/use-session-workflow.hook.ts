import { deriveSessionWorkflowModel } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";
import { useSessionStore } from "@/features/runner/store/session.store";

export function useSessionWorkflow() {
  const nodes = useSessionStore((state) => state.nodes);
  const runnableNodes = useSessionStore((state) => state.runnableNodes);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const secondsRemaining = useSessionStore((state) => state.secondsRemaining);
  const completedTaskIds = useSessionStore((state) => state.completedTaskIds);
  const intentionAnswer = useSessionStore((state) => state.intentionAnswer);
  const sessionStatus = useSessionStore((state) => state.status);

  return deriveSessionWorkflowModel(
    nodes,
    runnableNodes,
    currentBlockIndex,
    secondsRemaining,
    completedTaskIds,
    intentionAnswer,
    sessionStatus,
  );
}
