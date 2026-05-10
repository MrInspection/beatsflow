import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TasksListWidget } from "@/features/runner/components/session-stage/widgets/tasks-list/tasks-list.widget";

export function SessionStageBottomBar() {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button variant="ghost" className="opacity-0">
        <Settings2 className="size-5" />
      </Button>
      <div className="size-auto shrink-0">
        <TasksListWidget />
      </div>
    </div>
  );
}
