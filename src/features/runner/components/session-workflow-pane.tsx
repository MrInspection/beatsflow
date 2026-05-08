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
        className="flex h-full w-12 items-center justify-center rounded-xl border shadow-sm"
        onClick={() => setMode(mode === "visible" ? "hidden" : "visible")}
        aria-label={
          mode === "visible" ? "Hide workflow pane" : "Show workflow pane"
        }
        hidden={mode === "visible"}
      >
        <ChevronLeft
          className="size-8 text-muted-foreground"
          aria-hidden="true"
        />
      </Button>

      <Activity mode={mode}>
        <aside className="flex h-full w-120 flex-col overflow-hidden rounded-4xl border bg-background shadow-sm">
          <div className="flex h-14 shrink-0 items-center gap-2 border-b p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode("hidden")}
            >
              <PanelRightCloseIcon className="size-5" aria-hidden="true" />
            </Button>
            <h4 className="font-semibold">Workflow Runner</h4>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6"></div>
        </aside>
      </Activity>
    </>
  );
}
