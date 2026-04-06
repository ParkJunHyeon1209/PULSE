import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AppLogo from '../../../../components/common/AppLogo';
import BaseSection from '../../../../components/common/BaseSection';
import { identityBackdrop, identityColors, identitySection } from '../../brandPageData';
import { BrandSectionHeading, getSoftPanelBackground } from '../shared/brandPageShared';
import { getAccent } from '../../brandAccents';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[14]};
`;

const IdentitySurface = styled.div`
  position: relative;
  overflow: hidden;
  padding: clamp(24px, 4vw, 80px) clamp(24px, 4vw, 44px) clamp(24px, 4vw, 44px)
    clamp(24px, 4vw, 44px);
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
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.28 : 0.48)};
  filter: ${({ theme }) =>
    theme.mode === 'dark' ? 'brightness(0.82) saturate(1.05)' : 'brightness(1.06) saturate(1.04)'};
`;

const IdentityVeil = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? `linear-gradient(90deg,
          ${theme.colors.background}f0 0%,
          ${theme.colors.background}b0 45%,
          ${theme.colors.background}40 100%)`
      : `linear-gradient(90deg,
          ${theme.colors.background}d0 0%,
          ${theme.colors.background}70 45%,
          ${theme.colors.background}18 100%)`};
`;

const IdentityBeam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 160px;
  background: ${({ theme }) => getAccent(theme, 'violet').glow};
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
  padding-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const LogoStage = styled.div`
  width: fit-content;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid ${({ theme }) => getAccent(theme, 'violet').containerBorder};
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  box-shadow: ${({ theme }) => getAccent(theme, 'violet').containerShadow};
  transition:
    box-shadow ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal};
`;

const IdentityDescHeading = styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  line-height: 2.4;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const IdentityDesc = styled.p`
  margin: 0;
  max-width: 270px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const IdentityRight = styled.div`
  display: grid;
  /* gap: ${({ theme }) => theme.spacing[1]}; */
  height: 100%;
  align-content: end;
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
    ${({ theme, $tone }) => getAccent(theme, $tone === 'accent' ? 'violet' : $tone).containerBorder};
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme, $tone }) =>
      getAccent(theme, $tone === 'accent' ? 'violet' : $tone).activeBorder};
    box-shadow: ${({ theme, $tone }) =>
      getAccent(theme, $tone === 'accent' ? 'violet' : $tone).itemHoverShadow};
  }
`;

const PaletteSwatch = styled.div`
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $tone }) => {
    if ($tone === 'accent')
      return `linear-gradient(90deg, ${theme.colors.accentSoft}, ${theme.colors.accent})`;
    return getAccent(theme, $tone).activeLine;
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

export default function BrandIdentitySec() {
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
            <AppLogo linked={false} size="220px" />

            <IdentityDesc>
              <IdentityDescHeading>{identitySection.descHeading}</IdentityDescHeading>
              {identitySection.descBody}
            </IdentityDesc>
          </IdentityLeft>

          <IdentityRight>
            <BaseSection label={identitySection.title} />
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
