import { create } from "zustand";
import { playlist } from "@/data/playlist";

export type MusicSource = "spotify" | "soundcloud" | "youtube";

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  source?: MusicSource;
  type?: string;
}

interface MusicState {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  searchQuery: string;
  searchSource: MusicSource | "all";
  searchResults: Track[];
  isLoading: boolean;

  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setSearchQuery: (query: string) => void;
  setSearchSource: (source: MusicSource | "all") => void;
  setSearchResults: (results: Track[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  tracks: playlist,
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  isLooping: false,
  isShuffling: false,
  searchQuery: "",
  searchSource: "all",
  searchResults: [],
  isLoading: false,

  setCurrentTrack: (track) => {
    set({ currentTrack: track, isPlaying: true });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) => set({ volume }),

  nextTrack: () => {
    const { tracks, currentTrack, isShuffling } = get();
    if (!tracks.length) return;

    if (!currentTrack) {
      // If no track is playing, start with the first one
      set({
        currentTrack: tracks[0],
        isPlaying: true,
      });
      return;
    }

    if (isShuffling) {
      // Pick a random track that's not the current one
      const availableTracks = tracks.filter(
        (track) => track.id !== currentTrack.id,
      );
      if (availableTracks.length) {
        const randomIndex = Math.floor(Math.random() * availableTracks.length);
        set({
          currentTrack: availableTracks[randomIndex],
          isPlaying: true,
        });
      }
      return;
    }

    // Normal sequential playback
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id,
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    set({
      currentTrack: tracks[nextIndex],
      isPlaying: true,
    });
  },

  previousTrack: () => {
    const { tracks, currentTrack } = get();
    if (!tracks.length || !currentTrack) return;

    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id,
    );
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    set({
      currentTrack: tracks[prevIndex],
      isPlaying: true,
    });
  },

  toggleLoop: () => set((state) => ({ isLooping: !state.isLooping })),

  toggleShuffle: () => set((state) => ({ isShuffling: !state.isShuffling })),

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setSearchSource: (searchSource: MusicSource | "all") => set({ searchSource }),
  setSearchResults: (searchResults: Track[]) => set({ searchResults }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
