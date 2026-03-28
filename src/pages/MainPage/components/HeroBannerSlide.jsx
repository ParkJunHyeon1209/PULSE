import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import banner1D from '../../../assets/img/banners/1_dark.webp';
import banner1L from '../../../assets/img/banners/1_light.webp';
import banner2D from '../../../assets/img/banners/2_dark.webp';
import banner2L from '../../../assets/img/banners/2_light.webp';
import banner3D from '../../../assets/img/banners/3_dark.webp';
import banner3L from '../../../assets/img/banners/3_light.webp';
import { ArrowIconL } from '../../../assets/icons/BtnIcon';

const BANNER_IMAGES = [
  { id: '1', dark: banner1D, light: banner1L, opacity: 0.6 },
  { id: '2', dark: banner2D, light: banner2L },
  { id: '3', dark: banner3D, light: banner3L },
];

const BannerWrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const SlideRow = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  transform: translateX(${({ $index }) => `-${$index * 100}%`});
  transition: ${({ $animate }) => ($animate ? 'transform 700ms ease' : 'none')};
`;

const SlideLayer = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const GlowLayer = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background: ${({ theme }) => `
    radial-gradient(circle at 18% 24%, ${theme.tones.blue.subtleColor}, transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(${theme.colors.accentRgb}, 0.2), transparent 24%),
    radial-gradient(circle at 52% 76%, rgba(${theme.colors.primaryRgb}, 0.18), transparent 32%)
  `};
`;

const NavButton = styled('button', {
  shouldForwardProp: (prop) => prop !== '$side',
})`
  position: absolute;
  top: 50%;
  ${({ $side, theme }) =>
    $side === 'left' ? `left: ${theme.spacing[8]};` : `right: ${theme.spacing[8]};`}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  pointer-events: auto;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    opacity ${({ theme }) => theme.motion.fast},
    filter ${({ theme }) => theme.motion.fast};

  &:hover,
  &:focus-visible {
    transform: translateY(-50%) scale(1.18);
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
    filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.primary});
    outline: none;
  }

  &:active {
    transform: translateY(-50%) scale(0.9);
    opacity: 0.7;
    filter: none;
    transition:
      transform 0.08s ease,
      opacity 0.08s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 36px;
    ${({ $side, theme }) =>
      $side === 'left' ? `left: ${theme.spacing[4]};` : `right: ${theme.spacing[4]};`}
  }
`;

const NavArrow = styled(ArrowIconL, {
  shouldForwardProp: (prop) => prop !== '$side',
})`
  width: 36px;
  height: 36px;
  transform: ${({ $side }) => ($side === 'left' ? 'rotate(180deg)' : 'none')};
`;

export default function HeroBannerSlide({ slideIndex, useMotion, onPrev, onNext, onTransitionEnd }) {
  const { mode } = useTheme();

  const slides = BANNER_IMAGES.map(({ id, dark, light, opacity }) => ({
    id,
    image: mode === 'dark' ? dark : light,
    opacity,
  }));
  const loopSlides = [slides[slides.length - 1], ...slides, slides[0]];

  return (
    <BannerWrap aria-label="Hero banner slider">
      <SlideRow $index={slideIndex} $animate={useMotion} onTransitionEnd={onTransitionEnd}>
        {loopSlides.map((slide, index) => (
          <SlideLayer
            key={`${slide.id}-${index}`}
            $image={slide.image}
            style={{ opacity: slide.opacity ?? 1 }}
          />
        ))}
      </SlideRow>
      <GlowLayer />
      <NavButton type="button" $side="left" onClick={onPrev} aria-label="Previous slide">
        <NavArrow $side="left" aria-hidden="true" />
      </NavButton>
      <NavButton type="button" $side="right" onClick={onNext} aria-label="Next slide">
        <NavArrow $side="right" aria-hidden="true" />
      </NavButton>
    </BannerWrap>
  );
}
