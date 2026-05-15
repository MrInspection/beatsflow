"use client";

import Image from "next/image";
import { MUSIC_STATIONS } from "@/features/music/data/music.stations";
import { useMusicStore } from "@/features/music/store/music.store";
import { cn } from "@/lib/utils";

export function MusicPopoverStations() {
  const { selectedStationId, selectStation } = useMusicStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {MUSIC_STATIONS.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => selectStation(station.id)}
            className={cn(
              "group relative overflow-hidden text-left transition-all",
            )}
          >
            <Image
              src={station.thumbnailUrl}
              alt={station.title}
              className={cn(
                "aspect-video w-full rounded-lg object-cover",
                selectedStationId === station.id &&
                  "border-2 border-primary transition-all duration-100",
              )}
              width={40}
              height={40}
            ></Image>
            <div className="pt-2">
              <div className="font-medium text-[13px]">{station.title}</div>
              <div className="text-muted-foreground text-xs capitalize">
                {station.category}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
