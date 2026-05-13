"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWorkflowStore } from "@/features/editor/store/workflow.store";

export function ResetWorkflowButton() {
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);

  function handleClick() {
    if (isConfirmingReset) {
      resetWorkflow();
      toast.success("Your canvas has been reset.");
      setIsConfirmingReset(false);
      return;
    }

    setIsConfirmingReset(true);
    setTimeout(() => setIsConfirmingReset(false), 3000);
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleClick}>
      {isConfirmingReset ? (
        <AlertTriangle className="size-4 text-destructive" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </Button>
  );
}
