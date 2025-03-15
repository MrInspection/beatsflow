"use client"

import {cn} from "@/lib/utils"
import {useEffect, useRef} from "react"
import {Play, Pause, SkipBack, SkipForward, Repeat, Shuffle} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {useMusicStore} from "@/stores/use-music"

export function MusicPlayer() {
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
  } = useMusicStore()

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  return (
    <div className="flex flex-col overflow-hidden">
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={() => (isLooping ? ((audioRef.current!.currentTime = 0), audioRef.current!.play()) : nextTrack())}
          loop={isLooping}
        />
      )}
      <div className="px-6 py-[1rem]">
        <div className="flex items-center gap-3">
          <div className="relative size-11 flex-shrink-0 rounded-lg overflow-hidden bg-pink-100 flex items-center justify-center">
            <img
              src={currentTrack?.cover || "/placeholder.svg?height=80&width=80"}
              alt={currentTrack?.title}
              className="w-full h-full rounded object-cover"
            />
          </div>


          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate text-sm">{currentTrack?.title || "No track selected"}</h3>
            <p className="text-xs text-muted-foreground truncate">{currentTrack?.artist || "Select a track to play"}</p>
          </div>
          <div className="flex items-center gap-2 justify-center mt-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleShuffle}
                    className={cn(
                      "p-1.5 rounded-full hover:bg-muted",
                      isShuffling ? "text-emerald-700" : "text-muted-foreground",
                    )}
                  >
                    <Shuffle className="size-4"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Shuffle</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={previousTrack}
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground group hover:text-foreground"
                    disabled={!currentTrack}
                  >
                    <SkipBack className="size-4 fill-muted-foreground group-hover:fill-foreground"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Previous</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={togglePlay}
                    className={cn(
                      "p-2 rounded-full",
                      currentTrack
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground fill-muted-foreground",
                    )}
                  >
                    {isPlaying ? <Pause className="size-4 fill-background"/> :
                      <Play className="size-4 fill-background"/>}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={nextTrack}
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground group hover:text-foreground"
                    disabled={!currentTrack}
                  >
                    <SkipForward className="size-4 fill-muted-foreground group-hover:fill-foreground"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Next</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleLoop}
                    className={cn(
                      "p-1.5 rounded-full hover:bg-muted",
                      isLooping ? "text-emerald-700" : "text-muted-foreground",
                    )}
                  >
                    <Repeat className="size-4"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Repeat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
