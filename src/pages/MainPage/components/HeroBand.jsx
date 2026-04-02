import { Fragment } from 'react';
import styled from '@emotion/styled';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';

const BandOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const BandWrap = styled.div`
  overflow: hidden;
  height: ${({ $height }) => $height || 'auto'};
  display: flex;
  align-items: center;
  padding: ${({ $height, theme }) => ($height ? '0' : `${theme.spacing[4]} 0`)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bandBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  transition: border-color ${({ theme }) => theme.motion.slow};
`;

const BandTrack = styled.div`
  display: flex;
  width: max-content;
  animation: run 28s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes run {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }
`;

const BandItem = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  padding-right: ${({ theme }) => theme.spacing[10]};
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.28em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BandStar = styled(LavStarIcon)`
  margin: 0;
`;

const items = [
  'PULSE 2026 PROJECT',
  'GAMING GEAR PLATFORM',
  'ENERGY · SIGNAL · GLOW',
  'DARK · NEON · GLASS',
  'PLAY YOUR SIGNAL',
  'SOUND · CLICK · GLOW',
  'LIMITED DROPS',
  'BUILT FOR PLAYERS',
];

function BandLine({ hidden = false }) {
  return (
    <BandItem aria-hidden={hidden}>
      {items.map((item) => (
        <Fragment key={`${hidden ? 'ghost' : 'live'}-${item}`}>
          <span>{item}</span>
          <BandStar $animate={true}>✦</BandStar>
        </Fragment>
      ))}
    </BandItem>
  );
}

export default function HeroBand({ height }) {
  return (
    <BandOverlay>
      <BandWrap $height={height}>
        <BandTrack>
          <BandLine />
          <BandLine hidden />
        </BandTrack>
      </BandWrap>
    </BandOverlay>
  );
}
