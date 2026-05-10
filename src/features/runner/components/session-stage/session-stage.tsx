"use client";

import { SessionStageShell } from "@/features/runner/components/session-stage/layout/session-stage-shell";
import { useSessionStageModel } from "@/features/runner/components/session-stage/session-stage.model";

export function SessionStage() {
  const model = useSessionStageModel();
  return <SessionStageShell banner={model.banner} />;
}
