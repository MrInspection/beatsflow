import { WorkflowBlockHeader } from "@/features/runner/components/session-workflow-pane/blocks/workflow-block-header";
import { WorkflowBlockProgress } from "@/features/runner/components/session-workflow-pane/blocks/workflow-block-progress";
import { WorkflowTaskList } from "@/features/runner/components/session-workflow-pane/blocks/workflow-task-list";
import { WORKFLOW_BLOCK_ICONS } from "@/features/runner/components/session-workflow-pane/constants/workflow-block-icons";
import { WorkflowConnectorLine } from "@/features/runner/components/session-workflow-pane/primitives/workflow-connector-line";
import { WorkflowStatusDot } from "@/features/runner/components/session-workflow-pane/primitives/workflow-status-dot";
import { WorkflowTimelineItem } from "@/features/runner/components/session-workflow-pane/primitives/workflow-timeline-item";
import type { WorkflowBlockModel } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";

type WorkflowBlockCardProps = {
  block: WorkflowBlockModel;
  isLast: boolean;
};

export function WorkflowBlockCard({ block, isLast }: WorkflowBlockCardProps) {
  const isCompleted = block.status === "completed";
  const isUpcoming = block.status === "upcoming";
  const isActive = block.status === "active";

  const BlockIcon = WORKFLOW_BLOCK_ICONS[block.type];

  return (
    <WorkflowTimelineItem
      faded={isCompleted || isUpcoming}
      connector={!isLast && <WorkflowConnectorLine status={block.status} />}
      indicator={<WorkflowStatusDot status={block.status} icon={BlockIcon} />}
    >
      <div className="flex flex-col gap-2 text-sm">
        <WorkflowBlockHeader
          label={block.label}
          durationMinutes={block.durationMinutes}
          completed={isCompleted}
        />

        {block.type === "focus" && block.intention && (
          <div className="my-1 space-y-3 rounded-lg border-2 border-b-4 px-3 py-3">
            <div className="font-semibold text-sm">Intention</div>
            <p className="text-muted-foreground text-sm">{block.intention}</p>
          </div>
        )}

        {block.tasks && <WorkflowTaskList tasks={block.tasks} />}

        {isActive && block.secondsRemainingLabel && (
          <WorkflowBlockProgress
            secondsRemainingLabel={block.secondsRemainingLabel}
            completedTasks={block.taskProgress?.completed}
            totalTasks={block.taskProgress?.total}
            isRunning={block.isRunning}
          />
        )}
      </div>
    </WorkflowTimelineItem>
  );
}
