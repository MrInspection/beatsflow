import { PanelRightCloseIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type WorkflowPaneHeaderProps = {
  onClose: () => void;
};

export function WorkflowPaneHeader({ onClose }: WorkflowPaneHeaderProps) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <Button variant="ghost" size="icon" onClick={onClose}>
        <PanelRightCloseIcon className="size-5" aria-hidden="true" />
      </Button>

      <h4 className="font-semibold">My Workflow</h4>
    </div>
  );
}
