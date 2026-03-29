import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      login: () => {
        set({
          isLogin: true,
          user: null,
        });
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        set({
          isLogin: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
