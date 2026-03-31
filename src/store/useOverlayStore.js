import { create } from 'zustand';

const useOverlayStore = create((set, get) => ({
  searchOpen: false,
  loginOpen: false,
  mobileMenuOpen: false,
  modals: {},

  openSearch: () => set({ searchOpen: true, loginOpen: false, mobileMenuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),

  openLogin: () => set({ loginOpen: !get().loginOpen, searchOpen: false }),
  closeLogin: () => set({ loginOpen: false }),

  openMobileMenu: () => set({ mobileMenuOpen: true, searchOpen: false, loginOpen: false }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  openModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: true }, loginOpen: false })),
  closeModal: (id) => set((state) => ({ modals: { ...state.modals, [id]: false } })),
  isModalOpen: (id) => Boolean(get().modals[id]),

  closeAll: () => set({ searchOpen: false, loginOpen: false, mobileMenuOpen: false, modals: {} }),
}));

export default useOverlayStore;
