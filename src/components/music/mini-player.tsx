"use client";

import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

export function MiniPlayer({ className }: { className?: string }) {
  const { currentTrack, isPlaying, togglePlay, nextTrack, previousTrack } =
    useMusicStore();

  if (!currentTrack) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-2xl bg-background border shadow-sm w-full sm:w-80",
        className
      )}
    >
      <div className="relative size-8 flex-shrink-0">
        <Image
          src={currentTrack.cover || "/placeholder.svg"}
          alt={currentTrack.title}
          className="w-full h-full rounded-md object-cover"
          width={80}
          height={80}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="font-medium text-xs line-clamp-1"
          title={currentTrack.title}
        >
          {currentTrack.title}
        </h3>
        <p className="text-[10px] text-muted-foreground truncate line-clamp-1">
          {currentTrack.artist}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={previousTrack}
          className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <SkipBack className="size-4" />
        </button>
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="size-4 fill-background" />
          ) : (
            <Play className="size-4 fill-background" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <SkipForward className="size-4" />
        </button>
      </div>
    </div>
  );
}
