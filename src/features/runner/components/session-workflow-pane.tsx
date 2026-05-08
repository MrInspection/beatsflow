"use client";

import { ChevronLeft, PanelRightCloseIcon } from "lucide-react";
import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";

export function SessionWorkflowPane() {
  const [mode, setMode] = useState<"visible" | "hidden">("visible");

  return (
    <>
      <Button
        variant="outline"
        className="flex size-full w-12 items-center justify-center rounded-xl border shadow-sm"
        onClick={() => setMode(mode === "visible" ? "hidden" : "visible")}
        hidden={mode === "visible"}
      >
        <ChevronLeft
          className="size-8 text-muted-foreground"
          aria-hidden="true"
        />
      </Button>
      <Activity mode={mode}>
        <div className="size-full w-120 rounded-4xl border bg-background shadow-sm">
          <div className="flex h-10 items-center gap-2 border-b p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode("hidden")}
            >
              <PanelRightCloseIcon className="size-5" />
            </Button>
            <h4 className="font-semibold">Workflow Runner</h4>
          </div>
        </div>
      </Activity>
    </>
  );
}
