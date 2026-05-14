import { MusicBar } from "@/features/music/components/music-bar/music-bar";
import { TasksListWidget } from "@/features/runner/components/session-stage/widgets/tasks-list/tasks-list.widget";

export function SessionStageBottomBar() {
  return (
    <div className="flex items-center justify-center gap-2">
      <MusicBar />
      <div className="size-auto shrink-0">
        <TasksListWidget />
      </div>
    </div>
  );
}
