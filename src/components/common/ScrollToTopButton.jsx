import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const FloatingButton = styled.button`
  position: fixed;
  right: 28px;
  bottom: 32px;
  z-index: 999;
  width: 56px;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.tones.violet.activeBorder};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.tones.violet.bg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.tones.violet.shadow};
  backdrop-filter: ${({ theme }) => theme.effects.blurBtn};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.blurBtn};
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)'};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition:
    opacity ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.tones.violet.hoverBg};
    box-shadow: ${({ theme }) => theme.tones.violet.hoverShadow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 16px;
    bottom: 20px;
    width: 48px;
    height: 48px;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FloatingButton
      type="button"
      onClick={handleClickTop}
      aria-label="맨 위로 이동"
      $visible={visible}
    >
      TOP
    </FloatingButton>
  );
}
