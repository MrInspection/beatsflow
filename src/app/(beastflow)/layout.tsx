"use client"

import {ReactNode} from "react";
import SiteHeader from "@/components/site-header";
import {WorkflowPanel} from "@/components/workflow/workflow-panel";
import {SidePanel} from "@/components/side-panel";
import {MiniPlayer} from "@/components/music/mini-player";

export default function AppLayout({children}: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SiteHeader />
      <main className="flex relative dark:bg-black overflow-hidden flex-1">
        <section className="flex-1 h-screen bg-background xl:border-r relative">
          <MiniPlayer className="absolute top-4 right-4 z-10 w-fit" />
          {children}
        </section>
        <WorkflowPanel />
        <SidePanel />
      </main>
    </div>
  )
}
