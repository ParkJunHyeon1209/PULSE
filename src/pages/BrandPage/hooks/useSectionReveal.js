import { useEffect, useRef, useState } from 'react';

/**
 * - 뷰포트에 들어오면 visible: true (아래로 스크롤)
 * - 뷰포트에서 벗어나면 visible: false (위로 스크롤 시 재숨김)
 */
export function useSectionReveal({ threshold = 0.1, rootMargin = '0px 0px -4% 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
