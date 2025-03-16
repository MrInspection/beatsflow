"use client"

import { cn } from "@/lib/utils"
import { X, Music } from "lucide-react"
import { usePanelStore } from "@/stores/use-side-panel"
import {TrackList} from "@/components/music/track-list";
import {MusicPlayer} from "@/components/music/music-player";


export function MusicPanel() {
  const { openPanel, setOpenPanel } = usePanelStore()

  return (
    <>
      <section className={cn(openPanel === "music" ? "lg:w-1/5 md:w-1/3 w-full" : "hidden")}>
        <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full w-full overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b-2">
            <h1 className="font-semibold tracking-tight text-muted-foreground flex items-center gap-2">
              <Music className="h-5 w-5" />
              BeatsFlōw Music
            </h1>
            <button
              className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer"
              onClick={() => setOpenPanel("music")}
              title="Close"
            >
              <X className="text-muted-foreground size-5 group-hover:text-destructive" />
            </button>
          </div>
          <div className="border-b">
            <MusicPlayer />
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              <TrackList />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

