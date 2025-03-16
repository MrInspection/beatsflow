"use client"

import {cn} from "@/lib/utils";
import {Play, X} from "lucide-react";
import {usePanelStore} from "@/stores/use-side-panel";
import {Button} from "@/components/ui/button";
import {playSound} from "@/lib/sounds";

export function HelpPanel() {
  const {openPanel, setOpenPanel} = usePanelStore();

  return (
    <section className={cn(openPanel === "help" ? "lg:w-1/5 md:w-1/3 w-full" : "hidden")}>
      <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b-2">
          <h1 className="font-semibold tracking-tight text-muted-foreground inline-flex items-center gap-1.5">
            BeatsFlōw Helper.
          </h1>
          <button className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer" onClick={() => setOpenPanel("help")} title="Close">
            <X className="text-muted-foreground size-5 group-hover:text-destructive" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">


          <h4 className="font-medium">What is a BeatsFlow Workflow?</h4>
          <p className="text-muted-foreground text-sm mt-2">
            Workflows are a set of structured focus sessions and breaks designed to enhance productivity. Users can customize durations to create an efficient and balanced work routine.
          </p>


          <h4 className="font-medium text-md mt-8">Workflow Sound Effects</h4>
          <section className="grid gap-2 mt-2">
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
              <p>Workflow Starting Sound</p>
              <Button
                variant="outline"
                onClick={() => playSound("workflowStart")} className="rounded-4xl">
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
              <p>Timer Starting Sound</p>
              <Button
                variant="outline"
                onClick={() => playSound("sessionStart")} className="rounded-4xl">
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
              <p>Timer Ending Sound</p>
              <Button
                variant="outline"
                onClick={() => playSound("sessionEnd")} className="rounded-4xl">
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
              <p>Workflow Ending Sound</p>
              <Button
                variant="outline"
                onClick={() => playSound("workflowEnd")} className="rounded-4xl">
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
          </section>









        </div>

      </div>






    </section>
  )
}