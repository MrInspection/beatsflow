import type { LucideIcon } from "lucide-react";
import { Coffee, ListTodo, PencilLine, Zap } from "lucide-react";

export const WORKFLOW_BLOCK_ICONS: Record<string, LucideIcon> = {
  intention: PencilLine,
  focus: Zap,
  break: Coffee,
  task: ListTodo,
};
