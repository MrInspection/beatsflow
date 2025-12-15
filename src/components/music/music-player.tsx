"use client";

import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";

export function MusicPlayer({ className }: { className?: string }) {
  const {
    currentTrack,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    nextTrack,
    previousTrack,
    toggleLoop,
    toggleShuffle,
  } = useMusicStore();

  return (
    <section className="flex flex-col overflow-hidden">
      <div className={cn("px-6 py-4", className)}>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <div className="relative flex size-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-pink-100">
              <Image
                src={
                  currentTrack?.cover || "/placeholder.svg?height=80&width=80"
                }
                alt={currentTrack?.title || "???"}
                className="h-full w-full rounded object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
            </div>
            <div className="min-w-0 max-w-[190px] flex-1">
              <h3 className="truncate font-medium text-sm leading-5">
                {currentTrack?.title || "No track selected"}
              </h3>
              <p className="truncate text-muted-foreground text-xs leading-4">
                {currentTrack?.artist || "Select a track to play"}
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center justify-end gap-1">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleShuffle}
                    className={cn(
                      "cursor-pointer rounded-full p-1.5 hover:bg-muted",
                      isShuffling
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-muted-foreground",
                    )}
                  >
                    <Shuffle className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Shuffle</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={previousTrack}
                    className="group cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    disabled={!currentTrack}
                  >
                    <SkipBack className="size-4 fill-muted-foreground group-hover:fill-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Previous</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={togglePlay}
                    className={cn(
                      "cursor-pointer rounded-full p-2",
                      currentTrack
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted fill-muted-foreground text-muted-foreground",
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="size-4 fill-background" />
                    ) : (
                      <Play className="size-4 fill-background" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={nextTrack}
                    className="group cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    disabled={!currentTrack}
                  >
                    <SkipForward className="size-4 fill-muted-foreground group-hover:fill-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Next</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleLoop}
                    className={cn(
                      "cursor-pointer rounded-full p-1.5 hover:bg-muted",
                      isLooping
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-muted-foreground",
                    )}
                  >
                    <Repeat className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Repeat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
