
import { useEffect, useState } from 'react';

export function useResponsive(breakpoints) {
  const mobilePx = +breakpoints.mobile;
  const tabletPx = +breakpoints.tablet;
  const desktopPx = +breakpoints.desktop;

  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < mobilePx,
        isTablet: width >= mobilePx && width < tabletPx,
        isDesktop: width >= desktopPx,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobilePx, tabletPx, desktopPx]);

  return screenSize;
}
