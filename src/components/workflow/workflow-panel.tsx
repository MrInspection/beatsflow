"use client";

import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { Play, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WorkflowButton } from "@/components/workflow/workflow-button";
import { WorkflowEditor } from "@/components/workflow/workflow-editor";
import { playSound } from "@/lib/sounds";
import { usePanelStore } from "@/stores/use-side-panel";

export function WorkflowPanel() {
  return (
    <section className="flex h-screen w-[500px] flex-col overflow-hidden bg-muted/30 max-xl:hidden dark:bg-muted/15">
      <div className="z-20 inline-flex w-full items-center justify-between border-b px-6 py-3">
        <div className="inline-flex items-center gap-2">
          <Workflow className="size-5 text-muted-foreground" />
          <h3 className="font-semibold tracking-tight">Workflōw Editor</h3>
        </div>
        <WorkflowButton />
      </div>
      <div className="relative mb-16 flex-1 overflow-y-auto px-8">
        <WorkflowEditor />
      </div>
    </section>
  );
}

export function WorkflowPanelMobile() {
  const { openPanel, setOpenPanel } = usePanelStore();

  return (
    <Sheet
      open={openPanel === "workflow"}
      onOpenChange={(open) => setOpenPanel(open ? "workflow" : null)}
    >
      <SheetTrigger asChild>
        <Button className="px-0 sm:hidden" variant="ghost" size="icon">
          <Workflow className="size-4" />
          <span className="sr-only">Workflow Editor</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 overflow-hidden p-0 max-sm:w-full md:max-w-[500px]">
        <SheetHeader className="p-6">
          <SheetTitle className="mb-2 text-lg tracking-tight">
            Workflōw Editor
          </SheetTitle>
          <WorkflowButton />
        </SheetHeader>
        <section className="overflow-y-auto border-t md:px-8">
          <WorkflowEditor />
        </section>
      </SheetContent>
    </Sheet>
  );
}

export function WorkflowHelpButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <section className="absolute right-5 bottom-4">
          <div className="relative flex flex-col gap-2">
            <Button
              className="relative rounded-full"
              variant="outline"
              size="icon"
            >
              <QuestionMarkIcon className="size-3.75" />
            </Button>
          </div>
        </section>
      </DialogTrigger>
      <DialogContent className="gap-0 rounded-3xl p-0">
        <DialogHeader className="p-8 text-left">
          <DialogTitle className="text-lg tracking-tight">
            What is a BeatsFlōw Workflow?
          </DialogTitle>
          <DialogDescription className="mt-0.5">
            Workflows are a set of structured focus sessions and breaks designed
            to enhance productivity. Users can customize durations to create an
            efficient and balanced work routine.
          </DialogDescription>
        </DialogHeader>
        <div className="border-t p-6">
          <section className="grid gap-2">
            <div className="flex items-center justify-between rounded-full border p-2 pl-4">
              <p className="font-medium text-muted-foreground">
                Workflow Starting Sound
              </p>
              <Button
                variant="outline"
                onClick={() => playSound("workflowStart")}
                className="rounded-4xl"
              >
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-full border p-2 pl-4">
              <p className="font-medium text-muted-foreground">
                Timer Starting Sound
              </p>
              <Button
                variant="outline"
                onClick={() => playSound("sessionStart")}
                className="rounded-4xl"
              >
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-full border p-2 pl-4">
              <p className="font-medium text-muted-foreground">
                Timer Completion Sound
              </p>
              <Button
                variant="outline"
                onClick={() => playSound("sessionEnd")}
                className="rounded-4xl"
              >
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-full border p-2 pl-4">
              <p className="line-clamp-1 font-medium text-muted-foreground">
                Workflow Completion Sound
              </p>
              <Button
                variant="outline"
                onClick={() => playSound("workflowEnd")}
                className="rounded-4xl"
              >
                <Play className="size-4 fill-black" /> Play Sound
              </Button>
            </div>
          </section>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose className="w-full">
            <Button className="w-full">Understood</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
