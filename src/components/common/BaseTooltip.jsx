import styled from '@emotion/styled';

const TooltipBox = styled.span`
  --tooltip-shift-x: 0px;
  position: absolute;
  z-index: 98;
  width: max-content;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.modalBg};
  border: 1px solid ${({ theme }) => theme.colors.modalBorder};
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  backdrop-filter: ${({ theme }) => theme.effects.blurMd};
  opacity: 0;
  pointer-events: none;
  transition:
    opacity ${({ theme }) => theme.motion.normal},
    transform ${({ theme }) => theme.motion.normal};

  top: ${({ position, offset }) => (position === 'bottom' ? `calc(100% + ${offset})` : 'auto')};
  bottom: ${({ position, offset }) => (position === 'bottom' ? 'auto' : `calc(100% + ${offset})`)};
  left: 50%;
  transform: ${({ position }) =>
    position === 'bottom'
      ? 'translateX(calc(-50% + var(--tooltip-shift-x))) translateY(-6px) scale(0.4)'
      : 'translateX(calc(-50% + var(--tooltip-shift-x))) translateY(6px) scale(0.4)'};
  transform-origin: ${({ position }) => (position === 'bottom' ? 'top center' : 'bottom center')};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    --tooltip-shift-x: ${({ mobileShift }) => mobileShift};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: ${({ theme }) => theme.colors.dividerStrong};
  }

  &::after {
    content: '';
    position: absolute;
    top: ${({ position }) => (position === 'bottom' ? 'auto' : '100%')};
    bottom: ${({ position }) => (position === 'bottom' ? '100%' : 'auto')};
    left: calc(50% - var(--tooltip-shift-x));
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.modalBg};
    border-bottom: ${({ position, theme }) =>
      position === 'bottom'
        ? `2px solid ${theme.colors.modalBorder}`
        : `1px solid ${theme.colors.modalBorder}`};
    border-right: ${({ position, theme }) =>
      position === 'bottom'
        ? `2px solid ${theme.colors.modalBorder}`
        : `1px solid ${theme.colors.modalBorder}`};
    transform: ${({ position }) =>
      position === 'bottom'
        ? 'translateX(-50%) translateY(50%) rotate(225deg)'
        : 'translateX(-50%) translateY(-50%) rotate(45deg)'};
  }

  > * {
    display: block;
    opacity: 0;
    transform: translateY(6px);
    transition:
      opacity 0.24s ease,
      transform 0.24s ease;
  }

  > *:nth-of-type(2) {
    transition-delay: 0.04s;
  }

  > *:nth-of-type(3) {
    transition-delay: 0.08s;
  }
`;

export default function BaseTooltip({
  children,
  className,
  position = 'top',
  offset = '10px',
  maxWidth = 'auto',
  mobileShift = '0px',
  ...props
}) {
  return (
    <TooltipBox
      role="tooltip"
      className={className}
      position={position}
      offset={offset}
      maxWidth={maxWidth}
      mobileShift={mobileShift}
      {...props}
    >
      {children}
    </TooltipBox>
  );
}
