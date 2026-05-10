"use client";

import { Activity } from "react";
import { WorkflowBlockCard } from "@/features/runner/components/session-workflow-pane/blocks/workflow-block-card";
import { IntentionCard } from "@/features/runner/components/session-workflow-pane/intention/intention-card";
import { WorkflowPaneHeader } from "@/features/runner/components/session-workflow-pane/layout/workflow-pane-header";
import { WorkflowPaneToggle } from "@/features/runner/components/session-workflow-pane/layout/workflow-pane-toggle";
import type { SessionWorkflowModel } from "@/features/runner/components/session-workflow-pane/session-workflow-pane.model";

interface SessionWorkflowPaneViewProps {
  mode: "visible" | "hidden";
  workflow: SessionWorkflowModel;
  onOpen: () => void;
  onClose: () => void;
}

export function SessionWorkflowPaneView({
  mode,
  workflow,
  onOpen,
  onClose,
}: SessionWorkflowPaneViewProps) {
  return (
    <>
      <WorkflowPaneToggle hidden={mode === "hidden"} onOpen={onOpen} />
      <Activity mode={mode}>
        <aside className="flex h-full w-140 min-w-0 flex-col overflow-hidden rounded-4xl border bg-background shadow-sm">
          <WorkflowPaneHeader onClose={onClose} />
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {workflow.intention && (
                <IntentionCard intention={workflow.intention} />
              )}
              {workflow.blocks.map((block, index) => (
                <WorkflowBlockCard
                  key={block.id}
                  block={block}
                  isLast={index === workflow.blocks.length - 1}
                />
              ))}
            </div>
          </div>
        </aside>
      </Activity>
    </>
  );
}
