import styled from '@emotion/styled';

const PulseSvgWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
`;

const PulseLineSvgWrap = styled.svg`
  overflow: visible;
`;

const PulseSvgLine = styled.polyline`
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: hero-scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes hero-scan {
    0% {
      stroke-dashoffset: 280;
      opacity: 0;
    }
    3% {
      opacity: 1;
    }
    62% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    82% {
      stroke-dashoffset: 0;
      opacity: 0.5;
    }
    97%,
    100% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
  }
`;

const PulseSvgTrail = styled.polyline`
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  opacity: 0;
  animation: hero-trail 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes hero-trail {
    0%,
    55% {
      opacity: 0;
      stroke-dashoffset: 300;
    }
    68% {
      opacity: 0.2;
      stroke-dashoffset: 0;
    }
    88%,
    100% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
  }
`;

const PulseSvgCross = styled.g`
  opacity: 0;
  transform-origin: 167px 16px;
  animation: hero-cross 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes hero-cross {
    0%,
    60% {
      opacity: 0;
      transform: scale(0);
    }
    68% {
      opacity: 1;
      transform: scale(1.3);
    }
    76% {
      opacity: 0.75;
      transform: scale(1);
    }
    90%,
    100% {
      opacity: 0;
      transform: scale(0.1);
    }
  }
`;

const PulseSvgLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

export default function PulseLineSvg({ className, label = 'Live Signal' }) {
  return (
    <PulseSvgWrap className={className}>
      <PulseLineSvgWrap
        width="194"
        height="32"
        viewBox="-4 0 194 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-svg-main-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ec489ab2" stopOpacity=".1" />
            <stop offset="30%" stopColor="#ec489ac5" stopOpacity=".6" />
            <stop offset="70%" stopColor="#bf26d3ba" />
            <stop offset="100%" stopColor="#7c3aedb2" stopOpacity=".1" />
            {/* <stop offset="78%" stopColor="#60a5fa" /> */}
            {/* <stop offset="100%" stopColor="#38bdf8" stopOpacity=".5" /> */}
          </linearGradient>
          <linearGradient id="hero-svg-trail-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ec4899" stopOpacity=".1" />
            <stop offset="20%" stopColor="#c026d3" stopOpacity=".2" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity=".3" />
            {/* <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" /> */}
          </linearGradient>
          <filter id="hero-svg-glow" x="-20%" y="-150%" width="140%" height="400%">
            <feGaussianBlur stdDeviation="3" result="big" />
            <feGaussianBlur stdDeviation="1.2" result="med" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="big" />
              <feMergeNode in="med" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-svg-spark" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur stdDeviation="1.2" result="b2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="b2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line
          x1="-4"
          y1="16"
          x2="190"
          y2="16"
          stroke="rgba(139,92,246,.08)"
          strokeWidth=".7"
          strokeDasharray="1.5 5"
        />

        <PulseSvgTrail
          points="-4,16 18,16 32,16 44,15.2 48,10 52,16 62,16 70,4 78,28 86,16 90,10 95,16 110,16 190,16"
          stroke="url(#hero-svg-trail-g)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <PulseSvgLine
          points="-4,16 18,16 32,16 44,15.2 48,10 52,16 62,16 70,4 78,28 86,16 90,10 95,16 110,16 190,16"
          stroke="url(#hero-svg-main-g)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#hero-svg-glow)"
        />

        <PulseSvgCross filter="url(#hero-svg-spark)">
          <line
            x1="167"
            y1="8"
            x2="167"
            y2="24"
            stroke="#8d50ff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="16"
            x2="174"
            y2="16"
            stroke="#8d50ff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="162.5"
            y1="10.5"
            x2="171.5"
            y2="21.5"
            stroke="#7c3aed"
            strokeWidth=".8"
            strokeLinecap="round"
            opacity=".7"
          />
          <line
            x1="171.5"
            y1="10.5"
            x2="162.5"
            y2="21.5"
            stroke="#7c3aed"
            strokeWidth=".8"
            strokeLinecap="round"
            opacity=".7"
          />
          <circle cx="167" cy="16" r="2" fill="#b990ff" />
        </PulseSvgCross>
      </PulseLineSvgWrap>
      <PulseSvgLabel>{label}</PulseSvgLabel>
    </PulseSvgWrap>
  );
}
