"use client"

import {cn} from "@/lib/utils";
import {X} from "lucide-react";
import {usePanelStore} from "@/stores/use-side-panel";

export function MusicPanel() {
  const {openPanel, setOpenPanel} = usePanelStore();

  return (
    <>
      <section className={cn(openPanel === "music" ? "lg:w-1/5 " : "hidden")}>
        <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b-2">
            <h1 className="font-semibold tracking-tight text-muted-foreground inline-flex items-center gap-1.5">
              BeatsFlōw Music <span className="text-xs px-3 py-0.5 bg-pink-200/50 rounded-full text-pink-950">BETA</span>
            </h1>
            <button className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer" onClick={() => setOpenPanel("music")} title="Close">
              <X className="text-muted-foreground size-5 group-hover:text-destructive" />
            </button>
          </div>
          <div className="p-4 relative">

          </div>
        </div>
      </section>
    </>
  )
}