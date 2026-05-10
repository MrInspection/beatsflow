import { MusicPlayerWidget } from "@/features/runner/components/session-stage/widgets/music-player/music-player.widget";

export function SessionStageTopBar() {
  return (
    <section className="flex items-center justify-between">
      <MusicPlayerWidget />
    </section>
  );
}
