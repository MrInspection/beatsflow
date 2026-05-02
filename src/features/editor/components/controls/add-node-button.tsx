"use client";

import { useReactFlow } from "@xyflow/react";
import {
  Coffee,
  ListTodo,
  type LucideIcon,
  PencilLine,
  Plus,
  Zap,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BreakNodeData } from "@/features/editor/components/nodes/break-node";
import type { FocusNodeData } from "@/features/editor/components/nodes/focus-node";
import type { IntentionNodeData } from "@/features/editor/components/nodes/intention-node";
import type { TaskNodeData } from "@/features/editor/components/nodes/task-node";

type BlockDefinition = {
  type: "focus" | "break" | "task" | "intention";
  label: string;
  description: string;
  icon: LucideIcon;
  defaultData: FocusNodeData | BreakNodeData | TaskNodeData | IntentionNodeData;
};

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: "intention",
    label: "Set Intention",
    description: "Anchor your session with a goal",
    icon: PencilLine,
    defaultData: {
      prompt: "What do you want to accomplish today?",
      answer: "",
    } satisfies IntentionNodeData,
  },
  {
    type: "focus",
    label: "Focus Block",
    description: "Timed deep work sprint",
    icon: Zap,
    defaultData: {
      label: "Deep Work",
      durationMinutes: 25,
      intention: "",
    } satisfies FocusNodeData,
  },
  {
    type: "break",
    label: "Break Block",
    description: "Step away and recharge",
    icon: Coffee,
    defaultData: {
      label: "Short Break",
      durationMinutes: 5,
    } satisfies BreakNodeData,
  },
  {
    type: "task",
    label: "Task Block",
    description: "Checklist with a time limit",
    icon: ListTodo,
    defaultData: {
      label: "Tasks",
      durationMinutes: 20,
      advanceCondition: "timer",
      tasks: [],
    } satisfies TaskNodeData,
  },
];

function useAddNode() {
  const { addNodes, screenToFlowPosition } = useReactFlow();

  return useCallback(
    (block: BlockDefinition) => {
      const canvasEl = document.querySelector(".react-flow__renderer");
      const rect = canvasEl?.getBoundingClientRect();

      const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const centerY = rect
        ? rect.top + rect.height / 2
        : window.innerHeight / 2;

      const position = screenToFlowPosition({ x: centerX, y: centerY });

      addNodes({
        id: `${block.type}-${Date.now()}`,
        type: block.type,
        position,
        data: block.defaultData,
      });
    },
    [addNodes, screenToFlowPosition],
  );
}

export function AddNodeButton() {
  const addNode = useAddNode();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        <Plus className="size-4" /> Add block
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-4 w-72 p-2" align="center">
        {BLOCK_DEFINITIONS.map((block) => {
          const Icon = block.icon;
          return (
            <DropdownMenuItem
              key={block.type}
              onClick={() => {
                addNode(block);
                setOpen(false);
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5"
            >
              <Icon className="size-6" />
              <div className="min-w-0">
                <div className="truncate font-medium text-sm">
                  {block.label}
                </div>
                <p className="truncate text-muted-foreground text-xs">
                  {block.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
