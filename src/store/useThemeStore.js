import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'pulse-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return true;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: getInitialTheme(),
      hasManualPreference: false,
      setIsDarkMode: (nextValue) => {
        if (typeof nextValue !== 'boolean') {
          return;
        }

        set({ isDarkMode: nextValue, hasManualPreference: true });
      },
      toggleTheme: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
          hasManualPreference: true,
        }));
      },
      syncSystemTheme: (isSystemDark) => {
        set((state) => {
          if (state.hasManualPreference) {
            return state;
          }

          return { isDarkMode: isSystemDark };
        });
      },
      resetTheme: () => {
        set({
          isDarkMode: getInitialTheme(),
          hasManualPreference: false,
        });
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useThemeStore;
