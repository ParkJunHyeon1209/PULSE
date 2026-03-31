import { memo, useEffect, useRef } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const ParticleLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  overflow: hidden;
  pointer-events: none;
`;

const particleKeyframes = css`
  @keyframes nf-spark-fall {
    0%   { opacity: 0;  transform: translateY(0)    scale(0);  }
    10%  { opacity: 1;  transform: translateY(0)    scale(1);  }
    90%  { opacity: .3; }
    100% { opacity: 0;  transform: translateY(55vh) scale(.2); }
  }
  @keyframes nf-glint-pop {
    0%   { opacity: 0; transform: translate(-50%,-50%) scale(0); }
    20%  { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-50%) scale(3); }
  }
`;

const SPARK_THEMES = {
  dark: {
    spread: 420, glowScale: [0.8, 1.8], brightAlpha: '.95', dimAlpha: '.72',
    getColor: () => (Math.random() > 0.5 ? '230,200,255' : '200,150,255'),
    getBrightSize: () => Math.random() * 8 + 10,
    getDimSize:    () => Math.random() * 5 + 7,
    glow: ['230,200,255,.75', '200,150,255,.28'],
  },
  light: {
    spread: 620, glowScale: [1.6, 3.6], brightAlpha: '.62', dimAlpha: '.56',
    getColor:      () => '255,255,255',
    getBrightSize: () => Math.random() * 8 + 14,
    getDimSize:    () => Math.random() * 6 + 10,
    glow: ['139,92,246,1', '124,58,237,.96'],
  },
};

const GLINT_THEMES = {
  dark:  { inner: 'rgba(230,200,255,.9)',  mid: 'rgba(180,120,255,.5)',   outer: 'rgba(140,70,255,.22)'  },
  light: { inner: 'rgba(109,40,217,.95)', mid: 'rgba(91,33,182,.58)',    outer: 'rgba(76,29,149,.34)'   },
};

function spawnSpark(container, isDark) {
  const theme = SPARK_THEMES[isDark ? 'dark' : 'light'];
  const ratio = Math.random();
  const bright = Math.random() > 0.6;
  const spread = (Math.random() - 0.5) * 2 * theme.spread * (1 - ratio * 0.4);
  const size = bright ? theme.getBrightSize() : theme.getDimSize();
  const color = theme.getColor();
  const alpha = bright ? theme.brightAlpha : theme.dimAlpha;
  const dur = Math.random() * 2.5 + 1.8;
  const [g1, g2] = theme.glow;
  const [glowNear, glowFar] = theme.glowScale;

  const el = document.createElement('div');
  el.textContent = '✦';
  el.style.cssText = `
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 3;
    left: calc(50% + ${spread}px);
    top: ${ratio * 12}%;
    width: ${size}px;
    height: ${size}px;
    font-size: ${size}px;
    line-height: 1;
    color: rgba(${color},${alpha});
    text-shadow:
      0 0 ${size * glowNear}px rgba(${g1}),
      0 0 ${size * glowFar}px rgba(${g2});
    animation: nf-spark-fall ${dur}s linear both;
  `;
  container.appendChild(el);
  window.setTimeout(() => el.remove(), dur * 1000 + 200);
}

function spawnGlint(container, isDark) {
  const { inner, mid, outer } = GLINT_THEMES[isDark ? 'dark' : 'light'];

  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    top: 0; left: 50%;
    transform: translate(-50%, -50%);
    width: 3px; height: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow:
      0 0 10px 3px  ${inner},
      0 0 35px 10px ${mid},
      0 0 70px 22px ${outer};
    animation: nf-glint-pop .6s ease-out both;
    pointer-events: none;
    z-index: 4;
  `;
  container.appendChild(el);
  window.setTimeout(() => el.remove(), 700);
}

function NotFoundParticles({ isDark }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const container = layerRef.current;
    if (!container) return undefined;

    const sparkId = window.setInterval(() => spawnSpark(container, isDark), 110);
    const glintId = window.setInterval(() => spawnGlint(container, isDark), 2500);

    return () => {
      clearInterval(sparkId);
      clearInterval(glintId);
      container.replaceChildren();
    };
  }, [isDark]);

  return (
    <>
      <Global styles={particleKeyframes} />
      <ParticleLayer ref={layerRef} aria-hidden="true" />
    </>
  );
}

export default memo(NotFoundParticles);
