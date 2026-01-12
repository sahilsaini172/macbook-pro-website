import { create } from "zustand";

const useMacbookStore = create((set) => ({
  color: "#E2E5E6",
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  reset: () => set({ color: "#E2E5E6", scale: 0.08 }),
}));

export default useMacbookStore;
