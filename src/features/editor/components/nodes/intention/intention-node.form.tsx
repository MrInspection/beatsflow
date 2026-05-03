"use client";

import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  NodeFormContent,
  NodeFormFooter,
  NodeFormHeader,
} from "@/features/editor/components/nodes/node-form";
import type { IntentionNodeType } from "@/features/editor/types/intention-node.types";

interface IntentionNodeFormProps {
  node: IntentionNodeType;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export function IntentionNodeForm({
  node,
  onUpdate,
  onDelete,
}: IntentionNodeFormProps) {
  const { id, data } = node;

  return (
    <>
      <NodeFormHeader
        title="Intention Node"
        description="Anchor your session with a goal"
        icon={PencilLine}
      />

      <NodeFormContent>
        <div className="space-y-2">
          <Label>Intention</Label>
          <Textarea
            value={data.prompt}
            placeholder="E.g. Draft proposal for client meeting"
            onChange={(e) => onUpdate(id, { prompt: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Your answer</Label>
          <Textarea
            value={data.answer}
            placeholder="Tell us what are you going to tackle"
            onChange={(e) => onUpdate(id, { answer: e.target.value })}
          />
          <p className="mt-4 text-pretty text-muted-foreground text-sm">
            You will be prompted to answer this question at the beginning of
            your workflow.
          </p>
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
