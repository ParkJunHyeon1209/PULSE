import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import useThemeStore from '../../store/useThemeStore';
import AppLogo from '../../components/common/AppLogo';
import NotFoundBeamSvg from './components/NotFoundBeamSvg';
import NotFoundStars from './components/NotFoundStars';
import NotFoundParticles from './components/NotFoundParticles';

/* ════════════════════════════════════════════════════════
   Keyframes
════════════════════════════════════════════════════════ */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0);     }
`;

const blink = keyframes`
  0%, 100% { opacity: .3; }
  50%      { opacity: 1;  }
`;

/* ════════════════════════════════════════════════════════
   Styled Components
════════════════════════════════════════════════════════ */
const Page = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: ${({ $isDark }) => ($isDark ? '#04030e' : '#f0eeff')};
  color:      ${({ $isDark }) => ($isDark ? '#eeeeff' : '#1e0a3c')};
  font-family: 'IBM Plex Mono', monospace;
`;

const NoiseOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
  background-size: 200px;
  pointer-events: none;
  z-index: 999;
  opacity: ${({ $isDark }) => ($isDark ? '.4' : '.25')};
`;

const BeamBottom = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: -4px;
  width: 115vw;
  height: 420px;
  pointer-events: none;
  z-index: 2;
  filter: blur(6px);
  background: ${({ $isDark }) =>
    $isDark
      ? `radial-gradient(ellipse 100% 100% at 50% 100%,
           rgba(var(--beam-mid),.5)     0%,
           rgba(var(--beam-violet),.32) 20%,
           rgba(var(--beam-violet),.14) 50%,
           rgba(var(--beam-deep),.04)   78%,
           transparent                  100%)`
      : `radial-gradient(ellipse 100% 100% at 50% 100%,
           rgba(var(--beam-violet),.75) 0%,
           rgba(var(--beam-mid),.5)     20%,
           rgba(var(--beam-lav),.25)    50%,
           rgba(var(--beam-soft),.08)   78%,
           transparent                  100%)`};
`;

const LogoWrap = styled(Link)`
   position: absolute;
  top: ${({ theme }) => theme.spacing[6]};
  left: ${({ theme }) => theme.grid.margin};
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  animation: ${fadeDown} .8s ease both;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: ${({ theme }) => theme.spacing[5]};
    left: ${({ theme }) => theme.spacing[5]};
  }
`;

const Content = styled.section`
  position: fixed;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  pointer-events: none;
`;

const Code404 = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(120px, 18vw, 220px);
  line-height: .9;
  letter-spacing: .04em;
  background: ${({ $isDark }) =>
    $isDark
      ? `linear-gradient(180deg,
           rgba(255,255,255,.95)  0%,
           rgba(210,180,255,.88) 30%,
           rgba(160,90,255,.65)  65%,
           rgba(100,40,200,.25) 100%)`
      : `linear-gradient(180deg,
           rgba(30,10,60,1)      0%,
           rgba(80,20,180,.9)    35%,
           rgba(124,58,237,.75)  65%,
           rgba(100,40,200,.3)  100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: ${({ $isDark }) =>
    $isDark
      ? 'drop-shadow(0 0 60px rgba(150,80,255,.4))'
      : 'drop-shadow(0 0 40px rgba(124,58,237,.25))'};
  animation: ${fadeUp} .9s cubic-bezier(.23,1,.32,1) .3s both;
`;

const Title = styled.p`
  font-family: 'Syncopate', sans-serif;
  font-size: clamp(13px, 1.4vw, 17px);
  font-weight: 400;
  letter-spacing: .08em;
  color: ${({ $isDark }) => ($isDark ? 'rgba(238,238,255,.75)' : 'rgba(30,10,60,.8)')};
  animation: ${fadeUp} .9s cubic-bezier(.23,1,.32,1) .42s both;
`;

const Description = styled.p`
  font-size: 11px;
  color: ${({ $isDark }) => ($isDark ? 'rgba(200,205,255,.32)' : 'rgba(80,40,160,.45)')};
  letter-spacing: .05em;
  line-height: 1.9;
  animation: ${fadeUp} .9s cubic-bezier(.23,1,.32,1) .52s both;
`;

const HomeButton = styled(Link)`
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(167,139,250,.25)' : 'rgba(124,58,237,.25)')};
  border-radius: 100px;
  background: ${({ $isDark }) => ($isDark ? 'rgba(124,58,237,.1)' : 'rgba(124,58,237,.08)')};
  color: ${({ $isDark }) => ($isDark ? '#a78bfa' : '#7c3aed')};
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .15em;
  text-transform: uppercase;
  text-decoration: none;
  pointer-events: all;
  transition: all .3s cubic-bezier(.23,1,.32,1);
  animation: ${fadeUp} .9s cubic-bezier(.23,1,.32,1) .62s both;

  &:hover {
    border-color: ${({ $isDark }) => ($isDark ? 'rgba(167,139,250,.5)' : 'rgba(124,58,237,.5)')};
    background:   ${({ $isDark }) => ($isDark ? 'rgba(124,58,237,.18)' : 'rgba(124,58,237,.15)')};
    color: ${({ $isDark }) => ($isDark ? '#fff' : '#5b21b6')};
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124,58,237,.25);
  }

  &:hover .nf-arrow { transform: translateX(4px); }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.motion.fast};
`;

const ErrorMeta = styled.footer`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 9px;
  letter-spacing: .14em;
  color: ${({ $isDark }) => ($isDark ? 'rgba(167,139,250,.28)' : 'rgba(100,60,200,.35)')};
  z-index: 10;
  white-space: nowrap;
  animation: ${fadeUp} .9s ease .9s both;
`;

const MetaDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ $isDark }) => ($isDark ? 'rgba(167,139,250,.4)' : 'rgba(124,58,237,.4)')};
  animation: ${blink} 2s ease-in-out infinite;
`;

/* ════════════════════════════════════════════════════════
   Page Component
════════════════════════════════════════════════════════ */
export default function NotFoundPage() {
  const isDark = useThemeStore((s) => s.isDarkMode);
  
  const beamVars = {
    '--beam-white':  isDark ? '255,248,255' : '60,0,160',
    '--beam-soft':   isDark ? '200,145,255' : '80,10,190',
    '--beam-lav':    isDark ? '167,139,250' : '100,30,210',
    '--beam-mid':    isDark ? '140,60,255'  : '124,58,237',
    '--beam-violet': isDark ? '110,40,220'  : '140,70,250',
    '--beam-deep':   isDark ? '80,20,200'   : '160,90,255',
  };

  return (
    <Page $isDark={isDark} style={beamVars}>

      {/* ── 이펙트 파츠 ───────────────────────────────────── */}
      <NoiseOverlay $isDark={isDark} />
      <NotFoundStars     isDark={isDark} />
      <NotFoundParticles />
      <BeamBottom $isDark={isDark} />
      <NotFoundBeamSvg />

      {/* ── UI ────────────────────────────────────────────── */}
      <LogoWrap to="/">
        <AppLogo />
      </LogoWrap>

      <Content>
        <Code404 $isDark={isDark}>404</Code404>
        <Title $isDark={isDark}>페이지를 찾을 수 없습니다</Title>
        <Description $isDark={isDark}>
          이 신호는 더 이상 존재하지 않거나<br />다른 주파수로 이동했을 수 있습니다.
        </Description>
        <HomeButton to="/" $isDark={isDark}>
          <span>홈으로 돌아가기</span>
          <Arrow className="nf-arrow">→</Arrow>
        </HomeButton>
      </Content>

      <ErrorMeta $isDark={isDark}>
        <MetaDot $isDark={isDark} />
        <span>ERR_PAGE_NOT_FOUND</span>
        <span>PULSE · 2026</span>
        <span>STATUS · 404</span>
      </ErrorMeta>

    </Page>
  );
}
