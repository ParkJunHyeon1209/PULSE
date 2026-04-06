import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BaseBtn from '../../../../components/common/BaseBtn';
import { LavStarIcon } from '../../../../assets/icons/BtnIcon';

const gradShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const fadeSlideDown = keyframes`
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const animIn = ({ $delay = 0 }) => css`
  animation: ${fadeSlideDown} 900ms cubic-bezier(0.23, 1, 0.32, 1) ${$delay}ms both;
`;

const animProps = {
  shouldForwardProp: (prop) => prop !== '$delay',
};


export const FullInner = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: clip;
  padding-inline: ${({ theme }) => theme.grid.margin};
  display: flex;
  justify-content: center;
`;

export const HeroSection = styled.section`
  position: relative;
  pointer-events: none;
  flex: 1;
  max-width: 1280px;
  width: 100%;
`;

export const HeroWrap = styled.section`
  pointer-events: auto;
  padding-top: ${({ theme }) => theme.spacing[14]};
  height: 90%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    align-items: center;
    text-align: center;
    padding-top: ${({ theme }) => theme.spacing[18]};
  }
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
  text-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 2px 24px rgba(6,4,20,0.5), 0 0 48px rgba(6,4,20,0.3)'
      : '0 0 4px rgba(118, 63, 255, 0.08), 0 0 18px rgba(114, 58, 255, 0.05)'};
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    width: 100%;
    text-align: center;
    text-shadow: ${({ theme }) =>
      theme.mode === 'dark'
        ? '0 2px 20px rgba(6,4,20,0.1), 0 0 60px rgba(6,4,20,0.1)'
        : '0 2px 16px rgba(93, 28, 255, 0.35), 0 0 40px rgba(86, 20, 255, 0.2)'};
  }
`;

export const HeroTitleGrad = styled.span`
  display: block;
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
  
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    margin-bottom: ${({ theme }) => theme.spacing[10]};
  }
`;

const HeroActions = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const HeroDec = styled(BaseBtn)`
  font-weight: 600;
  letter-spacing: 0.16em;
  transition:
    font-size ${({ theme }) => theme.motion.normal},
    padding ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
    letter-spacing: 0.1em;
    align-self: center;
  }
`;

export const LavStarEnd = styled(LavStarIcon)`
  margin-right: 0;
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

export const HeroButton = styled(BaseBtn)`
  text-shadow: 0 0 4px ${({ theme }) => theme.colors.background};
  ${({ variant, theme }) =>
    variant === 'secondary' &&
    `
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        z-index: -2;
        background: ${theme.colors.btnBg};
        opacity: 0.85;
        transition: opacity 300ms, filter 300ms;
        pointer-events: none;
      }
      &:hover:not(:disabled)::after {
        opacity: 1;
        filter: brightness(1.15);
      }
    `}
`;

const HeroStats = styled.div`
  display: flex;
  gap: 0;
  align-items: stretch;
  margin-top: ${({ theme }) => theme.spacing[14]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[8]};
    justify-content: center;
  }
`;




export const HeroStat = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

export const HeroStatValue = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1;
  background: linear-gradient(135deg, #c4b5fd, #818cf8, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.04em;
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.m};
    ${({ theme }) =>
      theme.mode === 'light' &&
      `filter: drop-shadow(0 0 8px ${theme.colors.background}) drop-shadow(0 0 6px ${theme.colors.background});`}
  }

  span {
    font-family: inherit;
  }
`;

export const HeroStatLabel = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.noneText};
  font-weight: bold;
  opacity: 0.5;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  white-space: nowrap;
  line-height: 1.5;
  ${({ theme }) =>
    theme.mode === 'light' &&
    `text-shadow:
        0 0 2px ${theme.colors.background},
        0 0 4px ${theme.colors.background + 'ee'},
        0 0 8px ${theme.colors.background + 'aa'};`}
  transition: font-size ${({ theme }) => theme.motion.normal} letter-spacing
    ${({ theme }) => theme.motion.normal};

  span {
    display: block;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    letter-spacing: 0.01em;
  }
`;


export const AnimHeroStats = styled(HeroStats, animProps)`
  ${animIn}
`;


export const AnimIntroLabel = styled(HeroIntroLabel, animProps)`
  ${animIn}
`;
export const AnimHeroTitle = styled(HeroTitle, animProps)`
  ${animIn}
`;
export const AnimHeroCopy = styled(HeroCopy, animProps)`
  ${animIn}
`;
export const AnimHeroActions = styled(HeroActions, animProps)`
  ${animIn}
`;

export const HeroTextGroup = styled('div', {
  shouldForwardProp: (prop) => prop !== '$visible',
})`
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 180ms ease;
`;

export const SlideNavRail = styled.div`
  position: absolute;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  pointer-events: auto;
  z-index: 10;
`;

export const SlideNavItem = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  position: relative;
  padding-bottom: 6px;
  transition:
    color 300ms,
    opacity 300ms;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.navActive};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 320ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`;
