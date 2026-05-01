"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import { ClockIcon, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type BreakNodeData = {
  label: string;
  durationMinutes: number;
};

export type BreakNodeType = Node<BreakNodeData, "break">;

export function BreakNode({ data, selected }: NodeProps<BreakNodeType>) {
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
        <Coffee className="size-5 text-muted-foreground" />
        <div className="font-medium">{data.label}</div>
        <Badge
          className="ml-auto bg-cyan-100/80 dark:bg-cyan-800/25 dark:text-cyan-400"
          variant="secondary"
        >
          Break
        </Badge>
      </div>

      <div className="space-y-2 border-t p-4">
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

      <Handle
        type="source"
        position={Position.Bottom}
        className="border! size-2! border-muted-foreground bg-input!"
      />
    </div>
  );
}
