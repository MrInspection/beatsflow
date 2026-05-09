"use client";

import { Panel, useReactFlow } from "@xyflow/react";
import { AlertTriangle, Maximize2, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const [isHovered, setIsHovered] = useState(false);
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);

  function handleClick() {
    if (isConfirmingReset) {
      resetWorkflow();
      setIsConfirmingReset(false);
      return;
    }

    setIsConfirmingReset(true);
    setTimeout(() => setIsConfirmingReset(false), 3000);
  }

  return (
    <TooltipProvider delay={0} closeDelay={0}>
      <Tooltip open={isConfirmingReset || isHovered}>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          }
        >
          {isConfirmingReset ? (
            <AlertTriangle className="size-4 text-destructive" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </TooltipTrigger>
        <TooltipContent side="left">
          {isConfirmingReset ? "Click again to confirm" : "Reset Workflow"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
