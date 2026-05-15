import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MUSIC_STATIONS } from "@/features/music/data/music.stations";

type MusicDrawerTab = "stations" | "scenes";

interface MusicStore {
  selectedStationId: string | null;
  isPlaying: boolean;
  volume: number;
  isDrawerOpen: boolean;
  drawerTab: MusicDrawerTab;

  selectStation: (id: string) => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
  setDrawerOpen: (open: boolean) => void;
  setDrawerTab: (tab: MusicDrawerTab) => void;
}

export const useMusicStore = create<MusicStore>()(
  persist(
    (set) => ({
      selectedStationId: MUSIC_STATIONS[0].id,
      isPlaying: false,
      volume: 80,
      isDrawerOpen: false,
      drawerTab: "stations",

      selectStation: (id) => set({ selectedStationId: id, isPlaying: true }),
      togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setVolume: (volume) => set({ volume }),
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
      setDrawerTab: (tab) => set({ drawerTab: tab }),
    }),
    {
      name: "beatsflow-music",
      partialize: (state) => ({
        selectedStationId: state.selectedStationId,
        isPlaying: state.isPlaying,
        volume: state.volume,
      }),
    },
  ),
);
