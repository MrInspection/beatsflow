"use client";

import { useMusicStore } from "@/stores/use-music";
import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

export function YouTubePlayer() {
  const { currentTrack, isPlaying, isLooping } = useMusicStore();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (playerRef.current && currentTrack?.source === "youtube") {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack || currentTrack.source !== "youtube") return null;

  const videoId = currentTrack.url.split("v=")[1];

  return (
    <div className="hidden">
      <YouTube
        videoId={videoId}
        opts={{
          height: "0",
          width: "0",
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 0,
            loop: isLooping ? 1 : 0,
            playlist: videoId,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onEnd={() => {
          useMusicStore.getState().nextTrack();
        }}
        onError={() => {
          console.error("YouTube playback error");
          useMusicStore.getState().nextTrack();
        }}
      />
    </div>
  );
}
