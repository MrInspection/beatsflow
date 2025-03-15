"use client";

import { playSound, preloadSounds } from "@/lib/sounds";
import { useTimerStore } from "@/stores/use-timer";
import { useWorkflowStore } from "@/stores/use-workflow";
import { useEffect } from "react";

export function WorkflowExecutor() {
  const { blocks, currentBlockIndex, isExecuting, stopExecution } =
    useWorkflowStore();
  const { startTimer, stopTimer } = useTimerStore();

  const currentBlock = blocks[currentBlockIndex];

  // Preload sounds when component mounts
  useEffect(() => {
    preloadSounds();
  }, []);

  // Play workflow start sound when execution begins
  useEffect(() => {
    if (isExecuting && currentBlockIndex === 0) {
      playSound("workflowStart");
    }
  }, [isExecuting, currentBlockIndex]);

  useEffect(() => {
    if (!currentBlock) return;

    // Configure timer based on current block type
    const getBlockColor = () => {
      switch (currentBlock.type) {
        case "focus":
          return "bg-red-500";
        case "break":
          return "bg-green-500";
        case "deep-work":
          return "bg-violet-500";
        case "end":
          return "bg-yellow-500";
        default:
          return "bg-primary";
      }
    };

    const getBlockIcon = () => {
      switch (currentBlock.type) {
        case "focus":
          return "flame";
        case "break":
          return "coffee";
        case "deep-work":
          return "brain";
        case "end":
          return "trophy";
        default:
          return "timer";
      }
    };

    const getBlockTitle = () => {
      switch (currentBlock.type) {
        case "focus":
          return "Focus Session";
        case "break":
          return "Break Time";
        case "deep-work":
          return "Deep Work Session";
        case "end":
          return "Workflow Complete";
        default:
          return "Session";
      }
    };

    // Play session start sound
    playSound("sessionStart");

    if (currentBlock.type === "end") {
      playSound("workflowEnd");
      stopExecution();
      return;
    }

    startTimer(currentBlock.duration, getBlockTitle(), {
      subLabel: `${currentBlockIndex + 1} of ${blocks.length}`,
      color: getBlockColor(),
      icon: getBlockIcon(),
    });

    return () => {
      stopTimer();
    };
  }, [currentBlock, currentBlockIndex, blocks.length, startTimer, stopTimer]);

  return null;
}
