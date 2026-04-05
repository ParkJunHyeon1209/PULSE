import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AppLogo from '../../../components/common/AppLogo';
import BaseSection from '../../../components/common/BaseSection';
import {
  identityBackdrop,
  identityColors,
  identitySection,
} from '../brandPageData';
import { BrandSectionHeading, getSoftPanelBackground } from './brandPageShared';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const IdentitySurface = styled.div`
  position: relative;
  overflow: hidden;
  padding: clamp(24px, 4vw, 44px);
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid
    rgba(
      ${({ theme }) => (theme.mode === 'dark' ? '255,255,255' : '124,58,237')},
      ${({ theme }) => (theme.mode === 'dark' ? 0.08 : 0.14)}
    );
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  backdrop-filter: ${({ theme }) => theme.effects.blurMd};
`;

const IdentityBackdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 78% center;
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.28 : 0.22)};
  filter: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'brightness(0.82) saturate(1.05)'
      : 'brightness(1.06) saturate(1.04)'};
`;

const IdentityVeil = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background}f0 0%,
    ${({ theme }) => theme.colors.background}b0 45%,
    ${({ theme }) => theme.colors.background}40 100%
  );
`;

const IdentityBeam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 160px;
  background: ${({ theme }) => theme.cardGlow.violet};
  opacity: 0.6;
  pointer-events: none;
`;

const IdentityContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(24px, 4vw, 48px);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const IdentityLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const LogoStage = styled.div`
  width: fit-content;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid ${({ theme }) => theme.tones.violet.containerBorder};
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  box-shadow: ${({ theme }) => theme.tones.violet.containerShadow};
  transition:
    box-shadow ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal};

  &:hover {
    border-color: ${({ theme }) => theme.tones.violet.activeBorder};
    box-shadow: ${({ theme }) => theme.tones.violet.hoverShadow || theme.tones.violet.containerShadow};
  }
`;

const IdentityDesc = styled.p`
  margin: 0;
  max-width: 280px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.75;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const IdentityRight = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PaletteChip = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === 'blue' ? theme.tones.blue.containerBorder : theme.tones.violet.containerBorder};
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme, $tone }) =>
      $tone === 'blue' ? theme.tones.blue.activeBorder : theme.tones.violet.activeBorder};
    box-shadow: ${({ $tone }) =>
      $tone === 'blue'
        ? '0 4px 18px rgba(56, 189, 248, 0.18)'
        : '0 4px 18px rgba(124, 58, 237, 0.16)'};
  }
`;

const PaletteSwatch = styled.div`
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $tone }) => {
    if ($tone === 'blue') return theme.tones.blue.activeLine;
    if ($tone === 'accent')
      return `linear-gradient(90deg, ${theme.colors.accentSoft}, ${theme.colors.accent})`;
    return theme.tones.violet.activeLine;
  }};
`;

const PaletteName = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const PaletteRole = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1.6;
`;

export default function BrandIdentitySection() {
  const theme = useTheme();

  return (
    <SectionBlock>
      <BrandSectionHeading {...identitySection.section} />

      <IdentitySurface>
        <IdentityBackdrop
          src={theme.mode === 'dark' ? identityBackdrop.dark : identityBackdrop.light}
          alt="브랜드 시그널"
        />
        <IdentityVeil />
        <IdentityBeam />

        <IdentityContent>
          <IdentityLeft>
            <LogoStage>
              <AppLogo linked={false} size="160px" />
            </LogoStage>
            <IdentityDesc>{identitySection.description}</IdentityDesc>
          </IdentityLeft>

          <IdentityRight>
            <BaseSection
              label={identitySection.title}
            />
            <PaletteGrid>
              {identityColors.map((item) => (
                <PaletteChip key={item.name} $tone={item.tone}>
                  <PaletteSwatch $tone={item.tone} />
                  <PaletteName>{item.name}</PaletteName>
                  <PaletteRole>{item.role}</PaletteRole>
                </PaletteChip>
              ))}
            </PaletteGrid>
          </IdentityRight>
        </IdentityContent>
      </IdentitySurface>
    </SectionBlock>
  );
}
