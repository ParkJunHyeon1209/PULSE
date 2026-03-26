import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useThemeStore from '../store/useThemeStore';
import { darkTheme, lightTheme } from '../styles/theme';
import AppLogo from '../components/common/AppLogo';

import darkBg from '../assets/img/404_dark_1.webp';
import darkBeam from '../assets/img/404_dark_2.webp';
import lightBg from '../assets/img/404_light_1.webp';
import lightBeam from '../assets/img/404_light_2.webp';

const Page = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${({ $bgImage }) => $bgImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${({ $beamImage }) => $beamImage});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    opacity: 1;
  }
`;

const LogoWrap = styled(Link)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[6]};
  left: ${({ theme }) => theme.grid.margin};
  z-index: 3;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: ${({ theme }) => theme.spacing[5]};
    left: ${({ theme }) => theme.spacing[5]};
  }
`;

const Content = styled.section`
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[5]}`};
  text-align: center;
  box-sizing: border-box;
`;

const Code404 = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: clamp(120px, 15vw, 180px);
  line-height: 0.9;
  letter-spacing: 0.1em;
  color: transparent;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.wColor} 0%,
    ${({ theme }) => theme.colors.secondary} 30%,
    ${({ theme }) => theme.colors.primaryStrong} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow:
    0 0 20px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.18),
    0 0 40px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const HomeButton = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 190px;
  height: 54px;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.btn2Bg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 700;
  backdrop-filter: ${({ theme }) => theme.effects.blurBtn};
  box-shadow: 0 10px 30px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.14);
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.32);
    box-shadow:
      0 14px 36px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.2),
      ${({ theme }) => theme.effects.hoverShadowIcon};
  }

  &:hover span:last-of-type {
    transform: translateX(4px);
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.motion.fast};
`;

const BottomText = styled.p`
  position: absolute;
  left: 50%;
  bottom: ${({ theme }) => theme.spacing[6]};
  transform: translateX(-50%);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.18em;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.72;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
    letter-spacing: 0.08em;
  }
`;

export default function NotFoundPage() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Page theme={currentTheme}>
      <Background
        $bgImage={isDarkMode ? darkBg : lightBg}
        $beamImage={isDarkMode ? darkBeam : lightBeam}
      />

      <LogoWrap to="/" theme={currentTheme}>
        <AppLogo />
      </LogoWrap>

      <Content theme={currentTheme}>
        <Code404 theme={currentTheme}>404</Code404>

        <Title theme={currentTheme}>페이지를 찾을 수 없습니다</Title>

        <Description theme={currentTheme}>
          이 신호는 더 이상 존재하지 않거나
          <br />
          다른 주파수로 이동했을 수 있습니다.
        </Description>

        <HomeButton to="/" theme={currentTheme}>
          <span>홈으로 돌아가기</span>
          <Arrow aria-hidden="true">→</Arrow>
        </HomeButton>

        <BottomText theme={currentTheme}>
          <span>ERR_PAGE_NOT_FOUND</span>
          <span>PULSE · 2026</span>
          <span>STATUS · 404</span>
        </BottomText>
      </Content>
    </Page>
  );
}
