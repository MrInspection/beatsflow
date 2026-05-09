"use client";

import { Panel, useReactFlow } from "@xyflow/react";
import { AlertTriangle, Maximize2, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";

export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="bottom-left">
      <ButtonGroup
        className="rounded-2xl border bg-background shadow-sm"
        orientation="vertical"
      >
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => zoomIn({ duration: 200 })}
        >
          <Plus className="size-4" />
        </Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => zoomOut({ duration: 200 })}
        >
          <Minus className="size-4" />
        </Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => fitView({ duration: 300, padding: 0.2 })}
        >
          <Maximize2 className="size-4" />
        </Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <ResetWorkflowButton />
      </ButtonGroup>
    </Panel>
  );
}

function ResetWorkflowButton() {
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);

  function handleClick() {
    if (isConfirmingReset) {
      resetWorkflow();
      toast.success("Your canvas has been reset.");
      setIsConfirmingReset(false);
      return;
    }

    setIsConfirmingReset(true);
    setTimeout(() => setIsConfirmingReset(false), 3000);
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleClick}>
      {isConfirmingReset ? (
        <AlertTriangle className="size-4 text-destructive" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </Button>
  );
}
