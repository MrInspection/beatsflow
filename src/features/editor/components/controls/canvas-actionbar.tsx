"use client";

import { Panel } from "@xyflow/react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddNodeButton } from "@/features/editor/components/controls/add-node-button";

export function CanvasActionbar() {
  return (
    <Panel position="bottom-center">
      <div className="flex items-center gap-1 rounded-4xl border bg-background/80 p-2 shadow-sm backdrop-blur">
        <AddNodeButton />
        <Button variant="ghost">
          <Play className="size-4 fill-current" /> Executive Workflow
        </Button>
      </div>
    </Panel>
  );
}
