"use client";

import { useSessionTimerRingModel } from "@/features/runner/components/session-stage/widgets/session-timer-ring/session-timer-ring.model";
import { SessionTimerRingControls } from "@/features/runner/components/session-stage/widgets/session-timer-ring/session-timer-ring-controls";
import { SessionTimerRingDisplay } from "@/features/runner/components/session-stage/widgets/session-timer-ring/session-timer-ring-display";
import { SessionTimerRingProgress } from "@/features/runner/components/session-stage/widgets/session-timer-ring/session-timer-ring-progress";

export function SessionTimerRing() {
  const model = useSessionTimerRingModel();

  if (!model) {
    return null;
  }

  return (
    <SessionTimerRingProgress
      min={model.progress.min}
      max={model.progress.max}
      value={model.progress.value}
      colors={model.progress.colors}
    >
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <SessionTimerRingDisplay
          blockLabel={model.display.blockLabel}
          timerLabel={model.display.timerLabel}
          statusLabel={model.display.statusLabel}
        />
        <SessionTimerRingControls
          isCompleted={model.controls.isCompleted}
          isRunning={model.controls.isRunning}
          onPauseResume={model.controls.onPauseResume}
          onRestart={model.controls.onRestart}
          onSkip={model.controls.onSkip}
          onBackToEditor={model.controls.onBackToEditor}
        />
      </div>
    </SessionTimerRingProgress>
  );
}
