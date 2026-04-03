import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import BaseBtn from './BaseBtn';
import { ArrowIconL } from '../../assets/icons/BtnIcon';

const Arrow = styled(ArrowIconL)`
  width: 22px;
  height: 22px;
  transform: rotate(-90deg);
  transition:
    width ${({ theme }) => theme.motion.normal},
    height ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 18px;
    height: 18px;
  }
`;

const FloatingBtn = styled(BaseBtn)`
  position: fixed;
  right: 28px;
  bottom: 32px;
  z-index: 999;
  overflow: visible;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)'};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  border: 1px solid ${({ theme }) => theme.tones.violet.activeBorder};
  box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);

  transition:
    opacity ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.normal},
    background ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    width ${({ theme }) => theme.motion.normal},
    height ${({ theme }) => theme.motion.normal},
    min-width ${({ theme }) => theme.motion.normal};

  && {
    background: transparent;
    transition:
      opacity ${({ theme }) => theme.motion.fast},
      transform ${({ theme }) => theme.motion.normal},
      background ${({ theme }) => theme.motion.fast},
      box-shadow ${({ theme }) => theme.motion.normal},
      border-color ${({ theme }) => theme.motion.normal},
      width ${({ theme }) => theme.motion.normal},
      height ${({ theme }) => theme.motion.normal},
      min-width ${({ theme }) => theme.motion.normal};
  }

  &:hover:not(:disabled) {
    transform: ${({ $visible }) =>
      $visible ? 'translateY(-8px) scale(1)' : 'translateY(16px) scale(0.92)'};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.gradients.top};
    opacity: 0.8;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 16px;
    bottom: 20px;
    width: 38px;
    height: 38px;
    min-width: 38px;
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FloatingBtn
      type="button"
      variant="ic-btn"
      tone="violet"
      size="44px"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
      $visible={visible}
      icon={false}
    >
      <Arrow strokeWidth="2.2" />
    </FloatingBtn>
  );
}
