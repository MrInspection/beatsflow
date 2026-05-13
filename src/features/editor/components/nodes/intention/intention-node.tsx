import { Handle, type NodeProps, Position } from "@xyflow/react";
import { PencilLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NodeShell } from "@/features/editor/components/nodes/shared/node-shell";
import type { IntentionNodeType } from "@/features/shared/types/intention-node.types";

export function IntentionNode({
  data,
  selected,
}: NodeProps<IntentionNodeType>) {
  return (
    <NodeShell selected={selected}>
      <div className="flex items-center gap-2 p-4 py-3">
        <PencilLine className="size-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1 truncate font-medium">Set Intention</div>
        <Badge
          className="ml-auto shrink-0 bg-indigo-100/80 dark:bg-purple-800/25 dark:text-purple-400"
          variant="secondary"
        >
          Prompt
        </Badge>
      </div>
      <div className="space-y-6 border-t p-4">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea value={data.prompt} tabIndex={-1} readOnly />
        </div>
        <div className="space-y-2">
          <Label>Your answer</Label>
          <Textarea
            value={data.answer ?? ""}
            placeholder="Tell us what are you going to tackle"
            tabIndex={-1}
            readOnly
          />
          <p className="mt-4 text-pretty text-muted-foreground text-sm">
            You will be prompted to answer this question at the beginning of
            your workflow.
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="border! size-2! border-muted-foreground bg-input!"
      />
    </NodeShell>
  );
}
