import { create } from "zustand";

const useIsAdminStore = create((set) => ({
    isAdmin: false,
    setIsAdmin: (value) => set({ isAdmin: value }),
}));

export default useIsAdminStore;
