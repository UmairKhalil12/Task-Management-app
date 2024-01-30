import create from 'zustand';

export const useAppStore = create((set) => ({
    drawerOpen: true,
    onDrawerClose: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}));

