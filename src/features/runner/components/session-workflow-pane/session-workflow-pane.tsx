"use client";

import { useState } from "react";
import { useSessionWorkflow } from "@/features/runner/components/session-workflow-pane/hooks/use-session-workflow.hook";
import { SessionWorkflowPaneView } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.view";

export function SessionWorkflowPane() {
  const [mode, setMode] = useState<"visible" | "hidden">("visible");

  const workflow = useSessionWorkflow();

  return (
    <SessionWorkflowPaneView
      mode={mode}
      workflow={workflow}
      onOpen={() => setMode("visible")}
      onClose={() => setMode("hidden")}
    />
  );
}
