import { useState, useCallback, useEffect, useRef } from 'react';

export default function useSlider(count, interval, onTick) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeRef = useRef(0);

  const move = useCallback(
    (dir) => {
      setActiveIndex((prev) => {
        const next = (prev + dir + count) % count;
        activeRef.current = next;
        return next;
      });
    },
    [count]
  );

  const goTo = useCallback(
    (index) => {
      const next = (index + count) % count;
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActiveIndex(next);
    },
    [count]
  );

  useEffect(() => {
    if (isPaused || interval == null) return;
    const tick = onTick ?? (() => move(1));
    const id = setTimeout(tick, interval);
    return () => clearTimeout(id);
  }, [activeIndex, isPaused, interval, move, onTick]);

  return { activeIndex, setActiveIndex, activeRef, isPaused, setIsPaused, move, goTo };
}
