import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseBtn from '../../../components/common/BaseBtn';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import lightBannerImg from '../../../assets/img/banners/L_main-DorpBanner.webp';
import darkBannerImg from '../../../assets/img/banners/D_main-DorpBanner.webp';
import useThemeStore from '../../../store/useThemeStore';

const dotPulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(0.7); }
  50%       { opacity: .6; transform: scale(1.2); }
`;

const gradShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
`;

const SectionWrap = styled.section`
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const PromoCard = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.xxl};
  overflow: hidden;
  min-height: 380px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => (theme.mode === 'light' ? '#ece9ff' : theme.colors.surface)};
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.15);
  cursor: pointer;
  box-shadow:
    0 0 24px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.2),
    0 0 48px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
  transition:
    border-color ${({ theme }) => theme.motion.slow},
    box-shadow ${({ theme }) => theme.motion.slow};

  &:hover {
    box-shadow:
      0 0 36px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3),
      0 0 72px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
  }

  &:hover .banner-img {
    transform: scale(1.06);
  }
`;

const PromoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing[16]};
  flex: 1;
  max-width: 580px;
`;

const DropLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const LiveDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.status.rose};
  animation: ${dotPulse} 1.5s ease-in-out infinite;
`;

const DropTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: clamp(42px, 5vw, 63px);
  letter-spacing: 0.04em;
  line-height: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
`;

const DropTitleGrad = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradShift} 4s ease-in-out infinite;
`;

const DropDesc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  > span {
    letter-spacing: 0.2em;
    line-height: 3;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const DropMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const DropStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const DropStatVal = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  background: ${({ theme }) => theme.gradients.navActive};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DropStatLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DropBottom = styled.div`
  width: fit-content;
`;

const DropRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
`;

const DropTimer = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TimerStar = styled(LavStarIcon)`
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 0 0 6px rgba(${({ theme }) => theme.colors.accentRgb}, 0.7);
  margin-right: 0;
`;

const BannerImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  pointer-events: none;
  filter: ${({ theme }) => (theme.mode === 'light' ? 'brightness(1.2)' : 'none')};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.motion.slow};
`;

const stats = [
  { val: '100개', label: '한정 수량' },
  { val: 'D-12', label: '드롭까지' },
  { val: '599,000원', label: '출시가' },
];

export default function DropSec() {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const bannerImg = isDarkMode ? darkBannerImg : lightBannerImg;

  return (
    <SectionWrap>
      <BaseSection label="Limited Drop" />
      <PromoCard>
        <PromoText>
          <DropLabel>
            <LiveDot />
            Drop D-day · 2026.04.15
          </DropLabel>

          <DropTitle>
            PULSE <DropTitleGrad>× VIBE</DropTitleGrad>
          </DropTitle>

          <DropDesc>
            인디 아티스트 VIBE와 함께한 시그니처 콜라보 컨트롤러. <br />
            아트워크와 커스텀 마그네틱 트리거가 결합된 리미티드 에디션. <br />
            <span>✦ GLOBAL LIMITED 100 ✦</span>
          </DropDesc>

          <DropBottom>
            <DropMeta>
              {stats.map((s) => (
                <DropStat key={s.label}>
                  <DropStatLabel>
                    <LavStarIcon>✦</LavStarIcon>
                    {s.label}
                  </DropStatLabel>
                  <DropStatVal>{s.val}</DropStatVal>
                </DropStat>
              ))}
            </DropMeta>

            <DropRow>
              <BaseBtn variant="secondary">드롭 알림 신청</BaseBtn>
              <DropTimer>
                <TimerStar $animate={true}>✦</TimerStar>
                Apr 15 · 20:00 KST
              </DropTimer>
            </DropRow>
          </DropBottom>
        </PromoText>

        <BannerImg className="banner-img" src={bannerImg} alt="PULSE × VIBE" />
      </PromoCard>
    </SectionWrap>
  );
}
