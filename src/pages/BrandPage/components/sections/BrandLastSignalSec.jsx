import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import BaseBtn from '../../../../components/common/BaseBtn';
import BaseSection from '../../../../components/common/BaseSection';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import { LavStarIcon } from '../../../../assets/icons/BtnIcon';
import { closingSection, closingBackdrop } from '../../brandPageData';
import { BrandSectionHeading } from '../shared/brandPageShared';
import { getAccent } from '../../brandAccents';

const SectionBlock = styled.section`
  position: relative;
`;

const ClosingMiniLabel = styled(BaseSection)`
  margin-bottom: ${({ theme }) => theme.spacing[5]};

  > div {
    text-shadow: ${({ theme }) =>
      theme.mode === 'dark' ? '0 0 10px rgba(4, 2, 12, 0.72)' : '0 0 10px rgba(22, 14, 52, 0.28)'};
  }
`;

const ClosingCard = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
  gap: clamp(24px, 4vw, 56px);
  align-items: end;
  padding: clamp(32px, 5vw, 56px);
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid ${({ theme }) => getAccent(theme, 'violet').containerBorder};
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.09) 0%, rgba(56, 189, 248, 0.07) 100%),
    ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(12, 8, 32, 0.72)' : 'rgba(252, 250, 255, 0.82)'};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.06 : 0.84)}),
    ${({ theme }) => getAccent(theme, 'violet').containerShadow};
  backdrop-filter: ${({ theme }) => theme.effects.blurMd};

  /* 글래스 시머 */
  &::after {
    content: '';
    position: absolute;
    top: -60%;
    left: -80%;
    width: 40%;
    height: 220%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.05 : 0.18)}) 50%,
      transparent 100%
    );
    transform: skewX(-18deg) translateX(0%);
    animation: closingShimmer 5s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes closingShimmer {
    0% {
      transform: skewX(-18deg) translateX(0%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    60% {
      transform: skewX(-18deg) translateX(560%);
      opacity: 1;
    }
    61% {
      opacity: 0;
    }
    100% {
      transform: skewX(-18deg) translateX(560%);
      opacity: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

/* 하단 빔 — 다크/라이트 모두 보이도록 명시적 그라디언트 */
const ClosingBeam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55%;
  background: radial-gradient(
    ellipse 80% 100% at 50% 100%,
    ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(124, 58, 237, 0.38)' : 'rgba(124, 58, 237, 0.22)'}
      0%,
    transparent 70%
  );
  pointer-events: none;
`;

/* 좌상단 보조 빔 (파란 계열) */
const ClosingBeamBlue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 60%;
  background: radial-gradient(
    ellipse 80% 80% at 10% 10%,
    ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(56, 189, 248, 0.12)'}
      0%,
    transparent 70%
  );
  pointer-events: none;
`;

const ClosingSparkLeft = styled.div`
  position: absolute;
  top: -12px;
  left: 10%;
  transform: scale(0.72);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.9 : 0.78)};
  pointer-events: none;
  z-index: 1;
`;

const ClosingSparkRight = styled.div`
  position: absolute;
  top: 20%;
  right: 6%;
  transform: scale(0.62);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.7 : 0.6)};
  pointer-events: none;
  z-index: 1;
`;

const ClosingSparkCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.22 : 0.16)};
  pointer-events: none;
  z-index: 1;
`;

const StarFloat = styled(LavStarIcon)`
  position: absolute;
  margin-right: 0;
  pointer-events: none;
  z-index: 1;

  &.closing-star-1 {
    top: 18%;
    left: 4%;
    font-size: 14px;
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.75 : 0.6)};
  }

  &.closing-star-2 {
    bottom: 24%;
    right: 14%;
    font-size: 11px;
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.55 : 0.45)};
  }

  &.closing-star-3 {
    top: 36%;
    left: 38%;
    font-size: 9px;
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.35 : 0.28)};
  }
`;

const ClosingBackdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transform: scale(1.15) translate(6%, -2%);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.6 : 0.8)};
  filter: ${({ theme }) =>
    theme.mode === 'dark' ? 'brightness(0.75) saturate(1.05)' : 'brightness(1.2) saturate(1.02)'};
`;

/* 상단 accent 라인 */
const TopLine = styled.div`
  position: absolute;
  top: 0;
  left: clamp(32px, 5vw, 56px);
  right: max(30%, 200px);
  height: 1px;
  background: ${({ theme }) => theme.gradients.Headline};
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.9 : 0.7)};
`;

const ClosingContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ClosingLead = styled.p`
  margin: ${({ theme }) => theme.spacing[5]} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ActionRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;
  align-self: end;
  justify-content: flex-end;

  > button {
    color: ${({ theme }) => theme.colors.wColor};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
    align-self: auto;
  }
`;

export default function BrandLastSignalSec() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <SectionBlock>
      <ClosingMiniLabel label={closingSection.miniLabel} />
      <ClosingCard>
        <ClosingBackdrop
          src={theme.mode === 'dark' ? closingBackdrop.dark : closingBackdrop.light}
          alt=""
        />
        {/* <TopLine /> */}
        <ClosingBeam />
        <ClosingBeamBlue />
        <ClosingSparkLeft>
          <BaseSparkIcon tone="violet" />
        </ClosingSparkLeft>
        <ClosingSparkRight>
          <BaseSparkIcon tone="blue" />
        </ClosingSparkRight>
        <ClosingSparkCenter>
          <BaseSparkIcon tone="violet" />
        </ClosingSparkCenter>
        <StarFloat className="closing-star-1" $animate={true}>
          ✦
        </StarFloat>
        <StarFloat className="closing-star-2" $animate={true}>
          ✦
        </StarFloat>
        <StarFloat className="closing-star-3" $animate={true}>
          ✦
        </StarFloat>

        <ClosingContent>
          <BrandSectionHeading {...closingSection.section} />
          <ClosingLead>
            PULSE의 새로운 기어 라인업을 지금 확인하세요. 시즌 드롭부터 플래그십까지
            <br />
            당신의 플레이 신호를 증폭할 기어가 기다리고 있습니다.
          </ClosingLead>
        </ClosingContent>

        <ActionRow>
          <BaseBtn onClick={() => navigate('/categories/drops')}>
            {closingSection.actions.primary}
          </BaseBtn>
          <BaseBtn variant="secondary" tone="blue" onClick={() => navigate('/')}>
            {closingSection.actions.secondary}
          </BaseBtn>
        </ActionRow>
      </ClosingCard>
    </SectionBlock>
  );
}
