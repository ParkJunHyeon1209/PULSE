import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BaseBtn from '../../components/common/BaseBtn';
import { LavStarIcon } from '../../assets/icons/BtnIcon';
import HeroBannerSlide from './HeroBannerSlide';
import PulseLineSvg from './HeroPulseSvg';

const gradShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
`;

const LavStarEnd = styled(LavStarIcon)`
  margin-right: 0;
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const FullInner = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding-inline: ${({ theme }) => theme.grid.margin};
  display: flex;
  justify-content: center;
`;

const HeroSection = styled.section`
  position: relative;
  z-index: 1;
  pointer-events: none;

  flex: 1;
  max-width: 1280px;
  width: 100%;
`;
const HeroWrap = styled.section`
  pointer-events: auto;
  padding-top: ${({ theme }) => theme.spacing[14]};
  height: 90%;
  width: fit-content;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const HeroIntroLabel = styled.span`
  margin: ${({ theme }) => theme.spacing[6]} 0;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.mode === 'light' ? '#7c3aed' : 'rgba(167,139,250,.8)')};
  &::before {
    content: '';
    transform: translateX(-8px);
    width: 30px;
    height: 1px;
    background: linear-gradient(-90deg, #7c3aed, transparent);
  }
  &::after {
    transform: translateX(8px);
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, #7c3aed, transparent);
  }
`;

const HeroTitle = styled.h2`
  max-width: 8.9ch;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  line-height: 0.96;
  letter-spacing: 0.04em;
  color: white;
`;

const HeroTitleGrad = styled.span`
  background: linear-gradient(135deg, #c4b5fd, #818cf8, #60a5fa, #c4b5fd);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradShift} 4s ease-in-out infinite;
  font-family: ${({ theme }) => theme.fontFamily.hero};
`;

const HeroCopy = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[14]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 1.8;
`;

const HeroActions = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const HeroDec = styled(BaseBtn)`
  font-weight: 600;
  letter-spacing: 0.16em;
`;

const HeroButton = styled(BaseBtn)``;

const HeroStats = styled.div`
  display: flex;
  gap: 0;
  align-items: stretch;
  margin-top: ${({ theme }) => theme.spacing[14]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const HeroStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder || theme.colors.border};

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
    border-right: none;
  }
`;

const HeroStatValue = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: 36px;
  line-height: 1;
  background: linear-gradient(135deg, #c4b5fd, #818cf8, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.04em;
`;

const HeroStatLabel = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  white-space: nowrap;
  line-height: 1.5;

  span {
    display: block;
  }
`;

// const ScrollHint = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing[3]};
//   padding: ${({ theme }) => `${theme.spacing[5]} 0 14px`};
//   font-family: ${({ theme }) => theme.fontFamily.mono};
//   font-size: ${({ theme }) => theme.fontSize.xxxs};
//   letter-spacing: 0.2em;
//   color: ${({ theme }) =>
//     theme.mode === 'light' ? 'rgba(18,16,58,.3)' : theme.colors.textSecondary};
//   text-align: center;
// `;

// const ScrollIndicator = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   animation: scroll-drop 2s ease-in-out infinite;

//   @keyframes scroll-drop {
//     0%,
//     100% {
//       opacity: 0.35;
//       transform: translateY(0);
//     }
//     50% {
//       opacity: 1;
//       transform: translateY(4px);
//     }
//   }
// `;

// const ScrollLine = styled.div`
//   position: relative;
//   width: 1.5px;
//   height: 24px;
//   background: linear-gradient(
//     to bottom,
//     transparent,
//     ${({ theme }) => theme.tones.violet.subtleColor}
//   );

//   &::after {
//     content: '';
//     position: absolute;
//     bottom: -2px;
//     left: 50%;
//     width: 8px;
//     height: 8px;
//     border-right: 1.8px solid ${({ theme }) => theme.tones.violet.subtleColor};
//     border-bottom: 1.8px solid ${({ theme }) => theme.tones.violet.subtleColor};
//     transform: translateX(-50%) rotate(45deg);
//     border-top-right-radius: 2px;
//     border-bottom-left-radius: 2px;
//   }
// `;

const HERO_STATS = [
  { value: '05g', label: '신호의 종류' },
  { value: '1ms', label: '반응의 순간' },
  { value: 'RGB', label: '밫의 언어' },
];
export default function MainHero() {
  return (
    <FullInner>
      <HeroBannerSlide />
      <HeroSection>
        <HeroWrap>
          <HeroDec variant="secondary" spark={true} flex="0" icon={false}>
            <LavStarIcon className="btn-spark" aria-hidden="true">
              ✦
            </LavStarIcon>
            2026 S/S · GAMING GEAR PLATFORM
            <LavStarEnd className="btn-spark" aria-hidden="true">
              ✦
            </LavStarEnd>
          </HeroDec>
          <HeroIntroLabel>Energy · Signal · Glow</HeroIntroLabel>
          <HeroTitle>
            ENTER <HeroTitleGrad>THE PULSE</HeroTitleGrad>
          </HeroTitle>
          <HeroCopy>다크 네온 글라스 감성의 게이밍 기어 플랫폼.</HeroCopy>
          <HeroActions>
            <HeroButton>컬렉션 보기</HeroButton>
            <HeroButton variant="secondary">드롭 알림 신청</HeroButton>
          </HeroActions>
          <HeroStats>
            {HERO_STATS.map((stat) => (
              <HeroStat key={stat.value}>
                <HeroStatValue>{stat.value}</HeroStatValue>
                <HeroStatLabel>
                  <span>{stat.label}</span>
                </HeroStatLabel>
              </HeroStat>
            ))}
          </HeroStats>
          <PulseLineSvg />
        </HeroWrap>
        {/* <ScrollHint>
          <ScrollIndicator>
            <ScrollLine />
          </ScrollIndicator>
          SCROLL
        </ScrollHint> */}
      </HeroSection>
    </FullInner>
  );
}
