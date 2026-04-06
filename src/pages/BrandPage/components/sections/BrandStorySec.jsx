import React from 'react';
import styled from '@emotion/styled';
import { keyframes, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import { LavStarIcon } from '../../../../assets/icons/BtnIcon';
import { heroMedia, heroSection, heroSlides, heroStats, heroTags } from '../../brandPageData';
import BrandImageSlot from '../shared/BrandImageSlot';
import { BrandSectionHeading } from '../shared/brandPageShared';
import { getAccent } from '../../brandAccents';

const STORY_TABLET_BREAKPOINT = '868px';

const SLIDE_DURATION = 10.5; 

const heroSlideKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: var(--hero-slide-opacity, 0.5);
  }
  29% {
    opacity: var(--hero-slide-opacity, 0.5);
  }
  37% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const HeroSlideWrap = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  --hero-slide-opacity: ${({ theme, $opacity }) => $opacity ?? (theme.mode === 'dark' ? 0.5 : 0.5)};
  pointer-events: none;
  z-index: 0;
  filter: ${({ $filter }) => $filter ?? 'none'};
  animation: ${heroSlideKeyframes} ${SLIDE_DURATION}s ease infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  @media (min-width: 869px) {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 62%,
      rgba(0, 0, 0, 0.92) 76%,
      rgba(0, 0, 0, 0.48) 90%,
      rgba(0, 0, 0, 0.2) 100%
    );
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 62%,
      rgba(0, 0, 0, 0.92) 76%,
      rgba(0, 0, 0, 0.48) 90%,
      rgba(0, 0, 0, 0.2) 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    display: none;
  }
`;

const HeroSlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position = 'center center' }) => $position};
  transform-origin: ${({ $position = 'center center' }) => $position};
  transform: scale(${({ $scale = 1 }) => $scale});
`;

const HeroSection = styled.section`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing[10]};
  margin-inline: calc(-1 * ${({ theme }) => theme.grid.margin});
  padding-inline: ${({ theme }) => theme.grid.margin};

  @media (min-width: 869px) {
    width: 100vw;
    margin-inline: calc(50% - 50vw);
    padding-inline: 0;
    min-height: calc(100vh - 100px);
    align-content: center;
  }
`;

const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: center;

  @media (min-width: 869px) {
    width: 100%;
    max-width: ${({ theme }) => theme.grid.max};
    margin-inline: auto;
    padding-inline: ${({ theme }) => theme.grid.margin};
  }

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    text-align: center;
  }
`;

const HeroHeading = styled(BrandSectionHeading)`
  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    text-align: center;
  }
`;

const HeroLead = styled.p`
  margin: ${({ theme }) => theme.spacing[6]} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  opacity: 0.8;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const HeroTagRow = styled.div`
  opacity: 0.8;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    justify-content: center;
  }
`;

const HeroTag = styled.div`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme, $accent }) => getAccent(theme, $accent).containerBorder};
  background: ${({ theme, $accent }) => getAccent(theme, $accent).containerBg};
  color: ${({ theme, $accent }) => getAccent(theme, $accent).activeColor};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme, $accent }) => getAccent(theme, $accent).activeBorder};
    transform: translateY(-2px);
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: min(100%, 362px);
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    margin-inline: auto;
    justify-content: center;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-weight: 600;

  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    max-width: 620px;
    margin-inline: auto;
  }
`;

const StatCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[4]};

  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme, $accent }) => getAccent(theme, $accent).containerBorder};
  background: ${({ theme }) => theme.colors.cardBgLight};
  opacity: 0.8;
  backdrop-filter: ${({ theme }) => theme.effects.blurDropdown};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    opacity ${({ theme }) => theme.motion.normal};

  &:hover {
    opacity: 1;
    transform: translateX(4px);
    border-color: ${({ theme, $accent }) => getAccent(theme, $accent).activeBorder};
    box-shadow: ${({ theme, $accent }) => getAccent(theme, $accent).itemHoverShadow};
  }

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[1]};
    justify-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const StatLabel = styled.p`
  margin: 0;
  color: ${({ theme, $accent }) => getAccent(theme, $accent).activeColor};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const StatValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: 1.6;
`;

const HeroVisual = styled.div`
  display: none;

  @media (max-width: ${STORY_TABLET_BREAKPOINT}) {
    position: relative;
    display: block;
    pointer-events: auto;
    max-width: 520px;
    margin: ${({ theme }) => `${theme.spacing[6]} auto 0`};
    width: 100%;
  }
`;

const SparkAnchor = styled.div`
  position: absolute;
  top: -16px;
  right: 8%;
  z-index: 2;
  opacity: 0.4;
  transform: scale(0.65);
  pointer-events: none;
`;

const FloatingStar = styled(LavStarIcon)`
  position: absolute;
  margin-right: 0;
  z-index: 2;
  pointer-events: none;
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.9 : 0.7)};

  &.hero-star-left {
    top: 8%;
    left: -12px;
    font-size: 12px;
  }

  &.hero-star-right {
    right: 6%;
    bottom: 22%;
    font-size: 10px;
  }
`;

export default function BrandStorySec() {
  const navigate = useNavigate();
  const theme = useTheme();
  const heroLeadLines = heroSection.lead.split(/<br\s*\/?>/i);

  return (
    <HeroSection>
      {heroSlides.map((slide, i) => (
        <HeroSlideWrap
          key={i}
          $delay={i * (SLIDE_DURATION / heroSlides.length)}
          $filter={theme.mode === 'dark' ? slide.darkFilter : slide.lightFilter}
          $opacity={theme.mode === 'dark' ? slide.darkOpacity : slide.lightOpacity}
        >
          <HeroSlideImg
            src={theme.mode === 'dark' ? slide.dark : slide.light}
            alt=""
            $position={slide.objectPosition}
            $scale={slide.imageScale}
          />
        </HeroSlideWrap>
      ))}
      <HeroGrid>
        <HeroCopy>
          
          <HeroHeading {...heroSection.section} />

          <HeroVisual>
            <SparkAnchor>
              <BaseSparkIcon tone="pink" />
            </SparkAnchor>
            <FloatingStar className="hero-star-left" $animate={true}>
              ✦
            </FloatingStar>
            <FloatingStar className="hero-star-right" $animate={true}>
              ✦
            </FloatingStar>

            <BrandImageSlot
              label={heroMedia.label}
              hint={heroMedia.hint}
              ratio="4 / 5"
              accent={heroMedia.accent}
              mediaSlides={heroSlides}
              objectPosition={heroMedia.objectPosition}
              eyebrow={heroMedia.eyebrow}
              lightImageFilter="brightness(1.2)"
              darkImageFilter="none"
              slideDuration={SLIDE_DURATION}
            />
          </HeroVisual>

          <HeroLead>
            {heroLeadLines.map((line, index) => (
              <React.Fragment key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </React.Fragment>
            ))}
          </HeroLead>

          <HeroTagRow>
            {heroTags.map((tag, index) => (
              <HeroTag key={tag} $accent={index === 1 ? 'violet' : 'pink'}>
                {tag}
              </HeroTag>
            ))}
          </HeroTagRow>

          <ActionRow>
            <BaseBtn onClick={() => navigate('/categories/drops')}>
              {heroSection.actions.primary}
            </BaseBtn>
            <BaseBtn variant="secondary" tone="blue" onClick={() => navigate('/categories')}>
              {heroSection.actions.secondary}
            </BaseBtn>
          </ActionRow>

          <StatGrid>
            {heroStats.map((item) => (
              <StatCard key={item.label} $accent={item.accent}>
                <StatLabel $accent={item.accent}>{item.label}</StatLabel>
                <StatValue>{item.value}</StatValue>
              </StatCard>
            ))}
          </StatGrid>
        </HeroCopy>
      </HeroGrid>
    </HeroSection>
  );
}
