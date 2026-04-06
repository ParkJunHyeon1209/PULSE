import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useCartStore from './useCartStore';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      profileIcon: null,

      login: (userData = null) => {
        set({
          isLogin: true,
          user: userData,
        });
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        useCartStore.getState().resetCart();

        set({
          isLogin: false,
          user: null,
          profileIcon: null,
        });
      },

      setProfileIcon: (iconId) => set({ profileIcon: iconId }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
