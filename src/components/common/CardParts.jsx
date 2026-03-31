import styled from '@emotion/styled';
import BaseBtn from './BaseBtn';

/* 찜 버튼 */
export const CardWish = styled(BaseBtn, {
  shouldForwardProp: (prop) => prop !== '$isLiked',
})`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]};
  right: ${({ theme }) => theme.spacing[3]};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  background: ${({ $isLiked, theme }) =>
    $isLiked ? theme.btn.cardWish.activeBg : theme.btn.cardWish.bg};
  border-color: ${({ $isLiked, theme }) =>
    $isLiked ? theme.btn.cardWish.activeBorder : theme.btn.cardWish.border};
  color: ${({ $isLiked, theme }) =>
    $isLiked ? theme.btn.cardWish.activeColor : theme.btn.cardWish.color};
  box-shadow: none;
  opacity: ${({ $isLiked }) => ($isLiked ? 1 : 0)};
  transform: translateY(${({ $isLiked }) => ($isLiked ? '0' : '-4px')});
  transition:
    opacity 0.2s,
    transform 0.2s,
    color 0.2s,
    background 0.2s,
    border-color 0.2s;
  z-index: 4;

  svg {
    fill: ${({ $isLiked }) => ($isLiked ? 'currentColor' : 'none')};
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.btn.cardWish.hoverColor};
    background: ${({ theme }) => theme.btn.cardWish.hoverBg};
    border-color: ${({ theme }) => theme.btn.cardWish.hoverBorder};
    box-shadow: none;
    transform: translateY(0);
  }
  &:active:not(:disabled) {
    transform: scale(0.88);
  }
`;

/* 배지 */
export const CardBadge = styled(BaseBtn)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]};
  left: ${({ theme }) => theme.spacing[3]};
  z-index: 3;
  flex: none;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  letter-spacing: 0.1em;
`;

/* 장바구니 추가 버튼 */
export const CardAddBtn = styled(BaseBtn)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[6]};
  right: ${({ theme }) => theme.spacing[6]};
  z-index: 3;
  opacity: ${({ $hidden }) => ($hidden ? 0 : undefined)};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : undefined)};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    background ${({ theme }) => theme.motion.normal},
    color ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    opacity ${({ theme }) => theme.motion.normal},
    bottom ${({ theme }) => theme.motion.normal},
    right ${({ theme }) => theme.motion.normal},
    width ${({ theme }) => theme.motion.normal},
    height ${({ theme }) => theme.motion.normal};

  @media (max-width: 541px) {
    bottom: ${({ theme }) => theme.spacing[4]};
    right: ${({ theme }) => theme.spacing[4]};
  }
  color: ${({ theme }) => theme.btn.cardAdd.color};
  background: ${({ theme }) => theme.btn.cardAdd.bg};
  border-color: ${({ theme }) => theme.btn.cardAdd.border};
  box-shadow: ${({ theme }) => theme.btn.cardAdd.shadow};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.btn.cardAdd.hoverColor};
    background: ${({ theme }) => theme.btn.cardAdd.hoverBg};
    border-color: ${({ theme }) => theme.btn.cardAdd.hoverBorder};
    box-shadow: ${({ theme }) => theme.btn.cardAdd.hoverShadow};
    transform: translateY(-1px) scale(1.1) rotate(90deg);
  }
  &:active:not(:disabled) {
    transform: scale(0.95) rotate(90deg);
  }

  @media (max-width: 844px) {
    width: 30px;
    min-width: 30px;
    height: 30px;
  }
`;

/* 내부 하단 글로우 */
export const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ $tone, theme }) => theme.cardGlow[$tone]};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
  will-change: opacity;
  z-index: 1;
`;

/* 카드 슬라이드 반짝이 */
export const CardShim = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    115deg,
    transparent 0%,
    transparent 28%,
    rgba(255, 255, 255, 0.04) 38%,
    rgba(220, 200, 255, 0.09) 46%,
    rgba(255, 255, 255, 0.13) 50%,
    rgba(200, 220, 255, 0.08) 54%,
    rgba(255, 255, 255, 0.03) 62%,
    transparent 72%,
    transparent 100%
  );
  opacity: 0;
  transform: translateX(-110%);
  transition:
    opacity 0.18s ease-in,
    transform 0s;
  mix-blend-mode: screen;
  will-change: transform, opacity;
`;
