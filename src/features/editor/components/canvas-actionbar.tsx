"use client"

import {Panel} from "@xyflow/react";
import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import {AddNodeButton} from "@/features/editor/components/add-node-button";

export function CanvasActionbar(){
  return (
    <Panel position="top-center">
      <div className="bg-background/80 backdrop-blur p-2 rounded-4xl border shadow-sm flex gap-1">
       <AddNodeButton />




        <Button variant="ghost">
          <Play className="size-4 fill-current" /> Executive Workflow
        </Button>
      </div>
    </Panel>
  )
}
