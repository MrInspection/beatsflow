"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";

export function MiniPlayer({ className }: { className?: string }) {
  const { currentTrack, isPlaying, togglePlay, nextTrack, previousTrack } =
    useMusicStore();

  if (!currentTrack) return null;

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border bg-background p-2 shadow-sm sm:w-80",
        className,
      )}
    >
      <div className="relative size-8 flex-shrink-0">
        <Image
          src={currentTrack.cover || "/placeholder.svg"}
          alt={currentTrack.title}
          className="h-full w-full rounded-md object-cover"
          width={80}
          height={80}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className="line-clamp-1 font-medium text-xs"
          title={currentTrack.title}
        >
          {currentTrack.title}
        </h3>
        <p className="line-clamp-1 truncate text-[10px] text-muted-foreground">
          {currentTrack.artist}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={previousTrack}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <SkipBack className="size-4" />
        </button>
        <button
          onClick={togglePlay}
          className="cursor-pointer rounded-full bg-primary p-1.5 text-primary-foreground hover:bg-primary/90"
        >
          {isPlaying ? (
            <Pause className="size-4 fill-background" />
          ) : (
            <Play className="size-4 fill-background" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <SkipForward className="size-4" />
        </button>
      </div>
    </div>
  );
}
