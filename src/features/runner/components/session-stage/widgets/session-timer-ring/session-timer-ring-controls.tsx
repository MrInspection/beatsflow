import { ArrowLeft, Pause, Play, RotateCcw, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";

type SessionTimerRingControlsProps = {
  isCompleted: boolean;
  isRunning: boolean;
  onPauseResume: () => void;
  onRestart: () => void;
  onSkip: () => void;
  onBackToEditor: () => void;
};

export function SessionTimerRingControls({
  isCompleted,
  isRunning,
  onPauseResume,
  onRestart,
  onSkip,
  onBackToEditor,
}: SessionTimerRingControlsProps) {
  return (
    <div className="mt-2 flex items-center gap-3">
      {isCompleted ? (
        <Button variant="secondary" className="px-6" onClick={onBackToEditor}>
          <ArrowLeft className="size-5" />
          Back to Editor
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="size-12"
            onClick={onRestart}
          >
            <RotateCcw className="size-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-16"
            onClick={onPauseResume}
          >
            {isRunning ? (
              <Pause className="size-8 fill-current" />
            ) : (
              <Play className="size-8 fill-current" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-12"
            onClick={onSkip}
          >
            <SkipForward className="size-5 fill-current" />
          </Button>
        </>
      )}
    </div>
  );
}
