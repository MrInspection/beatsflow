"use client";

import { ArrowLeft, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatedArcProgressBar } from "@/components/ui/animated-arc-progress-bar";
import { Button } from "@/components/ui/button";
import type { BreakNodeType } from "@/features/editor/types/break-node.types";
import type { FocusNodeType } from "@/features/editor/types/focus-node.types";
import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import {
  getRunnableNodes,
  useSessionStore,
} from "@/features/runner/store/session.store";
import {
  formatSeconds,
  getNodeColors,
} from "@/features/runner/utils/session.utils";
import { playSound } from "@/lib/sounds";

type TimedNode = FocusNodeType | BreakNodeType | TaskNodeType;

export function SessionTimerRing() {
  const nodes = useSessionStore((state) => state.nodes);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const secondsRemaining = useSessionStore((state) => state.secondsRemaining);
  const status = useSessionStore((state) => state.status);
  const pause = useSessionStore((state) => state.pause);
  const resume = useSessionStore((state) => state.resume);
  const skipBlock = useSessionStore((state) => state.skipBlock);
  const restartBlock = useSessionStore((state) => state.restartBlock);
  const resetSession = useSessionStore((state) => state.resetSession);
  const router = useRouter();

  const runnableNodes = getRunnableNodes(nodes);
  const currentNode = runnableNodes[currentBlockIndex] as TimedNode | undefined;
  const isCompleted = status === "completed";

  // On completion show the last block's ring frozen at full
  const displayNode = isCompleted
    ? (runnableNodes[runnableNodes.length - 1] as TimedNode | undefined)
    : currentNode;

  if (!displayNode) return null;

  const totalSeconds = displayNode.data.durationMinutes * 60;
  const colors = getNodeColors(displayNode.type);
  const isRunning = status === "running";
  const blockLabel = displayNode.data.label || displayNode.type;
  const typeLabel =
    displayNode.type.charAt(0).toUpperCase() + displayNode.type.slice(1);

  function handlePauseResume() {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  }

  function handleRestart() {
    playSound("session-restart");
    restartBlock();
  }

  function handleBackToEditor() {
    resetSession();
    router.push("/");
  }

  return (
    <AnimatedArcProgressBar
      max={totalSeconds}
      value={isCompleted ? totalSeconds : totalSeconds - secondsRemaining}
      min={0}
      gaugePrimaryColor={colors.primary}
      gaugeSecondaryColor={colors.secondary}
      className="size-160"
    >
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="text-muted-foreground text-xl">{blockLabel}</div>
        <h3 className="text-9xl tabular-nums">
          {isCompleted ? "00:00" : formatSeconds(secondsRemaining)}
        </h3>
        <p className="-mt-2 text-4xl">
          {isCompleted ? "Session Complete" : `${typeLabel} Timer`}
        </p>
        <div className="mt-2 flex items-center gap-3">
          {isCompleted ? (
            <Button
              variant="secondary"
              className="px-6"
              onClick={handleBackToEditor}
            >
              <ArrowLeft className="size-5" /> Back to Editor
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="size-12"
                onClick={handleRestart}
              >
                <RotateCcw className="size-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="size-16"
                onClick={handlePauseResume}
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
                onClick={skipBlock}
              >
                <SkipForward className="size-5 fill-current" />
              </Button>
            </>
          )}
        </div>
      </div>
    </AnimatedArcProgressBar>
  );
}
