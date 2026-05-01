"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import { ClockIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type FocusNodeData = {
  label: string;
  durationMinutes: number;
  intention?: string;
};

export type FocusNodeType = Node<FocusNodeData, "focus">;

export function FocusNode({ data, selected }: NodeProps<FocusNodeType>) {
  return (
    <div
      className={cn(
        "h-fit w-84 rounded-4xl border bg-background transition-shadow",
        selected ? "border-ring shadow-md ring-3 ring-ring/30" : "",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="border! size-2! border-muted-foreground bg-input!"
      />

      <div className="flex items-center gap-2 p-4 py-3">
        <Zap className="size-5 text-muted-foreground" />
        <div className="font-medium">{data.label}</div>
        <Badge
          className="ml-auto bg-pink-100/80 dark:bg-pink-800/25 dark:text-pink-400"
          variant="secondary"
        >
          Focus
        </Badge>
      </div>

      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <InputGroup>
            <InputGroupInput
              value={data.durationMinutes}
              readOnly
              tabIndex={-1}
            />
            <InputGroupAddon align="inline-start">
              <ClockIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">minutes</InputGroupAddon>
          </InputGroup>
        </div>
        {data.intention && (
          <div className="space-y-2">
            <Label>Intention</Label>
            <Textarea value={data.intention} tabIndex={-1} readOnly />
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="border! size-2! border-muted-foreground bg-input!"
      />
    </div>
  );
}
