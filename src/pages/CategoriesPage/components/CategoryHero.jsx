import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import CategoryTabs from './CategoryTabs';

const HeroSection = styled.section`
  width: 100vw;
  min-height: ${({ $hasTabs }) => ($hasTabs ? '700px' : '620px')};
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

const BottomFade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 180px;
  z-index: 3;
  pointer-events: none;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? `linear-gradient(
          180deg,
          rgba(9, 6, 19, 0) 0%,
          rgba(9, 6, 19, 0.16) 30%,
          rgba(9, 6, 19, 0.52) 40%,
          rgba(9, 6, 19, 0.82) 50%,
          rgba(9, 6, 19, 0.96) 72%,
          ${theme.colors.background} 100%
        )`
      : `linear-gradient(
          180deg,
          rgba(236, 233, 255, 0) 0%,
          rgba(236, 233, 255, 0.22) 30%,
          rgba(228, 224, 255, 0.58) 46%,
          rgba(216, 206, 255, 0.82) 68%,
          ${theme.colors.background} 100%
        )`};
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
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  //padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[6]};
  //padding-bottom: 130px;

  padding: ${({ theme, $hasTabs }) =>
    $hasTabs
      ? `${theme.spacing[10]} ${theme.spacing[6]} 130px`
      : `${theme.spacing[10]} ${theme.spacing[6]} ${theme.spacing[10]}`};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 360px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 280px;
    gap: ${({ theme }) => theme.spacing[3]};
    //padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
    //padding-bottom: 120px;
    padding: ${({ theme, $hasTabs }) =>
      $hasTabs
        ? `${theme.spacing[8]} ${theme.spacing[4]} 120px`
        : `${theme.spacing[8]} ${theme.spacing[4]} ${theme.spacing[8]}`};
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

const HeroTabsArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  padding: 0 ${({ theme }) => theme.grid.margin};

  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? `linear-gradient(
          180deg,
          rgba(10, 7, 20, 0.25) 0%,
          rgba(10, 7, 20, 0.5) 35%,
          rgba(10, 7, 20, 1) 100%
        )`
      : `linear-gradient(
          180deg,
          rgba(236, 233, 255, 0) 0%,
          rgba(236, 233, 255, 0.38) 18%,
          rgba(232, 227, 255, 0.82) 52%,
          rgba(236, 233, 255, 0.96) 100%
        )`};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[5]};
  }
`;

// BaseSection 타이틀 라벨 순서 바꾸기
const HeroSectionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  // BaseSection div
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  // title 위로 올리기
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

  // label 아래로 내리기
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

  // sub 제일 아래로
  & > div > p {
    order: 3;
  }
`;

export default function CategoryHero({
  title,
  label,
  backgroundImage,
  tabs,
  activeTab,
  onClickTab,
}) {
  const hasTabs = Array.isArray(tabs) && tabs.length > 0;

  return (
    <HeroSection>
      <HeroBackground
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        }}
      />

      <SideFade />
      {hasTabs && <BottomFade />}

      <HeroCenterContent $hasTabs={hasTabs}>
        <HeroBlurBand>
          <HeroSectionHead>
            <BaseSection label={label} title={title} align="center" star titleFirst />
          </HeroSectionHead>
        </HeroBlurBand>
      </HeroCenterContent>

      {hasTabs && (
        <HeroTabsArea>
          <CategoryTabs tabs={tabs} activeTab={activeTab} onClickTab={onClickTab} inHero />
        </HeroTabsArea>
      )}
    </HeroSection>
  );
}
