import { create } from 'zustand';

interface AppState {
  hoveredProject: string | null;
  setHoveredProject: (slug: string | null) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

export const useStore = create<AppState>((set) => ({
  hoveredProject: null,
  setHoveredProject: (slug) => set({ hoveredProject: slug }),
  cursorText: '',
  setCursorText: (text) => set({ cursorText: text }),
}));
