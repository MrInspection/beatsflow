"use client";

import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
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

  const currentNode = getRunnableNodes(nodes)[currentBlockIndex] as
    | TimedNode
    | undefined;
  if (!currentNode) return null;

  const totalSeconds = currentNode.data.durationMinutes * 60;
  const colors = getNodeColors(currentNode.type);
  const isRunning = status === "running";
  const blockLabel = currentNode.data.label || currentNode.type;
  const typeLabel =
    currentNode.type.charAt(0).toUpperCase() + currentNode.type.slice(1);

  return (
    <AnimatedArcProgressBar
      max={totalSeconds}
      value={totalSeconds - secondsRemaining}
      min={0}
      gaugePrimaryColor={colors.primary}
      gaugeSecondaryColor={colors.secondary}
      className="size-148"
    >
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="text-muted-foreground text-xl">{blockLabel}</div>
        <h3 className="text-9xl tabular-nums">
          {formatSeconds(secondsRemaining)}
        </h3>
        <p className="-mt-2 text-4xl">{typeLabel} Timer</p>
        <div className="mt-2 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-12"
            onClick={restartBlock}
          >
            <RotateCcw className="size-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-16"
            onClick={isRunning ? pause : resume}
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
        </div>
      </div>
    </AnimatedArcProgressBar>
  );
}
