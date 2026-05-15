"use client";

import Image from "next/image";
import { SCENE_BACKGROUNDS } from "@/features/music/data/music.backgrounds";
import { useSceneStore } from "@/features/music/store/scene.store";
import { cn } from "@/lib/utils";

export function MusicPopoverScenes() {
  const { selectedBackgroundId, selectBackground } = useSceneStore();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <button
        type="button"
        onClick={() => selectBackground(null)}
        className="overflow-hidden"
      >
        <div
          className={cn(
            "flex aspect-video w-full items-center justify-center rounded-lg bg-muted",
            selectedBackgroundId === null &&
              "border-2 border-primary transition-all duration-100",
          )}
        >
          <span className="text-muted-foreground text-sm">BeatsFlōw</span>
        </div>

        <div className="mt-1 font-medium text-[13px]">Default</div>
      </button>

      {SCENE_BACKGROUNDS.map((background) => (
        <button
          key={background.id}
          type="button"
          onClick={() => selectBackground(background.id)}
          className="overflow-hidden"
        >
          <Image
            src={background.thumbnailUrl}
            alt={background.title}
            className={cn(
              "aspect-video w-full rounded-lg border object-cover",
              selectedBackgroundId === background.id &&
                "border-2 border-primary transition-all duration-100",
            )}
            width={40}
            height={40}
          />
          <div className="mt-1 font-medium text-[13px]">{background.title}</div>
        </button>
      ))}
    </div>
  );
}
