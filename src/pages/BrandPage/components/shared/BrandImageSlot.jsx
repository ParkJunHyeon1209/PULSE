import React, { useId } from 'react';
import { keyframes, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import { LavStarIcon } from '../../../../assets/icons/BtnIcon';
import BrandSlotCaption from './BrandSlotCaption';
import { getAccent } from '../../brandAccents';

const getAssetSource = (theme, media) => (theme.mode === 'dark' ? media.dark : media.light);

const HOVER_DURATION = '0.52s';
const HOVER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DEFAULT_DARK_FILTER = 'brightness(0.88) saturate(1.04)';
const DEFAULT_LIGHT_FILTER = 'brightness(1.03) saturate(1.02)';
const DEFAULT_SLIDE_DURATION = 10.5;

const slotMediaSlideKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: var(--slot-slide-opacity, 1);
  }
  29% {
    opacity: var(--slot-slide-opacity, 1);
  }
  37% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const slotMediaSlideFirstKeyframes = keyframes`
  0% {
    opacity: var(--slot-slide-opacity, 1);
  }
  29% {
    opacity: var(--slot-slide-opacity, 1);
  }
  37% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const VisualCard = styled.article`
  position: relative;
  overflow: hidden;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: clamp(20px, 2.4vw, 30px);
  border: 1px solid ${({ theme, $accent }) => getAccent(theme, $accent).containerBorder};
  background: ${({ theme }) => theme.colors.cardBgLight};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.07 : 0.7)}),
    ${({ theme, $accent }) => getAccent(theme, $accent).containerShadow};
  transition:
    transform ${HOVER_DURATION} ${HOVER_EASE},
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  /* 글래스 시머 레이어 */
  &::before {
    content: '';
    position: absolute;
    top: -60%;
    left: -80%;
    width: 45%;
    height: 220%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.07 : 0.22)}) 50%,
      transparent 100%
    );
    transform: skewX(-18deg) translateX(0%);
    transition: transform 0.7s ${HOVER_EASE};
    z-index: 4;
    pointer-events: none;
  }
  &:hover::before {
    transform: skewX(-18deg) translateX(460%);
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    border-color: ${({ theme, $accent }) => getAccent(theme, $accent).activeBorder};
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.1 : 0.88)}),
      ${({ theme, $accent }) => getAccent(theme, $accent).hoverShadow};
  }

  &:hover .slot-img {
    transform: scale(1.1);
  }

  &:hover .slot-spark {
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 1 : 0.72)};
    transform: translate(-50%, -50%) scale(1.57);
  }

  &:hover .slot-glow {
    opacity: 0.95;
  }
`;

const VisualSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

const VisualImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position};
  transform-origin: ${({ $origin, $position = 'center center' }) => $origin ?? $position};
  filter: ${({ theme, $lightImageFilter, $darkImageFilter }) =>
    theme.mode === 'dark'
      ? ($darkImageFilter ?? DEFAULT_DARK_FILTER)
      : ($lightImageFilter ?? DEFAULT_LIGHT_FILTER)};
  mix-blend-mode: ${({ theme, $lightImageBlendMode }) =>
    theme.mode === 'dark' ? 'normal' : ($lightImageBlendMode ?? 'normal')};

  transform: scale(${({ $scale = 1.02 }) => $scale});
  transition: transform ${HOVER_DURATION} ${HOVER_EASE};
`;

const MediaSlideLayer = styled.div`
  position: absolute;
  inset: 0;
  --slot-slide-opacity: ${({ $opacity = 1 }) => $opacity};
  opacity: ${({ $isFirst, $opacity = 1 }) => ($isFirst ? $opacity : 0)};
  animation: ${({ $isFirst }) =>
      $isFirst ? slotMediaSlideFirstKeyframes : slotMediaSlideKeyframes}
    ${({ $duration = DEFAULT_SLIDE_DURATION }) => $duration}s ease infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;

const defaultLightShade = `linear-gradient(
  180deg,
  rgba(164, 148, 255, 0.2) 0%,
  transparent 48%,
  rgba(87, 76, 154, 0.22) 78%,
  rgba(116, 96, 143, 0.6) 100%
)`;

const lightDimmedGradient = {
  violet: defaultLightShade,
  blue: defaultLightShade,
  pink: defaultLightShade,
};

const VisualShade = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme, $lightDimmed, $accent }) =>
    theme.mode === 'dark'
      ? `
        linear-gradient(
          180deg,
          rgba(8, 6, 20, 0.04) 0%,
          rgba(8, 6, 20, 0.02) 30%,
          rgba(8, 6, 20, 0.62) 78%,
          rgba(13, 6, 20, 0.78) 100%
        ),
        linear-gradient(90deg, rgba(8, 6, 20, 0.1) 0%, transparent 50%)
      `
      : $lightDimmed
        ? (lightDimmedGradient[$accent] ?? lightDimmedGradient.violet)
        : defaultLightShade};
`;

const VisualGlow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 70%;
  height: 48%;
  border-radius: 50% 50% 0 0;
  transform: translateX(-50%);
  background: ${({ theme, $accent }) => getAccent(theme, $accent).glow};
  opacity: 0.62;
  transition: opacity ${HOVER_DURATION} ${HOVER_EASE};
  pointer-events: none;
  mix-blend-mode: ${({ theme }) => (theme.mode === 'dark' ? 'screen' : 'overlay')};
`;

const VisualBeam = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 0;
  height: 1px;
  background: ${({ theme, $accent }) => getAccent(theme, $accent).activeLine};
  opacity: 0.9;
`;

const CenterSpark = styled.div`
  position: absolute;
  left: 50%;
  top: 42%;
  z-index: 2;
  transform: translate(-50%, -50%) scale(1.15);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.6 : 0.38)};
  transition:
    opacity ${HOVER_DURATION} ${HOVER_EASE},
    transform ${HOVER_DURATION} ${HOVER_EASE};
  pointer-events: none;
`;

const SlotStar = styled(LavStarIcon)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 2;
  margin-right: 0;
  font-size: 10px;
  opacity: 0.7;
`;

export default function BrandImageSlot({
  label,
  hint,
  ratio = '4 / 3',
  accent = 'violet',
  media,
  mediaSlides,
  objectPosition = 'center center',
  eyebrow = 'DROP ASSET',
  sparkTone,
  lightDimmed = false,
  imageScale = 1.02,
  slideDuration = DEFAULT_SLIDE_DURATION,
  lightImageFilter,
  darkImageFilter,
  lightImageBlendMode,
  lightText = false,
  lightCaptionShadow = false,
  lightColor,
}) {
  const theme = useTheme();
  const safeId = useId().replace(/:/g, '');
  const tone = getAccent(theme, accent);
  const gradientId = `brand-slot-gradient-${safeId}`;
  const glowId = `brand-slot-glow-${safeId}`;
  const plateFill = theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(124,58,237,0.05)';
  const baseFill = theme.mode === 'dark' ? '#0b071b' : '#fbf8ff';
  const gridStroke = theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.14)';
  const lineAccent = accent === 'blue' ? theme.colors.primary : theme.colors.accent;
  const resolvedTone = sparkTone || (accent === 'blue' ? 'blue' : 'violet');
  const resolvedMediaSlides = Array.isArray(mediaSlides) ? mediaSlides.filter(Boolean) : [];

  if (media || resolvedMediaSlides.length > 0) {
    return (
      <VisualCard $ratio={ratio} $accent={accent}>
        {resolvedMediaSlides.length > 0 ? (
          resolvedMediaSlides.map((slide, index) => (
            <MediaSlideLayer
              key={`${slide.dark}-${slide.light}-${index}`}
              $delay={index * (slideDuration / resolvedMediaSlides.length)}
              $duration={slideDuration}
              $isFirst={index === 0}
              $opacity={
                theme.mode === 'dark' ? (slide.darkOpacity ?? 1) : (slide.lightOpacity ?? 1)
              }
            >
              <VisualImg
                className="slot-img"
                src={getAssetSource(theme, slide)}
                alt={index === 0 ? label : ''}
                $position={slide.mobileObjectPosition ?? slide.objectPosition ?? objectPosition}
                $origin={slide.mobileObjectPosition ?? slide.objectPosition ?? objectPosition}
                $scale={slide.mobileImageScale ?? slide.imageScale ?? imageScale}
                $lightImageFilter={slide.lightFilter}
                $darkImageFilter={slide.darkFilter}
                $lightImageBlendMode={slide.lightBlendMode ?? lightImageBlendMode}
              />
            </MediaSlideLayer>
          ))
        ) : (
          <VisualImg
            className="slot-img"
            src={getAssetSource(theme, media)}
            alt={label}
            $position={objectPosition}
            $origin={objectPosition}
            $scale={imageScale}
            $lightImageFilter={lightImageFilter}
            $darkImageFilter={darkImageFilter}
            $lightImageBlendMode={lightImageBlendMode}
          />
        )}
        <VisualShade $lightDimmed={lightDimmed} $accent={accent} />
        <VisualGlow className="slot-glow" $accent={accent} />
        <CenterSpark className="slot-spark">
          <BaseSparkIcon tone={resolvedTone} />
        </CenterSpark>
        <SlotStar>✦</SlotStar>
        <VisualBeam $accent={accent} />
        <BrandSlotCaption
          eyebrow={eyebrow}
          label={label}
          hint={hint}
          lightText={lightText}
          lightCaptionShadow={lightCaptionShadow}
          lightColor={lightColor}
        />
      </VisualCard>
    );
  }

  return (
    <VisualCard $ratio={ratio} $accent={accent}>
      <VisualSvg viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tone.activeColor} stopOpacity="0.98" />
            <stop offset="55%" stopColor={lineAccent} stopOpacity="0.72" />
            <stop
              offset="100%"
              stopColor="#ffffff"
              stopOpacity={theme.mode === 'dark' ? '0.12' : '0.2'}
            />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"
            />
          </filter>
        </defs>

        <rect x="0" y="0" width="800" height="600" fill={baseFill} />
        <rect x="30" y="30" width="740" height="540" rx="28" fill={plateFill} />
        <circle
          cx="648"
          cy="158"
          r="128"
          fill={`url(#${gradientId})`}
          fillOpacity="0.12"
          filter={`url(#${glowId})`}
        />
        <circle cx="232" cy="152" r="76" fill={`url(#${gradientId})`} fillOpacity="0.1" />
        <path
          d="M0 462 C118 392 246 340 392 352 C548 366 650 448 800 426 L800 600 L0 600 Z"
          fill={`url(#${gradientId})`}
          fillOpacity="0.86"
        />
        <g stroke={gridStroke} strokeWidth="1">
          <path d="M78 84 H722" />
          <path d="M78 516 H722" />
          <path d="M136 84 V516" />
          <path d="M664 84 V516" />
          <path d="M78 198 H722" strokeDasharray="7 10" />
          <path d="M78 402 H722" strokeDasharray="7 10" />
        </g>
        <g
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M148 360 L286 240 L390 306 L546 166 L678 248" />
          <path d="M120 434 L248 326 L372 370 L520 294 L682 346" opacity="0.58" />
        </g>
        <g stroke={tone.activeColor} strokeWidth="2" fill="none" opacity="0.92">
          <rect x="112" y="118" width="186" height="126" rx="18" />
          <rect x="486" y="314" width="182" height="112" rx="18" />
        </g>
      </VisualSvg>

      <VisualGlow className="slot-glow" $accent={accent} />
      <CenterSpark className="slot-spark">
        <BaseSparkIcon tone={resolvedTone} />
      </CenterSpark>
      <VisualBeam $accent={accent} />
      <BrandSlotCaption
        eyebrow={eyebrow}
        label={label}
        hint={hint}
        lightText={lightText}
        lightCaptionShadow={lightCaptionShadow}
        lightColor={lightColor}
      />
    </VisualCard>
  );
}
