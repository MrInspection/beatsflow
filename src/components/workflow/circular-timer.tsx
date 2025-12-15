"use client";

import {
  Brain,
  Coffee,
  Flame,
  Frown,
  GitBranch,
  Pause,
  Play,
  RotateCcw,
  Smile,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { AnimatedCircularProgressBar } from "@/components/workflow/animated-circular-progress-bar";
import { playSound, preloadSounds } from "@/lib/sounds";
import { cn } from "@/lib/utils";
import { usePanelStore } from "@/stores/use-side-panel";
import { useTimerStore } from "@/stores/use-timer";
import { useWorkflowStore } from "@/stores/use-workflow";

interface CircularTimerProps {
  className?: string;
  onComplete?: () => void;
}

export function CircularTimer({ className, onComplete }: CircularTimerProps) {
  const {
    isRunning,
    timeLeft,
    duration,
    label,
    icon,
    pauseTimer,
    resumeTimer,
    resetTimer,
    tick,
  } = useTimerStore();

  const { isExecuting, blocks, startExecution, hasEndBlock } =
    useWorkflowStore();
  const { setOpenPanel } = usePanelStore();
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    preloadSounds();
  }, []);

  // Timer tick logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const isComplete = tick();

      if (isComplete) {
        // Play session end sound if sounds are enabled
        if (soundEnabled) {
          playSound("sessionEnd");
        }

        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick, onComplete, soundEnabled]);

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime =
    isExecuting && timeLeft > 0
      ? `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : "00:00";

  // Get colors based on session type
  const getColors = () => {
    if (!isExecuting) {
      return {
        primary: "#d4d4d8",
        secondary: "#f4f4f5",
      };
    }

    switch (icon) {
      case "flame":
        return {
          primary: "#ef4444", // red-500
          secondary: "#fee2e2", // red-100
        };
      case "coffee":
        return {
          primary: "#06b6d4",
          secondary: "#cffafe",
        };
      case "brain":
        return {
          primary: "#8b5cf6", // violet-500
          secondary: "#ede9fe", // violet-100
        };
      case "trophy":
        return {
          primary: "#eab308", // yellow-500
          secondary: "#fef9c3", // yellow-100
        };
      default:
        return {
          primary: "#3b82f6", // blue-500
          secondary: "#dbeafe", // blue-100
        };
    }
  };

  const colors = getColors();

  const getIconComponent = () => {
    if (!isExecuting) return null;

    switch (icon) {
      case "flame":
        return <Flame className="size-6 text-red-500" />;
      case "coffee":
        return <Coffee className="size-6 text-cyan-500" />;
      case "brain":
        return <Brain className="size-6 text-violet-500" />;
      case "trophy":
        return <Trophy className="size-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const canExecuteWorkflow = blocks.length >= 2 && hasEndBlock();

  // Handle workflow start with sound
  const handleStartWorkflow = () => {
    if (canExecuteWorkflow) {
      if (soundEnabled) {
        playSound("workflowStart");
      }
      startExecution();
    } else {
      setOpenPanel("workflow");
    }
  };

  // Calculate progress value for the animated progress bar
  const getProgressValue = () => {
    if (!isExecuting || !duration) return 0;
    return Math.round(((duration - timeLeft) / duration) * 100);
  };

  // Determine what to show in the center of the timer
  const renderTimerCenter = () => {
    if (isExecuting) {
      return (
        <div className="flex size-64 items-center justify-center rounded-full border bg-background p-4 shadow-sm sm:size-84">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 font-medium text-base">
              {getIconComponent()}
              <span>{label || "Timer"}</span>
            </div>
            <div className="mt-2 font-mono font-semibold text-5xl sm:text-7xl">
              {formattedTime}
            </div>
          </div>
        </div>
      );
    }

    if (blocks.length === 0) {
      return (
        <div className="flex size-60 items-center justify-center rounded-full border bg-background p-4 shadow-sm sm:size-84">
          <div className="flex flex-col items-center justify-center gap-2">
            <GitBranch className="mb-2 size-8 text-muted-foreground max-sm:size-6" />
            <p className="font-medium max-sm:text-base">No Workflow</p>
            <p className="max-w-prose text-center text-muted-foreground text-xs sm:text-sm">
              Create your work session by adding time blocks to your workflow.
            </p>
            <Button
              onClick={() => setOpenPanel("workflow")}
              className="mt-2.5 flex items-center gap-2 rounded-full xl:hidden"
            >
              Create Workflow
            </Button>
          </div>
        </div>
      );
    }

    // Has workflow but not executing
    return (
      <div className="flex size-64 items-center justify-center rounded-full border bg-background p-4 shadow-sm sm:size-84">
        <div className="flex flex-col items-center justify-center gap-2">
          {!canExecuteWorkflow ? (
            <Frown className="mb-2-sm:hidden size-8 text-muted-foreground" />
          ) : (
            <Smile className="mb-2 size-8 text-muted-foreground" />
          )}
          <p className="font-medium max-sm:text-base">
            {!canExecuteWorkflow ? "You're not ready" : "Let's get started"}
          </p>
          <p className="max-w-[80%] text-center text-muted-foreground text-sm max-sm:text-xs">
            {!canExecuteWorkflow
              ? "Craft your work session by adding time blocks to your workflow."
              : "You have created your work session, let the real work begin!"}
          </p>
          <Button
            onClick={handleStartWorkflow}
            className={cn("mt-2 flex items-center gap-2 rounded-full")}
            disabled={!canExecuteWorkflow}
          >
            <Play className="size-4 fill-background" /> Start Workflow
          </Button>
          {!canExecuteWorkflow && blocks.length > 0 && (
            <p className="mt-2 text-muted-foreground text-xs max-sm:hidden">
              {blocks.length < 2
                ? "Need at least 2 steps"
                : !hasEndBlock()
                  ? "An End block is required"
                  : ""}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Determine what controls to show
  const renderControls = () => {
    if (!isExecuting) return null;

    return (
      <div className="z-20 mt-8 flex gap-2 rounded-full border bg-background p-2 shadow-sm">
        {isRunning ? (
          <Button
            onClick={pauseTimer}
            variant="default"
            className="rounded-4xl"
            size="lg"
          >
            <Pause className="size-4 fill-background" /> Pause
          </Button>
        ) : (
          <Button
            onClick={resumeTimer}
            variant="default"
            className="rounded-4xl"
            size="lg"
          >
            <Play className="size-4 fill-background" /> Resume
          </Button>
        )}
        <Button
          onClick={resetTimer}
          variant="outline"
          className="rounded-4xl"
          size="lg"
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          className="rounded-full"
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          size="lg"
        >
          {soundEnabled ? (
            <Volume2 className="size-4" />
          ) : (
            <VolumeX className="size-4" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <BackgroundLines className="relative flex items-center justify-center">
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <AnimatedCircularProgressBar
          max={100}
          min={0}
          value={getProgressValue()}
          gaugePrimaryColor={colors.primary}
          gaugeSecondaryColor={colors.secondary}
          className={cn("size-[370px] sm:size-[500px]", className)}
        >
          {renderTimerCenter()}
        </AnimatedCircularProgressBar>
        {renderControls()}
      </div>
    </BackgroundLines>
  );
}
