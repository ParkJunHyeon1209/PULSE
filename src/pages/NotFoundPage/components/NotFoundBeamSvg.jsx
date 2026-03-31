import { memo } from 'react';
import styled from '@emotion/styled';

const BeamSvgWrap = styled.svg`
  position: fixed;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1600px, 220vw);
  height: 60vh;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
`;

const alphaColor = (rgb, alpha) => `rgba(${rgb},${alpha})`;
const paletteStops = {
  wide: [
    ['0%', 'lav', 0.55],
    ['20%', 'lav', 0.42],
    ['50%', 'mid', 0.28],
    ['75%', 'violet', 0.12],
    ['92%', 'deep', 0.03],
    ['100%', 'deep', 0],
  ],
  mid: [
    ['0%', 'soft', 0.7],
    ['18%', 'soft', 0.55],
    ['45%', 'mid', 0.32],
    ['72%', 'violet', 0.1],
    ['90%', 'deep', 0.02],
    ['100%', 'deep', 0],
  ],
  core: [
    ['0%', 'white', 1],
    ['5%', 'white', 0.95],
    ['15%', 'soft', 0.88],
    ['38%', 'mid', 0.62],
    ['62%', 'violet', 0.32],
    ['82%', 'violet', 0.1],
    ['95%', 'deep', 0.02],
    ['100%', 'deep', 0],
  ],
};

function NotFoundBeamSvg({ beamPalette }) {
  const renderStops = (layer) =>
    paletteStops[layer].map(([offset, tone, alpha]) => (
      <stop key={`${layer}-${offset}`} offset={offset} stopColor={alphaColor(beamPalette[tone], alpha)} />
    ));

  return (
    <BeamSvgWrap viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <defs>
        <linearGradient id="nf-g-wide" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          {renderStops('wide')}
        </linearGradient>
        <linearGradient id="nf-g-mid" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          {renderStops('mid')}
        </linearGradient>
        <linearGradient id="nf-g-core" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          {renderStops('core')}
        </linearGradient>
        <radialGradient id="nf-g-source" cx="50%" cy="0%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(240,220,255,.6)" />
          <stop offset="50%" stopColor="rgba(200,160,255,.2)" />
          <stop offset="100%" stopColor="rgba(160,100,255,0)" />
        </radialGradient>
        <filter id="nf-f-wide" x="-100%" y="-5%" width="300%" height="120%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id="nf-f-mid" x="-100%" y="-5%" width="300%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="nf-f-core" x="-100%" y="-5%" width="300%" height="120%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="nf-f-source" x="-100%" y="-20%" width="300%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <style>{'@keyframes nf-beam-flash{0%,100%{opacity:.75}15%{opacity:1}18%{opacity:.5}35%{opacity:.95}70%{opacity:.8}}'}</style>
      </defs>

      <g style={{ animation: 'nf-beam-flash 9s ease-in-out infinite' }}>
        <path d="M 0 0 C 300 20, 447 520, 450 600 L 450 600 C 453 520, 600 20, 900 0 Z" fill="url(#nf-g-wide)" filter="url(#nf-f-wide)" opacity=".9">
          <animate attributeName="opacity" values=".7;.95;.7" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 150 0 C 360 25, 446 530, 448 600 L 452 600 C 454 530, 540 25, 750 0 Z" fill="url(#nf-g-mid)" filter="url(#nf-f-mid)" opacity="1">
          <animate attributeName="opacity" values=".8;1;.8" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M 330 0 C 420 15, 449 520, 449 600 L 451 600 C 451 520, 480 15, 570 0 Z" fill="url(#nf-g-core)" filter="url(#nf-f-core)" opacity="1">
          <animate attributeName="opacity" values=".85;1;.85" dur="2.2s" repeatCount="indefinite" />
        </path>
        <ellipse cx="450" cy="0" rx="380" ry="12" fill="url(#nf-g-source)" filter="url(#nf-f-source)">
          <animate attributeName="rx" values="340;420;340" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".5;.8;.5" dur="4s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="450" cy="0" rx="100" ry="5" fill="rgba(255,248,255,.7)" filter="url(#nf-f-mid)">
          <animate attributeName="opacity" values=".5;.85;.5" dur="2.5s" repeatCount="indefinite" />
        </ellipse>
      </g>
    </BeamSvgWrap>
  );
}

export default memo(NotFoundBeamSvg);
