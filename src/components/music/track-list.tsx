"use client"

import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/use-music"

export function TrackList() {
  const { tracks, setCurrentTrack, currentTrack, isPlaying, togglePlay } = useMusicStore()

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        BeatsFlōw Playlist
      </h2>
      <div className="space-y-1">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group",
              currentTrack?.id === track.id && "bg-muted",
            )}
          >
            <div className="relative size-11 flex-shrink-0">
              <img
                src={track.cover || "/placeholder.svg?height=80&width=80"}
                alt={track.title}
                className="w-full h-full rounded object-cover"
              />
              <button
                onClick={() => {
                  if (currentTrack?.id === track.id) {
                    togglePlay()
                  } else {
                    setCurrentTrack(track)
                  }
                }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center rounded transition-opacity"
                style={{ opacity: currentTrack?.id === track.id && isPlaying ? 1 : 0 }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded transition-opacity">
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={() => {
                if (currentTrack?.id === track.id) {
                  togglePlay()
                } else {
                  setCurrentTrack(track)
                }
              }}
            >
              <h3 className="font-medium truncate">{track.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

