"use client";

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
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { Play, Workflow } from "lucide-react";

export function WorkflowPanel() {
  return (
    <section className="max-xl:hidden w-[500px] overflow-hidden h-screen flex flex-col">
      <div className="border-b inline-flex items-center justify-between z-20 w-full px-6 py-3">
        <div className="inline-flex items-center gap-2">
          <Workflow className="size-5 text-muted-foreground" />
          <h3 className="font-semibold tracking-tight">Workflōw Editor</h3>
        </div>
        <WorkflowButton />
      </div>
      <div className="overflow-y-auto mb-16 flex-1 px-8 relative">
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
        <Button className="sm:hidden px-0" variant="ghost" size="icon">
          <Workflow className="size-4" />
          <span className="sr-only">Workflow Editor</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 max-sm:w-full md:max-w-[500px] overflow-hidden gap-0">
        <SheetHeader className="p-6">
          <SheetTitle className="text-lg mb-2 tracking-tight">
            Workflōw Editor
          </SheetTitle>
          <WorkflowButton />
        </SheetHeader>
        <section className="border-t overflow-y-auto px-8">
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
        <section className="absolute bottom-4 right-5">
          <div className="flex flex-col gap-2 relative">
            <Button
              className="rounded-full relative"
              variant="outline"
              size="icon"
            >
              <QuestionMarkIcon className="size-3.75" />
            </Button>
          </div>
        </section>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 rounded-3xl">
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
        <div className="p-6 border-t">
          <section className="grid gap-2">
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
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
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
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
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
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
            <div className="border flex items-center justify-between p-2 pl-4 rounded-full">
              <p className="font-medium text-muted-foreground line-clamp-1">
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
        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose className="w-full">
            <Button className="w-full">Understood</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
