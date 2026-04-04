import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../components/common/BaseBtn';
import BaseSection from '../../../components/common/BaseSection';
import BaseSparkIcon from '../../../components/common/BaseSparkIcon';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import {
  heroMedia,
  heroSection,
  heroStats,
  heroTags,
} from '../brandPageData';
import BrandImageSlot from './BrandImageSlot';
import { BrandSectionHeading } from './brandPageShared';

const HeroSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[10]};
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const HeroHeading = styled(BrandSectionHeading)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const HeroKicker = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.tones.blue.subtleColor};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const HeroLead = styled.p`
  margin: ${({ theme }) => theme.spacing[5]} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.9;
`;

const HeroTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const HeroTag = styled.div`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme, $accent }) => theme.tones[$accent].containerBorder};
  background: ${({ theme, $accent }) => theme.tones[$accent].containerBg};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.08em;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme, $accent }) => theme.tones[$accent].activeBorder};
    transform: translateY(-2px);
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 620px;
    margin-inline: auto;
  }
`;

const StatCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: start;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBgLight};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.tones.violet.activeBorder};
    box-shadow: 0 2px 16px rgba(124, 58, 237, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const StatLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: -1;
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
  }
`;

const SparkAnchor = styled.div`
  position: absolute;
  top: -16px;
  right: 8%;
  z-index: 2;
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


export default function BrandHeroSection() {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <HeroGrid>
        <HeroCopy>
          <HeroKicker>{heroSection.kicker}</HeroKicker>
          <HeroHeading {...heroSection.section} />
          <HeroLead>{heroSection.lead}</HeroLead>

          <HeroTagRow>
            {heroTags.map((tag, index) => (
              <HeroTag key={tag} $accent={index === 1 ? 'blue' : 'violet'}>
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
              <StatCard key={item.label}>
                <StatLabel>{item.label}</StatLabel>
                <StatValue>{item.value}</StatValue>
              </StatCard>
            ))}
          </StatGrid>
        </HeroCopy>

        <HeroVisual>
          <SparkAnchor>
            <BaseSparkIcon tone="violet" />
          </SparkAnchor>
          <FloatingStar className="hero-star-left" $animate={true}>&#10022;</FloatingStar>
          <FloatingStar className="hero-star-right" $animate={true}>&#10022;</FloatingStar>

          <BrandImageSlot
            label={heroMedia.label}
            hint={heroMedia.hint}
            ratio="4 / 5"
            accent={heroMedia.accent}
            media={heroMedia.media}
            objectPosition={heroMedia.objectPosition}
            eyebrow={heroMedia.eyebrow}
          />
        </HeroVisual>
      </HeroGrid>
    </HeroSection>
  );
}
