import styled from '@emotion/styled';
import React from 'react';
import BaseTooltip from '../../../components/common/BaseTooltip';
import useAuthStore from '../../../store/useAuthStore';
import { grade, toNextGrade } from '../../../utils/myPageMap';

const gradeToneMap = {
  MEMBER: {
    color: '#9ab2ff',
    lightColor: '#315efb',
    glow: 'rgba(96, 165, 250, 0.32)',
  },
  SILVER: {
    color: '#cdd6e7',
    lightColor: '#475569',
    glow: 'rgba(226, 232, 240, 0.28)',
  },
  GOLD: {
    color: '#ffd86b',
    lightColor: '#ca8a04',
    glow: 'rgba(251, 191, 36, 0.28)',
  },
  VIP: {
    color: '#d39bff',
    lightColor: '#9333ea',
    glow: 'rgba(192, 132, 252, 0.3)',
  },
};

export default function GradeProgress() {
  const user = useAuthStore((state) => state.user);
  const currentGrade = user?.grade || 'MEMBER';
  const gradeIndex = grade.indexOf(currentGrade);
  const nextGrade = grade[gradeIndex + 1] || currentGrade;
  const currentAmount = Number(user?.totalOrderPrice) || 0;
  const threshold = toNextGrade[gradeIndex] || 0;
  const safeProgress = threshold > 0 ? Math.min((currentAmount / threshold) * 100, 100) : 100;
  const isMaxGrade = gradeIndex === grade.length - 1;
  const tone = gradeToneMap[currentGrade] || gradeToneMap.MEMBER;
  const gradeGuide = grade.map((gradeName) => {
    const rowTone = gradeToneMap[gradeName] || gradeToneMap.MEMBER;
    const startAmount =
      gradeName === 'MEMBER'
        ? 0
        : gradeName === 'SILVER'
          ? toNextGrade[0] || 0
          : gradeName === 'GOLD'
            ? toNextGrade[1] || 0
            : toNextGrade[2] || 0;

    if (gradeName === 'MEMBER') {
      return {
        gradeName,
        label: '0 KRW - 99,999 KRW',
        progress: 0,
        color: rowTone.color,
        lightColor: rowTone.lightColor,
      };
    }

    return {
      gradeName,
      label:
        gradeName === 'VIP'
          ? `${startAmount.toLocaleString('ko-KR')}+ KRW`
          : `${startAmount.toLocaleString('ko-KR')} KRW`,
      progress: startAmount > 0 ? Math.min((currentAmount / startAmount) * 100, 100) : 0,
      color: rowTone.color,
      lightColor: rowTone.lightColor,
    };
  });

  return (
    <GradeProgressContainer>
      <GradeProgressWrap $glow={tone.glow}>
        <LeftSection>
          <TopRow>
            <Title>MEMBER PROGRESS</Title>
          </TopRow>

          <GradeLine>
            <GradeText $active>{currentGrade}</GradeText>
            {!isMaxGrade && (
              <>
                <GradeArrow />
                <GradeText>{nextGrade}</GradeText>
              </>
            )}
            <TooltipTrigger>
              <TooltipButton type="button" aria-label="등급 진행 정보 보기">
                ?
              </TooltipButton>
              <StyledTooltip className="grade-tooltip" position="bottom" offset="14px">
                <TooltipTitle>GRADE GUIDE</TooltipTitle>
                {gradeGuide.map((item) => (
                  <TooltipRow key={item.gradeName}>
                    <TooltipRowHead>
                      <TooltipGrade $color={item.color} $lightColor={item.lightColor}>
                        {item.gradeName}
                      </TooltipGrade>
                      <TooltipTarget>{item.label}</TooltipTarget>
                    </TooltipRowHead>
                    {item.gradeName !== 'MEMBER' && (
                      <>
                        <TooltipProgressTrack>
                          <TooltipProgressFill $progress={item.progress} $color={item.color} />
                        </TooltipProgressTrack>
                        <TooltipPercent>{Math.round(item.progress)}%</TooltipPercent>
                      </>
                    )}
                  </TooltipRow>
                ))}
              </StyledTooltip>
            </TooltipTrigger>
          </GradeLine>

          <ProgressMeta>
            <CurrentSpend>
              <strong>{currentAmount.toLocaleString('ko-KR')}</strong> KRW
            </CurrentSpend>
          </ProgressMeta>

          <ProgressBar aria-label="grade progress">
            <ProgressFill $progress={safeProgress} $color={tone.color} $glow={tone.glow} />
          </ProgressBar>

          <ToNextGradeText>
            {isMaxGrade
              ? '누적 주문 금액 기준으로 VIP 혜택을 계속 누릴 수 있어요.'
              : `${nextGrade} 등급 기준 ${threshold.toLocaleString('ko-KR')}원 중 ${currentAmount.toLocaleString('ko-KR')}원 달성`}
          </ToNextGradeText>
        </LeftSection>

        <RightSection>
          <AchievementLabel>ACHIEVEMENT</AchievementLabel>
          <AchievementRate $color={tone.color}>{Math.round(safeProgress)}%</AchievementRate>
          <AchievementCaption>
            {isMaxGrade ? 'MAX LEVEL' : `${nextGrade}까지 진행률`}
          </AchievementCaption>
        </RightSection>
      </GradeProgressWrap>
    </GradeProgressContainer>
  );
}

const GradeProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[20]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const GradeProgressWrap = styled.section`
  position: relative;
  overflow: visible;
  isolation: isolate;
  z-index: 10;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  padding: ${({ theme }) => theme.spacing[6]};
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(220px, 0.7fr);
  gap: ${({ theme }) => theme.spacing[5]};
  border: 1px solid transparent;
  border-radius: 28px;
  background: radial-gradient(
    circle at top right,
    ${({ theme, $glow }) => (theme.mode === 'light' ? 'rgba(124, 58, 237, 0.10)' : $glow)},
    transparent 26%
  );

  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 18px 44px rgba(124, 58, 237, 0.10)'
      : '0 18px 46px rgba(0, 0, 0, 0.28)'};
  backdrop-filter: ${({ theme }) => theme.effects.blurCard};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        circle at 12% 18%,
        ${({ theme }) =>
          theme.mode === 'light' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.05)'},
        transparent 16%
      ),
      linear-gradient(
        90deg,
        ${({ theme }) =>
          theme.mode === 'light' ? 'rgba(255, 255, 255, 0.26)' : 'rgba(255, 255, 255, 0.03)'},
        transparent 20%,
        transparent 80%,
        ${({ theme }) =>
          theme.mode === 'light' ? 'rgba(124, 58, 237, 0.04)' : 'rgba(255, 255, 255, 0.02)'}
      );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

const LeftSection = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GradeLine = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const GradeText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ theme, $active }) =>
    $active
      ? theme.mode === 'light'
        ? theme.colors.primary
        : theme.colors.text
      : theme.colors.textSecondary};
  text-shadow: ${({ theme, $active }) =>
    $active && theme.mode === 'light' ? '0 0 10px rgba(124, 58, 237, 0.12)' : 'none'};
`;

const GradeArrow = styled.span`
  position: relative;
  width: 24px;
  height: 1px;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? 'linear-gradient(90deg, rgba(124, 58, 237, 0.18), rgba(124, 58, 237, 0.72))'
      : 'linear-gradient(90deg, rgba(167, 139, 250, 0.22), rgba(167, 139, 250, 0.82))'};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1px;
    width: 7px;
    height: 7px;
    border-top: 1.5px solid
      ${({ theme }) =>
        theme.mode === 'light' ? 'rgba(124, 58, 237, 0.72)' : 'rgba(167, 139, 250, 0.82)'};
    border-right: 1.5px solid
      ${({ theme }) =>
        theme.mode === 'light' ? 'rgba(124, 58, 237, 0.72)' : 'rgba(167, 139, 250, 0.82)'};
    transform: translateY(-50%) rotate(45deg);
  }
`;

const TooltipTrigger = styled.span`
  position: relative;
  z-index: 40;
  display: inline-flex;
  align-items: center;

  &:hover .grade-tooltip,
  &:focus-within .grade-tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(calc(-50% + var(--tooltip-shift-x, 0px))) translateY(0) scale(1);
  }

  &:hover .grade-tooltip > *,
  &:focus-within .grade-tooltip > * {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TooltipButton = styled.button`
  width: 20px;
  height: 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(124, 58, 237, 0.08)' : 'rgba(124, 58, 237, 0.14)'};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 11px;
  line-height: 1;
  cursor: help;
  transition:
    border-color ${({ theme }) => theme.motion.normal},
    color ${({ theme }) => theme.motion.normal},
    background ${({ theme }) => theme.motion.normal};

  &:hover,
  &:focus-visible {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledTooltip = styled(BaseTooltip)`
  min-width: 260px;
  z-index: 999;
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(250, 248, 255, 0.98)' : 'rgba(10, 8, 26, 0.98)'};
  border-color: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(124, 58, 237, 0.18)' : 'rgba(167, 139, 250, 0.18)'};
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 18px 40px rgba(124, 58, 237, 0.12)'
      : '0 24px 52px rgba(0, 0, 0, 0.42)'};
  backdrop-filter: blur(24px);
`;

const TooltipTitle = styled.span`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TooltipRow = styled.span`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing[2]};

  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const TooltipRowHead = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  grid-column: 1 / -1;
`;

const TooltipGrade = styled.span`
  color: ${({ theme, $color, $lightColor }) => (theme.mode === 'light' ? $lightColor : $color)};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 0.14em;
`;

const TooltipTarget = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const TooltipProgressTrack = styled.span`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 160px;
  height: 6px;
  align-self: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255, 255, 255, 0.08)'};
`;

const TooltipProgressFill = styled.span`
  display: block;
  width: ${({ $progress }) => `${$progress}%`};
  min-width: ${({ $progress }) => ($progress > 0 ? '8px' : '0')};
  height: 100%;
  border-radius: inherit;
  background: ${({ $color }) => `linear-gradient(90deg, ${$color}, #22d3ee)`};
  opacity: 0.82;
`;

const TooltipPercent = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1;
`;

const ProgressMeta = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CurrentSpend = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.08em;

  strong {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(30px, 3vw, 44px);
    font-weight: 700;
    letter-spacing: -0.04em;
  }
`;

const ProgressBar = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(124, 58, 237, 0.10)' : 'rgba(255, 255, 255, 0.08)'};
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? 'inset 0 1px 2px rgba(124, 58, 237, 0.10)'
      : 'inset 0 1px 3px rgba(0, 0, 0, 0.35)'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      theme.mode === 'light'
        ? 'none'
        : 'linear-gradient(90deg, rgba(124, 58, 237, 0.12), rgba(59, 130, 246, 0.09) 55%, rgba(34, 211, 238, 0.06))'};
    pointer-events: none;
  }
`;

const ProgressFill = styled.div`
  position: relative;
  width: ${({ $progress }) => `${$progress}%`};
  min-width: ${({ $progress }) => ($progress > 0 ? '18px' : '0')};
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: ${({ theme, $color }) =>
    theme.mode === 'light'
      ? `linear-gradient(90deg, ${$color}, #22d3ee)`
      : `linear-gradient(90deg, ${$color} 0%, #7c5cff 24%, #3b82f6 62%, #22d3ee 100%)`};
  box-shadow: ${({ theme, $glow }) =>
    theme.mode === 'light'
      ? '0 0 14px rgba(59, 130, 246, 0.16)'
      : `0 0 8px rgba(124, 92, 255, 0.55), 0 0 18px rgba(59, 130, 246, 0.35), 0 0 28px rgba(34, 211, 238, 0.2), 0 0 18px ${$glow}`};
  mix-blend-mode: multiply;
  opacity: ${({ theme }) => (theme.mode === 'light' ? 0.7 : 0.78)};
  transition: width ${({ theme }) => theme.motion.slow};

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 10px;
    right: 10px;
    height: 3px;
    border-radius: inherit;
    background: ${({ theme }) =>
      theme.mode === 'light'
        ? 'none'
        : 'linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.06))'};
    filter: ${({ theme }) => (theme.mode === 'light' ? 'none' : 'blur(1px)')};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      theme.mode === 'light'
        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.32), transparent 65%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.16) 38%, transparent 72%)'};
  }
`;

const ToNextGradeText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: 1.6;
`;

const RightSection = styled.aside`
  position: relative;
  z-index: 0;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  text-align: center;
`;

const AchievementLabel = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.18em;
`;

const AchievementRate = styled.p`
  color: ${({ $color }) => $color};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
`;

const AchievementCaption = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.14em;
`;
