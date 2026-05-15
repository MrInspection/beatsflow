import { MUSIC_STATIONS } from "@/features/music/data/music.stations";
import { useMusicStore } from "@/features/music/store/music.store";

export function useMusicPlayer() {
  const {
    selectedStationId,
    isPlaying,
    volume,
    togglePlayback,
    setVolume,
    setDrawerOpen,
  } = useMusicStore();

  const selectedStation = MUSIC_STATIONS.find(
    (station) => station.id === selectedStationId,
  );

  return {
    selectedStation,
    isPlaying,
    volume,
    togglePlayback,
    setVolume,
    setDrawerOpen,
  };
}
