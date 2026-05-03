"use client";

import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  NodeFormContent,
  NodeFormFooter,
  NodeFormHeader,
} from "@/features/editor/components/nodes/node-form";
import type { BreakNodeType } from "@/features/editor/types/break-node.types";

interface BreakNodeFormProps {
  node: BreakNodeType;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function BreakNodeForm({
  node,
  onUpdate,
  onDelete,
}: BreakNodeFormProps) {
  const { id, data } = node;

  return (
    <>
      <NodeFormHeader
        description="Step away and recharge"
        title="Break Node"
        icon={Coffee}
      />

      <NodeFormContent>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.label}
            placeholder="E.g. Review PRs"
            onChange={(e) => onUpdate(id, { label: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <Label>Duration</Label>
            <span className="font-bold text-xl tabular-nums">
              {data.durationMinutes}m
            </span>
          </div>
          <Slider
            className="mt-3"
            min={5}
            max={60}
            step={5}
            value={[data.durationMinutes]}
            onValueChange={(value) => onUpdate(id, { durationMinutes: value })}
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">5m (MIN)</span>
            <span className="text-muted-foreground text-sm">60m (MAX)</span>
          </div>
        </div>
      </NodeFormContent>

      <NodeFormFooter>
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => onDelete(id)}
        >
          Delete Node
        </Button>
      </NodeFormFooter>
    </>
  );
}
