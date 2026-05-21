"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAddNode } from "@/features/editor/components/controls/add-node-button/add-node-menu.hook";
import { WORKFLOW_NODE_DEFINITIONS } from "@/features/editor/constants/workflow-node-definitions";

export function AddNodeMenu() {
  const addNode = useAddNode();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        <Plus className="size-4" /> Add block
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-4 w-72 border p-2" align="center">
        {WORKFLOW_NODE_DEFINITIONS.map((definition) => {
          const Icon = definition.icon;
          return (
            <DropdownMenuItem
              key={definition.type}
              onClick={() => {
                addNode(definition);
                setOpen(false);
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5"
            >
              <Icon className="size-6" />
              <div className="min-w-0">
                <div className="truncate font-medium text-sm">
                  {definition.label}
                </div>
                <p className="truncate text-muted-foreground text-xs">
                  {definition.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
