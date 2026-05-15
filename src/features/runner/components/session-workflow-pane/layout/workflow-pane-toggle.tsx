import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type WorkflowPaneToggleProps = {
  hidden: boolean;
  onOpen: () => void;
};

export function WorkflowPaneToggle({
  hidden,
  onOpen,
}: WorkflowPaneToggleProps) {
  return (
    <Button
      variant="outline"
      className="flex h-full w-12 items-center justify-center rounded-xl border shadow-sm dark:bg-background dark:hover:bg-background/25"
      onClick={onOpen}
      aria-label="Show workflow pane"
      hidden={!hidden}
    >
      <ChevronLeft
        className="size-8 text-muted-foreground"
        aria-hidden="true"
      />
    </Button>
  );
}
