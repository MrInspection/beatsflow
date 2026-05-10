"use client";

import { useRouter } from "next/navigation";
import type { BreakNodeType } from "@/features/editor/types/break-node.types";
import type { FocusNodeType } from "@/features/editor/types/focus-node.types";
import type { TaskNodeType } from "@/features/editor/types/task-node.types";
import { useSessionStore } from "@/features/runner/store/session.store";
import {
  formatSeconds,
  getNodeColors,
} from "@/features/runner/utils/session.utils";
import { playSound } from "@/lib/sounds";

type TimedNode = FocusNodeType | BreakNodeType | TaskNodeType;

export function useSessionTimerRingModel() {
  const runnableNodes = useSessionStore((state) => state.runnableNodes);
  const currentBlockIndex = useSessionStore((state) => state.currentBlockIndex);
  const secondsRemaining = useSessionStore((state) => state.secondsRemaining);
  const status = useSessionStore((state) => state.status);
  const pause = useSessionStore((state) => state.pause);
  const resume = useSessionStore((state) => state.resume);
  const skipBlock = useSessionStore((state) => state.skipBlock);
  const restartBlock = useSessionStore((state) => state.restartBlock);
  const resetSession = useSessionStore((state) => state.resetSession);

  const router = useRouter();
  const currentNode = runnableNodes[currentBlockIndex] as TimedNode | undefined;
  const isCompleted = status === "completed";

  const displayNode = isCompleted
    ? (runnableNodes[runnableNodes.length - 1] as TimedNode | undefined)
    : currentNode;

  if (!displayNode) {
    return null;
  }

  const totalSeconds = displayNode.data.durationMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsRemaining;
  const isRunning = status === "running";
  const colors = getNodeColors(displayNode.type);
  const blockLabel = displayNode.data.label || displayNode.type;
  const typeLabel =
    displayNode.type.charAt(0).toUpperCase() + displayNode.type.slice(1);

  function handlePauseResume() {
    if (isRunning) {
      pause();
      return;
    }
    resume();
  }

  function handleRestart() {
    playSound("session-restart");
    restartBlock();
  }

  function handleBackToEditor() {
    resetSession();
    playSound("champion", 1);
    router.push("/");
  }

  return {
    progress: {
      min: 0,
      max: totalSeconds,
      value: isCompleted ? totalSeconds : elapsedSeconds,
      colors,
    },
    display: {
      blockLabel,
      timerLabel: isCompleted ? "00:00" : formatSeconds(secondsRemaining),
      statusLabel: isCompleted ? "Session Complete" : `${typeLabel} Timer`,
    },
    controls: {
      isCompleted,
      isRunning,
      onPauseResume: handlePauseResume,
      onRestart: handleRestart,
      onSkip: skipBlock,
      onBackToEditor: handleBackToEditor,
    },
  };
}
