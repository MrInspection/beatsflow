import { TasksListWidget } from "@/features/runner/components/session-stage/widgets/tasks-list/tasks-list.widget";
import { MusicPlayerWidget } from "../widgets/music-player/music-player.widget";

export function SessionStageBottomBar() {
  return (
    <div className="flex items-center justify-center gap-2">
      <MusicPlayerWidget />
      <div className="size-auto shrink-0">
        <TasksListWidget />
      </div>
    </div>
  );
}
