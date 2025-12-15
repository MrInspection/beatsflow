"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/use-music";

export function TrackList() {
  const { tracks, setCurrentTrack, currentTrack, isPlaying, togglePlay } =
    useMusicStore();

  return (
    <div className="space-y-3">
      <h2 className="flex items-center gap-2 font-semibold text-lg">
        BeatsFlōw Playlist
      </h2>
      <div className="space-y-1">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={cn(
              "group flex items-center gap-3 rounded-md p-2 hover:bg-muted/50",
              currentTrack?.id === track.id && "bg-muted",
            )}
          >
            <div className="relative size-11 flex-shrink-0">
              <Image
                src={track.cover || "/placeholder.svg"}
                alt={track.title}
                className="h-full w-full rounded object-cover"
                height={80}
                width={80}
              />
              <button
                onClick={() => {
                  if (currentTrack?.id === track.id) {
                    togglePlay();
                  } else {
                    setCurrentTrack(track);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center rounded bg-black/60 transition-opacity"
                style={{
                  opacity: currentTrack?.id === track.id && isPlaying ? 1 : 0,
                }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
              <div className="absolute inset-0 flex items-center justify-center rounded bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            <div
              className="min-w-0 flex-1 cursor-pointer"
              onClick={() => {
                if (currentTrack?.id === track.id) {
                  togglePlay();
                } else {
                  setCurrentTrack(track);
                }
              }}
            >
              <h3 className="truncate font-medium">{track.title}</h3>
              <p className="truncate text-muted-foreground text-xs">
                {track.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
