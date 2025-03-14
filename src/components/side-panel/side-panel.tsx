"use client"

import {Button} from "@/components/ui/button";
import {Bot, Disc3, Workflow} from "lucide-react";
import {ChatbotPanel} from "@/components/chatbot/chatbot-panel";
import {usePanelStore} from "@/stores/use-side-panel";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {MusicPanel} from "@/components/side-panel/music-panel";
import {WorkflowPanel} from "@/components/workflow/workflow-panel";

export default function SidePanel() {
  const {setOpenPanel} = usePanelStore()

  return (
    <>
      <MusicPanel />
      <WorkflowPanel/>
      <ChatbotPanel/>
      <section className="w-8 flex flex-col flex-shrink-0 mt-4">
        <div className="flex md:flex-col gap-1">
          <Button
            size="icon" variant="ghost" className="rounded-xl" title="BeatsFlōw AI"
            onClick={() => setOpenPanel("chatbot")}
          >
            <Bot className="size-5"/>
          </Button>
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
          <Link href="https://github.com/MrInspection/beatsflow" target="_blank" rel="noreferrer"
                title="Star on GitHub">
            <Button size="icon" variant="ghost">
              <GitHubLogoIcon className="size-5 hover:text-primary/90"/>
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}