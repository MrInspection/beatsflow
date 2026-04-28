"use client"

import { useCallback, useState } from "react"
import { FocusNodeData } from "@/features/editor/components/nodes/focus-node"
import { BreakNodeData } from "@/features/editor/components/nodes/break-node"
import { TaskNodeData } from "@/features/editor/components/nodes/task-node"
import { IntentionNodeData } from "@/features/editor/components/nodes/intention-node"
import { Coffee, ListTodo, LucideIcon, PencilLine, Plus, Zap } from "lucide-react"
import { useReactFlow } from "@xyflow/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type BlockDefinition = {
  type: "focus" | "break" | "task" | "intention"
  label: string
  description: string
  icon: LucideIcon
  defaultData: FocusNodeData | BreakNodeData | TaskNodeData | IntentionNodeData
}

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: "intention",
    label: "Set Intention",
    description: "Anchor your session with a goal",
    icon: PencilLine,
    defaultData: { prompt: "What do you want to accomplish today?", answer: "" } satisfies IntentionNodeData,
  },
  {
    type: "focus",
    label: "Focus Block",
    description: "Timed deep work sprint",
    icon: Zap,
    defaultData: { label: "Deep Work", durationMinutes: 25, intention: "" } satisfies FocusNodeData,
  },
  {
    type: "break",
    label: "Break Block",
    description: "Step away and recharge",
    icon: Coffee,
    defaultData: { label: "Short Break", durationMinutes: 5 } satisfies BreakNodeData,
  },
  {
    type: "task",
    label: "Task Block",
    description: "Checklist with a time limit",
    icon: ListTodo,
    defaultData: { label: "Tasks", durationMinutes: 20, advanceCondition: "timer", tasks: [] } satisfies TaskNodeData,
  },
]

function useAddNode() {
  const { addNodes, screenToFlowPosition } = useReactFlow()

  return useCallback((block: BlockDefinition) => {
    const canvasEl = document.querySelector(".react-flow__renderer")
    const rect = canvasEl?.getBoundingClientRect()

    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    const position = screenToFlowPosition({ x: centerX, y: centerY })

    addNodes({
      id: `${block.type}-${Date.now()}`,
      type: block.type,
      position,
      data: block.defaultData,
    })
  }, [addNodes, screenToFlowPosition])
}

export function AddNodeButton() {
  const addNode = useAddNode()
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        <Plus className="size-4" /> Add block
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 mt-4" align="center">
        {BLOCK_DEFINITIONS.map((block) => {
          const Icon = block.icon
          return (
            <DropdownMenuItem
              key={block.type}
              onClick={() => { addNode(block); setOpen(false) }}
              className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 group"
            >

                <Icon className="size-6" />

              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{block.label}</div>
                <p className="text-muted-foreground text-xs truncate">{block.description}</p>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
