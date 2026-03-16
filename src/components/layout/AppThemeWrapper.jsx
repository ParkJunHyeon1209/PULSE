import { useEffect, useMemo } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import useThemeStore from '../../store/useThemeStore';
import { darkTheme, lightTheme } from '../../styles/theme';
import GlobalStyles from '../../styles/GlobalStyles';
import { ThemeProvider } from '@emotion/react';

export default function AppThemeWrapper({ children }) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const syncSystemTheme = useThemeStore((state) => state.syncSystemTheme);

  const curTheme = isDarkMode ? darkTheme : lightTheme;
  const { isMobile, isTablet, isDesktop } = useResponsive(curTheme.breakpoints);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => syncSystemTheme(e.matches);

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [syncSystemTheme]);

  const theme = useMemo(
    () => ({ ...curTheme, isMobile, isTablet, isDesktop }),
    [curTheme, isMobile, isTablet, isDesktop]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
