"use client";

import { IntentionDialog } from "@/features/runner/components/intention-dialog";
import { SessionStage } from "@/features/runner/components/session-stage/session-stage";
import { SessionWorkflowPane } from "@/features/runner/components/session-workflow-pane/session-workflow-pane";
import { useSessionInit } from "@/features/runner/hooks/use-session-init.hook";
import { useSessionTimer } from "@/features/runner/hooks/use-session-timer.hook";
import { useSessionStore } from "@/features/runner/store/session.store";

export function SessionManager() {
  useSessionInit();
  useSessionTimer();

  const status = useSessionStore((session) => session.status);

  return (
    <>
      <IntentionDialog open={status === "intention"} />
      <div className="relative flex h-full gap-4 overflow-hidden px-6 pt-1 pb-4">
        <SessionStage />
        <SessionWorkflowPane />
      </div>
    </>
  );
}
