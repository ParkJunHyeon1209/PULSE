import styled from '@emotion/styled';
import React from 'react';
import BaseTooltip from '../../../../components/common/BaseTooltip';
import BaseBtn from '../../../../components/common/BaseBtn';
import useAuthStore from '../../../../store/useAuthStore';
import { grade, toNextGrade, gradeToneMap } from '../../../../utils/myPageMap';

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
        progress: 100,
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
      <GradeProgressWrap $glow={tone.glow} $color={tone.color} $lightColor={tone.lightColor}>
        <LeftSection>
          <TopRow>
            <Title>MEMBER PROGRESS</Title>
          </TopRow>

          <GradeLine>
            <GradeText $active $color={tone.color} $lightColor={tone.lightColor}>
              {currentGrade}
            </GradeText>
            {!isMaxGrade && (
              <>
                <GradeArrow $color={tone.color} $lightColor={tone.lightColor} />
                <GradeText
                  $color={(gradeToneMap[nextGrade] || gradeToneMap.MEMBER).color}
                  $lightColor={(gradeToneMap[nextGrade] || gradeToneMap.MEMBER).lightColor}
                >
                  {nextGrade}
                </GradeText>
              </>
            )}
            <TooltipTrigger>
              <TooltipBtn
                variant="ic-btn"
                size="16px"
                padding="4px"
                aria-label="등급 진행 정보 보기"
              >
                ?
              </TooltipBtn>
              <StyledTooltip
                className="grade-tooltip"
                position="bottom"
                offset="14px"
                $color={tone.color}
                $lightColor={tone.lightColor}
                mobileShift="60px"
              >
                <TooltipTitle>GRADE GUIDE</TooltipTitle>
                {gradeGuide.map((item) => (
                  <TooltipRow key={item.gradeName}>
                    <TooltipRowHead>
                      <TooltipGrade $color={item.color} $lightColor={item.lightColor}>
                        {item.gradeName}
                      </TooltipGrade>
                      <TooltipTarget>{item.label}</TooltipTarget>
                    </TooltipRowHead>
                    <TooltipProgressTrack $lightColor={item.lightColor}>
                      <TooltipProgressFill
                        $progress={item.progress}
                        $color={item.color}
                        $lightColor={item.lightColor}
                      />
                    </TooltipProgressTrack>
                    <TooltipPercent>{Math.round(item.progress)}%</TooltipPercent>
                  </TooltipRow>
                ))}
              </StyledTooltip>
            </TooltipTrigger>
          </GradeLine>

          <ProgressMeta>
            <CurrentSpend $color={tone.color} $lightColor={tone.lightColor}>
              <strong>{currentAmount.toLocaleString('ko-KR')}</strong> KRW
            </CurrentSpend>
          </ProgressMeta>

          <ProgressBar
            $color={tone.color}
            $lightColor={tone.lightColor}
            aria-label="grade progress"
          >
            <ProgressFill
              $progress={safeProgress}
              $color={tone.color}
              $lightColor={tone.lightColor}
              $glow={tone.glow}
              $isGold={currentGrade === 'GOLD'}
            />
          </ProgressBar>

          <ToNextGradeText>
            {isMaxGrade
              ? '누적 주문 금액 기준으로 VIP 혜택을 계속 누릴 수 있어요.'
              : `${nextGrade} 등급 기준 ${threshold.toLocaleString('ko-KR')}원 중 ${currentAmount.toLocaleString('ko-KR')}원 달성`}
          </ToNextGradeText>
        </LeftSection>

        <RightSection>
          <AchievementLabel>ACHIEVEMENT</AchievementLabel>
          <AchievementRate $color={tone.color} $lightColor={tone.lightColor}>
            {Math.round(safeProgress)}%
          </AchievementRate>
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
  padding-inline: ${({ theme }) => theme.grid.margin};
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
    ${({ theme, $glow, $lightColor }) => (theme.mode === 'light' ? `${$lightColor}38` : $glow)},
    transparent 45%
  );

  box-shadow: ${({ theme, $lightColor, $color }) =>
    theme.mode === 'light'
      ? `0 1px 34px ${$lightColor}22`
      : `0 1px 36px rgba(0, 0, 0, 0.28), 0 0 38px ${$color}22`};
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
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.16em;
  font-weight: 600;
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
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ theme, $color, $lightColor }) =>
    theme.mode === 'light' ? $lightColor || theme.colors.primary : $color || theme.colors.text};
  text-shadow: ${({ theme, $active, $lightColor }) =>
    $active && theme.mode === 'light' ? `0 0 10px ${$lightColor}1f` : 'none'};
  letter-spacing: 0.08em;
`;

const GradeArrow = styled.span`
  position: relative;
  width: 24px;
  height: 1px;
  background: ${({ theme, $lightColor, $color }) =>
    theme.mode === 'light'
      ? `linear-gradient(90deg, ${$lightColor}2e, ${$lightColor}b8)`
      : `linear-gradient(90deg, ${$color}38, ${$color}d0)`};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1px;
    width: 7px;
    height: 7px;
    border-top: 1.5px solid
      ${({ theme, $lightColor, $color }) =>
        theme.mode === 'light' ? `${$lightColor}b8` : `${$color}d0`};
    border-right: 1.5px solid
      ${({ theme, $lightColor, $color }) =>
        theme.mode === 'light' ? `${$lightColor}b8` : `${$color}d0`};
    transform: translateY(-50%) rotate(45deg);
  }
`;

const TooltipTrigger = styled.span`
  position: relative;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  transform: translateY(-1px);

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

const TooltipBtn = styled(BaseBtn)`
  cursor: help;
`;

const StyledTooltip = styled(BaseTooltip)`
  min-width: 260px;
  z-index: 999;
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(250, 248, 255, 0.98)' : 'rgba(10, 8, 26, 0.98)'};
  border-color: ${({ theme, $lightColor, $color }) =>
    theme.mode === 'light' ? `${$lightColor}2e` : `${$color}2e`};
  box-shadow: ${({ theme, $lightColor }) =>
    theme.mode === 'light' ? `0 18px 40px ${$lightColor}1f` : '0 24px 52px rgba(0, 0, 0, 0.42)'};
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme, $color, $lightColor }) => (theme.mode === 'light' ? $lightColor : $color)};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 0.14em;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }
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
  background: ${({ theme, $lightColor }) =>
    theme.mode === 'light' ? `${$lightColor}1a` : 'rgba(255, 255, 255, 0.08)'};
`;

const TooltipProgressFill = styled.span`
  display: block;
  width: ${({ $progress }) => `${$progress}%`};
  min-width: ${({ $progress }) => ($progress > 0 ? '8px' : '0')};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme, $color, $lightColor }) => {
    const c = theme.mode === 'light' ? $lightColor : $color;
    return `linear-gradient(90deg, ${c} 0%, ${c}cc 55%, ${c}77 100%)`;
  }};
  opacity: 0.88;
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
  font-weight: 600;
  letter-spacing: 0.04em;

  strong {
    margin-right: 8px;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    letter-spacing: -0.04em;
    background: ${({ theme, $color, $lightColor }) => {
      const accent = theme.mode === 'light' ? $lightColor : $color;
      return `linear-gradient(135deg, ${theme.colors.text} 0%, ${accent} 100%)`;
    }};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ProgressBar = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $lightColor }) =>
    theme.mode === 'light' ? `${$lightColor}1a` : 'rgba(255, 255, 255, 0.08)'};
  box-shadow: ${({ theme, $lightColor }) =>
    theme.mode === 'light'
      ? `inset 0 1px 2px ${$lightColor}1a`
      : 'inset 0 1px 3px rgba(0, 0, 0, 0.35)'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme, $color }) =>
      theme.mode === 'light'
        ? 'none'
        : `linear-gradient(90deg, ${$color}1f, ${$color}12 55%, ${$color}08)`};
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
  background: ${({ theme, $color, $lightColor, $isGold }) => {
    if (theme.mode === 'light') {
      return `linear-gradient(90deg, ${$lightColor}66 0%, ${$lightColor}cc 45%, ${$lightColor} 100%)`;
    }
    if ($isGold) {
      return `linear-gradient(90deg, ${$lightColor}66 0%, ${$color} 45%, ${$lightColor} 100%)`;
    }
    return `linear-gradient(90deg, ${$color}66 0%, ${$color}cc 45%, ${$lightColor} 100%)`;
  }};
  box-shadow: ${({ theme, $glow }) =>
    theme.mode === 'light' ? `0 0 14px ${$glow}` : `0 0 12px ${$glow}, 0 0 28px ${$glow}`};
  mix-blend-mode: ${({ theme, $isGold }) =>
    theme.mode === 'dark' && $isGold ? 'normal' : 'multiply'};
  opacity: ${({ theme, $isGold }) => (theme.mode === 'light' ? 0.7 : $isGold ? 0.92 : 0.78)};
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
  letter-spacing: 0.14em;
`;

const AchievementRate = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  background: ${({ theme, $color, $lightColor }) => {
    const accent = theme.mode === 'light' ? $lightColor : $color;
    return `linear-gradient(135deg, ${theme.colors.text} 0%, ${accent} 100%)`;
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AchievementCaption = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  letter-spacing: 0.04em;
`;
