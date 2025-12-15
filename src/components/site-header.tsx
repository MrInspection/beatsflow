"use client";

import { Aperture } from "lucide-react";
import { MusicDialog } from "@/components/music/music-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkflowPanelMobile } from "@/components/workflow/workflow-panel";

export default function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b">
        <div className="flex h-14 items-center justify-between px-6 max-md:px-6">
          <div className="flex items-center gap-2">
            <Aperture className="size-5" />
            <h1 className="font-bold tracking-tight">BeatsFlōw</h1>
            <span className="rounded-full bg-cyan-100/80 px-2 py-0.5 font-medium text-cyan-900 text-xs dark:bg-cyan-700/20 dark:text-cyan-400">
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
  );
}
