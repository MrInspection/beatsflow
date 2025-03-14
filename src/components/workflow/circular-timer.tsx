"use client"
import { useEffect } from "react"
import { useTimerStore } from "@/stores/use-timer"
import { useWorkflowStore } from "@/stores/use-workflow"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RotateCcw, X, Flame, Coffee, Brain, Trophy, Play, Pause, ListChecks, Volume2, VolumeX } from "lucide-react"
import { usePanelStore } from "@/stores/use-side-panel"
import { playSound, preloadSounds } from "@/lib/sounds"
import { useState } from "react"
import {AnimatedCircularProgressBar} from "@/components/workflow/animated-circular-progress-bar";

interface CircularTimerProps {
  className?: string
  onComplete?: () => void
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
    stopTimer,
    resetTimer,
    tick,
  } = useTimerStore()

  const { isExecuting, blocks, startExecution, hasEndBlock } = useWorkflowStore()
  const { setOpenPanel } = usePanelStore()
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Preload sounds when component mounts
  useEffect(() => {
    preloadSounds()
  }, [])

  // Timer tick logic
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const isComplete = tick()

      if (isComplete) {
        // Play session end sound if sounds are enabled
        if (soundEnabled) {
          playSound("sessionEnd")
        }

        if (onComplete) {
          onComplete()
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, tick, onComplete, soundEnabled])

  // Format time
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime =
    isExecuting && timeLeft > 0
      ? `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : "00:00"

  // Get colors based on session type
  const getColors = () => {
    if (!isExecuting) {
      return {
        primary: "#d4d4d8", // text-muted-foreground/30
        secondary: "#f4f4f5", // very light gray
      }
    }

    switch (icon) {
      case "flame":
        return {
          primary: "#ef4444", // red-500
          secondary: "#fee2e2", // red-100
        }
      case "coffee":
        return {
          primary: "#22c55e", // green-500
          secondary: "#dcfce7", // green-100
        }
      case "brain":
        return {
          primary: "#8b5cf6", // violet-500
          secondary: "#ede9fe", // violet-100
        }
      case "trophy":
        return {
          primary: "#eab308", // yellow-500
          secondary: "#fef9c3", // yellow-100
        }
      default:
        return {
          primary: "#3b82f6", // blue-500
          secondary: "#dbeafe", // blue-100
        }
    }
  }

  const colors = getColors()

  const getIconComponent = () => {
    if (!isExecuting) return null

    switch (icon) {
      case "flame":
        return <Flame className="size-6 text-red-500" />
      case "coffee":
        return <Coffee className="size-6 text-green-500" />
      case "brain":
        return <Brain className="size-6 text-violet-500" />
      case "trophy":
        return <Trophy className="size-6 text-yellow-500" />
      default:
        return null
    }
  }

  // Check if workflow can be executed
  const canExecuteWorkflow = blocks.length >= 2 && hasEndBlock()

  // Handle workflow start with sound
  const handleStartWorkflow = () => {
    if (canExecuteWorkflow) {
      if (soundEnabled) {
        playSound("workflowStart")
      }
      startExecution()
    } else {
      setOpenPanel("workflow")
    }
  }

  // Calculate progress value for the animated progress bar
  const getProgressValue = () => {
    if (!isExecuting || !duration) return 0
    return Math.round(((duration - timeLeft) / duration) * 100)
  }

  // Determine what to show in the center of the timer
  const renderTimerCenter = () => {
    if (isExecuting) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl font-mono font-semibold mb-1">{formattedTime}</div>
          <div className="flex items-center gap-2 text-base font-medium">
            {getIconComponent()}
            <span>{label || "Timer"}</span>
          </div>
        </div>
      )
    }

    if (blocks.length === 0) {
      return (
        <div className="text-center">
          <p className="text-base font-medium text-muted-foreground mb-2">No Workflow</p>
          <Button
            onClick={() => setOpenPanel("workflow")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ListChecks className="size-4" />
            Create Workflow
          </Button>
        </div>
      )
    }

    // Has workflow but not executing
    return (
      <div className="text-center">
        <p className="text-base font-medium text-muted-foreground mb-2">Ready</p>
        <Button
          onClick={handleStartWorkflow}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={!canExecuteWorkflow}
        >
          {canExecuteWorkflow ? (
            <>
              <Play className="size-4" />
              Start Workflow
            </>
          ) : (
            <>
              <ListChecks className="size-4" />
              Edit Workflow
            </>
          )}
        </Button>
        {!canExecuteWorkflow && blocks.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {blocks.length < 2 ? "Need at least 2 steps" : !hasEndBlock() ? "Need an End block" : ""}
          </p>
        )}
      </div>
    )
  }

  // Determine what controls to show
  const renderControls = () => {
    if (!isExecuting) return null

    return (
      <div className="flex gap-2 mt-6">
        {isRunning ? (
          <Button onClick={pauseTimer} variant="outline" size="sm">
            <Pause className="size-4 mr-2" /> Pause
          </Button>
        ) : (
          <Button onClick={resumeTimer} variant="outline" size="sm">
            <Play className="size-4 mr-2" /> Resume
          </Button>
        )}
        <Button onClick={resetTimer} variant="outline" size="sm">
          <RotateCcw className="size-4 mr-2" /> Reset
        </Button>
        <Button onClick={stopTimer} variant="outline" size="sm">
          <X className="size-4 mr-2" /> Stop
        </Button>
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          size="icon"
          className="ml-2"
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={getProgressValue()}
        gaugePrimaryColor={colors.primary}
        gaugeSecondaryColor={colors.secondary}
        className={cn("size-[420px]", className)}
      >
        {renderTimerCenter()}
      </AnimatedCircularProgressBar>
      {renderControls()}
    </div>
  )
}

