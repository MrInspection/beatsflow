import { SCENE_BACKGROUNDS } from "@/features/music/data/music.backgrounds";
import { useSceneStore } from "@/features/music/store/scene.store";

export function RunnerBackground() {
  const { selectedBackgroundId } = useSceneStore();

  const selectedBackground = SCENE_BACKGROUNDS.find(
    (background) => background.id === selectedBackgroundId,
  );

  if (!selectedBackground) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <video
        key={selectedBackground.videoSrc}
        src={selectedBackground.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
