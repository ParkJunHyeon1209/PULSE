import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const getShowcaseSurfaceBg = (theme) =>
  theme.mode === 'dark'
    ? 'linear-gradient(155deg, rgba(72, 0, 255, 0.2) 0%, rgba(38, 28, 148, 0.4) 60%, rgba(21, 6, 40, 0.5) 100%)'
    : 'linear-gradient(155deg, rgba(216, 200, 255, 0.4) 0%, rgba(184, 204, 255, 0.6) 100%)';

const getShowcaseMediaBg = (theme) =>
  theme.mode === 'dark'
    ? 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
    : 'linear-gradient(180deg, rgba(124,58,237,0.14), rgba(124,58,237,0.08))';

const shimmer = keyframes`
  0% {
    transform: translate3d(-115%, -18%, 0) rotate(8deg);
  }

  100% {
    transform: translate3d(115%, 18%, 0) rotate(8deg);
  }
`;

export const SkeletonSurface = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ $surfaceBg, theme }) => $surfaceBg || theme.colors.cardBgLight};

  &::after {
    content: '';
    position: absolute;
    inset: -36%;
    transform: translate3d(-115%, -18%, 0) rotate(8deg);
    background: linear-gradient(
      100deg,
      transparent 26%,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.02 : 0.08)}) 40%,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.08 : 0.4)}) 50%,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.02 : 0.08)}) 60%,
      transparent 74%
    );
    animation: ${shimmer} ${({ $duration }) => $duration || '1.3s'} linear infinite;
    animation-delay: -0.45s;
  }
`;

export const SkeletonMedia = styled.div`
  background: ${({ $mediaBg, theme }) => {
    const resolvedMediaBg = typeof $mediaBg === 'function' ? $mediaBg(theme) : $mediaBg;

    return (
      resolvedMediaBg ||
      (theme.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
        : 'linear-gradient(180deg, rgba(124,58,237,0.10), rgba(124,58,237,0.05))')
    );
  }};
`;

export const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap, theme }) => $gap || theme.spacing[3]};
  padding: ${({ $padding, theme }) => $padding || theme.spacing[4]};
`;

export const SkeletonLine = styled.div`
  width: ${({ $w }) => $w || '100%'};
  height: ${({ $h }) => $h || '14px'};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $lineBg, theme }) =>
    $lineBg || (theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.1)')};
`;

const SkeletonFillMedia = styled(SkeletonMedia)`
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
`;

const ProductCardFrame = styled(SkeletonSurface)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ $cardMinHeight }) => $cardMinHeight || '372px'};
  border-radius: ${({ theme }) => theme.radii.xxl};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radii.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 3 / 4;
    height: auto;
    min-height: unset;
  }
`;

const ProductCardTop = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[5]};
`;

const ProductCardBadge = styled(SkeletonLine)`
  width: 72px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const ProductCardWish = styled(SkeletonLine)`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  opacity: 0.45;
`;

const ProductCardBottom = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing[6]};
  padding-right: ${({ theme }) => `calc(${theme.spacing[6]} + 48px)`};

  ${({ $compactPadding, theme }) =>
    $compactPadding &&
    `@media (max-width: 541px) {
      padding: ${theme.spacing[4]};
      padding-right: calc(${theme.spacing[4]} + 44px);
    }`}
`;

const ProductCardAction = styled(SkeletonLine)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[6]};
  bottom: ${({ theme }) => theme.spacing[6]};
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};

  @media (max-width: 844px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 541px) {
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[4]};
  }
`;

const ToneCardFrame = styled(SkeletonSurface)`
  position: relative;
  height: ${({ $height }) => $height || '210px'};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ $surfaceVariant, theme }) =>
    $surfaceVariant === 'showcase' ? getShowcaseSurfaceBg(theme) : undefined};
`;

const ToneCardInfo = styled.div`
  position: absolute;
  left: ${({ $insetX, theme }) => $insetX || theme.spacing[6]};
  right: ${({ $insetX, theme }) => $insetX || theme.spacing[6]};
  bottom: ${({ $bottomInset, theme }) => $bottomInset || theme.spacing[5]};
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export function ProductCardSkeletonItem({ cardMinHeight, compactPadding = false, as = 'article' }) {
  return (
    <ProductCardFrame as={as} $cardMinHeight={cardMinHeight}>
      <SkeletonFillMedia />
      <ProductCardTop>
        <ProductCardBadge />
        <ProductCardWish />
      </ProductCardTop>
      <ProductCardBottom $compactPadding={compactPadding}>
        <SkeletonLine $w="76%" $h="20px" />
        <SkeletonLine $w="54%" $h="14px" />
        <SkeletonLine $w="38%" $h="22px" />
      </ProductCardBottom>
      <ProductCardAction />
    </ProductCardFrame>
  );
}

export function ToneCardSkeletonItem({
  height,
  as = 'article',
  surfaceVariant,
  labelWidth = '84px',
  labelHeight = '14px',
  titleWidth = '58%',
  titleHeight = '24px',
  countWidth = '42%',
  countHeight = '18px',
  insetX,
  bottomInset,
}) {
  return (
    <ToneCardFrame as={as} $height={height} $surfaceVariant={surfaceVariant}>
      <SkeletonFillMedia
        $mediaBg={surfaceVariant === 'showcase' ? getShowcaseMediaBg : undefined}
      />
      <ToneCardInfo $insetX={insetX} $bottomInset={bottomInset}>
        <SkeletonLine $w={labelWidth} $h={labelHeight} />
        <SkeletonLine $w={titleWidth} $h={titleHeight} />
        <SkeletonLine $w={countWidth} $h={countHeight} />
      </ToneCardInfo>
    </ToneCardFrame>
  );
}
