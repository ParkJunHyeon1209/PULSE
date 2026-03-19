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
    $isLiked ? theme.iconBtn.wish.activeBg : theme.iconBtn.wish.bg} !important;
  border-color: ${({ $isLiked, theme }) =>
    $isLiked ? theme.iconBtn.wish.activeBorder : theme.iconBtn.wish.border} !important;
  color: ${({ $isLiked, theme }) =>
    $isLiked ? theme.iconBtn.wish.activeColor : theme.iconBtn.wish.color} !important;
  box-shadow: none !important;
  opacity: ${({ $isLiked }) => ($isLiked ? 1 : 0)};
  transform: translateY(${({ $isLiked }) => ($isLiked ? '0' : '-4px')});
  transition:
    opacity 0.2s,
    transform 0.2s,
    color 0.2s,
    background 0.2s,
    border-color 0.2s !important;
  z-index: 4;

  svg {
    fill: ${({ $isLiked }) => ($isLiked ? 'currentColor' : 'none')};
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.iconBtn.wish.hoverColor} !important;
    background: ${({ theme }) => theme.iconBtn.wish.hoverBg} !important;
    border-color: ${({ theme }) => theme.iconBtn.wish.hoverBorder} !important;
    box-shadow: none !important;
    transform: translateY(0) !important;
  }
  &:active:not(:disabled) {
    transform: scale(0.88) !important;
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
  color: ${({ theme }) => theme.colors.primary};

  &:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.15) rotate(90deg);
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

/* 하단 반짝이 */
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
