"use client"

import {type Node} from "@xyflow/react";
import {Sheet, SheetContent, SheetHeader} from "@/components/ui/sheet";

type NodeDetailsSheetProps = {
  node: Node | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: string, data: Record<string, unknown>) => void
  onDelete: (id: string) => void
}

export function NodeDetailsSheet({node, open, onOpenChange, onUpdate, onDelete}: NodeDetailsSheetProps) {
  if(!node) return null;

  const handleUpdate = (data: Record<string, unknown>) => {
    onUpdate(node.id, data)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={true}>
      <SheetContent className="max-h-[90vh] md:min-w-116 md:rounded-4xl mr-8 mt-8">
        <SheetHeader>

        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
