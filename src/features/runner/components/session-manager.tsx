"use client";

import { SessionStage } from "@/features/runner/components/session-stage";
import { SessionWorkflowPane } from "@/features/runner/components/session-workflow-pane";
import { useSessionInit } from "@/features/runner/hooks/use-session-init.hook";
import { useSessionTimer } from "@/features/runner/hooks/use-session-timer.hook";
import { useSessionStore } from "@/features/runner/store/session.store";
import { IntentionDialog } from "./dialogs/intention-dialog";

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
