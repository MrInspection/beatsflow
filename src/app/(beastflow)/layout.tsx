"use client";

import type { ReactNode } from "react";
import { MiniPlayer } from "@/components/music/mini-player";
import { SidePanel } from "@/components/side-panel";
import SiteHeader from "@/components/site-header";
import { WorkflowPanel } from "@/components/workflow/workflow-panel";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="relative flex flex-1 overflow-hidden dark:bg-black">
        <section className="relative h-screen flex-1 bg-background xl:border-r">
          <MiniPlayer className="absolute top-4 right-4 left-4 z-10 w-fit" />
          {children}
        </section>
        <WorkflowPanel />
        <SidePanel />
      </main>
    </div>
  );
}
