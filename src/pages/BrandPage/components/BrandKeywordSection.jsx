import React from 'react';
import styled from '@emotion/styled';
import BaseSparkIcon from '../../../components/common/BaseSparkIcon';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import { keywordSection, pillars } from '../brandPageData';
import { BrandSectionHeading } from './brandPageShared';

const ToneBand = styled.section`
  position: relative;
  padding-top: ${({ theme }) => theme.spacing[3]};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: max(16%, 88px);
    top: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.Headline};
    opacity: 0.9;
  }
`;

const ToneBandInner = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.article`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid
    ${({ theme, $accent }) =>
      theme.mode === 'dark'
        ? theme.tones[$accent].containerBorder
        : $accent === 'blue'
          ? 'rgba(56, 189, 248, 0.34)'
          : 'rgba(124, 58, 237, 0.28)'};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.012)),
    ${({ theme }) => theme.colors.cardBgLight};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.05 : 0.84)}),
    ${({ theme, $accent }) =>
      theme.mode === 'dark'
        ? theme.tones[$accent].containerShadow
        : $accent === 'blue'
          ? '0 4px 24px rgba(56, 189, 248, 0.16), 0 1px 6px rgba(56, 189, 248, 0.1)'
          : '0 4px 24px rgba(124, 58, 237, 0.14), 0 1px 6px rgba(124, 58, 237, 0.09)'};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme, $accent }) =>
      theme.mode === 'dark'
        ? theme.tones[$accent].activeBorder
        : $accent === 'blue'
          ? 'rgba(56, 189, 248, 0.55)'
          : 'rgba(124, 58, 237, 0.46)'};
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.09 : 0.9)}),
      ${({ theme, $accent }) =>
        theme.mode === 'dark'
          ? theme.tones[$accent].hoverShadow || theme.tones[$accent].containerShadow
          : $accent === 'blue'
            ? '0 8px 32px rgba(56, 189, 248, 0.24), 0 2px 8px rgba(56, 189, 248, 0.14)'
            : '0 8px 32px rgba(124, 58, 237, 0.22), 0 2px 8px rgba(124, 58, 237, 0.13)'};
  }
`;

const PillarBeam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%;
  background: ${({ theme, $accent }) => theme.cardGlow[$accent] || theme.cardGlow.violet};
  opacity: 0.5;
  pointer-events: none;
`;

const PillarSparkWrap = styled.div`
  position: absolute;
  top: -8px;
  right: 16px;
  transform: scale(0.6);
  opacity: 0.7;
  pointer-events: none;
`;

const PillarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const PillarIndex = styled.span`
  color: ${({ theme, $accent }) => theme.tones[$accent].subtleColor};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.18em;
`;

const PillarKeyword = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 500;
  letter-spacing: 0.1em;
`;

const PillarDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.85;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

export default function BrandKeywordSection() {
  return (
    <ToneBand>
      <ToneBandInner>
        <BrandSectionHeading {...keywordSection.section} />

        <PillarGrid>
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} $accent={pillar.accent}>
              <PillarBeam $accent={pillar.accent} />
              <PillarSparkWrap>
                <BaseSparkIcon tone={pillar.accent === 'blue' ? 'blue' : 'violet'} />
              </PillarSparkWrap>
              <PillarTop>
                <PillarIndex $accent={pillar.accent}>0{index + 1}</PillarIndex>
                <LavStarIcon $animate={true}>&#10022;</LavStarIcon>
              </PillarTop>
              <PillarKeyword>{pillar.title}</PillarKeyword>
              <PillarDesc>{pillar.description}</PillarDesc>
            </PillarCard>
          ))}
        </PillarGrid>
      </ToneBandInner>
    </ToneBand>
  );
}
