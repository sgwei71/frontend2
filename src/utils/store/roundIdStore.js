import { create } from "zustand";

const useRoundIdStore = create((set) => ({
    roundId: 2,
    setRoundId: (value) => set({ roundId: value }),
}));

export default useRoundIdStore;
