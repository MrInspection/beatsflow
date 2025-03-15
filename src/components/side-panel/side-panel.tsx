"use client"

import {Button} from "@/components/ui/button";
import {CircleHelp, Disc3, Workflow} from "lucide-react";
import {usePanelStore} from "@/stores/use-side-panel";
import {MusicPanel} from "@/components/music/music-panel";
import {WorkflowPanel} from "@/components/workflow/workflow-panel";
import {HelpPanel} from "@/components/side-panel/help-panel";
import {ThemeToggle} from "@/components/theme-toggle";

export default function SidePanel() {
  const {setOpenPanel} = usePanelStore()

  return (
    <>
      <HelpPanel />
      <MusicPanel />
      <WorkflowPanel/>
      <section className="w-8 flex flex-col flex-shrink-0 mt-4">
        <div className="flex md:flex-col gap-1">
          <Button
            size="icon" variant="ghost" className="rounded-xl"
            onClick={() => setOpenPanel("music")}
            title="BeatsFlōw Music"
          >
            <Disc3 className="size-5"/>
          </Button>
          <Button
            size="icon" variant="ghost" className="rounded-xl"
            onClick={() => setOpenPanel("workflow")}
            title="BeatsFlōw Workflow"
          >
            <Workflow className="size-5"/>
          </Button>
          <Button
            size="icon" variant="ghost" className="rounded-xl"
            onClick={() => setOpenPanel("help")}
            title="Help"
          >
            <CircleHelp className="size-5"/>
          </Button>
          <ThemeToggle />
        </div>
      </section>
    </>
  )
}