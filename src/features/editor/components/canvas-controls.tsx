"use client";

import {Panel, useReactFlow} from "@xyflow/react";
import {Maximize, Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/button-group";

export function CanvasControls() {
  const {zoomIn, zoomOut, fitView, getZoom} = useReactFlow();

  return (
    <Panel position="bottom-left">
      <ButtonGroup className="border rounded-2xl shadow-sm bg-background " orientation="vertical">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => zoomIn({duration: 200})}
        >
          <Plus className="size-4"/>
        </Button>
        <ButtonGroupSeparator orientation="horizontal"/>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => zoomOut({duration: 200})}
        >
          <Minus className="size-4"/>
        </Button>
        <ButtonGroupSeparator orientation="horizontal"/>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => fitView({duration: 300, padding: 0.2})}
        >
          <Maximize className="size-4"/>
        </Button>
      </ButtonGroup>
    </Panel>
  );
}
