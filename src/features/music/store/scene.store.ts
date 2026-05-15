import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SceneStore {
  selectedBackgroundId: string | null;
  selectBackground: (id: string | null) => void;
}

export const useSceneStore = create<SceneStore>()(
  persist(
    (set) => ({
      selectedBackgroundId: null,
      selectBackground: (id) => set({ selectedBackgroundId: id }),
    }),
    {
      name: "beatsflow-scene",
    },
  ),
);
