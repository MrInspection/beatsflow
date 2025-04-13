"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";

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
            <div className="relative size-11 flex-shrink-0 rounded-lg overflow-hidden bg-pink-100 flex items-center justify-center">
              <Image
                src={currentTrack?.cover || "/placeholder.svg?height=80&width=80"}
                alt={currentTrack?.title || "???"}
                className="w-full h-full rounded object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
            </div>
            <div className="flex-1 min-w-0 max-w-[190px]">
              <h3 className="font-medium truncate text-sm leading-5">
                {currentTrack?.title || "No track selected"}
              </h3>
              <p className="text-xs text-muted-foreground truncate leading-4">
                {currentTrack?.artist || "Select a track to play"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 justify-end flex-shrink-0">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleShuffle}
                    className={cn(
                      "p-1.5 rounded-full hover:bg-muted cursor-pointer",
                      isShuffling ? "text-cyan-600 dark:text-cyan-400" : "text-muted-foreground"
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
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground group hover:text-foreground cursor-pointer"
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
                      "p-2 rounded-full cursor-pointer",
                      currentTrack
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground fill-muted-foreground"
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
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground group hover:text-foreground cursor-pointer"
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
                      "p-1.5 rounded-full hover:bg-muted cursor-pointer",
                      isLooping ? "text-cyan-600 dark:text-cyan-400" : "text-muted-foreground"
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
