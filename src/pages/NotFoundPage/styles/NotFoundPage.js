import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const fadeDown = keyframes`from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}`;
const blink = keyframes`0%,100%{opacity:.3}50%{opacity:1}`;
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const enter = '.9s cubic-bezier(.23,1,.32,1)';
const getButtonTone = ($isDarkMode) =>
  $isDarkMode
    ? {
        border: 'rgba(167,139,250,.25)',
        background: 'rgba(124,58,237,.1)',
        color: '#a78bfa',
        hoverBorder: 'rgba(167,139,250,.5)',
        hoverBackground: 'rgba(124,58,237,.18)',
        hoverColor: '#fff',
      }
    : {
        border: 'rgba(124,58,237,.25)',
        background: 'rgba(124,58,237,.08)',
        color: '#7c3aed',
        hoverBorder: 'rgba(124,58,237,.5)',
        hoverBackground: 'rgba(124,58,237,.15)',
        hoverColor: '#5b21b6',
      };

export const PageRoot = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

export const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &::before {
    background-image: url(${({ $bgImage }) => $bgImage});
    background-position: center;
     mix-blend-mode: multiply;
    opacity: .7;
  }

  &::after {
    background-image: url(${({ $beamImage }) => $beamImage});
    background-position: top center;
    opacity: .78;
    height: 50%;
    mix-blend-mode: multiply;
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,.78) 68%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,.78) 68%, transparent 100%);
  }
`;

export const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  opacity: ${({ $isDarkMode }) => ($isDarkMode ? '.4' : '.25')};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
  background-size: 200px;
  pointer-events: none;
`;

export const LightModeOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  opacity: ${({ $isDarkMode }) => ($isDarkMode ? 0 : 1)};
  background:
    radial-gradient(circle at 50% 12%, rgba(255,255,255,.08), transparent 34%),
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.1) 34%, rgba(255,255,255,.16) 100%);
  pointer-events: none;
`;

export const BeamGlow = styled.div`
  position: absolute;
  left: 50%;
  bottom: -4px;
  z-index: 2;
  width: 115vw;
  height: 420px;
  filter: blur(6px);
  transform: translateX(-50%);
  background: ${({ $beamPalette, $isDarkMode }) =>
    $isDarkMode
      ? `radial-gradient(ellipse 100% 100% at 50% 100%,rgba(${$beamPalette.mid},.5) 0%,rgba(${$beamPalette.violet},.32) 20%,rgba(${$beamPalette.violet},.14) 50%,rgba(${$beamPalette.deep},.04) 78%,transparent 100%)`
      : `radial-gradient(ellipse 100% 100% at 50% 100%,rgba(${$beamPalette.violet},.75) 0%,rgba(${$beamPalette.mid},.5) 20%,rgba(${$beamPalette.lav},.25) 50%,rgba(${$beamPalette.soft},.08) 78%,transparent 100%)`};
  pointer-events: none;
`;

export const LogoBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
  max-width: ${({ theme }) => theme.grid.max};
  width: 100%;
  margin: 0 auto;
  padding: calc(${({ theme }) => theme.spacing[4]} + ${({ theme }) => theme.spacing[5]}) ${({ theme }) => theme.spacing[20]};
  box-sizing: border-box;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.grid.margin};
    padding-right: ${({ theme }) => theme.grid.margin};
  }
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: all;
  animation: ${fadeDown} .8s ease both;
`;

export const PageContent = styled.section`
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[5]}`};
  box-sizing: border-box;
  text-align: center;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 48%;
    width: min(52vw, 500px);
    aspect-ratio: 1;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1.08);
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.background} 0%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 92%, transparent) 28%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 56%, transparent) 52%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 18%, transparent) 72%,
      transparent 100%
    );
    opacity: .92;
    filter: blur(36px);
    pointer-events: none;
    z-index: -1;
  }
`;

export const ErrorCode = styled.h1`
  margin: 0;
  color: transparent;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(140px, 20vw, 220px);
  line-height: .9;
  letter-spacing: .04em;
  background: ${({ $isDarkMode }) =>
    $isDarkMode
      ? 'linear-gradient(180deg,rgba(255,255,255,.95) 0%,rgba(210,180,255,.88) 30%,rgba(160,90,255,.65) 65%,rgba(100,40,200,.25) 100%)'
      : 'linear-gradient(180deg,rgba(30,10,60,1) 0%,rgba(80,20,180,.9) 35%,rgba(124,58,237,.75) 65%,rgba(100,40,200,.3) 100%)'};
  background-clip: text;
  filter: ${({ $isDarkMode }) =>
    $isDarkMode
      ? 'drop-shadow(0 0 60px rgba(150,80,255,.4))'
      : 'drop-shadow(0 0 40px rgba(124,58,237,.25))'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeUp} ${enter} .3s both;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 800;
  line-height: 1.1;
  animation: ${fadeUp} ${enter} .42s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.6;
  font-weight: 600;
  animation: ${fadeUp} ${enter} .52s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

export const HomeLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$isDarkMode',
})`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 210px;
  height: 58px;
  padding: 0 ${({ theme }) => theme.spacing[7]};
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 700;
  text-decoration: none;
  backdrop-filter: ${({ theme }) => theme.effects.blurBtn};
  box-shadow: 0 10px 30px rgba(${({ theme }) => theme.colors.primaryRgb}, .14);
  transition: transform ${({ theme }) => theme.motion.normal}, border-color ${({ theme }) => theme.motion.normal}, background ${({ theme }) => theme.motion.normal}, color ${({ theme }) => theme.motion.normal}, box-shadow ${({ theme }) => theme.motion.normal};
  pointer-events: all;
  animation: ${fadeIn} .6s ease .62s both;

  ${({ $isDarkMode, theme }) => {
    const { border, background, color, hoverBorder, hoverBackground, hoverColor } = getButtonTone($isDarkMode);
    return `
      border: 1px solid ${border};
      background: ${background};
      color: ${color};
      &:hover:not(:active) {
        transform: translateY(-2px);
        border-color: ${hoverBorder};
        background: ${hoverBackground};
        color: ${hoverColor};
        box-shadow: 0 14px 36px rgba(${theme.colors.primaryRgb}, .2), ${theme.effects.hoverShadowIcon};
      }
      &:active {
        transform: translateY(0) scale(0.9);
        border-color: ${hoverBorder};
        background: ${hoverBackground};
        color: ${hoverColor};
        box-shadow: 0 8px 22px rgba(${theme.colors.primaryRgb}, .18);
      }
      &:hover span:last-of-type { transform: translateX(4px); }
      &:active span:last-of-type { transform: translateX(2px); }
    `;
  }}
`;

export const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.motion.fast};
`;

export const FooterMeta = styled.p`
  position: absolute;
  left: 50%;
  bottom: ${({ theme }) => theme.spacing[6]};
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: .18em;
  white-space: nowrap;
  opacity: .72;
  animation: ${fadeUp} .9s ease .9s both;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, .4);
    animation: ${blink} 2s ease-in-out infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
    letter-spacing: .08em;
  }
`;
