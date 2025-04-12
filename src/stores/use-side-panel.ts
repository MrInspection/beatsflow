import { create } from "zustand";

export type PanelType = "music" | "workflow" | "beatsAI";

interface PanelState {
  openPanel: PanelType | null;
  setOpenPanel: (panel: PanelType | null) => void;
}

export const usePanelStore = create<PanelState>((set) => ({
  openPanel: null,
  setOpenPanel: (panel) => set({ openPanel: panel }),
}));
