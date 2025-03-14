"use client"

import {Bot, Dot, Loader, OctagonAlert, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePanelStore} from "@/stores/use-side-panel";

export function ChatbotPanel() {
  const {openPanel, setOpenPanel} = usePanelStore();

  return (
    <>
      <section className={cn(openPanel === "chatbot" ? "lg:w-1/5 " : "hidden")}>
        <div className="border-2 shadow-md bg-background rounded-t-3xl max-sm:rounded-b-3xl h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b-2">
            <h1 className="font-semibold tracking-tight text-muted-foreground inline-flex items-center gap-1.5">
              BeatsFlōw AI.
            </h1>
            <button className="p-0.5 rounded-full flex items-center justify-center group cursor-pointer" onClick={() => setOpenPanel("chatbot")} title="Close Chatbot">
              <X className="text-muted-foreground size-5 group-hover:text-destructive" />
            </button>
          </div>
          <div className="p-6 relative flex flex-col">
            <div className="space-y-4">

              <section className="flex flex-col w-max max-w-[75%]">
                <div className="inline-flex items-center gap-2 mb-2 text-muted-foreground">
                  <Bot className="size-4" /> <span className="text-sm font-medium">BeatsFlow AI</span>
                </div>
                <div className="gap-2 rounded-xl rounded-tl-none px-4 py-2 text-sm bg-muted">
                  <p>Greetings, I am BeatsFlōw AI. I am here to assist you with any questions or tasks you may have. How may I assist you?</p>
                </div>
              </section>

              <section className="flex flex-col w-max max-w-[75%] ml-auto">
                <div className="gap-2 rounded-xl px-4 py-2 text-sm bg-violet-100 ml-auto">
                  <p>Nice to meet you, can you set the timer to 20 minutes?</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground mt-1.5">11:30 PM</span>
              </section>

              <section className="flex flex-col w-max max-w-[75%]">
                <div className="inline-flex items-center gap-2 mb-2 text-muted-foreground">
                  <Bot className="size-4" /> <span className="text-sm font-medium">BeatsFlow AI</span>
                </div>
                <div className="gap-2 rounded-xl rounded-tl-none px-4 py-2 text-sm bg-muted">
                 <p>Setting the timer to 20 minutes...</p>
                </div>
              </section>

              <section className="flex flex-col w-max max-w-[75%] ml-auto">
                <div className="gap-2 rounded-xl px-4 py-2 text-sm bg-violet-100 ml-auto">
                  <p>What&apos;s the value of cos(x) + isin(x)?</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground mt-1.5">11:32 PM</span>
              </section>


              <section className="flex flex-col w-max max-w-[75%]">
                <div className="inline-flex items-center gap-2 mb-2 text-muted-foreground">
                  <Bot className="size-4" /> <span className="text-sm font-medium">BeatsFlow AI</span>
                </div>
                <div className="gap-2 rounded-xl rounded-tl-none px-4 py-2 text-sm bg-red-100/60 min-w-fit">
                  <span className="flex items-center gap-2 text-sm text-red-900">
                    <OctagonAlert className="size-4 shrink-0" /> <span>Oops, something went wrong.</span>
                  </span>

                </div>
              </section>


            </div>


          </div>
        </div>
      </section>
    </>
  )
}