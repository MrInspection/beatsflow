import { SessionTimerRing } from "@/features/runner/components/session-stage/widgets/session-timer-ring/session-timer-ring";

export function SessionStageContent() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <SessionTimerRing />
    </div>
  );
}
