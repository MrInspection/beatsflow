"use client"

import {Button, buttonVariants} from "@/components/ui/button";
import {Disc3, Sparkles, Workflow} from "lucide-react";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {usePanelStore} from "@/stores/use-side-panel";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function SidePanel() {
  const {setOpenPanel} = usePanelStore()

  return (
    <section className="max-sm:hidden w-12 p-2 overflow-hidden h-screen flex flex-col border-l gap-2">
      <Button className="flex flex-col h-auto" variant="ghost" disabled>
        <Sparkles className="size-4"/>
        <p className="[writing-mode:vertical-lr]">BeatsAI</p>
      </Button>
      <Button className="max-xl:flex flex-col h-auto xl:hidden" variant="ghost" onClick={() => setOpenPanel("workflow")}>
        <Workflow className="size-4"/>
        <p className="[writing-mode:vertical-lr]">Workflōw</p>
      </Button>

      <Button className="flex flex-col h-auto" variant="ghost" onClick={() => setOpenPanel("music")}>
        <Disc3 className="size-4"/>
        <p className="[writing-mode:vertical-lr]">Music</p>
      </Button>


      <Link
        href="https://github.com/MrInspection/beatsflow"
        target="_blank" className={cn(buttonVariants({ variant: "ghost", className: "flex flex-col h-auto" }))}
      >
        <GitHubLogoIcon className="size-4"/>
        <p className="[writing-mode:vertical-lr]">Star on GitHub</p>
      </Link>




    </section>
  )
}