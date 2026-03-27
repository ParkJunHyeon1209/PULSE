import styled from '@emotion/styled';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import BaseBtn from '../../../../components/common/BaseBtn';
import { ArrowIcon } from '../../../../assets/icons/BtnIcon';
import { TONE_BG, TONE_BEAM } from '../../../../utils/toneMap';

const Card = styled.article`
  position: relative;
  overflow: hidden;
  height: ${({ $height }) => $height || '210px'};
  border-radius: ${({ theme }) => theme.radii.xl};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  transition:
    transform ${({ theme }) => theme.motion.slow},
    box-shadow ${({ theme }) => theme.motion.slow},
    opacity 320ms ease,
    filter 320ms ease,
    box-shadow 320ms ease;
  will-change: transform;

  /* &.prev {
    height: 430px;
    opacity: 0.82;
    z-index: 1;
  }

  &.active {
    height: 510px;
    opacity: 1;
    z-index: 2;
  }

  &.next {
    height: 430px;
    opacity: 0.82;
    z-index: 1;
  } */

  &:hover {
    transform: scale(1.03);
    box-shadow: ${({ theme, $tone }) =>
      theme.effects[`hoverShadowCategory${$tone}`] || theme.effects.hoverShadowCategoryBase};
  }

  &:active {
    transform: scale(0.97);
    transition: transform 0.1s;
  }

  &:hover .card-beam {
    opacity: 1;
    transform: translateX(-50%) scaleY(1.18);
  }

  &:hover .card-spark {
    opacity: 1;
    transform: translate(-50%, -65%) scale(1.12);
  }

  &:hover .card-arrow {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $bg }) => theme.card[$bg]};
`;

const Beam = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 55%;
  height: 70%;
  border-radius: 50% 50% 0 0;
  filter: blur(28px);
  opacity: 0.6;
  transform: translateX(-50%);
  background: ${({ theme, $bg }) => theme.effects[$bg]};
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const SparkContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  opacity: 0.72;
  transform: translate(-50%, -65%);
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const BadgeWrap = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
`;

const ArrowWrap = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const Info = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[6]};
  bottom: ${({ theme }) => theme.spacing[5]};
  z-index: 2;
`;

const Label = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  line-height: 1;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Name = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.m};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
`;

const Count = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function BaseToneCard({
  label,
  name,
  count,
  tone = 'violet',
  height,
  badge,
  arrow,
  ...props
}) {
  return (
    <Card $tone={tone} $height={height} {...props}>
      <Inner $bg={TONE_BG[tone]} />
      <Beam className="card-beam" $bg={TONE_BEAM[tone]} />
      <SparkContainer className="card-spark">
        <BaseSparkIcon tone={tone} />
      </SparkContainer>

      {badge && (
        <BadgeWrap>
          <BaseBtn
            variant="badge"
            tone={badge}
            flex="0"
            icon={false}
            padding="4px 10px"
            height="auto"
          >
            {badge === 'col' ? 'COLLAB' : badge}
          </BaseBtn>
        </BadgeWrap>
      )}

      {arrow && (
        <ArrowWrap className="card-arrow">
          <BaseBtn variant="ic-btn" flex="0" icon={false} size="32px">
            <ArrowIcon width={14} height={14} />
          </BaseBtn>
        </ArrowWrap>
      )}

      <Info>
        <Label>{label}</Label>
        <Name>{name}</Name>
        <Count>{count}</Count>
      </Info>
    </Card>
  );
}
