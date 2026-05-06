import { SessionTimerSection } from "@/features/runner/components/session-timer-section";
import { SessionWorkflowPane } from "@/features/runner/components/session-workflow-pane";

export function SessionViewer() {
  return (
    <div className="relative flex h-full gap-6 overflow-hidden px-6 pt-1 pb-4">
      <SessionTimerSection />
      <SessionWorkflowPane />
    </div>
  );
}
