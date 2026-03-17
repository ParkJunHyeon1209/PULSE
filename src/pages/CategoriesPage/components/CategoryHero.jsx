import styled from '@emotion/styled';

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 420px;
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 24px 64px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 360px;
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 280px;
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(9, 6, 19, 0.08) 0%,
    rgba(9, 6, 19, 0.24) 42%,
    rgba(9, 6, 19, 0.44) 100%
  );
`;

const HeroCenterContent = styled.div`
  position: relative;
  z-index: 1;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[6]};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 360px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 280px;
    gap: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  }
`;

const CategoryTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  line-height: 0.95;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  text-shadow: 0 0 18px rgba(167, 139, 250, 0.16);
`;

const HeroBlurBand = styled.div`
  width: min(720px, 100%);
  min-height: 56px;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: ${({ theme }) => theme.effects.blurMd};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.blurMd};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 20px rgba(124, 58, 237, 0.08);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 48px;
    width: min(92%, 100%);
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

const CategoryLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    letter-spacing: 0.14em;
  }
`;

export default function CategoryHero({ title, label, backgroundImage }) {
  return (
    <HeroSection>
      <HeroBackground
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        }}
      />
      <HeroOverlay />

      <HeroCenterContent>
        <CategoryTitle>{title}</CategoryTitle>

        <HeroBlurBand>
          <CategoryLabel>{label}</CategoryLabel>
        </HeroBlurBand>
      </HeroCenterContent>
    </HeroSection>
  );
}
