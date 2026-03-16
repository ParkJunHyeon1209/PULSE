import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isLogin: false,

  login: (userData) =>
    set({
      user: userData,
      isLogin: true,
    }),

  logout: () =>
    set({
      user: null,
      isLogin: false,
    }),
}));

export default useAuthStore;
