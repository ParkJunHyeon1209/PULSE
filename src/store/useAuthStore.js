import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      login: (userData = null) => {
        set({
          isLogin: true,
          user: userData,
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
