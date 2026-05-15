"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { FocusNodeType } from "@/features/shared/types/focus-node.types";
import {
  NodeFormContent,
  NodeFormFooter,
  NodeFormHeader,
} from "../shared/node-form";

interface FocusNodeFormProps {
  node: FocusNodeType;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function FocusNodeForm({
  node,
  onUpdate,
  onDelete,
}: FocusNodeFormProps) {
  const { id, data } = node;

  return (
    <>
      <NodeFormHeader
        title="Focus Node"
        description="Timed deep work sprint"
        icon={Zap}
      />

      <NodeFormContent>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.label}
            placeholder="E.g. Review PRs"
            maxLength={25}
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
            max={120}
            step={5}
            value={[data.durationMinutes]}
            onValueChange={(value) => onUpdate(id, { durationMinutes: value })}
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">5m (MIN)</span>
            <span className="text-muted-foreground text-sm">120m (MAX)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Intention</Label>
          <Textarea
            value={data.intention}
            placeholder="What do you want to achieve?"
            onChange={(e) => onUpdate(id, { intention: e.target.value })}
          />
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
