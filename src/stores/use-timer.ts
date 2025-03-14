"use client"

import { create } from "zustand"

interface TimerState {
  isRunning: boolean
  duration: number // in seconds
  timeLeft: number // in seconds
  label: string
  subLabel?: string
  color: string
  icon: string
  progress: number // 0 to 1

  startTimer: (
    duration: number,
    label: string,
    options?: {
      subLabel?: string
      color?: string
      icon?: string
    },
  ) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  tick: () => boolean | undefined
}

export const useTimerStore = create<TimerState>()((set, get) => ({
  isRunning: false,
  duration: 0,
  timeLeft: 0,
  label: "",
  subLabel: "",
  color: "bg-primary",
  icon: "timer",
  progress: 0,

  startTimer: (duration, label, options = {}) => {
    const durationInSeconds = duration * 60
    set({
      isRunning: true,
      duration: durationInSeconds,
      timeLeft: durationInSeconds,
      label,
      subLabel: options.subLabel,
      color: options.color || "bg-primary",
      icon: options.icon || "timer",
      progress: 0,
    })
  },

  pauseTimer: () => {
    set({ isRunning: false })
  },

  resumeTimer: () => {
    set({ isRunning: true })
  },

  stopTimer: () => {
    set({
      isRunning: false,
      timeLeft: 0,
      progress: 0,
    })
  },

  resetTimer: () => {
    const { duration } = get()
    set({
      timeLeft: duration,
      progress: 0,
    })
  },

  tick: () => {
    const { timeLeft, duration, isRunning } = get()

    if (!isRunning || timeLeft <= 0) return

    const newTimeLeft = timeLeft - 1
    const newProgress = 1 - newTimeLeft / duration

    set({
      timeLeft: newTimeLeft,
      progress: newProgress,
    })

    return newTimeLeft <= 0
  },
}))

