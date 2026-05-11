"use client";

import { Panel } from "@xyflow/react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddNodeButton } from "@/features/editor/components/controls/add-node-button";
import type { TaskNodeType } from "@/features/shared/types/task-node.types";
import { useWorkflowStore } from "../../store/workflow.store";

export function CanvasActionbar() {
  const router = useRouter();
  const { workflowId, nodes } = useWorkflowStore();

  function handleExecute() {
    const hasIntention = nodes.some((node) => node.type === "intention");
    const hasAtLeastOneBlock = nodes.some((node) => node.type !== "intention");

    if (!hasIntention) {
      toast.error("Add an Intention node before starting your session.");
      return;
    }

    if (!hasAtLeastOneBlock) {
      toast.error("Add at least one Focus, Break, or Task block.");
      return;
    }

    const emptyTaskNode = nodes.find(
      (node) =>
        node.type === "task" && (node as TaskNodeType).data.tasks.length === 0,
    ) as TaskNodeType | undefined;

    if (emptyTaskNode) {
      toast.error(
        `"${emptyTaskNode.data.label}" has no tasks. Add at least one task before running.`,
      );
      return;
    }

    router.push(`/session?id=${workflowId}`);
  }

  return (
    <Panel position="bottom-center">
      <div className="flex items-center gap-1 rounded-4xl border bg-background/80 p-2 shadow-sm backdrop-blur">
        <AddNodeButton />
        <Button variant="ghost" onClick={handleExecute}>
          <Play className="size-4 fill-current" /> Execute Workflow
        </Button>
      </div>
    </Panel>
  );
}
