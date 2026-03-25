import { useTheme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import banner1D from '../../assets/img/banners/1_dark.webp';
import banner1L from '../../assets/img/banners/1_light.webp';
import banner2D from '../../assets/img/banners/2_dark.webp';
import banner2L from '../../assets/img/banners/2_light.webp';
import banner3D from '../../assets/img/banners/3_dark.webp';
import banner3L from '../../assets/img/banners/3_light.webp';
import { ArrowIconL } from '../../assets/icons/BtnIcon';

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

const DotRail = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 78px;
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 64px;
  }
`;

const Dot = styled.span`
  cursor: pointer;
  width: ${({ $active }) => ($active ? '32px' : '10px')};
  height: 4px;
  padding: 2px 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $active, theme }) =>
    $active
      ? `color-mix(in srgb, ${theme.btn.secondaryHoverColor} 80%, transparent)`
      : `color-mix(in srgb, ${theme.btn.secondaryHoverColor} 30%, transparent)`};
  /*  theme.btn.secondaryHoverColor : theme.btn.secondaryHoverBg}; */
  box-shadow: ${({ $active, theme }) => ($active ? theme.tones.blue.activeShadow : 'none')};
  transition:
    width 240ms ease,
    background 240ms ease;
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

export default function HeroBannerSlide({ interval = 4000 }) {
  const { mode } = useTheme();
  const isMovingRef = useRef(false);
  const resetTimerRef = useRef(null);

  const slides = BANNER_IMAGES.map(({ id, dark, light, opacity }) => ({
    id,
    image: mode === 'dark' ? dark : light,
    opacity,
  }));
  const loopSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const [slideIndex, setSlideIndex] = useState(1);
  const [useMotion, setUseMotion] = useState(true);
  const activeIndex = (slideIndex - 1 + slides.length) % slides.length;

  const resetLoopSlide = (nextIndex) => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    setUseMotion(false);
    setSlideIndex(nextIndex);
    resetTimerRef.current = window.setTimeout(() => {
      setUseMotion(true);
      isMovingRef.current = false;
    }, 40);
  };

  const moveSlide = (direction) => {
    if (isMovingRef.current) return;
    isMovingRef.current = true;
    setUseMotion(true);
    setSlideIndex((current) => current + direction);
  };

  const goToSlide = (index) => {
    if (isMovingRef.current || index === activeIndex) return;
    isMovingRef.current = true;
    setUseMotion(true);
    setSlideIndex(index + 1);
  };

  const handleTransitionEnd = () => {
    if (slideIndex === 0) resetLoopSlide(slides.length);
    else if (slideIndex === slides.length + 1) resetLoopSlide(1);
    else isMovingRef.current = false;
  };

  useEffect(() => {
    const timerId = window.setTimeout(() => moveSlide(1), interval);
    return () => window.clearTimeout(timerId);
  }, [interval, slideIndex]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <BannerWrap aria-label="Hero banner slider">
      <SlideRow $index={slideIndex} $animate={useMotion} onTransitionEnd={handleTransitionEnd}>
        {loopSlides.map((slide, index) => (
          <SlideLayer
            key={`${slide.id}-${index}`}
            $image={slide.image}
            style={{ opacity: slide.opacity ?? 1 }}
          />
        ))}
      </SlideRow>
      <GlowLayer />
      <NavButton
        type="button"
        $side="left"
        onClick={() => moveSlide(-1)}
        aria-label="Previous slide"
      >
        <NavArrow $side="left" aria-hidden="true" />
      </NavButton>
      <NavButton type="button" $side="right" onClick={() => moveSlide(1)} aria-label="Next slide">
        <NavArrow $side="right" aria-hidden="true" />
      </NavButton>
      <DotRail>
        {slides.map((slide, index) => (
          <Dot
            key={slide.id}
            $active={index === activeIndex}
            onClick={() => goToSlide(index)}
            role="button"
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </DotRail>
    </BannerWrap>
  );
}
