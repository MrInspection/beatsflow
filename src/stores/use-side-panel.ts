import { create } from "zustand/react";

type PanelType = "music" | "workflow" | "help" | null;

interface PanelStore {
  openPanel: PanelType;
  setOpenPanel: (panel: PanelType) => void;
}

export const usePanelStore = create<PanelStore>((set) => ({
  openPanel: null,
  setOpenPanel: (panel) => set((state) => ({ openPanel: state.openPanel === panel ? null : panel })),
}));
