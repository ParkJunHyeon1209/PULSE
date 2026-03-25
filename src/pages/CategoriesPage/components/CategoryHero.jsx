import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';

const HeroSection = styled.section`
  width: 100vw;
  min-height: 700px;
  display: flex;

  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 600px;
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 500px;
    margin-bottom: 0;
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
    rgba(9, 6, 19, 0) 42%,
    rgba(9, 6, 19, 0.44) 100%
  );
`;

const SideFade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background} 2%,
    ${({ theme }) => theme.colors.background + '1d'} 18%,
    transparent 50%,
    ${({ theme }) => theme.colors.background + '1d'} 80%,
    ${({ theme }) => theme.colors.background} 98%
  );
`;

const HeroCenterContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  /* height: 420px; */
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

const HeroBlurBand = styled.div`
  width: 100%;
  min-height: 56px;
  padding: 30px 0;
  backdrop-filter: ${({ theme }) => theme.effects.blurMd};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.blurMd};

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 48px;
    width: min(92%, 100%);
  }
`;

// BaseSection 타이틀 라벨 순서 바꾸기
const HeroSectionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  /* BaseSection의 root div */
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* title(h2)를 위로 */
  & > div > h2 {
    order: 1;
    margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
    font-family: ${({ theme }) => theme.fontFamily.hero};
    font-size: ${({ theme }) => theme.fontSize.xxl};
    line-height: 0.95;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    text-shadow: 0 0 18px rgba(167, 139, 250, 0.16);
  }

  /* label(div)를 아래로 */
  & > div > div {
    order: 2;
    margin-bottom: 0;
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondary};
  }

  /* sub가 있으면 마지막 */
  & > div > p {
    order: 3;
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
      <SideFade />

      <HeroCenterContent>
        <HeroBlurBand>
          <HeroSectionHead>
            <BaseSection label={label} title={title} align="center" star titleFirst />
          </HeroSectionHead>
        </HeroBlurBand>
      </HeroCenterContent>
    </HeroSection>
  );
}
