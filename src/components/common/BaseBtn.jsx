import StarIcon, { ArrowIcon } from '../../assets/icons/BtnIcon';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const btnStyle = (theme, variant, tone) => {
  if (variant === 'secondary' || variant === 'ic-btn') {
    return {
      border: theme.btn.secondaryBorder,
      bg: theme.btn.secondaryBg,
      color: theme.btn.secondaryColor,
      wColor: theme.colors.wColor,
      shadow: theme.btn.secondaryShadow,
      hoverBg: theme.btn.secondaryHoverBg,
      hoverBorder: theme.btn.secondaryHoverBorder,
      hoverColor: theme.btn.secondaryHoverColor,
      hoverShadow: theme.btn.secondaryHoverShadow,
      activeBg: theme.btn.secondaryHoverBg,
    };
  }

  if (variant === 'badge') {
    const b = theme.badge?.[tone] ?? theme.badge?.col;
    return {
      border: b.border,
      bg: b.bg,
      color: b.color,
      shadow: 'none',
      hoverBg: b.bg,
      hoverBorder: b.border,
      hoverColor: b.color,
      hoverShadow: 'none',
      activeBg: b.bg,
    };
  }

  if (variant === 'c-badge') {
    const b = theme.badge?.[tone] ?? theme.badge?.col;
    const c = theme.cStatus?.[tone];
    const textColor = b?.color ?? theme.colors.wColor;
    return {
      border: c ? 'transparent' : b.border,
      bg: c ? c.bg : b.bg,
      color: theme.colors.wColor,
      wColor: theme.colors.wColor,
      shadow: c ? c.shadow : 'none',
      hoverBg: c ? c.hoverBg : b.bg,
      hoverBorder: c ? 'transparent' : b.border,
      hoverColor: c ? theme.colors.wColor : textColor,
      hoverShadow: c ? c.hoverShadow : 'none',
      activeBg: c ? c.btnActiveBg : b.bg,
    };
  }

  const toneStyle = theme.tones[tone] || theme.tones.violet;

  return {
    border: 'transparent',
    bg: toneStyle.bg,
    color: theme.colors.wColor,
    shadow: toneStyle.shadow,
    hoverBg: toneStyle.hoverBg,
    hoverBorder: 'transparent',
    hoverColor: theme.colors.wColor,
    hoverShadow: toneStyle.hoverShadow,
    activeBg: toneStyle.btnActiveBg,
  };
};

const BtnLabel = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const btnIconBase = ({ theme }) => `
  position: absolute;
  top: 50%;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity ${theme.motion.normal},
    transform ${theme.motion.normal};
`;

const BtnSpark = styled(StarIcon)`
  ${btnIconBase}
  left: ${({ theme }) => `calc(${theme.spacing[4]} * -1)`};
  box-shadow: ${({ theme }) => theme.effects.glowDropShadowPurple};
  transform: translate(-30px, -50%) scale(0.88) rotate(-360deg);
`;

const BtnArrow = styled(ArrowIcon)`
  ${btnIconBase}
  right: ${({ theme }) => `calc(${theme.spacing[5]} * -1)`};
  width: 10px;
  height: 10px;
  transform: translate(10px, -50%) scale(0.88);
`;

const StyledBtn = styled.button`
  display: inline-flex;
  position: relative;
  overflow: hidden;

  align-items: center;
  justify-content: center;

  flex: ${({ $flex = '1' }) => $flex};

  width: ${({ $size, $width }) => $width || $size || 'auto'};
  min-width: ${({ $size, $width }) => $width || $size || 'auto'};
  height: ${({ $size, $height }) => $size || $height};
  padding: ${({ theme, $padding }) => $padding || `${theme.spacing[3]} ${theme.spacing[3]}`};
  font-size: ${({ $variant, theme }) =>
    $variant === 'badge' || $variant === 'c-badge' ? theme.fontSize.xxxs : undefined};
  border-radius: ${({ theme }) => theme.radii.pill};

  backdrop-filter: ${({ theme }) => theme.effects.blurBtn};
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    background ${({ theme }) => theme.motion.normal},
    color ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    opacity ${({ theme }) => theme.motion.normal};

  border: 1px solid ${({ $btnStyle }) => $btnStyle.border};
  background: ${({ $btnStyle }) => $btnStyle.bg};
  color: ${({ $btnStyle }) => $btnStyle.color};
  box-shadow: ${({ $btnStyle }) => $btnStyle.shadow};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: ${({ $variant = 'primary' }) => ($variant === 'primary' ? 1 : 0)};
    background: ${({ theme }) => theme.btn.overlay};
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${({ $btnStyle }) => $btnStyle.hoverBg};
    color: ${({ $btnStyle }) => $btnStyle.hoverColor};
    border-color: ${({ $btnStyle }) => $btnStyle.hoverBorder};
    box-shadow: ${({ $btnStyle }) => $btnStyle.hoverShadow};
  }

  &:hover:not(:disabled) .btn-spark {
    opacity: 1;
    transform: translate(-20px, -50%) scale(1) rotate(0deg);
  }

  &:hover:not(:disabled) .btn-arrow {
    opacity: 1;
    transform: translate(-4px, -50%) scale(1);
  }
  &:active:not(:disabled) {
    transform: scale(0.97);
    background: ${({ $btnStyle }) => $btnStyle.activeBg};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    transform: none;
    box-shadow: none;
  }
`;

export default function BaseBtn({
  children,
  flex = '1',
  variant = 'primary',
  tone = 'violet',
  height = '46px',
  size,
  type = 'button',
  padding,
  icon = true,
  ...props
}) {
  const theme = useTheme();
  const btnStyled = btnStyle(theme, variant, tone);
  return (
    <StyledBtn
      type={type}
      $variant={variant}
      $flex={flex}
      $padding={padding}
      $tone={tone}
      $height={height}
      $size={size}
      {...props}
      $btnStyle={btnStyled}
    >
      <BtnLabel>
        {variant === 'secondary' && icon ? (
          <BtnArrow className="btn-arrow" aria-hidden="true" />
        ) : variant === 'primary' && icon ? (
          <BtnSpark className="btn-spark" aria-hidden="true" />
        ) : null}
        {children}
      </BtnLabel>
    </StyledBtn>
  );
}
