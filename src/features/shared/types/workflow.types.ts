import type { BreakNodeType } from "./break-node.types";
import type { FocusNodeType } from "./focus-node.types";
import type { IntentionNodeType } from "./intention-node.types";
import type { TaskNodeType } from "./task-node.types";

export type WorkflowNode =
  | FocusNodeType
  | BreakNodeType
  | TaskNodeType
  | IntentionNodeType;
