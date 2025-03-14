import { create } from "zustand/react";

type PanelType = "chatbot" | "music" | "workflow" | null;

interface PanelStore {
  openPanel: PanelType;
  setOpenPanel: (panel: PanelType) => void;
}

export const usePanelStore = create<PanelStore>((set) => ({
  openPanel: null,
  setOpenPanel: (panel) => set((state) => ({ openPanel: state.openPanel === panel ? null : panel })),
}));
