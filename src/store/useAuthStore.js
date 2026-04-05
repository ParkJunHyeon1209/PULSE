import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        set({
          isLogin: false,
          user: null,
          profileIcon: null,
        });
      },

      // 사용자 아이콘 설정 - 추가 했어욤...
      setProfileIcon: (iconId) => set({ profileIcon: iconId }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
