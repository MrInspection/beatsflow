"use client";

import { useEffect, useRef } from "react";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { MUSIC_STATIONS } from "@/features/music/data/music.stations";
import { useMusicStore } from "@/features/music/store/music.store";

export function MusicProvider() {
  const { selectedStationId, isPlaying, volume } = useMusicStore();
  const playerRef = useRef<YouTubePlayer | null>(null);

  const selectedStation = MUSIC_STATIONS.find(
    (station) => station.id === selectedStationId,
  );

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume);
  }, [volume]);

  if (!selectedStation) return null;

  return (
    <div className="pointer-events-none fixed opacity-0" aria-hidden>
      <YouTube
        key={selectedStation.youtubeId}
        videoId={selectedStation.youtubeId}
        opts={{
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: selectedStation.youtubeId,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
          playerRef.current.setVolume(volume);
          if (isPlaying) {
            playerRef.current.playVideo();
          }
        }}
      />
    </div>
  );
}
