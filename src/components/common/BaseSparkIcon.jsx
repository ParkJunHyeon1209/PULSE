import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TONE_BG } from '../../utils/toneMap';

/* ─── spark-breathe 애니메이션 (tone별) ─── */
const sparkBreathe1 = keyframes`
  0%,100% { filter: drop-shadow(0 0 6px rgba(200,180,255,.6)) drop-shadow(0 0 18px rgba(160,120,255,.35)); transform: scale(1) rotate(0deg); }
  50%      { filter: drop-shadow(0 0 12px rgba(220,200,255,.9)) drop-shadow(0 0 32px rgba(180,140,255,.5)); transform: scale(1.06) rotate(8deg); }
`;
const sparkBreathe2 = keyframes`
  0%,100% { filter: drop-shadow(0 0 6px rgba(110,231,183,.6)) drop-shadow(0 0 18px rgba(52,211,153,.3)); transform: scale(1) rotate(0deg); }
  50%      { filter: drop-shadow(0 0 12px rgba(167,243,208,.9)) drop-shadow(0 0 32px rgba(52,211,153,.5)); transform: scale(1.06) rotate(-8deg); }
`;
const sparkBreathe3 = keyframes`
  0%,100% { filter: drop-shadow(0 0 6px rgba(253,164,175,.6)) drop-shadow(0 0 18px rgba(244,114,182,.3)); transform: scale(1) rotate(0deg); }
  50%      { filter: drop-shadow(0 0 12px rgba(253,200,207,.9)) drop-shadow(0 0 32px rgba(236,72,153,.5)); transform: scale(1.06) rotate(8deg); }
`;
const sparkBreathe4 = keyframes`
  0%,100% { filter: drop-shadow(0 0 6px rgba(147,197,253,.6)) drop-shadow(0 0 18px rgba(96,165,250,.3)); transform: scale(1) rotate(0deg); }
  50%      { filter: drop-shadow(0 0 12px rgba(186,230,253,.9)) drop-shadow(0 0 32px rgba(59,130,246,.5)); transform: scale(1.06) rotate(-8deg); }
`;

const SPARK_ANIM = {
  violet: sparkBreathe1,
  mint: sparkBreathe2,
  pink: sparkBreathe3,
  blue: sparkBreathe4,
  LINEUP: sparkBreathe1,
  HEADSET: sparkBreathe4,
  GEAR: sparkBreathe2,
  CONSOLE: sparkBreathe3,
  DROPS: sparkBreathe4,
  collab: sparkBreathe1,
  indigo: sparkBreathe1,
};
const SPARK_DUR = {
  violet: '4s', mint: '4s', pink: '4.5s', blue: '5s',
  LINEUP: '4s', HEADSET: '5s', GEAR: '4s', CONSOLE: '4.5s', DROPS: '5s',
  collab: '4s', indigo: '4.2s',
};

const SparkWrap = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: filter, transform;
  animation: ${({ $anim, $tone }) => $anim ?? SPARK_ANIM[$tone] ?? sparkBreathe1}
    ${({ $dur, $tone }) => $dur ?? SPARK_DUR[$tone] ?? '4s'} ease-in-out infinite;
`;

const SparkArm = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $tone, theme }) => theme.spark[`csk${TONE_BG[$tone].slice(2)}Arm`]};

  ${({ $dir }) => {
    if ($dir === 'v') return 'width: 3px;  height: 88px; transform: translate(-50%, -50%);';
    if ($dir === 'h') return 'width: 88px; height: 3px;  transform: translate(-50%, -50%);';
    if ($dir === 'd1')
      return 'width: 2px;  height: 52px; transform: translate(-50%, -50%) rotate(45deg);';
    if ($dir === 'd2')
      return 'width: 2px;  height: 52px; transform: translate(-50%, -50%) rotate(-45deg);';
  }}
`;

/**
 * BaseSparkIcon
 *
 * Props:
 * - tone : 'violet' | 'mint' | 'pink' | 'blue'  (default: 'violet')
 * - anim : keyframes — 커스텀 애니메이션 (없으면 tone 기본값)
 * - dur  : '4s' 등  — 애니메이션 duration (없으면 tone 기본값)
 */
export default function BaseSparkIcon({ tone = 'pink', anim, dur }) {
  return (
    <SparkWrap $tone={tone} $anim={anim} $dur={dur}>
      <SparkArm $dir="v" $tone={tone} />
      <SparkArm $dir="h" $tone={tone} />
      <SparkArm $dir="d1" $tone={tone} />
      <SparkArm $dir="d2" $tone={tone} />
    </SparkWrap>
  );
}
