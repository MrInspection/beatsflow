import { BreakNodeForm } from "@/features/editor/components/nodes/break/break-node.form";
import { FocusNodeForm } from "@/features/editor/components/nodes/focus/focus-node.form";
import { IntentionNodeForm } from "@/features/editor/components/nodes/intention/intention-node.form";
import { TaskNodeForm } from "@/features/editor/components/nodes/task/task-node.form";
import type { WorkflowNode } from "@/features/shared/types/workflow.types";

interface NodeFormProps {
  node: WorkflowNode;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

const nodeFormRegistry = {
  task: TaskNodeForm,
  intention: IntentionNodeForm,
  break: BreakNodeForm,
  focus: FocusNodeForm,
} as const;

export function NodeFormRegistry({ node, onUpdate, onDelete }: NodeFormProps) {
  const Form = nodeFormRegistry[node.type];
  if (!Form) return null;
  return <Form node={node as never} onUpdate={onUpdate} onDelete={onDelete} />;
}
