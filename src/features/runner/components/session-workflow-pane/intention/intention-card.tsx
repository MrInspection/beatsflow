import { PencilLine } from "lucide-react";
import { WorkflowConnectorLine } from "@/features/runner/components/session-workflow-pane/primitives/workflow-connector-line";
import { WorkflowStatusDot } from "@/features/runner/components/session-workflow-pane/primitives/workflow-status-dot";
import { WorkflowTimelineItem } from "@/features/runner/components/session-workflow-pane/primitives/workflow-timeline-item";
import type { IntentionModel } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";

type IntentionCardProps = {
  intention: IntentionModel;
};

export function IntentionCard({ intention }: IntentionCardProps) {
  return (
    <WorkflowTimelineItem
      faded
      connector={<WorkflowConnectorLine status="completed" />}
      indicator={<WorkflowStatusDot status="completed" icon={PencilLine} />}
    >
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-medium">{intention.prompt}</p>
        <div className="mt-1 space-y-3 overflow-hidden rounded-lg border-2 border-b-4 px-4 py-3">
          <div className="font-semibold">Your answer</div>
          <p className="text-muted-foreground">
            {intention.answer ?? "No answer provided"}
          </p>
        </div>
      </div>
    </WorkflowTimelineItem>
  );
}
