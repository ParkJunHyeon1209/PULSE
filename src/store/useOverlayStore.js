import { create } from 'zustand';

const useOverlayStore = create((set, get) => ({
  searchOpen: false,
  loginOpen: false,
  modals: {},

  openSearch: () => set({ searchOpen: true, loginOpen: false }),
  closeSearch: () => set({ searchOpen: false }),

  openLogin: () => set({ loginOpen: !get().loginOpen, searchOpen: false }),
  closeLogin: () => set({ loginOpen: false }),

  openModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: true }, loginOpen: false })),
  closeModal: (id) => set((state) => ({ modals: { ...state.modals, [id]: false } })),
  isModalOpen: (id) => Boolean(get().modals[id]),

  closeAll: () => set({ searchOpen: false, loginOpen: false, modals: {} }),
}));

export default useOverlayStore;
