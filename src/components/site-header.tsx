"use client"

import {Aperture} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import {WorkflowPanelMobile} from "@/components/workflow/workflow-panel";
import {MusicDialog} from "@/components/music/music-dialog";

export default function SiteHeader() {
  return (
    <>
      <header className="border-b sticky top-0 z-10">
        <div className="px-6 flex h-14 items-center max-md:px-6 justify-between">
          <div className="flex items-center gap-2">
            <Aperture className="size-5"/>
            <h1 className="font-bold tracking-tight">BeatsFlōw</h1>
            <span className="bg-cyan-100/80 text-cyan-900 dark:bg-cyan-700/20 dark:text-cyan-400 px-2 py-0.5 text-xs font-medium rounded-full">
              v2.0
            </span>
          </div>
          <nav className="flex items-center">
            <MusicDialog />
            <WorkflowPanelMobile />
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  )
}