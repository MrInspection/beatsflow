"use client";

import { useMusicStore } from "@/stores/use-music";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

export function YouTubePlayer() {
  const { currentTrack, isPlaying, isLooping } = useMusicStore();
  const [isReady, setIsReady] = useState(false);
  const [playerState, setPlayerState] = useState(-1);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const playerRef = useRef<any>(null);

  // Handle play/pause
  useEffect(() => {
    if (
      !isReady ||
      !playerRef.current ||
      currentTrack?.source !== "youtube" ||
      playerState === -1
    )
      return;

    // Small delay to ensure player is ready
    const timeoutId = setTimeout(() => {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error("YouTube player error:", error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isPlaying, currentTrack, isReady, playerState]);

  // Reset states when track changes
  useEffect(() => {
    setIsReady(false);
    setPlayerState(-1);
  }, [currentTrack?.id]);

  if (!currentTrack || currentTrack.source !== "youtube") return null;

  const videoId = currentTrack.url.split("v=")[1];
  if (!videoId) return null;

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
            origin: window.location.origin,
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
          setIsReady(true);
          setPlayerState(event.target.getPlayerState());
        }}
        onError={(error) => {
          console.error("YouTube playback error:", error);
          // Only move to next track on fatal errors
          if (
            error.data === 2 ||
            error.data === 5 ||
            error.data === 100 ||
            error.data === 101 ||
            error.data === 150
          ) {
            useMusicStore.getState().nextTrack();
          }
        }}
        onEnd={() => {
          if (!isLooping) {
            useMusicStore.getState().nextTrack();
          }
        }}
        onStateChange={(event) => {
          setPlayerState(event.data);
          // Handle unexpected stops
          if (event.data === YouTube.PlayerState.UNSTARTED && isPlaying) {
            setTimeout(() => {
              event.target.playVideo();
            }, 100);
          }
        }}
      />
    </div>
  );
}
