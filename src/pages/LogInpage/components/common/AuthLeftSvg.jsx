import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { authToneMap } from '../../authToneMap';

const CenterArea = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-height: clamp(240px, 34vh, 480px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(12px, 3vh, 32px) 0;
`;

const signalExpand = keyframes`
  0% {
    opacity: 0.7;
    transform: scale(0.85);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
`;

const coreBreathe = keyframes`
  0%, 100% {
    opacity: 0.75;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const heartbeat = keyframes`
  0% { transform: scale(0.95); }
  4% { transform: scale(1.22); }
  8% { transform: scale(0.98); }
  13% { transform: scale(1.12); }
  18% { transform: scale(0.97); }
  100% { transform: scale(0.95); }
`;

const shockwavePrimary = keyframes`
  0%, 5% {
    transform: scale(1);
    opacity: 0.72;
  }
  100% {
    transform: scale(3.8);
    opacity: 0;
  }
`;

const shockwaveSecondary = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  13% {
    transform: scale(1);
    opacity: 0.45;
  }
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
`;

const waveFlow = keyframes`
  0% { stroke-dashoffset: 1000; }
  35% { stroke-dashoffset: 600; }
  100% { stroke-dashoffset: 0; }
`;

const SignalStage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(220px, 24vw, 280px);
  height: clamp(220px, 24vw, 280px);
`;

const SignalRing = styled.div`
  position: absolute;
  border: 1px solid ${({ $circleBorder }) => $circleBorder};
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  opacity: ${({ $opacity }) => $opacity};
  animation: ${signalExpand} 3s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const SignalCore = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 2;
  animation:
    ${coreBreathe} 3.2s ease-in-out infinite,
    ${heartbeat} 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: ${({ $glowBackground }) => $glowBackground};
    filter: blur(8px);
    animation: ${coreBreathe} 3.2s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: ${({ $coreBackground }) => $coreBackground};
    filter: blur(4px);
    animation: ${coreBreathe} 3.2s ease-in-out infinite;
  }
`;

const ShockwaveRing = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1.5px solid ${({ $waveStroke }) => $waveStroke};
  border-radius: 50%;
  pointer-events: none;
  animation: ${({ $variant }) => ($variant === 'secondary' ? shockwaveSecondary : shockwavePrimary)}
    3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
`;

const WaveLayer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: clamp(240px, 26vw, 300px);
  height: clamp(128px, 14vw, 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 1) 22%,
    rgba(0, 0, 0, 1) 78%,
    rgba(0, 0, 0, 0.9) 86%,
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 1) 22%,
    rgba(0, 0, 0, 1) 78%,
    rgba(0, 0, 0, 0.9) 86%,
    transparent 100%
  );
`;

const WavePath = styled.svg`
  width: 100%;
  height: 100%;
  stroke: ${({ $waveStroke }) => $waveStroke};
  stroke-width: 2;
  fill: none;
  filter: drop-shadow(0 0 3px ${({ $waveStroke }) => `${$waveStroke}cc`});
`;

const BaseWave = styled.path`
  mix-blend-mode: overlay;
  opacity: 0.1;
`;






const AnimatedWave2 = styled.path`
  mix-blend-mode: multiply;
  stroke-dasharray: 400 600;
  opacity: 0.35;
  animation: ${waveFlow} 5s linear -2.5s infinite;
`;

const DEFAULT_CIRCLE_OPACITIES = [0.2, 0.4, 0.6, 0.8];

const DEFAULT_WAVE_PATH = `
  M0,20 L20,20
  L30,0 L40,60 L55,-10 L60,40 L70,20
  L110,20
  L120,-5 L130,50 L145,-20 L154,60 L160,20
  L200,20
  L210,0 L220,60 L235,-20 L245,40 L255,20
  L295,20
  L305,0 L315,60 L330,-10 L340,40 L350,20
  L360,20 L380,20 L400,20
`;

export default function AuthLeftSvg({ tone = 'violet' }) {
  const { circleBorder, glowBackground, waveStroke } = authToneMap[tone];

  return (
    <CenterArea>
      <SignalStage>
        {[80, 140, 200, 260].map((size, index) => (
          <SignalRing
            key={size}
            size={size}
            $circleBorder={circleBorder}
            $opacity={DEFAULT_CIRCLE_OPACITIES[index]}
            $delay={index * 0.6}
          />
        ))}
        <ShockwaveRing $waveStroke={waveStroke} />
        <ShockwaveRing $waveStroke={waveStroke} $variant="secondary" />
        <SignalCore
          $glowBackground={glowBackground}
          $coreBackground={`radial-gradient(circle, ${waveStroke}cc 0%, ${waveStroke}55 38%, transparent 100%)`}
        />
        <WaveLayer>
          <WavePath viewBox="0 0 400 40" $waveStroke={waveStroke}>
            <BaseWave d={DEFAULT_WAVE_PATH} strokeLinecap="round" strokeLinejoin="round" />
            
            <AnimatedWave2 d={DEFAULT_WAVE_PATH} strokeLinecap="round" strokeLinejoin="round" />
          </WavePath>
        </WaveLayer>
      </SignalStage>
    </CenterArea>
  );
}
